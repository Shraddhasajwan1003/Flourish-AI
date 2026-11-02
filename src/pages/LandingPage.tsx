/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Droplets,
  Sparkles,
  Heart,
  Calendar,
  UtensilsCrossed,
  Activity,
  Flame,
  ShieldCheck,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import IntroAnimation from '../components/IntroAnimation';
import { APP_NAME, TAGLINE, BRAND_COLORS, CYCLE_PHASES } from '../config/app.config';
import { storageService, DEFAULT_DEMO_PROFILE } from '../services/storageService';

export default function LandingPage() {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(!storageService.hasSeenIntro());

  const handleStartOnboarding = () => {
    navigate('/onboarding');
  };

  const handleExploreDemo = () => {
    storageService.saveUserProfile(DEFAULT_DEMO_PROFILE);
    navigate('/dashboard');
  };

  if (showIntro) {
    return <IntroAnimation onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#FFF9FB] text-[#382536] flex flex-col">
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#F9DCE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#EFA6BE] to-[#C65B83] flex items-center justify-center text-white shadow-xs">
              <Droplets className="w-5 h-5 fill-white" />
            </div>
            <span className="font-serif-title text-2xl font-bold tracking-tight text-[#382536]">
              {APP_NAME}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowIntro(true)}
              className="hidden sm:flex items-center gap-1 text-xs text-[#897887] hover:text-[#C65B83] px-3 py-1.5 rounded-full border border-[#F9DCE7] hover:bg-white transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Intro</span>
            </button>

            <button
              onClick={handleExploreDemo}
              className="px-4 py-2 rounded-full text-xs font-semibold text-[#C65B83] bg-[#F9DCE7]/70 hover:bg-[#F9DCE7] transition"
            >
              Instant Demo
            </button>

            <button
              onClick={handleStartOnboarding}
              className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#C65B83] hover:bg-[#8E2B54] shadow-xs transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F9DCE7] text-[#C65B83] text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cycle-Aware Women's Wellness & Computational Gastronomy</span>
          </div>

          <h1 className="font-serif-title text-4xl sm:text-6xl lg:text-7xl font-bold text-[#382536] tracking-tight leading-[1.15] mb-6">
            Understand Your Cycle. <br />
            <span className="bg-gradient-to-r from-[#C65B83] via-[#EFA6BE] to-[#A8B99B] bg-clip-text text-transparent">
              Nourish Your Body.
            </span>{' '}
            <br />
            Feel Your Best.
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#897887] leading-relaxed mb-10 font-normal">
            Flourish AI transforms menstrual cycle tracking into an actionable nutritional ecosystem.
            Powered by computational gastronomy from <strong>RecipeDB</strong>, <strong>FlavorDB</strong>, and verified mocktails, tailored specifically for PCOS/PCOD hormonal harmony.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleStartOnboarding}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-bold bg-gradient-to-r from-[#EFA6BE] to-[#C65B83] text-white shadow-lg shadow-[#C65B83]/25 hover:shadow-xl hover:scale-[1.02] transition flex items-center justify-center gap-2"
            >
              <span>Begin Doctor-Style Consultation Intake</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleExploreDemo}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-semibold bg-white border border-[#F9DCE7] text-[#382536] hover:bg-[#FFF9FB] shadow-xs transition"
            >
              Explore Live Dashboard
            </button>
          </div>

          <p className="mt-4 text-xs text-[#897887] flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#A8B99B]" />
            <span>Age-safe, privacy-first, evidence-informed guidance. No medical diagnosis.</span>
          </p>
        </div>
      </section>

      {/* 4 Cycle Phases Showcase */}
      <section className="py-16 bg-white border-y border-[#F9DCE7] px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#C65B83] uppercase tracking-widest">
              Hormone-Synchronized Eating
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#382536] mt-2">
              Every Phase Deserves Thoughtful Nourishment
            </h2>
            <p className="text-sm text-[#897887] max-w-xl mx-auto mt-2">
              Your body metabolizes energy differently across each phase. Here is how Flourish AI adapts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(CYCLE_PHASES).map(([key, phase]) => (
              <div
                key={key}
                className="p-6 rounded-3xl border border-[#F9DCE7] transition hover:shadow-md"
                style={{ backgroundColor: phase.bgLight }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mb-4"
                  style={{ backgroundColor: phase.accentColor }}
                >
                  {phase.days.split(' ')[1]}
                </div>
                <h3 className="font-serif-title text-xl font-bold text-[#382536] mb-1">
                  {phase.name}
                </h3>
                <span className="inline-block text-[11px] font-semibold text-[#897887] mb-3">
                  {phase.days} • {phase.focus}
                </span>
                <div className="space-y-3 text-xs text-[#382536]/90 leading-relaxed border-t border-[#F9DCE7]/60 pt-3">
                  <p>
                    <strong className="text-[#382536]">Nutrition:</strong> {phase.nutritionTip}
                  </p>
                  <p>
                    <strong className="text-[#382536]">Movement:</strong> {phase.movementTip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Pillars & Foodoscope Database Integration */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#C65B83] uppercase tracking-widest">
              Core Intelligence
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#382536] mt-2">
              Computational Gastronomy for Women's Health
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-[#F9DCE7] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#F9DCE7] text-[#C65B83] flex items-center justify-center mb-4">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <h3 className="font-serif-title text-xl font-bold text-[#382536] mb-2">
                RecipeDB Integration
              </h3>
              <p className="text-xs text-[#897887] leading-relaxed mb-4">
                Access curated regional Indian and global recipes with full nutrient profiles, cooking methods, and explainable <strong>PCOS-Fit Scores (0–100)</strong>.
              </p>
              <ul className="text-xs text-[#382536] space-y-1.5">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Low glycemic index prioritization
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 20-30g bioavailable protein targeting
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> High-fiber estrogen excretion
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#F9DCE7] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#F2C078]/30 text-[#382536] flex items-center justify-center mb-4">
                <Flame className="w-6 h-6 text-[#C9822C]" />
              </div>
              <h3 className="font-serif-title text-xl font-bold text-[#382536] mb-2">
                FlavorDB Craving Swap
              </h3>
              <p className="text-xs text-[#897887] leading-relaxed mb-4">
                Our flagship innovation: Cosine similarity on flavor molecules. Swap high-sugar snacks for blood-sugar balancing foods with identical taste volatiles.
              </p>
              <ul className="text-xs text-[#382536] space-y-1.5">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Vector cosine similarity (85–95%)
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Biological rationale (e.g. Magnesium)
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instant healthy recipe instructions
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#F9DCE7] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF2E8] text-emerald-700 flex items-center justify-center mb-4">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-serif-title text-xl font-bold text-[#382536] mb-2">
                Move With Your Cycle
              </h3>
              <p className="text-xs text-[#897887] leading-relaxed mb-4">
                Cycle-synchronized yoga, pilates, and resistance workouts. Includes an integrated <strong>Python ML training script generator</strong> to train custom models.
              </p>
              <ul className="text-xs text-[#382536] space-y-1.5">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Pelvic release during menstruation
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Low-impact pilates for cortisol control
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Step-by-step guidance & modifications
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Footer */}
      <footer className="mt-auto bg-white border-t border-[#F9DCE7] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h3 className="font-serif-title text-2xl font-bold text-[#382536]">
            Start Your Guided Wellness Journey Today
          </h3>
          <p className="text-xs text-[#897887] max-w-md mx-auto">
            Answer age and consultation intake questions to receive your bespoke time-of-day meal plan.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={handleStartOnboarding}
              className="px-6 py-3 rounded-full text-xs font-bold bg-[#C65B83] text-white shadow-md hover:bg-[#8E2B54] transition"
            >
              Start Intake Questionnaire
            </button>
            <button
              onClick={handleExploreDemo}
              className="px-6 py-3 rounded-full text-xs font-semibold bg-[#FFF9FB] border border-[#F9DCE7] text-[#382536] hover:bg-[#F9DCE7]/40 transition"
            >
              Open Dashboard
            </button>
          </div>
          <p className="text-[11px] text-[#897887] pt-4">
            Flourish AI © 2026 • Nourish Your Menstrual Flow & Cycle-Aware Platform
          </p>
        </div>
      </footer>
    </div>
  );
}
