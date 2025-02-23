# Full-Stack Coding Challenge

This repository contains a full-stack application with a backend API and a frontend interface.

## 1. Steps to Set Up the Database (Migrations, Environment Variables)

### Backend Setup:
1. **Install Dependencies:**
   - Navigate to the backend directory.
   - Run the following command to install the necessary dependencies:
     ```bash
     npm install
     ```

2. **Set Up Environment Variables:**
   - Create a `.env` file in the root of the backend project.
   - Add the following variables (adjust as needed):
     ```env
     DATABASE_URL=your-database-url
     SECRET=your-jwt-secret-key
     PORT=your_port_num
     ```
   - Of course, make sure you have the PostgreSQL database running

## 2. How to Run the Backend

1. **Install Dependencies:**
   - Navigate to the backend folder and install the necessary dependencies:
     ```bash
     npm install
     ```

2. **Run the Backend:**
   - To start the backend server, run the following command:
     ```bash
     npm run dev
     ```
   - The backend will be available at `http://localhost:your_port_num`

## 3. How to Run the Frontend

1. **Install Dependencies:**
   - Navigate to the frontend directory.
   - Run the following command to install the necessary dependencies:
     ```bash
     npm install
     ```
   - Make sure the vite.config.ts file runs correct backend port as a proxy, it is set as 3001 as default
    ```bash
     import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';
   
   export default defineConfig({
     plugins: [react()],
     server: {
       proxy: {
         '/api': {
           target: `http://localhost:your_port_num`, /*Change here */
           changeOrigin: true,
           rewrite: (path) => path.replace(/^\/api/, ''),
         },
       },
     },
   });
     ```

2. **Run the Frontend:**
   - To start the frontend application, run the following command:
     ```bash
     npm run dev
     ```
   - The frontend will be available at `http://localhost:5173`.

## 4. Salary Expectations per Month (Mandatory)

Please provide your salary expectations for the role. This is a mandatory field.
$4000 per month

## 5. Short Video Demo



https://github.com/user-attachments/assets/a5b978e0-1c88-4bd1-82ec-efec4c5b67fd


   
