import React, { useEffect, useState } from 'react';
import { instance } from '../../config/instance';
import { Link } from 'react-router';
import { getPerformanceCategory } from '../../utils/performance';

const StudentsReport = () => {
    const [performances, setPerformances] = useState([]);
    const [branch, setBranch] = useState('');
    const [year, setYear] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPerformances = async () => {
            setLoading(true);
            try {
                const response = await instance.get(`/students/performances?branch=${branch}&year=${year}`);
                const { success, data } = response;

                const fetchedPerformances = data.performances;

                if (success) {
                    const sortedPerformances = fetchedPerformances.sort((a, b) => a.year - b.year);
                    setPerformances(sortedPerformances);
                } else {
                    setError('Failed to fetch performance records.');
                }
            } catch (err) {
                setError('An error occurred while fetching performance records.', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPerformances();
    }, [branch, year]);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-sky-500">Performance Records</h2>
                <p className="text-gray-600 mt-2">View and manage performance records based on branch and year.</p>
            </div>

            {/* Filter Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
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

            {/* Table Section */}
            {loading ? (
                <div className="text-center text-xl text-sky-600">Loading performance records...</div>
            ) : error ? (
                <div className="text-center text-xl text-red-600">{error}</div>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
                    <table className="min-w-full table-auto">
                        <thead className="bg-sky-700 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">Student Name</th>
                                <th className="py-3 px-4 text-left">Branch</th>
                                <th className="py-3 px-4 text-left">Year</th>
                                <th className="py-3 px-4 text-left">Performance Score</th>
                                <th className="py-3 px-4 text-left">Total Semesters</th>
                                <th className="py-3 px-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {performances.map((performance, index) => {
                                const category = getPerformanceCategory(performance.performance_score);

                                return (
                                    <tr
                                        key={performance.student_id}
                                        className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                                    >
                                        <td className="py-3 px-4">{`${performance.first_name} ${performance.last_name}`}</td>
                                        <td className="py-3 px-4">{performance.branch}</td>
                                        <td className="py-3 px-4">{performance.year}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded text-sm font-medium ${category.bg}`}>
                                                {parseFloat(performance.performance_score).toFixed(2)} ({category.label})
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">{performance.total_semesters}</td>
                                        <td className="py-3 px-4">
                                            <Link
                                                to={`/students/${performance.student_id}/add-performance`}
                                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded transition"
                                            >
                                                Add Performance
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}


                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default StudentsReport;
