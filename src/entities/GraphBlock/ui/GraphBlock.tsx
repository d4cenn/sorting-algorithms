import {FC} from "react";
import styles from './GraphBlock.module.scss'
import classNames from "classnames";

interface GraphBlockPropsType {
    height: number
    isActive: boolean
}

export const GraphBlock: FC<GraphBlockPropsType> = ({height, isActive}) => {
    return <div className={classNames(styles.GraphBlock, {
        [styles.ActiveBlock]: isActive
    })} style={{ height: `${height}%`}}></div>
}