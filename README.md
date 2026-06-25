# RecipeHub Frontend

RecipeHub is a modern recipe-sharing platform built with Next.js App Router. It includes a public marketing site, recipe browsing and details, authentication, user and admin dashboards, Stripe checkout, and recipe management flows.

## Features

- Public landing page with animated sections and smooth scrolling
- Recipe listing with search, category filtering, pagination, and detail views
- Auth flows for login and registration
- User dashboard for managing recipes, favorites, profile, and purchased recipes
- Admin dashboard for managing users, recipes, reports, and transactions
- Stripe checkout for premium subscriptions and recipe payments
- Better Auth session handling with MongoDB storage
- Toast notifications, loading states, and reusable UI sections

## Tech Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- HeroUI
- MongoDB
- Better Auth
- Stripe
- Framer Motion
- GSAP
- Lenis

## Package Usage

- `next`: routing, layouts, server components, loading states, image optimization, and route handlers
- `react` / `react-dom`: UI rendering
- `@heroui/react` and `@heroui/styles`: buttons, inputs, spinners, cards, router provider, and dashboard UI
- `better-auth`: authentication, sessions, and social login support
- `@better-auth/mongo-adapter`: MongoDB adapter for Better Auth
- `mongodb`: database connection and persistence
- `stripe` and `@stripe/stripe-js`: checkout and payment flow
- `framer-motion`: client-side UI transitions and interactions
- `gsap`: hero animation sequencing
- `lenis`: smooth page scrolling
- `lucide-react`, `react-icons`, `@gravity-ui/icons`: icons across the app
- `react-hot-toast`: toast notifications

## Project Structure

- `src/app`: Next.js routes, layouts, loading states, and API route handlers
- `src/components/home`: public homepage sections
- `src/components/dashboard`: dashboard shells and shared nav configuration
- `src/components/auth`: login and registration forms
- `src/components/ui`: shared UI helpers like section loading
- `src/app/lib`: auth, database, Stripe, and server actions
- `src/context`: app-level providers and theme state
- `public`: static assets such as logo and hero image

## Environment Variables

Copy `.env.sample` to `.env.local` and fill in your values.

Required variables:

- `MONGO`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `NEXT_PUBLIC_BETTER_AUTH_URL`
- `NEXT_PUBLIC_BACKEND_URL`
- `STRIPE_SECRET_KEY`
- `PREMIUM_PRICE_ID`
- `PRODUCT_PRICE_ID`
- `NEXT_PUBLIC_IMAGEBB`

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create your local environment file:

```bash
cp .env.sample .env.local
```

3. Run the development server:

```bash
npm run dev
```

4. Open the app:

```bash
http://localhost:3000
```

## Scripts

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run start` - start the production server
- `npm run lint` - run ESLint

## Main Routes

- `/` - public home page
- `/recipes` - browse recipes
- `/recipes/[id]` - recipe details
- `/login` - login page
- `/register` - registration page
- `/dashboard/user` - user dashboard
- `/dashboard/admin` - admin dashboard

## Notes

- Images are configured to load from remote hosts through `next.config.mjs`.
- The app uses `@/*` path aliases from `jsconfig.json`.
- Global loading UI is handled with reusable section loaders so route loading stays local instead of taking over the full screen.

## Build Status

The project builds successfully with `npm run build`.
