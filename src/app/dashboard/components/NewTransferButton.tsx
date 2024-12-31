/**
 * NewTransferButton.tsx
 * Primary action button to start a new test transfer
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function NewTransferButton(): React.ReactElement {
  const router = useRouter();

  return (
    <motion.button
      onClick={() => router.push('/transfer')}
      className="dos-text px-6 py-3 bg-white/10 rounded-lg border border-white/10
        hover:bg-white/20 hover:border-white/20 transition-all duration-300
        active:scale-95"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      NEW TEST TRANSFER
    </motion.button>
  );
} 