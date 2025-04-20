import { Routes, Route } from 'react-router-dom'

// Student Pages
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import StudentDashboardPage from './pages/student/StudentDashboardPage'
import AttendancePage from './pages/student/AttendancePage'
import GradesPage from './pages/student/GradesPage'

// Faculty Pages
import FacultyLoginPage from './pages/faculty/FacultyLoginPage'
import FacultyDashboardPage from './pages/faculty/FacultyDashboardPage'
import AddAttendancePage from './pages/faculty/AddAttendancePage'
import AddGradesPage from './pages/faculty/AddGradesPage'

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'

import ManageSubjectsPage from './pages/admin/ManageSubjectsPage'

// Common Pages
import NotFoundPage from './pages/NotFoundPage'
import DefaultLayout from './layout/DefaultLayout'
import AddStudentPage from './pages/student/AddStudentPage'
import StudentsListPage from './pages/student/StudentsListPage'
import AddPerformance from './pages/student/AddPerformancePage'
import AddPerformancePage from './pages/student/AddPerformancePage'
import StudentsReport from './pages/student/StudentsReport'
import AdminProtectedRoutes from './protected/AdminProtectedRoutes'
import AdminFacultyProtectedRoutes from './protected/AdminFacultyProtectedRoutes'
import FacultyProtectedRoutes from './protected/FacultyProtectedRoutes'
import AddFacultyPage from './pages/faculty/AddFacultyPage'
import FacultyListPage from './pages/faculty/FacultyListPage'
import CheckPeformancePage from './pages/CheckPeformancePage'

function App() {
    return (
        <Routes>
            {/* Routes wrapped in DefaultLayout */}
            <Route element={<DefaultLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path='/check-performance' element={<CheckPeformancePage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Student */}
                <Route path='/students/add'
                    element={
                        <AdminFacultyProtectedRoutes>
                            <AddStudentPage />
                        </AdminFacultyProtectedRoutes>}
                />
                {/* <Route path="/students/dashboard" element={<StudentDashboardPage />} /> */}
                <Route path="/students/:studentId/add-performance"
                    element={
                        <FacultyProtectedRoutes>
                            <AddPerformancePage />
                        </FacultyProtectedRoutes>
                    } />
                <Route path="/students/report"
                    element={
                        <AdminFacultyProtectedRoutes>
                            <StudentsReport />
                        </AdminFacultyProtectedRoutes>
                    } />
                <Route path="/students/list" element={
                    <AdminFacultyProtectedRoutes>
                        <StudentsListPage />
                    </AdminFacultyProtectedRoutes>} />

                {/* New Link for Faculty */}

                {/* Faculty */}
                <Route path="/faculty/login" element={<FacultyLoginPage />} />
                <Route path="/faculty/dashboard" element={<FacultyDashboardPage />} />
                <Route path="/faculty/add"
                    element={<AdminProtectedRoutes>
                        <AddFacultyPage />
                    </AdminProtectedRoutes>} />

                <Route path="/faculty/list"
                    element={<AdminProtectedRoutes>
                        <FacultyListPage />
                    </AdminProtectedRoutes>} />


                {/* Admin */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

            </Route>

            {/* Not Found fallback route (outside layout) */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default App
