"use client";

import React from "react";
import { clsx } from "../util";
import { IconType } from "./icons";

type IconProps = {
    icon: IconType;
    className?: string;
};

export default function Icon(props: IconProps) {
    return <i className={clsx(props.icon, props.className)} />;
}
