import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SchoolSidebar } from "@/components/school-dashboard/SchoolSidebar";

export default async function SchoolDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user || session.user.role !== "SCHOOL") {
    redirect("/");
  }

  return (
    <div className="flex h-screen bg-muted/10">
      <SchoolSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
