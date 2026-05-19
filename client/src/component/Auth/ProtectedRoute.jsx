import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../../main";

const ProtectedRoute = ({ children }) => {
    const { isAuthorized } = useContext(Context);

    return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
