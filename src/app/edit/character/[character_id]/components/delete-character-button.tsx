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
                <button className="button-red">
                    <Icon icon={faTrash.fas} />
                    <span>Delete character</span>
                </button>
            </DialogTrigger>
            <DialogPortal>
                <DialogOverlay className="dialog-overlay" />
                <DialogContent className="dialog-content">
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
                                className="button-red-dark"
                                onClick={tryDelete}
                            >
                                <Icon icon={faTrash.fas} />
                                <span>Are you sure?</span>
                            </button>
                        ) : (
                            <button
                                className="button-red-dark"
                                onClick={tryDelete}
                            >
                                <Icon icon={faTrash.fas} />
                                <span>Delete</span>
                            </button>
                        )}
                        <DialogClose asChild>
                            <button className="button-gray">Cancel</button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
}
