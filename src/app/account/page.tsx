import React from "react";

import { UserProfile } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "../components/header";

export default async function AccountPage() {
    const { userId } = auth();
    if (!userId) {
        redirect("/login");
    }

    return (
        <>
            <Header />
            <div className="flex flex-col justify-center items-center pt-8">
                <UserProfile routing="hash" />
            </div>
        </>
    );
}
