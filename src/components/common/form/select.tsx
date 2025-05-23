import React, { FC } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface FormSelectProps {
    control: Control<any>
    name: string
    title: string
    defaultValue?: any
    placeholder: string
    options: { label: string, value: any }[]
}

const FormSelect: FC<FormSelectProps> = ({ control, name, title, placeholder, options, defaultValue }) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1 ">
                    <FormLabel className='p-0 m-0 gap-0'>{title}</FormLabel>
                    <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={defaultValue || field.value} >
                            <FormControl className='w-full'>
                                <SelectTrigger>
                                    <SelectValue placeholder={placeholder} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent className='gap-0'>
                                {options.map((option) => (
                                    <SelectItem key={option.value} value={option.value} className='p-0 gap-0 m-0'>
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