# JustPay Dashboard

A modern, feature-rich dashboard application built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS**. This dashboard provides comprehensive analytics, sales tracking, and order management capabilities.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Development Guide](#development-guide)
- [Learn More](#learn-more)
- [Deployment](#deployment)

##  Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v18.0 or higher) - [Download](https://nodejs.org)
- **npm** (v9.0 or higher) or **yarn**
- **Git** (optional)

### Installation

1. **Clone or navigate to the project directory:**

```bash
cd dashboard
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

## 🏃 Running the Project

### Development Server

To start the development server with hot-reload:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard in action.

The page will auto-update as you edit files, thanks to Next.js's fast refresh feature.

### Production Build

To build the application for production:

```bash
npm run build
```

This creates an optimized production build in the `.next` folder.

### Production Server

To start the production server:

```bash
npm start
```

### Linting

To run ESLint and check for code quality issues:

```bash
npm run lint
```

## 📁 Project Structure

```
dashboard/
├── src/
│   ├── app/                          # Next.js app directory
│   │   ├── page.tsx                  # Dashboard home page
│   │   ├── orders/
│   │   │   └── page.tsx              # Orders page
│   │   ├── layout.tsx                # Root layout
│   │   ├── globals.css               # Global styles
│   │   └── favicon.ico
│   │
│   ├── components/                   # Reusable components
│   │   ├── dashboard/                # Dashboard-specific components
│   │   │   ├── Dashboard.tsx         # Main dashboard wrapper
│   │   │   ├── DashboardStats.tsx    # Statistics cards
│   │   │   ├── BarChart.tsx          # Bar chart visualization
│   │   │   ├── LineChart.tsx         # Line chart visualization
│   │   │   ├── TotalSalesDonut.tsx   # Donut chart for sales
│   │   │   ├── RevenueChart.tsx      # Revenue tracking chart
│   │   │   ├── RevenueByLocation.tsx # Geographic revenue data
│   │   │   ├── ProjectionsChart.tsx  # Sales projections
│   │   │   ├── TopSellingProducts.tsx# Top products list
│   │   │   ├── NotificationPanel.tsx # Notifications display
│   │   │   ├── TrendArrow.tsx        # Trend indicator
│   │   │   ├── TrendBadge.tsx        # Trend badge display
│   │   │   └── constants.ts          # Dashboard constants
│   │   │
│   │   ├── orders/                   # Orders page components
│   │   │   ├── OrdersTable.tsx       # Orders data table
│   │   │   ├── Checkbox.tsx          # Custom checkbox
│   │   │   ├── Pagination.tsx        # Pagination controls
│   │   │   ├── StatusBadge.tsx       # Order status display
│   │   │   ├── OrdersIcons.tsx       # Order-related icons
│   │   │   ├── types.ts              # TypeScript types
│   │   │   └── constants.ts          # Orders constants
│   │   │
│   │   ├── main/                     # Layout components
│   │   │   ├── DashboardLayout.tsx   # Main layout wrapper
│   │   │   └── Navbar.tsx            # Top navigation bar
│   │   │
│   │   ├── Sidebar/                  # Sidebar navigation
│   │   │   ├── Sidebar.tsx           # Main sidebar component
│   │   │   ├── SidebarContent.tsx    # Sidebar content
│   │   │   ├── NavItem.tsx           # Individual nav items
│   │   │   ├── types.ts              # Sidebar types
│   │   │   ├── constants.ts          # Sidebar constants
│   │   │   └── index.ts              # Barrel export
│   │   │
│   │   ├── ui/                       # UI primitive components
│   │   │   ├── card.tsx              # Card component
│   │   │   ├── badge.tsx             # Badge component
│   │   │   ├── bar-chart.tsx         # Chart wrapper
│   │   │   ├── chart.tsx             # Base chart component
│   │   │   ├── scroll-area.tsx       # Scrollable area
│   │   │   ├── sidebar.tsx           # Sidebar UI
│   │   │   └── Avatar.tsx            # Avatar component
│   │   │
│   │   └── providers/                # Context & providers
│   │       └── theme-provider.tsx    # Theme context provider
│   │
│   ├── lib/                          # Utility functions
│   │   ├── utils.ts                  # Common utilities
│   │   ├── icons.tsx                 # Icon components
│   │   └── react-simple-maps.d.ts    # Type declarations
│   │
│   └── store/                        # Zustand state management
│       ├── sidebarStore.ts           # Sidebar state
│       └── notificationPanelStore.ts # Notification state
│
├── public/                           # Static assets
│   ├── dashboard/                    # Dashboard icons
│   ├── navbar/                       # Navigation icons
│   ├── sidebar/                      # Sidebar assets
│   └── *.svg                         # SVG icons
│
├── package.json                      # Dependencies & scripts
├── tsconfig.json                     # TypeScript configuration
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS config
├── postcss.config.mjs                # PostCSS configuration
├── eslint.config.mjs                 # ESLint configuration
└── README.md                         # This file
```

## ✨ Features

- **Dashboard Analytics**: Real-time metrics and KPIs
- **Sales Tracking**: Monitor revenue, trends, and projections
- **Geographic Data**: Revenue breakdown by location using maps
- **Product Insights**: Top-selling products and performance metrics
- **Order Management**: Comprehensive orders table with filtering and pagination
- **Responsive Design**: Mobile-friendly dashboard
- **Dark Mode Support**: Theme switching capability
- **Real-time Notifications**: Notification panel for updates
- **Interactive Charts**: Visualizations using Recharts
- **Responsive Sidebar**: Collapsible navigation menu
- **Type-Safe**: Full TypeScript support for better development experience

## 🛠️ Technologies Used

- **[Next.js 15.5.5](https://nextjs.org)** - React framework for production
- **[React 19.1.0](https://react.dev)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS framework
- **[Recharts 2.15.4](https://recharts.org)** - Charting library
- **[Zustand 5.0.8](https://github.com/pmndrs/zustand)** - State management
- **[Radix UI](https://www.radix-ui.com)** - Accessible component primitives
- **[Lucide React](https://lucide.dev)** - Icon library
- **[React Simple Maps](https://www.react-simple-maps.io)** - Geographic visualization
- **[Tabler Icons](https://tabler-icons.io)** - Additional icon set
- **[Motion](https://motion.dev)** - Animation library
- **[ESLint](https://eslint.org)** - Code linting

## 📖 Development Guide

### Component Development

- Place reusable components in `src/components/ui/`
- Page-specific components go in `src/components/[page-name]/`
- Use TypeScript for type safety

### State Management

The project uses **Zustand** for global state management:

```typescript
// Example: src/store/sidebarStore.ts
import { create } from 'zustand';

export const useSidebarStore = create((set) => ({
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
```

### Styling

- Use Tailwind CSS utility classes for styling
- CSS modules available if needed
- Global styles in `src/app/globals.css`

### Adding New Pages

Create a new route by adding a folder with `page.tsx`:

```
src/app/new-page/page.tsx
```

### Environment Variables

If needed, create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_API_URL=https://api.example.com
```









