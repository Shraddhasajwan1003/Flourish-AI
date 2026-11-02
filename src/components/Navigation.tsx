/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Calendar,
  Sparkles,
  UtensilsCrossed,
  HeartPulse,
  Activity,
  ShoppingBag,
  MessageSquareHeart,
  LineChart,
  Settings,
  GlassWater,
  Flame,
  Menu,
  X,
  Droplets,
} from 'lucide-react';
import { APP_NAME } from '../config/app.config';
import { storageService } from '../services/storageService';
import { cyclePredictionService } from '../services/cyclePredictionService';

export default function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const profile = storageService.getUserProfile();
  const cycleStatus = profile ? cyclePredictionService.calculateCycleStatus(profile) : null;

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: HeartPulse },
    { to: '/cycle', label: 'Cycle & Calendar', icon: Calendar },
    { to: '/recipes', label: 'RecipeDB', icon: UtensilsCrossed },
    { to: '/pcos-hub', label: 'PCOS Nutrition', icon: Sparkles },
    { to: '/craving-swap', label: 'Craving Swap', icon: Flame },
    { to: '/movement', label: 'Move Cycle', icon: Activity },
    { to: '/beverages', label: 'Mocktails', icon: GlassWater },
    { to: '/market', label: 'Flourish Market', icon: ShoppingBag },
    { to: '/ask-fem', label: 'Ask Flourish AI', icon: MessageSquareHeart },
    { to: '/analytics', label: 'Analytics', icon: LineChart },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#F9DCE7] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#EFA6BE] to-[#C65B83] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Droplets className="w-5 h-5 fill-white/80" />
            </div>
            <div>
              <span className="font-serif-title text-2xl font-bold tracking-tight text-[#382536]">
                {APP_NAME}
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-[#F9DCE7] text-[#C65B83]">
                Wellness AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, 8).map((link) => {
              const Icon = link.icon;
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    active
                      ? 'bg-[#EFA6BE] text-white shadow-xs'
                      : 'text-[#897887] hover:text-[#382536] hover:bg-[#FFF9FB]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action / Status / Mobile Toggle */}
          <div className="flex items-center gap-3">
            {cycleStatus && (
              <Link
                to="/cycle"
                className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-[#EFA6BE]/40 hover:bg-[#FFF9FB] transition"
                style={{ backgroundColor: cycleStatus.phaseInfo.bgLight }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: cycleStatus.phaseInfo.accentColor }}
                />
                <span className="text-[#382536] font-semibold">
                  Day {cycleStatus.cycleDay}
                </span>
                <span className="text-[#897887] text-[11px]">
                  • {cycleStatus.phaseInfo.name.split(' ')[0]}
                </span>
              </Link>
            )}

            <Link
              to="/ask-fem"
              className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#C65B83] text-white shadow-xs hover:bg-[#8E2B54] transition"
            >
              <MessageSquareHeart className="w-3.5 h-3.5" />
              <span>Ask Flourish</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#382536] hover:bg-[#F9DCE7]/50"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#F9DCE7] px-4 pt-3 pb-6 space-y-1">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-sm font-medium ${
                    active
                      ? 'bg-[#EFA6BE] text-white'
                      : 'text-[#382536] hover:bg-[#FFF9FB]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#F9DCE7] flex items-center justify-between text-xs text-[#897887]">
            <span>Signed in as <strong>{profile?.name || 'Guest'}</strong></span>
            <Link
              to="/onboarding"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#C65B83] font-semibold underline"
            >
              Retake Intake
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
