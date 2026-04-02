import { PieChart, Pie, Tooltip, Legend } from "recharts";
import { useDashboard } from "../../context/DashboardContext";

export default function TasksStatusPieChart() {
    const { tasksStats } = useDashboard();
    const { tasksCount, completedTasksCount, PendingTasksCount, inProgressTasksCount } = tasksStats;

     const data = [
        { name: "Pending", value: PendingTasksCount, fill: "#AD250A" },
        { name: "In Progress", value: inProgressTasksCount, fill: "#0560F5" },
        { name: "Completed", value: completedTasksCount, fill: "#007075" },
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
