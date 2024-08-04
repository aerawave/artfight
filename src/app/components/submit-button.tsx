"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { clsx } from "../util";

type SubmitButtonProps = {
    className?: string;
    label?: string;
    children?: React.ReactNode | ((pending: boolean) => React.ReactNode);
};

export default function SubmitButton(props: SubmitButtonProps) {
    const { pending } = useFormStatus();
    return (
        <button
            className={clsx(
                "p-4 bg-cyan-500 rounded-lg m-4 text-white flex flex-row gap-2 justify-center items-center disabled:bg-cyan-500/25",
                props.className
            )}
            disabled={pending}
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
