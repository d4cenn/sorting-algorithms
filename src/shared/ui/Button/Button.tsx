import {FC, PropsWithChildren} from "react";
import styles from './Button.module.scss'
import classNames from "classnames";

interface ButtonPropsType {
    isDisabled?: boolean
    onClick(): void
}

export const Button: FC<PropsWithChildren<ButtonPropsType>> = ({children, isDisabled, onClick}) => {
    return <button className={classNames(styles.Button, {
        [styles.Button_isDisabled]: isDisabled
    })} onClick={onClick} disabled={isDisabled}>{children}</button>
}