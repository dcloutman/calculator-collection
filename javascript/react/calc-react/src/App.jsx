import { useState } from 'react';
import './App.css';
import Display from './Display';
import CalcButton from './CalcButton';
import NumButton from './NumButton';
import EqualsButton from './EqualsButton';

function App() {
    const [displayValue, setDisplayValue] = useState("0");

    let ans = null,
        entry = 0,
        operation = null,
        inErrorMode = false,
        clearDisplayOnNextDigit = false,
        userHasChangedEntry = false,
        nextDisplayValue = displayValue;


    function handleNumericClick (event) {
        event.stopPropagation();
        nextDisplayValue = displayValue;
        if (nextDisplayValue === "0" || clearDisplayOnNextDigit) {
            nextDisplayValue = '';
        }

        if (clearDisplayOnNextDigit) {
            clearDisplayOnNextDigit = false;
        }

        nextDisplayValue = nextDisplayValue + event.target.dataset.pressValue
        userHasChangedEntry = true;
        setDisplayValue(nextDisplayValue);
    }
    
    function handleDecimalClick (event) {
        event.stopPropagation();
        nextDisplayValue = displayValue;
        //console.log(event.target.dataset.pressVal);
        if (nextDisplayValue.search(/\./) === -1) {
            if (clearDisplayOnNextDigit) {
                nextDisplayValue = '0';
            }
            nextDisplayValue = nextDisplayValue + '.';
            userHasChangedEntry = true;
            clearDisplayOnNextDigit = false;
        }

        setDisplayValue(nextDisplayValue);
    }

    function handleOperatorClick (event) {
        event.stopPropagation();
        //console.log(event.target.dataset.pressVal);
        clearDisplayOnNextDigit = true;
        if (ans === null) {
            ans = Number(displayValue);
        } else if (operation != null && userHasChangedEntry) {
            calculate();
            userHasChangedEntry = false;
        }
        operation = event.target.dataset.pressValue;
        console.log(operation);
    }

    function handleEqualsClick (event) {
        event.stopPropagation();
        calculate();
        ans = null;
        operation = null;
        userHasChangedEntry = false;
        clearDisplayOnNextDigit = true;
    }

    function handleClearEntryClick (event) {
        event.stopPropagation();
        console.log("Clear Entry");
        clearEntry();
        setDisplayValue("0");
    }

    function handleClearAllClick (event) {
        event.stopPropagation();
        clearAll();
        setDisplayValue('0');
    }

    function handlePlusMinusClick (event) {
        event.stopPropagation();
        // Make a positive a negative and a negative a positive.
        setDisplayValue(String(Number(displayValue) * -1));
    }

    function clearEntry (keepError = true) {
        if (!inErrorMode || !keepError) {
            setDisplayValue("0");
            entry = 0;
        }
    }

    function clearAll () {
        ans = null;
        operation = null;
        clearEntry(false);
        userHasChangedEntry = false;
        inErrorMode = false;
    }

    function calculate() {
        // If no number was entered before the operator, assume none.
        if (ans === null) {
            ans = 0;
        }
        nextDisplayValue = displayValue;
        entry = Number(nextDisplayValue);

        if (inErrorMode) {
            nextDisplayValue = 'ERR';
        } else if (operation !== null) {
            if (operation == '+') {
                ans = ans + entry;
                nextDisplayValue = String(ans);
            } else if (operation == '-') {
                ans = ans - entry;
                nextDisplayValue = String(ans);
            } else if (operation == '*') {
                ans = ans * entry;
                nextDisplayValue = String(ans);
            } else if (operation == '/') {
                if (Number(displayValue) == 0) {
                    inErrorMode = true;
                    nextDisplayValue = 'ERR';
                } else {
                    nextDisplayValue = String(ans / entry);
                }
            } else {
                throw "Bad operator exception";
            }
            userHasChangedEntry = false;
        }
        console.log(nextDisplayValue);
        setDisplayValue(nextDisplayValue);
    }

    return (
        <form id="calculator">
            <Display displayValue={displayValue} />

            <NumButton pressValue={7} displayValue={"7"} clickHandler={handleNumericClick} />
            <NumButton pressValue={8} displayValue={"8"} clickHandler={handleNumericClick} />
            <NumButton pressValue={9} displayValue={"9"} clickHandler={handleNumericClick} />
            <CalcButton pressValue={"/"} displayValue={String.fromCharCode(247)} clickHandler={handleOperatorClick} />

            <NumButton pressValue={4} displayValue={"4"} clickHandler={handleNumericClick} />
            <NumButton pressValue={5} displayValue={"5"} clickHandler={handleNumericClick} />
            <NumButton pressValue={6} displayValue={"6"} clickHandler={handleNumericClick} />
            <CalcButton pressValue={"*"} displayValue={String.fromCharCode(215)} clickHandler={handleOperatorClick} />

            <NumButton pressValue={1} displayValue={"1"} clickHandler={handleNumericClick} />
            <NumButton pressValue={2} displayValue={"2"} clickHandler={handleNumericClick} />
            <NumButton pressValue={3} displayValue={"3"} clickHandler={handleNumericClick} />
            <CalcButton pressValue={"-"} displayValue={'-'} clickHandler={handleOperatorClick} />

            <CalcButton pressValue={"+/"} displayValue={String.fromCharCode(177)} clickHandler={handlePlusMinusClick} />
            <NumButton pressValue={0} displayValue={"0"} clickHandler={handleNumericClick} />
            <CalcButton pressValue={"."} displayValue={"."} />
            <CalcButton pressValue={"+"} displayValue={"+"} clickHandler={handleOperatorClick} />

            <CalcButton pressValue={"CE"} displayValue={"CE"} clickHandler={handleClearEntryClick} />
            <CalcButton pressValue={"AC"} displayValue={"AC"} clickHandler={handleClearAllClick} />
            <EqualsButton pressValue={"="} displayValue={"="} clickHandler={handleEqualsClick} />
        </form>
    );
}

export default App;
