# 🌍 Travel Platform

A simple yet powerful travel content platform built with React + Vite + TypeScript + Shadcn UI + Zod (Validation) + Tanstack Query. This project provides features such as article management, categorized content, comment sections, and user authentication.

Netlify Access Link:

```bash
https://travel-platform-dhf.netlify.app
```

---

## 🚀 Features

- 🔐 **Authentication** (email/password based)
- 📝 **Article Management (Filter by Searching and Select Multiple for Populate)**
- 🗂️ **Category Management**
- 💬 **Commenting Management**

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 (Vite)
- **State Management**: Redux Toolkit, React Hook Form, TanStack Query
- **UI & Styling**: Tailwind CSS + Shadcn UI
- **Form Validation**: Zod
- **Utilities**: Axios, Tanstack Query, Lodash, Axios, clsx
- **Build Tools**: Vite + TypeScript

---

## 🗂️ Folder Stucture

The main source code is organized under the ./src directory with the following structure:

### `/components` ( Global UI components)

#### `/ui` --> Atomic components (atoms) e.g., Button, Input

#### `/molecules` --> Reusable composed components (molecules)

--

### `/pages` (Route-based feature folders)

#### `/[feature-name]/`

#### `/[feature-name]/components` --> Page-specific components

#### `/[feature-name]/hooks` --> Local hooks scoped to the feature

#### `/[feature-name]/lib` --> Constants, models, utils for the feature

--

### `/lib` (Global constants, models, schema validations (Zod), API configs)

#### `/[file].ts` --> E.g., useAuth, useDebounce, or fetch logic

--

### `/hooks` (Custom hooks for Global)

#### `/[file].ts/.tsx` --> E.g., useAuth, useDebounce, or fetch logic

--

### `/routes` (Application routing configuration)

#### `/content.ts` --> Lazy-loaded route components for optimization

#### `/index.tsx` --> Main route setup using React Router

---

## 📦 Installation

### Prerequisites

- Node.js ≥ 18.x.x
- `npm` atau `yarn`

### 1. Clone the Repository

```bash
git clone https://github.com/daffaharizal/destination-app
```

### 2. Installation Package

```bash
yarn install
```

OR

```bash
npm install
```

### 3. Create Environment Files

Buat dua file berikut di root project:

#### `.env.dev`

```env
NODE_ENV=development
VITE_BASE_URL=https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api
```

#### `.env.prod`

```env
NODE_ENV=production
VITE_BASE_URL=https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api
```

### 4. Running Project

```bash
yarn dev / npm run dev
```

### 5. Login Account

#### `email:`

```bash
harizal.daffa46@gmail.com
```

#### `password: `

```bash
growupwithdatacakra46
```
