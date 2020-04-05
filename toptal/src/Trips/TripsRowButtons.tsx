import React, {useCallback, useContext, useEffect, useState} from "react";
import {
  Icon,
  IconButton,
  Menu,
  MenuItem,
  TableCell, Tooltip,
} from "@material-ui/core";
import Spacer from "../shared/Spacer";
import {TripDetails} from "General";
import FlexRow from "../shared/flex-grid/FlexRow";
import MainContext from "../Main/MainContext";
import WarningDialog from "../shared/WarningDialog";
import useFetchSave from "../hooks/useFetchSave";
import UpdateHandling from "../shared/UpdateHandling";

interface IProps {
  trip: TripDetails;
}

const TripsRowButtons = ({trip}: IProps) => {
  const {mainState: {windowSize}} = useContext(MainContext);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleEdit = useCallback(() => {

  }, []);

  const [deleteStatus, performDelete] = useFetchSave();
  const handleDelete = useCallback(() => {
    const body = {id: trip.id};
    performDelete(body, 'api/deleteTrip');
  }, [trip, performDelete]);

  useEffect(() => {
    if (deleteStatus.status === 'success') {
      setOpenDelete(false);
    }
  }, [deleteStatus]);

  return (
    <>
      <TableCell>
        {windowSize === 'phone'
          ? (
            <IconButton
              style={{width: 24}}
              onClick={(event: any) => setAnchorEl(event.target)}
            >
              <Icon>menu</Icon>
            </IconButton>
          )
          : (
            <FlexRow>
              <IconButton
                onClick={() => setOpenEdit(true)}
              >
                <Tooltip
                  title="Edit"
                  placement="top"
                  arrow
                >
                  <Icon>create</Icon>
                </Tooltip>
              </IconButton>
              <Spacer/>
              <IconButton
                onClick={() => setOpenDelete(true)}
              >
                <Tooltip
                  placement="top"
                  title="Delete"
                  arrow
                >
                  <Icon>delete</Icon>
                </Tooltip>
              </IconButton>
            </FlexRow>
          )
        }
      </TableCell>
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
      <WarningDialog
        open={openDelete}
        topText="Warning: Delete Trip"
        middleText={`Are you sure you want to delete this trip?`}
        proceedText="Delete"
        cancelText="Return"
        onClose={() => setOpenEdit(false)}
        onProceed={handleDelete}
        height={250}
        icon="delete"
      />
      <UpdateHandling status={deleteStatus} title="Deleting trip"/>
    </>
  );
};

export default TripsRowButtons;
