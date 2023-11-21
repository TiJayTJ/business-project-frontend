import React, { ChangeEvent, FC, PropsWithChildren } from 'react'
import classes from "./MyInput.module.css"

interface MyInputProps extends PropsWithChildren {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    type: string
    placeholder: string
}

export const MyInput: FC<MyInputProps> = (props) => {
    return (
        <input className={classes.myInput} {...props}/>
    );
}