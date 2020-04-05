import React, {useContext} from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs, Paper,
} from '@material-ui/core';
import Logo from './Logo.svg';
import NotificationIcon from './NotificationIcon';
import {makeStyles, styled} from "@material-ui/styles";
import {themeColors} from "../theme";
import FlexColumn from "../shared/flex-grid/FlexColumn";
import FlexRow from "../shared/flex-grid/FlexRow";
import Spacer from "../shared/Spacer";
import AppMenuItem from "./AppMenuItem";
import MainContext from "./MainContext";

const MENU_ITEMS = [
  {
    title: 'Trips',
    value: 'trips',
    roles: ['general', 'super'],
  },
  {
    title: 'Users',
    value: 'users',
    roles: ['users', 'super'],
  },
];

const useStyles = makeStyles(() => ({
  indicator: {
    backgroundColor: `${themeColors.brand[900]} !important`,
  },
}));

const StyledToolbar = styled(Toolbar)({
  backgroundColor: '#D2D6E2',
  color: '#FFFFFF',
  padding: 8,
  zIndex: 10000,
});

const StyledTypography = styled(Typography)({
  '&:hover': {
    color: themeColors.brand[500],
  }
});

export const AppBarTypography = (props: any) => {
  const {children, ...rest} = props;
  return (
    <StyledTypography
      variant="subtitle1"
      style={{textTransform: 'none', color: '#262D3D'}}
      {...rest}
    >
      {children}
    </StyledTypography>
  );
};

interface IProps {
  tabValue: string;
}

const ApplicationBar = ({tabValue}: IProps) => {
  const {mainState: {user}} = useContext(MainContext);
  const classes = useStyles();

  return (
    <Paper elevation={1} style={{
      height: 80,
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 600,
    }}>
      <AppBar>
        <StyledToolbar>
          <FlexColumn style={{width: '100%'}}>
            <FlexRow justify="space-between" style={{width: '100%'}}>
              <FlexRow>
                <Spacer multiplier={2}/>
                <img src={Logo} alt="Logo"/>
                <Spacer multiplier={4}/>
                <Typography variant="h2" color="inherit" style={{marginTop: 8, color: '#262D3D'}}>
                  Travel Management
                </Typography>
              </FlexRow>
              <FlexRow>
                <Tabs
                  value={tabValue}
                  classes={{indicator: classes.indicator}}
                >
                  {MENU_ITEMS
                    .filter(menu => {
                      if (!user) {
                        return false;
                      }
                      return menu.roles.indexOf(user?.role) > -1;
                    })
                    .map(menu => (
                    <AppMenuItem
                      title={menu.title}
                      value={menu.value}
                      key={menu.value}
                    />
                  ))}
                </Tabs>
                <Spacer multiplier={2}/>
                <NotificationIcon/>
                <Spacer multiplier={2}/>
              </FlexRow>
            </FlexRow>
          </FlexColumn>
        </StyledToolbar>
      </AppBar>
    </Paper>
  );
};

export default ApplicationBar;
