"use client";

import React from "react";

type ErrorListProps = {
    errors?: string[];
};

export function ErrorList(props: ErrorListProps) {
    const errors = props.errors;

    if (!errors?.length) {
        return <></>;
    }
    return (
        <ul className="text-red-500 mt-1 text-sm">
            {errors.map((err, i) => (
                <li key={i}>* {err}</li>
            ))}
        </ul>
    );
}
