import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Employee } from "@/types/employee";

interface EmployeeDetailsPageProps {
  params: { id: string };
}

async function getEmployee(id: string): Promise<Employee | null> {
  // Use absolute URL for SSR
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/employees/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function EmployeeDetailsPage({ params }: EmployeeDetailsPageProps) {
  const employee = await getEmployee(params.id);
  if (!employee) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <div className="bg-white rounded shadow p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">{employee.name}</h1>
        <div className="mb-2"><span className="font-semibold">ID:</span> {employee.id}</div>
        <div className="mb-2"><span className="font-semibold">Age:</span> {employee.age}</div>
        <div className="mb-2"><span className="font-semibold">Sex:</span> {employee.sex}</div>
        <div className="mb-2">
          <span className="font-semibold">Employment History:</span>
          <ul className="list-disc ml-6 mt-1">
            {employee.employmentHistory.map((job, idx) => (
              <li key={idx}>{job}</li>
            ))}
          </ul>
        </div>
        <Link
          href="/"
          className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
          aria-label="Back to Home"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
