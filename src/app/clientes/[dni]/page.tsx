interface PageProps {
  params: Promise<{ dni: string }>;
}

export default async function ClientPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <div>Cliente con DNI: {resolvedParams.dni}</div>;
}