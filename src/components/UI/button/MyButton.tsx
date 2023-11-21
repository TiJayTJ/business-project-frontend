import React, { MouseEvent, FC, PropsWithChildren } from 'react'
import classes from './MyButton.module.css'

interface MyButtonProps extends PropsWithChildren {
    onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

export const MyButton: FC<MyButtonProps> = ({children, ...props}: MyButtonProps) => {

    return (
        <button className = {classes.myBtn} {...props}>
            {children}
        </button>
    );
}