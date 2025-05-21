import React, { FC, Fragment, useState } from 'react';
import { Control } from 'react-hook-form';
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Autocomplete from '@/components/ui/autocomplete';
export interface FormAutocompleteProps {
    control: Control<any>
    name: string
    title: string
    placeholder: string
    className?: string
    options: { label: string, value: any }[]
}

const FormAutocomplete: FC<FormAutocompleteProps> = ({ options, control, name, className, title, placeholder, ...props }) => {

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn(className, "flex-1 w-full p-0 m-0")}>
                    <FormLabel>{title}</FormLabel>
                    <FormControl>
                        <Autocomplete options={options} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />)
};

export default FormAutocomplete;
