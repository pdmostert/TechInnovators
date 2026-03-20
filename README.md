# Handcrafted Haven

## Project Overview

**Handcrafted Haven** is a full-stack e-commerce web application designed to support local artisans and promote sustainable consumption. The platform connects artisan creators with consumers seeking unique, handcrafted items. Users can browse products by category, search for specific items, and filter results by price range.

**Purpose:** Build a comprehensive web application using a modern full technology stack (Next.js, React, TypeScript, CSS Modules) while practicing effective group collaboration and software development workflows.

## Project Requirements & Scope

### Core Features

- **Product Catalog:** Display handcrafted items from local artisans
- **Search Functionality:** Users can search products by name/description
- **Filtering:** Filter products by category and price range
- **Responsive Design:** Optimize for mobile, tablet, and desktop views
- **User Authentication:** Secure login/profile management for artisans and customers
- **Shopping Cart & Checkout:** Complete e-commerce flow
- **Artisan Dashboard:** Tools for artisans to manage their products

### Technology Stack

- **Frontend:** Next.js 16, React 19, TypeScript
- **Styling:** CSS Modules + global CSS variables
- **Development:** ESLint, Node.js/pnpm
- **Deployment:** Cloud-hosted (to be determined)
- **Version Control:** Git & GitHub with collaborative workflow

### Design Theme

#### Color Palette

- **Primary (Terracotta):** #D4735E - Main brand color
- **Secondary (Sage Green):** #8B9D83 - Supporting accent
- **Accent (Warm Beige):** #E8C5A5 - Highlights
- **Background (Soft Cream):** #FFF9F5 - Primary background
- **Text (Rich Brown):** #3E2723 - Main text color

#### Typography

- **Display Font:** Playfair Display (headings, titles)
- **Body Font:** Lato (body text, UI)

#### Design Approach

The design emphasizes warmth, craftsmanship, and sustainability through an earthy color palette that reflects artisan values. The layout prioritizes user experience with clear navigation and product discovery.

## Team Members (Week 2)

- **Peter Mostert** - Week 2 Team Lead
- **Steve Kalala** - Team Member
- **Sam Daramroei** - Team Member
- **Christian Uche** - Team Member

## Project Repository

- **GitHub:** [https://github.com/pdmostert/TechInnovators](https://github.com/pdmostert/TechInnovators)
- **Project Board:** [https://github.com/users/pdmostert/projects/3](https://github.com/users/pdmostert/projects/3)

## Local Development Setup

### Prerequisites

- Node.js 22+
- pnpm 9+

### Install and Run

```bash
pnpm install
pnpm dev
```

### Quality Gates

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

## Professional Folder Structure

```text
src/
  app/
    lib/        # shared data and application helpers
    ui/         # reusable UI components grouped by feature
      filters/
      header/
      product/
    page.tsx    # home route
    layout.tsx  # app layout and metadata
    globals.css # global styles and tokens
public/         # static assets used by the app
```

## Week 2 Deliverable Alignment

- Project summary and scope documented in this README.
- Team members listed for the current week.
- Repository URL and project board URL included.
- Theme evidence documented with color palette and typography.
- Work item planning tracked on the project board with backlog issues and acceptance criteria.
