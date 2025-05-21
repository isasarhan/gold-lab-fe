import React, { FC, useState } from 'react';

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
import { Check, ChevronsUpDown } from 'lucide-react';

export interface AutocompleteProps {
    className?: string
    options: { label: string, value: any }[]
    onChange?(v: any): void
}

const Autocomplete: FC<AutocompleteProps> = ({ options, onChange }) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                >
                    {value
                        ? options.find((option) => option.label === value)?.label
                        : "Select option..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0">
                <Command>
                    <CommandInput placeholder="Search option..." />
                    <CommandList>
                        <CommandEmpty>No option found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.label}
                                    onSelect={(v) => {
                                        if (onChange)
                                            onChange(options.find((option) => option.label === v)?.value)
                                        setValue(v)
                                    }}
                                >
                                    {option.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            option.value === value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default Autocomplete;