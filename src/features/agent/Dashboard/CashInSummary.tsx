/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAgentCashInSummaryQuery } from "@/redux/features/transactions/transactionApiSlice";

export default function CashinSummary() {
  const { data, isLoading, isError } = useGetAgentCashInSummaryQuery();
  const transactions = data?.data || [];

  if (isLoading) return <p className="text-center mt-4">Loading...</p>;
  if (isError) return <p className="text-center mt-4 text-red-500">Error loading data</p>;

  return (
    <div className="w-full space-y-4">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-md border bg-background">
        <table className="min-w-[600px] w-full table-auto border-collapse">
          <thead className="bg-muted/50">
            <tr>
              <th className="h-9 py-2 px-2 text-left">From (Agent)</th>
              <th className="h-9 py-2 px-2 text-left">To (User)</th>
              <th className="h-9 py-2 px-2 text-left">Amount</th>
              <th className="h-9 py-2 px-2 text-left">Commission</th>
              <th className="h-9 py-2 px-2 text-left">Status</th>
              <th className="h-9 py-2 px-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn: any) => (
              <tr key={txn._id} className="border-t">
                <td className="py-2 px-2 font-medium">{txn.from?.user?.phoneNumber}</td>
                <td className="py-2 px-2">{txn.to?.user?.phoneNumber}</td>
                <td className="py-2 px-2">{txn.amount}</td>
                <td className="py-2 px-2">{txn.commission}</td>
                <td className="py-2 px-2">{txn.status}</td>
                <td className="py-2 px-2">{new Date(txn.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-2">
        {transactions.map((txn: any) => (
          <div
            key={txn._id}
            className="border rounded-md p-4 bg-background shadow-sm"
          >
            <p><strong>From:</strong> {txn.from?.user?.phoneNumber}</p>
            <p><strong>To:</strong> {txn.to?.user?.phoneNumber}</p>
            <p><strong>Amount:</strong> {txn.amount}</p>
            <p><strong>Commission:</strong> {txn.commission}</p>
            <p><strong>Status:</strong> {txn.status}</p>
            <p><strong>Date:</strong> {new Date(txn.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>

      <p className="text-muted-foreground mt-2 text-center text-sm">
        Cash-In Summary
      </p>
    </div>
  );
}
