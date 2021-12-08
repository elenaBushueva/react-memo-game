import React, {useState} from 'react';
import {shuffle, chunk} from 'lodash';
import './App.css';
import { nanoid } from 'nanoid';
import {value} from "lodash/seq";

const App = () => {

    const side = 4; // 4 * 4 = 16 / 2 = 8;

    let variants = [];
    for(let i = 1; i <= side * side / 2; i++){
        variants.push(i);
    };
    variants = [...variants, ...variants];
    variants = shuffle(variants).map(el => ({ id: nanoid(), value: el, open: false }));
    variants = chunk(variants, side);

    const [gameField, setGameField] = useState(variants);

    console.log(variants)

    const openClick = (id) => {
        console.log(id)
        const updatedField = gameField.map(row => row.map(col => col.id === id ? {...col, open: true} : col));
        setGameField(updatedField);
    }

    return (
        <div>

<table border={1} >
    <tbody>
    {gameField.map((row, rowInd) =>
    <tr key={rowInd}>
        {row.map((col, colInd) =>
        <td key={colInd}>{ col.open ? col.value : <button onClick={() => openClick(col.id)}>open</button> }</td>
        )}
    </tr>
    )}
    </tbody>
</table>
        </div>
    );
};

export default App;