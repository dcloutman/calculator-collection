import { useState, setState } from 'react';
import styles from './CalcButton.module.css';

function CalcButton (props) {
    const [val] = useState(props.pressVal);
    console.log(props);
    return (
        <button type="button" className={styles.calcButton}>{ props.displayVal }</button>
    );
}

export default CalcButton;
