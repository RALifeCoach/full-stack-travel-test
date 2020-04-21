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

const EditFieldDestination = ({ error, value, dispatch }: IProps) => {
  useEffect(() => {
    dispatch({ type: 'destinationError', value: Boolean(value) ? '' : 'Required' });
  }, [dispatch, value]);

  return (
    <>
      <Typography variant={"subtitle1"}>Destination</Typography>
      <TextField
        value={value}
        onChange={event => dispatch({ type: 'destination', value: event.target.value })}
        error={Boolean(error)}
        helperText={error}
      />
      <Spacer height={16} />
    </>
  );
};

export default EditFieldDestination;
