import { useLatestTransactionQuery } from "@/redux/features/transactions/transactionApiSlice";

const LatestTransaction = () => {
  const { data, error, isLoading } = useLatestTransactionQuery();

  if (isLoading) return <p>Loading latest transaction...</p>;
  if (error) return <p>Failed to load Recent Transaction</p>;

  const transaction = data?.data; // 👈 actual transaction object

  if (!transaction) return <p>No transaction found</p>;

  return (
    <div className="p-4 rounded-xl shadow-md bg-card text-card-foreground">
      <h3 className="text-lg font-semibold mb-2">Latest Transaction</h3>
      <p><span className="font-medium">Type:</span> {transaction.type}</p>
      <p><span className="font-medium">Amount:</span> {transaction.amount}</p>
      <p><span className="font-medium">Status:</span> {transaction.status}</p>
      <p><span className="font-medium">Date:</span> {new Date(transaction.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default LatestTransaction;
