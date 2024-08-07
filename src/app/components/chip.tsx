"use client";

import React from "react";
import { Variant } from "../contexts/theming";

import "./styles/chip.css";

export default function Chip(props: {
    variant: Variant;
    children?: React.ReactNode | React.ReactNode[];
}) {
    return (
        <div
            className={`chip ${
                props.variant.indexOf("custom:") === 0
                    ? props.variant.substring(7)
                    : props.variant
            }`}
        >
            {props.children}
        </div>
    );
}
