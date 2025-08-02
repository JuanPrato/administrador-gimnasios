import { Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

interface ValueCardProps {
  title: string;
  value: number | string;
  description?: string;
}

export function ValueCard(props: ValueCardProps) {

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{props.title}</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{props.value}</div>
        {props.description && <p className="text-xs text-muted-foreground">{props.description}</p>}
      </CardContent>
    </Card>
  );

}