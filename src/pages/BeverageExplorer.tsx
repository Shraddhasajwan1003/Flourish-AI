/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { GlassWater, Sparkles, Clock, Flame, ArrowRight, ShieldCheck } from 'lucide-react';
import Navigation from '../components/Navigation';
import { foodoscopeService } from '../services/foodoscopeService';
import { CyclePhaseKey } from '../types';

export default function BeverageExplorer() {
  const [selectedPhase, setSelectedPhase] = useState<CyclePhaseKey | 'all'>('all');

  const beverages = foodoscopeService.getNonAlcoholicBeverages(
    selectedPhase === 'all' ? undefined : selectedPhase
  );

  return (
    <div className="min-h-screen bg-[#FFF9FB] flex flex-col">
      <Navigation />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F9DCE7] text-[#C65B83] mb-1">
              <GlassWater className="w-3.5 h-3.5" />
              <span>Foodoscope CocktailDB • 100% Non-Alcoholic Verified</span>
            </div>
            <h1 className="font-serif-title text-3xl font-bold text-[#382536]">
              Cycle-Supportive Mocktails & Elixirs
            </h1>
            <p className="text-xs text-[#897887]">
              Strictly alcohol-free herbal infusions, antioxidant mocktails, and restorative warm tonics designed to nourish female endocrinology.
            </p>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border border-[#F9DCE7] text-xs text-emerald-800 font-semibold shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>0.0% ABV • Youth & PCOS Friendly</span>
          </div>
        </div>

        {/* Phase Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {(['all', 'MENSTRUAL', 'FOLLICULAR', 'OVULATORY', 'LUTEAL'] as const).map((ph) => (
            <button
              key={ph}
              type="button"
              onClick={() => setSelectedPhase(ph)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition uppercase tracking-wider ${
                selectedPhase === ph
                  ? 'bg-[#C65B83] text-white border-[#C65B83] shadow-xs'
                  : 'bg-white border-[#F9DCE7] text-[#897887] hover:border-[#EFA6BE]'
              }`}
            >
              {ph === 'all' ? 'All Elixirs' : `${ph} Phase`}
            </button>
          ))}
        </div>

        {/* Beverages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {beverages.map((bev) => (
            <div
              key={bev.id}
              className="p-6 rounded-3xl bg-white border border-[#F9DCE7] shadow-xs flex flex-col sm:flex-row gap-6 items-center"
            >
              <div className="w-full sm:w-44 h-48 rounded-2xl overflow-hidden shrink-0">
                <img
                  src={bev.imageUrl}
                  alt={bev.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F9DCE7] text-[#C65B83]">
                    {bev.category}
                  </span>
                  <span className="text-xs text-[#897887] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {bev.prepTimeMinutes}m
                  </span>
                  <span className="text-xs text-[#897887] flex items-center gap-1">
                    <Flame className="w-3 h-3 text-[#C65B83]" /> {bev.calories} kcal
                  </span>
                </div>

                <h3 className="font-serif-title text-xl font-bold text-[#382536]">
                  {bev.name}
                </h3>

                <p className="text-xs text-[#897887] leading-relaxed">
                  <strong className="text-[#382536]">Hormone Benefit:</strong> {bev.pcosBenefits}
                </p>

                <div className="p-3 rounded-2xl bg-[#FFF9FB] border border-[#F9DCE7] space-y-1 text-xs">
                  <strong className="text-[#382536] block">Ingredients:</strong>
                  <p className="text-[#897887]">{bev.ingredients.join(' • ')}</p>
                </div>

                <p className="text-xs text-[#382536] leading-relaxed italic">
                  "{bev.instructions}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
