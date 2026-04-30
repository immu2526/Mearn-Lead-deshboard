// pages/Leads.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { allLeads, deleteLeads } from "../../store/leads-slice";

const Leads = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading } = useSelector((state) => state.leads);

  const [val, setVal] = useState("");

  useEffect(() => {
    dispatch(allLeads());
  }, [dispatch]);

  const filterList = (data || []).filter(
    (item) =>
      item.name?.toLowerCase().includes(val.toLowerCase()) ||
      item.city?.toLowerCase().includes(val.toLowerCase()) ||
      item.service?.toLowerCase().includes(val.toLowerCase())
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-700";
      case "Interested":
        return "bg-yellow-100 text-yellow-700";
      case "Converted":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getServiceStyle = (service) => {
    switch (service) {
      case "Design":
        return "bg-purple-50 text-purple-800";
      case "Development":
        return "bg-blue-50 text-blue-800";
      case "Marketing":
        return "bg-amber-50 text-amber-800";
      case "SEO":
        return "bg-green-50 text-green-800";
      case "Support":
        return "bg-red-50 text-red-800";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-slate-400 text-sm">Loading leads...</p>
      </div>
    );

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      {/* Header */}
      <h3 className="text-sm font-semibold text-slate-700 mb-4">All Leads</h3>

      {/* Search + Add */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Search by name, city or service..."
          className="flex-1 py-2.5 px-4 rounded-lg text-sm text-slate-700 border border-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-colors"
        />
        <button
          onClick={() => navigate("/leads/add")}
          className="py-2.5 px-4 text-sm font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700 transition-colors whitespace-nowrap"
        >
          + Add
        </button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-slate-100 overflow-y-auto max-h-[420px]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            {/* Sticky Header */}
            <thead className="bg-slate-50 sticky top-0 z-10">
              <tr className="border-b border-slate-100">
                {["Name", "City", "Service", "Budget", "Status", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className={`
                      text-xs text-slate-400 font-semibold py-3 px-4 whitespace-nowrap
                      ${h === "Actions" ? "text-right" : "text-left"}
                    `}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {filterList.map((lead) => (
                <tr
                  key={lead._id}
                  className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                >
                  <td className="py-2.5 px-4 text-sm font-medium text-slate-700 whitespace-nowrap">
                    {lead.name}
                  </td>
                  <td className="py-2.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                    {lead.city}
                  </td>
                  <td className="py-2.5 px-4 whitespace-nowrap">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${getServiceStyle(
                        lead.service
                      )}`}
                    >
                      {lead.service}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-sm font-semibold text-slate-700 whitespace-nowrap">
                    ₹{lead.budget?.toLocaleString() ?? "N/A"}
                  </td>
                  <td className="py-2.5 px-4 whitespace-nowrap">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusStyle(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => navigate(`/leads/edit/${lead._id}`)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-green-800 text-white hover:bg-green-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        dispatch(deleteLeads(lead._id))
                          .then((res) => console.log(res.payload.message))
                          .catch((err) => console.log(err));
                      }}
                      className="text-xs px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty state */}
          {filterList.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-sm">
              No leads found!
            </div>
          )}
        </div>
      </div>

      {/* Row count */}
      <p className="text-xs text-slate-400 mt-2 text-right">
        Showing {filterList.length} of {data?.length ?? 0} leads
      </p>
    </div>
  );
};

export default Leads;
