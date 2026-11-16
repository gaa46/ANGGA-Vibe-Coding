# Planning: Setup Backend Project (Bun + ElysiaJS + Drizzle + MySQL)

## 1. Overview
Inisialisasi dan konfigurasi proyek backend baru pada direktori ini menggunakan **Bun** sebagai JavaScript runtime/package manager, **ElysiaJS** sebagai web framework, serta **Drizzle ORM** yang terhubung ke database **MySQL**.

Dokumen ini ditujukan sebagai panduan high-level bagi developer / AI model pelaksana untuk menyiapkan fondasi proyek yang siap pakai dan mudah dikembangkan.

---

## 2. Tech Stack
- **Runtime & Package Manager**: Bun
- **Language**: TypeScript
- **Web Framework**: ElysiaJS
- **ORM & Migration**: Drizzle ORM (`drizzle-orm`, `drizzle-kit`)
- **Database Driver**: MySQL (`mysql2`)

---

## 3. High-Level Implementation Steps

### Step 1: Project Initialization
- Inisialisasi proyek Bun baru di direktori ini (`bun init` atau pembuatan konfigurasi `package.json` dan `tsconfig.json`).
- Pastikan `.gitignore` dibuat untuk mengabaikan `node_modules`, file env lokal (`.env`), dan file cache/build.

### Step 2: Dependency Installation
- Install dependensi utama:
  - `elysia`
  - `drizzle-orm`
  - `mysql2`
- Install dev dependencies yang dibutuhkan:
  - `drizzle-kit`
  - `@types/bun`

### Step 3: Environment Configuration
- Buat file template `.env.example` dan `.env` lokal untuk konfigurasi database MySQL:
  - `DATABASE_HOST`
  - `DATABASE_PORT`
  - `DATABASE_USER`
  - `DATABASE_PASSWORD`
  - `DATABASE_NAME`
  - `PORT` (untuk server Elysia, default: 3000)

### Step 4: Database & ORM Setup (Drizzle)
- Buat konfigurasi Drizzle (`drizzle.config.ts`) dengan dialek `mysql`.
- Buat koneksi database client menggunakan `mysql2/promise` dan Drizzle.
- Siapkan direktori schema (contoh: `src/db/schema/` atau `src/db/schema.ts`) dan definisikan setidaknya satu model/tabel dasar sebagai contoh (misal: tabel `users`).
- Tambahkan script migration di `package.json` (generate migration, push schema, studio).

### Step 5: Setup Application Entrypoint (ElysiaJS)
- Buat entrypoint aplikasi (misal: `src/index.ts`).
- Konfigurasikan instance Elysia dengan:
  - Port server sesuai environment variable.
  - Endpoint health check (`GET /` atau `GET /health`) untuk memverifikasi server berjalan.
  - Endpoint uji coba koneksi database sederhana.

### Step 6: Package Scripts
Tambahkan script praktis di `package.json`:
- `dev`: Menjalankan server dalam mode watch (`bun --watch src/index.ts`).
- `start`: Menjalankan server dalam mode production (`bun src/index.ts`).
- `db:generate`: Generate file migrasi Drizzle.
- `db:push`: Mendorong perubahan schema langsung ke database.
- `db:studio`: Membuka Drizzle Studio untuk inspeksi visual data.

---

## 4. Proposed High-Level Directory Structure
```text
├── src/
│   ├── db/
│   │   ├── index.ts          # Inisialisasi koneksi Drizzle + MySQL
│   │   └── schema.ts         # Definisi schema database
│   ├── routes/               # Modular routing Elysia (opsional/ekstensi)
│   └── index.ts              # Server entrypoint Elysia
├── drizzle.config.ts         # Konfigurasi Drizzle Kit
├── .env.example              # Template environment variable
├── .gitignore                # File & direktori yang diabaikan Git
├── package.json
├── tsconfig.json
└── README.md                 # Dokumentasi singkat cara menjalankan proyek
```

---

## 5. Acceptance Criteria
- [ ] Proyek dapat dijalankan menggunakan perintah `bun run dev` tanpa error.
- [ ] Server Elysia aktif dan merespons request pada port yang ditentukan (default `3000`).
- [ ] Konfigurasi Drizzle terhubung ke MySQL dan script Drizzle (`db:generate` / `db:push`) siap pakai.
- [ ] Terdapat dokumentasi singkat (`README.md`) mengenai cara setup environment dan menjalankan server.
