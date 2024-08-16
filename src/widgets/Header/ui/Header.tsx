import {Button} from "../../../shared/ui/Button/Button";
import React from "react";

const sortingAlgorithms = ['Bubble']

export const Header = () => {
    return (
        <div>
            <p>Pick your desired algorithm</p>
            {sortingAlgorithms.map((algo, index) => <Button key={index} onClick={() => console.log(algo)}>{algo}</Button>)}
        </div>
    )
}