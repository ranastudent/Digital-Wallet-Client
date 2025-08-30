import { useState } from "react";
import { useAddMoneyMutation } from "@/redux/features/transactions/transactionApiSlice";

const AddMoney = () => {
  const [amount, setAmount] = useState<number>(0);
  const [addMoney, { isLoading, isSuccess, error }] = useAddMoneyMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addMoney({ amount });
    setAmount(0);
  };

  return (
    <div>
      <h2>Add Money</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter amount"
        />
        <button type="submit" disabled={isLoading}>Add</button>
      </form>
      {isSuccess && <p>Money added successfully!</p>}
      {error && <p>Failed to add money</p>}
    </div>
  );
};

export default AddMoney;
