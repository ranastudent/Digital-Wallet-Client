"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "@/redux/store";
import { useGetSingleUserQuery, useUpdateUserMutation } from "@/redux/features/user/UserApiSlice";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Profile() {
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const { data, isLoading, isError, refetch } = useGetSingleUserQuery(userId!, { skip: !userId });
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  // Feedback dialog state
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackSuccess, setFeedbackSuccess] = useState(true);

  // Validation states
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  // Fix: Provide fallback empty string to avoid TS error
  useEffect(() => {
    if (data?.data) {
      setName(data.data.name || "");
      setPhoneNumber(data.data.phoneNumber || "");
    }
  }, [data]);

  // Validate phone number (digits only)
  useEffect(() => {
    setIsPhoneValid(/^\d+$/.test(phoneNumber));
  }, [phoneNumber]);

  // Validate password (if entered, must be ≥ 6)
  useEffect(() => {
    if (password.length === 0) {
      setIsPasswordValid(true); // empty password is allowed
    } else {
      setIsPasswordValid(password.length >= 6);
    }
  }, [password]);

  if (!userId) return <p>Please login to see your profile.</p>;
  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error fetching user data.</p>;

  const handleUpdate = async () => {
    if (!name || !phoneNumber) {
      setFeedbackMessage("Name and Phone Number are required");
      setFeedbackSuccess(false);
      setFeedbackOpen(true);
      return;
    }

    if (!isPhoneValid || !isPasswordValid) {
      setFeedbackMessage("Please fix validation errors before saving");
      setFeedbackSuccess(false);
      setFeedbackOpen(true);
      return;
    }

    try {
      const res = await updateUser({ id: userId, userData: { name, phoneNumber, password } }).unwrap();
      setFeedbackMessage(res.message);
      setFeedbackSuccess(true);
      setFeedbackOpen(true);
      setPassword(""); // clear password field
      refetch();
    } catch (err) {
      console.error(err);
      setFeedbackMessage("Failed to update user");
      setFeedbackSuccess(false);
      setFeedbackOpen(true);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Agent Approved</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>{data.data._id}</TableCell>
            <TableCell>{data.data.name}</TableCell>
            <TableCell>{data.data.phoneNumber}</TableCell>
            <TableCell>{data.data.role}</TableCell>
            <TableCell>{data.data.isAgentApproved ? "Yes" : "No"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* ------------------- Edit Profile Dialog ------------------- */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-4">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={!isPhoneValid ? "border-red-500" : ""}
              />
              {!isPhoneValid && <p className="text-red-500 text-sm">Phone number must contain only digits</p>}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Leave empty to keep current password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={!isPasswordValid ? "border-red-500" : ""}
              />
              {!isPasswordValid && <p className="text-red-500 text-sm">Password must be at least 6 characters</p>}
            </div>
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleUpdate} disabled={isUpdating || !isPhoneValid || !isPasswordValid}>
              {isUpdating ? "Updating..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ------------------- Feedback Dialog ------------------- */}
      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{feedbackSuccess ? "Success" : "Error"}</DialogTitle>
          </DialogHeader>
          <div className="py-4">{feedbackMessage}</div>
          <DialogFooter>
            <DialogClose asChild>
              <Button>OK</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
