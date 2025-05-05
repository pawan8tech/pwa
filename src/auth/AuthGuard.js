import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = Object.keys(authService.getAuthData())?.length > 0;

  useEffect(() => {
    if (isAuthenticated === null) return;

    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <>{children}</> : null;
};

export default AuthGuard;
