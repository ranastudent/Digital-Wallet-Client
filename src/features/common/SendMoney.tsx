import { useState } from "react";
import { useSendMoneyMutation } from "@/redux/features/transactions/transactionApiSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const SendMoney = () => {
  const [recipientPhone, setRecipientPhone] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [transactionData, setTransactionData] = useState<any>(null);

  const [sendMoney, { isLoading, error }] = useSendMoneyMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await sendMoney({ recipientPhone, amount }).unwrap();
      setTransactionData(res.data); // Save API response
      setOpen(true); // Open dialog
      setRecipientPhone("");
      setAmount(0);
    } catch (err) {
      console.error("Send money failed:", err);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">
            Send Money
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              value={recipientPhone}
              onChange={(e) => setRecipientPhone(e.target.value)}
              placeholder="Recipient Phone"
              required
            />
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Amount"
              required
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                "Send Money"
              )}
            </Button>
          </form>

          {/* Error message */}
          {error && (
            <p className="text-red-600 mt-4 text-center font-medium">
              ❌ Failed to send money
            </p>
          )}
        </CardContent>
      </Card>

      {/* Success Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>✅ Transaction Successful</DialogTitle>
            <DialogDescription>
              Your money has been sent successfully.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <p>
              <strong>Amount:</strong> {transactionData?.amount} BDT
            </p>
            <p>
              <strong>Recipient Phone:</strong> {recipientPhone || "Unknown"}
            </p>
            <p>
              <strong>Current Balance:</strong>{" "}
              {transactionData?.currentBalance} BDT
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} className="rounded-xl">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SendMoney;
