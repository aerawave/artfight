export type IconSource = "far" | "fas" | "fab";

export type IconTypeBase =
    | "fa-house"
    | "fa-discord"
    | "fa-circle-question"
    | "fa-cart-shopping"
    | "fa-magnifying-glass"
    | "fa-plus"
    | "fa-caret-down"
    | "fa-bell"
    | "fa-bookmark"
    | "fa-pencil"
    | "fa-eye"
    | "fa-check"
    | "fa-triangle-exclamation"
    | "fa-xmark"
    | "fa-eye-slash"
    | "fa-droplet"
    | "fa-teeth"
    | "fa-leaf"
    | "fa-heart"
    | "fa-asterisk"
    | "fa-chevron-down";
export type IconType = `${IconSource} ${IconTypeBase}`;

const IconSet = function <TBase extends IconTypeBase, TSrc extends IconSource>(
    base: TBase,
    allowed: TSrc[]
) {
    const variants: Partial<{ [key in TSrc]: `${key} ${TBase}` }> = {};

    for (const key of allowed) {
        variants[key] = `${key} ${base}`;
    }

    return variants as Required<typeof variants>;
};

export const faDiscord = IconSet("fa-discord", ["fab"]);
export const faQuestionCircle = IconSet("fa-circle-question", ["fas", "far"]);
export const faShoppingCart = IconSet("fa-cart-shopping", ["fas"]);
export const faMagnifyingGlass = IconSet("fa-magnifying-glass", ["fas"]);
export const faPlus = IconSet("fa-plus", ["fas"]);
export const faCaretDown = IconSet("fa-caret-down", ["fas"]);
export const faBell = IconSet("fa-bell", ["far", "fas"]);
export const faHouse = IconSet("fa-house", ["fas"]);
export const faBookmark = IconSet("fa-bookmark", ["far", "fas"]);
export const faPencil = IconSet("fa-pencil", ["fas"]);
export const faEye = IconSet("fa-eye", ["fas", "far"]);
export const faCheck = IconSet("fa-check", ["fas"]);
export const faTriangleExclamation = IconSet("fa-triangle-exclamation", [
    "fas",
]);
export const faXMark = IconSet("fa-xmark", ["fas"]);
export const faEyeSlash = IconSet("fa-eye-slash", ["fas", "far"]);
export const faDroplet = IconSet("fa-droplet", ["fas"]);
export const faTeeth = IconSet("fa-teeth", ["fas"]);
export const faLeaf = IconSet("fa-leaf", ["fas"]);
export const faHeart = IconSet("fa-heart", ["fas", "far"]);
export const faAsterisk = IconSet("fa-asterisk", ["fas"]);
export const faChevronDown = IconSet("fa-chevron-down", ["fas"]);
