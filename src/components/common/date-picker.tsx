'use client'
import { useState, type FC } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { FormControl } from '../ui/form';
import { Button } from '../ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { format } from "date-fns"
import { cn } from '@/lib/utils';

interface DatePickerProps {
    placeholder?: string
    onChange(valule: any): void
}

const DatePicker: FC<DatePickerProps> = ({ placeholder, onChange }) => {
    const [value, setValue] = useState()
    const handleChange = (value: any) => {
        setValue(value)
        onChange(value)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !value && "text-muted-foreground")}
                    >
                        {value ? format(value, "PPP") : <span>{placeholder}</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={value} onSelect={handleChange} initialFocus />
            </PopoverContent>
        </Popover>
    )
}

export default DatePicker;
