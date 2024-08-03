"use client";

import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import React, { useState } from "react";

export type YesNoType = "yes" | "no";
export const YesNoValues = (): string[] => ["yes", "no"];

type YesNoProps = {
    id?: string;
    name?: string;
    value?: YesNoType;
    onChange?: (value: YesNoType) => void;
    form?: string;
};

export default function YesNo(props: YesNoProps) {
    const [value, setValue] = useState(props.value);

    const onChange = (value: YesNoType) => {
        setValue(value);
        if (props.onChange) {
            props.onChange(value);
        }
    };

    return (
        <ToggleGroup
            id={props.id}
            type="single"
            value={value}
            onValueChange={(value) => onChange(value as YesNoType)}
        >
            <ToggleGroupItem
                value="yes"
                className="p-2 rounded-l-lg border-white/10 border-2 boder-r-0  hover:bg-white/5 data-[state=on]:bg-white/15 uppercase"
            >
                Yes
            </ToggleGroupItem>
            <ToggleGroupItem
                value="no"
                className="p-2 rounded-r-lg border-white/10 border-2 boder-r-0  hover:bg-white/5 data-[state=on]:bg-white/15 uppercase"
            >
                No
            </ToggleGroupItem>
        </ToggleGroup>
    );
}
