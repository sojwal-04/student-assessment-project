// utils/performance.js

export const getPerformanceCategory = (score) => {
    if (score >= 90)
      return { label: "Excellent", bg: "bg-green-100 text-green-800" };
    if (score >= 75)
      return { label: "Good", bg: "bg-blue-100 text-blue-800" };
    if (score >= 60)
      return { label: "Average", bg: "bg-yellow-100 text-yellow-800" };
    if (score >= 50)
      return { label: "Below Average", bg: "bg-orange-100 text-orange-800" };
    return { label: "Needs Improvement", bg: "bg-red-100 text-red-800" };
  };
  