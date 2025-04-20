import React from 'react'
import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router';

const AdminProtectedRoutes = ({ children }) => {

    const { user } = useAuth();


    // Not logged in
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // Logged in but not admin
    if (user.role !== 'admin') {
        return <div className="text-center text-red-500 text-xl mt-10">Access Denied: Admins Only</div>;
    }


    return <>{children}</>
}

export default AdminProtectedRoutes