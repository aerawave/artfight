"use server";

import React from "react";
import Header from "./components/header";

export default async function NotFound() {
    return (
        <>
            <Header />
            <div className="flex flex-row pt-8 justify-center">
                <h1 className="text-4xl">404: Page not found.</h1>
            </div>
        </>
    );
}
