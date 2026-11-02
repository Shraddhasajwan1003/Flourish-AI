/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CRAVING_SWAPS } from '../data/foodoscopeData';
import { CravingSwap } from '../types';

export const cravingSwapService = {
  getAllSwaps(): CravingSwap[] {
    return CRAVING_SWAPS;
  },

  searchSwaps(query: string): CravingSwap[] {
    const q = query.toLowerCase().trim();
    if (!q) return CRAVING_SWAPS;

    return CRAVING_SWAPS.filter((swap) => {
      const matchName = swap.cravingName.toLowerCase().includes(q);
      const matchCat = swap.cravingCategory.toLowerCase().includes(q);
      const matchKeywords = swap.cravingKeywords.some((k) => k.toLowerCase().includes(q));
      const matchDish = swap.swapIngredientOrDish.toLowerCase().includes(q);
      return matchName || matchCat || matchKeywords || matchDish;
    });
  },

  getSwapById(id: string): CravingSwap | undefined {
    return CRAVING_SWAPS.find((s) => s.id === id);
  },

  calculateVectorSimilarity(vectorA: number[], vectorB: number[]): number {
    if (vectorA.length !== vectorB.length || vectorA.length === 0) return 0;
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vectorA.length; i++) {
      dotProduct += vectorA[i] * vectorB[i];
      normA += vectorA[i] * vectorA[i];
      normB += vectorB[i] * vectorB[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return Number((dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))).toFixed(2));
  },
};
