"use client";

import { changeSiteTheme } from "@/app/actions";
import { Card } from "@/app/components/card";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { ErrorList } from "./error-list";
import { Label } from "@radix-ui/react-label";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Icon from "@/app/components/icon";
import { faCheck, faChevronDown } from "@/app/components/icons";
import { CheckboxIndicator } from "@radix-ui/react-checkbox";
import CheckboxFix from "@/app/components/checkbox-fix";
import SubmitButton from "@/app/components/submit-button";
import { DEFAULT_THEME, useTheme } from "@/app/contexts/theming";

type SiteTheme = "auto" | "dark" | "light";

type ChangeSiteThemeProps = {
    className?: string;
    customThemesInitial: boolean;
    styleInitial: SiteTheme;
};

const theme_entries: { key: SiteTheme; label: string }[] = [
    { key: "auto", label: "Same as Browser" },
    { key: "dark", label: "Dark Mode" },
    { key: "light", label: "Light Mode" },
];

export default function ChangeSiteTheme({
    className,
    customThemesInitial,
    styleInitial,
}: ChangeSiteThemeProps) {
    const [style, setStyle] = useState(styleInitial);
    const [state, action] = useFormState(changeSiteTheme, {});
    const { setTheme } = useTheme();

    const submit = (data: FormData) => {
        action(data);
        if (style === "auto") {
            localStorage.removeItem("site_theme");
            setTheme(DEFAULT_THEME);
        } else {
            localStorage.setItem("site_theme", style);
            setTheme(style);
        }
    };

    return (
        <Card className={className} title={<h4>Site Theme</h4>}>
            <div className="flex-col-2">
                <div>
                    {state.success ? (
                        <h5 className="text-green-400">Settings updated!</h5>
                    ) : (
                        <ErrorList errors={state.errors?.general} />
                    )}
                </div>
                <form className="flex-col-4" action={submit}>
                    <div className="flex-row-2-center">
                        <CheckboxFix
                            id="show_custom_themes"
                            name="show_custom_themes"
                            defaultChecked={customThemesInitial}
                        >
                            <CheckboxIndicator>
                                <Icon
                                    icon={faCheck.fas}
                                    className="text-black"
                                />
                            </CheckboxIndicator>
                        </CheckboxFix>
                        <Label htmlFor="show_custom_themes">
                            Show custom themes on user profiles by default
                        </Label>
                    </div>
                    <div className="flex-col-2 items-start">
                        <Label htmlFor="site_theme">Site Theme</Label>
                        <input
                            id="site_theme"
                            hidden
                            name="site_theme"
                            value={style}
                            readOnly
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger className="input dropdown">
                                <span className="dropdown-button">
                                    <span>
                                        {
                                            theme_entries.find(
                                                (entry) => entry.key === style
                                            )?.label
                                        }
                                    </span>
                                    <Icon icon={faChevronDown.fas} />
                                </span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="dropdown-menu"
                                sideOffset={4}
                            >
                                {theme_entries.map((entry) => (
                                    <DropdownMenuItem
                                        key={entry.key}
                                        className="dropdown-item"
                                        onClick={() => setStyle(entry.key)}
                                    >
                                        <label>{entry.label}</label>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="self-end">
                        <SubmitButton />
                    </div>
                </form>
            </div>
        </Card>
    );
}
