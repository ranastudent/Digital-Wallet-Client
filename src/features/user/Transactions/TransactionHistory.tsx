/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect } from "react";
import { useGetMyTransactionsQuery } from "@/redux/features/transactions/transactionApiSlice";
import TransactionTable from "./TransactionTable";
import { Input } from "@/components/ui/input";

const TransactionHistory = () => {
  const { data, isLoading, error } = useGetMyTransactionsQuery();
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<any[]>([]);

  const transactions = useMemo(() => data?.data || [], [data?.data]);

  // Live search: filter transactions as user types
  useEffect(() => {
    const q = query.trim().toLowerCase();

    if (!q) {
      setFiltered([]);
      return;
    }

    const matched = transactions.filter((txn: any) => {
      const fromPhone = txn.from?.user?.phoneNumber?.toLowerCase() || "";
      const toPhone = txn.to?.user?.phoneNumber?.toLowerCase() || "";

      return fromPhone.includes(q) || toPhone.includes(q);
    });

    setFiltered(matched);
  }, [query, transactions]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load transactions</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>

      {/* Live Search input */}
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Search by phone number"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-64"
        />
      </div>

      {/* Transaction table */}
      <TransactionTable transactions={query ? filtered : transactions} />
    </div>
  );
};

export default TransactionHistory;
