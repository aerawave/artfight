"use server";
import React from "react";
import ViewCharacterPage from "./[tab]/page";

export default async function ViewCharacterBasePage(props: {
    params: { username: string; character_id: string | number; tab: string };
}) {
    return <ViewCharacterPage {...props} />;
}
