import React from "react";
import { SignedOut, SignIn } from "@clerk/nextjs";
import Header from "../components/header";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const { userId } = auth();

    if (userId) {
        redirect("/");
    }
    return (
        <>
            <Header />
            <main className="flex flex-col justify-center items-center pt-8">
                <SignedOut>
                    <SignIn routing="hash" />
                </SignedOut>
            </main>
        </>
    );
}
