import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const PublicOnlyRoute: React.FC = () => {
    const token = localStorage.getItem('token');

    if (token) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
export default PublicOnlyRoute;