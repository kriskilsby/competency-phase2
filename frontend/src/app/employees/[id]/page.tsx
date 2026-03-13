export default function EmployeeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">
        Employee ID: coming soon... {params.id}
      </h1>
    </div>
  );
}