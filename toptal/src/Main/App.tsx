import React, {useContext} from 'react';
import ApplicationBar from "./ApplicationBar";
import MainContext from "./MainContext";
import Login from "../Login/Login";
import AppDisplayComponent from "./AppDisplayComponent";

function App() {
  const {mainState: {menu, user}} = useContext(MainContext);
  return (
    <>
      <ApplicationBar tabValue={menu}/>
      {Boolean(user)
        ? (
          <AppDisplayComponent/>
        )
        : (
          <Login/>
        )
      }
    </>
  );
}

export default App;
