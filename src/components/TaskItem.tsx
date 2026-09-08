import { useState } from "react";
import type { ITask, ITaskFormData } from "../interfaces/ITask";
import TaskForm from "./TaskForm";

interface TaskItemProps {
    task: ITask;
    onUpdate: (taskId: string, data: ITask) => void;
    onRemove: (taskId: string) => void;
    onComplete: (taskId: string) => void;
}

export default function TaskItem({ task, onUpdate, onRemove, onComplete }: TaskItemProps) {

    const [isEditing, setIsEditing] = useState(false);

    const statusClass =
        task.status === "concluída" ? "task-done" :
        task.status === "em progresso" ? "task-progress" : "task-pending";

    const isOverdue = new Date(task.dueDate) < new Date() && task.status !== "concluída";

    const handleEdit = (data: ITaskFormData) => {
        onUpdate(task.id, { ...data, id: task.id });
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <TaskForm
                onSubmit={handleEdit}
                onCancel={() => setIsEditing(false)}
                initialData={{
                    title: task.title,
                    description: task.description,
                    dueDate: task.dueDate,
                    status: task.status,
                }}
            />
        );
    }

    return (

        <div className={ `task-item ${statusClass} ${isOverdue ? "task-overdue" : ""}`}>
            <div className="task-content">
                <h4>{task.title}</h4>
                <p>{task.description}</p>

                <div className="task-meta">
                    <span className={`status-badge ${statusClass}`}>{task.status}</span>
                    <span className="due-date">
                        {new Date(task.dueDate).toLocaleDateString("pt-PT")}
                    </span>
                    {isOverdue && <span className="overdue-badge">Atrasada</span>}
                </div>
            </div>

            <div className="task-actions">
                {task.status !== "concluída" && (
                    <button className="btn btn-success btn-sm" onClick={() => onComplete(task.id)} title="Concluir">✓</button>
                    )}
                    <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(true)} title="Editar">✎</button>
                    <button className="btn btn-danger btn-sm" onClick={() => onRemove(task.id)} title="Remover">x</button>
            </div>


        </div>
    );
}
