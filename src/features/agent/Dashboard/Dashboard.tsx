"use client";

import CashinSummary from "./CashInSummary";
import CashoutSummary from "./CashOutSummary";
import LatestTransaction from "./RecentActivity";

export default function AgentDashboard() {
  return (
    <div className="w-full p-4 space-y-6">
      {/* Top Row: Latest Transaction */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <LatestTransaction />
      </div>

      {/* Middle Row: Cash-in Summary */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Cash-In Summary</h2>
        <CashinSummary />
      </div>

      {/* Bottom Row: Cash-out Summary */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Cash-Out Summary</h2>
        <CashoutSummary />
      </div>
    </div>
  );
}
