import { NextResponse } from 'next/server';
import { Employee } from '../../types/employee';

const employees: Employee[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    age: 29,
    sex: 'Female',
    employmentHistory: ['Developer at X', 'Lead at Y'],
  },
  {
    id: '2',
    name: 'Bob Smith',
    age: 35,
    sex: 'Male',
    employmentHistory: ['Engineer at Z', 'Manager at Q'],
  },
  // Add more mock employees as needed
];

export async function GET() {
  return NextResponse.json(employees);
}
