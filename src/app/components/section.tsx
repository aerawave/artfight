"use client";

import React from "react";

type SectionProps = {
    title?: React.ReactNode;
    children?: React.ReactNode | React.ReactNode[];
    backgroundColor?: string;
    titleBackgroundColor?: string;
    className?: string;
};

export function Section(props: SectionProps) {
    return (
        <div
            className={`shadow-xl ${
                props.backgroundColor ?? "bg-white/5"
            } rounded-xl m-2`}
        >
            {props.title && (
                <div
                    className={`w-full ${
                        props.titleBackgroundColor ?? "bg-white/20"
                    } p-3 rounded-t-md`}
                >
                    {props.title}
                </div>
            )}
            <div className={`p-4 ${props.className}`}>{props.children}</div>
        </div>
    );
}
