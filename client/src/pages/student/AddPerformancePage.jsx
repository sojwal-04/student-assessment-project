import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../config/instance";
import { toast } from "react-toastify";

const AddPerformancePage = () => {
    const { studentId } = useParams();
    const [student, setStudent] = useState(null);
    const [performances, setPerformances] = useState([]);
    const [formData, setFormData] = useState({
        semester: "",
        attendance_percentage: "",
        extracurricular_score: "",
        cgpa: "",
        academic_rank: "",
        grade: "",
        remarks: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            const [sRes, pRes] = await Promise.all([
                instance.get(`/students/s/${studentId}`),
                instance.get(`/students/${studentId}/performance`),
            ]);

            setStudent(sRes.data.student);
            setPerformances(pRes.data.performances);
        };

        fetchData();
    }, [studentId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await instance.put("/students/add-performance", {
            ...formData,
            student_id: studentId,
        });

        const updated = await instance.get(`/students/${studentId}/performance`);

        setPerformances(updated?.data?.performances);

        setFormData({
            semester: "",
            attendance_percentage: "",
            extracurricular_score: "",
            cgpa: "",
            academic_rank: "",
            grade: "",
            remarks: "",
        });

        toast.success("Performance added successfully!");
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Student Info Section */}
            {student && (
                <div className="mb-6 bg-white p-6 rounded shadow-md">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-2">{`${student.first_name} ${student.last_name}`}</h2>
                    <p className="text-gray-600">
                        <strong>Branch:</strong> {student.branch}
                    </p>
                    <p className="text-gray-600">
                        <strong>Year:</strong> {student.year}
                    </p>
                </div>
            )}

            {/* Form Section */}
            <form
                onSubmit={handleSubmit}
                className="grid gap-6 bg-white p-6 rounded shadow-md mb-10"
            >
                <h3 className="text-xl font-semibold text-gray-800">Add Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="semester" className="block mb-1 text-sm font-medium">
                            Semester
                        </label>
                        <select
                            id="semester"
                            value={formData.semester}
                            onChange={(e) =>
                                setFormData({ ...formData, semester: e.target.value })
                            }
                            required
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>
                                Select Semester
                            </option>
                            {[...Array(8)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    Semester {i + 1}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="attendance_percentage"
                            className="block mb-1 text-sm font-medium"
                        >
                            Attendance %
                        </label>
                        <input
                            id="attendance_percentage"
                            type="number"
                            placeholder="e.g. 92"
                            min="0"
                            max="100"
                            value={formData.attendance_percentage}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    attendance_percentage: e.target.value,
                                })
                            }
                            required
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="extracurricular_score"
                            className="block mb-1 text-sm font-medium"
                        >
                            Extracurricular Score
                        </label>
                        <input
                            id="extracurricular_score"
                            type="number"
                            placeholder="e.g. 85"
                            min="0"
                            max="100"
                            value={formData.extracurricular_score}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    extracurricular_score: e.target.value,
                                })
                            }
                            required
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="cgpa" className="block mb-1 text-sm font-medium">
                            CGPA
                        </label>
                        <input
                            id="cgpa"
                            type="number"
                            placeholder="e.g. 8.75"
                            min="1"
                            max="10"
                            step="0.01"
                            value={formData.cgpa}
                            onChange={(e) =>
                                setFormData({ ...formData, cgpa: e.target.value })
                            }
                            required
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="academic_rank"
                            className="block mb-1 text-sm font-medium"
                        >
                            Academic Rank (Optional)
                        </label>
                        <input
                            id="academic_rank"
                            type="text"
                            placeholder="e.g. 5th"
                            value={formData.academic_rank}
                            onChange={(e) =>
                                setFormData({ ...formData, academic_rank: e.target.value })
                            }
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="grade" className="block mb-1 text-sm font-medium">
                            Grade (Optional)
                        </label>
                        <input
                            id="grade"
                            type="text"
                            placeholder="e.g. A+"
                            value={formData.grade}
                            onChange={(e) =>
                                setFormData({ ...formData, grade: e.target.value })
                            }
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="remarks" className="block mb-1 text-sm font-medium">
                        Remarks (Optional)
                    </label>
                    <textarea
                        id="remarks"
                        placeholder="Any remarks..."
                        value={formData.remarks}
                        onChange={(e) =>
                            setFormData({ ...formData, remarks: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded px-3 py-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-fit bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
                >
                    Submit
                </button>
            </form>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4 border-b pb-2">Previous Performances</h3>
                {performances?.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-gray-700 border-separate border-spacing-y-2">
                            <thead className="">
                                <tr>
                                    {[
                                        "Semester",
                                        "CGPA",
                                        "Attendance %",
                                        "Extra Score",
                                        "Rank",
                                        "Grade",
                                        "Remarks",
                                    ].map((header) => (
                                        <th
                                            key={header}
                                            className="text-left px-4 py-2 bg-gray-100 rounded-tl rounded-tr text-sm font-medium"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {performances
                                    .sort((a, b) => a.semester - b.semester)
                                    .map((p, _) => (
                                        <tr
                                            key={p.id}
                                            className="bg-gray-50 hover:bg-gray-100 transition-all shadow rounded"
                                        >
                                            <td className="px-4 py-2 rounded-l">Sem - {p.semester}</td>
                                            <td className="px-4 py-2">{p.cgpa}</td>
                                            <td className="px-4 py-2">{p.attendance_percentage}</td>
                                            <td className="px-4 py-2">{p.extracurricular_score}</td>
                                            <td className="px-4 py-2">{p.academic_rank || "-"}</td>
                                            <td className="px-4 py-2">{p.grade || "-"}</td>
                                            <td className="px-4 py-2 rounded-r">{p.remarks || "-"}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-600 mt-2">No performance records found.</p>
                )}
            </div>

        </div>
    );
};

export default AddPerformancePage;
