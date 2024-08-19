import React, {useState} from 'react';
import './App.css';
import {Header} from "../widgets/Header/ui/Header";
import {GraphLayout} from "../widgets/GraphLayout/ui/GraphLayout";
import {SORTING_ALGORITHMS} from "../shared/lib/common/consts";

const createValues = () => {
    const values = []

    for (let i = 0; i < 50; i++) {
        values.push(Math.random() * 100)
    }

    return values
}

function App() {
    const [activeAlgorithm, setActiveAlgorithm] = useState<SORTING_ALGORITHMS>(SORTING_ALGORITHMS.BUBBLE)
    const values = createValues()

    return (
        <div className="App">
            <Header setActiveAlgorithm={setActiveAlgorithm} />
            <GraphLayout activeAlgorithm={activeAlgorithm} values={values} />
        </div>
    );
}

export default App;
