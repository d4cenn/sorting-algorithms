import {FC, PropsWithChildren} from "react";
import styles from './Button.module.scss'

interface ButtonPropsType {
    onClick(): void
}

export const Button: FC<PropsWithChildren<ButtonPropsType>> = ({children, onClick}) => {
    return <button className={styles.Button} onClick={onClick}>{children}</button>
}