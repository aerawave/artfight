import * as fs from "fs/promises";
import { Redis } from "ioredis";

(async () => {
    const REDIS_URI =
        (await fs.readFile("./.env.local"))
            .toString()
            .split("\n")
            .find((line) => line.startsWith("REDIS_URI="))
            ?.substring("REDIS_URI=".length) ?? "";
    const redis = new Redis(REDIS_URI);
    const keys = await redis.keys("fs/*");

    if (keys.length) {
        console.log("Deleting the following keys from Redis:");

        for (const key of keys) {
            console.log("  - ", `"${key}"`);
        }

        try {
            await redis.del(keys);

            console.log("Done.");
        } catch (error) {
            console.error("Something went wrong... ", error);
        }
    } else {
        console.log("No keys to delete...");
    }

    if (process.argv[1].endsWith("clear-redis.js")) {
        await fs.rm("./src/data/redis/clear-redis.js");
    }

    process.exit(1);
})();
