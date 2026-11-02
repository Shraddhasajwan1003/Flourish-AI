/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RecipeNutrients } from '../types';

export interface PcosScoreResult {
  score: number; // 0 to 100
  rating: 'Exceptional' | 'Strong' | 'Moderate' | 'Needs Adjustment';
  breakdown: {
    proteinPoints: number; // Max 30
    fiberPoints: number; // Max 30
    glycemicPoints: number; // Max 25
    sugarPenalty: number; // Negative
    satFatPenalty: number; // Negative
    micronutrientBonus: number; // Max 15
  };
  explanation: string;
}

export const pcosFitScoreEngine = {
  calculateScore(nutrients: RecipeNutrients): PcosScoreResult {
    // 1. Protein Adequacy (Target: 15-25g for meal)
    let proteinPoints = 0;
    if (nutrients.proteinGrams >= 20) {
      proteinPoints = 30;
    } else if (nutrients.proteinGrams >= 15) {
      proteinPoints = 25;
    } else if (nutrients.proteinGrams >= 10) {
      proteinPoints = 18;
    } else {
      proteinPoints = Math.round((nutrients.proteinGrams / 10) * 12);
    }

    // 2. Fiber Contribution (Crucial for binding excess estrogen and slowing glucose uptake)
    let fiberPoints = 0;
    if (nutrients.fiberGrams >= 10) {
      fiberPoints = 30;
    } else if (nutrients.fiberGrams >= 7) {
      fiberPoints = 25;
    } else if (nutrients.fiberGrams >= 4) {
      fiberPoints = 18;
    } else {
      fiberPoints = Math.round((nutrients.fiberGrams / 4) * 10);
    }

    // 3. Glycemic Index Profile
    let glycemicPoints = 20;
    if (nutrients.glycemicIndex === 'low') {
      glycemicPoints = 25;
    } else if (nutrients.glycemicIndex === 'medium') {
      glycemicPoints = 15;
    } else {
      glycemicPoints = 5;
    }

    // 4. Sugar Penalty
    let sugarPenalty = 0;
    if (nutrients.sugarGrams > 15) {
      sugarPenalty = -15;
    } else if (nutrients.sugarGrams > 8) {
      sugarPenalty = -8;
    } else if (nutrients.sugarGrams > 4) {
      sugarPenalty = -3;
    }

    // 5. Saturated Fat Penalty
    let satFatPenalty = 0;
    if (nutrients.saturatedFatGrams > 8) {
      satFatPenalty = -10;
    } else if (nutrients.saturatedFatGrams > 4) {
      satFatPenalty = -4;
    }

    // 6. Micronutrient & Anti-Inflammatory Bonus
    let micronutrientBonus = 5;
    const micro = nutrients.keyMicronutrients;
    if (micro.magnesiumMg && micro.magnesiumMg >= 80) micronutrientBonus += 4;
    if (micro.inositolMg && micro.inositolMg > 0) micronutrientBonus += 3;
    if (micro.ironMg && micro.ironMg >= 3) micronutrientBonus += 3;
    micronutrientBonus = Math.min(15, micronutrientBonus);

    // Total clamped between 0 and 100
    const rawScore =
      proteinPoints +
      fiberPoints +
      glycemicPoints +
      sugarPenalty +
      satFatPenalty +
      micronutrientBonus;

    const score = Math.max(10, Math.min(100, Math.round(rawScore)));

    let rating: PcosScoreResult['rating'] = 'Moderate';
    if (score >= 90) rating = 'Exceptional';
    else if (score >= 75) rating = 'Strong';
    else if (score >= 60) rating = 'Moderate';
    else rating = 'Needs Adjustment';

    let explanation = '';
    if (score >= 90) {
      explanation = `Score ${score}/100: Ideal for PCOS hormonal balance. High bioavailable protein (${nutrients.proteinGrams}g) and slow-acting fiber (${nutrients.fiberGrams}g) stabilize insulin curves, while low sugar minimizes androgenic spikes.`;
    } else if (score >= 75) {
      explanation = `Score ${score}/100: Good nutritional profile for cycle support. Contains meaningful fiber and balanced macronutrients.`;
    } else {
      explanation = `Score ${score}/100: Consider pairing with extra steamed greens or a protein source to lower the overall meal glycemic response.`;
    }

    return {
      score,
      rating,
      breakdown: {
        proteinPoints,
        fiberPoints,
        glycemicPoints,
        sugarPenalty,
        satFatPenalty,
        micronutrientBonus,
      },
      explanation,
    };
  },
};
