"use client";

import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { useForm } from "~/lib/form"
import { useRouter } from "next/navigation"
import { EmailInput, PasswordInput, CheckboxInput } from "../common/input";
import { login } from "~/server/auth/client";

type FormType = {
  email: string;
  password: string;
  remember: boolean;
}

export function LoginForm() {

  const navigate = useRouter();

  const { error, submit, loading, getProps } = useForm<FormType>({
    email: "",
    password: "",
    remember: false,
  }, {
    async onSubmit(values) {
      return login(values.email, values.password);
    },
    onSuccess() {
      navigate.push("/");
    },
  });

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">Credenciales incorrectas. Intenta nuevamente.</div>
      )}

      <div className="space-y-2">
        <EmailInput label="Email" placeholder="admin@admin.com" {...getProps("email")} />
      </div>

      <div className="space-y-2">
        <PasswordInput label="Contraseña" {...getProps("password")} />
      </div>

      <div className="flex items-center space-x-2">
        <CheckboxInput label="Recordar sesión" {...getProps("remember")} />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Iniciando sesión...
          </>
        ) : (
          "Iniciar Sesión"
        )}
      </Button>
    </form>
  );

}