/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  Heart,
  Droplet,
  Flame,
  ArrowRight,
  Clock,
  Activity,
  ShoppingBag,
  MessageSquareHeart,
  ChevronRight,
  Plus,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import Navigation from '../components/Navigation';
import DailyCheckinModal from '../components/DailyCheckinModal';
import RecipeDetailModal from '../components/RecipeDetailModal';
import { storageService, DEFAULT_DEMO_PROFILE } from '../services/storageService';
import { cyclePredictionService } from '../services/cyclePredictionService';
import { foodoscopeService } from '../services/foodoscopeService';
import { EXERCISE_ROUTINES } from '../data/exerciseData';
import { Recipe } from '../types';

export default function Dashboard() {
  const [profile, setProfile] = useState(() => storageService.getUserProfile() || DEFAULT_DEMO_PROFILE);
  const [checkinModalOpen, setCheckinModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const cycleStatus = cyclePredictionService.calculateCycleStatus(profile);
  const todayCheckin = storageService.getDailyCheckins().find(
    (c) => c.date === new Date().toISOString().split('T')[0]
  );

  const mealRecs = foodoscopeService.getTimeOfDayRecommendations(
    cycleStatus.currentPhase,
    profile.pcosStatus === 'diagnosed' || profile.pcosStatus === 'suspected'
  );

  const todaysMovement = EXERCISE_ROUTINES.find((r) =>
    r.phaseSuitability.includes(cycleStatus.currentPhase)
  ) || EXERCISE_ROUTINES[0];

  const refreshData = () => {
    setProfile(storageService.getUserProfile() || DEFAULT_DEMO_PROFILE);
  };

  const getTimeGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return 'Good Morning';
    if (hr < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen bg-[#FFF9FB] flex flex-col">
      <Navigation />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        {/* Top Header / Greeting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <h1 className="font-serif-title text-2xl sm:text-4xl font-bold text-[#382536]">
              {getTimeGreeting()}, {profile.name || 'Friend'}! 🌸
            </h1>
            <p className="text-xs sm:text-sm text-[#897887] mt-1">
              Your personalized cycle & metabolic overview for {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCheckinModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-[#C65B83] text-white shadow-xs hover:bg-[#8E2B54] transition"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>{todayCheckin ? 'Update Today’s Check-in' : 'Log Daily Check-in'}</span>
            </button>
          </div>
        </div>

        {/* Hero Cycle Status Banner */}
        <div
          className="p-6 sm:p-8 rounded-3xl border border-[#F9DCE7] shadow-xs relative overflow-hidden transition"
          style={{ backgroundColor: cycleStatus.phaseInfo.bgLight }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Cycle Day & Wheel */}
            <div className="flex items-center gap-5">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#EFA6BE"
                    strokeOpacity="0.25"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke={cycleStatus.phaseInfo.accentColor}
                    strokeWidth="8"
                    strokeDasharray="264"
                    strokeDashoffset={264 - (264 * cycleStatus.cycleProgressPercent) / 100}
                    strokeLinecap="round"
                    fill="none"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] uppercase font-bold text-[#897887]">Day</span>
                  <span className="text-2xl sm:text-3xl font-serif-title font-bold text-[#382536]">
                    {cycleStatus.cycleDay}
                  </span>
                  <span className="text-[10px] text-[#897887]">of ~{profile.typicalCycleLength}</span>
                </div>
              </div>

              <div>
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-1"
                  style={{
                    backgroundColor: `${cycleStatus.phaseInfo.accentColor}20`,
                    color: cycleStatus.phaseInfo.accentColor,
                  }}
                >
                  {cycleStatus.phaseInfo.name}
                </span>
                <h3 className="font-serif-title text-xl font-bold text-[#382536]">
                  {cycleStatus.phaseInfo.focus}
                </h3>
                <p className="text-xs text-[#897887] mt-0.5">
                  Next period predicted in <strong>{cycleStatus.daysUntilNextPeriod} days</strong> (±{cycleStatus.confidenceIntervalDays}d)
                </p>
              </div>
            </div>

            {/* Today's Context / Check-in summary */}
            <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-xs border border-[#F9DCE7] space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#382536]">
                <span>Today's Check-in Status</span>
                <span className="text-[#C65B83]">
                  {todayCheckin ? 'Logged ✓' : 'Pending Check-in'}
                </span>
              </div>
              {todayCheckin ? (
                <div className="text-xs text-[#382536] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[#897887]">Energy:</span>
                    <span className="font-semibold">{todayCheckin.energyScore}/5</span>
                    <span className="text-[#897887] ml-2">Mood:</span>
                    <span className="font-semibold capitalize">{todayCheckin.mood}</span>
                  </div>
                  {todayCheckin.symptoms.length > 0 && (
                    <div className="text-[#897887] truncate">
                      Symptoms: <span className="text-[#382536]">{todayCheckin.symptoms.join(', ')}</span>
                    </div>
                  )}
                  {todayCheckin.cravings.length > 0 && (
                    <div className="text-[#897887] truncate">
                      Cravings: <span className="text-[#C9822C] font-medium">{todayCheckin.cravings.join(', ')}</span>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xs text-[#897887] leading-relaxed">
                  Log your flow, cramps, cervical fluid, and cravings to fine-tune today's meals.
                </p>
              )}
            </div>

            {/* Quick Link to Cycle Calendar */}
            <div className="flex flex-col sm:flex-row lg:flex-col justify-center gap-2">
              <Link
                to="/cycle"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#F9DCE7] text-xs font-semibold text-[#382536] hover:bg-[#FFF9FB] transition"
              >
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#C65B83]" />
                  <span>Cycle Calendar & Predictions</span>
                </span>
                <ChevronRight className="w-4 h-4 text-[#897887]" />
              </Link>
              <Link
                to="/pcos-hub"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#F9DCE7] text-xs font-semibold text-[#382536] hover:bg-[#FFF9FB] transition"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#A8B99B]" />
                  <span>PCOS Nutrition Hub</span>
                </span>
                <ChevronRight className="w-4 h-4 text-[#897887]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Craving Solver Quick Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FFF9FB] via-[#F2C078]/20 to-[#FFF9FB] border border-[#F2C078]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F2C078]/40 text-[#C9822C] flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#382536]">
                What are you craving today?
              </h4>
              <p className="text-xs text-[#897887]">
                Use FlavorDB molecular pairing to satisfy chocolate, salty, or sweet cravings with zero insulin spikes.
              </p>
            </div>
          </div>
          <Link
            to="/craving-swap"
            className="shrink-0 px-5 py-2 rounded-full text-xs font-bold bg-[#C9822C] text-white hover:bg-[#A3661C] shadow-xs transition flex items-center gap-1.5"
          >
            <span>Solve Craving</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Today's Meals Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif-title text-2xl font-bold text-[#382536]">
                Today's Time-of-Day Nutrition
              </h2>
              <p className="text-xs text-[#897887]">
                Curated from RecipeDB for your {cycleStatus.phaseInfo.name} • High protein, anti-inflammatory & low GI
              </p>
            </div>
            <Link
              to="/recipes"
              className="text-xs font-semibold text-[#C65B83] hover:underline flex items-center gap-1"
            >
              <span>Explore All Recipes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Breakfast', icon: Clock, recipe: mealRecs.breakfast, timeStr: '7:30 – 9:00 AM' },
              { label: 'Lunch', icon: Clock, recipe: mealRecs.lunch, timeStr: '12:30 – 2:00 PM' },
              { label: 'Evening Snack', icon: Clock, recipe: mealRecs.snack, timeStr: '4:30 – 5:30 PM' },
              { label: 'Dinner', icon: Clock, recipe: mealRecs.dinner, timeStr: '7:30 – 8:30 PM' },
            ].map(({ label, recipe, timeStr }) => (
              <div
                key={label}
                onClick={() => setSelectedRecipe(recipe)}
                className="bg-white rounded-3xl border border-[#F9DCE7] overflow-hidden shadow-xs hover:shadow-md transition cursor-pointer flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-xs text-[#382536] shadow-xs">
                    {label}
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C65B83] text-white shadow-xs">
                    {recipe.pcosFitScore}/100 PCOS-Fit
                  </div>
                  <div className="absolute bottom-2 left-3 text-white text-[11px] font-medium drop-shadow-md">
                    {timeStr}
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#897887] tracking-wider">
                      {recipe.cuisine}
                    </span>
                    <h3 className="font-serif-title text-base font-bold text-[#382536] line-clamp-1 group-hover:text-[#C65B83] transition">
                      {recipe.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-1 py-1.5 px-2 rounded-xl bg-[#FFF9FB] border border-[#F9DCE7]/60 text-center text-[10px]">
                    <div>
                      <span className="block text-[#897887]">Calories</span>
                      <span className="font-bold text-[#382536]">{recipe.nutrients.calories}</span>
                    </div>
                    <div>
                      <span className="block text-[#897887]">Protein</span>
                      <span className="font-bold text-[#382536]">{recipe.nutrients.proteinGrams}g</span>
                    </div>
                    <div>
                      <span className="block text-[#897887]">Fiber</span>
                      <span className="font-bold text-[#382536]">{recipe.nutrients.fiberGrams}g</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#C65B83] font-semibold pt-1">
                    <span>View Recipe & Steps</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Movement & Hydration Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Movement Card */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-[#F9DCE7] shadow-xs flex flex-col sm:flex-row gap-6 items-center">
            <div className="w-full sm:w-48 h-40 rounded-2xl overflow-hidden shrink-0">
              <img
                src={todaysMovement.imageUrl}
                alt={todaysMovement.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#EBF2E8] text-emerald-800">
                  {todaysMovement.intensity}
                </span>
                <span className="text-xs text-[#897887]">
                  {todaysMovement.durationMinutes} Minutes
                </span>
              </div>
              <h3 className="font-serif-title text-xl font-bold text-[#382536]">
                {todaysMovement.title}
              </h3>
              <p className="text-xs text-[#897887] leading-relaxed">
                {todaysMovement.pcosTarget}
              </p>
              <div className="pt-2 flex items-center gap-3">
                <Link
                  to="/movement"
                  className="px-4 py-2 rounded-full text-xs font-semibold bg-[#A8B99B] text-white hover:bg-[#859876] transition flex items-center gap-1.5"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Start Routine</span>
                </Link>
                <span className="text-[11px] text-[#897887]">
                  Matched to your {cycleStatus.phaseInfo.name}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Grocery & AI Assistant Actions */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#FFF9FB] to-[#F9DCE7]/30 border border-[#F9DCE7] flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#C65B83] text-white flex items-center justify-center mb-3">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="font-serif-title text-lg font-bold text-[#382536]">
                Flourish Market Shopping List
              </h3>
              <p className="text-xs text-[#897887] leading-relaxed mt-1">
                Your weekly grocery essentials automatically gathered from your phase meal plan.
              </p>
            </div>

            <div className="space-y-2">
              <Link
                to="/market"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-white border border-[#F9DCE7] text-[#382536] hover:bg-[#FFF9FB] transition flex items-center justify-between"
              >
                <span>Open Grocery Planner</span>
                <ChevronRight className="w-4 h-4 text-[#897887]" />
              </Link>
              <Link
                to="/ask-fem"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#C65B83] text-white hover:bg-[#8E2B54] transition flex items-center justify-between shadow-xs"
              >
                <span className="flex items-center gap-1.5">
                  <MessageSquareHeart className="w-4 h-4" /> Ask Flourish AI Guide
                </span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Daily Checkin Modal */}
      <DailyCheckinModal
        isOpen={checkinModalOpen}
        onClose={() => setCheckinModalOpen(false)}
        onSaved={refreshData}
      />

      {/* Recipe Detail Modal */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
}
