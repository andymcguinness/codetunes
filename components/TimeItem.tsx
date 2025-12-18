import { ReactElement } from "react";
import { parseTime } from '../lib/helpers'
import styles from '../styles/TimeItem.module.css'

function TimeItem({ time }: { time: string; }) : ReactElement {
    const hms = parseTime(time, false).join(':');
    return (
        <span className={styles.timeSpan}>{hms}</span>
    );
}

export default TimeItem;