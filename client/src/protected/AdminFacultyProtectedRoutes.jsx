import React from 'react'
import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router';

const AdminFacultyProtectedRoutes = ({ children }) => {


    const { user } = useAuth();


    // Not logged in
    if (!user) {
        return <Navigate to="/" replace />;
    }




    // console.log("###################");
    // console.log(user.role !== 'admin' && user.role !== 'faculty');
    // console.log("#############3");
    // Logged in but not admin
    if (user.role !== 'admin' && user.role !== 'faculty') {
        return (
          <div className="text-center text-red-500 text-xl mt-10">
            Access Denied: Admins or Faculty Only
          </div>
        );
      }


    return <>{children}</>
}

export default AdminFacultyProtectedRoutes