import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { displayError } from "../utils/displayError";
import { displaySuccess } from "../utils/displaySuccess";

export default function Settings() {
  const token = localStorage.getItem('employees-dashboard-token');

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value, });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword)
      return displayError("New passwords do not match", 'change password');

    setLoading(true);

    try {
      const api = import.meta.env.VITE_API_URL + 'employees/change-password';
      const res = await fetch(api, {
        method: "PATCH",
        headers: {
          authorization: 'Bearer ' + token,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
          confirmPassword: form.confirmPassword
        }),
      });

      const data = await res.json();
      if (!res.ok)
        return displayError(data.errorMsg, 'change password')

      displaySuccess("Password updated successfully");
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
    catch (error) {
      displayError(error.message, 'change password');
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <section className='px-5 py-5 min-h-[calc(100vh-72px)] dark:bg-slate-800 bg-white duration-300 dark:text-white '>
      <PageHeader title={'Settings'} />
      <div className="p-5 w-80 sm:w-120 md:w-120 m-auto dark:bg-slate-900 dark:text-white text-black border-black/50 dark:border-white/30 border">
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>

        <form onSubmit={handleSubmit} className="space-y-10">
          <input
            type="text"
            name="currentPassword"
            placeholder="Current Password"
            value={form.currentPassword}
            onChange={handleChange}
            className="w-full p-2 outline-none border-b dark:border-white/50 dark:bg-slate-800/50"
            required
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full p-2 outline-none border-b dark:border-white/50 dark:bg-slate-800/50 dark:scheme-dark"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 outline-none border-b dark:border-white/50 dark:bg-slate-800/50 dark:scheme-dark"
            required
          />

          <button
            disabled={loading}
            className="px-4 py-2 w-full text-green-500 bg-slate-700 hover:bg-slate-800 duration-300  cursor-pointer"
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>

      </div>    </section>
  );
}