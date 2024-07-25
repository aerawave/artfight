import React from "react";

import { UserProfile } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navigation from "../components/navigation";

export default async function AccountPage() {
    const { userId } = auth();
    if (!userId) {
        redirect("/login");
    }

    return (
        <>
            <Navigation />
            <div className="flex flex-col justify-center items-center pt-8">
                <UserProfile routing="hash" />
            </div>
        </>
    );
}
