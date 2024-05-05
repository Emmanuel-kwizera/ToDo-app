import { useEffect } from "react";
import React, { useNavigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
  return localStorage.getItem("authToken") ? <Component {...rest} /> : null;
};

export default PrivateRoute;
