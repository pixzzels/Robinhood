import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import "./LogoutButton.css"

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    dispatch(logout());
  };

  return <button onClick={onLogout} id="logout">Logout</button>;
};

export default LogoutButton;
