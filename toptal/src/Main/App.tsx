import React, {useContext} from 'react';
import ApplicationBar from "./ApplicationBar";
import MainContext from "./MainContext";
import Login from "../Login/Login";
import AppDisplayComponent from "./AppDisplayComponent";
import QueryString from 'query-string';
import SetPassword from "../Login/SetPassword";

function App() {
  const {mainState: {menu, user}} = useContext(MainContext);
  const queryParams = QueryString.parse(window.location.search);
  if (queryParams.id) {
    return (
      <>
        <ApplicationBar tabValue={menu}/>
        <SetPassword
          id={queryParams.id as string}
        />
      </>
    );
  }

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
