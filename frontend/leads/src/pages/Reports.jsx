import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allLeads } from "../../store/leads-slice";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
// constants
const STATUSES = ["New", "Interested", "Converted", "Rejected"];

const Reports = () => {
  const dispatch = useDispatch();
  const { data = [] } = useSelector((state) => state.leads);

  // filters
  const [fStatus, setFStatus] = useState("");
  const [fCity, setFCity] = useState("");
  const [fService, setFService] = useState("");
  const [fDateF, setFDateF] = useState("");

  useEffect(() => {
    dispatch(allLeads());
  }, [dispatch]);

  // dynamic dropdowns
  const cities = [...new Set(data.map((l) => l.city).filter(Boolean))];
  const services = [...new Set(data.map((l) => l.service).filter(Boolean))];

  // filtering
  const filtered = useMemo(() => {
    return data.filter((l) => {
      if (fStatus && l.status !== fStatus) return false;
      if (fCity && l.city !== fCity) return false;
      if (fService && l.service !== fService) return false;

      // ✅ single date match
      if (fDateF) {
        const leadDate = new Date(l.createdAt).toDateString();
        const selectedDate = new Date(fDateF).toDateString();

        if (leadDate !== selectedDate) return false;
      }

      return true;
    });
  }, [data, fStatus, fCity, fService, fDateF]);

  // calculations
  const totalBudget = filtered.reduce((s, l) => s + Number(l.budget || 0), 0);

  // export csv
  const exportCSV = () => {
    const header = [
      "Name",
      "Mobile",
      "Email",
      "City",
      "Service",
      "Budget",
      "Status",
      "Date",
    ].join(",");

    // export pdf

    const rows = filtered.map((l) =>
      [
        `"${l.name}"`,
        l.mobile,
        l.email,
        l.city,
        `"${l.service}"`,
        l.budget,
        l.status,
        new Date(l.createdAt).toLocaleDateString("en-IN"),
      ].join(",")
    );

    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `leads_report_${Date.now()}.csv`;
    a.click();

    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Leads Report", 14, 15);

    const columns = [
      "Name",
      "Mobile",
      "City",
      "Service",
      "Budget",
      "Status",
      "Date",
    ];

    const rows = filtered.map((l) => [
      l.name,
      l.mobile,
      l.city,
      l.service,
      `Rs ${Number(l.budget || 0).toLocaleString()}`,
      l.status,
      new Date(l.createdAt).toLocaleDateString("en-IN"),
    ]);

    autoTable(doc, {
      startY: 25,
      head: [columns],
      body: rows,
    });

    doc.save(`leads_report_${Date.now()}.pdf`);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">Reports & Export</h2>
        <p className="text-sm text-slate-400">Track and analyze your leads</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-5">
        <div className="font-bold text-sm text-slate-800 mb-4">
          Filter Leads
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={fStatus}
            onChange={(e) => setFStatus(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="">All Status</option>
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <select
            value={fCity}
            onChange={(e) => setFCity(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="">All Cities</option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            value={fService}
            onChange={(e) => setFService(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="">All Services</option>
            {services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          {/* ✅ single date */}
          <input
            type="date"
            value={fDateF}
            onChange={(e) => setFDateF(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          />

          <button
            onClick={() => {
              setFStatus("");
              setFCity("");
              setFService("");
              setFDateF("");
            }}
            className="px-4 py-2 bg-slate-100 rounded-lg text-sm"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        <div className="bg-white p-4 rounded-xl border">
          <p className="text-xs text-slate-400">Filtered Leads</p>
          <h3 className="text-lg font-bold text-sky-600">{filtered.length}</h3>
        </div>

        <div className="bg-white p-4 rounded-xl border">
          <p className="text-xs text-slate-400">Total Budget</p>
          <h3 className="text-lg font-bold text-purple-600">
            ₹{(totalBudget / 100000).toFixed(1)}L
          </h3>
        </div>

        <div className="bg-white p-4 rounded-xl border">
          <p className="text-xs text-slate-400">Converted</p>
          <h3 className="text-lg font-bold text-green-600">
            {filtered.filter((l) => l.status === "Converted").length}
          </h3>
        </div>

        <div className="bg-white p-4 rounded-xl border">
          <p className="text-xs text-slate-400">Avg Budget</p>
          <h3 className="text-lg font-bold text-yellow-600">
            {filtered.length
              ? `₹${Math.round(totalBudget / filtered.length)}`
              : "—"}
          </h3>
        </div>
      </div>

      {/* Export */}
      <div className="flex justify-end mb-4">
        <button
          onClick={exportCSV}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-sky-500 text-white text-sm font-bold"
        >
          ⬇ Export CSV ({filtered.length})
        </button>
        <button
          onClick={exportPDF}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold"
        >
          📄 Export PDF
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="overflow-auto max-h-[450px]">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 sticky top-0">
              <tr className="text-slate-500 text-xs uppercase">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-left">City</th>
                <th className="p-3 text-left">Service</th>
                <th className="p-3 text-right">Budget</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((l) => (
                <tr key={l._id} className="border-t hover:bg-slate-50">
                  <td className="p-3">
                    <div className="font-semibold">{l.name}</div>
                    <div className="text-xs text-slate-400">{l.email}</div>
                  </td>

                  <td className="p-3">{l.mobile}</td>
                  <td className="p-3">{l.city}</td>

                  <td className="p-3">
                    <span className="bg-sky-100 text-sky-700 px-2 py-1 rounded-full text-xs">
                      {l.service}
                    </span>
                  </td>

                  <td className="p-3 text-right font-semibold">
                    ₹{Number(l.budget).toLocaleString()}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${
                        l.status === "Converted"
                          ? "bg-green-100 text-green-700"
                          : l.status === "Interested"
                          ? "bg-yellow-100 text-yellow-700"
                          : l.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {l.status}
                    </span>
                  </td>

                  <td className="p-3 text-xs text-slate-400">
                    {new Date(l.createdAt).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-10 text-slate-400">
              No leads found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
