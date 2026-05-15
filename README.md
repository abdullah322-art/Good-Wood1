# Good Wood Carpentry Workshop

A complete, production-ready full-stack website for a premium carpentry workshop.
Built with React, Vite, Tailwind CSS, Node.js, Express, and Prisma (PostgreSQL).

## Features
- Modern, luxury UI/UX with smooth Framer Motion animations
- Fully responsive design (Mobile, Tablet, Desktop)
- Arabic RTL Support
- Complete Admin Dashboard
- REST API with JWT Authentication
- Postgres Database Integration via Prisma

## Quick Start (Replit & Local)

1. **Install Dependencies**
   Run the following command in the root directory:
   ```bash
   npm run install:all
   ```

2. **Database Setup**
   Ensure you have PostgreSQL running.
   Update the `DATABASE_URL` in `server/.env` with your DB credentials.
   (An example `.env` file is located at `server/.env`)

   Apply the database schema:
   ```bash
   cd server
   npx prisma db push
   npx prisma generate
   ```

3. **Start the Application**
   From the root directory, run:
   ```bash
   npm start
   ```
   This will start both the Express backend on port 5000 and the Vite frontend proxying to the API.

## Admin Access
- **Login URL**: `http://localhost:5173/admin/login` (Or your deployed URL)
- **Email**: `admin@goodwood.com`
- **Password**: `admin123`
*(Note: A default admin user is created on the first login attempt with these credentials for convenience).*

## Vercel Deployment & Security Considerations
- **Security Additions**: The backend uses Helmet.js for security headers, express-rate-limit to prevent brute force attacks, and HttpOnly Secure Cookies for JWT session management (immune to XSS). 
- **Vercel Ephemeral Filesystem**: Because you requested `multer` disk storage, please be aware that Vercel Serverless Functions have a read-only, ephemeral filesystem. Uploaded files to `/uploads` will disappear shortly after upload. For a robust production Vercel deployment, you must switch `multer` storage to an external provider (like AWS S3, Vercel Blob, or Cloudinary).
- **Protected Routes**: All `POST`, `PUT`, and `DELETE` API routes are strictly protected. The frontend `/admin/*` routes are protected by auth checks, automatically redirecting unauthorized access.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS (v4), Framer Motion, React Router, React Hot Toast
- **Backend**: Node.js, Express, Prisma, JWT, bcrypt, Helmet, RateLimit
- **Database**: PostgreSQL
# Good-Wood1
# Good-Wood1
