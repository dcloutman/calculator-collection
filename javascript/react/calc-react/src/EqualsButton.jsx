import { useState, setState } from 'react';
import styles from './CalcButton.module.css';

function EqualsButton (props) {
    const [val] = useState(props.pressValue);

    return (
        <button type="button" className={`${styles.calcButton}  ${styles.equalsButton}`} data-press-value={"="} onClick={props.clickHandler}>{ "=" }</button>
    );
}

export default EqualsButton;
