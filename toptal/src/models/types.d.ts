declare module 'General' {
  export type IAction = { type: string, value: any };

  export type IDispatch = (action: IAction) => void

  export interface ISelect {
    value: number,
    label: any
  }

  export interface User {
    token: string;
    role: string;
    userName: string;
    userId: string;
    id: number;
  }

  export interface TripDetails {
    id?: number;
    destination?: string;
    startDate?: string;
    endDate?: string;
    comments?: string;
  }

  export interface IFetchSaveState {
    response: any;
    status: string;
    exception: any;
  }
}
