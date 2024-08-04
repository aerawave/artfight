"use server";

import React from "react";
import { clsx } from "../util";

type BreadcrumbProps = {
    className?: string;
    children: React.ReactNode | React.ReactNode[];
    seperator?: React.ReactNode;
};

export async function Breadcrumb(props: BreadcrumbProps) {
    const seperator = props.seperator ?? <>/</>;

    const children: React.ReactNode[] = [];

    if (props.children instanceof Array) {
        children.push(props.children[0]);

        for (let i = 1; i < props.children.length; i++) {
            children.push(seperator);
            children.push(props.children[i]);
        }
    } else {
        children.push(props.children);
    }

    return (
        <div className={clsx("breadcrumbs", props.className)}>{children}</div>
    );
}
