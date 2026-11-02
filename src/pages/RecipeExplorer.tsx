/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  UtensilsCrossed,
  Search,
  Filter,
  Sparkles,
  Clock,
  ArrowRight,
  Flame,
} from 'lucide-react';
import Navigation from '../components/Navigation';
import RecipeDetailModal from '../components/RecipeDetailModal';
import { foodoscopeService } from '../services/foodoscopeService';
import { Recipe, CyclePhaseKey } from '../types';

export default function RecipeExplorer() {
  const [search, setSearch] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<Recipe['category'] | 'all'>('all');
  const [selectedPhase, setSelectedPhase] = useState<CyclePhaseKey | 'all'>('all');
  const [pcosOnly, setPcosOnly] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const cuisines = ['All', 'North Indian', 'South Indian', 'West Indian', 'Pan-Indian'];
  const categories = [
    { key: 'all', label: 'All Meals' },
    { key: 'breakfast', label: 'Breakfast' },
    { key: 'lunch', label: 'Lunch' },
    { key: 'evening_snack', label: 'Evening Snacks' },
    { key: 'dinner', label: 'Dinner' },
  ];
  const phases: (CyclePhaseKey | 'all')[] = ['all', 'MENSTRUAL', 'FOLLICULAR', 'OVULATORY', 'LUTEAL'];

  const recipes = foodoscopeService.getRecipes({
    search,
    cuisine: selectedCuisine,
    category: selectedCategory === 'all' ? undefined : selectedCategory,
    phase: selectedPhase === 'all' ? undefined : selectedPhase,
    pcosOnly,
  });

  return (
    <div className="min-h-screen bg-[#FFF9FB] flex flex-col">
      <Navigation />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F9DCE7] text-[#C65B83] mb-1">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Foodoscope RecipeDB • Nutritional Composition</span>
            </div>
            <h1 className="font-serif-title text-3xl font-bold text-[#382536]">
              Recipe Discovery & Intelligence
            </h1>
            <p className="text-xs text-[#897887]">
              Browse recipes categorized by regional culinary traditions, cycle phases, and insulin sensitivity.
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white p-6 rounded-3xl border border-[#F9DCE7] shadow-xs space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#897887] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search recipes, ingredients (e.g. moong, ragi, spinach, tofu, makhana)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-[#FFF9FB] border border-[#F9DCE7] text-sm text-[#382536] focus:border-[#C65B83] outline-hidden"
            />
          </div>

          {/* Filter Rows */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Cuisine Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-semibold text-[#382536] mr-1">Cuisine:</span>
              {cuisines.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedCuisine(c)}
                  className={`px-3 py-1 rounded-full border transition ${
                    selectedCuisine === c
                      ? 'bg-[#C65B83] text-white border-[#C65B83]'
                      : 'bg-white border-[#F9DCE7] text-[#897887] hover:border-[#EFA6BE]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* PCOS Only Toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none font-semibold text-[#382536]">
              <input
                type="checkbox"
                checked={pcosOnly}
                onChange={(e) => setPcosOnly(e.target.checked)}
                className="w-4 h-4 accent-[#C65B83] rounded-md"
              />
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#C65B83]" /> PCOS-Fit Only
              </span>
            </label>
          </div>

          {/* Meal Category & Phase Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F9DCE7] text-xs">
            {/* Meal Category */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-semibold text-[#382536] mr-1">Meal:</span>
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key as any)}
                  className={`px-3 py-1 rounded-full border transition ${
                    selectedCategory === cat.key
                      ? 'bg-[#EFA6BE] text-white border-[#EFA6BE]'
                      : 'bg-[#FFF9FB] border-[#F9DCE7] text-[#897887]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Cycle Phase */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-semibold text-[#382536] mr-1">Phase:</span>
              {phases.map((ph) => (
                <button
                  key={ph}
                  type="button"
                  onClick={() => setSelectedPhase(ph)}
                  className={`px-3 py-1 rounded-full border uppercase text-[10px] tracking-wider transition ${
                    selectedPhase === ph
                      ? 'bg-[#A8B99B] text-white border-[#A8B99B] font-bold'
                      : 'bg-[#FFF9FB] border-[#F9DCE7] text-[#897887]'
                  }`}
                >
                  {ph}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recipe Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#897887]">
            <span>Showing {recipes.length} matching recipes</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
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
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-[#382536]">
                    {recipe.cuisine}
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C65B83] text-white shadow-xs">
                    {recipe.pcosFitScore}/100 PCOS-Fit
                  </div>
                  <div className="absolute bottom-2 right-3 px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/60 text-white flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes}m total</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-serif-title text-lg font-bold text-[#382536] line-clamp-1 group-hover:text-[#C65B83] transition">
                      {recipe.title}
                    </h3>
                    <p className="text-xs text-[#897887] line-clamp-2 mt-1">
                      {recipe.pcosScoreReasoning.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 py-2 px-3 rounded-xl bg-[#FFF9FB] border border-[#F9DCE7] text-center text-[10px]">
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
                    <div>
                      <span className="block text-[#897887]">GI</span>
                      <span className="font-bold text-emerald-600 uppercase">{recipe.nutrients.glycemicIndex}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#C65B83] font-semibold pt-1">
                    <span>Instructions & Nutrition</span>
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
