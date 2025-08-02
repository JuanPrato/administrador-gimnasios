import { LoginCard } from "@/components/login/login_card"
import { LoginForm } from "@/components/login/login_form"
import { useRedirectIfSession } from "@/lib/supabase";

export default function Login() {

  useRedirectIfSession("/");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <LoginCard>
        <LoginForm />
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            ¿Olvidaste tu contraseña?{" "}
            <button className="text-primary hover:underline font-medium">Recuperar contraseña</button>
          </p>
        </div>
      </LoginCard>
    </div>
  )
}
