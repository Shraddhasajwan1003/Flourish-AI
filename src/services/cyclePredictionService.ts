/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyclePhaseKey, UserProfile } from '../types';
import { CYCLE_PHASES } from '../config/app.config';

export interface CycleStatus {
  cycleDay: number;
  currentPhase: CyclePhaseKey;
  phaseInfo: typeof CYCLE_PHASES['MENSTRUAL'];
  daysUntilNextPeriod: number;
  predictedNextPeriodDate: string; // YYYY-MM-DD
  confidenceIntervalDays: number; // e.g. ±2
  estimatedOvulationDate: string;
  isDelayed: boolean;
  cycleProgressPercent: number; // 0 to 100
  phaseDayIndex: number;
  totalPhaseDays: number;
}

export const cyclePredictionService = {
  calculateCycleStatus(profile: UserProfile): CycleStatus {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastPeriod = new Date(profile.lastPeriodDate);
    lastPeriod.setHours(0, 0, 0, 0);

    const diffMs = today.getTime() - lastPeriod.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    // Cycle day is 1-indexed
    const cycleLength = profile.typicalCycleLength || 28;
    const periodDuration = profile.periodDuration || 5;

    // Normalizing cycle day
    let cycleDay = diffDays + 1;
    if (cycleDay < 1) cycleDay = 1;

    // Ovulation occurs approximately 14 days before the next period
    const estimatedOvulationDay = Math.max(periodDuration + 2, cycleLength - 14);

    let currentPhase: CyclePhaseKey = 'FOLLICULAR';
    let phaseDayIndex = 1;
    let totalPhaseDays = 7;

    if (cycleDay <= periodDuration) {
      currentPhase = 'MENSTRUAL';
      phaseDayIndex = cycleDay;
      totalPhaseDays = periodDuration;
    } else if (cycleDay < estimatedOvulationDay - 1) {
      currentPhase = 'FOLLICULAR';
      phaseDayIndex = cycleDay - periodDuration;
      totalPhaseDays = Math.max(1, (estimatedOvulationDay - 2) - periodDuration);
    } else if (cycleDay <= estimatedOvulationDay + 2) {
      currentPhase = 'OVULATORY';
      phaseDayIndex = cycleDay - (estimatedOvulationDay - 2);
      totalPhaseDays = 4;
    } else {
      currentPhase = 'LUTEAL';
      phaseDayIndex = cycleDay - (estimatedOvulationDay + 2);
      totalPhaseDays = Math.max(1, cycleLength - (estimatedOvulationDay + 2));
    }

    const isDelayed = cycleDay > cycleLength;
    const daysUntilNextPeriod = Math.max(0, cycleLength - cycleDay);

    // Predict next period date
    const nextPeriodDateObj = new Date(lastPeriod.getTime() + cycleLength * 86400000);
    const predictedNextPeriodDate = nextPeriodDateObj.toISOString().split('T')[0];

    const ovulationDateObj = new Date(lastPeriod.getTime() + (estimatedOvulationDay - 1) * 86400000);
    const estimatedOvulationDate = ovulationDateObj.toISOString().split('T')[0];

    // Uncertainty interval based on regularity
    let confidenceIntervalDays = 2;
    if (profile.isRegular === 'Sometimes irregular') confidenceIntervalDays = 4;
    if (profile.isRegular === 'Frequently irregular') confidenceIntervalDays = 7;

    const cycleProgressPercent = Math.min(100, Math.round((cycleDay / cycleLength) * 100));

    return {
      cycleDay,
      currentPhase,
      phaseInfo: CYCLE_PHASES[currentPhase],
      daysUntilNextPeriod,
      predictedNextPeriodDate,
      confidenceIntervalDays,
      estimatedOvulationDate,
      isDelayed,
      cycleProgressPercent,
      phaseDayIndex,
      totalPhaseDays,
    };
  },
};
