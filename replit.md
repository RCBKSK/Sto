# Elegance Stone - Natural Stone Cladding Website

## Overview

This is a full-stack web application for Elegance Stone, a premium natural stone supplier specializing in cladding, tiles, and design solutions. The application features a modern React frontend with a Node.js/Express backend, PostgreSQL database integration via Drizzle ORM, and a comprehensive product catalog with contact management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Validation**: Zod for request/response validation
- **Session Management**: PostgreSQL session store with connect-pg-simple

### Database Architecture
- **Database**: PostgreSQL (configured for Neon Database)
- **ORM**: Drizzle ORM with migrations support
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`

## Key Components

### Frontend Components
- **Navigation**: Responsive navigation with dropdown menus
- **Hero Section**: Full-screen landing with call-to-action buttons
- **Product Collections**: Grid layout showcasing stone categories
- **Contact Forms**: React Hook Form with Zod validation
- **Gallery**: Image gallery with modal viewing
- **Blog System**: Content management for articles and insights

### Backend Services
- **Product API**: CRUD operations for stone products and categories
- **Contact API**: Form submission handling and inquiry management
- **Blog API**: Content management for blog posts
- **User Management**: Basic user authentication system

### Database Schema
- **Products**: Name, category, price, description, images, specifications
- **Contact Inquiries**: Customer contact forms with project details
- **Blog Posts**: Content management with categories and publishing
- **Users**: Basic user authentication and management

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **Server Processing**: Express routes handle requests with validation
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response Handling**: Type-safe responses returned to client
5. **State Management**: TanStack Query caches and syncs server state

## External Dependencies

### UI and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **shadcn/ui**: Pre-built component system

### Database and Backend
- **Neon Database**: PostgreSQL hosting service
- **Drizzle ORM**: Type-safe database toolkit
- **Express.js**: Web application framework
- **Zod**: Schema validation library

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and developer experience
- **ESBuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development Environment
- **Frontend**: Vite development server with HMR
- **Backend**: tsx for TypeScript execution with hot reload
- **Database**: Drizzle migrations and schema push

### Production Build
- **Frontend**: Vite builds static assets to `/dist/public`
- **Backend**: ESBuild bundles server code to `/dist/index.js`
- **Environment**: Node.js production server serving both API and static files

### Environment Configuration
- **Database**: `DATABASE_URL` environment variable for PostgreSQL connection
- **Build Process**: Separate build commands for frontend and backend
- **Static Assets**: Express serves built frontend from `/dist/public`

The application follows a monorepo structure with shared TypeScript types and schemas, enabling type safety across the full stack while maintaining clear separation between frontend and backend concerns.