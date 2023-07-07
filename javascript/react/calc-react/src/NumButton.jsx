import { useState, setState } from 'react';
import styles from './CalcButton.module.css';

function NumButton (props) {
    //const [value] = useState(props.pressVal);
    //console.log(props);
    return (
        <button type="button" className={styles.calcButton} data-press-value={props.pressValue} onClick={props.clickHandler}>{ props.displayValue }</button>
    );
}

export default NumButton;
