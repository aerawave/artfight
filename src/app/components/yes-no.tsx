"use client";

import { Radio, RadioGroup } from "@headlessui/react";
import React, { useState } from "react";

type YesNoType = "yes" | "no";

type YesNoProps = {
    name?: string;
    value?: YesNoType;
    onChange?: (value: YesNoType) => void;
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
            name={props.name}
            className="cursor-pointer"
            value={value}
            onChange={onChange}
        >
            <Radio
                value="yes"
                className="p-2 rounded-l-lg border-white/10 border-2 boder-r-0  hover:bg-white/5 data-[checked]:bg-white/15 w-16 inline-block text-center"
            >
                Yes
            </Radio>
            <Radio
                value="no"
                className="p-2 rounded-r-lg border-white/10 border-2 border-l-0 hover:bg-white/5 data-[checked]:bg-white/15 w-16 inline-block text-center"
            >
                No
            </Radio>
        </RadioGroup>
    );
}
