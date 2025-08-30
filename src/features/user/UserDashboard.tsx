import Wallet from "@/features/user/Wallet";
import AddMoney from "@/features/common/AddMoney";
import Withdraw from "@/features/common/WithdrawMoney";
import SendMoney from "@/features/common/SendMoney";
import LatestTransaction from "./Transactions/LatestTransaction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Dashboard = () => {
  return (
    <div className="p-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Wallet Overview */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle>Wallet Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Wallet />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-2">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="add" className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="add">Add Money</TabsTrigger>
              <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
              <TabsTrigger value="send">Send Money</TabsTrigger>
            </TabsList>
            <TabsContent value="add">
              <AddMoney />
            </TabsContent>
            <TabsContent value="withdraw">
              <Withdraw />
            </TabsContent>
            <TabsContent value="send">
              <SendMoney />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <LatestTransaction />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
