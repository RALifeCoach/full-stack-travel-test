import React, {useEffect} from "react";
import useFetchGet from "../hooks/useFetchGet";
import {User} from "General";
import {Paper, Typography} from "@material-ui/core";

const Users = () => {
  const [users, fetchUsers] = useFetchGet();
  useEffect(() => {
    fetchUsers('api/users');
  }, [fetchUsers]);

  return (
    <>
      <Paper elevation={1} style={{padding: 16, margin: '96px 16px 16px 16px'}}>
        <Typography variant="h2">Users</Typography>
        {(users?.data || []).map((user:User) => (
          <div>{user.userName}</div>
        ))}
      </Paper>
    </>
  );
};

export default Users;
