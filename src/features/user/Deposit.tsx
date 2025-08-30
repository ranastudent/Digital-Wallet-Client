/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAddMoneyMutation } from "@/redux/features/transactions/transactionApiSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const Deposit = () => {
  const [amount, setAmount] = useState("");
  const [transaction, setTransaction] = useState<any>(null); // store transaction details
  const [open, setOpen] = useState(false);
  const [addMoney, { isLoading }] = useAddMoneyMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) {
      toast.error("Amount is required");
      return;
    }

    try {
      const res = await addMoney({ amount: Number(amount) }).unwrap();
      setTransaction(res.data); // ✅ save API response
      setOpen(true); // ✅ open modal
      setAmount("");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to complete deposit");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            Deposit Money
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Depositing..." : "Deposit"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* ✅ Success Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-2xl shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-green-600">
              Deposit Successful 🎉
            </DialogTitle>
          </DialogHeader>
          {transaction && (
            <div className="space-y-2">
              <p>
                <strong>Amount:</strong> {transaction.amount} BDT
              </p>
              <p>
                <strong>New Balance:</strong> {transaction.currentBalance} BDT
              </p>
              <p>
                <strong>Transaction ID:</strong> {transaction._id}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Deposit;
