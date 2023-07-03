import { useState } from 'react';
import './App.css';
import Display from './Display';
import CalcButton from './CalcButton';
function App() {
    const [count, setCount] = useState(0);

    return (
        <form id="calculator">
            <Display />

            <CalcButton pressVal={7} displayVal={"7"} />
            <CalcButton pressVal={8} displayVal={"8"} />
            <CalcButton pressVal={9} displayVal={"9"} />
            <CalcButton pressVal={'/'} displayVal={String.fromCharCode(247)} />

            <CalcButton pressVal={4} displayVal={"4"} />
            <CalcButton pressVal={5} displayVal={"5"} />
            <CalcButton pressVal={6} displayVal={"6"} />
            <CalcButton pressVal={'*'} displayVal={String.fromCharCode(215)} />

            <CalcButton pressVal={1} displayVal={"4"} />
            <CalcButton pressVal={2} displayVal={"5"} />
            <CalcButton pressVal={3} displayVal={"6"} />
            <CalcButton pressVal={'-'} displayVal={'-'} />
        </form>
    );
}

export default App;
