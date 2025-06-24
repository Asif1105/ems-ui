// Employee type definition
export interface Employee {
  id: string;
  name: string;
  age: number;
  sex: 'Male' | 'Female' | 'Other';
  employmentHistory: string[];
}
