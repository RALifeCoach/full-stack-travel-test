import React, {useCallback, useEffect, useReducer} from "react";
import {IAction, User} from "General";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography
} from "@material-ui/core";
import FlexColumn from "../shared/flex-grid/FlexColumn";
import FlexRow from "../shared/flex-grid/FlexRow";
import UpdateHandling from "../shared/UpdateHandling";
import Spacer from "../shared/Spacer";
import useFetchSave from "../hooks/useFetchSave";
import SelectField from "../shared/SelectField";
import {v4 as uuidV4} from 'uuid';

interface IProps {
  user: User;
  open: boolean;
  onClose: () => void;
  refreshUsers: () => void;
}

interface IEditUserState extends User {
  idError: string;
  nameError: string;
  roleError: string;
}

const EditUser = ({user, open, onClose, refreshUsers}: IProps) => {
  const [state, dispatch] = useReducer((state: IEditUserState, action: IAction) => {
    return {...state, [action.type]: action.value};
  }, {
    ...user,
    idError: '',
    nameError: '',
    roleError: '',
  });

  const {id, userId, idError, userName, nameError, role, roleError} = state;

  useEffect(() => {
    dispatch({type: 'idError', value: Boolean(userId) ? '' : 'Required'});
  }, [dispatch, userId]);
  useEffect(() => {
    dispatch({type: 'nameError', value: Boolean(userName) ? '' : 'Required'});
  }, [dispatch, userName]);

  useEffect(() => {
    dispatch({type: 'roleError', value: Boolean(role) ? '' : 'Required'});
  }, [dispatch, role]);

  const [status, performUpdate] = useFetchSave();
  const handleUpdate = useCallback((state) => {
    const {id, userId, idError, userName, nameError, role, roleError} = state;
    if (idError || nameError || roleError) {
      return;
    }
    const body = {
      userId,
      userName,
      role,
    } as any;
    if (id) {
      body.id = id;
    } else {
      body.password = uuidV4().toString();
      alert(`For initial login use url: ${window.location.origin}/?id=${body.password}`);
    }
    performUpdate(body, 'api/updateUser/');
  }, [performUpdate]);

  useEffect(() => {
    if (status.status) {
      refreshUsers();
      onClose();
    }
  }, [status, onClose, refreshUsers]);

  const width = 350;
  const height = 600;
  return (
    <>
      <Dialog
        open={open}
        disableBackdropClick
        disableEscapeKeyDown
        PaperProps={{
          style: {
            width,
            height,
            maxWidth: width,
            maxHeight: height,
            minWidth: width,
            minHeight: height,
          },
        }}
        onClose={onClose}
      >
        <DialogTitle>
          <Typography variant="h2">
            {Boolean(id) ? 'Edit Trip' : 'Add Trip'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <FlexColumn>
            <Divider style={{width: '100%'}}/>
            <Typography variant={"subtitle1"}>User Id</Typography>
            <TextField
              value={userId}
              onChange={event => dispatch({type: 'userId', value: event.target.value})}
              error={Boolean(idError)}
              helperText={idError}
            />
            <Spacer height={16}/>
            <Typography variant={"subtitle1"}>User Name</Typography>
            <TextField
              value={userName}
              onChange={event => dispatch({type: 'userName', value: event.target.value})}
              error={Boolean(nameError)}
              helperText={nameError}
            />
            <Spacer height={16}/>
            <Typography variant={"subtitle1"}>Role</Typography>
            <SelectField
              value={role}
              onChange={value => dispatch({type: 'role', value})}
              error={roleError}
              options={[
                {
                  value: 'general',
                  label: 'General',
                },
                {
                  value: 'admin',
                  label: 'User Admin',
                },
                {
                  value: 'super',
                  label: 'Super',
                },
              ]}
            />
          </FlexColumn>
        </DialogContent>
        <DialogActions>
          <FlexRow justify="flex-end">
            <Button
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleUpdate(state)}
            >
              Save
            </Button>
          </FlexRow>
        </DialogActions>
      </Dialog>
      <UpdateHandling status={status} title="Updating Travel..."/>
    </>
  );
};

export default EditUser;
