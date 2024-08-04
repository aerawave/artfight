"use client";

/*
    This component exists solely because for some reason the OOTB Radix Checkbox
    does not correctly support the `form` property.
*/
import React, { useState } from "react";
import { Checkbox } from "@radix-ui/react-checkbox";

type CheckboxFixProps = {
    id?: string;
    name?: string;
    form?: string;
    defaultChecked?: boolean;
    children?: React.ReactNode;
};

export default function CheckboxFix(props: CheckboxFixProps) {
    const [checked, setChecked] = useState<boolean>(
        props.defaultChecked ?? false
    );

    return (
        <>
            <input
                hidden
                name={props.name}
                form={props.form}
                value={checked ? "checked" : ""}
                readOnly
            />
            <Checkbox
                {...props}
                className="checkbox"
                checked={checked}
                onCheckedChange={() => setChecked(!checked)}
            />
        </>
    );
}
