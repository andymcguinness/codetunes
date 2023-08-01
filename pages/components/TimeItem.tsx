import React, { ReactElement } from "react";
import { parseTime } from '../../lib/helpers'

function TimeItem({ time }: { time: string; }) : ReactElement {
    const hms = parseTime(time).join(':');
    return (
        <span>{hms}</span>
    );
}

export default TimeItem;