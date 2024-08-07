"use client";

import React, { useEffect, useState } from "react";
import { ThemeType, ThemeValues, useTheme } from "../contexts/theming";
import { Switch, SwitchThumb } from "@radix-ui/react-switch";
import Icon from "./icon";
import { faCloud, faFloppyDisk, faMoon, faStar, faSun } from "./icons";
import "./styles/theme-switch.css";
import SubmitButton from "./submit-button";

export default function ThemeSwitch(props: {
    defaultTheme?: ThemeType | null;
    onThemeChange?: (theme: ThemeType) => void;
}) {
    const local_theme = localStorage.getItem("site_theme") as ThemeType | null;

    const [default_theme, setDefaultTheme] = useState(props.defaultTheme);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        if (local_theme) {
            setTheme(local_theme);
        } else if (default_theme) {
            setTheme(default_theme);
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

    const switchTheme = () => {
        const new_theme = theme === "dark" ? "light" : "dark";
        setTheme(new_theme);

        localStorage.setItem("site_theme", new_theme);
    };

    const saveTheme = () => {
        if (props.onThemeChange) {
            props.onThemeChange(theme);
            setDefaultTheme(theme);
        }
    };

    const is_dark = theme === "dark";

    return (
        <div className="theme-block">
            {theme !== default_theme && (
                <form action={saveTheme}>
                    <SubmitButton>
                        {(pending) =>
                            !pending ? (
                                <>
                                    <Icon icon={faFloppyDisk.fas} />
                                    <span>Save theme</span>
                                </>
                            ) : (
                                <i className="spinner" />
                            )
                        }
                    </SubmitButton>
                </form>
            )}
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
        </div>
    );
}
