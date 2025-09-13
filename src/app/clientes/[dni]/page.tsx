import { redirect } from "next/navigation";
import { Header } from "~/app/_components/clients/client/header";
import { MovementsTable } from "~/app/_components/clients/client/movements_table";
import { Objective } from "~/app/_components/clients/client/objective_card";
import { UserCards } from "~/app/_components/clients/client/user_cards";
import { UserDataCard } from "~/app/_components/clients/client/user_data_card";
import { api } from "~/trpc/server";

interface PageProps {
  params: Promise<{ dni: string }>;
}

export default async function ClientPage({ params }: PageProps) {
  const resolvedParams = await params;

  const clientData = await api.user.getUserByDni({ dni: resolvedParams.dni });

  if (!clientData?.profiles) {
    redirect("/clientes");
  }

  const movements = await api.user.getUserMovements({ profileId: Number(clientData.profiles.id) });

  return (
    <div className="flex flex-col gap-6">
      <Header client={clientData.profiles} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <UserDataCard clientData={clientData} movements={movements} />
        </div>

        <div className="lg:col-span-2">
          <div className="lg:col-span-2 space-y-6">
            <UserCards movements={movements} />
            <Objective objective={clientData.profiles.objective ?? undefined} />
            <MovementsTable movements={movements} />
          </div>
        </div>
      </div>
    </div>
  );
}