"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  useGetAdminAgentsQuery,
  useApproveAgentMutation,
  useSuspendAgentMutation,
  type UserOrAgent,
} from "@/redux/features/admin/AdminApiSlice";

const Agent = () => {
  const { data, isLoading, error } = useGetAdminAgentsQuery(undefined);
  const [approveAgent] = useApproveAgentMutation();
  const [suspendAgent] = useSuspendAgentMutation();

  const [selectedAgent, setSelectedAgent] = useState<UserOrAgent | null>(null);
  const [actionType, setActionType] = useState<"approve" | "suspend" | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (isLoading) return <p>Loading agents...</p>;
  if (error) return <p>Failed to load agents.</p>;

  const agents: UserOrAgent[] = data?.data || [];

  const handleActionClick = (agent: UserOrAgent) => {
    setSelectedAgent(agent);
    setActionType(agent.isAgentApproved ? "suspend" : "approve");
    setIsDialogOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedAgent || !actionType) return;

    try {
      if (actionType === "approve") {
        await approveAgent(selectedAgent._id).unwrap();
      } else {
        await suspendAgent(selectedAgent._id).unwrap();
      }
    } catch (err) {
      console.error("Action failed:", err);
    } finally {
      setIsDialogOpen(false);
      setSelectedAgent(null);
      setActionType(null);
    }
  };

  return (
    <div>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-md border bg-background">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="py-2 text-left">Name</th>
              <th className="py-2 text-left">Phone Number</th>
              <th className="py-2 text-left">Role</th>
              <th className="py-2 text-left">Status</th>
              <th className="py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent._id} className="border-t">
                <td className="py-2">{agent.name}</td>
                <td className="py-2">{agent.phoneNumber}</td>
                <td className="py-2">{agent.role}</td>
                <td className="py-2">{agent.isAgentApproved ? "Approved" : "Pending"}</td>
                <td className="py-2">
                  <Button
                    size="sm"
                    variant={agent.isAgentApproved ? "destructive" : "default"}
                    onClick={() => handleActionClick(agent)}
                  >
                    {agent.isAgentApproved ? "Suspend" : "Approve"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {agents.map((agent) => (
          <div key={agent._id} className="p-4 border rounded-md shadow-sm bg-background">
            <p>
              <span className="font-medium">Name:</span> {agent.name}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {agent.phoneNumber}
            </p>
            <p>
              <span className="font-medium">Role:</span> {agent.role}
            </p>
            <p>
              <span className="font-medium">Status:</span> {agent.isAgentApproved ? "Approved" : "Pending"}
            </p>
            <Button
              size="sm"
              variant={agent.isAgentApproved ? "destructive" : "default"}
              className="mt-2 w-full"
              onClick={() => handleActionClick(agent)}
            >
              {agent.isAgentApproved ? "Suspend" : "Approve"}
            </Button>
          </div>
        ))}
      </div>

      {agents.length === 0 && <p className="text-center py-4 text-muted-foreground">No agents found</p>}

      {/* Confirmation Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === "approve" ? "Approve Agent" : "Suspend Agent"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {actionType} {selectedAgent?.name}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmAction}>
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Agent;
