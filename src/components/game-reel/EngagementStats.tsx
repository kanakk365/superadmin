const engagementStats = [
  {
    label: "All Posts Total Likes",
    value: "5,755",
    icon: "👍",
    gradient: "bg-gradient-to-br from-purple-500 to-purple-700",
  },
  {
    label: "All Posts Total Favourite",
    value: "29",
    icon: "⭐",
    gradient: "bg-gradient-to-br from-blue-500 to-blue-700",
  },
  {
    label: "All Posts Total Comment",
    value: "114",
    icon: "💬",
    gradient: "bg-gradient-to-br from-indigo-500 to-indigo-700",
  },
];

export const EngagementStats = () => {
  return (
    <div className="flex flex-col gap-4">
      {engagementStats.map((stat) => (
        <div
          key={stat.label}
          className={`rounded-2xl ${stat.gradient} px-5 py-4 text-white`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm font-medium opacity-90">{stat.label}</p>
            </div>
            <div className="text-3xl opacity-80">{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
