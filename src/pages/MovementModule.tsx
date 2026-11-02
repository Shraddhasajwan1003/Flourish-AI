/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  Activity,
  Sparkles,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Code2,
  Download,
  Copy,
  Check,
  ShieldCheck,
  ChevronRight,
  Info,
} from 'lucide-react';
import Navigation from '../components/Navigation';
import { EXERCISE_ROUTINES, PYTHON_ML_TRAINING_SCRIPT } from '../data/exerciseData';
import { storageService, DEFAULT_DEMO_PROFILE } from '../services/storageService';
import { cyclePredictionService } from '../services/cyclePredictionService';
import { ExerciseRoutine, CyclePhaseKey } from '../types';

export default function MovementModule() {
  const [profile] = useState(() => storageService.getUserProfile() || DEFAULT_DEMO_PROFILE);
  const cycleStatus = cyclePredictionService.calculateCycleStatus(profile);

  const [selectedPhase, setSelectedPhase] = useState<CyclePhaseKey | 'all'>(cycleStatus.currentPhase);
  const [activeRoutine, setActiveRoutine] = useState<ExerciseRoutine>(
    EXERCISE_ROUTINES.find((r) => r.phaseSuitability.includes(cycleStatus.currentPhase)) ||
      EXERCISE_ROUTINES[0]
  );

  // Timer State for active routine
  const [activePoseIndex, setActivePoseIndex] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(activeRoutine.posesOrSteps[0].durationSec);
  const [timerRunning, setTimerRunning] = useState(false);

  // Python ML Script modal/view
  const [showMlScript, setShowMlScript] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const routines = selectedPhase === 'all'
    ? EXERCISE_ROUTINES
    : EXERCISE_ROUTINES.filter((r) => r.phaseSuitability.includes(selectedPhase));

  const handleSelectRoutine = (routine: ExerciseRoutine) => {
    setActiveRoutine(routine);
    setActivePoseIndex(0);
    setTimerSeconds(routine.posesOrSteps[0].durationSec);
    setTimerRunning(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(PYTHON_ML_TRAINING_SCRIPT);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const handleDownloadCode = () => {
    const blob = new Blob([PYTHON_ML_TRAINING_SCRIPT], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'train_exercise_model.py';
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#FFF9FB] flex flex-col">
      <Navigation />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EBF2E8] text-emerald-800 mb-1">
              <Activity className="w-3.5 h-3.5" />
              <span>Cycle-Synchronized Movement & Recovery</span>
            </div>
            <h1 className="font-serif-title text-3xl font-bold text-[#382536]">
              Move With Your Cycle
            </h1>
            <p className="text-xs text-[#897887]">
              Align exercise intensity with follicular estrogen peaks, ovulatory power, and luteal progesterone recovery.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMlScript(!showMlScript)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-white border border-[#F9DCE7] text-[#382536] hover:bg-[#FFF9FB] transition shadow-xs"
            >
              <Code2 className="w-4 h-4 text-[#C65B83]" />
              <span>{showMlScript ? 'Hide ML Code' : 'Train Custom ML Model Code'}</span>
            </button>
          </div>
        </div>

        {/* Python ML Training Script Accordion / View (Requested by User) */}
        {showMlScript && (
          <div className="p-6 rounded-3xl bg-[#1C0E1A] text-white border border-[#C65B83]/30 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <span className="text-xs font-bold text-[#EFA6BE] uppercase tracking-wider">
                  Developer & ML Training Code
                </span>
                <h3 className="font-serif-title text-xl font-bold text-white">
                  train_exercise_model.py
                </h3>
                <p className="text-xs text-[#F9DCE7]/80">
                  Run this standalone Python script locally with your custom CSV dataset to train an XGBoost cycle-synced recommender!
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 transition text-white"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Script'}</span>
                </button>
                <button
                  onClick={handleDownloadCode}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#C65B83] hover:bg-[#8E2B54] transition text-white"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .py File</span>
                </button>
              </div>
            </div>

            <div className="bg-black/60 rounded-2xl p-4 font-mono text-xs text-emerald-400 overflow-x-auto max-h-72 overflow-y-auto">
              <pre>{PYTHON_ML_TRAINING_SCRIPT}</pre>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#F9DCE7]/80">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>
                Outputs a serialized <code>flourish_exercise_model.joblib</code> pipeline with stratified k-fold evaluation.
              </span>
            </div>
          </div>
        )}

        {/* Phase Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {(['all', 'MENSTRUAL', 'FOLLICULAR', 'OVULATORY', 'LUTEAL'] as const).map((ph) => (
            <button
              key={ph}
              type="button"
              onClick={() => setSelectedPhase(ph)}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition uppercase tracking-wider ${
                selectedPhase === ph
                  ? 'bg-[#A8B99B] text-white border-[#A8B99B] shadow-xs'
                  : 'bg-white border-[#F9DCE7] text-[#897887] hover:border-[#A8B99B]'
              }`}
            >
              {ph === 'all' ? 'All Routines' : `${ph} Phase`}
            </button>
          ))}
        </div>

        {/* Active Routine Showcase */}
        {activeRoutine && (
          <div className="bg-white rounded-3xl border border-[#F9DCE7] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="h-56 lg:h-full rounded-2xl overflow-hidden">
                <img
                  src={activeRoutine.imageUrl}
                  alt={activeRoutine.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-2 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#EBF2E8] text-emerald-800">
                    {activeRoutine.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F9DCE7] text-[#C65B83]">
                    {activeRoutine.intensity} Intensity
                  </span>
                  <span className="text-xs text-[#897887] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {activeRoutine.durationMinutes} Minutes
                  </span>
                </div>

                <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#382536]">
                  {activeRoutine.title}
                </h2>

                <p className="text-xs text-[#897887] leading-relaxed">
                  <strong className="text-[#382536]">PCOS Clinical Benefit:</strong> {activeRoutine.pcosTarget}
                </p>

                {/* Benefits Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeRoutine.benefits.map((b, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#FFF9FB] border border-[#F9DCE7] text-[#382536]"
                    >
                      ✓ {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Step-by-Step Sequence with Interactive Timer */}
            <div className="pt-4 border-t border-[#F9DCE7] space-y-4">
              <h3 className="font-serif-title text-xl font-bold text-[#382536]">
                Step-by-Step Poses & Guided Flow
              </h3>

              <div className="space-y-3">
                {activeRoutine.posesOrSteps.map((pose, idx) => {
                  const isCurrent = idx === activePoseIndex;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setActivePoseIndex(idx);
                        setTimerSeconds(pose.durationSec);
                        setTimerRunning(false);
                      }}
                      className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isCurrent
                          ? 'border-[#C65B83] bg-[#FFF9FB] ring-2 ring-[#EFA6BE]'
                          : 'border-[#F9DCE7] bg-white hover:border-[#EFA6BE]'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#F9DCE7] text-[#C65B83] font-bold text-xs flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <h4 className="text-sm font-bold text-[#382536]">{pose.name}</h4>
                          <span className="text-[10px] text-[#897887]">
                            ~{Math.round(pose.durationSec / 60)} mins
                          </span>
                        </div>
                        <p className="text-xs text-[#897887] leading-relaxed pl-8">
                          {pose.description}
                        </p>
                        {pose.caution && (
                          <p className="text-[11px] text-amber-700 pl-8 flex items-center gap-1">
                            <Info className="w-3 h-3" /> Caution: {pose.caution}
                          </p>
                        )}
                      </div>

                      {isCurrent && (
                        <div className="shrink-0 flex items-center gap-2 pl-8 sm:pl-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setTimerRunning(!timerRunning);
                            }}
                            className="px-4 py-2 rounded-full text-xs font-semibold bg-[#C65B83] text-white flex items-center gap-1.5 shadow-xs"
                          >
                            {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                            <span>{timerRunning ? 'Pause' : 'Start Pose'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modifications Checklist */}
            <div className="p-4 rounded-2xl bg-[#FFF9FB] border border-[#F9DCE7] text-xs text-[#897887] space-y-1">
              <strong className="block text-[#382536]">Gentle Modifications:</strong>
              {activeRoutine.modifications.map((m, i) => (
                <p key={i}>• {m}</p>
              ))}
            </div>
          </div>
        )}

        {/* Other Routines Grid */}
        <section className="space-y-4">
          <h3 className="font-serif-title text-xl font-bold text-[#382536]">
            All Cycle-Synced Movement Programs
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {routines.map((routine) => (
              <div
                key={routine.id}
                onClick={() => handleSelectRoutine(routine)}
                className="bg-white rounded-3xl border border-[#F9DCE7] overflow-hidden shadow-xs hover:shadow-md transition cursor-pointer flex flex-col group"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={routine.imageUrl}
                    alt={routine.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF2E8] text-emerald-800 uppercase">
                    {routine.category}
                  </div>
                  <div className="absolute bottom-2 right-3 px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/60 text-white">
                    {routine.durationMinutes}m • {routine.intensity}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="font-serif-title text-base font-bold text-[#382536] line-clamp-1 group-hover:text-[#C65B83] transition">
                      {routine.title}
                    </h4>
                    <p className="text-xs text-[#897887] line-clamp-2 mt-1">
                      {routine.pcosTarget}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#C65B83] font-semibold pt-1">
                    <span>View Pose Sequence</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
