# Dynamic Form System - Peach-in Hiring Task

This project is a dynamic form system built as part of the hiring process for Peach-in. It generates forms from a JSON schema, validates input, submits data to an API, stores submissions in a database, and displays past submissions in real-time. Below is an overview of the technologies used and where to find the key components.

## Technologies Used
- **Next.js**: Framework for building the app with the App Router (latest version as of February 27, 2025). Chosen for its server-side rendering and API route capabilities.
- **React**: Frontend library for dynamic UI components, paired with hooks (`useState`, `useEffect`) and `react-hook-form` for form management.
- **Material UI**: Styling and UI components (`Card`, `Table`, `TextField`, etc.) for a polished, consistent design.
- **TypeScript**: For type safety and better code maintainability.
- **Yup**: External validation library integrated with `react-hook-form` via `@hookform/resolvers` for schema-based field validation.
- **Axios**: HTTP client for API requests to submit and fetch data.
- **Prisma**: ORM for database interactions, using SQLite for simplicity (configurable to PostgreSQL or DynamoDB).
- **SQLite**: Lightweight database for storing submissions (see `prisma/schema.prisma`).

## Project Structure & Key Components
- **`app/page.tsx`**: Root page rendering the `DynamicForm` component with a light grey background (`#f5f5f5`). The entry point of the app.
- **`components/DynamicForm.tsx`**: Core component generating the form from a JSON schema. Handles submission logic, fetches initial submissions, and updates the state in real-time. Uses a `Grid` layout to display the form on the left and submissions on the right.
- **`components/Submissions.tsx`**: Displays past submissions in a dynamic `Table`, with columns generated from submission data keys. Formats dates (e.g., "February 10, 2025") using a custom `formatValue` function.
- **`data/formSchema.ts`**: JSON schema defining form fields (e.g., `username`, `email`, `birthdate`). Separated for modularity.
- **`app/api/submit/route.ts`**: API route (POST) to store form submissions in the database.
- **`app/api/submissions/route.ts`**: API route (GET) to retrieve stored submissions.
- **`prisma/schema.prisma`**: Prisma schema defining the `Submission` model with `id`, `data` (JSON string), and `createdAt` fields.

## Features Implemented
1. **Dynamic Form Generation**: Fields (text, email, password, date, select) are rendered from `formSchema.ts` using `react-hook-form` and Material UI components.
2. **Field Validation**: Yup enforces required fields, min lengths, and email format, with error messages displayed inline.
3. **API Submission**: Form data is sent to `/api/submit`, stored via Prisma, and reflected instantly in the table without refresh.
4. **Past Submissions**: Displayed in a dynamic table to the right of the form, with readable date formatting and responsive design.
5. **Bonus - Reset**: Form resets after submission, with a manual "Reset" button for flexibility.
6. **Error Handling**: Alerts replace console logs for API errors (fetching or submitting).

## How to Run
1. Clone the repo: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Set up the database: `npx prisma migrate dev --name init`
4. Start the app: `npm run dev`
5. Visit `http://localhost:3000`

## Notes
since I get the Data in a JSON format the assumption is that the format is not saved in the DB. 
since that is the case and I dont know how many coloumns I might have and since the DB is SQL and not NOSQL where i can just put in a JSON, id think you want to keep the data as a string like done above for simplicity with its drabacks.  