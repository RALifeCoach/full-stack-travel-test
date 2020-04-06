import React from "react";
import {
  TableCell,
  TableRow,
} from "@material-ui/core";
import {User} from "General";
import UsersRowButtons from "./UsersRowButtons";

interface IProps {
  user: User;
  refreshUsers: () => void;
}

const UsersRow = ({user, refreshUsers}: IProps) => {
  return (
    <>
      <TableRow>
        <TableCell>{user.userId}</TableCell>
        <TableCell>{user.userName}</TableCell>
        <TableCell>{user.role}</TableCell>
        <UsersRowButtons user={user} refreshUsers={refreshUsers}/>
      </TableRow>
    </>
  );
};

export default UsersRow;
