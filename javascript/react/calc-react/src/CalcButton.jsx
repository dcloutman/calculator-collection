import { useState, setState } from 'react';
import styles from './CalcButton.module.css';

function CalcButton (props) {
    const [val] = useState(props.pressValue);

    return (
        <button type="button" className={styles.calcButton}  data-press-value={props.pressValue} onClick={props.clickHandler}>{ props.displayValue }</button>
    );
}

export default CalcButton;
