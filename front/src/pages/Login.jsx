import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { displayError } from "../utils/displayError";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { theme, toggleTheme } = useTheme();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { setIsAuth, setEmployee } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value });

  const login = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password)
      return;

    setLoading(true);

    const api = import.meta.env.VITE_API_URL + 'auth/login';
    try {
      const res = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) {
        displayError(data.errorMsg, 'login');
        return;
      }
      localStorage.setItem('employees-dashboard-token', data.token);
      setIsAuth(true);
      setEmployee(data.employee);
    }
    catch (error) {
      displayError(error.message, 'login');
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 duration-300">

      <div className="w-90 sm:w-120 p-8 space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Login to Dashboard
          </h2>

          <button
            onClick={toggleTheme}
            className="text-sm px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-white cursor-pointer"
          >
            {theme === 'light' ? "Dark" : "Light"}
          </button>
        </div>


        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 dark:text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-600 dark:text-gray-300">
              Password
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2 mt-1 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:scheme-dark"
              />
            </label>

          </div>

          <button
            type="submit"
            disabled={!form.email || !form.password ? true : false}
            className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer duration-300 disabled:cursor-not-allowed"
            onClick={login}
          >
            {loading ? 'Trying to login' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}


export default Login