"use server";

import React from "react";
import { User } from "@clerk/nextjs/server";
import ChangePassword from "./user-settings/change-password";
import ChangeAvatar from "./user-settings/change-avatar";
import ChangeEmail from "./user-settings/change-email";

type UserSettingsProps = {
    user: User;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function UserSettings({ user }: UserSettingsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ChangePassword />
            <ChangeAvatar imageUrl={user.imageUrl} />
            {user.primaryEmailAddress?.emailAddress ? (
                <ChangeEmail email={user.primaryEmailAddress?.emailAddress} />
            ) : (
                <div>...</div>
            )}
        </div>
    );
}
