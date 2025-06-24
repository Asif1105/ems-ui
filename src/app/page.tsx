import EmployeeCard from "../components/EmployeeCard";
import { Employee } from "../types/employee";
import { useEffect, useState } from "react";

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  useEffect(() => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then(setEmployees);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Employee Management System
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
}
