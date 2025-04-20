import React, { useEffect, useState } from 'react';
import { instance } from '../../config/instance';
import { useAuth } from '../../context/authContext';
import { Users, BarChart3, PlusCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FacultyDashboardPage = () => {
  const { user } = useAuth();
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { success, data } = await instance.get('/stats/faculty');

        console.log(data);
        if (success) setOverview(data.facultyStats);
      } catch (err) {
        console.error('Error fetching faculty stats', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 mt-8">
      <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">Welcome, {user?.first_name} 👋</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <InfoCard icon={<Users className="text-sky-600 w-7 h-7" />} label="Total Students" value={overview?.total_students || '-'} />
        <InfoCard icon={<BarChart3 className="text-sky-600 w-7 h-7" />} label="Average CGPA" value={overview?.avg_cgpa || '-'} />
        <InfoCard icon={<AlertTriangle className="text-sky-600 w-7 h-7" />} label="Low Attendance" value={overview?.low_attendance_students || '-'} />
        <InfoCard icon={<PlusCircle className="text-sky-600 w-7 h-7" />} label="Performances Recorded" value={overview?.total_performances || '-'} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/students/list" className="bg-sky-600 text-white py-3 px-5 text-center rounded-lg hover:bg-sky-700">
          View Students
        </Link>
        <Link to="/students/report" className="bg-sky-600 text-white py-3 px-5 text-center rounded-lg hover:bg-sky-700">
          View Performances
        </Link>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition flex items-center space-x-4">
    {icon}
    <div>
      <p className="text-gray-600 text-sm">{label}</p>
      <h4 className="text-xl font-bold text-gray-800">{value}</h4>
    </div>
  </div>
);

export default FacultyDashboardPage;
