import {Button} from "../../../shared/ui/Button/Button";
import React, {Dispatch, FC, SetStateAction} from "react";
import {AllSortingAlgorithms, SORTING_ALGORITHMS} from "../../../shared/lib/common/consts";
import styles from './Header.module.scss'

interface HeaderPropsType {
    setActiveAlgorithm: Dispatch<SetStateAction<SORTING_ALGORITHMS>>
}

export const Header: FC<HeaderPropsType> = ({ setActiveAlgorithm}) => {
    return (
        <div>
            <p>Pick your desired algorithm</p>
            <div className={styles.HeaderButtons}>
            {AllSortingAlgorithms.map((algorithm, index) => <Button key={index} onClick={() => setActiveAlgorithm(algorithm)}>{algorithm}</Button>)}
            </div>
        </div>
    )
}