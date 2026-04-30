import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createLeads } from "../../store/leads-slice";
const AddLead = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    service: "",
    budget: "",
    status: "New",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(form);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createLeads(form))
      .then((res) => {
        console.log(res);
        navigate("/leads");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">Add New Lead</h2>
        <p className="text-sm text-slate-400 mt-1">
          Fill the new leads Details
        </p>
      </div>

      {/* Form Card */}

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all"
                required
              />
            </div>

            {/* Mobile */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Mobile
              </label>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="10-digit number"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all"
                required
              />
            </div>

            {/* Email  */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all"
                required
              />
            </div>

            {/* City */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                City
              </label>
              <select
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all"
                required
              >
                <option value="">— Select City —</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Pune">Pune</option>
                <option value="Chennai">Chennai</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Jaipur">Jaipur</option>
              </select>
            </div>

            {/* Service*/}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Service
              </label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all"
                required
              >
                <option value="">— Select Service —</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Marketing">Marketing</option>
                <option value="SEO">SEO</option>
                <option value="Support">Support</option>
              </select>
            </div>

            {/* Budget*/}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Budget (₹)
              </label>
              <input
                type="number"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                placeholder="Enter budget"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all"
                required
              />
            </div>

            {/* Status*/}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all"
                required
              >
                <option value="New">New</option>
                <option value="Interested">Interested</option>
                <option value="Converted">Converted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="border-t border-slate-100 mt-6 pt-5 flex gap-3">
            <button
              type="submit"
              // onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-sky-500 text-white text-sm font-bold hover:opacity-90 transition-opacity"
            >
              ✚ Add Lead
            </button>
            <button
              type="button"
              onClick={() => navigate("/leads")}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddLead;
