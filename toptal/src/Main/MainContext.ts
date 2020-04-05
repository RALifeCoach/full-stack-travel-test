import React from 'react';
import {IDispatch, User} from "General";

export interface IMainContextState {
  user: null | User;
  menu: string;
  windowSize: string;
}

export interface IMainContext {
  mainDispatch: IDispatch;
  config: any;
  mainState: IMainContextState;
}

const MainContext = React.createContext({} as IMainContext);

export default MainContext;
