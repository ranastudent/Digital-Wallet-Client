"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  useGetSystemSettingQuery,
  useUpdateSystemSettingMutation,
} from "@/redux/features/admin/AdminApiSlice";

const SystemFee = () => {
  const { data, isLoading } = useGetSystemSettingQuery("transactionFee");
  const [updateSetting] = useUpdateSystemSettingMutation();

  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [selectedSetting, setSelectedSetting] = useState<{
    key: string;
    value: number;
  } | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<{ key: string; value: number } | null>(null);

  if (isLoading) {
    return <p>Loading settings...</p>;
  }

  const settings = Array.isArray(data?.data) ? data.data : [data?.data];

  const handleInputChange = (key: string, value: number) => {
    setInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleEdit = (setting: { key: string; value: number }) => {
    setSelectedSetting({
      key: setting.key,
      value: inputs[setting.key] ?? setting.value,
    });
    setShowConfirm(true);
  };

  const handleConfirmUpdate = async () => {
    if (!selectedSetting) return;
    try {
      const updated = await updateSetting({
        key: selectedSetting.key,
        value: selectedSetting.value,
      }).unwrap();

      setLastUpdated(updated.data);
      setShowConfirm(false);
      setShowSuccess(true);

      // Clear local input for this setting (to sync fresh API value)
      setInputs((prev) => {
        const copy = { ...prev };
        delete copy[selectedSetting.key];
        return copy;
      });

      setSelectedSetting(null);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {settings.map((setting) => (
        <Card key={setting.key} className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="capitalize">{setting.key}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              Current Value: <span className="font-bold">{setting.value}</span>
            </p>
          </CardContent>
          <CardFooter className="flex space-x-2">
            <Input
              type="number"
              value={inputs[setting.key] ?? setting.value}
              onChange={(e) =>
                handleInputChange(setting.key, Number(e.target.value))
              }
              placeholder="Enter new value"
            />
            <Button onClick={() => handleEdit(setting)}>Update</Button>
          </CardFooter>
        </Card>
      ))}

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Update</AlertDialogTitle>
          </AlertDialogHeader>
          <p>
            Are you sure you want to update{" "}
            <b>{selectedSetting?.key}</b> to <b>{selectedSetting?.value}</b>?
          </p>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmUpdate}>Yes, Update</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success Dialog */}
      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Successful</AlertDialogTitle>
          </AlertDialogHeader>
          <p>
            The setting <b>{lastUpdated?.key}</b> has been updated to{" "}
            <b>{lastUpdated?.value}</b>.
          </p>
          <AlertDialogFooter>
            <Button onClick={() => setShowSuccess(false)}>Close</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SystemFee;
