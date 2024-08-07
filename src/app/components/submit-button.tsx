"use client";

import React from "react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
    label?: string;
    children?: React.ReactNode | ((pending: boolean) => React.ReactNode);
    disabled?: boolean;
};

export default function SubmitButton(props: SubmitButtonProps) {
    const { pending } = useFormStatus();
    return (
        <button
            className="button-blue"
            disabled={pending || props.disabled}
            {...props}
        >
            {props.children ? (
                props.children instanceof Function ? (
                    props.children(pending)
                ) : (
                    props.children
                )
            ) : !pending ? (
                props.label ?? "Submit"
            ) : (
                <i className="spinner" />
            )}
        </button>
    );
}
