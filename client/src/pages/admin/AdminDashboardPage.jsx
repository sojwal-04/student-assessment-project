import React, { useEffect, useState } from 'react';

import {
  Users,
  UserCheck,
  LineChart,
  Star,
  AlertTriangle,
} from 'lucide-react';
import { instance } from '../../config/instance';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { success, data } = await instance.get('/stats/admin');
        if (success) {


            console.log("0000000000000000000000000000000000000");
            console.log(data.adminStats);
          setStats(data.adminStats);
        }
      } catch (err) {
        console.error('Failed to load stats', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-sky-600 text-lg font-semibold mt-10">
        Loading dashboard...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center text-red-600 mt-10">
        Failed to load dashboard data.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-8">
      <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard icon={<Users className="text-sky-600 w-8 h-8" />} title="Total Students" value={stats.total_students} />
        <DashboardCard icon={<UserCheck className="text-sky-600 w-8 h-8" />} title="Total Faculties" value={stats.total_faculties} />
        <DashboardCard icon={<LineChart className="text-sky-600 w-8 h-8" />} title="Average CGPA" value={stats.avg_cgpa} />
        <DashboardCard icon={<Star className="text-sky-600 w-8 h-8" />} title="Avg Extracurricular" value={stats.avg_extracurricular} />
        <DashboardCard icon={<AlertTriangle className="text-sky-600 w-8 h-8" />} title="Low Attendance (<75%)" value={stats.low_attendance_students} />
      </div>
    </div>
  );
};

const DashboardCard = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
    <div className="flex items-center space-x-4">
      {icon}
      <div>
        <h4 className="text-lg font-semibold text-gray-700">{title}</h4>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

export default AdminDashboardPage;
