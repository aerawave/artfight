"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IconType } from "./icons";
import {
    Tabs as TabsBase,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@radix-ui/react-tabs";
import { clsx } from "../util";

export type TabData = {
    icon?: IconType;
    key: string;
    label: React.ReactNode;
    content?: React.ReactNode;
    href?: string;
} & (
    | {
          content: React.ReactNode;
      }
    | {
          href: string;
      }
);

export type TabsProps = {
    tabs: TabData[];
    activeTab?: string;
    groupClass?: string;
    listClass?: string;
    tabClassName?: string;
    panelListClass?: string;
    panelClass?: string;
};

export default function Tabs(props: TabsProps) {
    const [active_tab] = useState(props.activeTab ?? props.tabs[0].key);
    return (
        <TabsBase
            className={clsx("tab-group", props.groupClass)}
            defaultValue={active_tab}
        >
            <TabsList className={clsx("tab-list", props.listClass)}>
                {props.tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.key}
                        className={clsx("tab", props.tabClassName)}
                        value={tab.key}
                    >
                        {tab.href && active_tab !== tab.key ? (
                            <Link
                                href={tab.href}
                                shallow
                                className="tab-content"
                            >
                                {tab.label}
                            </Link>
                        ) : (
                            <div className="tab-content">{tab.label}</div>
                        )}
                    </TabsTrigger>
                ))}
            </TabsList>
            {props.tabs.map((tab) => (
                <TabsContent
                    key={tab.key}
                    value={tab.key}
                    className={clsx("tab-panel", props.panelClass)}
                >
                    {tab.content}
                </TabsContent>
            ))}
        </TabsBase>
    );
}
