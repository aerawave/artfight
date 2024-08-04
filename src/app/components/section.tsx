"use client";

import React from "react";
import { clsx } from "../util";

type SectionProps = {
    title?: React.ReactNode;
    children?: React.ReactNode;
    titleClass?: string;
    className?: string;
    contentClassName?: string;
    noContentPadding?: boolean;
};

export function Section(props: SectionProps) {
    return (
        <div
            className={clsx(
                "shadow-xl overflow-clip rounded-xl m-2 bg-white/5",
                props.className
            )}
        >
            {props.title && (
                <div
                    className={clsx(
                        "w-full p-3 rounded-t-md",
                        "title bg-white/20"
                    )}
                >
                    {props.title}
                </div>
            )}
            <div
                className={clsx(
                    "",
                    !props.noContentPadding && "p-4",
                    props.contentClassName
                )}
            >
                {props.children}
            </div>
        </div>
    );
}
