"use client"

import React from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription  } from './ui/dialog'
import { Button } from "./ui/button";
import { BsFileEarMarkPlus } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { Label } from "./ui/label";
import {
    Form,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";

export default function CreateFormBtn() {
    return (
        <Dialog>
            <DialogTrigger asChild>
             <Button> Create New Form</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create form</DialogTitle>
                    <DialogDescription>
                        Create a new form to start collecting responses
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4"></div>
            </DialogContent>
        </Dialog>
    )
}
