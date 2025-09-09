import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { api } from "~/trpc/server";
import type { ClientsFilterType } from "~/app/clientes/page";

export async function Filters({ params }: { params: ClientsFilterType }) {

  const plans = await api.plan.getPlans();
  console.log(params);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtros y Búsqueda</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por DNI, nombre, email o teléfono..."
              className="pl-8"
              name="search"
              defaultValue={params.search}
            />
          </div>

          <Select name="status" defaultValue={params.status}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos" defaultChecked>Todos los estados</SelectItem>
              <SelectItem value="activo">Activo</SelectItem>
              <SelectItem value="inactivo">Inactivo</SelectItem>
            </SelectContent>
          </Select>

          <Select name="plan" defaultValue={params.plan}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los planes</SelectItem>
              {
                plans?.map(plan => (
                  <SelectItem key={plan.id} value={plan.id.toString()}>{plan.name}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>

          {/* {(searchTerm || statusFilter !== "todos" || planFilter !== "todos") && ( */}
          <Button variant="outline" className="bg-transparent">
            Buscar
          </Button>
          {/* )} */}
        </form>

        <div className="mt-4 text-sm text-muted-foreground">
          Mostrando 18 de 24 clientes
        </div>
      </CardContent>
    </Card>
  );
}