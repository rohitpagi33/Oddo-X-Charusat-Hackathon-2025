"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

export default function Borrowers() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredBorrowers = borrowers.filter(
    (borrower) =>
      borrower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrower.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (action, id) => {
    toast({
      title: `${action} Viewed`,
      description: `${action} for borrower ${id} has been viewed.`,
    });
  };

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Borrowers</CardTitle>
          <CardDescription>View and manage all registered borrowers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">
                Search borrowers
              </Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search borrowers..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Active Loans</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>CIBIL Score</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBorrowers.map((borrower) => (
                  <TableRow key={borrower.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={borrower.avatar} alt={borrower.name} />
                          <AvatarFallback>{borrower.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{borrower.name}</div>
                          <div className="text-sm text-muted-foreground">ID: {borrower.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{borrower.email}</div>
                        <div className="text-muted-foreground">{borrower.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>{borrower.activeLoans}</TableCell>
                    <TableCell>₹{borrower.totalAmount}</TableCell>
                    <TableCell>{borrower.cibilScore}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleAction("Profile", borrower.id)}>
                          View Profile
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleAction("Loan History", borrower.id)}>
                          Loan History
                        </Button>
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

const borrowers = [
  {
    id: "BRW001",
    name: "Rahul Kumar",
    avatar: "/placeholder.svg",
    email: "rahul.kumar@example.com",
    phone: "+91 98765 43210",
    activeLoans: 1,
    totalAmount: "50,000",
    cibilScore: 750,
  },
  {
    id: "BRW002",
    name: "Priya Singh",
    avatar: "/placeholder.svg",
    email: "priya.singh@example.com",
    phone: "+91 98765 43211",
    activeLoans: 2,
    totalAmount: "2,50,000",
    cibilScore: 820,
  },
  {
    id: "BRW003",
    name: "Amit Patel",
    avatar: "/placeholder.svg",
    email: "amit.patel@example.com",
    phone: "+91 98765 43212",
    activeLoans: 1,
    totalAmount: "1,50,000",
    cibilScore: 680,
  },
  {
    id: "BRW004",
    name: "Sneha Gupta",
    avatar: "/placeholder.svg",
    email: "sneha.gupta@example.com",
    phone: "+91 98765 43213",
    activeLoans: 1,
    totalAmount: "75,000",
    cibilScore: 710,
  },
  {
    id: "BRW005",
    name: "Rajesh Sharma",
    avatar: "/placeholder.svg",
    email: "rajesh.sharma@example.com",
    phone: "+91 98765 43214",
    activeLoans: 2,
    totalAmount: "3,00,000",
    cibilScore: 790,
  },
];