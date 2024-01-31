"use client"

import React from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription  } from './ui/dialog'
import { Button } from "./ui/button";
import { BsFileEarmarkPlus } from "react-icons/bs";
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
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from 'react-hook-form';

const formSchema = z.object({
    name: z.string().min(4, "Name must be at least 4 characters"),
    description: z.string().optional(),
})

type formSchemaType = z.infer<typeof formSchema>; 

export default function CreateFormBtn() {
    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
    });

    function handleSubmit(values: formSchemaType) {
        console.log(values);
    }
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
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(handleSubmit)} >

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
 