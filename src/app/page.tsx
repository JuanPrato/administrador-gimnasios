import { auth, getCurrentProfile } from "~/server/auth/server";
import { HydrateClient } from "~/trpc/server";
import { AccessGraph } from "./_components/dashboard/access_graph";
import { LastPayments } from "./_components/dashboard/last_payments";
import { PlansGraph } from "./_components/dashboard/plans_graph";
import { redirect } from "next/navigation";
import { signOut } from "~/server/auth/client";
import { Stats } from "./_components/dashboard/stats";
import { DashboardHeader } from "./_components/dashboard/header";

export default async function Dashboard() {

  const { data: { session } } = await auth();

  if (!session) {
    return redirect("/login");
  }

  const profile = await getCurrentProfile(session);

  if (!profile || profile.role !== "ADMIN") {
    await signOut();
    return redirect("/login");
  }

  return (
    <HydrateClient>
      <div className='min-h-screen bg-gray-50 space-y-6 p-4 md:p-6 lg:p-8'>
        <div className="mx-auto space-y-6">
          {/* Header */}
          <DashboardHeader />
          {/* Tarjetas de estadísticas */}
          <Stats profile={profile} />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <AccessGraph />
          <PlansGraph />
        </div>
        <LastPayments profile={profile} />
      </div>
    </HydrateClient>
  );
}
