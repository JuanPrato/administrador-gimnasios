"use client";

import { ArrowLeft, Edit } from "lucide-react";
import { Button } from "../../ui/button";
import type { InferSelectModel } from "drizzle-orm";
import type { profiles } from "~/server/db/schema";
import { useRouter } from "next/navigation";

interface HeaderProps {
  client: InferSelectModel<typeof profiles>;
}

export function Header({ client }: HeaderProps) {

  const navigate = useRouter();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {client.name} {client.surname}
          </h1>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="bg-transparent">
          <Edit className="h-4 w-4 mr-2" />
          Editar Cliente
        </Button>
        <Button>Renovar Plan</Button>
      </div>
    </div>
  )
}