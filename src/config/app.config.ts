/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const APP_NAME = "Flourish AI";
export const TAGLINE = "Nourish Your Menstrual Flow. Balance Your Body. Feel Your Best.";
export const APP_VERSION = "2.2.0";

export const BRAND_COLORS = {
  primary: "#EFA6BE",      // Dusty Rose
  secondary: "#F9DCE7",    // Blush Pink
  accent: "#C65B83",       // Deep Rose
  background: "#FFF9FB",   // Warm Off-White
  card: "#FFFFFF",         // Crisp White
  plum: "#382536",         // Deep Plum for text
  mauve: "#897887",        // Muted Mauve for secondary text
  sage: "#A8B99B",         // Sage Green
  sageLight: "#EBF2E8",
  gold: "#F2C078",
  peach: "#FCE1D4",
};

export const CYCLE_PHASES = {
  MENSTRUAL: {
    name: "Menstrual Phase",
    days: "Days 1 - 5",
    color: "#EFA6BE",
    accentColor: "#C65B83",
    bgLight: "#FFF0F5",
    focus: "Rest, Replenish Iron & Warmth",
    nutritionTip: "Incorporate warm, iron-rich meals, broths, leafy greens, and comforting spices like cinnamon and turmeric.",
    movementTip: "Gentle restorative yoga, pelvic opening stretches, deep diaphragmatic breathing, and slow walks.",
  },
  FOLLICULAR: {
    name: "Follicular Phase",
    days: "Days 6 - 13",
    color: "#A8B99B",
    accentColor: "#6B8E5F",
    bgLight: "#F3F7F1",
    focus: "Energy Rebound, Gut Diversity & Protein",
    nutritionTip: "Opt for probiotic-rich foods, fresh vibrant salads, sprouts, seeds (pumpkin & flax), and lean plant proteins.",
    movementTip: "Dynamic vinyasa yoga, moderate cardio, resistance strength training, and mobility workouts.",
  },
  OVULATORY: {
    name: "Ovulatory Phase",
    days: "Days 14 - 17",
    color: "#C65B83",
    accentColor: "#8E2B54",
    bgLight: "#FBF0F5",
    focus: "Peak Vitality, Fiber & Liver Support",
    nutritionTip: "Cruciferous vegetables (broccoli, cabbage) to help process estrogen metabolites, light high-fiber meals, and hydration.",
    movementTip: "Peak energy workouts, high-intensity intervals, power yoga, and athletic challenges.",
  },
  LUTEAL: {
    name: "Luteal Phase",
    days: "Days 18 - 28+",
    color: "#F2C078",
    accentColor: "#C9822C",
    bgLight: "#FFF8ED",
    focus: "Progesterone Support, Magnesium & Craving Balance",
    nutritionTip: "Complex slow-digesting carbohydrates (sweet potato, oats), magnesium-rich cacao, sesame & sunflower seeds, and calming teas.",
    movementTip: "Pilates, moderate strength, yin yoga, gentle swimming, and restorative evening walks.",
  },
};

export const CLINICAL_DISCLAIMER =
  "Flourish AI provides evidence-informed lifestyle, nutritional, and cycle-aware guidance for general wellness. It is not a clinical diagnostic tool or medical treatment. Always consult a qualified physician or registered dietitian for medical advice.";
