/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useGetAdminUsersQuery, useGetAdminAgentsQuery, useGetAdminTransactionsQuery } from "@/redux/features/admin/AdminApiSlice";

export default function DashBoard() {
  const { data: usersData } = useGetAdminUsersQuery(undefined);
  const { data: agentsData } = useGetAdminAgentsQuery(undefined);
  const { data: transactionsData } = useGetAdminTransactionsQuery(undefined);

  const totalUsers = usersData?.data?.length || 0;
  const totalAgents = agentsData?.data?.length || 0;
  const totalTransactions = transactionsData?.data?.length || 0;
  const totalVolume =
    transactionsData?.data?.reduce(
      (sum: number, txn: any) => sum + (txn?.amount || 0),
      0
    ) || 0;

  const overview = [
    { title: "Total Users", value: totalUsers },
    { title: "Total Agents", value: totalAgents },
    { title: "Total Transactions", value: totalTransactions },
    { title: "Total Volume", value: `${totalVolume} BDT` },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overview.map((item, idx) => (
          <Card key={idx} className="shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
