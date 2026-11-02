/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RECIPE_DB, MOCKTAIL_DB } from '../data/foodoscopeData';
import { Recipe, NonAlcoholicBeverage, CyclePhaseKey } from '../types';
import { storageService } from './storageService';

export const foodoscopeService = {
  getRecipes(filters?: {
    phase?: CyclePhaseKey;
    category?: Recipe['category'];
    cuisine?: string;
    pcosOnly?: boolean;
    search?: string;
  }): Recipe[] {
    let list = [...RECIPE_DB];

    if (filters?.search) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q)) ||
          r.ingredients.some((i) => i.name.toLowerCase().includes(q))
      );
    }

    if (filters?.phase) {
      list = list.filter((r) => r.suitablePhases.includes(filters.phase!));
    }

    if (filters?.category) {
      list = list.filter((r) => r.category === filters.category);
    }

    if (filters?.cuisine && filters.cuisine !== 'All') {
      list = list.filter((r) => r.cuisine.toLowerCase().includes(filters.cuisine!.toLowerCase()));
    }

    if (filters?.pcosOnly) {
      list = list.filter((r) => r.pcosFriendly);
    }

    return list;
  },

  getRecipeById(id: string): Recipe | undefined {
    return RECIPE_DB.find((r) => r.id === id);
  },

  getTimeOfDayRecommendations(currentPhase: CyclePhaseKey, pcosMode = true): {
    breakfast: Recipe;
    lunch: Recipe;
    snack: Recipe;
    dinner: Recipe;
  } {
    const phaseRecipes = RECIPE_DB.filter((r) => r.suitablePhases.includes(currentPhase));

    const breakfast =
      phaseRecipes.find((r) => r.category === 'breakfast' && (!pcosMode || r.pcosFriendly)) ||
      RECIPE_DB.find((r) => r.category === 'breakfast')!;

    const lunch =
      phaseRecipes.find((r) => r.category === 'lunch' && (!pcosMode || r.pcosFriendly)) ||
      RECIPE_DB.find((r) => r.category === 'lunch')!;

    const snack =
      phaseRecipes.find((r) => r.category === 'evening_snack' && (!pcosMode || r.pcosFriendly)) ||
      RECIPE_DB.find((r) => r.category === 'evening_snack')!;

    const dinner =
      phaseRecipes.find((r) => r.category === 'dinner' && (!pcosMode || r.pcosFriendly)) ||
      RECIPE_DB.find((r) => r.category === 'dinner')!;

    return { breakfast, lunch, snack, dinner };
  },

  getNonAlcoholicBeverages(phase?: CyclePhaseKey): NonAlcoholicBeverage[] {
    if (!phase) return MOCKTAIL_DB;
    return MOCKTAIL_DB.filter((b) => b.phaseSuitability.includes(phase));
  },

  hasCustomApiKey(): boolean {
    const keys = storageService.getApiKeys();
    return Boolean(keys.foodoscopeKey && keys.foodoscopeKey.trim().length > 0);
  },
};
