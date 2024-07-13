import React, { useReducer, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContexts";
import authReducer from "../Reducers/authReducer";

const Authentication = (props) => {
  const initialValue = {
    authenticated: false,
    email: "",
  };

  const [currentUser, dispatch] = useReducer(authReducer, initialValue);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      dispatch({ type: "SET_CURRENT_USER", payload: JSON.parse(storedUser) });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default Authentication;
