"use server";

import React from "react";
import Navigation from "./components/navigation";

export default async function NotFound() {
    return (
        <>
            <Navigation />
            <div className="flex flex-row pt-8 justify-center">
                <h1 className="text-4xl">404: Page not found.</h1>
            </div>
        </>
    );
}
