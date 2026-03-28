import { PieChart, Pie, Tooltip, Legend } from "recharts";
import { useDashboard } from "../../context/DashboardContext";

export default function TasksStatusPieChart() {
    const { tasksStats } = useDashboard();
    const { tasksCount, completedTasksCount, PendingTasksCount, inProgressTasksCount } = tasksStats;

    const data = [
        { name: "Pending", value: PendingTasksCount, fill: "#facc15" },
        { name: "In Progress", value: inProgressTasksCount, fill: "#3b82f6" },
        { name: "Completed", value: completedTasksCount, fill: "#22c55e" },
    ];

    return (
        <PieChart width="100%" height="100%">
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
            />
            <Tooltip />
            <Legend />
        </PieChart>
    );
}