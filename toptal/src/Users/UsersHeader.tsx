import React from "react";
import {
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

const UsersHeader = () => {
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell>User Id</TableCell>
          <TableCell>Full Name</TableCell>
          <TableCell>Role</TableCell>
          <TableCell/>
        </TableRow>
      </TableHead>
    </>
  );
};

export default UsersHeader;
