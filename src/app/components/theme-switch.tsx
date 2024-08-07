"use client";

import React, { useEffect } from "react";
import { ThemeType, ThemeValues, useTheme } from "../contexts/theming";
import { Switch, SwitchThumb } from "@radix-ui/react-switch";
import Icon from "./icon";
import { faCloud, faMoon, faStar, faSun } from "./icons";
import "./styles/theme-switch.css";

export default function ThemeSwitch(props: {
    defaultTheme?: ThemeType | null;
}) {
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        if (props.defaultTheme) {
            setTheme(props.defaultTheme);
        } else {
            let found_theme = false;
            for (const theme of ThemeValues) {
                if (document.body.classList.contains(theme)) {
                    setTheme(theme);
                    found_theme = true;
                }
            }
            if (!found_theme) {
                const preferred_theme_prop = document.documentElement
                    .computedStyleMap()
                    .get("--preferred-theme");

                if (preferred_theme_prop) {
                    const preferred_theme =
                        preferred_theme_prop.toString() as ThemeType;

                    if (ThemeValues.includes(preferred_theme)) {
                        setTheme(preferred_theme);
                    }
                }
            }
        }
    }, []);

    const switchTheme = () => setTheme(theme === "dark" ? "light" : "dark");

    const is_dark = theme === "dark";

    return (
        <Switch
            className="destyle theme-switch"
            onCheckedChange={switchTheme}
            checked={is_dark}
        >
            <div className="background">
                <Icon icon={faCloud.fas} />
                <Icon icon={faCloud.fas} />
            </div>
            <div className="background">
                <Icon icon={faStar.fas} />
                <Icon icon={faStar.fas} />
                <Icon icon={faStar.fas} />
            </div>
            <SwitchThumb className="thumb">
                <Icon icon={faSun.fas} />
                <Icon icon={faMoon.fas} />
            </SwitchThumb>
        </Switch>
    );
}
