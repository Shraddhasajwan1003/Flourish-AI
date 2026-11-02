/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserProfile, DailyCheckin, CycleLog, GroceryItem } from '../types';

const STORAGE_KEYS = {
  USER_PROFILE: 'femnourish_user_profile',
  DAILY_CHECKINS: 'femnourish_daily_checkins',
  CYCLE_LOGS: 'femnourish_cycle_logs',
  SAVED_RECIPES: 'femnourish_saved_recipes',
  GROCERY_LIST: 'femnourish_grocery_list',
  INTRO_SEEN: 'femnourish_intro_seen_v2',
  API_KEYS: 'femnourish_api_keys',
};

// Default high-context demo profile for instant exploration
export const DEFAULT_DEMO_PROFILE: UserProfile = {
  id: 'usr_demo_882',
  name: 'Ananya',
  age: 26,
  isAdult: true,
  region: 'India (Delhi NCR)',
  foodCulture: ['North Indian', 'South Indian'],
  primaryGoals: [
    'Eat according to my menstrual cycle',
    'Manage food choices while living with PCOS/PCOD',
    'Manage cravings',
    'Improve everyday nutrition',
  ],
  trackCycle: true,
  menstrualStatus: 'Sometimes irregular',
  // Set last period to 12 days ago so the user is in a vibrant Follicular/Ovulatory transition
  lastPeriodDate: new Date(Date.now() - 12 * 86400000).toISOString().split('T')[0],
  typicalCycleLength: 30,
  periodDuration: 5,
  isRegular: 'Mostly',
  pcosStatus: 'diagnosed',
  diagnosisTiming: '6 months to 2 years ago',
  hasMedicalGuidance: 'Yes, both doctor and clinical dietitian',
  otherHealthConditions: ['Insulin resistance', 'Mild digestive bloating'],
  commonSymptoms: ['Abdominal cramps', 'Bloating', 'Fatigue', 'Food cravings', 'Acne'],
  symptomIntensity: 'moderate',
  symptomTiming: 'Before my period and during cycle shifts',
  cravings: ['Sweet foods', 'Chocolate', 'Salty snacks'],
  energyLevel: 'Energy drops in the late afternoon and before period',
  sexualHealthContext: {
    isSexuallyActive: 'yes',
    contraceptionType: 'Barrier methods (Non-hormonal)',
    dischargePatterns: ['Egg white fertile mucus mid-cycle', 'Creamy in luteal phase'],
    libidoFluctuations: 'Higher around ovulation, lower in pre-menstrual days',
  },
  dietaryPattern: 'vegetarian',
  allergies: ['Peanuts'],
  intolerances: ['Lactose (tolerates A2 curd/ghee)'],
  dislikedFoods: ['Bitter gourd', 'Excessive raw cabbage'],
  likedFoods: ['Spinach', 'Paneer', 'Oats', 'Chia seeds', 'Makhana', 'Dark Cacao'],
  mealCount: 4,
  cookingTimeMinutes: 25,
  cookingAccess: 'I cook for myself and family prepares shared meals',
  activityLevel: 'moderately_active',
  exercisePreferences: ['Yoga', 'Pilates', 'Walking'],
  sleepHours: '7–8 hours',
  stressLevel: 'moderate',
  budgetRange: 'moderate',
  recommendationStyle: 'Traditional home-cooked with scientific nutrition tweaks',
  consentGiven: true,
  createdAt: new Date().toISOString(),
};

export const storageService = {
  getUserProfile(): UserProfile | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      if (!data) return DEFAULT_DEMO_PROFILE; // Default demo on first load so user immediately sees rich dashboard
      return JSON.parse(data);
    } catch {
      return DEFAULT_DEMO_PROFILE;
    }
  },

  saveUserProfile(profile: UserProfile): void {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  },

  clearUserProfile(): void {
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
  },

  getDailyCheckins(): DailyCheckin[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DAILY_CHECKINS);
      if (!data) {
        // Return 3 days of recent checkins
        const todayStr = new Date().toISOString().split('T')[0];
        const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        return [
          {
            id: 'chk_1',
            date: todayStr,
            mood: 'calm',
            energyScore: 4,
            symptoms: ['Mild lower abdomen sensations'],
            cravings: ['Dark Chocolate'],
            dischargeType: 'egg_white',
            waterCups: 6,
          },
          {
            id: 'chk_2',
            date: yesterdayStr,
            mood: 'energetic',
            energyScore: 5,
            symptoms: [],
            cravings: ['Crunchy nuts'],
            dischargeType: 'egg_white',
            waterCups: 8,
          },
        ];
      }
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  saveDailyCheckin(checkin: DailyCheckin): void {
    const list = this.getDailyCheckins().filter((c) => c.date !== checkin.date);
    list.unshift(checkin);
    localStorage.setItem(STORAGE_KEYS.DAILY_CHECKINS, JSON.stringify(list));
  },

  getCycleLogs(): CycleLog[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CYCLE_LOGS);
      if (!data) {
        // Return realistic historical cycles
        return [
          {
            id: 'cyc_01',
            startDate: new Date(Date.now() - 42 * 86400000).toISOString().split('T')[0],
            endDate: new Date(Date.now() - 37 * 86400000).toISOString().split('T')[0],
            cycleLength: 30,
            periodDuration: 5,
            flowIntensity: 'medium',
            symptoms: ['Cramps', 'Mild backache'],
          },
          {
            id: 'cyc_02',
            startDate: new Date(Date.now() - 73 * 86400000).toISOString().split('T')[0],
            endDate: new Date(Date.now() - 68 * 86400000).toISOString().split('T')[0],
            cycleLength: 31,
            periodDuration: 5,
            flowIntensity: 'heavy',
            symptoms: ['Cramps', 'Fatigue'],
          },
        ];
      }
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  saveCycleLog(log: CycleLog): void {
    const list = this.getCycleLogs();
    list.unshift(log);
    localStorage.setItem(STORAGE_KEYS.CYCLE_LOGS, JSON.stringify(list));
  },

  getGroceryList(): GroceryItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GROCERY_LIST);
      if (!data) {
        return [
          { id: 'g_1', name: 'Sprouted Green Moong Dal', category: 'Legumes & Pulses', quantity: '500g', checked: false, pcosFriendly: true, estimatedPriceINR: 110, sourceRecipeTitle: 'Sprouted Moong Dal & Spinach Chilla' },
          { id: 'g_2', name: 'Baby Spinach (Palak)', category: 'Produce', quantity: '2 bunches', checked: true, pcosFriendly: true, estimatedPriceINR: 40, sourceRecipeTitle: 'Palak Methi Tofu Bhurji' },
          { id: 'g_3', name: 'Finger Millet (Ragi) Flour', category: 'Grains & Seeds', quantity: '1 kg', checked: false, pcosFriendly: true, estimatedPriceINR: 75, sourceRecipeTitle: 'Ragi Idlis' },
          { id: 'g_4', name: 'Raw Peruvian Cacao Powder', category: 'Spices & Pantry', quantity: '1 jar (200g)', checked: false, pcosFriendly: true, estimatedPriceINR: 350, sourceRecipeTitle: 'Craving Swap: Truffles' },
          { id: 'g_5', name: 'Lotus Seeds (Phool Makhana)', category: 'Grains & Seeds', quantity: '250g', checked: true, pcosFriendly: true, estimatedPriceINR: 190, sourceRecipeTitle: 'Spiced Makhana' },
          { id: 'g_6', name: 'Ceylon Cinnamon Sticks', category: 'Spices & Pantry', quantity: '50g', checked: false, pcosFriendly: true, estimatedPriceINR: 120, sourceRecipeTitle: 'Hibiscus Cinnamon Tonic' },
        ];
      }
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  saveGroceryList(items: GroceryItem[]): void {
    localStorage.setItem(STORAGE_KEYS.GROCERY_LIST, JSON.stringify(items));
  },

  hasSeenIntro(): boolean {
    return sessionStorage.getItem(STORAGE_KEYS.INTRO_SEEN) === 'true';
  },

  markIntroSeen(): void {
    sessionStorage.setItem(STORAGE_KEYS.INTRO_SEEN, 'true');
  },

  getApiKeys(): { foodoscopeKey?: string; geminiKey?: string } {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.API_KEYS) || '{}');
    } catch {
      return {};
    }
  },

  saveApiKeys(keys: { foodoscopeKey?: string; geminiKey?: string }): void {
    localStorage.setItem(STORAGE_KEYS.API_KEYS, JSON.stringify(keys));
  },

  exportAllUserData(): string {
    const data = {
      profile: this.getUserProfile(),
      checkins: this.getDailyCheckins(),
      cycleLogs: this.getCycleLogs(),
      groceries: this.getGroceryList(),
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  },
};
