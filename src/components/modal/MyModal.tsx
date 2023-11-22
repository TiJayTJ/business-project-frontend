import React, { FC, PropsWithChildren } from 'react';
import classes from './MyModal.module.css';
import { clsx } from 'clsx';

interface MyModalProps extends PropsWithChildren{
    visible: boolean
    setVisible: (e: boolean) => void
}

export const MyModal: FC<MyModalProps> = ({children, visible, setVisible}: MyModalProps) => {

    return (
        <div className={clsx(classes.myModal, visible && classes.active)} onClick={() => setVisible(false)}>
            <div className={classes.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}