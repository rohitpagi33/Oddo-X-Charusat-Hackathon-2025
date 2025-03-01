import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentApplications() {
  return (
    <div className="space-y-8">
      {recentApplications.map((application) => (
        <div key={application.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={application.avatar} alt="Avatar" />
            <AvatarFallback>{application.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{application.name}</p>
            <p className="text-sm text-muted-foreground">
              {application.loanType} - ₹{application.amount}
            </p>
          </div>
          <div className="ml-auto">
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
          </div>
        </div>
      ))}
    </div>
  )
}

const recentApplications = [
  {
    id: "1",
    name: "Rahul Kumar",
    avatar: "/placeholder.svg",
    loanType: "Personal Loan",
    amount: "50,000",
    status: "Pending",
  },
  {
    id: "2",
    name: "Priya Singh",
    avatar: "/placeholder.svg",
    loanType: "Business Loan",
    amount: "2,00,000",
    status: "Approved",
  },
  {
    id: "3",
    name: "Amit Patel",
    avatar: "/placeholder.svg",
    loanType: "Education Loan",
    amount: "1,50,000",
    status: "Rejected",
  },
  {
    id: "4",
    name: "Sneha Gupta",
    avatar: "/placeholder.svg",
    loanType: "Personal Loan",
    amount: "75,000",
    status: "Pending",
  },
  {
    id: "5",
    name: "Rajesh Sharma",
    avatar: "/placeholder.svg",
    loanType: "Business Loan",
    amount: "3,00,000",
    status: "Approved",
  },
]

