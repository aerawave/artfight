"use client";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Link from "next/link";
import React, { useState } from "react";

export type TabData = {
    icon?: IconProp;
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
    const [active_tab_index, setActiveTabIndex] = useState(
        Math.max(
            0,
            props.tabs.findIndex((tab) => tab.key === props.activeTab)
        )
    );
    return (
        <TabGroup
            className={props.groupClass ?? "tab-group"}
            selectedIndex={active_tab_index}
            onChange={setActiveTabIndex}
        >
            <TabList className={props.listClass ?? "tab-list"}>
                {props.tabs.map((tab, i) => (
                    <Tab key={tab.key} className={props.tabClassName ?? "tab"}>
                        {tab.href && active_tab_index !== i ? (
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
                    </Tab>
                ))}
            </TabList>
            <TabPanels className={props.panelListClass ?? "tab-panel-list"}>
                {props.tabs.map((tab) => (
                    <TabPanel
                        key={tab.key}
                        className={props.panelClass ?? "tab-panel"}
                    >
                        {tab.content}
                    </TabPanel>
                ))}
            </TabPanels>
        </TabGroup>
    );
}
