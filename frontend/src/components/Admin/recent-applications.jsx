"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://your-supabase-url.supabase.co";
const supabaseKey = "your-supabase-key";
const supabase = createClient(supabaseUrl, supabaseKey);

export function RecentApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("recent_applications")
        .select("*");

      if (error) {
        console.error("Error fetching recent applications data:", error);
      } else {
        setApplications(data);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      {applications.map((application) => (
        <div key={application.id} className="flex items-center">
          <div className="avatar h-9 w-9">
            <img src={application.avatar} alt="Avatar" className="avatar-image" />
            <div className="avatar-fallback">{application.name.charAt(0)}</div>
          </div>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{application.name}</p>
            <p className="text-sm text-muted-foreground">
              {application.loan_type} - ₹{application.amount}
            </p>
          </div>
          <div className="ml-auto">
            <span
              className={`badge ${
                application.status === "Pending"
                  ? "badge-secondary"
                  : application.status === "Approved"
                  ? "badge-success"
                  : "badge-destructive"
              }`}
            >
              {application.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}