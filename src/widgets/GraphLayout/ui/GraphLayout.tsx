import styles from './GraphLayout.module.scss'
import {FC, useEffect, useRef, useState} from "react";
import {GraphBlock} from "../../../entities/GraphBlock/ui/GraphBlock";
import {Button} from "../../../shared/ui/Button/Button";

interface GraphLayoutPropsType {
    values: number[]
}

export const GraphLayout: FC<GraphLayoutPropsType> = ({ values }) => {
    const [activeIndexes, setActiveIndexes] = useState<number[]>([])
    const [sortedValues, setSortedValues] = useState(values)
    const [activeIndex, setActiveIndex] = useState(-1)
    const [sortHistory, setSortHistory] = useState([[...sortedValues]])
    const [playing, setPlaying] = useState(false)
    const [loopingVar, setLoopingVar] = useState(0)
    const timeoutRef: any = useRef()
    const size = values.length

    useEffect(() => {
        setSortedValues(sortHistory[loopingVar])
        console.log(activeIndexes)
        setActiveIndex(activeIndexes[loopingVar])
    }, [loopingVar, sortHistory]);

    useEffect(() => {
        if (loopingVar < sortHistory.length - 1 && playing) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = setTimeout(() => {
                setLoopingVar(loopingVar + 1)
            }, 30)
        } else {
            setPlaying(false)
        }
    }, [loopingVar, playing])

    const play = () => {
        setPlaying(true);
    };

    const bubbleSort = () => {
        var historyArray = [[...sortedValues]];
        for (let i = 0; i < size - 1; i++) {
            for (let j = 0; j < size - i - 1; j++) {
                if (sortedValues[j] > sortedValues[j + 1]) {
                    activeIndexes.push(j)
                    var swap = sortedValues[j];
                    sortedValues[j] = sortedValues[j + 1];
                    sortedValues[j + 1] = swap;
                    historyArray.push([...sortedValues]);
                }
            }
        }
        setActiveIndexes(activeIndexes)
        setSortHistory(historyArray);
        play();
    };

    return (
        <>
        <div className={styles.GraphLayout}>
            {sortedValues.map((value, index) => <GraphBlock isActive={activeIndex === index} key={index} height={value} />)}
        </div>
        <Button onClick={() => setTimeout(() => bubbleSort(), 500)} />
        </>
    )
}