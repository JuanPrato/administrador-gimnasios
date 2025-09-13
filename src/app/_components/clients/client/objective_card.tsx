import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

interface Props {
  objective?: string;
}

export function Objective({ objective }: Props) {

  return (objective && (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Objetivo</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{objective}</p>
      </CardContent>
    </Card>
  ));

}