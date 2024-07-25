"use client";

import { changeSiteTheme } from "@/app/actions";
import { Section } from "@/app/components/section";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Field,
    Input,
    Label,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/react";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { ErrorList } from "./error-list";

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
            <div>
                {state.success ? (
                    <h5 className="text-green-400">Settings updated!</h5>
                ) : (
                    <ErrorList errors={state.errors?.general} />
                )}
            </div>
            <form className="flex flex-col gap-4" action={action}>
                <Field className="flex flex-row">
                    <Label className="text-sm text-white/50">
                        Show custom themes on user profiles by default
                    </Label>
                    <Input
                        type="checkbox"
                        className="ml-2"
                        name="show_custom_themes"
                        checked={customThemes}
                        onChange={() => setCustomThemes(!customThemes)}
                    />
                </Field>
                <Field className="flex flex-col">
                    <Label className="text-sm text-white/50">Style</Label>
                    <input
                        hidden
                        name="dark_mode"
                        value={style}
                        onChange={() => {}}
                    />
                    <Menu>
                        <MenuButton className="input text-left hover:bg-white/20">
                            <span className="flex flex-row justify-between">
                                <span>
                                    {
                                        theme_entries.find(
                                            (entry) => entry.key === style
                                        )?.label
                                    }
                                </span>
                                <FontAwesomeIcon
                                    icon={faCaretDown}
                                    className="mx-2 mt-1"
                                />
                            </span>
                        </MenuButton>
                        <MenuItems
                            anchor="bottom start"
                            className="flex flex-col rounded-lg bg-white/5"
                        >
                            {theme_entries.map((entry) => (
                                <MenuItem key={entry.key}>
                                    <Button
                                        onClick={() => setStyle(entry.key)}
                                        className="p-2 hover:bg-white/20 text-left"
                                    >
                                        {entry.label}
                                    </Button>
                                </MenuItem>
                            ))}
                        </MenuItems>
                    </Menu>
                </Field>
                <Button
                    className="self-end rounded-lg bg-cyan-600 p-2"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </Section>
    );
}
