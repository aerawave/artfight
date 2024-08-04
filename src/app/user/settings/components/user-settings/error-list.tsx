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
        <ul className="error-list">
            {errors.map((err, i) => (
                <li key={i} className="error">
                    {err}
                </li>
            ))}
        </ul>
    );
}
