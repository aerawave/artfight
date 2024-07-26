"use server";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import React from "react";

export type TabData = {
    icon?: IconProp;
    key: string;
    label: React.ReactNode;
    content: React.ReactNode;
};

export type TabsProps = {
    tabs: TabData[];
    groupClass?: string;
    listClass?: string;
    class?: string;
    panelListClass?: string;
    panelClass?: string;
};

export default async function Tabs(props: TabsProps) {
    return (
        <TabGroup className={props.groupClass ?? "tab-group"}>
            <TabList className={props.listClass ?? "tab-list"}>
                {props.tabs.map((tab) => (
                    <Tab key={tab.key} className={props.class ?? "tab"}>
                        {tab.label}
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
