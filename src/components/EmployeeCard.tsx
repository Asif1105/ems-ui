// Reusable EmployeeCard component
import Link from 'next/link';
import { Employee } from '../types/employee';

interface EmployeeCardProps {
  employee: Employee;
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col items-center">
      <div className="font-bold text-lg mb-2">{employee.name}</div>
      <div className="text-gray-600">Age: {employee.age}</div>
      <div className="text-gray-600 mb-4">Sex: {employee.sex}</div>
      <Link href={`/employee/${employee.id}`} className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Details
      </Link>
    </div>
  );
}
