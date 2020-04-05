import React from "react";
import MainContext from "./MainContext";
import Trips from "../Trips/Trips";
import Users from "../Users/Users";

function AppDisplayComponent() {
  const {mainState: {menu, user}} = React.useContext(MainContext);

  if (!user) {
    return null;
  }
  if (menu) {
    localStorage.setItem('main.menu', menu);
  }

  switch (menu) {
    case 'trips':
      return <Trips/>;
    case 'users':
      return <Users/>;
    default:
      throw new Error(`Unknown menu ${menu}`);
  }
}

export default AppDisplayComponent;
