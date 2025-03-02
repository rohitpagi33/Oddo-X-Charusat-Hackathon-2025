import React, { useEffect, useState } from "react";
import { Card, CardBody } from "react-bootstrap";
import { createClient } from "@supabase/supabase-js";

import { supabase } from "../../supabaseClient";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchNotifications() {
      const { data, error } = await supabase.from("notifications").select("*").order("timestamp", { ascending: false });

      if (error) {
        console.error("Error fetching notifications:", error);
      } else {
        setNotifications(data);
      }
    }

    fetchNotifications();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Notifications</h1>
      <div className="row">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} className="col-md-6 mb-3">
              <Card className={notification.status === "unread" ? "border-primary" : ""}>
                <CardBody>
                  <p className="mb-1">{notification.message}</p>
                  <small className="text-muted">
                    {new Date(notification.timestamp).toLocaleString()}
                  </small>
                </CardBody>
              </Card>
            </div>
          ))
        ) : (
          <p>No notifications available.</p>
        )}
      </div>
    </div>
  );
}
