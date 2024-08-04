"use client";

import { changeSiteTheme } from "@/app/actions";
import { Section } from "@/app/components/section";
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

type SiteTheme = "dark" | "light";

type ChangeSiteThemeProps = {
    className?: string;
    customThemesInitial: boolean;
    styleInitial: SiteTheme;
};

const theme_entries: { key: SiteTheme; label: string }[] = [
    { key: "dark", label: "Dark Fight (WIP)" },
    { key: "light", label: "Light Fight" },
];

export default function ChangeSiteTheme({
    className,
    customThemesInitial,
    styleInitial,
}: ChangeSiteThemeProps) {
    const [style, setStyle] = useState(styleInitial);
    const [state, action] = useFormState(changeSiteTheme, {});

    return (
        <Section className={className} title={<h4>Site Theme</h4>}>
            <div className="flex-col-2">
                <div>
                    {state.success ? (
                        <h5 className="text-green-400">Settings updated!</h5>
                    ) : (
                        <ErrorList errors={state.errors?.general} />
                    )}
                </div>
                <form className="flex-col-4" action={action}>
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
                    <div className="flex-col-2">
                        <Label htmlFor="dark_mode">Style</Label>
                        <input
                            id="dark_mode"
                            hidden
                            name="dark_mode"
                            value={style}
                            readOnly
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger className="input text-left hover:bg-white/20 w-full">
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
                            <DropdownMenuContent className="dropdown-menu">
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
        </Section>
    );
}
