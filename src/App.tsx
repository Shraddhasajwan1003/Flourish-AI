/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import CycleTracker from './pages/CycleTracker';
import RecipeExplorer from './pages/RecipeExplorer';
import PcosNutritionHub from './pages/PcosNutritionHub';
import CravingSwap from './pages/CravingSwap';
import MovementModule from './pages/MovementModule';
import BeverageExplorer from './pages/BeverageExplorer';
import Marketplace from './pages/Marketplace';
import AskFemAssistant from './pages/AskFemAssistant';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cycle" element={<CycleTracker />} />
        <Route path="/recipes" element={<RecipeExplorer />} />
        <Route path="/pcos-hub" element={<PcosNutritionHub />} />
        <Route path="/craving-swap" element={<CravingSwap />} />
        <Route path="/movement" element={<MovementModule />} />
        <Route path="/beverages" element={<BeverageExplorer />} />
        <Route path="/market" element={<Marketplace />} />
        <Route path="/ask-fem" element={<AskFemAssistant />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
