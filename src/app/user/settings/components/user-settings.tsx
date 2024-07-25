"use server";

import React from "react";
import { User } from "@clerk/nextjs/server";
import ChangePassword from "./user-settings/change-password";

type UserSettingsProps = {
    user: User;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function UserSettings({ user }: UserSettingsProps) {
    return (
        <>
            <ChangePassword />
        </>
    );
}
