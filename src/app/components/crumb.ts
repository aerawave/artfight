import { faHouse, IconType } from "./icons";

export type Crumb = {
    icon?: IconType;
    label: React.ReactNode;
    href: string;
};

export const HomeCrumb: Crumb = {
    icon: faHouse.fas,
    label: "Home",
    href: "/",
};
