"use client";

import React from "react";
import { clsx } from "../util";
import "./styles/card.css";
import { Variant } from "../contexts/theming";

type SectionProps = {
    title?: React.ReactNode;
    children?: React.ReactNode;
    variant?: Variant;
    className?:
        | {
              card?: string;
              title?: string;
              body?: string;
          }
        | string;
    contentClassName?: string;
    noContentPadding?: boolean;
};

export function Card(props: SectionProps) {
    let className: string | undefined = undefined;
    let classes: { card?: string; title?: string; body?: string } | undefined =
        undefined;

    if (typeof props.className === "string") {
        className = props.className;
    } else {
        classes = props.className;
    }

    return (
        <div
            className={clsx(
                "card",
                props.variant?.split(" ").join("-"),
                props.variant && "varianted",
                className ? className : classes?.card
            )}
        >
            {props.title && (
                <div className={clsx("title", classes?.title)}>
                    {props.title}
                </div>
            )}
            <div
                className={clsx(
                    "body",
                    props.noContentPadding && "no-content-padding",
                    classes?.body
                )}
            >
                {props.children}
            </div>
        </div>
    );
}
