import React, { ChangeEvent, FC } from "react";
import { Option } from '@/types/Option';
import { Post } from "@/types/Post";

interface MySelectProps{
    value: string
    onChange: (e: keyof Post) => void
    options: Option[]
    defaultValue: string
}

export const MySelect: FC<MySelectProps> = ({options,  defaultValue, value, onChange}) => {
    return (
        <select
            value={value}
            onChange={event => onChange(event.target.value as keyof Post)}
        >
            <option disabled value=''>{defaultValue}</option>
            {options.map(option => 
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}

        </select>
    );
}