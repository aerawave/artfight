"use client";

import React from "react";
import { clsx } from "../util";

interface ChipProps {
    className?: string;
    children: React.ReactNode;
}

export default function Chip(props: ChipProps) {
    return (
        <div
            className={clsx(
                "inline-block rounded-full px-1.5 text-xs",
                props.className
            )}
        >
            {props.children}
        </div>
    );
}
