"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [transactionType, setTransactionType] = useState("all");
  const { toast } = useToast();

  const filteredTransactions = transactions.filter(
    (transaction) =>
      (transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.borrower.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (transactionType === "all" || transaction.type.toLowerCase() === transactionType.toLowerCase())
  );

  const handleExport = () => {
    toast({
      title: "Export Initiated",
      description: "Your transaction export has started. You'll be notified when it's ready.",
    });
  };

  const handleViewDetails = (id) => {
    toast({
      title: "Transaction Details",
      description: `Viewing details for transaction ${id}.`,
    });
  };

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>View and manage all loan disbursements and EMI payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
            <div className="flex flex-1 gap-4 md:max-w-[600px]">
              <div className="flex-1">
                <Label htmlFor="search" className="sr-only">
                  Search transactions
                </Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search transactions..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select value={transactionType} onValueChange={setTransactionType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Transaction type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="disbursement">Disbursements</SelectItem>
                  <SelectItem value="emi payment">EMI Payments</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="gap-2" onClick={handleExport}>
              <Download size={16} />
              Export
            </Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.borrower}</TableCell>
                    <TableCell>
                      <Badge variant={transaction.type === "Disbursement" ? "default" : "secondary"}>
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell>₹{transaction.amount}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.status === "Success"
                            ? "success"
                            : transaction.status === "Pending"
                            ? "warning"
                            : "destructive"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => handleViewDetails(transaction.id)}>
                        View Details
                      </Button>
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

const transactions = [
  {
    id: "TXN001",
    date: "2024-02-15",
    borrower: "Rahul Kumar",
    type: "Disbursement",
    amount: "50,000",
    status: "Success",
  },
  {
    id: "TXN002",
    date: "2024-02-15",
    borrower: "Priya Singh",
    type: "EMI Payment",
    amount: "5,000",
    status: "Success",
  },
  {
    id: "TXN003",
    date: "2024-02-14",
    borrower: "Amit Patel",
    type: "EMI Payment",
    amount: "7,500",
    status: "Pending",
  },
  {
    id: "TXN004",
    date: "2024-02-14",
    borrower: "Sneha Gupta",
    type: "Disbursement",
    amount: "75,000",
    status: "Success",
  },
  {
    id: "TXN005",
    date: "2024-02-13",
    borrower: "Rajesh Sharma",
    type: "EMI Payment",
    amount: "10,000",
    status: "Failed",
  },
];