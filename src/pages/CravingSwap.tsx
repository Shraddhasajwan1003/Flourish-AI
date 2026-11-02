/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  Flame,
  Sparkles,
  ArrowRight,
  Search,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Dna,
  ChefHat,
  Plus,
  Check,
} from 'lucide-react';
import Navigation from '../components/Navigation';
import { cravingSwapService } from '../services/cravingSwapService';
import { storageService } from '../services/storageService';
import type { CravingSwap as CravingSwapType, GroceryItem } from '../types';

export default function CravingSwap() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSwap, setActiveSwap] = useState<CravingSwapType>(cravingSwapService.getAllSwaps()[0]);
  const [addedGrocery, setAddedGrocery] = useState(false);

  const allSwaps = cravingSwapService.getAllSwaps();

  const categories = ['All', 'Rich Chocolate', 'Crispy & Salty', 'Sweet & Creamy', 'Spicy Fried', 'Syrupy Sweet'];

  const filteredSwaps = allSwaps.filter((s) => {
    const matchCat = selectedCategory === 'All' || s.cravingCategory === selectedCategory;
    const matchSearch =
      !searchQuery ||
      s.cravingName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.swapIngredientOrDish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.cravingKeywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleAddToGrocery = () => {
    const currentList = storageService.getGroceryList();
    const newItem: GroceryItem = {
      id: `gro_crav_${Date.now()}`,
      name: activeSwap.swapIngredientOrDish,
      category: 'Grains & Seeds',
      quantity: '1 batch',
      checked: false,
      pcosFriendly: true,
      estimatedPriceINR: 180,
      sourceRecipeTitle: `Craving Swap for ${activeSwap.cravingName}`,
    };
    storageService.saveGroceryList([newItem, ...currentList]);
    setAddedGrocery(true);
    setTimeout(() => setAddedGrocery(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FFF9FB] flex flex-col">
      <Navigation />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F2C078]/40 text-[#C9822C] mb-1">
              <Dna className="w-3.5 h-3.5" />
              <span>Computational Gastronomy • FlavorDB Molecular Pairing</span>
            </div>
            <h1 className="font-serif-title text-3xl font-bold text-[#382536]">
              Craving Swap Engine
            </h1>
            <p className="text-xs text-[#897887]">
              Vector cosine similarity on volatile aroma compounds to satisfy cravings with hormone-friendly functional nutrition.
            </p>
          </div>
        </div>

        {/* Search & Category Tabs */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#897887] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search what you're craving (e.g. chocolate, chips, ice cream, samosa)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#F9DCE7] text-sm text-[#382536] focus:border-[#C65B83] outline-hidden shadow-xs"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${
                  selectedCategory === cat
                    ? 'bg-[#C65B83] text-white border-[#C65B83] shadow-xs'
                    : 'bg-white border-[#F9DCE7] text-[#897887] hover:border-[#EFA6BE]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main Side-by-Side Swap Showcase */}
        {activeSwap && (
          <div className="bg-white rounded-3xl border border-[#F9DCE7] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#F9DCE7]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C9822C]">
                  {activeSwap.cravingCategory} Category Match
                </span>
                <h2 className="font-serif-title text-2xl font-bold text-[#382536] mt-0.5">
                  The Molecular Craving Breakdown
                </h2>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2E8] border border-[#A8B99B] text-emerald-800 text-xs font-bold">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Cosine Flavor Similarity: {Math.round(activeSwap.similarityScore * 100)}%</span>
              </div>
            </div>

            {/* Comparison Cards: Original vs Functional Swap */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Craved High-Sugar / Inflammatory Item */}
              <div className="p-6 rounded-3xl bg-[#FFF9FB] border border-[#F9DCE7] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700">
                    Your Current Craving
                  </span>
                  <span className="text-xs text-[#897887]">Conventional Ultra-Processed</span>
                </div>

                <h3 className="font-serif-title text-xl font-bold text-[#382536]">
                  {activeSwap.cravingName}
                </h3>

                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-white border border-[#F9DCE7]">
                    <span className="block text-[#897887] text-[10px]">Calories</span>
                    <span className="font-bold text-rose-600">{activeSwap.cravingMacros.calories}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-[#F9DCE7]">
                    <span className="block text-[#897887] text-[10px]">Added Sugar</span>
                    <span className="font-bold text-rose-600">{activeSwap.cravingMacros.sugar}g</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-[#F9DCE7]">
                    <span className="block text-[#897887] text-[10px]">Total Fat</span>
                    <span className="font-bold text-[#382536]">{activeSwap.cravingMacros.fat}g</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-[#F9DCE7]">
                    <span className="block text-[#897887] text-[10px]">Fiber</span>
                    <span className="font-bold text-[#897887]">{activeSwap.cravingMacros.fiber}g</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200/60 text-xs text-rose-800 space-y-1">
                  <span className="font-semibold block">Hormonal Impact on PCOS:</span>
                  <p className="text-[11px] leading-relaxed">
                    Spikes circulating insulin, provoking the theca cells in ovaries to produce excess free testosterone, worsening androgenic acne and cycle irregularity.
                  </p>
                </div>
              </div>

              {/* Functional Smart Swap */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#FFF9FB] to-[#F9DCE7]/40 border-2 border-[#C65B83]/40 space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#EFA6BE] text-white">
                    Recommended FlavorDB Swap
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> PCOS-Fit Approved
                  </span>
                </div>

                <h3 className="font-serif-title text-xl font-bold text-[#382536]">
                  {activeSwap.swapIngredientOrDish}
                </h3>

                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-white border border-[#F9DCE7]">
                    <span className="block text-[#897887] text-[10px]">Calories</span>
                    <span className="font-bold text-emerald-700">{activeSwap.swapMacros.calories}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-[#F9DCE7]">
                    <span className="block text-[#897887] text-[10px]">Sugar (Natural)</span>
                    <span className="font-bold text-emerald-700">{activeSwap.swapMacros.sugar}g</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-[#F9DCE7]">
                    <span className="block text-[#897887] text-[10px]">Protein</span>
                    <span className="font-bold text-emerald-700">{activeSwap.swapMacros.protein}g</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-[#F9DCE7]">
                    <span className="block text-[#897887] text-[10px]">Fiber</span>
                    <span className="font-bold text-emerald-700">{activeSwap.swapMacros.fiber}g</span>
                  </div>
                </div>

                {/* Macro Differentials */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-emerald-800">
                    <TrendingDown className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Saves <strong>{activeSwap.cravingMacros.sugar - activeSwap.swapMacros.sugar}g</strong> sugar spike!
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-emerald-800">
                    <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Gains <strong>{activeSwap.swapMacros.fiber}g</strong> gut fiber!
                    </span>
                  </div>
                </div>

                {/* Biological Why */}
                <div className="p-3.5 rounded-2xl bg-white border border-[#F9DCE7] space-y-1 text-xs">
                  <strong className="block text-[#382536] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C65B83]" /> The Biological "Why"
                  </strong>
                  <p className="text-[#897887] leading-relaxed">
                    {activeSwap.biologicalWhy}
                  </p>
                </div>

                {/* Recipe & Action */}
                <div className="p-3.5 rounded-2xl bg-[#FFF9FB] border border-[#F9DCE7] space-y-2 text-xs">
                  <strong className="block text-[#382536] flex items-center gap-1.5">
                    <ChefHat className="w-3.5 h-3.5 text-[#C65B83]" /> Instant 5-Minute Recipe:
                  </strong>
                  <p className="text-[#382536] leading-relaxed">
                    {activeSwap.recipeSuggestion}
                  </p>
                  <button
                    type="button"
                    onClick={handleAddToGrocery}
                    className="w-full mt-2 py-2 rounded-xl text-xs font-semibold bg-[#C65B83] text-white hover:bg-[#8E2B54] transition flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    {addedGrocery ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added to Flourish Market List!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Ingredients to Grocery List</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Swaps Selection Grid */}
        <section className="space-y-4">
          <h3 className="font-serif-title text-xl font-bold text-[#382536]">
            Explore More Flavor-Matched Swaps
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSwaps.map((swap) => {
              const isSelected = activeSwap?.id === swap.id;
              return (
                <div
                  key={swap.id}
                  onClick={() => setActiveSwap(swap)}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-white border-[#C65B83] shadow-md ring-2 ring-[#EFA6BE]'
                      : 'bg-white border-[#F9DCE7] hover:border-[#EFA6BE]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider mb-1">
                      <span className="text-[#897887]">{swap.cravingCategory}</span>
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {Math.round(swap.similarityScore * 100)}% Match
                      </span>
                    </div>
                    <h4 className="font-serif-title text-base font-bold text-[#382536]">
                      {swap.cravingName}
                    </h4>
                    <p className="text-xs text-[#C65B83] font-semibold mt-1">
                      Swap with: {swap.swapIngredientOrDish}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#F9DCE7] text-[11px] text-[#897887]">
                    <span>Shared volatiles: {swap.sharedFlavorProfiles.slice(0, 2).join(', ')}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65B83]" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
