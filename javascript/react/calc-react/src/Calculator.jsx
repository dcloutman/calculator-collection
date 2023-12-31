import React from 'react';
import styles from './Calculator.module.css';
import Display from './Display';
import CalcButton from './CalcButton';
import NumButton from './NumButton';
import EqualsButton from './EqualsButton';

class Calculator extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            displayValue: "0"
        };
        this.answer = null;
        this.entry = 0;
        this.operation = null;
        this.inErrorMode = false;
        this.clearDisplayOnNextDigit = false;
        this.userHasChangedEntry = false;
    }

    handleNumericClick = (event) => {
        event.stopPropagation();
        let nextDisplayValue = this.state.displayValue;
        if (nextDisplayValue === "0" || this.clearDisplayOnNextDigit) {
            nextDisplayValue = '';
        }

        this.clearDisplayOnNextDigit = false;

        nextDisplayValue = nextDisplayValue + event.target.dataset.pressValue
        this.userHasChangedEntry = true;
        this.setState({displayValue: nextDisplayValue});
    }
    
    handleDecimalClick = (event) => {
        event.stopPropagation();
        let nextDisplayValue = this.state.displayValue;

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

    handleOperationClick = (event) => {
        event.stopPropagation();
        
        this.clearDisplayOnNextDigit = true;

        if (this.answer === null) {
            this.answer = Number(this.state.displayValue);
        } else if (this.operation !== null && this.userHasChangedEntry) {
            this.setState({displayValue: String(this.calculate())});
            this.userHasChangedEntry = false;
        }
        this.operation = event.target.dataset.pressValue;
    }

    handleEqualsClick = (event) => {
        event.stopPropagation();
        
        this.setState({displayValue: String(this.calculate())});

        this.answer = null;
        this.operation = null;
        this.userHasChangedEntry = false;
        this.clearDisplayOnNextDigit = true;
    }

    handleClearEntryClick = (event) => {
        event.stopPropagation();
        this.clearEntry();
        this.setState({displayValue: "0"});
    }

    handleClearAllClick = (event) => {
        event.stopPropagation();
        this.clearAll();
        this.setState({displayValue: '0'});
    }

    handlePlusMinusClick = (event) => {
        event.stopPropagation();
        // Make a positive a negative and a negative a positive.
        this.setState({displayValue: String(Number(this.state.displayValue) * -1)});
    }

    clearEntry = (keepError = true) => {
        if (!this.inErrorMode || !keepError) {
            this.setState({displayValue: "0"});
            this.entry = 0;
        }
    }

    clearAll = () => {
        this.answer = null;
        this.operation = null;
        this.clearEntry(false);
        this.userHasChangedEntry = false;
        this.inErrorMode = false;
    }

    calculate = () => {
        // If no number was entered before the operation, assume none.
        if (this.answer === null) {
            this.answer = 0;
        }

        let nextDisplayValue = this.state.displayValue;
        this.entry = Number(nextDisplayValue);

        if (this.inErrorMode) {
            nextDisplayValue = 'ERR';
        } else if (this.operation !== null) {
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
                if (Number(displayValue) == 0) {
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
        }
        return nextDisplayValue;
    }

    render() {
        return (
            <form id="calculator" className={styles.calculator}>
                <Display displayValue={this.state.displayValue} />

                <NumButton pressValue={7} displayValue={"7"} clickHandler={this.handleNumericClick} />
                <NumButton pressValue={8} displayValue={"8"} clickHandler={this.handleNumericClick} />
                <NumButton pressValue={9} displayValue={"9"} clickHandler={this.handleNumericClick} />
                <CalcButton pressValue={"/"} displayValue={String.fromCharCode(247)} clickHandler={this.handleOperationClick} />

                <NumButton pressValue={4} displayValue={"4"} clickHandler={this.handleNumericClick} />
                <NumButton pressValue={5} displayValue={"5"} clickHandler={this.handleNumericClick} />
                <NumButton pressValue={6} displayValue={"6"} clickHandler={this.handleNumericClick} />
                <CalcButton pressValue={"*"} displayValue={String.fromCharCode(215)} clickHandler={this.handleOperationClick} />

                <NumButton pressValue={1} displayValue={"1"} clickHandler={this.handleNumericClick} />
                <NumButton pressValue={2} displayValue={"2"} clickHandler={this.handleNumericClick} />
                <NumButton pressValue={3} displayValue={"3"} clickHandler={this.handleNumericClick} />
                <CalcButton pressValue={"-"} displayValue={'-'} clickHandler={this.handleOperationClick} />

                <CalcButton pressValue={"+/"} displayValue={String.fromCharCode(177)} clickHandler={this.handlePlusMinusClick} />
                <NumButton pressValue={0} displayValue={"0"} clickHandler={this.handleNumericClick} />
                <CalcButton pressValue={"."} displayValue={"."} clickHandler={this.handleDecimalClick} />
                <CalcButton pressValue={"+"} displayValue={"+"} clickHandler={this.handleOperationClick} />

                <CalcButton pressValue={"CE"} displayValue={"CE"} clickHandler={this.handleClearEntryClick} />
                <CalcButton pressValue={"AC"} displayValue={"AC"} clickHandler={this.handleClearAllClick} />
                <EqualsButton pressValue={"="} displayValue={"="} clickHandler={this.handleEqualsClick} />
            </form>
        );
    }
}

export default Calculator;
