import { create } from "zustand";

export const themes = Object.freeze(["dark", "light"] as const);
export type Theme = (typeof themes)[number];

export type ThemeContext = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

export const DEFAULT_THEME = {
    theme: "dark" as const,
};

export const useTheme = create<ThemeContext>((set) => ({
    theme: DEFAULT_THEME.theme,
    setTheme: (theme: Theme) => set({ theme }),
}));
