import { z } from "zod";

const yes_no_values = ["yes", "no"];

const is_yes_no = (value: string) => yes_no_values.includes(value);
const from_yes_no = (value: string) => value === "yes";

export const yes_no = () =>
    z
        .string({ message: "Required" })
        .refine(is_yes_no, { message: "Required" })
        .transform(from_yes_no);
