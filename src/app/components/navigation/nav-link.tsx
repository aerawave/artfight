"use client";

import React from "react";

import Icon from "../icon";
import { clsx } from "@/app/util";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuPortal,
    DropdownMenuContent,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from "@radix-ui/react-dropdown-menu";
import { faCaretDown, IconType } from "../icons";

export type NavLinkData =
    | {
          href?: string;
          label: React.ReactNode;
          icon?: IconType;
          subs?: NavLinkData[];
      }
    | "divider";

interface NavLinkProps {
    className?: string;
    data: NavLinkData;
    isSub?: boolean;
}

export default function NavLink({
    className,
    data: link,
    isSub,
}: NavLinkProps) {
    if (link === "divider")
        return <hr className={`my-2 border-gray-700 ${className}`} />;

    const label = (
        <>
            {link.icon && <Icon icon={link.icon} className="mr-1" />}
            {link.label}
        </>
    );

    if (link.subs && link.subs.length > 0) {
        if (isSub) {
            return (
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger
                        className={clsx(
                            "cursor-pointer flex flex-row gap-1 items-center",
                            className
                        )}
                    >
                        {label}
                        <Icon icon={faCaretDown.fas} />
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent className="rounded-md bg-gray-900 py-2">
                            {link.subs.map((sub, i) => (
                                <NavLink
                                    key={i}
                                    data={sub}
                                    className="block px-8"
                                    isSub
                                />
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
            );
        }
        return (
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger
                    className={clsx(
                        "cursor-pointer flex flex-row gap-1 items-center",
                        className
                    )}
                >
                    {label}
                    <Icon icon={faCaretDown.fas} />
                </DropdownMenuTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuContent className="rounded-md bg-gray-900 py-2 mt-3">
                        {link.subs.map((sub, i) => (
                            <NavLink
                                key={i}
                                data={sub}
                                className="block px-8"
                                isSub
                            />
                        ))}
                    </DropdownMenuContent>
                </DropdownMenuPortal>
            </DropdownMenu>
        );
    }

    if (link.href === undefined)
        return (
            <div
                className={`text-gray-400 cursor-default my-2 uppercase ${className}`}
            >
                {label}
            </div>
        );

    return (
        <Link
            href={link.href}
            className={clsx(
                "cursor-pointer py-0.5",
                className,
                isSub && "hover:bg-gray-400"
            )}
        >
            {label}
        </Link>
        // <Link
        //     href={link.href}
        //     className={`cursor-pointer py-0.5 ${className} ${
        //         isSub ? "hover:bg-gray-400" : ""
        //     }`}
        // >
        //     {label}
        // </Link>
    );
}
