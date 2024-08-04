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
            className="button-group"
        >
            <input
                name={props.name}
                value={value}
                readOnly
                hidden
                form={props.form}
            />
            <RadioGroupItem value="yes">Yes</RadioGroupItem>
            <RadioGroupItem value="no">No</RadioGroupItem>
        </RadioGroup>
    );
}
