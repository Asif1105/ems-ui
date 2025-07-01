# Employee Management System (EMS)

A modern, accessible, and responsive Employee Management System built with Next.js 15 (App Router), React 19, and Tailwind CSS.

## Features

- Employee CRUD: Create, read, update, and delete employee records
- Modern Stack: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- Accessible UI: All components are accessible and responsive
- Clean Architecture: Organized folder structure for scalability and maintainability

## Project Structure

```
├── src/
│   ├── app/                # Next.js App Router pages and API routes
│   ├── components/         # Reusable React components
│   ├── data/               # Static data (e.g., employees)
│   └── types/              # TypeScript types
├── public/                 # Static assets
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Installation

1. Clone the repository:

   ```powershell
   git clone <repo-url>
   cd ems-ui
   ```

2. Install dependencies:

   ```powershell
   npm install
   ```

### Development

Start the development server:

```powershell
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```powershell
npm run build
npm start
```

## Technologies Used

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Accessibility & Responsiveness

All UI components are designed to be accessible (WCAG compliant) and responsive for all device sizes.

## Customization

- Add more employees in `src/data/employees.ts`
- Extend employee fields in `src/types/employee.ts`

## License

MIT
