import { create } from "zustand";

export const ThemeValues = Object.freeze(["dark", "light"] as const);
export type ThemeType = (typeof ThemeValues)[number];
export type Themed<T> = { [key in ThemeType]: T };

export type ThemeContext = {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
};

export const DEFAULT_THEME: ThemeType = "dark";

export const useTheme = create<ThemeContext>((set) => ({
    theme: DEFAULT_THEME,
    setTheme: (theme: ThemeType) => {
        for (const theme of ThemeValues) {
            document.documentElement.classList.remove(theme);
        }
        document.documentElement.classList.add(theme);
        return set({ theme });
    },
}));

export const VariantVariants = Object.freeze([
    "main",
    "dark",
    "light",
] as const);

export const Variants = Object.freeze([
    "default",
    "primary",
    "secondary",
    "info",
    "warning",
    "danger",
    "success",
] as const);

export type Variant =
    | (typeof Variants)[number]
    | `${(typeof Variants)[number]} ${(typeof VariantVariants)[number]}`
    | `custom:${string}`;

export type Varianted<T> = Record<Variant, Themed<T>> & { default: Themed<T> };
