/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useCashInByAgentMutation } from "@/redux/features/transactions/transactionApiSlice";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function CashIn() {
  const [recipientPhone, setRecipientPhone] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [transactionResult, setTransactionResult] = useState<any>(null);

  const [cashInByAgent, { isLoading }] = useCashInByAgentMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientPhone || !amount) return;
    setIsConfirmOpen(true); // open confirm dialog
  };

  const handleConfirmYes = async () => {
    setIsConfirmOpen(false);
    try {
      const res = await cashInByAgent({
        recipientPhone,
        amount: Number(amount),
      }).unwrap();
      setTransactionResult(res);
      setIsSuccessOpen(true);
      setRecipientPhone("");
      setAmount("");
    } catch (error: any) {
      setTransactionResult({
        success: false,
        message: error?.data?.message || "Cash-in failed",
      });
      setIsSuccessOpen(true);
    }
  };

  const handleConfirmNo = () => {
    setIsConfirmOpen(false);
  };

  return (
    <>
      <Card className="max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle>Cash-In by Agent</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="recipientPhone">Recipient Phone</Label>
              <Input
                id="recipientPhone"
                placeholder="01512345678"
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="100"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value === "" ? "" : Number(e.target.value))
                }
                required
              />
            </div>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : "Cash-In"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      {/* Confirm Dialog */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Cash-In</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to cash-in {amount} to {recipientPhone}?
          </p>
          <DialogFooter className="space-x-2">
            <Button onClick={handleConfirmNo} variant="outline">
              No
            </Button>
            <Button onClick={handleConfirmYes}>Yes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success/Error Dialog */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {transactionResult?.success ? "Success" : "Failed"}
            </DialogTitle>
          </DialogHeader>
          <p>
            {transactionResult?.success
              ? `Cash-in successful! Current Balance: ${transactionResult.data.currentBalance}`
              : transactionResult?.message}
          </p>
          <DialogFooter>
            <Button onClick={() => setIsSuccessOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
