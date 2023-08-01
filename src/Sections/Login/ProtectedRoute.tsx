import * as React from 'react';
import { Navigate, Outlet } from "react-router-dom";

type Props = {
    children: React.ReactChild;
  };
  
export const ProtectedRoute = ( {children}: Props) => {
const Token= sessionStorage.getItem('auth');
  if (!Token) {
    return <Navigate to="/" />;
  }
  return <>{children}</>
};