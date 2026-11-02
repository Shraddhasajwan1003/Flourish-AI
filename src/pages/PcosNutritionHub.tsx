/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Info,
  CheckCircle2,
  Calendar,
  Flame,
  Search,
} from 'lucide-react';
import Navigation from '../components/Navigation';
import RecipeDetailModal from '../components/RecipeDetailModal';
import { foodoscopeService } from '../services/foodoscopeService';
import { storageService, DEFAULT_DEMO_PROFILE } from '../services/storageService';
import { cyclePredictionService } from '../services/cyclePredictionService';
import { Recipe } from '../types';

export default function PcosNutritionHub() {
  const [profile] = useState(() => storageService.getUserProfile() || DEFAULT_DEMO_PROFILE);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'high_protein' | 'high_fiber' | 'seed_cycling'>('all');
  const [search, setSearch] = useState('');

  const cycleStatus = cyclePredictionService.calculateCycleStatus(profile);
  const allRecipes = foodoscopeService.getRecipes({ pcosOnly: true, search });

  const filteredRecipes = allRecipes.filter((r) => {
    if (selectedFilter === 'high_protein') return r.nutrients.proteinGrams >= 15;
    if (selectedFilter === 'high_fiber') return r.nutrients.fiberGrams >= 8;
    if (selectedFilter === 'seed_cycling') return r.tags.includes('Seed Cycling') || r.tags.includes('PCOS Superfood');
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FFF9FB] flex flex-col">
      <Navigation />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        {/* Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#FFF9FB] via-[#F9DCE7]/40 to-[#EBF2E8] border border-[#EFA6BE]/60 shadow-xs">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#C65B83] text-white">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Evidence-Informed Metabolic & Hormonal Support</span>
            </div>
            <h1 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#382536]">
              PCOS / PCOD Nutrition Mode
            </h1>
            <p className="text-xs sm:text-sm text-[#897887] leading-relaxed">
              Every recipe in this dedicated hub is filtered to prevent hyperinsulinemia, reduce ovarian inflammation, and encourage estrogen clearance through natural soluble and insoluble dietary fibers.
            </p>
          </div>
        </div>

        {/* 3 Core PCOS Dietary Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-[#F9DCE7] shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#F9DCE7] text-[#C65B83] flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h3 className="font-serif-title text-base font-bold text-[#382536]">
              Low Glycemic Pacing
            </h3>
            <p className="text-xs text-[#897887] leading-relaxed">
              Complex millets (Ragi, Jowar, Bajra) and sprouted legumes prevent post-prandial insulin surges that trigger excess ovarian androgen synthesis.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#F9DCE7] shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#EBF2E8] text-emerald-800 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h3 className="font-serif-title text-base font-bold text-[#382536]">
              Estrogen-Binding Fiber
            </h3>
            <p className="text-xs text-[#897887] leading-relaxed">
              Targeting 30g+ daily dietary fiber helps bind metabolized estrogens in the gut, preventing recirculating dominance that causes breast tenderness and heavy flow.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#F9DCE7] shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#F2C078]/30 text-[#C9822C] flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h3 className="font-serif-title text-base font-bold text-[#382536]">
              Inositol & Magnesium Rich
            </h3>
            <p className="text-xs text-[#897887] leading-relaxed">
              Prioritizing natural sources of myo-inositol and intracellular magnesium to support glucose transporter (GLUT4) translocation and relieve muscular cramps.
            </p>
          </div>
        </div>

        {/* Seed Cycling Protocol Banner */}
        <div className="p-6 rounded-3xl bg-white border border-[#F9DCE7] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F9DCE7]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C65B83]">
                Naturopathic Hormone Rhythms
              </span>
              <h2 className="font-serif-title text-xl font-bold text-[#382536]">
                Today's Seed Cycling Recommendation
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF9FB] border border-[#F9DCE7] text-[#382536]">
              Cycle Day {cycleStatus.cycleDay} • {cycleStatus.currentPhase}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-2xl border transition ${
                cycleStatus.cycleDay <= 14
                  ? 'border-[#C65B83] bg-[#FFF9FB] ring-2 ring-[#EFA6BE]'
                  : 'border-[#F9DCE7] bg-white opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <strong className="text-sm text-[#382536]">Days 1–14 (Follicular Phase)</strong>
                {cycleStatus.cycleDay <= 14 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C65B83] text-white">
                    Active Phase
                  </span>
                )}
              </div>
              <p className="text-xs text-[#C65B83] font-semibold mb-1">
                1 tbsp Ground Flaxseeds + 1 tbsp Raw Pumpkin Seeds
              </p>
              <p className="text-[11px] text-[#897887] leading-relaxed">
                Flax lignans bind excess estrogens, while zinc in pumpkin seeds nourishes growing follicles to prepare for healthy ovulation.
              </p>
            </div>

            <div
              className={`p-4 rounded-2xl border transition ${
                cycleStatus.cycleDay > 14
                  ? 'border-[#C9822C] bg-[#FFF8ED] ring-2 ring-[#F2C078]'
                  : 'border-[#F9DCE7] bg-white opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <strong className="text-sm text-[#382536]">Days 15–28+ (Luteal Phase)</strong>
                {cycleStatus.cycleDay > 14 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C9822C] text-white">
                    Active Phase
                  </span>
                )}
              </div>
              <p className="text-xs text-[#C9822C] font-semibold mb-1">
                1 tbsp Raw Sunflower Seeds + 1 tbsp Sesame Seeds
              </p>
              <p className="text-[11px] text-[#897887] leading-relaxed">
                Rich in vitamin E and selenium, this combination supports the corpus luteum and natural progesterone production to ease PMS.
              </p>
            </div>
          </div>
        </div>

        {/* Recipe Grid & Filters */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif-title text-xl font-bold text-[#382536]">
                PCOS-Fit Verified Recipes (Score 88+)
              </h3>
              <p className="text-xs text-[#897887]">
                Sourced from RecipeDB with verified macro profiles
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All Recipes' },
                { key: 'high_protein', label: 'High Protein (15g+)' },
                { key: 'high_fiber', label: 'High Fiber (8g+)' },
                { key: 'seed_cycling', label: 'Hormone Balancing' },
              ].map((btn) => (
                <button
                  key={btn.key}
                  type="button"
                  onClick={() => setSelectedFilter(btn.key as any)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                    selectedFilter === btn.key
                      ? 'bg-[#C65B83] text-white border-[#C65B83]'
                      : 'bg-white border-[#F9DCE7] text-[#897887] hover:border-[#EFA6BE]'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
                className="bg-white rounded-3xl border border-[#F9DCE7] overflow-hidden shadow-xs hover:shadow-md transition cursor-pointer flex flex-col group"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#C65B83] text-white shadow-xs">
                    {recipe.pcosFitScore}/100 PCOS-Fit
                  </div>
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-[#382536] uppercase">
                    {recipe.cuisine}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="font-serif-title text-lg font-bold text-[#382536] line-clamp-1 group-hover:text-[#C65B83] transition">
                      {recipe.title}
                    </h4>
                    <p className="text-xs text-[#897887] line-clamp-2 mt-1">
                      {recipe.pcosScoreReasoning.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 py-2 px-3 rounded-xl bg-[#FFF9FB] border border-[#F9DCE7] text-center text-[10px]">
                    <div>
                      <span className="block text-[#897887]">Protein</span>
                      <span className="font-bold text-[#382536]">{recipe.nutrients.proteinGrams}g</span>
                    </div>
                    <div>
                      <span className="block text-[#897887]">Fiber</span>
                      <span className="font-bold text-[#382536]">{recipe.nutrients.fiberGrams}g</span>
                    </div>
                    <div>
                      <span className="block text-[#897887]">Sugar</span>
                      <span className="font-bold text-[#382536]">{recipe.nutrients.sugarGrams}g</span>
                    </div>
                    <div>
                      <span className="block text-[#897887]">Glycemic</span>
                      <span className="font-bold text-emerald-600 uppercase">{recipe.nutrients.glycemicIndex}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#C65B83] font-semibold pt-1">
                    <span>View Recipe & Instructions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <RecipeDetailModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
}
