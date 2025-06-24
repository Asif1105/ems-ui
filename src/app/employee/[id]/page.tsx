import { notFound } from 'next/navigation';
import { employees } from '../../data/employees';

interface EmployeeDetailsPageProps {
  params: { id: string };
}

export default function EmployeeDetailsPage({ params }: EmployeeDetailsPageProps) {
  const employee = employees.find((e) => e.id === params.id);
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
      </div>
    </div>
  );
}
