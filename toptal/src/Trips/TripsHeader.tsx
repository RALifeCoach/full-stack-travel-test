import React, {useContext} from "react";
import {
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import MainContext from "../Main/MainContext";

const TripsHeader = () => {
  const {mainState: {windowSize}} = useContext(MainContext);

  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell>Destination</TableCell>
          <TableCell>
            {windowSize === 'phone'
              ? 'Dates'
              : windowSize === 'tablet'
                ? 'Start'
                : 'Start Date'
            }
          </TableCell>
          {windowSize !== 'phone' && (
            <TableCell>
              {windowSize === 'tablet' ? 'End' : 'End Date'}
            </TableCell>
          )}
          {windowSize !== 'tablet' && windowSize !== 'phone' && (
            <TableCell>Comment</TableCell>
          )}
          <TableCell align="right">
            {windowSize === 'large' ? 'Days to Departure' : 'Days'}
          </TableCell>
          <TableCell/>
        </TableRow>
      </TableHead>
    </>
  );
};

export default TripsHeader;
