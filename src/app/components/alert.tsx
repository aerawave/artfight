"use client";

import React from "react";
import { Variant } from "../contexts/theming";
import "./styles/alert.css";

export default function Alert(props: {
    variant: Variant;
    children?: React.ReactNode | React.ReactNode;
}) {
    return (
        <div className={`deformat alert ${props.variant}`}>
            {props.children}
        </div>
    );
}
