namespace NodeJS {
    interface ProcessEnv {
        DRIZZLE_PG_URL: string;
        REDIS_URI: string;
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
        CLERK_SECRET_KEY: string;
        FILE_UPLOAD_MAX_SIZE: string;
    }
}
