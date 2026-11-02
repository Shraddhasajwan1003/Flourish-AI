/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Droplet,
  Sparkles,
  Download,
  Plus,
  AlertCircle,
  Clock,
  Heart,
  CheckCircle2,
} from 'lucide-react';
import Navigation from '../components/Navigation';
import { storageService, DEFAULT_DEMO_PROFILE } from '../services/storageService';
import { cyclePredictionService } from '../services/cyclePredictionService';
import { CYCLE_PHASES } from '../config/app.config';
import { CycleLog } from '../types';

export default function CycleTracker() {
  const [profile, setProfile] = useState(() => storageService.getUserProfile() || DEFAULT_DEMO_PROFILE);
  const [cycleLogs, setCycleLogs] = useState(() => storageService.getCycleLogs());
  
  // Date state for calendar
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [logModalOpen, setLogModalOpen] = useState(false);

  // New period log form state
  const [logStartDate, setLogStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [logFlow, setLogFlow] = useState<CycleLog['flowIntensity']>('medium');
  const [logSymptoms, setLogSymptoms] = useState<string[]>(['Cramps']);

  const cycleStatus = cyclePredictionService.calculateCycleStatus(profile);

  // Build calendar days for the current displayed month
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth(); // 0-indexed
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 is Sunday

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const handleSavePeriodLog = () => {
    const newLog: CycleLog = {
      id: `cyc_${Date.now()}`,
      startDate: logStartDate,
      periodDuration: 5,
      cycleLength: profile.typicalCycleLength || 28,
      flowIntensity: logFlow,
      symptoms: logSymptoms,
    };
    storageService.saveCycleLog(newLog);
    // Update profile last period date
    const updatedProfile = { ...profile, lastPeriodDate: logStartDate };
    storageService.saveUserProfile(updatedProfile);
    setProfile(updatedProfile);
    setCycleLogs(storageService.getCycleLogs());
    setLogModalOpen(false);
  };

  const handleExportData = () => {
    const dataStr = storageService.exportAllUserData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FlourishAI_cycle_history_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  // Helper to determine phase of a given day relative to lastPeriodDate
  const getDayPhaseColor = (dayNumber: number) => {
    const d = new Date(year, month, dayNumber);
    d.setHours(0, 0, 0, 0);

    const lastP = new Date(profile.lastPeriodDate);
    lastP.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((d.getTime() - lastP.getTime()) / 86400000);
    const cLength = profile.typicalCycleLength || 28;
    const pDur = profile.periodDuration || 5;

    // Modulo cycle day
    const cDay = (diffDays % cLength) + 1;

    if (cDay <= pDur && cDay >= 1) return { bg: '#FDE8EE', border: '#EFA6BE', text: '#C65B83', label: 'Menstrual' };
    if (cDay <= 12 && cDay > pDur) return { bg: '#F1F7EE', border: '#A8B99B', text: '#4B6B3E', label: 'Follicular' };
    if (cDay <= 16 && cDay > 12) return { bg: '#FCEEF4', border: '#C65B83', text: '#8E2B54', label: 'Ovulatory' };
    return { bg: '#FFF7EB', border: '#F2C078', text: '#C9822C', label: 'Luteal' };
  };

  return (
    <div className="min-h-screen bg-[#FFF9FB] flex flex-col">
      <Navigation />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F9DCE7] text-[#C65B83] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Statistical & Bayesian Predictions</span>
            </div>
            <h1 className="font-serif-title text-3xl font-bold text-[#382536]">
              Cycle Calendar & Rhythm
            </h1>
            <p className="text-xs text-[#897887]">
              Track your period dates, phases, and symptom history with full data exportability.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportData}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-white border border-[#F9DCE7] text-[#382536] hover:bg-[#FFF9FB] transition shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export History (JSON)</span>
            </button>
            <button
              onClick={() => setLogModalOpen(true)}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold bg-[#C65B83] text-white hover:bg-[#8E2B54] transition shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Log Period Flow</span>
            </button>
          </div>
        </div>

        {/* Prediction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-[#F9DCE7] shadow-xs space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#897887]">
              Predicted Next Period
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif-title text-3xl font-bold text-[#C65B83]">
                {new Date(cycleStatus.predictedNextPeriodDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
              <span className="text-xs font-semibold text-[#897887]">
                (±{cycleStatus.confidenceIntervalDays} days)
              </span>
            </div>
            <p className="text-xs text-[#897887]">
              Estimated start based on your typical {profile.typicalCycleLength}-day cycle and recent regularity.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#F9DCE7] shadow-xs space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#897887]">
              Estimated Fertile Window
            </span>
            <div className="font-serif-title text-2xl font-bold text-[#382536]">
              {new Date(cycleStatus.estimatedOvulationDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}{' '}
              <span className="text-sm font-sans font-normal text-[#897887]">± 2 days</span>
            </div>
            <p className="text-xs text-[#897887]">
              Natural cervical fluid is typically clear and slippery (egg-white) around this time.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#F9DCE7] shadow-xs space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#897887]">
              Current Rhythm
            </span>
            <div className="flex items-center gap-2 font-serif-title text-2xl font-bold text-[#382536]">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: cycleStatus.phaseInfo.accentColor }}
              />
              <span>{cycleStatus.phaseInfo.name}</span>
            </div>
            <p className="text-xs text-[#897887]">
              Day {cycleStatus.cycleDay} • {cycleStatus.phaseInfo.focus}
            </p>
          </div>
        </div>

        {/* Interactive Calendar Grid */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#F9DCE7] shadow-xs">
          {/* Calendar Month Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#F9DCE7]">
            <h2 className="font-serif-title text-2xl font-bold text-[#382536]">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>

            <div className="flex items-center gap-2">
              <button
                onClick={prevMonth}
                className="p-2 rounded-xl text-[#897887] hover:bg-[#FFF9FB] hover:text-[#382536] border border-[#F9DCE7]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 rounded-xl text-[#897887] hover:bg-[#FFF9FB] hover:text-[#382536] border border-[#F9DCE7]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Day of Week Labels */}
          <div className="grid grid-cols-7 gap-2 pt-4 pb-2 text-center text-xs font-bold text-[#897887]">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {/* Blank filler days for first week */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`blank-${i}`} className="h-16 sm:h-20 rounded-2xl bg-[#FFF9FB]/40" />
            ))}

            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const phase = getDayPhaseColor(dayNum);
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
              const isToday = dateStr === new Date().toISOString().split('T')[0];
              const isSelected = dateStr === selectedDate;

              return (
                <div
                  key={dayNum}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`h-16 sm:h-20 p-1.5 sm:p-2 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                    isSelected ? 'ring-2 ring-[#C65B83] shadow-xs' : ''
                  }`}
                  style={{
                    backgroundColor: phase.bg,
                    borderColor: phase.border,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold ${
                        isToday
                          ? 'w-6 h-6 rounded-full bg-[#C65B83] text-white flex items-center justify-center'
                          : 'text-[#382536]'
                      }`}
                    >
                      {dayNum}
                    </span>
                    {phase.label === 'Menstrual' && (
                      <Droplet className="w-3 h-3 text-[#C65B83] fill-[#C65B83]" />
                    )}
                  </div>
                  <span
                    className="text-[10px] font-semibold truncate hidden sm:block"
                    style={{ color: phase.text }}
                  >
                    {phase.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Phase Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6 mt-6 border-t border-[#F9DCE7] text-xs">
            {Object.values(CYCLE_PHASES).map((ph) => (
              <div key={ph.name} className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: ph.accentColor }}
                />
                <span className="text-[#382536] font-medium">{ph.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Past Cycle History Log List */}
        <div className="p-6 rounded-3xl bg-white border border-[#F9DCE7] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-title text-xl font-bold text-[#382536]">
              Logged Cycles History
            </h3>
            <span className="text-xs text-[#897887]">
              {cycleLogs.length} verified cycles recorded
            </span>
          </div>

          <div className="divide-y divide-[#F9DCE7]">
            {cycleLogs.map((log) => (
              <div
                key={log.id}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#382536]">
                      Started {new Date(log.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F9DCE7] text-[#C65B83]">
                      Flow: {log.flowIntensity}
                    </span>
                  </div>
                  <p className="text-[#897887] mt-0.5">
                    Cycle Length: ~{log.cycleLength} days • Bleeding: ~{log.periodDuration} days
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[#897887]">
                  {log.symptoms.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-[#FFF9FB] border border-[#F9DCE7]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Log Period Modal */}
      {logModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#F9DCE7] space-y-4">
            <h3 className="font-serif-title text-xl font-bold text-[#382536]">
              Log Period Flow
            </h3>

            <div>
              <label className="block text-xs font-semibold text-[#382536] mb-1">
                Period Start Date
              </label>
              <input
                type="date"
                value={logStartDate}
                onChange={(e) => setLogStartDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#F9DCE7] text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#382536] mb-1">
                Flow Intensity
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {['spotting', 'light', 'medium', 'heavy'].map((flow) => (
                  <button
                    key={flow}
                    type="button"
                    onClick={() => setLogFlow(flow as any)}
                    className={`py-2 px-1 rounded-xl text-xs font-medium border text-center capitalize transition ${
                      logFlow === flow
                        ? 'bg-[#C65B83] text-white border-[#C65B83]'
                        : 'bg-white border-[#F9DCE7] text-[#897887]'
                    }`}
                  >
                    {flow}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#F9DCE7]">
              <button
                type="button"
                onClick={() => setLogModalOpen(false)}
                className="px-4 py-2 rounded-full text-xs text-[#897887]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePeriodLog}
                className="px-5 py-2 rounded-full text-xs font-semibold bg-[#C65B83] text-white"
              >
                Save Period Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
