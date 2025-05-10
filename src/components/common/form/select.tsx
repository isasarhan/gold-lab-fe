import React, { FC } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface FormSelectProps {
    control: Control<any>
    name: string
    title: string
    placeholder: string
    options: { label: string, value: string }[]
}

const FormSelect: FC<FormSelectProps> = ({ control, name, title, placeholder, options }) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    <FormLabel>{title}</FormLabel>
                    <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value} >
                            <FormControl className='w-full'>
                                <SelectTrigger>
                                    <SelectValue placeholder={placeholder} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {options.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormSelect;