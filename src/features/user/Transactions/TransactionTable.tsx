// src/pages/TransactionTable.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TransactionTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transactions: any[];
}

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  if (!transactions || transactions.length === 0) {
    return <p className="text-center text-red-500 mt-4">Number not exists</p>;
  }

  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((txn) => (
            <TableRow key={txn._id}>
              <TableCell>{txn._id}</TableCell>

              <TableCell>
                {txn.from?.user?.phoneNumber || "-"}
              </TableCell>

              <TableCell>
                {txn.to?.user?.phoneNumber || "-"}
              </TableCell>

              <TableCell>{txn.amount}</TableCell>
              <TableCell>{txn.type}</TableCell>
              <TableCell>{txn.status}</TableCell>
              <TableCell>{new Date(txn.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
