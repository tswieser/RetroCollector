import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import "./auth.css"

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button onClick={onLogout} className="logOut_btn">LOG OUT</button>;
};

export default LogoutButton;
