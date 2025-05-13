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

src/
│
├── components/ # Komponen global: atom dan molecule
│ ├── ui/ # Atom - input, button, dsb (berbasis Shadcn)
│ └── [Reusable]/ # Molecule - kombinasi UI atom seperti form, card
│
├── pages/ # Per halaman atau fitur besar (Articles, Auth, dll)
│ └── [page-name]/  
│ ├── components/ # Komponen khusus halaman ini
│ ├── hooks/ # Custom hook hanya untuk page ini
│ └── lib/ # Helper, constant, service khusus page ini
│
├── routes/ # File routing dan `content.ts` untuk lazy loading
│
├── hooks/ # Global hooks, walau saat ini juga berisi helper dan fetching logic (butuh improvement)
│
├── lib/ # Global model, constant, dan konfigurasi lain (ex: axios, zod schemas)

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
