import type { ITask } from "../interfaces/ITask";
import TaskItem from "./TaskItem";

interface TaskListProps {
    tasks: ITask[];
    onUpdate: (tasId: string, data: ITask) => void;
    onRemove: (taskId: string) => void;
    onComplete: (taskId: string) => void;
}

export default function TaskList({ tasks, onUpdate, onRemove, onComplete }: TaskListProps) {

        if (tasks.length === 0) {
        return <p className="empty-msg">Projecto sem tarefas. Adicona uma!</p>
    }

    return (
        <div className="task-list">
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} onUpdate={onUpdate} onRemove={onRemove} onComplete={onComplete} />
            ))}
        </div>
    );

}