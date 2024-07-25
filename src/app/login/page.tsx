import React from "react";
import { SignedOut, SignIn } from "@clerk/nextjs";
import Navigation from "../components/navigation";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const { userId } = auth();

    if (userId) {
        redirect("/");
    }
    return (
        <>
            <Navigation />
            <main className="flex flex-col justify-center items-center pt-8">
                <SignedOut>
                    <SignIn routing="hash" />
                </SignedOut>
            </main>
        </>
    );
}
