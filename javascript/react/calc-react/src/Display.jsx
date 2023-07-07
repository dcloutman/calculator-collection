import styles from './Display.module.css';

function Display (props) {
    return (
        <input type="text" className={styles.calcDisplay} value={props.displayValue} id="display" readOnly="readonly"></input> 
    );
}

export default Display;
