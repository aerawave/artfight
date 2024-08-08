import React from "react";
import { SignedOut, SignIn } from "@clerk/nextjs";
import Header from "../components/header";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import "./styles.css";

export default async function LoginPage() {
    const { userId } = auth();

    if (userId) {
        redirect("/");
    }
    return (
        <>
            <Header />
            <main className="sign-in">
                <SignedOut>
                    <SignIn routing="hash" />
                </SignedOut>
            </main>
        </>
    );
}
