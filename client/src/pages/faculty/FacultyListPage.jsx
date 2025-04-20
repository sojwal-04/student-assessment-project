import React, { useEffect, useState } from 'react';
import { instance } from '../../config/instance';

const FacultyListPage = () => {
    const [faculties, setFaculties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch faculties from the API
    useEffect(() => {
        const fetchFaculties = async () => {
            setLoading(true);
            try {
                const { success, data } = await instance.get('/faculty');

                if (success) {
                    setFaculties(data.faculties); // assuming faculties are returned in `data.faculties`
                } else {
                    setError('Failed to fetch faculties.');
                }
            } catch (err) {
                setError('An error occurred while fetching faculties.', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFaculties();
    }, []);

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-sky-600">Faculty List</h2>
                <p className="text-gray-600 mt-2">Manage and view the list of faculty members.</p>
            </div>

            {error && <div className="text-center text-xl text-red-600 mb-4">{error}</div>}

            {/* Table Section */}
            {loading ? (
                <div className="text-center text-xl text-sky-600">Loading faculties...</div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                    <table className="min-w-full table-auto">
                        <thead className="bg-sky-700 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">Full Name</th>
                                <th className="py-3 px-4 text-left">Email</th>
                                <th className="py-3 px-4 text-left">Contact</th>
                                <th className="py-3 px-4 text-left">Department</th>
                                <th className="py-3 px-4 text-left">Qualifications</th>
                                <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {faculties.map((faculty) => (
                                <tr key={faculty.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4">{`${faculty.first_name} ${faculty.last_name}`}</td>
                                    <td className="py-3 px-4">{faculty.email}</td>
                                    <td className="py-3 px-4">{faculty.contact_number}</td>
                                    <td className="py-3 px-4">{faculty.department || 'N/A'}</td>
                                    <td className="py-3 px-4">{faculty.qualifications || 'N/A'}</td>
                                    <td className="py-3 px-4">
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded transition">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default FacultyListPage;
