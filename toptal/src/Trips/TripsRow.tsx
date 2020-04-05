import React, {CSSProperties, useContext, useMemo} from "react";
import {
  TableCell,
  TableRow,
  Tooltip,
} from "@material-ui/core";
import {TripDetails} from "General";
import DateFormat from "../shared/DateFormat";
import moment from 'moment';
import MainContext from "../Main/MainContext";
import FlexColumn from "../shared/flex-grid/FlexColumn";
import TripsRowButtons from "./TripsRowButtons";

interface IProps {
  trip: TripDetails;
}

const TripsRow = ({trip}: IProps) => {
  const {mainState: {windowSize}} = useContext(MainContext);

  const daysToDeparture = useMemo(() => {
    const start = moment(trip.startDate);
    const today = moment();
    const diff = start.diff(today, 'd');
    if (diff < 0) {
      return 'Past Trip';
    }
    return diff === 0 ? 'Today!' : diff.toString();
  }, [trip.startDate]);

  const commentStyle: CSSProperties = {
    width: windowSize !== 'large'
      ? 80
      : 120,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
  const dateFormat = windowSize === 'large' || windowSize === 'small'
    ? "MMM Do, YYYY"
    : "YY-MM-DD";

  return (
    <>
      <TableRow>
        <TableCell>
          {trip.destination}
        </TableCell>
        <TableCell>
          {windowSize === 'phone'
            ? (
              <FlexColumn>
                <DateFormat date={trip.startDate} format={dateFormat}/>
                <div>to</div>
                {trip.endDate
                  ? (
                    <DateFormat date={trip.endDate} format={dateFormat}/>
                  )
                  : (
                    <div>Unknown</div>
                  )
                }
              </FlexColumn>
            )
            : (
              <DateFormat date={trip.startDate} format={dateFormat}/>
            )
          }
        </TableCell>
        {windowSize !== 'phone' && (
          <TableCell>
            {Boolean(trip.endDate)
              ? (
                <DateFormat date={trip.endDate} format={dateFormat}/>
              )
              : (
                <div>--</div>
              )
            }
          </TableCell>
        )}
        {windowSize !== 'tablet' && windowSize !== 'phone' && (
          <TableCell>
            <Tooltip title={trip.comments}>
              <div style={commentStyle}>
                {trip.comments}
              </div>
            </Tooltip>
          </TableCell>
        )}
        <TableCell align="right">{daysToDeparture}</TableCell>
        <TripsRowButtons trip={trip}/>
      </TableRow>
      {(windowSize === 'tablet' || windowSize === 'phone') && Boolean(trip.comments) && (
        <TableRow>
          <TableCell/>
          <TableCell colSpan={4}>
            {trip.comments}
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default TripsRow;
