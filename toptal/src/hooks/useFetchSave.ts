import { useCallback, useContext, useReducer } from "react";
import { IAction, IDispatch } from "General";
import MainContext from "../Main/MainContext";
import { IFetchSaveState } from "General";

const useFetchSave = () => {
  const {
    mainState: { user },
    config,
  } = useContext(MainContext);

  const [state, dispatch] = useReducer(
    (state: IFetchSaveState, action: IAction) => {
      switch (action.type) {
        case "in progress":
          return { ...state, status: action.type };
        case "success":
          return { ...state, status: action.type, response: action.value };
        case "resetStatus":
          return { ...state, status: "" };
        case "waitStatus":
          return { ...state, status: "waiting" };
        case "error":
          return { ...state, status: "error", response: action.value };
        default:
          return { ...state, status: "failure", exception: action.value };
      }
    },
    {
      response: null,
      status: "",
      exception: null,
    }
  );

  return [
    state as { response: any; status: string | null; exception: Error | null },
    useCallback(
      (body: any, url: string, type: string = "POST") => {
        try {
          dispatch({ type: "in progress", value: null });
          const fullUrl = `${config.API_URL}/${url}`;
          fetch(fullUrl, {
            method: type,
            headers: new Headers({
              Authorization: user?.token || "",
              "Content-Type": "application/json",
            }),
            body: JSON.stringify(body),
          })
            .then((response) => {
              if (!response.ok) {
                if (!response.statusText) {
                  return response.json();
                }
                dispatch({
                  type: "failure",
                  value: new Error(response.statusText),
                });
                return;
              }
              return response.json();
            })
            .then((response) => {
              if (!response) {
                dispatch({
                  type: "failure",
                  value: new Error("unknown error"),
                });
                return;
              }
              if (response.status && response.status === "failure") {
                dispatch({ type: "failure", value: new Error(response.error) });
                return;
              }
              dispatch({ type: "success", value: response });
            })
            .catch((ex) => {
              dispatch({ type: "failure", value: ex });
            });
        } catch (ex) {
          dispatch({ type: "failure", value: ex });
        }
      },
      [user, config.API_URL]
    ) as any,
    dispatch as IDispatch,
  ];
};

export default useFetchSave;
