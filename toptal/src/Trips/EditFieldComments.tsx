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

const EditField = ({ error, value, dispatch }: IProps) => {
  return (
    <>
      <Typography variant={"subtitle1"}>Comments</Typography>
      <TextField
        value={value}
        onChange={event => dispatch({ type: 'comments', value: event.target.value })}
        error={Boolean(error)}
        helperText={error}
        multiline
        rows={3}
      />
      <Spacer height={16} />
    </>
  );
};

export default EditField;
