"use server";

import { Crumb, HomeCrumb } from "@/app/components/crumb";
import Navigation from "@/app/components/navigation";
import React from "react";
import NewCharacterForm from "./components/new-character-form";

export default async function SubmitCharacterPage() {
    const local_crumbs: Crumb[] = [
        {
            label: "Submit Character",
            href: "/submit/character",
        },
    ];

    return (
        <>
            <Navigation crumbs={[HomeCrumb, ...local_crumbs]} />
            <div className="flex flex-col gap-4">
                <h1 className="text-4xl">Submit Character</h1>
                <div className="rounded-md bg-cyan-600 p-3 text-xl text-white">
                    <p>
                        All fields with an asterisk need to be filled in. BBCode
                        can be used in text area fields.
                    </p>
                </div>
                <NewCharacterForm />
            </div>
        </>
    );
}
