import React from "react";
import { Card, CardBody } from "react-bootstrap";

const notifications = [
  { id: 1, message: "Your EMI payment of ₹12,500 is due tomorrow.", status: "unread", timestamp: "Just now" },
  { id: 2, message: "Loan approved! Check your dashboard for details.", status: "read", timestamp: "1 hour ago" },
  { id: 3, message: "CIBIL score updated: 750.", status: "read", timestamp: "Yesterday" },
  { id: 4, message: "New offer: Get lower interest rates on personal loans!", status: "unread", timestamp: "2 days ago" },
];

export default function NotificationsPage() {
  return (
    <div className="container-md p-5 text-white" style={{ backgroundColor: "#121212", minHeight: "100vh" }}>
      <h1 className="mb-4">Notifications</h1>
      <div className="row">
        {notifications.map((notification) => (
          <div key={notification.id} className="col-md-6 mb-3">
            <Card className={`bg-dark text-white ${notification.status === "unread" ? "border-primary" : "border-secondary"}`}>
              <CardBody>
                <p className="mb-1">{notification.message}</p>
                <small className="text-muted">{notification.timestamp}</small>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
