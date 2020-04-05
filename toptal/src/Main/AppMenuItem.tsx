import React from 'react';
import {Tab} from "@material-ui/core";
import {AppBarTypography} from "./ApplicationBar";
import MainContext from "./MainContext";

interface IProps {
  title: string;
  value: string;
}

const AppMenuItem = ({title, value}: IProps) => {
  const {mainDispatch} = React.useContext(MainContext);

  return (
    <Tab
      label={(<AppBarTypography>{title}</AppBarTypography>)}
      value={value}
      onClick={() => {
        mainDispatch({type: 'menu', value: value});
      }}
    />
  );
};

export default AppMenuItem;
