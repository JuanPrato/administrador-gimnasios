import { auth, getCurrentProfile } from "~/server/auth/server";
import { AccessGraph } from "./_components/dashboard/access_graph";
import { LastPayments } from "./_components/dashboard/last_payments";
import { PlansGraph } from "./_components/dashboard/plans_graph";
import { redirect } from "next/navigation";
import { signOut } from "~/server/auth/client";
import { Stats } from "./_components/dashboard/stats";

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
    <>
      <div className="mx-auto space-y-6">
        {/* Tarjetas de estadísticas */}
        <Stats />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <AccessGraph />
        <PlansGraph />
      </div>
      <LastPayments />
    </>
  );
}
