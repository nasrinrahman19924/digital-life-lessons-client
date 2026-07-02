export default function DashboardCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <p className="text-gray-500">{title}</p>

      <h2 className="text-4xl font-bold mt-3">{value}</h2>
    </div>
  );
}
