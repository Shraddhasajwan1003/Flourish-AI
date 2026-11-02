/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { APP_NAME, TAGLINE } from '../config/app.config';
import { storageService } from '../services/storageService';

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<'falling' | 'impact' | 'ripple' | 'reveal' | 'finished'>('falling');

  useEffect(() => {
    // Stage 1: Fall (0ms -> 1100ms)
    const t1 = setTimeout(() => setStage('impact'), 1100);
    // Stage 2: Ripple (1100ms -> 1800ms)
    const t2 = setTimeout(() => setStage('ripple'), 1400);
    // Stage 3: Reveal brand & tagline (1800ms -> 4200ms)
    const t3 = setTimeout(() => setStage('reveal'), 2000);
    // Stage 4: Finished
    const t4 = setTimeout(() => {
      setStage('finished');
      storageService.markIntroSeen();
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const handleSkip = () => {
    storageService.markIntroSeen();
    onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#241322] via-[#382536] to-[#1C0E1A] overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8 } }}
      >
        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 z-20 px-4 py-1.5 rounded-full text-xs font-medium text-white/70 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md transition"
        >
          Skip Intro →
        </button>

        {/* Droplet & Liquid Surface Container */}
        <div className="relative w-72 h-72 flex items-center justify-center">
          {/* Droplet falling */}
          {(stage === 'falling' || stage === 'impact') && (
            <motion.div
              className="absolute z-10 w-6 h-8 rounded-full bg-gradient-to-b from-[#EFA6BE] to-[#C65B83] shadow-lg shadow-[#C65B83]/40"
              style={{
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              }}
              initial={{ y: -180, scale: 0.7, opacity: 0 }}
              animate={{
                y: stage === 'impact' ? 20 : 0,
                scale: stage === 'impact' ? 1.4 : 1,
                opacity: 1,
              }}
              transition={{
                duration: 1.1,
                ease: [0.45, 0, 0.55, 1],
              }}
            />
          )}

          {/* Liquid Impact Ripples */}
          {(stage === 'impact' || stage === 'ripple' || stage === 'reveal') && (
            <>
              {/* Central splash dot */}
              <motion.div
                className="w-4 h-4 rounded-full bg-[#EFA6BE]"
                initial={{ scale: 0.2, opacity: 0.8 }}
                animate={{ scale: [1, 1.8, 0], opacity: [0.9, 0.4, 0] }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />

              {/* Ripple Ring 1 */}
              <motion.div
                className="absolute w-20 h-20 rounded-full border border-[#EFA6BE]/60"
                initial={{ scale: 0.1, opacity: 1 }}
                animate={{ scale: 3.5, opacity: 0 }}
                transition={{ duration: 2.2, ease: 'easeOut' }}
              />

              {/* Ripple Ring 2 */}
              <motion.div
                className="absolute w-28 h-28 rounded-full border border-[#C65B83]/40"
                initial={{ scale: 0.1, opacity: 0.8 }}
                animate={{ scale: 4.5, opacity: 0 }}
                transition={{ delay: 0.25, duration: 2.4, ease: 'easeOut' }}
              />

              {/* Ripple Ring 3 */}
              <motion.div
                className="absolute w-36 h-36 rounded-full border border-[#F9DCE7]/20"
                initial={{ scale: 0.1, opacity: 0.6 }}
                animate={{ scale: 5.5, opacity: 0 }}
                transition={{ delay: 0.5, duration: 2.6, ease: 'easeOut' }}
              />
            </>
          )}
        </div>

        {/* Elegant Typography Reveal */}
        <div className="text-center px-4 z-10 -mt-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: stage === 'reveal' ? 1 : 0,
              y: stage === 'reveal' ? 0 : 15,
            }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h1 className="font-serif-title text-4xl sm:text-5xl font-bold tracking-tight text-white mb-3">
              {APP_NAME}
            </h1>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#EFA6BE] to-transparent mx-auto mb-4" />
            <p className="text-sm sm:text-base text-[#F9DCE7]/90 max-w-md font-light tracking-wide">
              {TAGLINE}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
