"use client";

import React from "react";

import Icon from "../icon";
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
    data: NavLinkData;
    isSub?: boolean;
}

export default function NavLink({ data: link, isSub }: NavLinkProps) {
    if (link === "divider")
        return (
            <li className="unpadded">
                <hr />
            </li>
        );

    const label = (
        <>
            {link.icon && <Icon icon={link.icon} className="mr-1" />}
            {link.label}
        </>
    );

    if (link.subs && link.subs.length > 0) {
        if (isSub) {
            return (
                <li>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="link">
                            {label}
                            <Icon icon={faCaretDown.fas} />
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent
                                className="sub navigation-dropdown"
                                asChild
                            >
                                <ul className="mt-0">
                                    {link.subs.map((sub, i) => (
                                        <NavLink key={i} data={sub} isSub />
                                    ))}
                                </ul>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </li>
            );
        }
        return (
            <li>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className="link">
                        {label}
                        <Icon icon={faCaretDown.fas} />
                    </DropdownMenuTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuContent
                            className="navigation-dropdown"
                            asChild
                        >
                            <ul>
                                {link.subs.map((sub, i) => (
                                    <NavLink key={i} data={sub} isSub />
                                ))}
                            </ul>
                        </DropdownMenuContent>
                    </DropdownMenuPortal>
                </DropdownMenu>
            </li>
        );
    }

    if (link.href === undefined) return <li className="label">{label}</li>;

    return (
        <li>
            <Link href={link.href} className="link">
                {label}
            </Link>
        </li>
    );
}
