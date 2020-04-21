import React from "react";
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

const EditFieldEndDate = ({ error, value, dispatch }: IProps) => {
  return (
    <>
      <Typography variant={"subtitle1"}>End Date</Typography>
      <TextField
        type="date"
        value={value}
        onChange={event => dispatch({ type: 'endDate', value: event.target.value })}
        error={Boolean(error)}
        helperText={error}
      />
      <Spacer height={16} />
    </>
  );
};

export default EditFieldEndDate;
