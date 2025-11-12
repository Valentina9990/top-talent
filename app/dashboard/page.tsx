import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  
  // Redirect SCHOOL users to their dashboard
  if (session?.user?.role === "SCHOOL") {
    redirect("/dashboard-escuela");
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}