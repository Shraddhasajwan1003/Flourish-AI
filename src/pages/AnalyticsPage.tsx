/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { LineChart as ChartIcon, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';
import Navigation from '../components/Navigation';
import { storageService, DEFAULT_DEMO_PROFILE } from '../services/storageService';

export default function AnalyticsPage() {
  const profile = storageService.getUserProfile() || DEFAULT_DEMO_PROFILE;

  // Cycle Length Variability Data
  const cycleData = [
    { cycle: 'Cycle -3', length: 29, typical: 28 },
    { cycle: 'Cycle -2', length: 31, typical: 28 },
    { cycle: 'Cycle -1', length: 30, typical: 28 },
    { cycle: 'Current Cycle', length: profile.typicalCycleLength || 28, typical: 28 },
  ];

  // Symptom Frequency by Phase
  const symptomPhaseData = [
    { phase: 'Menstrual', cramps: 85, bloating: 60, fatigue: 75, cravings: 40 },
    { phase: 'Follicular', cramps: 10, bloating: 15, fatigue: 20, cravings: 15 },
    { phase: 'Ovulatory', cramps: 25, bloating: 20, fatigue: 15, cravings: 30 },
    { phase: 'Luteal', cramps: 65, bloating: 80, fatigue: 70, cravings: 90 },
  ];

  // Macronutrient Target Breakdown
  const macroData = [
    { name: 'Protein (25%)', value: 25, color: '#C65B83' },
    { name: 'Complex Fiber Carbs (45%)', value: 45, color: '#A8B99B' },
    { name: 'Healthy Omega Fats (30%)', value: 30, color: '#F2C078' },
  ];

  return (
    <div className="min-h-screen bg-[#FFF9FB] flex flex-col">
      <Navigation />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F9DCE7] text-[#C65B83] mb-1">
            <ChartIcon className="w-3.5 h-3.5" />
            <span>Personalized Health Biomarkers & Trends</span>
          </div>
          <h1 className="font-serif-title text-3xl font-bold text-[#382536]">
            Cycle & Nutrition Analytics
          </h1>
          <p className="text-xs text-[#897887]">
            Visualizing cycle length consistency, symptom clusters across hormonal phases, and metabolic macronutrient pacing.
          </p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Cycle Length Consistency */}
          <div className="p-6 rounded-3xl bg-white border border-[#F9DCE7] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-title text-lg font-bold text-[#382536]">
                  Cycle Length Consistency (Days)
                </h3>
                <p className="text-xs text-[#897887]">
                  Target variance under ±3 days indicates healthy ovulatory rhythm
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EBF2E8] text-emerald-800">
                {profile.isRegular}
              </span>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cycleData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F9DCE7" />
                  <XAxis dataKey="cycle" stroke="#897887" fontSize={11} />
                  <YAxis domain={[20, 40]} stroke="#897887" fontSize={11} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="length"
                    name="Your Cycle"
                    stroke="#C65B83"
                    strokeWidth={3}
                    dot={{ fill: '#C65B83', r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="typical"
                    name="Baseline 28d"
                    stroke="#A8B99B"
                    strokeDasharray="4 4"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Symptom Clustering Across Phases */}
          <div className="p-6 rounded-3xl bg-white border border-[#F9DCE7] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-title text-lg font-bold text-[#382536]">
                  Symptom Frequency by Phase (%)
                </h3>
                <p className="text-xs text-[#897887]">
                  Helps target magnesium in Luteal and iron in Menstrual
                </p>
              </div>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={symptomPhaseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F9DCE7" />
                  <XAxis dataKey="phase" stroke="#897887" fontSize={11} />
                  <YAxis domain={[0, 100]} stroke="#897887" fontSize={11} />
                  <Tooltip />
                  <Bar dataKey="cravings" name="Sugar Cravings" fill="#F2C078" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="bloating" name="Bloating" fill="#EFA6BE" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cramps" name="Uterine Cramps" fill="#C65B83" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: Macronutrient Ratio Distribution */}
          <div className="p-6 rounded-3xl bg-white border border-[#F9DCE7] shadow-xs space-y-4">
            <div>
              <h3 className="font-serif-title text-lg font-bold text-[#382536]">
                PCOS-Fit Macronutrient Target Ratio
              </h3>
              <p className="text-xs text-[#897887]">
                Designed to slow gastric emptying and prevent reactive hypoglycemia
              </p>
            </div>

            <div className="h-56 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {macroData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-xs">
              {macroData.map((m) => (
                <div key={m.name} className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: m.color }} />
                  <span className="text-[#382536] font-medium">{m.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chart 4: Key Insights & Recommendations */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#FFF9FB] to-[#F9DCE7]/30 border border-[#F9DCE7] space-y-4">
            <h3 className="font-serif-title text-lg font-bold text-[#382536] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C65B83]" /> Computational Gastronomy Insights
            </h3>

            <div className="space-y-3 text-xs text-[#382536]">
              <div className="p-3 rounded-2xl bg-white border border-[#F9DCE7] space-y-1">
                <strong className="text-[#C65B83] block">Luteal Craving Window:</strong>
                <p className="text-[#897887]">
                  Your reported cravings peak 4–6 days prior to menses. Pre-loading raw cacao hazelnut truffles and pumpkin seeds minimizes mood irritability and magnesium depletion.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-[#F9DCE7] space-y-1">
                <strong className="text-[#6B8E5F] block">Insulin-Protein Synergy:</strong>
                <p className="text-[#897887]">
                  Meals scoring 90+ on the PCOS-Fit Score maintained an average protein-to-carb ratio of 1:1.5, which clinical research correlates with reduced androgen spikes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
