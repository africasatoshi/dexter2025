/**
 * Dashboard page
 * Main control center for managing test transactions and credits
 */

import React from 'react';
import {
  CreditDisplay,
  NewTransferButton,
  TransactionList,
  UpgradeButton
} from './components';

export default function DashboardPage(): React.ReactElement {
  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        {/* Top section with actions and credits */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:justify-between">
          <NewTransferButton />
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            <CreditDisplay credits={3} />
            <UpgradeButton />
          </div>
        </div>

        {/* Transfers section */}
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-xl md:text-2xl font-bold">Transfers</h2>
          <TransactionList />
        </div>
      </div>
    </main>
  );
} 