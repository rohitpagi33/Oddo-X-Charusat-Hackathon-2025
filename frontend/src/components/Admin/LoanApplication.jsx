"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function LoanApplications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  const filteredApplications = applications.filter(
    (app) =>
      (app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || app.status.toLowerCase() === statusFilter.toLowerCase())
  );

  const handleAction = (action, id) => {
    toast({
      title: `Application ${action}`,
      description: `Application ${id} has been ${action.toLowerCase()}.`,
    });
  };

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Loan Applications</CardTitle>
          <CardDescription>Manage and review all loan applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center mb-4">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">
                Search applications
              </Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search applications..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Applications</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Applicant Name</TableHead>
                  <TableHead>Loan Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>CIBIL Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">{application.id}</TableCell>
                    <TableCell>{application.name}</TableCell>
                    <TableCell>{application.loanType}</TableCell>
                    <TableCell>₹{application.amount}</TableCell>
                    <TableCell>{application.cibilScore}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          application.status === "Pending"
                            ? "secondary"
                            : application.status === "Approved"
                            ? "success"
                            : "destructive"
                        }
                      >
                        {application.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleAction("Viewed", application.id)}>
                          View
                        </Button>
                        {application.status === "Pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => handleAction("Approved", application.id)}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleAction("Rejected", application.id)}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const applications = [
  {
    id: "APP001",
    name: "Rahul Kumar",
    loanType: "Personal Loan",
    amount: "50,000",
    cibilScore: 750,
    status: "Pending",
  },
  {
    id: "APP002",
    name: "Priya Singh",
    loanType: "Business Loan",
    amount: "2,00,000",
    cibilScore: 820,
    status: "Approved",
  },
  {
    id: "APP003",
    name: "Amit Patel",
    loanType: "Education Loan",
    amount: "1,50,000",
    cibilScore: 680,
    status: "Rejected",
  },
  {
    id: "APP004",
    name: "Sneha Gupta",
    loanType: "Personal Loan",
    amount: "75,000",
    cibilScore: 710,
    status: "Pending",
  },
  {
    id: "APP005",
    name: "Rajesh Sharma",
    loanType: "Business Loan",
    amount: "3,00,000",
    cibilScore: 790,
    status: "Approved",
  },
];