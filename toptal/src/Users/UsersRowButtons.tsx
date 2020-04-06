import React, {useCallback, useContext, useEffect, useState} from "react";
import {
  Icon,
  IconButton,
  Menu,
  MenuItem,
  TableCell, Tooltip,
} from "@material-ui/core";
import Spacer from "../shared/Spacer";
import {User} from "General";
import FlexRow from "../shared/flex-grid/FlexRow";
import MainContext from "../Main/MainContext";
import WarningDialog from "../shared/WarningDialog";
import useFetchSave from "../hooks/useFetchSave";
import EditUser from "./EditUser";
import Loading from "../shared/Loading";
import SnackMessage from "../shared/SnackMessage";

interface IProps {
  user: User;
  refreshUsers: () => void;
}

const UsersRowButtons = ({user, refreshUsers}: IProps) => {
  const {mainState: {windowSize}} = useContext(MainContext);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDeleteError, setOpenDeleteError] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const [deleteStatus, performDelete] = useFetchSave();
  const handleDelete = useCallback(() => {
    const body = {id: user.id};
    performDelete(body, 'api/deleteUser');
  }, [user, performDelete]);

  useEffect(() => {
    if (deleteStatus.status === 'success') {
      refreshUsers();
      setOpenDelete(false);
    }
    if (deleteStatus.status === 'failure') {
      setOpenDelete(false);
      setOpenDeleteError(true);
    }
  }, [deleteStatus, refreshUsers]);

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
        <MenuItem onClick={() => setOpenEdit(true)}>Edit</MenuItem>
        <MenuItem onClick={() => setOpenDelete(true)}>Delete</MenuItem>
      </Menu>
      <WarningDialog
        open={openDelete}
        topText="Warning: Delete User"
        middleText={`Are you sure you want to delete this user?`}
        proceedText="Delete"
        cancelText="Return"
        onClose={() => setOpenDelete(false)}
        onProceed={handleDelete}
        height={250}
        icon="delete"
      />
      {openEdit && (
        <EditUser
          user={user}
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          refreshUsers={refreshUsers}
        />
      )}
      <Loading open={deleteStatus === 'in progress'} title="Deleting trip"/>
      <SnackMessage
        open={openDeleteError}
        onClose={() => setOpenDeleteError(false)}
        message="This user has associated trips. Delete their trips before deleting the user."
        type="error"
      />
    </>
  );
};

export default UsersRowButtons;
