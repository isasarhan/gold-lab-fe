import React, { FC, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
export interface DropdownProps {
    placeholder?:string
    defaultvalue?:string
    options: { label: string, value: string, key?: string }[];
    handleDropdownChange(value: string): void
}
const Dropdown: FC<DropdownProps> = ({ options,defaultvalue,  handleDropdownChange, placeholder }) => {
    const [value, setValue] = useState(defaultvalue)
    const handleChange = (value: string) => {
        handleDropdownChange(value)
        setValue(value)
    }
    return (
        <>
            <Select value={value} onValueChange={handleChange}>
                <SelectTrigger className="min-w-40 w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {options.map(option => (
                        <SelectItem key={option.key||option.label} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    );
};

export default Dropdown;