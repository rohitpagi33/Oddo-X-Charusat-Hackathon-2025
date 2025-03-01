"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoanAnalytics } from "@/components/Admin/loan-analytics";
import { UserAnalytics } from "@/components/Admin/user-analytics";
import { PaymentAnalytics } from "@/components/Admin/payment-analytics";
import { RiskAnalytics } from "@/components/Admin/risk-analytics";
import { useToast } from "@/components/ui/use-toast";

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("loans");
  const { toast } = useToast();

  const handleTabChange = (value) => {
    setActiveTab(value);
    toast({
      title: "Analytics Tab Changed",
      description: `You are now viewing ${value} analytics.`,
    });
  };

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Analytics & Reports</CardTitle>
          <CardDescription>Comprehensive analytics and insights about loans, users, and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="loans" value={activeTab} onValueChange={handleTabChange} className="space-y-4">
            <TabsList className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <TabsTrigger value="loans">Loan Analytics</TabsTrigger>
              <TabsTrigger value="users">User Analytics</TabsTrigger>
              <TabsTrigger value="payments">Payment Analytics</TabsTrigger>
              <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            </TabsList>
            <TabsContent value="loans" className="space-y-4">
              <LoanAnalytics />
            </TabsContent>
            <TabsContent value="users" className="space-y-4">
              <UserAnalytics />
            </TabsContent>
            <TabsContent value="payments" className="space-y-4">
              <PaymentAnalytics />
            </TabsContent>
            <TabsContent value="risk" className="space-y-4">
              <RiskAnalytics />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}