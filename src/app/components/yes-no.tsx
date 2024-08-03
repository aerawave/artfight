"use client";

import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";

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
        <RadioGroup
            id={props.id}
            name={props.name}
            value={value}
            onValueChange={(value) => onChange(value as YesNoType)}
        >
            <input
                name={props.name}
                value={value}
                readOnly
                hidden
                form={props.form}
            />
            <RadioGroupItem
                value="yes"
                className="p-2 rounded-l-lg border-white/10 border-2 boder-r-0  hover:bg-white/5 data-[state=checked]:bg-white/15 uppercase"
            >
                Yes
            </RadioGroupItem>
            <RadioGroupItem
                value="no"
                className="p-2 rounded-r-lg border-white/10 border-2 boder-r-0  hover:bg-white/5 data-[state=checked]:bg-white/15 uppercase"
            >
                No
            </RadioGroupItem>
        </RadioGroup>
    );
}
