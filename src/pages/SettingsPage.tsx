/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  Key,
  Download,
  Trash2,
  RotateCcw,
  ShieldCheck,
  Check,
  User,
  Sparkles,
} from 'lucide-react';
import Navigation from '../components/Navigation';
import { storageService, DEFAULT_DEMO_PROFILE } from '../services/storageService';
import { UserProfile } from '../types';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>(() => storageService.getUserProfile() || DEFAULT_DEMO_PROFILE);
  const [apiKeys, setApiKeys] = useState(() => storageService.getApiKeys());

  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.saveUserProfile(profile);
    storageService.saveApiKeys(apiKeys);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 3000);
  };

  const handleResetToDemo = () => {
    storageService.saveUserProfile(DEFAULT_DEMO_PROFILE);
    setProfile(DEFAULT_DEMO_PROFILE);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 3000);
  };

  const handleExportData = () => {
    const dataStr = storageService.exportAllUserData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FlourishAI_data_export_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all personal profile logs and reset?')) {
      storageService.clearUserProfile();
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9FB] flex flex-col">
      <Navigation />

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8 flex-1">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#F9DCE7]">
          <div>
            <h1 className="font-serif-title text-3xl font-bold text-[#382536]">
              Settings & Data Privacy
            </h1>
            <p className="text-xs text-[#897887]">
              Manage your personal wellness parameters, API credentials, and export your history.
            </p>
          </div>

          <button
            onClick={() => navigate('/onboarding')}
            className="px-4 py-2 rounded-full text-xs font-semibold bg-[#F9DCE7] text-[#C65B83] hover:bg-[#EFA6BE] hover:text-white transition"
          >
            Retake Full Intake
          </button>
        </div>

        {savedFeedback && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Settings successfully saved!</span>
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="space-y-6">
          {/* Section 1: Profile & Cycle Parameters */}
          <div className="p-6 rounded-3xl bg-white border border-[#F9DCE7] shadow-xs space-y-4">
            <h3 className="font-serif-title text-xl font-bold text-[#382536] flex items-center gap-2">
              <User className="w-5 h-5 text-[#C65B83]" />
              <span>Personal & Cycle Parameters</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-[#382536] mb-1">Preferred Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#F9DCE7] text-[#382536]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#382536] mb-1">Age</label>
                <input
                  type="number"
                  min="13"
                  max="65"
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-[#F9DCE7] text-[#382536]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#382536] mb-1">Region / Location</label>
                <input
                  type="text"
                  value={profile.region}
                  onChange={(e) => setProfile({ ...profile, region: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#F9DCE7] text-[#382536]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#382536] mb-1">PCOS / PCOD Status</label>
                <select
                  value={profile.pcosStatus}
                  onChange={(e) => setProfile({ ...profile, pcosStatus: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl border border-[#F9DCE7] text-[#382536]"
                >
                  <option value="diagnosed">Diagnosed by doctor</option>
                  <option value="suspected">Suspected / Symptom-based</option>
                  <option value="none">None</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#382536] mb-1">Typical Cycle Length (Days)</label>
                <input
                  type="number"
                  min="20"
                  max="60"
                  value={profile.typicalCycleLength}
                  onChange={(e) => setProfile({ ...profile, typicalCycleLength: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-[#F9DCE7] text-[#382536]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#382536] mb-1">Last Period Start Date</label>
                <input
                  type="date"
                  value={profile.lastPeriodDate}
                  onChange={(e) => setProfile({ ...profile, lastPeriodDate: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#F9DCE7] text-[#382536]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#382536] mb-1">Dietary Pattern</label>
                <select
                  value={profile.dietaryPattern}
                  onChange={(e) => setProfile({ ...profile, dietaryPattern: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl border border-[#F9DCE7] text-[#382536]"
                >
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="eggetarian">Eggetarian</option>
                  <option value="non_vegetarian">Non-Vegetarian</option>
                  <option value="pescatarian">Pescatarian</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: External API Credentials (Foodoscope & Gemini) */}
          <div className="p-6 rounded-3xl bg-white border border-[#F9DCE7] shadow-xs space-y-4">
            <h3 className="font-serif-title text-xl font-bold text-[#382536] flex items-center gap-2">
              <Key className="w-5 h-5 text-[#C65B83]" />
              <span>External API Integrations (Optional)</span>
            </h3>
            <p className="text-xs text-[#897887]">
              Flourish AI is pre-loaded with rich RecipeDB, FlavorDB, and CocktailDB datasets. You can supply your live API keys below for real-time external querying.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-[#382536] mb-1">
                  Foodoscope API Key (RecipeDB / FlavorDB)
                </label>
                <input
                  type="password"
                  placeholder="Paste Foodoscope API Key..."
                  value={apiKeys.foodoscopeKey || ''}
                  onChange={(e) => setApiKeys({ ...apiKeys, foodoscopeKey: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#F9DCE7] text-[#382536]"
                />
                <span className="text-[10px] text-[#897887] block mt-1">
                  Used for RecipeDB, FlavorDB, and CocktailDB live endpoints.
                </span>
              </div>

              <div>
                <label className="block font-semibold text-[#382536] mb-1">
                  Google Gemini API Key (Ask Flourish AI)
                </label>
                <input
                  type="password"
                  placeholder="Paste Gemini API Key..."
                  value={apiKeys.geminiKey || ''}
                  onChange={(e) => setApiKeys({ ...apiKeys, geminiKey: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#F9DCE7] text-[#382536]"
                />
                <span className="text-[10px] text-[#897887] block mt-1">
                  Defaults to runtime environment key or smart contextual engine.
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#C65B83] text-white hover:bg-[#8E2B54] transition shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Section 3: Data Management & Export */}
        <div className="p-6 rounded-3xl bg-white border border-[#F9DCE7] shadow-xs space-y-4">
          <h3 className="font-serif-title text-xl font-bold text-[#382536]">
            Data Export & Reset
          </h3>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleExportData}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-white border border-[#F9DCE7] text-[#382536] hover:bg-[#FFF9FB] transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export All Wellness Data (JSON)</span>
            </button>

            <button
              type="button"
              onClick={handleResetToDemo}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-[#F9DCE7]/60 text-[#C65B83] hover:bg-[#F9DCE7] transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restore Default Demo Profile</span>
            </button>

            <button
              type="button"
              onClick={handleClearAll}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear & Retake Intake</span>
            </button>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#FFF9FB] border border-[#F9DCE7] text-xs text-[#897887] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#A8B99B] shrink-0" />
          <span>
            Flourish AI is client-first and privacy-hardened. Your private cycle logs and sexual health notes remain strictly on your local device.
          </span>
        </div>
      </main>
    </div>
  );
}
