import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import React, { FC } from 'react';
import { Control } from 'react-hook-form';

export interface FormTextAreaProps extends React.ComponentProps<"textarea">{
    control: Control<any>
    name: string
    title: string
    placeholder: string
}
const FormTextArea: FC<FormTextAreaProps> = ({ control, name, title, placeholder }) => {
    return (
        <FormField
        control={control}
        name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{title}</FormLabel>
                    <FormControl>
                        <Textarea placeholder={placeholder} className="resize-none min-h-[80px]" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormTextArea;