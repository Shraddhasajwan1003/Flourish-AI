/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CyclePhaseKey = 'MENSTRUAL' | 'FOLLICULAR' | 'OVULATORY' | 'LUTEAL';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  isAdult: boolean;
  region: string;
  foodCulture: string[];
  primaryGoals: string[];
  trackCycle: boolean;
  menstrualStatus: string;
  lastPeriodDate: string; // YYYY-MM-DD
  typicalCycleLength: number; // e.g. 28
  periodDuration: number; // e.g. 5
  isRegular: string;
  
  // PCOS / PCOD Context
  pcosStatus: 'diagnosed' | 'suspected' | 'none' | 'prefer_not_to_say';
  diagnosisTiming?: string;
  hasMedicalGuidance?: string;
  otherHealthConditions: string[];

  // Symptoms & Timing
  commonSymptoms: string[];
  symptomIntensity: 'mild' | 'moderate' | 'severe' | 'varies';
  symptomTiming: string;
  cravings: string[];
  energyLevel: string;

  // Sexual & Reproductive Context (Optional & Private)
  sexualHealthContext?: {
    isSexuallyActive?: 'yes' | 'no' | 'prefer_not_to_say';
    contraceptionType?: string;
    dischargePatterns?: string[];
    libidoFluctuations?: string;
  };

  // Nutrition & Diet
  dietaryPattern: 'vegetarian' | 'vegan' | 'eggetarian' | 'non_vegetarian' | 'pescatarian' | 'flexitarian';
  allergies: string[];
  intolerances: string[];
  dislikedFoods: string[];
  likedFoods: string[];
  mealCount: number;
  cookingTimeMinutes: number;
  cookingAccess: string;

  // Lifestyle
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active';
  exercisePreferences: string[];
  sleepHours: string;
  stressLevel: 'low' | 'moderate' | 'high' | 'varies';
  budgetRange: 'budget' | 'moderate' | 'premium';
  recommendationStyle: string;
  
  consentGiven: boolean;
  createdAt: string;
}

export interface DailyCheckin {
  id: string;
  date: string; // YYYY-MM-DD
  mood: 'energetic' | 'calm' | 'sensitive' | 'low' | 'anxious' | 'irritable';
  energyScore: number; // 1 - 5
  flowIntensity?: 'none' | 'spotting' | 'light' | 'medium' | 'heavy';
  symptoms: string[];
  cravings: string[];
  dischargeType?: 'dry' | 'sticky' | 'creamy' | 'egg_white' | 'watery';
  notes?: string;
  waterCups: number;
}

export interface CycleLog {
  id: string;
  startDate: string;
  endDate?: string;
  cycleLength: number;
  periodDuration: number;
  flowIntensity: 'spotting' | 'light' | 'medium' | 'heavy';
  symptoms: string[];
}

export interface RecipeNutrients {
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  fiberGrams: number;
  sugarGrams: number;
  sodiumMg: number;
  saturatedFatGrams: number;
  glycemicIndex: 'low' | 'medium' | 'high';
  keyMicronutrients: {
    ironMg?: number;
    magnesiumMg?: number;
    zincMg?: number;
    folateMcg?: number;
    vitaminD_IU?: number;
    inositolMg?: number;
    potassiumMg?: number;
  };
}

export interface Recipe {
  id: string;
  externalId?: string;
  title: string;
  cuisine: string; // 'North Indian', 'South Indian', 'Mediterranean', etc.
  category: 'breakfast' | 'lunch' | 'evening_snack' | 'dinner' | 'pre_workout' | 'post_workout';
  suitablePhases: CyclePhaseKey[];
  pcosFriendly: boolean;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  imageUrl: string;
  ingredients: { name: string; quantity: string; category?: string }[];
  instructions: string[];
  nutrients: RecipeNutrients;
  pcosFitScore: number; // 0-100
  pcosScoreReasoning: {
    proteinScore: number;
    fiberScore: number;
    glycemicScore: number;
    sugarPenalty: number;
    antiInflammatoryBonus: number;
    summary: string;
  };
  tags: string[];
}

export interface FlavorCompound {
  name: string;
  category: 'sweet' | 'creamy' | 'salty' | 'roasted' | 'floral' | 'fruity' | 'pungent' | 'spicy' | 'umami';
  intensity: number; // 1 - 10
}

export interface CravingSwap {
  id: string;
  cravingName: string;
  cravingCategory: string; // 'Sweet & Creamy', 'Crispy & Salty', 'Rich Chocolate', 'Spicy Fried', etc.
  cravingKeywords: string[];
  cravingMacros: { calories: number; sugar: number; fat: number; fiber: number };
  
  swapIngredientOrDish: string;
  swapRecipeId?: string;
  similarityScore: number; // Cosine similarity e.g. 0.89 (89%)
  sharedFlavorProfiles: string[];
  swapMacros: { calories: number; sugar: number; protein: number; fiber: number };
  biologicalWhy: string;
  recipeSuggestion: string;
  imageUrl: string;
}

export interface NonAlcoholicBeverage {
  id: string;
  name: string;
  category: 'Mocktail' | 'Herbal Infusion' | 'Elixir' | 'Smoothie';
  phaseSuitability: CyclePhaseKey[];
  pcosBenefits: string;
  prepTimeMinutes: number;
  ingredients: string[];
  instructions: string;
  calories: number;
  imageUrl: string;
}

export interface ExerciseRoutine {
  id: string;
  title: string;
  category: 'Gentle Yoga' | 'Vinyasa Flow' | 'Pilates' | 'Strength & Resistance' | 'Walking & Mobility' | 'Breathwork';
  phaseSuitability: CyclePhaseKey[];
  intensity: 'Gentle' | 'Moderate' | 'Energizing';
  durationMinutes: number;
  benefits: string[];
  pcosTarget: string; // e.g. "Cortisol regulation", "Insulin sensitivity"
  posesOrSteps: { name: string; durationSec: number; description: string; caution?: string }[];
  modifications: string[];
  imageUrl: string;
}

export interface GroceryItem {
  id: string;
  name: string;
  category: 'Produce' | 'Grains & Seeds' | 'Legumes & Pulses' | 'Dairy & Plant Mylk' | 'Spices & Pantry';
  quantity: string;
  checked: boolean;
  pcosFriendly: boolean;
  estimatedPriceINR: number;
  sourceRecipeTitle?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sources?: string[];
  suggestedActions?: { label: string; actionType: string; payload?: any }[];
}
