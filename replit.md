# 3er Encuentro Federal Apícola - Event Program Application

## Overview

This is a full-stack web application for displaying the program of the 3rd Federal Beekeeping Conference. The application allows users to browse activities across three event days, search and filter content, and view detailed information about speakers, rooms, and activities. Built with a modern React frontend and Express.js backend, the application focuses on providing an intuitive user experience for conference attendees.

## System Architecture

The application follows a full-stack architecture with clear separation between frontend and backend concerns:

- **Frontend**: React with TypeScript, built using Vite for fast development and optimal bundling
- **Backend**: Express.js server with TypeScript providing REST API endpoints
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Styling**: Tailwind CSS with shadcn/ui components for consistent, modern UI design
- **State Management**: TanStack Query for server state management and caching

## Key Components

### Frontend Architecture
- **Component Structure**: Modular React components organized by feature
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom color scheme for beekeeping theme (honey and nature colors)
- **Forms**: React Hook Form with Zod validation
- **State Management**: TanStack Query for API state with React Query Client

### Backend Architecture
- **API Design**: RESTful endpoints for activities, speakers, and rooms
- **Data Layer**: Drizzle ORM with PostgreSQL for data persistence
- **Storage Pattern**: Abstracted storage interface with in-memory implementation for development
- **Error Handling**: Centralized error handling middleware
- **Development Tools**: Hot module replacement with Vite integration in development

### Database Schema
- **Speakers**: Name, title, organization, bio, avatar
- **Rooms**: Name, capacity, description
- **Activities**: Title, description, type, day, time slots, room assignment, speaker assignment, capacity management, registration requirements, tags

### API Endpoints
- `GET /api/activities` - Retrieve all activities with speaker and room details
- `GET /api/activities/day/:day` - Filter activities by specific day (1-3)
- `GET /api/activities/search?q=query` - Search activities by text query
- `GET /api/activities/filter?type=&roomId=` - Filter by activity type and/or room
- `GET /api/speakers` - Retrieve all speakers
- `GET /api/rooms` - Retrieve all rooms

## Data Flow

1. **Client Request**: User interacts with React components (search, filter, day selection)
2. **Query Management**: TanStack Query manages API calls and caching
3. **API Processing**: Express server processes requests and queries storage layer
4. **Database Access**: Drizzle ORM executes type-safe database queries
5. **Response Flow**: Data flows back through the stack with proper error handling
6. **UI Updates**: React components re-render with new data, maintaining smooth UX

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection optimized for serverless environments
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing for React applications
- **@radix-ui/***: Accessible component primitives for UI development

### Development Tools
- **Vite**: Build tool and development server with HMR
- **TypeScript**: Type safety across the entire application
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast bundling for production builds

### UI Components
- Complete shadcn/ui component library for consistent design system
- Custom theme with beekeeping-inspired colors (honey, nature tones)
- Responsive design optimized for both desktop and mobile devices

## Deployment Strategy

The application is configured for deployment on Replit with the following setup:

- **Development**: `npm run dev` starts both Vite dev server and Express API with HMR
- **Production Build**: `npm run build` creates optimized bundles for both client and server
- **Production Start**: `npm run start` runs the production Express server serving static assets
- **Database Management**: `npm run db:push` applies schema changes via Drizzle Kit
- **Port Configuration**: Server runs on port 5000 with external port 80 mapping
- **Auto-scaling**: Configured for autoscale deployment target

The build process creates optimized client bundles in `dist/public` and a bundled server in `dist/index.js`, ensuring efficient production deployment with proper static asset serving.

## Changelog
- June 24, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.