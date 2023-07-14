import { useState, React } from 'react';
import './App.css';
import Display from './Display';
import CalcButton from './CalcButton';
import NumButton from './NumButton';
import EqualsButton from './EqualsButton';

class Calculator extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            displayValue: 0
        };
        this.answer = null;
        this.entry = 0;
        this.operation = null;
        this.inErrorMode = false;
        this.clearDisplayOnNextDigit = false;
        this.userHasChangedEntry = false;
        this.nextDisplayValue = this.state.displayValue;

        this.handleNumericClick.bind(this);
        this.handleDecimalClick.bind(this);
        this.handleOperationClick.bind(this);
        this.handleEqualsClick.bind(this);
        this.handleClearEntryClick.bind(this);
        this.handleClearAllClick.bind(this);
        this.handlePlusMinusClick.bind(this);
    }

    handleNumericClick (event) {
        event.stopPropagation();
        let nextDisplayValue = this.state.displayValue;
        if (nextDisplayValue === "0" || this.clearDisplayOnNextDigit) {
            nextDisplayValue = '';
        }

        clearDisplayOnNextDigit = false;

        nextDisplayValue = nextDisplayValue + event.target.dataset.pressValue
        this.userHasChangedEntry = true;
        console.log("Op on num Click: " + this.operation);
        setDisplayValue(nextDisplayValue);
    }
    
    handleDecimalClick (event) {
        event.stopPropagation();
        let nextDisplayValue = this.displayValue;
        //console.log(event.target.dataset.pressVal);
        if (nextDisplayValue.search(/\./) === -1) {
            if (this.clearDisplayOnNextDigit) {
                nextDisplayValue = '0';
            }
            nextDisplayValue = nextDisplayValue + '.';
            this.userHasChangedEntry = true;
            this.clearDisplayOnNextDigit = false;
        }

        this.setState({displayValue: nextDisplayValue});
    }

    handleOperationClick (event) {
        event.stopPropagation();
        let workingAnswer = answer;
        
        this.clearDisplayOnNextDigit = true;

        if (workingAnswer === null) {
            workingAnswer = Number(this.state.displayValue);
        } else if (this.operation !== null && this.userHasChangedEntry) {
            //operation = event.target.dataset.pressValue;
            console.log("Doing calculation after operator press.");
            this.calculate();
            this.userHasChangedEntry = false;
        }
        console.log(`Operation event: ${event.target.dataset.pressValue}`);
        this.operation = event.target.dataset.pressValue;
        console.log(`With Operation: ${ans} ${operation} ${entry}`);
    }

    handleEqualsClick (event) {
        event.stopPropagation();
        console.log(`Pre-calculate: ${ans} ${operation} ${entry}`);
        this.calculate();
        setDisplayValue(nextDisplayValue);

        ans = null;
        operation = null;
        userHasChangedEntry = false;
        clearDisplayOnNextDigit = true;
    }

    handleClearEntryClick (event) {
        event.stopPropagation();
        console.log("Clear Entry");
        clearEntry();
        setDisplayValue("0");
    }

    handleClearAllClick (event) {
        event.stopPropagation();
        clearAll();
        setDisplayValue('0');
    }

    handlePlusMinusClick (event) {
        event.stopPropagation();
        // Make a positive a negative and a negative a positive.
        setDisplayValue(String(Number(displayValue) * -1));
    }

    clearEntry (keepError = true) {
        if (!inErrorMode || !keepError) {
            setDisplayValue("0");
            entry = 0;
        }
    }

    clearAll () {
        ans = null;
        operation = null;
        clearEntry(false);
        userHasChangedEntry = false;
        inErrorMode = false;
    }

    calculate() {
        // If no number was entered before the operation, assume none.
        if (this.answer === null) {
            this.answer = 0;
        }

        console.log(`To calculate: ${this.answer} ${this.operation} ${this.entry}`);
        nextDisplayValue = displayValue;
        this.entry = Number(nextDisplayValue);

        if (inErrorMode) {
            nextDisplayValue = 'ERR';
        } else if (this.operation !== null) {
            console.log(`${this.answer} ${this.operation} ${this.entry}`);
            if (this.operation == '+') {
                this.answer = this.answer + this.entry;
                nextDisplayValue = String(this.answer);
            } else if (this.operation == '-') {
                this.answer = this.answer - this.entry;
                nextDisplayValue = String(this.answer);
            } else if (this.operation == '*') {
                this.answer = this.answer * this.entry;
                nextDisplayValue = String(this.answer);
            } else if (this.operation == '/') {
                if (Number(this.state.displayValue) == 0) {
                    this.inErrorMode = true;
                    nextDisplayValue = 'ERR';
                } else {
                    this.answer = this.answer / this.entry;
                    nextDisplayValue = String(this.answer);
                }
            } else {
                throw "Bad operation exception";
            }
            this.userHasChangedEntry = false;
        } else {
            console.log(`Null operation: ${this.operation}`);
        }
        console.log("Answer: " + nextDisplayValue);
    }

    render() {
        return (
            <form id="calculator">
                <Display displayValue={this.state.displayValue} />

                <NumButton pressValue={7} displayValue={"7"} clickHandler={handleNumericClick} />
                <NumButton pressValue={8} displayValue={"8"} clickHandler={handleNumericClick} />
                <NumButton pressValue={9} displayValue={"9"} clickHandler={handleNumericClick} />
                <CalcButton pressValue={"/"} displayValue={String.fromCharCode(247)} clickHandler={handleOperationClick} />

                <NumButton pressValue={4} displayValue={"4"} clickHandler={handleNumericClick} />
                <NumButton pressValue={5} displayValue={"5"} clickHandler={handleNumericClick} />
                <NumButton pressValue={6} displayValue={"6"} clickHandler={handleNumericClick} />
                <CalcButton pressValue={"*"} displayValue={String.fromCharCode(215)} clickHandler={handleOperationClick} />

                <NumButton pressValue={1} displayValue={"1"} clickHandler={handleNumericClick} />
                <NumButton pressValue={2} displayValue={"2"} clickHandler={handleNumericClick} />
                <NumButton pressValue={3} displayValue={"3"} clickHandler={handleNumericClick} />
                <CalcButton pressValue={"-"} displayValue={'-'} clickHandler={handleOperationClick} />

                <CalcButton pressValue={"+/"} displayValue={String.fromCharCode(177)} clickHandler={handlePlusMinusClick} />
                <NumButton pressValue={0} displayValue={"0"} clickHandler={handleNumericClick} />
                <CalcButton pressValue={"."} displayValue={"."} clickHandler={handleDecimalClick} />
                <CalcButton pressValue={"+"} displayValue={"+"} clickHandler={handleOperationClick} />

                <CalcButton pressValue={"CE"} displayValue={"CE"} clickHandler={handleClearEntryClick} />
                <CalcButton pressValue={"AC"} displayValue={"AC"} clickHandler={handleClearAllClick} />
                <EqualsButton pressValue={"="} displayValue={"="} clickHandler={handleEqualsClick} />
            </form>
        );
    }
}

export default App;
