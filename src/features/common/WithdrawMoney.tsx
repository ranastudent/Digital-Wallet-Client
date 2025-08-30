import { useState } from "react";
import { useWithdrawMoneyMutation } from "@/redux/features/transactions/transactionApiSlice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const WithdrawMoney = () => {
  const [amount, setAmount] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState<number | null>(null);

  const [withdrawMoney, { isLoading }] = useWithdrawMoneyMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await withdrawMoney({ amount }).unwrap();
      if (res.success) {
        setWithdrawAmount(res.data.amount);
        setOpen(true); // open success dialog
        setAmount(0);
      }
    } catch (err) {
      console.error("Withdrawal failed:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Tabs defaultValue="withdraw">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        </TabsList>
        <TabsContent value="withdraw">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 mt-4 p-4 border rounded-xl shadow-md"
          >
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount"
              required
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Processing..." : "Withdraw"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>

      {/* Success Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdrawal Successful 🎉</DialogTitle>
            <DialogDescription>
              You have successfully withdrawn{" "}
              <span className="font-bold text-green-600">
                {withdrawAmount} BDT
              </span>
              .
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WithdrawMoney;
