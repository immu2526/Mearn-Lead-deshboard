import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { allLeads } from "../../store/leads-slice";
import { useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const STATUSES = ["New", "Interested", "Converted", "Rejected"];
const PIE_COLORS = ["#0ea5e9", "#eab308", "#22c55e", "#ef4444"];

//

const Dashboard = () => {
  const dispatch = useDispatch();
  let { data, isLoading } = useSelector((state) => state.leads);
  useEffect(() => {
    dispatch(allLeads());
  }, [dispatch]);

  if (isLoading) return <p>Loading ....</p>;

  console.log(data);

  const total = data.length;

  const byStatus = STATUSES.map((s) => ({
    name: s,
    value: data.filter((l) => l.status === s).length,
  }));

  const totalBudget = data.reduce((sum, l) => sum + Number(l.budget || 0), 0);

  const converted = data.filter((l) => l.status === "Converted").length;

  const monthlyData = (() => {
    const months = {};
    data.forEach((l) => {
      const m = new Date(l.createdAt).toLocaleString("default", {
        month: "short",
      });
      months[m] = (months[m] || 0) + 1;
    });
    return Object.entries(months).map(([name, value]) => ({ name, value }));
  })();

  // city

  const byCity = Object.values(
    data.reduce((acc, l) => {
      if (!l.city) return acc;

      if (!acc[l.city]) {
        acc[l.city] = { name: l.city, value: 0 };
      }

      acc[l.city].value += 1;
      return acc;
    }, {})
  );

  // service

  const byService = Object.values(
    data.reduce((acc, l) => {
      if (!l.service) return acc;

      // normalize (optional but recommended)
      let service = l.service;

      if (service === "Web Development") service = "Development";

      if (!acc[service]) {
        acc[service] = { name: service, value: 0 };
      }

      acc[service].value += 1;

      return acc;
    }, {})
  );

  return (
    <>
      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow">Total: {total}</div>
          <div className="bg-white p-4 rounded-xl shadow">
            Converted: {converted}
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            Budget: ₹{(totalBudget / 100000).toFixed(1)}L
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-5 rounded-xl mb-6">
          <h3>Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={byStatus} dataKey="value">
                {byStatus.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-5 rounded-xl">
          <h3>Monthly Leads</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line dataKey="value" stroke="#14b8a6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* city chart */}

        <div className="bg-white p-5 rounded-xl mt-6">
          <h3 className="font-bold text-sm mb-4">City-wise Distribution</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={byCity} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="value" fill="#0ea5e9" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* district chart */}

        <div className="bg-white p-5 rounded-xl mt-6">
          <h3 className="font-bold text-sm mb-4">Service-wise Distribution</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={byService}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#a855f7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
