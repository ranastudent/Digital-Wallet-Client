/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  useGetAdminUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
} from "@/redux/features/admin/AdminApiSlice";

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

const Users = () => {
  const { data, isLoading, error, refetch } = useGetAdminUsersQuery(undefined);
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();

  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [actionUser, setActionUser] = useState<any | null>(null);

  // 🔹 new state for success/error dialogs
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Failed to load users</p>;

  const users = data?.data || [];

  const handleBlockUnblock = async (user: any) => {
    try {
      if (user.isBlocked) {
        await unblockUser(user._id).unwrap();
        setFeedback({ type: "success", message: `${user.name} unblocked successfully` });
      } else {
        await blockUser(user._id).unwrap();
        setFeedback({ type: "success", message: `${user.name} blocked successfully` });
      }
      refetch();
    } catch (err: any) {
      setFeedback({ type: "error", message: err?.data?.message || "Something went wrong" });
    }
    setActionUser(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Users</h2>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: any) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.isBlocked ? (
                    <span className="text-red-600">Blocked</span>
                  ) : (
                    <span className="text-green-600">Active</span>
                  )}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                    View
                  </Button>
                  <Button
                    variant={user.isBlocked ? "outline" : "destructive"}
                    size="sm"
                    onClick={() => setActionUser(user)}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {users.map((user: any) => (
          <Card key={user._id}>
            <CardContent className="p-4 space-y-2">
              <p>
                <span className="font-semibold">Name:</span> {user.name}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {user.phoneNumber}
              </p>
              <p>
                <span className="font-semibold">Role:</span> {user.role}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {user.isBlocked ? (
                  <span className="text-red-600">Blocked</span>
                ) : (
                  <span className="text-green-600">Active</span>
                )}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                  View
                </Button>
                <Button
                  variant={user.isBlocked ? "outline" : "destructive"}
                  size="sm"
                  onClick={() => setActionUser(user)}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View User Modal */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <Card>
              <CardContent className="space-y-2 p-4">
                <p><span className="font-semibold">Name:</span> {selectedUser.name}</p>
                <p><span className="font-semibold">Phone:</span> {selectedUser.phoneNumber}</p>
                <p><span className="font-semibold">Role:</span> {selectedUser.role}</p>
                <p><span className="font-semibold">Status:</span> {selectedUser.isBlocked ? "Blocked" : "Active"}</p>
                <p><span className="font-semibold">Agent Approved:</span> {selectedUser.isAgentApproved ? "Yes" : "No"}</p>
              </CardContent>
            </Card>
          )}
        </DialogContent>
      </Dialog>

      {/* Block/Unblock Confirm */}
      <AlertDialog open={!!actionUser} onOpenChange={() => setActionUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionUser?.isBlocked
                ? `Unblock ${actionUser?.name}?`
                : `Block ${actionUser?.name}?`}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleBlockUnblock(actionUser)}>
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ✅ Success/Error Dialog */}
      <Dialog open={!!feedback} onOpenChange={() => setFeedback(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {feedback?.type === "success" ? "Success" : "Error"}
            </DialogTitle>
          </DialogHeader>
          <p>{feedback?.message}</p>
          <div className="flex justify-end mt-4">
            <Button onClick={() => setFeedback(null)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
