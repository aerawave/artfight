import { redirect, RedirectType } from "next/navigation";

export function clsx(
    base: string,
    ...extra: (string | false | undefined | null)[]
): string {
    extra = extra.filter((v) => v);

    return `${base}${extra.length ? ` ${extra.join(" ")}` : ""}`;
}

type RedirectArgs = {
    url?: string;
    backup: string;
    type?: RedirectType;
};

export function tryRedirect({ url, backup, type }: RedirectArgs) {
    if (url && url.startsWith("/")) {
        return redirect(url, type);
    } else {
        return redirect(backup, type);
    }
}
