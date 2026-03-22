# MyShop: Full-Stack E-Commerce Website

Welcome to the **MyShop** project! This is a complete, production-ready full-stack e-commerce application.

## 1. File Structure Overview

```text
d:/myshop/
├── package.json           # Dependencies and scripts (Next.js, Prisma, Tailwind, Framer Motion)
├── tsconfig.json          # TypeScript configuration
├── next.config.mjs        # Next.js config (configured for Unsplash external images)
├── tailwind.config.ts     # Styling constraints and custom Purple color palette
├── postcss.config.js      # PostCSS configuration for Tailwind CSS
├── .eslintrc.json         # ESLint configuration
├── .env                   # Environment variables (Add your DATABASE_URL here)
├── prisma/
│   ├── schema.prisma      # Database schema (Product model)
│   └── seed.ts            # Seed script with 6 dummy products
├── lib/
│   └── prisma.ts          # Singleton Prisma Client to prevent multiple connection issues
└── app/
    ├── layout.tsx         # Global layout with responsive Navbar and Footer
    ├── page.tsx           # Home page with Hero section and interactive Product Grid
    ├── globals.css        # Tailwind directives
    └── api/
        └── products/
            └── route.ts   # GET endpoint to fetch products (Uses relative Prisma import)
```

## 2. Terminal Commands for Setup & Local Development

Run the following commands in the `d:/myshop/` directory:

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Database:**
   - Create a free PostgreSQL database on [Neon.tech](https://neon.tech/).
   - Copy the connection string.
   - Open `.env` and replace the placeholder `DATABASE_URL` with your string.

3. **Initialize Database and Seed Data:**
   ```bash
   npx prisma db push
   npm run db:seed
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 3. Deployment Checklist for Vercel

Follow these precise steps to deploy your application to Vercel without errors.

### Step A: Push Code to GitHub
1. Initialize Git in the project root: `git init`
2. Add all files: `git add .`
3. Commit the code: `git commit -m "Initial commit"`
4. Create a new repository on GitHub.
5. Link and push the code:
   ```bash
   git remote add origin https://github.com/yourusername/myshop.git
   git push -u origin main
   ```

### Step B: Vercel Dashboard Specifics
1. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
2. **Import** your newly created GitHub repository (`myshop`).
3. **CRITICAL Configuration Requirements:**
   - Leave the Framework Preset as **Next.js**.
   - Expand the **Environment Variables** section.
   - Add a new variable:
     - **Name:** `DATABASE_URL`
     - **Value:** Submit your Neon PostgreSQL connection string (the exact same one you put in your local `.env` file).
     *Note: Vercel does NOT upload your `.env` file for security reasons, so adding it here is vital.*
4. Click **Deploy**.

### Step C: Verification & Troubleshooting
- **Build Phase:** Vercel will run `npm install`, which will trigger our custom `postinstall` script (`prisma generate`). This is critical to ensure the Prisma Client is generated inside Vercel's environment.
- **API Errors:** If your products are not loading in production, navigate to your Vercel Project Dashboard -> **Logs**. Check the "Function" logs for the `/api/products` route. The error handling we added in `route.ts` will explicitly state if it can't reach the database.

> *Note: We explicitly enforce Prisma v6 and relative path imports (`../../../lib/prisma`) in this repository to actively prevent Vercel Serverless Function and `datasource.url` validation errors common with Next.js 14.*
