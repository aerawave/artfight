"use client";

import React from "react";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export type NavLinkData =
    | {
          href?: string;
          label: React.ReactNode;
          icon?: IconProp;
          subs?: NavLinkData[];
      }
    | "divider";

interface NavLinkProps {
    className?: string;
    data: NavLinkData;
}

export default function NavLink({ className, data: link }: NavLinkProps) {
    if (link === "divider")
        return <hr className={`my-2 border-gray-700 ${className}`} />;

    const label = (
        <>
            {link.icon && <FontAwesomeIcon icon={link.icon} className="mr-1" />}
            {link.label}
        </>
    );

    if (link.subs && link.subs.length > 0)
        return (
            <Menu>
                <MenuButton className={`cursor-pointer ${className}`}>
                    {label}
                    <FontAwesomeIcon className="ml-1" icon={faCaretDown} />
                </MenuButton>
                <MenuItems
                    anchor="bottom"
                    className="rounded-md bg-gray-900 py-2"
                >
                    {link.subs.map((sub, i) => (
                        <MenuItem key={i}>
                            <NavLink data={sub} className="block px-8" />
                        </MenuItem>
                    ))}
                </MenuItems>
            </Menu>
        );

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
            className={`hover:bg-gray-400 cursor-pointer py-0.5 ${className}`}
        >
            {label}
        </Link>
    );
}
