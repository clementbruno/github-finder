import React, { useReducer } from "react";
import AlertReducer from "./AlertReducer";
import AlertContext from "./AlertContext";
import { SET_ALERT, REMOVE_ALERT } from "../types";

function AlertState(props) {
  const initialState = null;

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  function setAlert(msg, type) {
    dispatch({
      type: SET_ALERT,
      payload: { msg, type },
    });

    setTimeout(() => {
      removeAlert();
    }, 3000);
  }

  function removeAlert() {
    dispatch({ type: REMOVE_ALERT });
  }

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
}

export default AlertState;
