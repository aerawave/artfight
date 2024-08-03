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
import { Checkbox, CheckboxIndicator } from "@radix-ui/react-checkbox";

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
    const [customThemes, setCustomThemes] = useState(customThemesInitial);
    const [style, setStyle] = useState(styleInitial);
    const [state, action] = useFormState(changeSiteTheme, {});

    return (
        <Section className={className} title={<h4>Site Theme</h4>}>
            <div className="flex flex-col gap-2">
                <div>
                    {state.success ? (
                        <h5 className="text-green-400">Settings updated!</h5>
                    ) : (
                        <ErrorList errors={state.errors?.general} />
                    )}
                </div>
                <form className="flex flex-col gap-4" action={action}>
                    <div className="flex flex-row items-center">
                        <Checkbox
                            id="show_custom_themes"
                            name="show_custom_themes"
                            className="shadow-blackA4 hover:bg-violet3 flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px_black]"
                            checked={customThemes}
                            onCheckedChange={() =>
                                setCustomThemes(!customThemes)
                            }
                        >
                            <CheckboxIndicator>
                                <Icon
                                    icon={faCheck.fas}
                                    className="text-black"
                                />
                            </CheckboxIndicator>
                        </Checkbox>
                        <Label
                            htmlFor="show_custom_themes"
                            className="text-sm text-white/50 ml-2"
                        >
                            Show custom themes on user profiles by default
                        </Label>
                    </div>
                    <div className="flex flex-col">
                        <Label
                            htmlFor="dark_mode"
                            className="text-sm text-white/50"
                        >
                            Style
                        </Label>
                        <input
                            id="dark_mode"
                            hidden
                            name="dark_mode"
                            value={style}
                            readOnly
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger className="input text-left hover:bg-white/20 w-full">
                                <span className="flex flex-row justify-between">
                                    <span>
                                        {
                                            theme_entries.find(
                                                (entry) => entry.key === style
                                            )?.label
                                        }
                                    </span>
                                    <Icon
                                        icon={faChevronDown.fas}
                                        className="mx-2 mt-1"
                                    />
                                </span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="flex flex-col rounded-lg bg-white/5 items-start overflow-clip cursor-default">
                                {theme_entries.map((entry) => (
                                    <DropdownMenuItem
                                        key={entry.key}
                                        className="p-2 hover:bg-white/20 text-left w-full"
                                        onClick={() => setStyle(entry.key)}
                                    >
                                        {entry.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <button
                        className="self-end rounded-lg bg-cyan-600 p-2"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </Section>
    );
}
