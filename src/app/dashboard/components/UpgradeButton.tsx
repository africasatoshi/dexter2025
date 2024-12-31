/**
 * UpgradeButton.tsx
 * Button to upgrade account / purchase more credits
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function UpgradeButton(): React.ReactElement {
  return (
    <motion.button
      onClick={() => {/* TODO: Implement upgrade flow */}}
      className="dos-text px-6 py-3 bg-black rounded-lg 
        border border-white/20 text-white/90
        hover:bg-white/10 hover:border-white/30 
        transition-all duration-300
        active:scale-95"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      UPGRADE
    </motion.button>
  );
} 