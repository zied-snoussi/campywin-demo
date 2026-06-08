@AGENTS.md

# CampyWin Demo

## Project Overview
Next.js 16 demo app for CampyWin — Tunisia's camping & outdoor adventure platform. No backend; all data is mocked in `src/lib/mock-data.ts`.

## Tech Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4 + shadcn/ui (base-ui variant)
- **Icons**: lucide-react
- **State**: Zustand with persist middleware

## Key Decisions
- shadcn/ui uses **base-ui** (not Radix UI) — `SheetTrigger`/`DialogTrigger` do NOT support `asChild`. Pass className directly to the trigger.
- All Unsplash images need `unoptimized` prop or remotePatterns in next.config.ts.
- `'use client'` required on any component using hooks, zustand, or browser APIs.
- Dark mode applied with `.dark` class on `<html>` via ThemeProvider.

## Reference Project
Full-stack version: `C:\projects\full-stack-campy-trust` (Angular 18 + Spring Boot 3.3)

## Dev
```bash
npm run dev    # http://localhost:3000
npm run build
```
