import { useMyWalletQuery } from "@/redux/features/wallet/WalletApiSlice";

const Wallet = () => {
  const { data, error, isLoading } = useMyWalletQuery();

  if (isLoading) return <p>Loading wallet...</p>;
  if (error) return <p>Failed to load wallet</p>;

  return (
    <div>
      <h2>Wallet</h2>
      <p>Balance: {data?.data.balance}</p>
      <p>Status: {data?.data.isBlocked ? "Blocked" : "Active"}</p>
    </div>
  );
};

export default Wallet;
