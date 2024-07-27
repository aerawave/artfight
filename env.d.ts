namespace NodeJS {
    interface ProcessEnv {
        DRIZZLE_DATABASE_URL: string;
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
        CLERK_SECRET_KEY: string;
        // FIXME: temporary, using local file storage for file uploads
        FILE_PATH_BEGIN: string;
    }
}
