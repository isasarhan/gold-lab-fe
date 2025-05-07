import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { MultiSelect } from '@/components/ui/multi-select';
import React, { FC } from 'react';
import { Control } from 'react-hook-form';

export interface FormMultiSelectProp {
    control: Control<any>
    name: string
    title: string
    placeholder: string
    options: any[]
}
const FormMultiSelect: FC<FormMultiSelectProp> = ({ control, name, title, placeholder, options }) => {
    return (

        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1 w-full">
                    <FormLabel>{title}</FormLabel>
                    <FormControl>
                        <MultiSelect
                            selected={field.value}
                            options={options}
                            onChange={field.onChange}
                            placeholder={placeholder}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormMultiSelect;