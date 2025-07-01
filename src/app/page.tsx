'use client';
import React, { useEffect, useState, useTransition } from "react";
import EmployeeCard from "@/components/EmployeeCard";
import { Employee } from "@/types/employee";
import Link from "next/link";

async function fetchEmployees(): Promise<Employee[]> {
  const res = await fetch("/api/employees", { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default function Home(): React.JSX.Element {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      fetchEmployees().then(setEmployees);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-center flex-1">
          Employee Management System
        </h1>
        <Link
          href="/employee/new"
          className="w-full sm:w-auto ml-0 sm:ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition text-center"
        >
          Add Employee
        </Link>
      </div>
      {isPending ? (
        <div className="text-center mt-4 text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
      )}
    </div>
  );
}
