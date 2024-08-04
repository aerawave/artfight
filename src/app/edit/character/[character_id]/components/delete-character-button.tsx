"use client";

import React, { useState } from "react";
import Icon from "@/app/components/icon";
import { faTrash } from "@/app/components/icons";
import {
    Dialog,
    DialogTrigger,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogTitle,
    DialogClose,
    DialogDescription,
} from "@radix-ui/react-dialog";

export default function DeleteCharacterButton(props: {
    characterName: string;
    onConfirm?: () => void;
}) {
    const [delete_confirm, setDeleteConfirm] = useState(false);

    const tryDelete = () => {
        if (!delete_confirm) {
            setDeleteConfirm(true);
            return;
        }
        if (props.onConfirm) {
            props.onConfirm();
        }
    };

    return (
        <Dialog onOpenChange={() => setDeleteConfirm(false)}>
            <DialogTrigger asChild>
                <button className="button-red text-gray-200">
                    <Icon icon={faTrash.fas} />
                    <span>Delete character</span>
                </button>
            </DialogTrigger>
            <DialogPortal>
                <DialogOverlay className="bg-black/50 fixed inset-0" />
                <DialogContent className="p-4 bg-white rounded-xl fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] text-black">
                    <DialogTitle className="text-2xl font-bold">
                        Confirm Delete
                    </DialogTitle>
                    <DialogDescription>
                        <p>
                            Are you sure that you want to delete{" "}
                            {props.characterName}? This action cannot be undone.
                        </p>
                    </DialogDescription>
                    <div className="flex flex-row justify-between mt-4">
                        {delete_confirm ? (
                            <button
                                className="rounded-lg bg-red-900 text-white py-2 px-4 flex flex-row justify-center items-center gap-2"
                                onClick={tryDelete}
                            >
                                <Icon icon={faTrash.fas} />
                                <span>Are you sure?</span>
                            </button>
                        ) : (
                            <button
                                className="rounded-lg bg-red-500 text-white py-2 px-4 flex flex-row justify-center items-center gap-2"
                                onClick={tryDelete}
                            >
                                <Icon icon={faTrash.fas} />
                                <span>Delete</span>
                            </button>
                        )}
                        <DialogClose asChild>
                            <button className="rounded-lg bg-gray-300 text-gray-700 py-2 px-4">
                                Cancel
                            </button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
}
