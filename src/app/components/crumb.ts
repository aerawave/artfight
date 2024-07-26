import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export type Crumb = {
    icon?: IconProp;
    label: React.ReactNode;
    href: string;
};

export const HomeCrumb: Crumb = {
    icon: faHome,
    label: "Home",
    href: "/",
};
