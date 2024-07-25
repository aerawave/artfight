"use server";

import React from "react";

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
        <div className={`flex flex-row gap-2 text-sm ${props.className}`}>
            {children}
        </div>
    );
}
