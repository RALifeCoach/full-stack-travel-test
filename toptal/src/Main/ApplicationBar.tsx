import React, {useContext} from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
} from '@material-ui/core';
import Logo from './Logo.svg';
import LogoSmall from './LogoSmall.svg';
import {styled} from "@material-ui/styles";
import {themeColors} from "../theme";
import FlexColumn from "../shared/flex-grid/FlexColumn";
import FlexRow from "../shared/flex-grid/FlexRow";
import Spacer from "../shared/Spacer";
import MainContext from "./MainContext";
import ApplicationBarButtons from "./ApplicationBarButtons";

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
  const {mainState: {windowSize}} = useContext(MainContext);

  return (
    <Paper elevation={1} style={{
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
              {windowSize === 'tablet' || windowSize === 'phone'
                ? (
                  <FlexRow>
                    <Spacer/>
                    <img src={LogoSmall} alt="Logo"/>
                    <Spacer multiplier={2}/>
                    <Typography variant="h2" color="inherit" style={{marginTop: 8, color: '#262D3D'}}>
                      Travel
                    </Typography>
                  </FlexRow>
                )
                : (
                  <FlexRow>
                    <Spacer multiplier={2}/>
                    <img src={Logo} alt="Logo"/>
                    <Spacer multiplier={4}/>
                    <Typography variant="h2" color="inherit" style={{marginTop: 8, color: '#262D3D'}}>
                      Travel Management
                    </Typography>
                  </FlexRow>
                )
              }
              <ApplicationBarButtons tabValue={tabValue}/>
            </FlexRow>
          </FlexColumn>
        </StyledToolbar>
      </AppBar>
    </Paper>
  );
};

export default ApplicationBar;
