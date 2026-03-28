import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useTheme } from "../../context/ThemeContext";
import { useDashboard } from "../../context/DashboardContext";


export default function TasksPerEmployeeBarChart() {
    const { theme } = useTheme();
    const {topEmployees} = useDashboard();
    return (
        <ResponsiveContainer width="100%" height='100%'>
            <BarChart data={topEmployees}>
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey="username" />
                <YAxis />
                <Tooltip labelStyle={{ color: theme === "dark" ? "#0f172b" : "#ffffff" }} />
                <Bar dataKey="taskCount" fill={theme === 'dark' ? "#ffffff" : "#0f172b"} radius={[3, 3, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}