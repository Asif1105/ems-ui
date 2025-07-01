import { NextResponse } from 'next/server';
import { employees } from '@/data/employees';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const employee = employees.find((e) => e.id === id);
  if (!employee) {
    return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
  }
  return NextResponse.json(employee);
}