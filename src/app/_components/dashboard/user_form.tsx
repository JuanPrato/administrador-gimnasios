import { toast } from "sonner"
import { useForm } from "~/lib/form"
import { EmailInput, SelectInput, TextareaInput, TextInput } from "../common/input"
import { api } from "~/trpc/react"
import { capitalize, formatCurrency } from "~/lib/utils"
import { DialogFooter } from "../ui/dialog"
import { Button } from "../ui/button"
import { Loader2, UserPlus } from "lucide-react"
import { useEffect } from "react"

type FormType = {
  name: string,
  surname: string,
  email: string,
  phone: string,
  dni: string,
  plan: string,
  observations: string,
};

interface Props {
  onResult: (result: boolean) => void
}

const defValues = {
  name: "",
  surname: "",
  dni: "",
  email: "",
  observations: "",
  plan: "",
  phone: ""
};

export function UserForm(props: Props) {

  const { data: plans } = api.plan.getPlans.useQuery();
  const { mutate, status, error } = api.user.createNewUser.useMutation();

  const { loading, getProps, submit, formData } = useForm<FormType>(defValues, {
    async onSubmit(values) {
      mutate({
        dni: values.dni,
        email: values.email,
        name: values.name,
        surname: values.surname,
        observations: values.observations,
        phone: values.phone,
        plan: Number(values.plan)
      });
    },
    errors: (name) => error?.data?.zodError?.fieldErrors[name as string]?.at(0)
  });

  useEffect(() => {
    if (status === 'success') {
      toast("Cliente agregado exitosamente", {
        description: `${formData.name} ${formData.surname} ha sido registrado.`
      });

      props.onResult(true);
    }
    if (status === 'error') {
      console.log(error?.data?.zodError?.fieldErrors)
      toast("Error", {
        description: "No se pudo agregar el cliente. Intenta nuevamente.",
      })
      props.onResult(false);
    }
  }, [status]);

  function formatPlanValues() {
    return plans?.map((p) => ({ value: p.id.toString(), text: `${capitalize(p.name)} - ${formatCurrency(p.price)}/mes` })) ?? [];
  }

  return (
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
          <TextInput {...getProps("phone")} label="Teléfono" required={false} />
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
        <Button type="button" variant="outline" onClick={() => props.onResult(true)} disabled={loading}>
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
  );
}