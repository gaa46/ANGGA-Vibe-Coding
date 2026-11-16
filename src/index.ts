import { Elysia } from "elysia";
import { db, poolConnection, users } from "./db";

const port = Number(process.env.PORT) || 3000;

export const app = new Elysia()
  .get("/", () => ({
    message: "Welcome to ANGGA Vibe Coding API",
    status: "ok",
    timestamp: new Date().toISOString(),
  }))
  .get("/health", async () => {
    let databaseStatus = "disconnected";
    try {
      const connection = await poolConnection.getConnection();
      await connection.ping();
      connection.release();
      databaseStatus = "connected";
    } catch (error) {
      databaseStatus = `error: ${error instanceof Error ? error.message : "unknown"}`;
    }

    return {
      server: "running",
      runtime: "bun",
      database: databaseStatus,
      uptime: process.uptime(),
    };
  })
  .group("/api", (app) =>
    app.get("/users", async () => {
      try {
        const result = await db.select().from(users).limit(10);
        return { data: result };
      } catch (error) {
        return {
          error: "Failed to fetch users (Database may not be connected or migrated yet)",
          details: error instanceof Error ? error.message : "Unknown error",
        };
      }
    })
  )
  .listen(port);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

export type App = typeof app;
