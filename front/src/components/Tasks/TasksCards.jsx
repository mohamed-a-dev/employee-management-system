import { useTask } from "../../context/TaskContext";
import TaskCard from "./TaskCard";

export default function TaskCards({ }) {
    const { tasks } = useTask();

    return (
        <section className="grid grid-cols-[1fr] md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr] xl:grid-cols-[1fr_1fr_1fr_1fr] gap-5">

            {
                tasks.map((task) =>
                    <TaskCard key={task._id} task={task} />
                )
            }
        </section>
    );
}