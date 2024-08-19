import styles from './GraphLayout.module.scss'
import {FC, useEffect, useRef, useState} from "react";
import {GraphBlock} from "../../../entities/GraphBlock/ui/GraphBlock";
import {Button} from "../../../shared/ui/Button/Button";

interface GraphLayoutPropsType {
    values: number[]
}

export const GraphLayout: FC<GraphLayoutPropsType> = ({ values }) => {
    const [sortedValues, setSortedValues] = useState(values)
    const [activeIndex, setActiveIndex] = useState<number>(0)
    const [sortHistory, setSortHistory] = useState([{activeIndex: 0, currentValues: [...sortedValues]}])
    const [isDisabled, setIsDisabled] = useState<boolean>(false)
    const [playing, setPlaying] = useState<boolean>(false)
    const [loopIndex, setLoopIndex] = useState<number>(0)
    const timeoutRef: any = useRef()
    const size = values.length

    useEffect(() => {
        setSortedValues(sortHistory[loopIndex].currentValues)
        setActiveIndex(sortHistory[loopIndex].activeIndex)
    }, [loopIndex, sortHistory]);

    useEffect(() => {
        if (loopIndex < sortHistory.length - 1 && playing) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = setTimeout(() => {
                setLoopIndex(loopIndex + 1)
            }, 5)
        } else {
            setPlaying(false)
        }
    }, [loopIndex, playing, sortHistory])

    const bubbleSort = () => {
        const historyArray = [{activeIndex: 0, currentValues:[...sortedValues]}]
        for (let i = 0; i < size - 1; i++) {
            for (let j = 0; j < size - i - 1; j++) {
                if (sortedValues[j] > sortedValues[j + 1]) {
                    const swap = sortedValues[j]
                    sortedValues[j] = sortedValues[j + 1]
                    sortedValues[j + 1] = swap
                    historyArray.push({activeIndex: j + 1, currentValues:[...sortedValues]})
                }
            }
        }
        setSortHistory(historyArray)
        setPlaying(true)
        setIsDisabled(true)
    };

    return (
        <>
            <div className={styles.GraphLayout}>
                {sortedValues.map((value, index) => <GraphBlock isActive={activeIndex === index} key={index} height={value} />)}
            </div>
            <Button onClick={() => !isDisabled ? bubbleSort() : null}>Start sorting</Button>
        </>
    )
}