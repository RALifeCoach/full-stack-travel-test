import React from 'react';
import moment, { Moment } from 'moment';

export interface IProps {
    date: Date | Moment | string;
    format?: string;
}

const DateFormat: React.FunctionComponent<IProps> = props => {
    const { date, format = 'MMM Do, YYYY' } = props;
    const displayDate = moment.utc(date, 'YYYY-MM-DD HH:mm:ss').local().format(format);
    if (displayDate === 'Invalid date') {
        return (<>-</>);
    }
    return (
        <>{displayDate}</>
    )
};

export default DateFormat;