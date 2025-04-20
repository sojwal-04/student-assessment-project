import React from 'react'

const HomePage = () => {
    return (
        <div className="container mt-16">
            {/* Hero Section */}
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Student Assessment & Performance Tracker</h1>
                <p className="text-lg text-gray-700 mb-6">
                    A simple system for tracking student performance, attendance, CGPA, and more.
                </p>
               
            </div>

            {/* About Section */}
            <div className="mt-20 text-center">
                <h2 className="text-2xl font-semibold mb-2">About This App</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    This application helps colleges manage student data, track attendance, view and assign grades,
                    and monitor overall performance, including CGPA and extra curricular activities.
                    Designed to be simple, fast, and efficient for faculty, students, and administrators.
                </p>
            </div>
        </div>
    )
}

export default HomePage
