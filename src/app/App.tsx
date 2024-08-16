import React from 'react';
import './App.css';
import {Header} from "../widgets/Header/ui/Header";
import {GraphLayout} from "../widgets/GraphLayout/ui/GraphLayout";

function App() {
    const values = []

    for (let i = 0; i < 50; i++) {
        values.push(Math.random() * 100)
    }

    return (
        <div className="App">
          <Header />
            <GraphLayout values={values} />
        </div>
    );
}

export default App;
