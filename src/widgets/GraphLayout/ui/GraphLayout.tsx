import styles from './GraphLayout.module.scss'
import {Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState} from "react";
import {GraphBlock} from "../../../entities/GraphBlock/ui/GraphBlock";
import {Button} from "../../../shared/ui/Button/Button";
import {SORTING_ALGORITHMS} from "../../../shared/lib/common/consts";

interface GraphLayoutPropsType {
    activeAlgorithm: SORTING_ALGORITHMS
    isAlgorithmRunning: boolean
    setIsAlgorithmRunning: Dispatch<SetStateAction<boolean>>
    values: number[]
}

export const GraphLayout: FC<GraphLayoutPropsType> = ({ activeAlgorithm, isAlgorithmRunning, setIsAlgorithmRunning, values }) => {
    const [sortedValues, setSortedValues] = useState(values)
    const [activeIndex, setActiveIndex] = useState<number>(0)
    const [sortHistory, setSortHistory] = useState([{activeIndex: 0, currentValues: [...sortedValues]}])
    const [playing, setPlaying] = useState<boolean>(false)
    const [isDisabled, setIsDisabled] = useState<boolean>(false)
    const [loopIndex, setLoopIndex] = useState<number>(0)
    const timeoutRef: any = useRef()
    const size = values.length

    useEffect(() => {
        clearTimeout(timeoutRef.current)
        setPlaying(false)
        setIsDisabled(false)
        setSortedValues(values)
        setLoopIndex(0)
        setSortHistory([{activeIndex: 0, currentValues: [...values]}])
    }, [values])

    useEffect(() => {
        setSortedValues(sortHistory[loopIndex].currentValues)
        setActiveIndex(sortHistory[loopIndex].activeIndex)
    }, [loopIndex, sortHistory]);

    useEffect(() => {
        if (loopIndex < sortHistory.length - 1 && playing) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = setTimeout(() => {
                console.log(loopIndex)
                setLoopIndex(loopIndex + 1)
            }, 20)
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
    }

    const selectionSort = () => {
        const historyArray = [{activeIndex: 0, currentValues:[...sortedValues]}]
        for (let i = 0; i < size - 1; i++) {
            let minValueIndex = i;
            for (let j = i + 1; j < size; j++) {
                if (sortedValues[j] < sortedValues[minValueIndex]) {
                    minValueIndex = j;
                }
            }

            let temp = sortedValues[minValueIndex];
            sortedValues[minValueIndex] = sortedValues[i];
            sortedValues[i] = temp;
            historyArray.push({activeIndex: minValueIndex, currentValues:[...sortedValues]})
        }

        setSortHistory(historyArray)
        setPlaying(true)
    }

    const executeActiveAlgorithm = () => {
        switch (activeAlgorithm) {
            case SORTING_ALGORITHMS.BUBBLE:
                return bubbleSort()
            case SORTING_ALGORITHMS.SELECTION:
                return selectionSort()
            default:
                return null
        }
    }

    const handleStartSorting = useCallback(() => {
        setIsDisabled(true)
        executeActiveAlgorithm()
    }, [executeActiveAlgorithm])

    return (
        <>
            <div className={styles.GraphLayout}>
                {sortedValues.map((value, index) => <GraphBlock isActive={activeIndex === index} key={index} height={value} />)}
            </div>
            <Button isDisabled={playing || isDisabled} onClick={handleStartSorting}>Start sorting</Button>
        </>
    )
}