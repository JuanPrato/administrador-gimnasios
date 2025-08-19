import type { PropsWithChildren } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Dumbbell } from "lucide-react";

export function LoginCard(props: PropsWithChildren) {

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-4 text-center">
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Dumbbell className="h-6 w-6" />
          </div>
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold">TU GIMNASIO</CardTitle>
          <CardDescription>Ingresa a tu cuenta para continuar</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {props.children}
      </CardContent>
    </Card>
  );

}