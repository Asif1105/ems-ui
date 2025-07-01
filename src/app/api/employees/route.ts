import { NextResponse } from 'next/server';
import { employees } from '@/data/employees';

export async function GET() {
  return NextResponse.json(employees);
}

export async function POST(request: Request) {
  const newEmployee = await request.json();
  // In a real app, you would persist this to a database.
  // For demo, just push to the in-memory array (not persisted across reloads)
  employees.push({ ...newEmployee, id: (employees.length + 1).toString() });
  return NextResponse.json({ success: true });
}