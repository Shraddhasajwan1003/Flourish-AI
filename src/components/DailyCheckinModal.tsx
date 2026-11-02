/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { X, Check, Droplet, Heart, Sparkles, Smile, BatteryCharging, AlertCircle } from 'lucide-react';
import { DailyCheckin } from '../types';
import { storageService } from '../services/storageService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

const COMMON_SYMPTOMS = [
  'Mild Cramps',
  'Bloating',
  'Headache',
  'Breast Tenderness',
  'Backache',
  'Fatigue',
  'Acne',
  'Clear Skin Glow',
  'Digestive Ease',
];

const CRAVINGS_LIST = [
  'Dark Chocolate',
  'Salty / Crunchy',
  'Warm Comfort Food',
  'Sweet / Pastry',
  'Fresh Fruit',
  'Spicy Savory',
  'Fried Snacks',
];

export default function DailyCheckinModal({ isOpen, onClose, onSaved }: Props) {
  const todayStr = new Date().toISOString().split('T')[0];
  const existingCheckins = storageService.getDailyCheckins();
  const existingToday = existingCheckins.find((c) => c.date === todayStr);

  const [mood, setMood] = useState<DailyCheckin['mood']>(existingToday?.mood || 'calm');
  const [energyScore, setEnergyScore] = useState<number>(existingToday?.energyScore || 3);
  const [flowIntensity, setFlowIntensity] = useState<DailyCheckin['flowIntensity']>(
    existingToday?.flowIntensity || 'none'
  );
  const [symptoms, setSymptoms] = useState<string[]>(existingToday?.symptoms || []);
  const [cravings, setCravings] = useState<string[]>(existingToday?.cravings || []);
  const [dischargeType, setDischargeType] = useState<DailyCheckin['dischargeType']>(
    existingToday?.dischargeType || 'creamy'
  );
  const [waterCups, setWaterCups] = useState<number>(existingToday?.waterCups || 5);

  if (!isOpen) return null;

  const toggleSymptom = (sym: string) => {
    setSymptoms((prev) =>
      prev.includes(sym) ? prev.filter((s) => s !== sym) : [...prev, sym]
    );
  };

  const toggleCraving = (crv: string) => {
    setCravings((prev) =>
      prev.includes(crv) ? prev.filter((c) => c !== crv) : [...prev, crv]
    );
  };

  const handleSave = () => {
    const checkin: DailyCheckin = {
      id: existingToday?.id || `chk_${Date.now()}`,
      date: todayStr,
      mood,
      energyScore,
      flowIntensity,
      symptoms,
      cravings,
      dischargeType,
      waterCups,
    };
    storageService.saveDailyCheckin(checkin);
    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#F9DCE7] my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#F9DCE7]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#F9DCE7] flex items-center justify-center text-[#C65B83]">
              <Heart className="w-4 h-4 fill-[#C65B83]" />
            </div>
            <div>
              <h2 className="font-serif-title text-xl font-bold text-[#382536]">
                Today's Daily Check-in
              </h2>
              <p className="text-xs text-[#897887]">
                Tuning in to your body for {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#897887] hover:bg-[#FFF9FB] hover:text-[#382536]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-6">
          {/* Energy Level Slider */}
          <div>
            <label className="flex items-center justify-between text-xs font-semibold text-[#382536] mb-2">
              <span className="flex items-center gap-1.5">
                <BatteryCharging className="w-4 h-4 text-[#C65B83]" /> Energy Level (1-5)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#F9DCE7] text-[#C65B83] text-xs font-bold">
                Level {energyScore}/5
              </span>
            </label>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={energyScore}
              onChange={(e) => setEnergyScore(Number(e.target.value))}
              className="w-full accent-[#C65B83] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#897887] mt-1">
              <span>Exhausted</span>
              <span>Balanced</span>
              <span>High Vitality</span>
            </div>
          </div>

          {/* Mood Selection */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-[#382536] mb-2">
              <Smile className="w-4 h-4 text-[#C65B83]" /> Emotional Mood
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'energetic', label: 'Energetic ✨' },
                { key: 'calm', label: 'Calm & Grounded 🌸' },
                { key: 'sensitive', label: 'Sensitive 🌿' },
                { key: 'low', label: 'Low Energy ☁️' },
                { key: 'anxious', label: 'Anxious / Restless ⚡' },
                { key: 'irritable', label: 'Short Temper 🔥' },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setMood(item.key as any)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition ${
                    mood === item.key
                      ? 'border-[#C65B83] bg-[#F9DCE7]/60 text-[#382536] font-semibold'
                      : 'border-[#F9DCE7] text-[#897887] hover:bg-[#FFF9FB]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Menstrual Flow Intensity */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-[#382536] mb-2">
              <Droplet className="w-4 h-4 text-[#C65B83]" /> Period Flow Intensity
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {[
                { key: 'none', label: 'None' },
                { key: 'spotting', label: 'Spotting' },
                { key: 'light', label: 'Light' },
                { key: 'medium', label: 'Medium' },
                { key: 'heavy', label: 'Heavy' },
              ].map((flow) => (
                <button
                  key={flow.key}
                  type="button"
                  onClick={() => setFlowIntensity(flow.key as any)}
                  className={`py-1.5 px-1 rounded-xl text-[11px] font-medium border text-center transition ${
                    flowIntensity === flow.key
                      ? 'border-[#C65B83] bg-[#C65B83] text-white font-semibold'
                      : 'border-[#F9DCE7] text-[#897887] hover:bg-[#FFF9FB]'
                  }`}
                >
                  {flow.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cervical Discharge / Secretion */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-[#382536] mb-1">
              <Sparkles className="w-4 h-4 text-[#C65B83]" /> Natural Fluid & Discharge Pattern
            </label>
            <p className="text-[11px] text-[#897887] mb-2">
              Healthy natural discharges mirror estrogen and ovulation stages.
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {[
                { key: 'dry', label: 'Dry / Minimal' },
                { key: 'sticky', label: 'Sticky / Tacky' },
                { key: 'creamy', label: 'Creamy Lotion' },
                { key: 'egg_white', label: 'Egg-White (Fertile)' },
                { key: 'watery', label: 'Watery / Clear' },
              ].map((d) => (
                <button
                  key={d.key}
                  type="button"
                  onClick={() => setDischargeType(d.key as any)}
                  className={`py-1.5 px-1 rounded-xl text-[11px] font-medium border text-center transition ${
                    dischargeType === d.key
                      ? 'border-[#A8B99B] bg-[#EBF2E8] text-[#382536] font-semibold'
                      : 'border-[#F9DCE7] text-[#897887] hover:bg-[#FFF9FB]'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Symptoms Checklist */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-[#382536] mb-2">
              <AlertCircle className="w-4 h-4 text-[#C65B83]" /> Physical Symptoms Today
            </label>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_SYMPTOMS.map((sym) => {
                const checked = symptoms.includes(sym);
                return (
                  <button
                    key={sym}
                    type="button"
                    onClick={() => toggleSymptom(sym)}
                    className={`px-3 py-1 rounded-full text-xs transition flex items-center gap-1 ${
                      checked
                        ? 'bg-[#EFA6BE] text-white font-medium'
                        : 'bg-[#FFF9FB] border border-[#F9DCE7] text-[#897887] hover:border-[#EFA6BE]'
                    }`}
                  >
                    {checked && <Check className="w-3 h-3" />}
                    <span>{sym}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Food Cravings */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-[#382536] mb-2">
              <Sparkles className="w-4 h-4 text-[#C65B83]" /> Any Specific Cravings?
            </label>
            <div className="flex flex-wrap gap-1.5">
              {CRAVINGS_LIST.map((crv) => {
                const checked = cravings.includes(crv);
                return (
                  <button
                    key={crv}
                    type="button"
                    onClick={() => toggleCraving(crv)}
                    className={`px-3 py-1 rounded-full text-xs transition flex items-center gap-1 ${
                      checked
                        ? 'bg-[#F2C078] text-[#382536] font-semibold'
                        : 'bg-[#FFF9FB] border border-[#F9DCE7] text-[#897887] hover:border-[#F2C078]'
                    }`}
                  >
                    {checked && <Check className="w-3 h-3" />}
                    <span>{crv}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hydration Tracker */}
          <div>
            <label className="flex items-center justify-between text-xs font-semibold text-[#382536] mb-2">
              <span className="flex items-center gap-1.5">
                <Droplet className="w-4 h-4 text-sky-500 fill-sky-200" /> Daily Water Intake
              </span>
              <span className="text-[#897887]">{waterCups} of 8 glasses (~{waterCups * 250} ml)</span>
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((cup) => (
                <button
                  key={cup}
                  type="button"
                  onClick={() => setWaterCups(cup)}
                  className={`flex-1 h-9 rounded-xl flex items-center justify-center transition ${
                    cup <= waterCups
                      ? 'bg-sky-500 text-white shadow-xs'
                      : 'bg-sky-50 border border-sky-100 text-sky-300 hover:bg-sky-100'
                  }`}
                >
                  <Droplet className="w-4 h-4 fill-current" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F9DCE7]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full text-xs font-medium text-[#897887] hover:bg-[#FFF9FB]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 rounded-full text-xs font-semibold bg-[#C65B83] text-white shadow-sm hover:bg-[#8E2B54] transition"
          >
            Save Today's Check-in
          </button>
        </div>
      </div>
    </div>
  );
}
