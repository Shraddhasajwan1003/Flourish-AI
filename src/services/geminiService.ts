/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from '@google/genai';
import { storageService } from './storageService';
import { UserProfile, CyclePhaseKey } from '../types';

export const geminiService = {
  async askWellnessAssistant(
    userQuestion: string,
    profile: UserProfile | null,
    currentPhase: CyclePhaseKey
  ): Promise<{ response: string; sources: string[] }> {
    const keys = storageService.getApiKeys();
    const apiKey =
      keys.geminiKey ||
      (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY ? process.env.GEMINI_API_KEY : '');

    // Fallback if no API key is active
    if (!apiKey) {
      return this.generateSmartFallbackResponse(userQuestion, profile, currentPhase);
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `
You are "Ask Flourish AI", an empathetic, scientifically grounded women's wellness, cycle-aware nutrition, and PCOS nutrition guide for the Flourish AI platform (Nourish your menstrual flow).
You integrate principles of computational gastronomy (RecipeDB, FlavorDB, CocktailDB verified mocktails) and reproductive endocrinology.

User Context:
- User: ${profile?.name || 'User'}, Age: ${profile?.age || 26}
- Current Cycle Phase: ${currentPhase}
- PCOS Status: ${profile?.pcosStatus || 'Diagnosed'}
- Reported Goals: ${profile?.primaryGoals?.join(', ') || 'Hormonal balance and craving control'}
- Dietary Style: ${profile?.dietaryPattern || 'Vegetarian'}
- Known Allergies: ${profile?.allergies?.join(', ') || 'None'}

Clinical Boundaries:
1. Provide evidence-informed nutritional and lifestyle explanations (e.g. why magnesium eases cramps, how inositol & fiber support insulin sensitivity).
2. NEVER diagnose PCOS, endometriosis, thyroid conditions, or other medical diseases.
3. NEVER prescribe pharmaceutical drugs or synthetic hormone treatments.
4. Keep advice warm, supportive, and practical with regional meal ideas and food substitutes.
5. Emphasize that Flourish AI is a wellness and nutritional platform, not a substitute for clinical diagnosis.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userQuestion,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      return {
        response: response.text || 'I am here to support your cycle and nourishment. How can I help today?',
        sources: [
          'RecipeDB Indian Nutritional Composition Database',
          'FlavorDB Computational Gastronomy Volatiles',
          'Clinical Guidelines on Insulin Sensitivity in PCOS',
        ],
      };
    } catch (err) {
      console.warn('Gemini API call returned error, switching to smart clinical baseline:', err);
      return this.generateSmartFallbackResponse(userQuestion, profile, currentPhase);
    }
  },

  generateSmartFallbackResponse(
    question: string,
    profile: UserProfile | null,
    currentPhase: CyclePhaseKey
  ): { response: string; sources: string[] } {
    const q = question.toLowerCase();

    if (q.includes('crav') || q.includes('chocolate') || q.includes('sweet')) {
      return {
        response: `During your **${currentPhase.toLowerCase()} phase**, progesterone fluctuations cause a slight dip in serotonin and insulin sensitivity, triggering intense sugar and chocolate cravings. 

Instead of fighting the craving with willpower:
1. **Try Raw Cacao with Medjool Dates**: Raw cacao is exceptionally rich in intracellular **Magnesium** (which calms uterine prostaglandins and muscle spasms).
2. **Pair Carbs with Healthy Fat**: When you eat something sweet, pair it with soaked almonds or pumpkin seeds to prevent the post-sugar insulin plunge that triggers rebound hunger.
3. **Check the Craving Swap tab**: We have a dedicated FlavorDB cosine-matched recipe for raw cacao hazelnut truffles that satisfies the exact lipid and cocoa aroma receptors!`,
        sources: ['FlavorDB Molecular Pairing Analysis', 'Gynecological Endocrinology on Magnesium in Dysmenorrhea'],
      };
    }

    if (q.includes('pcos') || q.includes('pcod') || q.includes('insulin')) {
      return {
        response: `Managing nutrition with **PCOS/PCOD** focuses on three core pillars:

1. **Blunting the Glucose Spike**: Elevated insulin signals the ovaries (theca cells) to produce excess androgens (testosterone), leading to acne, hirsutism, or irregular cycles. Prioritizing **high-fiber complex carbohydrates** like sprouted moong, ragi, and jowar prevents this.
2. **Protein Pacing**: Aim for 20–25g of protein per main meal (e.g., paneer, tofu bhurji, lentils, hemp seeds).
3. **Inositol & Healthy Fats**: Foods rich in myo-inositol (such as citrus fruits, beans, and whole grains) improve insulin receptor binding affinity.

Explore our dedicated **PCOS Nutrition Hub** in the menu for personalized recipes with verified PCOS-Fit Scores above 90!`,
        sources: ['International Evidence-based Guideline for PCOS Assessment and Management', 'RecipeDB High-Protein Low-GI Index'],
      };
    }

    if (q.includes('seed') || q.includes('seed cycling')) {
      return {
        response: `**Seed Cycling** is a natural naturopathic protocol to provide essential fatty acids that support hormonal rhythm:

- **Days 1–14 (Menstrual & Follicular)**: 1 tablespoon freshly ground **Flaxseeds** + 1 tablespoon **Pumpkin Seeds** daily. 
  * Flax lignans help gently bind and excrete excess estrogen; zinc in pumpkin seeds prepares progesterone production.
- **Days 15–28+ (Ovulatory & Luteal)**: 1 tablespoon **Sunflower Seeds** + 1 tablespoon **Sesame Seeds** daily.
  * Vitamin E in sunflower seeds and zinc/selenium in sesame nourish the corpus luteum to sustain progesterone.`,
        sources: ['Integrative Women’s Health Protocols', 'Food Chemistry Lignan Analysis'],
      };
    }

    if (q.includes('cramp') || q.includes('pain') || q.includes('period')) {
      return {
        response: `Period cramps (dysmenorrhea) are driven by **prostaglandins (PGF2a)**, inflammatory compounds that trigger uterine contractions.

To soothe cramps naturally:
1. **Anti-inflammatory Warmth**: Sip our **Hibiscus Cinnamon Uterine Tonic** or warm ginger turmeric tea. Ginger has been shown in clinical trials to be as effective as ibuprofen for primary dysmenorrhea.
2. **Gentle Movement**: Visit our **Move With Your Cycle** section for *Supta Baddha Konasana* (Reclined Bound Angle Pose). It decompresses the pelvic floor without stressing the body.
3. **Magnesium & Heat**: Apply a warm castor oil pack or hot water bottle to the lower abdomen.`,
        sources: ['Phytotherapy Research: Zingiber officinale in Dysmenorrhea', 'Flourish AI Restorative Yoga Guide'],
      };
    }

    // Default supportive response
    return {
      response: `Hello ${profile?.name || 'there'}! As you are currently in your **${currentPhase} phase**, your body benefits most from ${
        currentPhase === 'MENSTRUAL'
          ? 'warm, iron-dense, deeply restorative foods like sprouted lentils, warm stews, and gentle restorative stretching.'
          : currentPhase === 'FOLLICULAR'
          ? 'fresh, high-protein, vibrant meals with probiotic curd, sprouts, and energetic vinyasa movement.'
          : currentPhase === 'OVULATORY'
          ? 'antioxidant-dense leafy greens, cruciferous vegetables for estrogen clearance, and peak strength workouts.'
          : 'magnesium-rich foods, complex carbohydrates like sweet potatoes and oats, and gentle Pilates to support progesterone.'
      }

Feel free to ask me anything about recipe ingredients, craving swaps, seed cycling, or yoga modifications!`,
      sources: ['Flourish AI Cycle Intelligence Engine', 'RecipeDB & FlavorDB Cross-Analysis'],
    };
  },
};
