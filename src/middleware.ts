import { clerkMiddleware } from "@clerk/nextjs/server";
import { verifyUser } from "./app/actions/auth";

export default clerkMiddleware(async (auth) => {
    const user_id = auth().userId;

    if (user_id) {
        await verifyUser(user_id);
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
