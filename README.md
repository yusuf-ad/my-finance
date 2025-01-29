# My Finance App 📝

Personal Finance App is a modern full-stack web application developed as part of a challenge on [Frontend Mentor](https://www.frontendmentor.io/challenges/personal-finance-app-JfjtZgyMt1). The app provides an intuitive platform for users to manage their budgets by categorizing expenses as negative and incomes as positive values, ensuring a clear and efficient financial overview. Through this project, I learned how to effectively use Next.js Server Actions, implement caching, and manage loading states in Next.js.

## Key Features 🗝️

- **Expense and Income Management**: Record expenses as negative values and
  incomes as positive values for easy budget tracking.
- **User-Friendly Interface**: Designed to provide a seamless user experience
  with an intuitive and responsive UI.
- **Secure and Scalable**: Built with performance and security in mind, ensuring
  user data is safe.
- **Responsive Design**: Optimized for all devices, ensuring a seamless experience
  on desktops, tablets, and mobile devices.
- **Pagination**: Easily navigate through your transactions and budgets with intuitive
  pagination controls, making data management efficient and organized.
- **Loading States**: Enhance user experience with loading indicators and skeleton
  screens during data fetching, ensuring smooth and uninterrupted interactions.
- **Caching Mechanism**: Improve performance and reduce load times with effective
  caching strategies, providing faster access to your financial data.

## Live Demo

Check out the live demo of the project [here](https://my-finance-chi.vercel.app/).

## Technologies Used 🛠️

- **[Next.js](https://nextjs.org/)**: A React framework for production.
- **[TypeScript](https://www.typescriptlang.org/)**: A strongly typed programming language for JavaScript.
- **[Drizzle](https://orm.drizzle.team/)**: An ORM for TypeScript and JavaScript.
- **[Better Auth](https://www.better-auth.com/)**: A robust authentication solution for secure user management.
- **[shadcn/ui](https://ui.shadcn.com/)**: A collection of reusable UI components for building modern web applications.
- **[zod](https://zod.dev/)**: A TypeScript-first schema declaration and validation library.
- **[react-hook-form](https://react-hook-form.com/)**: A performant, flexible, and extensible form library for React.
- **[Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)**: Server-side functions for handling CRUD operations.
- **[Neon Database](https://neon.tech/)**: A serverless, scalable, and fully managed PostgreSQL database.

## How to Run Locally 🚀

To run this project on your local machine, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yusuf-ad/my-finance.git
   cd my-finance
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add the necessary environment variables. Refer to `.env.example` for the required variables.

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000` to see the application in action.

Now you should be able to see the project running on your local machine.

## Demo Login Credentials

To see a demo with pre-filled data, you can log in with the following credentials:

- **Email**: `test@gmail.com`
- **Password**: `testtest`

## Acknowledgements 🙏

This project was developed based on a challenge from [Frontend Mentor](https://www.frontendmentor.io/challenges/personal-finance-app-JfjtZgyMt1), utilizing the provided professional Figma design.

## Note of Thanks

Special thanks to [unaygney](https://github.com/unaygney/personal-finance-app) for providing the `icons.tsx` file used in this project. Your project has helped me a lot to finish this project.
