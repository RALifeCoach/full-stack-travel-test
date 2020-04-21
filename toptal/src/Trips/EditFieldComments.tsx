import React from "react";
import { IDispatch } from "General";
import {
  TextField,
  Typography
} from "@material-ui/core";
import Spacer from "../shared/Spacer";

interface IProps {
  value: string;
  dispatch: IDispatch;
}

const EditField = ({ value, dispatch }: IProps) => {
  return (
    <>
      <Typography variant={"subtitle1"}>Comments</Typography>
      <TextField
        value={value}
        onChange={event => dispatch({ type: 'comments', value: event.target.value })}
        multiline
        rows={3}
      />
      <Spacer height={16} />
    </>
  );
};

export default EditField;
