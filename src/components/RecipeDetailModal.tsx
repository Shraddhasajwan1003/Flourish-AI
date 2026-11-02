/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { X, Clock, Users, Flame, Plus, Check, Sparkles, ChefHat, Info } from 'lucide-react';
import { Recipe, GroceryItem } from '../types';
import { storageService } from '../services/storageService';

interface Props {
  recipe: Recipe | null;
  onClose: () => void;
}

export default function RecipeDetailModal({ recipe, onClose }: Props) {
  const [addedToMarket, setAddedToMarket] = useState(false);

  if (!recipe) return null;

  const handleAddAllToGroceries = () => {
    const currentList = storageService.getGroceryList();
    const newItems: GroceryItem[] = recipe.ingredients.map((ing, idx) => ({
      id: `gro_${Date.now()}_${idx}`,
      name: ing.name,
      category: (ing.category as any) || 'Produce',
      quantity: ing.quantity,
      checked: false,
      pcosFriendly: recipe.pcosFriendly,
      estimatedPriceINR: 50,
      sourceRecipeTitle: recipe.title,
    }));

    storageService.saveGroceryList([...newItems, ...currentList]);
    setAddedToMarket(true);
    setTimeout(() => setAddedToMarket(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#F9DCE7] my-8 max-h-[92vh] overflow-y-auto">
        {/* Header Image & Close */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden rounded-t-3xl">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#382536] flex items-center justify-center backdrop-blur-md shadow-md transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#EFA6BE] text-white">
                {recipe.cuisine}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/20 backdrop-blur-md text-white">
                {recipe.category.replace('_', ' ')}
              </span>
              {recipe.pcosFriendly && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#A8B99B] text-white flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> PCOS Conscious
                </span>
              )}
            </div>
            <h1 className="font-serif-title text-2xl sm:text-3xl font-bold">
              {recipe.title}
            </h1>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-4 gap-2 py-3 px-4 rounded-2xl bg-[#FFF9FB] border border-[#F9DCE7] text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-[#897887] text-[11px] mb-0.5">
                <Clock className="w-3.5 h-3.5" /> Prep
              </div>
              <span className="text-sm font-bold text-[#382536]">{recipe.prepTimeMinutes}m</span>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-[#897887] text-[11px] mb-0.5">
                <ChefHat className="w-3.5 h-3.5" /> Cook
              </div>
              <span className="text-sm font-bold text-[#382536]">{recipe.cookTimeMinutes}m</span>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-[#897887] text-[11px] mb-0.5">
                <Users className="w-3.5 h-3.5" /> Serves
              </div>
              <span className="text-sm font-bold text-[#382536]">{recipe.servings}</span>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-[#897887] text-[11px] mb-0.5">
                <Flame className="w-3.5 h-3.5 text-[#C65B83]" /> Calories
              </div>
              <span className="text-sm font-bold text-[#C65B83]">{recipe.nutrients.calories}</span>
            </div>
          </div>

          {/* PCOS-Fit Score Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FFF9FB] to-[#F9DCE7]/40 border border-[#EFA6BE]/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#C65B83] text-white flex items-center justify-center font-bold text-xs">
                  {recipe.pcosFitScore}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#382536] uppercase tracking-wider">
                    PCOS-Fit Score: {recipe.pcosFitScore}/100
                  </h4>
                  <p className="text-[11px] text-[#897887]">
                    Rule-based insulin sensitivity & anti-inflammatory validation
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-[#382536] leading-relaxed mb-3">
              {recipe.pcosScoreReasoning.summary}
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-center text-[10px]">
              <div className="p-1.5 rounded-lg bg-white border border-[#F9DCE7]">
                <span className="block text-[#897887]">Protein</span>
                <span className="font-bold text-[#382536]">{recipe.nutrients.proteinGrams}g</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white border border-[#F9DCE7]">
                <span className="block text-[#897887]">Fiber</span>
                <span className="font-bold text-[#382536]">{recipe.nutrients.fiberGrams}g</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white border border-[#F9DCE7]">
                <span className="block text-[#897887]">Net Carbs</span>
                <span className="font-bold text-[#382536]">{recipe.nutrients.carbsGrams}g</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white border border-[#F9DCE7]">
                <span className="block text-[#897887]">Sugar</span>
                <span className="font-bold text-[#382536]">{recipe.nutrients.sugarGrams}g</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white border border-[#F9DCE7]">
                <span className="block text-[#897887]">Glycemic</span>
                <span className="font-bold text-emerald-600 uppercase">
                  {recipe.nutrients.glycemicIndex}
                </span>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif-title text-lg font-bold text-[#382536]">
                Ingredients ({recipe.ingredients.length})
              </h3>
              <button
                type="button"
                onClick={handleAddAllToGroceries}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#EFA6BE]/30 text-[#C65B83] hover:bg-[#EFA6BE]/50 transition"
              >
                {addedToMarket ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Added to Flourish Market!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Grocery List</span>
                  </>
                )}
              </button>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#382536]">
              {recipe.ingredients.map((ing, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between p-2 rounded-xl bg-[#FFF9FB] border border-[#F9DCE7]/60"
                >
                  <span className="font-medium">{ing.name}</span>
                  <span className="text-[#897887] text-[11px] ml-2 font-mono">
                    {ing.quantity}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="font-serif-title text-lg font-bold text-[#382536] mb-3">
              Cooking Instructions
            </h3>
            <ol className="space-y-3">
              {recipe.instructions.map((step, idx) => (
                <li key={idx} className="flex gap-3 text-xs leading-relaxed text-[#382536]">
                  <span className="w-5 h-5 rounded-full bg-[#F9DCE7] text-[#C65B83] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Phase Suitability Badge */}
          <div className="p-3 rounded-xl bg-[#FFF9FB] border border-[#F9DCE7] flex items-center gap-2 text-xs text-[#897887]">
            <Info className="w-4 h-4 text-[#C65B83] shrink-0" />
            <span>
              Best suited for your{' '}
              <strong className="text-[#382536]">
                {recipe.suitablePhases.join(', ')}
              </strong>{' '}
              phases based on estrogen and progesterone metabolic demands.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
