// frontend/src/app/employees/[id]/page.tsx
export default async function EmployeeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">
        Employee ID: coming soon... {id}
      </h1>
    </div>
  );
}