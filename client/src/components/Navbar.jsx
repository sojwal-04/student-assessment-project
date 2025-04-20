import React from 'react'
import { NavLink } from 'react-router-dom'  // Import from react-router-dom instead of react-router
import { useAuth } from '../context/authContext'

// Fake hook (replace with your actual auth logic later)
// const useAuth = () => {
//     return {
//         isLoggedIn: true, // or false
//         role: 'faculty', // 'student' | 'faculty' | 'admin'
//         user: {
//             name: 'John Doe'
//         }
//     }
// }

const Navbar = () => {
    const { user, onLogout } = useAuth()


    const handleLogout = (e) => {
        e.preventDefault();
        onLogout()
    }

    console.log("herereeeee", user);

    const renderNavLinks = () => {
        if (!user?.isLoggedIn) return null

        switch (user.role) {
            // case 'student':
            //     return (
            //         <>
            //             <NavLink to="/student/dashboard">Dashboard</NavLink>
            //             <NavLink to="/student/attendance">Attendance</NavLink>
            //             <NavLink to="/student/grades">Grades</NavLink>
            //             <NavLink to="/student/cgpa">CGPA</NavLink>
            //         </>
            //     )
            case 'faculty':
                return (
                    <>
                        <NavLink to="/faculty/dashboard">Dashboard</NavLink>

                        <NavLink to="/students/add">Add Student</NavLink>
                        <NavLink to="/students/report">Report</NavLink>
                        {/* <NavLink to="/faculty/manage-students">Manage Students</NavLink> */}
                        <NavLink to="/students/list">Students List</NavLink> {/* New Link for Faculty */}
                    </>
                )
            case 'admin':
                return (
                    <>
                        <NavLink to="/admin/dashboard">Dashboard</NavLink>
                        <NavLink to="/faculty/add">Add Faculty</NavLink>
                        <NavLink to="/faculty/list">Faculty List</NavLink>
                        <NavLink to="/students/list">Students List</NavLink>
                        <NavLink to="/students/add">Add Student</NavLink>
                        <NavLink to="/students/report">Report</NavLink>
                    </>
                )
            default:
                return (
                    <>
                        <NavLink to="/admin/login">Admin Login</NavLink>
                        <NavLink to="/faculty/login">Faculty Login</NavLink>
                        <NavLink to="/student/grades">Student Login</NavLink>
                    </>
                )
        }
    }

    return (
        <nav className="bg-blue-200 sticky top-0 z-[100]">
            <div className="container">
                <div className="py-4 flex items-center justify-between gap-4">
                    {/* Left: App Name */}
                    <div className="text-xl font-semibold text-blue-900">
                        <NavLink to={'/'} >

                            PerfTrack
                        </NavLink>
                    </div>

                    {/* Middle: Navigation */}
                    <div className="flex gap-6 text-blue-900 font-medium">
                        {renderNavLinks()}
                    </div>

                    {/* Right: User Info or Login */}
                    <div className="text-blue-900">
                        {user?.isLoggedIn ? (

                            <div className='flex items-center gap-4 justify-end'>

                                <span>
                                    {user?.role === 'faculty' && 'Faculty:'}{" "}
                                    {user?.role === 'student' && 'Student:'}{" "}
                                    {user?.role === 'admin' && 'Admin:'}{" "}
                                    <strong>{user?.username?.toUpperCase() || `${user?.first_name} ${user?.last_name}`}</strong>
                                </span>

                                <button
                                    className='bg-rose-500 hover:bg-rose-600 text-white font-medium px-4 py-2 rounded'
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>

                            </div>
                        ) : (
                            <>
                                <div className='flex items-center gap-4 font-bold'>
                                    <NavLink to="/check-performance" className="text-blue-700">
                                        Check Performance
                                    </NavLink>

                                    <NavLink to="/admin/login" className="text-blue-700">
                                        Admin Login
                                    </NavLink>


                                    <NavLink to="/faculty/login" className="text-blue-700">
                                        Faculty Login
                                    </NavLink>

                                </div>
                            </>

                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
