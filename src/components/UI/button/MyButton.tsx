import React, { MouseEvent, FC, PropsWithChildren } from 'react'
import classes from './MyButton.module.css'
import { Button, ButtonProps } from '@mantine/core';

interface MyButtonProps extends ButtonProps {
    onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

export const MyButton: FC<MyButtonProps> = ({...props}: MyButtonProps) => {

    return (
        <Button {...props} variant="filled" size="md" radius="md" />
    );
}