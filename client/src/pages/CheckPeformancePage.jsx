import React, { useState } from "react";
import { toast } from "react-toastify";
import { instance } from "../config/instance";
import { getPerformanceCategory } from "../utils/performance";

const CheckPerformancePage = () => {
    const [email, setEmail] = useState("");
    const [student, setStudent] = useState(null);
    const [performances, setPerformances] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!email) return;

        setLoading(true);
        try {
            const studentRes = await instance.get(`/students/by-email/${email}`);
            const studentData = studentRes.data.student;

            const perfRes = await instance.get(`/students/${studentData.id}/performance`);

            setStudent(studentData);
            setPerformances(perfRes.data.performances);
        } catch (err) {
            toast.error("Student not found or failed to fetch data.");
            setStudent(null);
            setPerformances([]);
        } finally {
            setLoading(false);
        }
    };

    const calculateAveragePerformanceScore = () => {
        if (!performances.length) return null;

        const scores = performances.map((p) => {
            const cgpaPart = p.cgpa * 10 * 0.6;
            const attendancePart = p.attendance_percentage * 0.15;
            const extraPart = p.extracurricular_score * 0.25;
            return cgpaPart + attendancePart + extraPart;
        });

        const totalScore = scores.reduce((sum, score) => sum + score, 0);
        return parseFloat(totalScore / scores.length).toFixed(2);
    };


    const avgScore = calculateAveragePerformanceScore();
    const category = avgScore ? getPerformanceCategory(avgScore) : null;

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-8">
            {/* Search Section */}
            <div className="bg-white shadow rounded-lg p-6">
                <label className="block mb-2 text-sm font-semibold text-gray-700">Enter Student Email</label>
                <div className="flex gap-3">
                    <input
                        type="email"
                        placeholder="student@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-medium"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Student Info */}
            {loading ? (
                <div className="text-blue-500 text-center">Loading student data...</div>
            ) : (
                student && (
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-blue-700 mb-1">
                            {student.first_name} {student.last_name}
                        </h2>
                        <div className="text-gray-700 mb-2">
                            <span className="mr-4"><strong>Branch:</strong> {student.branch}</span>
                            <span><strong>Year:</strong> {student.year}</span>
                        </div>
                        {avgScore && (
                            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${category.bg}`}>
                                Avg. Performance Score: {avgScore} ({category.label})
                            </div>
                        )}
                    </div>
                )
            )}

            {/* Performance Table */}
            {student && (
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 border-b pb-2 text-gray-800">Semester-wise Performances</h3>
                    {performances?.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-left text-gray-800">
                                <thead>
                                    <tr className="bg-sky-100">
                                        <th className="px-4 py-2">Semester</th>
                                        <th className="px-4 py-2">CGPA</th>
                                        <th className="px-4 py-2">Attendance %</th>
                                        <th className="px-4 py-2">Extracurricular</th>
                                        <th className="px-4 py-2">Rank</th>
                                        <th className="px-4 py-2">Grade</th>
                                        <th className="px-4 py-2">Remarks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {performances
                                        ?.sort((a, b) => a.semester - b.semester)
                                        .map((p) => (
                                            <tr key={p.id} className="hover:bg-gray-50 border-b">
                                                <td className="px-4 py-2">Sem - {p.semester}</td>
                                                <td className="px-4 py-2">{parseFloat(p.cgpa).toFixed(2)}</td>
                                                <td className="px-4 py-2">{parseFloat(p.attendance_percentage).toFixed(2)}%</td>
                                                <td className="px-4 py-2">{parseFloat(p.extracurricular_score).toFixed(2)}</td>
                                                <td className="px-4 py-2">{p.academic_rank || "-"}</td>
                                                <td className="px-4 py-2">{p.grade || "-"}</td>
                                                <td className="px-4 py-2">{p.remarks || "-"}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500">No performance records found for this student.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CheckPerformancePage;
