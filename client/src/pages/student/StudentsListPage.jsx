import React, { useEffect, useState } from 'react';
import { instance } from '../../config/instance';
import { Link } from 'react-router';

const StudentsListPage = () => {
    const [students, setStudents] = useState([]);
    const [branch, setBranch] = useState('');
    const [year, setYear] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');



    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            try {
                const response = await instance.get(`/students?branch=${branch}&year=${year}`);
                const { success, data } = response;

                const fetchedStudents = data.students;

                if (success) {
                    const sortedStudents = fetchedStudents.sort((a, b) => a.year - b.year);
                    setStudents(sortedStudents);
                } else {
                    setError('Failed to fetch students.');
                }
            } catch (err) {
                setError('An error occurred while fetching students.', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [branch, year]);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-sky-500">Students List</h2>
                <p className="text-gray-600 mt-2">View and manage the list of students based on branch and year.</p>
            </div>

            {/* Filter Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                {/* <h3 className="text-xl font-semibold text-gray-800 mb-4">Filters</h3> */}
                <div className="flex items-center justify-center gap-6">
                    <div className="flex flex-col w-48">
                        <label htmlFor="branch" className="text-lg text-gray-800 font-medium mb-2">Branch</label>
                        <select
                            id="branch"
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Branch</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="Electrical Engineering">Electrical Engineering</option>
                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                            <option value="Civil Engineering">Civil Engineering</option>
                            <option value="Information Technology">Information Technology</option>
                        </select>
                    </div>

                    <div className="flex flex-col w-48">
                        <label htmlFor="year" className="text-lg text-gray-800 font-medium mb-2">Year</label>
                        <select
                            id="year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Year</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="container">



                {/* Table Section */}
                {loading ? (
                    <div className="text-center text-xl text-sky-600">Loading students...</div>
                ) : error ? (
                    <div className="text-center text-xl text-red-600">{error}</div>
                ) : (
                    <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
                        <table className="min-w-full table-auto">
                            <thead className="bg-sky-700 text-white">
                                <tr>
                                    <th className="py-3 px-4 text-left">First Name</th>
                                    <th className="py-3 px-4 text-left">Last Name</th>
                                    <th className="py-3 px-4 text-left">Email</th>
                                    <th className="py-3 px-4 text-left">Branch</th>
                                    <th className="py-3 px-4 text-left">Year</th>
                                    <th className="py-3 px-4 text-left">Status</th>
                                    <th className="py-3 px-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {students.map((student, index) => (
                                    <tr
                                        key={student.id}
                                        className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                            }`}
                                    >
                                        <td className="py-3 px-4">{student.first_name}</td>
                                        <td className="py-3 px-4">{student.last_name}</td>
                                        <td className="py-3 px-4">{student.email}</td>
                                        <td className="py-3 px-4">{student.branch}</td>
                                        <td className="py-3 px-4">{student.year}</td>
                                        <td className="py-3 px-4">{student.status}</td>
                                        <td className="py-3 px-4">
                                            <Link
                                                to={`/students/${student.id}/add-performance`}
                                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded transition"
                                            >
                                                Add Performance
                                            </Link>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentsListPage;
