"use client";

import React, { useState, useEffect } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Bell, ChevronDown, CreditCard, FileText, Home, LogOut, PieChart, Settings, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { useToast } from "@/components/ui/use-toast";

export default function AdminLayout({ children }) {
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
    toast({
      title: "Welcome back!",
      description: "You're logged in to the admin dashboard.",
    });
  }, [toast]);

  if (!isMounted) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="border-b p-4">
            <Link href="/admin" className="flex items-center gap-2">
              <Image src="/placeholder.svg" alt="Logo" width={32} height={32} className="rounded" />
              <span className="font-semibold">MicroFinance Admin</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <nav className="grid gap-1 px-2 pt-4">
              <Link href="/admin">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Home size={20} />
                  Dashboard
                </Button>
              </Link>
              <Link href="/admin/loan-applications">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <FileText size={20} />
                  Loan Applications
                </Button>
              </Link>
              <Link href="/admin/borrowers">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Users size={20} />
                  Borrowers
                </Button>
              </Link>
              <Link href="/admin/transactions">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <CreditCard size={20} />
                  Transactions
                </Button>
              </Link>
              <Link href="/admin/analytics">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <PieChart size={20} />
                  Analytics
                </Button>
              </Link>
              <Link href="/admin/settings">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Settings size={20} />
                  Settings
                </Button>
              </Link>
            </nav>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image src="/placeholder.svg" alt="Admin" width={32} height={32} className="rounded-full" />
                <div>
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@example.com</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <LogOut size={20} />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <header className="border-b">
            <div className="flex h-16 items-center gap-4 px-4">
              <SidebarTrigger />
              <div className="ml-auto flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toast({ title: "Notifications", description: "You have no new notifications." })}
                >
                  <Bell size={20} />
                </Button>
                <ThemeToggle />
                <Button variant="ghost" className="gap-2">
                  <Image src="/placeholder.svg" alt="Admin" width={24} height={24} className="rounded-full" />
                  <span className="hidden md:inline">Admin</span>
                  <ChevronDown size={16} />
                </Button>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}