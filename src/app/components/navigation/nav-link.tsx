"use client";

import React, { useState } from "react";

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
import {
    faCaretDown,
    faCaretRight,
    faChevronLeft,
    faXMark,
    IconType,
} from "../icons";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
} from "@radix-ui/react-dialog";
import { clsx } from "@/app/util";

import "./nav-link.css";

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
    isDropdown?: boolean | "determine";
    isSub?: boolean;
    noCaret?: boolean;
    sendClose?: () => void;
}

export default function NavLink(props: NavLinkProps) {
    const {
        data: link,
        isSub,
        isDropdown,
        noCaret,
        sendClose,
        className,
    } = props;

    // const screen_size = useScreenSize(false);

    // if (is_dropdown === "determine") {
    //     is_dropdown = screen_size >= 4;
    // }

    if (link === "divider")
        return (
            <li className="unpadded">
                <hr />
            </li>
        );

    const label = (
        <>
            {link.icon && <Icon icon={link.icon} />}
            {link.label}
        </>
    );

    if (isDropdown) {
        return renderDropdown(label, link, className, isSub, noCaret);
    } else {
        return renderDialog(label, link, className, sendClose, isSub, noCaret);
    }
}

function renderDropdown(
    label: React.ReactNode,
    link: Exclude<NavLinkData, "divider">,
    className?: string,
    is_sub?: boolean,
    no_caret?: boolean
) {
    if (link.subs && link.subs.length > 0) {
        if (is_sub) {
            return (
                <li>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger
                            className={clsx("link", className)}
                        >
                            {label}
                            {!no_caret && <Icon icon={faCaretDown.fas} />}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent asChild>
                                <ul className="sub navigation-dropdown">
                                    {link.subs.map((sub, i) => (
                                        <NavLink
                                            key={i}
                                            data={sub}
                                            isSub
                                            isDropdown
                                        />
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
                    <DropdownMenuTrigger className={clsx("link", className)}>
                        {label}
                        {!no_caret && <Icon icon={faCaretDown.fas} />}
                    </DropdownMenuTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuContent asChild>
                            <ul className="navigation-dropdown">
                                {link.subs.map((sub, i) => (
                                    <NavLink
                                        key={i}
                                        data={sub}
                                        isSub
                                        isDropdown
                                    />
                                ))}
                            </ul>
                        </DropdownMenuContent>
                    </DropdownMenuPortal>
                </DropdownMenu>
            </li>
        );
    }

    return renderSimple(label, link.href);
}

function renderDialog(
    label: React.ReactNode,
    link: Exclude<NavLinkData, "divider">,
    className?: string,
    sendClose?: () => void,
    is_sub?: boolean,
    no_caret?: boolean
) {
    if (!sendClose) {
        sendClose = () => setOpen(false);
    }

    const [open, setOpen] = useState(false);

    if (link.subs && link.subs.length > 0) {
        return (
            <li>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger className={clsx("link", className)}>
                        {label}
                        {!no_caret && <Icon icon={faCaretRight.fas} />}
                    </DialogTrigger>
                    <DialogPortal>
                        <DialogContent
                            className={clsx(
                                "navigation-dialog",
                                is_sub && "sub"
                            )}
                        >
                            <DialogTitle className="title">
                                <DialogClose asChild>
                                    <button className="button-back">
                                        <Icon icon={faChevronLeft.fas} />
                                        <h1>{link.label}</h1>
                                    </button>
                                </DialogClose>
                                <button
                                    className="button-close"
                                    onClick={sendClose}
                                >
                                    <Icon icon={faXMark.fas} />
                                </button>
                            </DialogTitle>
                            <DialogDescription asChild>
                                <ul className="content">
                                    {link.subs.map((sub, i) => (
                                        <NavLink
                                            key={i}
                                            data={sub}
                                            isSub
                                            sendClose={sendClose}
                                        />
                                    ))}
                                </ul>
                            </DialogDescription>
                        </DialogContent>
                    </DialogPortal>
                </Dialog>
            </li>
        );
    }

    return renderSimple(label, link.href);
}

function renderSimple(label: React.ReactNode, href?: string) {
    if (href === undefined) {
        return <li className="label">{label}</li>;
    }

    return (
        <li>
            <Link href={href} className="link">
                {label}
            </Link>
        </li>
    );
}
