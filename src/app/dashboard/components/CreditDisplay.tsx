/**
 * CreditDisplay.tsx
 * Shows remaining test transaction credits
 */

import React from 'react';

interface CreditDisplayProps {
  credits: number;
}

export default function CreditDisplay({ credits }: CreditDisplayProps): React.ReactElement {
  return (
    <div className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-lg border border-white/10">
      <div className="text-lg font-medium">
        <span className="text-white/50">Credits: </span>
        <span className="text-white">{credits}</span>
      </div>
    </div>
  );
} 