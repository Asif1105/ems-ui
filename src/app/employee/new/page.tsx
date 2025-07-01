'use client';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Employee } from '@/types/employee';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useActionState, useOptimistic, startTransition } from 'react';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .integer('Age must be an integer')
    .min(18, 'Minimum age is 18')
    .max(99, 'Maximum age is 99')
    .required('Age is required'),
  sex: yup.string().oneOf(['Male', 'Female', 'Other'], 'Select a valid sex').required('Sex is required'),
  employmentHistory: yup
    .array()
    .of(yup.string().required('Employment history entry is required'))
    .min(1, 'At least one employment history entry is required'),
});

export default function NewEmployeePage() {
  const router = useRouter();

  const [optimisticValues, setOptimistic] = useOptimistic<Omit<Employee, 'id'>>({
    name: '',
    age: 18,
    sex: 'Male',
    employmentHistory: [''],
  });

   async function submitEmployee(_state: Omit<Employee, 'id'>, values: Omit<Employee, 'id'>) {
    const res = await fetch('/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      startTransition(() => setOptimistic(values));
      return values;
    }
    return _state;
  }
  
  const [,formAction, isPending] = useActionState(submitEmployee, optimisticValues);

  const formik = useFormik<Omit<Employee, 'id'>>({
    initialValues: optimisticValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values: Omit<Employee, 'id'>) => {
      await startTransition(() => formAction(values));
      router.push('/');
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue
  } = formik;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <div className="bg-white rounded shadow p-8 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Add New Employee</h1>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
          >
            Back
          </Link>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          {/* Name field */}
          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full border rounded px-3 py-2"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.name && touched.name}
              aria-describedby="name-error"
            />
            {touched.name && errors.name && (
              <div className="text-red-600 text-sm mt-1" id="name-error">
                {errors.name}
              </div>
            )}
          </div>
          {/* Age field */}
          <div className="mb-4">
            <label htmlFor="age" className="block font-semibold mb-1">
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              className="w-full border rounded px-3 py-2"
              value={values.age}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.age && touched.age}
              aria-describedby="age-error"
            />
            {touched.age && errors.age && (
              <div className="text-red-600 text-sm mt-1" id="age-error">
                {errors.age}
              </div>
            )}
          </div>
          {/* Sex field */}
          <div className="mb-4">
            <label htmlFor="sex" className="block font-semibold mb-1">
              Sex
            </label>
            <select
              id="sex"
              name="sex"
              className="w-full border rounded px-3 py-2"
              value={values.sex}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.sex && touched.sex}
              aria-describedby="sex-error"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {touched.sex && errors.sex && (
              <div className="text-red-600 text-sm mt-1" id="sex-error">
                {errors.sex}
              </div>
            )}
          </div>
          {/* Employment History field */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Employment History</label>
            {values.employmentHistory.map((entry, idx) => (
              <div key={idx} className="flex items-center mb-2">
                <input
                  type="text"
                  name={`employmentHistory[${idx}]`}
                  className="w-full border rounded px-3 py-2"
                  value={entry}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!(errors.employmentHistory && touched.employmentHistory && (errors.employmentHistory as any)[idx] && (touched.employmentHistory as any)[idx])}
                  aria-describedby={`employmentHistory-error-${idx}`}
                />
                {values.employmentHistory.length > 1 && (
                  <button
                    type="button"
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => {
                      const newHistory = [...values.employmentHistory];
                      newHistory.splice(idx, 1);
                      setFieldValue('employmentHistory', newHistory);
                    }}
                    aria-label="Remove employment history entry"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
              onClick={() => setFieldValue('employmentHistory', [...values.employmentHistory, ''])}
            >
              Add Entry
            </button>
            {touched.employmentHistory && typeof errors.employmentHistory === 'string' && (
              <div className="text-red-600 text-sm mt-1" id="employmentHistory-error">
                {errors.employmentHistory}
              </div>
            )}
            {touched.employmentHistory && Array.isArray(errors.employmentHistory) &&
              errors.employmentHistory.map((err, idx) =>
                err && (
                  <div key={idx} className="text-red-600 text-sm mt-1" id={`employmentHistory-error-${idx}`}>
                    {err}
                  </div>
                )
              )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={Boolean(isPending)}
          >
            {isPending ? 'Submitting...' : 'Add Employee'}
          </button>
        </form>
      </div>
    </div>
  );
}