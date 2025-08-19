"use client"

import type React from "react"

import { useState } from "react"
import { UserPlus, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { useForm } from "~/lib/form"
import { EmailInput, SelectInput, TextareaInput, TextInput } from "../common/input"
import { api } from "~/trpc/react"
import { capitalize, formatCurrency } from "~/lib/utils"

interface NewClientModalProps {
  trigger?: React.ReactNode
}

type FormType = {
  name: string,
  surname: string,
  email: string,
  phone: string,
  dni: string,
  plan: string,
  observations: string,
};

export function NewClientModal({ trigger }: NewClientModalProps) {
  const [open, setOpen] = useState(false);

  const { data: plans } = api.plan.getPlans.useQuery();
  const { mutate, error } = api.user.createNewUser.useMutation();

  const { loading, getProps, submit } = useForm<FormType>({
    name: "",
    surname: "",
    dni: "",
    email: "",
    observations: "",
    plan: "",
    phone: ""
  }, {
    async onSubmit(values) {
      try {

        mutate({
          dni: values.dni,
          email: values.email,
          name: values.name,
          surname: values.surname,
          observations: values.observations,
          phone: values.phone,
          plan: Number(values.plan)
        });

        toast("Cliente agregado exitosamente", {
          description: `${values.name} ${values.surname} ha sido registrado.`
        });

        setOpen(false)
      } catch (error) {
        console.error(error);
        toast("Error", {
          description: "No se pudo agregar el cliente. Intenta nuevamente.",
        })
      }
    },
  });

  function formatPlanValues() {
    return plans?.map((p) => ({ value: p.id.toString(), text: `${capitalize(p.name)} - ${formatCurrency(p.price)}/mes` })) ?? [];
  }

  const defaultTrigger = (
    <Button className="flex items-center gap-2">
      <UserPlus className="h-4 w-4" />
      Nuevo Cliente
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger ?? defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Agregar Nuevo Cliente
          </DialogTitle>
          <DialogDescription>
            Completa la información del nuevo cliente para registrarlo en el sistema.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <TextInput {...getProps("name")} label="Nombre *" />
            </div>
            <div className="space-y-2">
              <TextInput {...getProps("surname")} label="Apellido *" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <EmailInput {...getProps("email")} label="Email *" />
            </div>
            <div className="space-y-2">
              <TextInput {...getProps("phone")} label="Teléfono" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <TextInput {...getProps("dni")} label="DNI *" />
            </div>
            <div className="space-y-2">
              <SelectInput {...getProps("plan")} label="Plan *" values={formatPlanValues()} />
            </div>
          </div>
          <div className="space-y-2">
            <TextareaInput {...getProps("observations")} label="Observaciones" />
          </div>
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Agregar Cliente
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}