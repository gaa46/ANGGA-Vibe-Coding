# ANGGA Vibe Coding - Backend API

Backend project template dibangun menggunakan **Bun**, **ElysiaJS**, **Drizzle ORM**, dan **MySQL**.

## Tech Stack
- **Runtime & Package Manager**: [Bun](https://bun.sh/)
- **Web Framework**: [ElysiaJS](https://elysiajs.com/)
- **ORM & Migrations**: [Drizzle ORM](https://orm.drizzle.team/) & Drizzle Kit
- **Database Driver**: [mysql2](https://github.com/sidorares/node-mysql2)
- **Language**: TypeScript

---

## Struktur Direktori
```text
├── drizzle/                  # Hasil generate migration SQL Drizzle
├── src/
│   ├── db/
│   │   ├── index.ts          # Setup koneksi database & instance Drizzle
│   │   └── schema.ts         # Definisi schema database (contoh: users)
│   └── index.ts              # Entrypoint server ElysiaJS
├── .env.example              # Template variabel lingkungan
├── .env                      # Variabel lingkungan lokal
├── .gitignore
├── drizzle.config.ts         # Konfigurasi Drizzle Kit (MySQL)
├── package.json
├── tsconfig.json
└── README.md
```

---

## Memulai Proyek

### 1. Install Dependensi
```bash
bun install
```

### 2. Konfigurasi Environment Variable
Salin `.env.example` ke `.env` dan sesuaikan kredensial MySQL Anda:
```env
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_NAME=vibe_coding_db
```

### 3. Database Migration (Drizzle)
- **Generate migrasi SQL**:
  ```bash
  bun run db:generate
  ```
- **Push schema langsung ke database**:
  ```bash
  bun run db:push
  ```
- **Buka Drizzle Studio**:
  ```bash
  bun run db:studio
  ```

### 4. Menjalankan Server
- **Mode Development (Watch Mode)**:
  ```bash
  bun run dev
  ```
- **Mode Production**:
  ```bash
  bun run start
  ```
- **Type Checking**:
  ```bash
  bun run typecheck
  ```

---

## API Endpoints

| Method | Endpoint | Keterangan |
| :--- | :--- | :--- |
| `GET` | `/` | Pesan selamat datang & status API |
| `GET` | `/health` | Pemeriksaan kesehatan server & status koneksi database |
| `GET` | `/api/users` | Mengambil data pengguna dari tabel `users` (limit 10) |
