import db from "@/data/db/database";
import { Users } from "@/data/db/schema";
import { eq } from "drizzle-orm";

export async function verifyUser(user_id: string) {
    const users = await db
        .select()
        .from(Users)
        .where((u) => eq(u.clerkId, user_id))
        .limit(1);

    if (users.length > 0) {
        const user = users[0];

        return user.clerkId;
    } else {
        await db.insert(Users).values({ clerkId: user_id });
        return await verifyUser(user_id);
    }
}
