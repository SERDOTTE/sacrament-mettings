interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMeetingPage({ params }: EditMeetingPageProps) {
  const { id } = await params;

  return (
    <main>
      <h1 className="text-3xl font-bold text-stone-900">Editar reunião {id} - Disponível na semana 04</h1>
    </main>
  );
}