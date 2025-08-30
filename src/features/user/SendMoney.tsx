import { useState } from "react";
import { useSendMoneyMutation } from "@/redux/features/transactions/transactionApiSlice";
import { toast } from "react-toastify";

export default function SendMoney() {
  const [recipientPhone, setRecipientPhone] = useState("");
  const [amount, setAmount] = useState<number | string>("");

  const [sendMoney, { isLoading }] = useSendMoneyMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipientPhone || !amount) {
      toast.error("Please provide both phone and amount.");
      return;
    }

    try {
      const res = await sendMoney({
        recipientPhone,
        amount: Number(amount),
      }).unwrap();

      if (res.success) {
        toast.success(res.message);
        setRecipientPhone("");
        setAmount("");
      } else {
        toast.error("Transaction failed.");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Send Money</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Recipient Phone</label>
          <input
            type="text"
            value={recipientPhone}
            onChange={(e) => setRecipientPhone(e.target.value)}
            placeholder="Enter phone number"
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {isLoading ? "Sending..." : "Send Money"}
        </button>
      </form>
    </div>
  );
}
