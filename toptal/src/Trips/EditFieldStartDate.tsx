import React, { useEffect } from "react";
import { IDispatch } from "General";
import {
  TextField,
  Typography
} from "@material-ui/core";
import Spacer from "../shared/Spacer";

interface IProps {
  error?: string;
  value: string;
  dispatch: IDispatch;
}

const EditFieldStartDate = ({ error, value, dispatch }: IProps) => {
  useEffect(() => {
    dispatch({ type: 'startDateError', value: Boolean(value) ? '' : 'Required' });
  }, [dispatch, value]);

  return (
    <>
      <Typography variant={"subtitle1"}>Start Date</Typography>
      <TextField
        type="date"
        value={value}
        onChange={event => dispatch({ type: 'startDate', value: event.target.value })}
        error={Boolean(error)}
        helperText={error}
      />
      <Spacer height={16} />
    </>
  );
};

export default EditFieldStartDate;
