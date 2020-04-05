import React, {useCallback, useContext, useMemo, useState} from 'react';
import {Fab, Menu, MenuItem,} from '@material-ui/core';
import MainContext from "./MainContext";

const NotificationIcon = () => {
  const {mainDispatch, mainState: {user}} = useContext(MainContext);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('toptal:user');
    mainDispatch({type: 'user', value: null});
    handleClose();
  }, [mainDispatch, handleClose]);

  const displayInitials = useMemo(() => {
    if (!user) {
      return '';
    }
    const initials = user.userName.split(' ');
    const initial1 = initials[0].substr(0, 1).toUpperCase();
    const initial2 = initials[initials.length - 1].substr(0, 1).toUpperCase();
    return `${initial1}${initial2}`;
  }, [user]);

  return (
    <>
      <Fab
        size="small"
        style={{marginTop: 6}}
        onClick={event => setAnchorEl(event.currentTarget)}
      >
        {displayInitials}
      </Fab>
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
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default NotificationIcon;
