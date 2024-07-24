"use client";

import React from "react";

interface ChipProps {
    className?: string;
    children: React.ReactNode;
}

export default function Chip(props: ChipProps) {
    return (
        <div
            className={`inline-block rounded-lg px-1.5 text-xs ${
                props.className ? props.className : ""
            }`}
        >
            {props.children}
        </div>
    );
}
