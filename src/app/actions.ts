"use server";
import {
    changePassword,
    getCurrentUser,
    changeAvatar,
    changeEmail,
    changeSiteTheme,
    changeUsername,
    changeFilters,
} from "./actions/user-settings";
import { submitCharacter } from "./actions/submissions";

export {
    changePassword,
    getCurrentUser,
    changeAvatar,
    changeEmail,
    changeSiteTheme,
    changeUsername,
    changeFilters,
    submitCharacter,
};
