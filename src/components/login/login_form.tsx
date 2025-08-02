import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { useForm } from "@/lib/form"
import { CheckboxInput, EmailInput, PasswordInput } from "../common/input"
import { useLogin } from "@/lib/supabase"
import { useNavigate } from "react-router"

type FormType = {
  email: string;
  password: string;
  remember: boolean;
}

export function LoginForm() {

  const login = useLogin();
  const navigate = useNavigate();

  const { error, submit, loading, getProps } = useForm<FormType>({
    email: "",
    password: "",
    remember: false,
  }, {
    async onSubmit(values) {
      return login(values.email, values.password);
    },
    onSuccess() {
      navigate("/");
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