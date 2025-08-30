"use client";

import { useState, useMemo } from "react";
import { useGetAdminTransactionsQuery, type Transaction } from "@/redux/features/admin/AdminApiSlice";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const Transactions = () => {
  // Filters & search
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [minAmount, setMinAmount] = useState<number | "">("");
  const [maxAmount, setMaxAmount] = useState<number | "">("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Fetch transactions
  const { data, isLoading, error } = useGetAdminTransactionsQuery(undefined);

  // Hooks must come before early returns
  const transactions: Transaction[] = useMemo(() => data?.data || [], [data?.data]);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) =>
        search
          ? tx._id.toLowerCase().includes(search.toLowerCase()) ||
            (tx.agent?.name ?? "").toLowerCase().includes(search.toLowerCase())
          : true
      )
      .filter((tx) => (typeFilter !== "all" ? tx.type === typeFilter : true))
      .filter((tx) => (statusFilter !== "all" ? tx.status === statusFilter : true))
      .filter((tx) => (minAmount !== "" ? tx.amount >= Number(minAmount) : true))
      .filter((tx) => (maxAmount !== "" ? tx.amount <= Number(maxAmount) : true));
  }, [transactions, search, typeFilter, statusFilter, minAmount, maxAmount]);

  const totalPages = Math.ceil(filteredTransactions.length / pageSize);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (isLoading) return <p>Loading transactions...</p>;
  if (error) return <p>Failed to load transactions.</p>;

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-2 md:items-end">
        <Input
          placeholder="Search by ID or Agent Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="add-money">Add Money</SelectItem>
            <SelectItem value="cash-out">Cash Out</SelectItem>
            <SelectItem value="send-money">Send Money</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Min Amount"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value ? Number(e.target.value) : "")}
          className="w-24"
        />
        <Input
          type="number"
          placeholder="Max Amount"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value ? Number(e.target.value) : "")}
          className="w-24"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-md border bg-background">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Agent</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Commission</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.map((tx) => (
              <TableRow key={tx._id}>
                <TableCell>{tx._id}</TableCell>
                <TableCell>{tx.agent?.name || "-"}</TableCell>
                <TableCell>{tx.type}</TableCell>
                <TableCell>{tx.status}</TableCell>
                <TableCell>{tx.amount}</TableCell>
                <TableCell>{tx.commission}</TableCell>
                <TableCell>{new Date(tx.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards - Grid single column */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {paginatedTransactions.map((tx) => (
          <div
            key={tx._id}
            className="p-4 border rounded-md shadow-sm bg-background"
          >
            <p><span className="font-medium">ID:</span> {tx._id}</p>
            <p><span className="font-medium">Agent:</span> {tx.agent?.name || "-"}</p>
            <p><span className="font-medium">Type:</span> {tx.type}</p>
            <p><span className="font-medium">Status:</span> {tx.status}</p>
            <p><span className="font-medium">Amount:</span> {tx.amount}</p>
            <p><span className="font-medium">Commission:</span> {tx.commission}</p>
            <p><span className="font-medium">Created At:</span> {new Date(tx.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-2">
        <Button
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </Button>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            size="sm"
            variant={currentPage === i + 1 ? "default" : "outline"}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Transactions;
