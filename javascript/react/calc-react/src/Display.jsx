import { useState } from 'react';
import styles from './Display.module.css';

function Display (props) {
    const [] = useState();
    return (
        <input type="text" className={styles.calcDisplay} id="display" readOnly="readonly"></input> 
    );
}

export default Display;
