/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  Sparkles,
  ShieldCheck,
  User,
  Calendar,
  Utensils,
  AlertTriangle,
} from 'lucide-react';
import { APP_NAME } from '../config/app.config';
import { UserProfile } from '../types';
import { storageService, DEFAULT_DEMO_PROFILE } from '../services/storageService';

export default function Onboarding() {
  const navigate = useNavigate();

  // Step index
  const [currentStep, setCurrentStep] = useState(0);

  // Form State
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '',
    age: 26,
    isAdult: true,
    region: 'India',
    foodCulture: ['North Indian'],
    primaryGoals: ['Eat according to my menstrual cycle', 'Manage food choices while living with PCOS/PCOD'],
    trackCycle: true,
    menstrualStatus: 'Usually regular',
    lastPeriodDate: new Date(Date.now() - 10 * 86400000).toISOString().split('T')[0],
    typicalCycleLength: 28,
    periodDuration: 5,
    isRegular: 'Mostly',
    pcosStatus: 'diagnosed',
    diagnosisTiming: '6 months to 2 years ago',
    hasMedicalGuidance: 'Yes, a doctor',
    otherHealthConditions: ['Insulin resistance'],
    commonSymptoms: ['Abdominal cramps', 'Bloating', 'Food cravings'],
    symptomIntensity: 'moderate',
    symptomTiming: 'Before my period',
    cravings: ['Sweet foods', 'Chocolate'],
    energyLevel: 'Energy drops before my period',
    sexualHealthContext: {
      isSexuallyActive: 'yes',
      contraceptionType: 'Non-hormonal / Barrier',
      dischargePatterns: ['Egg-white fertile mucus mid-cycle', 'Creamy in luteal phase'],
      libidoFluctuations: 'Higher around ovulation',
    },
    dietaryPattern: 'vegetarian',
    allergies: ['No known food allergies'],
    intolerances: ['None'],
    dislikedFoods: [],
    likedFoods: ['Spinach', 'Paneer', 'Oats'],
    mealCount: 3,
    cookingTimeMinutes: 30,
    cookingAccess: 'I cook for myself',
    activityLevel: 'moderately_active',
    exercisePreferences: ['Yoga', 'Walking'],
    sleepHours: '7–8 hours',
    stressLevel: 'moderate',
    budgetRange: 'moderate',
    recommendationStyle: 'Traditional home-cooked with balanced nutrition',
    consentGiven: true,
  });

  const [reviewMode, setReviewMode] = useState(false);

  // Define steps
  const steps = [
    {
      id: 'age',
      title: 'First, how old are you?',
      subtitle: 'Your age helps tailor cycle parameters and applies appropriate privacy standards.',
      field: 'age',
    },
    {
      id: 'name_region',
      title: 'What should we call you and where do you live?',
      subtitle: 'We use your region to recommend locally accessible produce and authentic spices.',
      field: 'name_region',
    },
    {
      id: 'food_culture',
      title: 'Which food cultures do you most enjoy?',
      subtitle: 'Select all that apply. RecipeDB filters culinary traditions based on this.',
      field: 'foodCulture',
    },
    {
      id: 'primary_goals',
      title: 'What would you most like Flourish AI to help you with?',
      subtitle: 'Our recommendation engine will prioritize your primary focus.',
      field: 'primaryGoals',
    },
    {
      id: 'cycle_optin',
      title: 'Would you like to personalize nutrition using your menstrual cycle?',
      subtitle: 'Cycle-syncing optimizes nutrients for estrogen, LH, and progesterone rhythms.',
      field: 'trackCycle',
    },
    ...(formData.trackCycle
      ? [
          {
            id: 'cycle_dates',
            title: 'Tell us about your recent period',
            subtitle: 'This calculates your current cycle day and predicts your next phase.',
            field: 'cycle_dates',
          },
        ]
      : []),
    {
      id: 'pcos_status',
      title: 'Have you been diagnosed with or suspect PCOS / PCOD?',
      subtitle: 'Self-reported health context activates our insulin-stabilizing PCOS-Fit mode.',
      field: 'pcosStatus',
    },
    {
      id: 'symptoms',
      title: 'Which symptoms or physical shifts do you experience?',
      subtitle: 'We connect reported symptoms to specific micronutrient replenishment.',
      field: 'commonSymptoms',
    },
    {
      id: 'reproductive_health',
      title: 'Sexual & Reproductive Health Context (Private & Optional)',
      subtitle: 'Hormonal fluctuations affect cervical fluids and libido. This remains strictly private.',
      field: 'sexualHealthContext',
    },
    {
      id: 'cravings',
      title: 'What foods do you commonly crave?',
      subtitle: 'FlavorDB matches these to high-nutrition substitutes with identical flavor volatiles.',
      field: 'cravings',
    },
    {
      id: 'dietary_pattern',
      title: 'What is your dietary pattern and any allergies?',
      subtitle: 'We filter out allergens strictly across all recipes.',
      field: 'dietaryPattern',
    },
    {
      id: 'lifestyle_activity',
      title: 'Movement, Sleep & Daily Stress',
      subtitle: 'Calibrates daily caloric load and cycle-synced yoga intensity.',
      field: 'lifestyle_activity',
    },
  ];

  const totalSteps = steps.length;
  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setReviewMode(true);
    }
  };

  const handleBack = () => {
    if (reviewMode) {
      setReviewMode(false);
      return;
    }
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const handleCompleteOnboarding = () => {
    const finalProfile: UserProfile = {
      id: `usr_${Date.now()}`,
      name: formData.name || 'Friend',
      age: formData.age || 26,
      isAdult: (formData.age || 26) >= 18,
      region: formData.region || 'India',
      foodCulture: formData.foodCulture || ['North Indian'],
      primaryGoals: formData.primaryGoals || ['Cycle-aware nutrition'],
      trackCycle: formData.trackCycle ?? true,
      menstrualStatus: formData.menstrualStatus || 'Usually regular',
      lastPeriodDate: formData.lastPeriodDate || new Date().toISOString().split('T')[0],
      typicalCycleLength: formData.typicalCycleLength || 28,
      periodDuration: formData.periodDuration || 5,
      isRegular: formData.isRegular || 'Mostly',
      pcosStatus: formData.pcosStatus || 'none',
      diagnosisTiming: formData.diagnosisTiming,
      hasMedicalGuidance: formData.hasMedicalGuidance,
      otherHealthConditions: formData.otherHealthConditions || [],
      commonSymptoms: formData.commonSymptoms || [],
      symptomIntensity: formData.symptomIntensity || 'moderate',
      symptomTiming: formData.symptomTiming || 'Before my period',
      cravings: formData.cravings || [],
      energyLevel: formData.energyLevel || 'Balanced',
      sexualHealthContext: formData.sexualHealthContext,
      dietaryPattern: formData.dietaryPattern || 'vegetarian',
      allergies: formData.allergies || [],
      intolerances: formData.intolerances || [],
      dislikedFoods: formData.dislikedFoods || [],
      likedFoods: formData.likedFoods || [],
      mealCount: formData.mealCount || 3,
      cookingTimeMinutes: formData.cookingTimeMinutes || 30,
      cookingAccess: formData.cookingAccess || 'I cook for myself',
      activityLevel: formData.activityLevel || 'moderately_active',
      exercisePreferences: formData.exercisePreferences || ['Yoga'],
      sleepHours: formData.sleepHours || '7–8 hours',
      stressLevel: formData.stressLevel || 'moderate',
      budgetRange: formData.budgetRange || 'moderate',
      recommendationStyle: formData.recommendationStyle || 'Balanced',
      consentGiven: true,
      createdAt: new Date().toISOString(),
    };

    storageService.saveUserProfile(finalProfile);
    navigate('/dashboard');
  };

  const toggleArrayItem = (key: 'foodCulture' | 'primaryGoals' | 'commonSymptoms' | 'cravings' | 'allergies', item: string) => {
    const list = (formData[key] as string[]) || [];
    if (list.includes(item)) {
      setFormData({ ...formData, [key]: list.filter((x) => x !== item) });
    } else {
      setFormData({ ...formData, [key]: [...list, item] });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9FB] flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="max-w-2xl mx-auto w-full flex items-center justify-between pb-4 border-b border-[#F9DCE7]">
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#897887] hover:text-[#382536] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="text-center">
          <span className="font-serif-title text-xl font-bold text-[#382536]">
            {APP_NAME}
          </span>
          <span className="block text-[11px] text-[#C65B83] font-medium tracking-wide">
            {reviewMode ? 'Profile Review & Confirmation' : `Consultation Intake: Step ${currentStep + 1} of ${totalSteps}`}
          </span>
        </div>

        <button
          onClick={() => {
            storageService.saveUserProfile(DEFAULT_DEMO_PROFILE);
            navigate('/dashboard');
          }}
          className="text-xs font-medium text-[#C65B83] hover:underline"
        >
          Use Demo Profile →
        </button>
      </div>

      {/* Progress Bar */}
      {!reviewMode && (
        <div className="max-w-2xl mx-auto w-full my-4">
          <div className="w-full bg-[#F9DCE7] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#EFA6BE] to-[#C65B83] h-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Questionnaire Box */}
      <div className="max-w-2xl mx-auto w-full my-auto py-4">
        <AnimatePresence mode="wait">
          {!reviewMode ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-[#F9DCE7]"
            >
              {/* Question Header */}
              <div className="mb-6">
                <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#382536] mb-2 leading-tight">
                  {currentStepData.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#897887]">
                  {currentStepData.subtitle}
                </p>
              </div>

              {/* Question 1: AGE (Mandatory First Question) */}
              {currentStepData.id === 'age' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="13"
                      max="65"
                      value={formData.age || ''}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setFormData({
                          ...formData,
                          age: val,
                          isAdult: val >= 18,
                        });
                      }}
                      className="w-32 text-3xl font-bold text-[#382536] p-3 rounded-2xl border-2 border-[#EFA6BE] focus:border-[#C65B83] outline-hidden text-center"
                    />
                    <span className="text-lg font-semibold text-[#897887]">Years Old</span>
                  </div>

                  {formData.age && formData.age < 18 ? (
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        Minor Privacy & Consent Notice (Under 18)
                      </div>
                      <p>
                        Flourish AI applies strict youth privacy standards: we never share your data, do not present intrusive adult marketing, and restrict sensitive inquiries to age-appropriate wellness.
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 rounded-2xl bg-[#FFF9FB] border border-[#F9DCE7] text-xs text-[#897887] flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#C65B83]" />
                      <span>Confidential wellness profiling. Data remains encrypted on your device.</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2">
                    {[18, 22, 26, 30, 35, 40].map((quickAge) => (
                      <button
                        key={quickAge}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            age: quickAge,
                            isAdult: quickAge >= 18,
                          })
                        }
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                          formData.age === quickAge
                            ? 'bg-[#C65B83] text-white border-[#C65B83]'
                            : 'bg-white border-[#F9DCE7] text-[#897887] hover:border-[#EFA6BE]'
                        }`}
                      >
                        {quickAge}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 2: Name & Region */}
              {currentStepData.id === 'name_region' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#382536] mb-1">
                      Your Preferred Name / Nickname
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Priya or Ananya"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 rounded-xl border border-[#F9DCE7] focus:border-[#C65B83] outline-hidden text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#382536] mb-1">
                      Region / Country
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Delhi NCR, Mumbai, Bangalore, or UK/USA"
                      value={formData.region || ''}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full p-3 rounded-xl border border-[#F9DCE7] focus:border-[#C65B83] outline-hidden text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Question 3: Food Culture */}
              {currentStepData.id === 'food_culture' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    'North Indian',
                    'South Indian',
                    'West Indian',
                    'East Indian',
                    'Mediterranean',
                    'Asian',
                    'Western',
                    'Continental',
                  ].map((cul) => {
                    const selected = formData.foodCulture?.includes(cul);
                    return (
                      <button
                        key={cul}
                        type="button"
                        onClick={() => toggleArrayItem('foodCulture', cul)}
                        className={`p-3 rounded-2xl text-xs font-semibold border text-left flex items-center justify-between transition ${
                          selected
                            ? 'bg-[#F9DCE7] border-[#C65B83] text-[#382536]'
                            : 'bg-[#FFF9FB] border-[#F9DCE7] text-[#897887] hover:border-[#EFA6BE]'
                        }`}
                      >
                        <span>{cul}</span>
                        {selected && <Check className="w-3.5 h-3.5 text-[#C65B83]" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Question 4: Primary Goals */}
              {currentStepData.id === 'primary_goals' && (
                <div className="space-y-2">
                  {[
                    'Eat according to my menstrual cycle',
                    'Manage food choices while living with PCOS/PCOD',
                    'Understand my period-related symptoms',
                    'Manage sugar and crunchy cravings',
                    'Improve everyday energy & avoid 4 PM crash',
                    'Discover quick healthy home-cooked recipes',
                  ].map((goal) => {
                    const selected = formData.primaryGoals?.includes(goal);
                    return (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => toggleArrayItem('primaryGoals', goal)}
                        className={`w-full p-3 rounded-2xl text-xs font-semibold border text-left flex items-center justify-between transition ${
                          selected
                            ? 'bg-[#F9DCE7] border-[#C65B83] text-[#382536]'
                            : 'bg-[#FFF9FB] border-[#F9DCE7] text-[#897887] hover:border-[#EFA6BE]'
                        }`}
                      >
                        <span>{goal}</span>
                        {selected && <Check className="w-4 h-4 text-[#C65B83]" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Question 5: Cycle Opt-in */}
              {currentStepData.id === 'cycle_optin' && (
                <div className="space-y-3">
                  {[
                    { val: true, label: 'Yes, I have periods and want cycle-aware recommendations' },
                    { val: true, label: 'Yes, but my periods are irregular / unpredictable' },
                    { val: false, label: 'I do not currently have periods (focus on general PCOS & nutrition)' },
                    { val: false, label: 'I prefer not to track my cycle' },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, trackCycle: item.val })}
                      className={`w-full p-3.5 rounded-2xl text-xs font-semibold border text-left flex items-center justify-between transition ${
                        formData.trackCycle === item.val
                          ? 'bg-[#F9DCE7] border-[#C65B83] text-[#382536]'
                          : 'bg-[#FFF9FB] border-[#F9DCE7] text-[#897887] hover:border-[#EFA6BE]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {formData.trackCycle === item.val && <Check className="w-4 h-4 text-[#C65B83]" />}
                    </button>
                  ))}
                </div>
              )}

              {/* Question 6: Cycle Dates (Conditional) */}
              {currentStepData.id === 'cycle_dates' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#382536] mb-1">
                      When did your most recent period start?
                    </label>
                    <input
                      type="date"
                      value={formData.lastPeriodDate || ''}
                      onChange={(e) => setFormData({ ...formData, lastPeriodDate: e.target.value })}
                      className="w-full p-3 rounded-xl border border-[#F9DCE7] focus:border-[#C65B83] outline-hidden text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#382536] mb-1">
                        Average Cycle Length (Days)
                      </label>
                      <input
                        type="number"
                        min="20"
                        max="60"
                        value={formData.typicalCycleLength || 28}
                        onChange={(e) => setFormData({ ...formData, typicalCycleLength: Number(e.target.value) })}
                        className="w-full p-3 rounded-xl border border-[#F9DCE7] text-sm"
                      />
                      <span className="text-[10px] text-[#897887]">Typical range: 26–35 days</span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#382536] mb-1">
                        Period Bleeding Duration
                      </label>
                      <input
                        type="number"
                        min="2"
                        max="10"
                        value={formData.periodDuration || 5}
                        onChange={(e) => setFormData({ ...formData, periodDuration: Number(e.target.value) })}
                        className="w-full p-3 rounded-xl border border-[#F9DCE7] text-sm"
                      />
                      <span className="text-[10px] text-[#897887]">Typical range: 3–7 days</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Question 7: PCOS Status */}
              {currentStepData.id === 'pcos_status' && (
                <div className="space-y-2.5">
                  {[
                    { key: 'diagnosed', label: 'Yes, diagnosed by a healthcare doctor' },
                    { key: 'suspected', label: 'I experience symptoms (irregularity, acne) but no formal diagnosis' },
                    { key: 'none', label: 'No PCOS / PCOD' },
                    { key: 'prefer_not_to_say', label: 'Prefer not to say' },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setFormData({ ...formData, pcosStatus: item.key as any })}
                      className={`w-full p-3 rounded-2xl text-xs font-semibold border text-left flex items-center justify-between transition ${
                        formData.pcosStatus === item.key
                          ? 'bg-[#F9DCE7] border-[#C65B83] text-[#382536]'
                          : 'bg-[#FFF9FB] border-[#F9DCE7] text-[#897887] hover:border-[#EFA6BE]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {formData.pcosStatus === item.key && <Check className="w-4 h-4 text-[#C65B83]" />}
                    </button>
                  ))}
                </div>
              )}

              {/* Question 8: Symptoms */}
              {currentStepData.id === 'commonSymptoms' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'Abdominal cramps',
                    'Bloating',
                    'Fatigue',
                    'Headaches',
                    'Mood changes',
                    'Breast tenderness',
                    'Acne',
                    'Food cravings',
                    'Digestive discomfort',
                  ].map((sym) => {
                    const selected = formData.commonSymptoms?.includes(sym);
                    return (
                      <button
                        key={sym}
                        type="button"
                        onClick={() => toggleArrayItem('commonSymptoms', sym)}
                        className={`p-3 rounded-2xl text-xs font-semibold border text-left flex items-center justify-between transition ${
                          selected
                            ? 'bg-[#F9DCE7] border-[#C65B83] text-[#382536]'
                            : 'bg-[#FFF9FB] border-[#F9DCE7] text-[#897887] hover:border-[#EFA6BE]'
                        }`}
                      >
                        <span>{sym}</span>
                        {selected && <Check className="w-3.5 h-3.5 text-[#C65B83]" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Question 9: Reproductive & Sexual Health Context */}
              {currentStepData.id === 'reproductive_health' && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-[#FFF9FB] border border-[#F9DCE7] text-xs text-[#897887]">
                    Natural cervical secretions and libido naturally fluctuate with estrogen and progesterone. Sharing this helps us predict fertile windows and hormone balance.
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#382536] mb-1">
                      Are you currently sexually active?
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['yes', 'no', 'prefer_not_to_say'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              sexualHealthContext: {
                                ...formData.sexualHealthContext,
                                isSexuallyActive: opt as any,
                              },
                            })
                          }
                          className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition ${
                            formData.sexualHealthContext?.isSexuallyActive === opt
                              ? 'bg-[#C65B83] text-white border-[#C65B83]'
                              : 'bg-white border-[#F9DCE7] text-[#897887]'
                          }`}
                        >
                          {opt.replace(/_/g, ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#382536] mb-1">
                      Libido or Vaginal Fluid Fluctuations
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dryness before period, or peak drive around ovulation"
                      value={formData.sexualHealthContext?.libidoFluctuations || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sexualHealthContext: {
                            ...formData.sexualHealthContext,
                            libidoFluctuations: e.target.value,
                          },
                        })
                      }
                      className="w-full p-2.5 rounded-xl border border-[#F9DCE7] text-xs"
                    />
                  </div>
                </div>
              )}

              {/* Question 10: Cravings */}
              {currentStepData.id === 'cravings' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    'Sweet foods',
                    'Chocolate',
                    'Salty snacks',
                    'Fried foods',
                    'Spicy foods',
                    'Warm carb-rich foods',
                  ].map((crv) => {
                    const selected = formData.cravings?.includes(crv);
                    return (
                      <button
                        key={crv}
                        type="button"
                        onClick={() => toggleArrayItem('cravings', crv)}
                        className={`p-3 rounded-2xl text-xs font-semibold border text-left flex items-center justify-between transition ${
                          selected
                            ? 'bg-[#F2C078]/40 border-[#F2C078] text-[#382536]'
                            : 'bg-[#FFF9FB] border-[#F9DCE7] text-[#897887] hover:border-[#F2C078]'
                        }`}
                      >
                        <span>{crv}</span>
                        {selected && <Check className="w-3.5 h-3.5 text-[#382536]" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Question 11: Dietary Pattern */}
              {currentStepData.id === 'dietaryPattern' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { key: 'vegetarian', label: 'Vegetarian' },
                      { key: 'vegan', label: 'Vegan' },
                      { key: 'eggetarian', label: 'Eggetarian' },
                      { key: 'non_vegetarian', label: 'Non-Vegetarian' },
                      { key: 'pescatarian', label: 'Pescatarian' },
                    ].map((d) => (
                      <button
                        key={d.key}
                        type="button"
                        onClick={() => setFormData({ ...formData, dietaryPattern: d.key as any })}
                        className={`p-3 rounded-xl text-xs font-semibold border text-center transition ${
                          formData.dietaryPattern === d.key
                            ? 'bg-[#C65B83] text-white border-[#C65B83]'
                            : 'bg-white border-[#F9DCE7] text-[#897887]'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#382536] mb-1">
                      Food Allergies (Strictly Excluded)
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {['Peanuts', 'Tree nuts', 'Milk / Dairy', 'Gluten / Wheat', 'Soy', 'Eggs', 'No known allergies'].map(
                        (allg) => {
                          const selected = formData.allergies?.includes(allg);
                          return (
                            <button
                              key={allg}
                              type="button"
                              onClick={() => toggleArrayItem('allergies', allg)}
                              className={`px-3 py-1 rounded-full text-xs border transition ${
                                selected
                                  ? 'bg-[#EFA6BE] text-white border-[#EFA6BE]'
                                  : 'bg-white border-[#F9DCE7] text-[#897887]'
                              }`}
                            >
                              {allg}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Question 12: Lifestyle & Activity */}
              {currentStepData.id === 'lifestyle_activity' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#382536] mb-1">
                      Daily Activity Level
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { key: 'sedentary', label: 'Desk job / Mostly sitting' },
                        { key: 'lightly_active', label: 'Light daily walks' },
                        { key: 'moderately_active', label: 'Moderate workouts 3-4x/week' },
                        { key: 'very_active', label: 'Very athletic & energetic' },
                      ].map((act) => (
                        <button
                          key={act.key}
                          type="button"
                          onClick={() => setFormData({ ...formData, activityLevel: act.key as any })}
                          className={`p-2.5 rounded-xl text-xs font-medium border text-left transition ${
                            formData.activityLevel === act.key
                              ? 'bg-[#A8B99B] text-white border-[#A8B99B]'
                              : 'bg-white border-[#F9DCE7] text-[#897887]'
                          }`}
                        >
                          {act.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#382536] mb-1">
                      Sleep Duration
                    </label>
                    <select
                      value={formData.sleepHours || '7–8 hours'}
                      onChange={(e) => setFormData({ ...formData, sleepHours: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#F9DCE7] text-xs text-[#382536]"
                    >
                      <option>Less than 5 hours</option>
                      <option>5–6 hours</option>
                      <option>6–7 hours</option>
                      <option>7–8 hours</option>
                      <option>More than 8 hours</option>
                    </select>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            /* Review & Confirmation Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-[#F9DCE7] space-y-6"
            >
              <div className="text-center pb-3 border-b border-[#F9DCE7]">
                <div className="w-12 h-12 rounded-full bg-[#F9DCE7] text-[#C65B83] flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h2 className="font-serif-title text-2xl font-bold text-[#382536]">
                  Confirm Your Wellness Profile
                </h2>
                <p className="text-xs text-[#897887]">
                  Review your answers before generating your customized cycle & nutrition dashboard.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#FFF9FB] border border-[#F9DCE7]">
                  <span className="block text-[#897887] font-semibold mb-1">Basic Profile</span>
                  <p className="text-[#382536] font-medium">
                    {formData.name || 'Friend'}, Age {formData.age} • {formData.region}
                  </p>
                  <p className="text-[#897887] mt-1">Cuisines: {formData.foodCulture?.join(', ')}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FFF9FB] border border-[#F9DCE7]">
                  <span className="block text-[#897887] font-semibold mb-1">Cycle Tracking</span>
                  <p className="text-[#382536] font-medium">
                    {formData.trackCycle ? `Active • ~${formData.typicalCycleLength} days cycle` : 'Cycle Tracking Off'}
                  </p>
                  <p className="text-[#897887] mt-1">Status: {formData.menstrualStatus}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FFF9FB] border border-[#F9DCE7]">
                  <span className="block text-[#897887] font-semibold mb-1">PCOS/PCOD Mode</span>
                  <p className="text-[#382536] font-medium capitalize">
                    {formData.pcosStatus === 'diagnosed' ? 'Active (Doctor Diagnosed)' : formData.pcosStatus}
                  </p>
                  <p className="text-[#897887] mt-1">
                    Insulin & inflammation conscious filters enabled.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FFF9FB] border border-[#F9DCE7]">
                  <span className="block text-[#897887] font-semibold mb-1">Dietary Focus</span>
                  <p className="text-[#382536] font-medium capitalize">
                    {formData.dietaryPattern}
                  </p>
                  <p className="text-[#897887] mt-1">
                    Allergies: {formData.allergies?.join(', ') || 'None'}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#EBF2E8] border border-[#A8B99B]/40 text-xs text-[#382536]">
                <strong className="block mb-1 text-emerald-900">Your Personalized Ecosystem is Ready:</strong>
                <ul className="list-disc list-inside space-y-0.5 text-emerald-800">
                  <li>Time-of-day meal recommendations (Breakfast, Lunch, Evening Snack, Dinner)</li>
                  <li>Explainable PCOS-Fit Scores (0–100)</li>
                  <li>Craving swap engine with FlavorDB cosine similarity</li>
                  <li>"Move With Your Cycle" phase-matched exercise routines</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation Buttons */}
      <div className="max-w-2xl mx-auto w-full flex items-center justify-between pt-4 border-t border-[#F9DCE7]">
        <button
          type="button"
          onClick={handleBack}
          className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#897887] hover:bg-white transition"
        >
          Back
        </button>

        {!reviewMode ? (
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-[#C65B83] text-white shadow-md hover:bg-[#8E2B54] transition"
          >
            <span>{currentStep === totalSteps - 1 ? 'Review Profile' : 'Next Question'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleCompleteOnboarding}
            className="flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-[#EFA6BE] to-[#C65B83] text-white shadow-lg hover:opacity-95 transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch My Flourish AI Dashboard</span>
          </button>
        )}
      </div>
    </div>
  );
}
