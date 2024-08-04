import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({ path: ".env.local" });

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/data/db/schema.ts",
    out: "./drizzle",
    dbCredentials: {
        url: process.env.DRIZZLE_PG_URL,
    },
    verbose: true,
    strict: true,
});
