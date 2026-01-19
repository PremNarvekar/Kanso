# Kanso

A modern, minimalist URL shortener designed for simplicity and clarity. Kanso brings focus to your links with a premium, distraction-free user experience.

## Overview

Kanso is built with scalability and production-readiness in mind. It separates concerns between a robust Node.js/Express backend and a responsive React frontend, ensuring maintainability and performance.

### Key Features

*   **Premium Minimalist UI**: A clean, "Apple-like" aesthetic using a curated color palette and modern typography.
*   **Secure Authentication**: Full user registration and login flows with secure cookie-based session management.
*   **Dynamic Avatar System**: Users can generate unique, privacy-friendly avatars with a single click.
*   **Link History**: Authenticated users can track and manage their shortened URLs.
*   **Custom Slugs**: Option to create meaningful custom URL aliases.
*   **Optimized Performance**: Built with Vite and TanStack Query for efficient data fetching and caching.
Q
## Tech Stack

**Frontend**
*   React 19
*   Tailwind CSS (v4)
*   TanStack Query (React Query)
*   Vite

**Backend**
*   Node.js & Express
*   MongoDB & Mongoose
*   JWT & Cookie-Parser

## Getting Started

1.  **Clone the repository**
2.  **Install dependencies**:
    *   Backend: `cd backend && npm install`
    *   Frontend: `cd frontend && npm install`
3.  **Environment Setup**:
    *   Configure your `.env` in the backend directory with `MONGO_URI` and `JWT_SECRET`.
4.  **Run the application**:
    *   Backend: `npm run dev`
    *   Frontend: `npm run dev`


