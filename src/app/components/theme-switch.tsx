"use client";

import React, { useEffect } from "react";
import { useTheme } from "../contexts/theming";
import { Switch, SwitchThumb } from "@radix-ui/react-switch";
import Icon from "./icon";
import { faCloud, faMoon, faStar, faSun } from "./icons";
import "@/app/styles/theme-switch.css";

export default function ThemeSwitch() {
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        document.body.classList.add(theme);
    }, []);

    const switchTheme = () => {
        const new_theme = theme === "dark" ? "light" : "dark";

        document.body.classList.remove(theme);
        document.body.classList.add(new_theme);

        return setTheme(new_theme);
    };

    const is_dark = theme === "dark";

    return (
        <Switch
            className="theme-switch"
            onCheckedChange={switchTheme}
            checked={is_dark}
        >
            <div className="background">
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
