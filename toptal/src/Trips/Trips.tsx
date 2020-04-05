import React, {useCallback, useEffect, useState} from "react";
import {
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  Typography
} from "@material-ui/core";
import Spacer from "../shared/Spacer";
import useFetchGet from "../hooks/useFetchGet";
import {TripDetails} from "General";
import TripsHeader from "./TripsHeader";
import TripsRow from "./TripsRow";

const Trips = () => {
  const [trips, fetchUsers] = useFetchGet();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);


  useEffect(() => {
    fetchUsers('api/trips');
  }, [fetchUsers]);

  const handleEdit = useCallback(() => {

  }, []);
  const handleDelete = useCallback(() => {

  }, []);

  return (
    <>
      <Paper elevation={1} style={{padding: 16, margin: '96px 16px 16px 16px'}}>
        <Typography variant="h2">Trips</Typography>
        <Spacer height={16}/>
        <Table size="small">
          <TripsHeader/>
          <TableBody>
            {(trips?.data || []).map((trip: TripDetails) => (
              <TripsRow trip={trip}/>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl as Element}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default Trips;
