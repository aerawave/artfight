export function clsx(
    base: string,
    ...extra: (string | false | undefined)[]
): string {
    extra = extra.filter((v) => v);

    return `${base}${extra.length ? ` ${extra.join(" ")}` : ""}`;
}
