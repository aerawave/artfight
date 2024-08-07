"use server";

import React from "react";
import { User } from "@clerk/nextjs/server";
import ChangePassword from "./user-settings/change-password";
import ChangeAvatar from "./user-settings/change-avatar";
import ChangeEmail from "./user-settings/change-email";
import ChangeSiteTheme from "./user-settings/site-theme";
import { checkUsernameExists, getUserProperties } from "@/app/actions/user";
import ChangeUsername from "./user-settings/change-username";
import ChangeImageFilters from "./user-settings/change-image-filters";
import "./user-settings.css";

type UserSettingsProps = {
    user: User;
};

export default async function UserSettings({ user }: UserSettingsProps) {
    const { show_custom_themes, dark_mode } = await getUserProperties(user.id, [
        "show_custom_themes",
        "dark_mode",
    ]);
    return (
        <div className="form-grid">
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
            {user.username && (
                <ChangeUsername
                    username={user.username}
                    checkAvailability={async (username) => {
                        "use server";
                        if (username.trim().length < 4) {
                            return [
                                false,
                                `Username must be at least 4 characters long.`,
                            ];
                        }
                        if (username.trim().length > 64) {
                            return [
                                false,
                                `Username must be at most 64 characters long.`,
                            ];
                        }

                        const exists = await checkUsernameExists(username);

                        if (exists) {
                            return [
                                !exists,
                                `Username '${username}' is not available.`,
                            ];
                        } else
                            return [
                                !exists,
                                `Username '${username}' is available!`,
                            ];
                    }}
                />
            )}
            <ChangeImageFilters />
        </div>
    );
}
