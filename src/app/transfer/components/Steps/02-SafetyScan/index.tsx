/**
 * SafetyScan step component
 * Displays risk assessment results for the recipient address
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SafetyScanProps {
  onNext: () => void;
}

interface ComponentScore {
  name: string;
  score: number;
  description: string;
}

interface RiskAssessment {
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  score: number;
  components: ComponentScore[];
}

const GRADE_COLORS = {
  'A': 'text-green-400',
  'B': 'text-green-300',
  'C': 'text-yellow-300',
  'D': 'text-orange-400',
  'F': 'text-red-400'
} as const;

// Mock assessment result
const ASSESSMENT: RiskAssessment = {
  grade: 'A',
  score: 28,
  components: [
    {
      name: 'Address Validity',
      score: 10,
      description: 'Valid address format with correct checksum'
    },
    {
      name: 'Chain History',
      score: 9,
      description: 'Active address with normal transaction patterns'
    },
    {
      name: 'Scam Database',
      score: 9,
      description: 'No suspicious activity detected'
    }
  ]
};

export default function SafetyScan({ onNext }: SafetyScanProps): React.ReactElement {
  return (
    <div className="space-y-8">
      {/* Grade display */}
      <div className="flex justify-center">
        <motion.div
          className="relative w-32 h-32 flex flex-col items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
        >
          <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
          <div className={`text-6xl font-bold ${GRADE_COLORS[ASSESSMENT.grade]}`}>
            {ASSESSMENT.grade}
          </div>
          <div className="text-white/70 mt-1">
            {ASSESSMENT.score}/30
          </div>
        </motion.div>
      </div>

      {/* Score breakdown */}
      <div className="space-y-6">
        {ASSESSMENT.components.map((component, index) => (
          <motion.div
            key={component.name}
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="flex justify-between items-center">
              <span className="text-white/70">{component.name}</span>
              <span className="text-white font-medium">{component.score}/10</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${(component.score / 10) * 100}%` }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              />
            </div>
            <p className="text-sm text-white/50">{component.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Button container */}
      <div className="flex gap-4">
        <motion.button
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg font-medium 
            transition-colors w-[100px]"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Back
        </motion.button>
        <motion.button
          onClick={onNext}
          className="flex-1 px-6 py-3 bg-white/10 rounded-lg border border-white/20
            hover:bg-white/20 hover:border-white/30 transition-all duration-300"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue to Test Transfer
        </motion.button>
      </div>
    </div>
  );
} 