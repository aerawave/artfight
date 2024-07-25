"use server";

import React from "react";
import { User } from "@clerk/nextjs/server";
import ChangePassword from "./user-settings/change-password";
import ChangeAvatar from "./user-settings/change-avatar";
import ChangeEmail from "./user-settings/change-email";
import ChangeSiteTheme from "./user-settings/site-theme";
import { getUserProperties } from "@/app/actions/user";

type UserSettingsProps = {
    user: User;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function UserSettings({ user }: UserSettingsProps) {
    const { show_custom_themes, dark_mode } = await getUserProperties(user.id, [
        "show_custom_themes",
        "dark_mode",
    ]);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ChangePassword />
            <ChangeAvatar imageUrl={user.imageUrl} />
            {user.primaryEmailAddress?.emailAddress ? (
                <ChangeEmail email={user.primaryEmailAddress?.emailAddress} />
            ) : (
                <div>...</div>
            )}
            <ChangeSiteTheme
                customThemesInitial={show_custom_themes === "true"}
                styleInitial={
                    (dark_mode as "dark" | "light" | null | undefined) ?? "dark"
                }
            />
        </div>
    );
}
