
import { useState } from "react";
import type { IProject, IProjectFormData } from "../interfaces/IProject";
import type { ITask, ITaskFormData } from "../interfaces/ITask";
import ProjectForm from "./ProjectForm";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

interface ProjectPageProps {

  project: IProject;
  onBack: () => void;
  onChange: (project: IProject) => void;

}

export default function ProjectPage({ project, onBack, onChange }: ProjectPageProps) {

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingProject, setEditingProject] = useState(false);

  const total = project.tasks.length;
  const completed = project.tasks.filter(t => t.status === "concluída").length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
  const pending = project.tasks.filter(t => t.status === "pendente").length;
  const inProgress = project.tasks.filter(t => t.status === "em progresso").length;

  const handleEditProject = (data: IProjectFormData) => {

    onChange({ ...project, name: data.name, description: data.description });
    setEditingProject(false);

  };

  const handleAddTask = (data: ITaskFormData) => {

    const newTask: ITask = { ...data, id: `t${Date.now()}` };
    onChange({ ...project, tasks: [...project.tasks, newTask] });
    setShowTaskForm(false);

  };

  const handleUpdateTask = (taskId: string, taskData: ITask) => {

    onChange({ ...project, tasks: project.tasks.map(t => t.id === taskId ? taskData : t) });

  };

  const handleRemoveTask = (taskId: string) => {

    onChange({ ...project, tasks: project.tasks.filter(t => t.id !== taskId) });

  };

  const handleCompleteTask = (taskId: string) => {

    onChange({
      ...project,
      tasks: project.tasks.map(t => t.id === taskId ? { ...t, status: "concluída" as const } : t),
    });

  };

  return (

    <div className="project-page">

      <button className="back-link" onClick={onBack}>← Voltar ao Dashboard</button>

      {editingProject ? (
        <ProjectForm onSubmit={handleEditProject} onCancel={() => setEditingProject(false)}
          initialData={{ name: project.name, description: project.description }} />
      ) : (
        <div className="project-detail-header">
          <div><h2>{project.name}</h2><p>{project.description}</p></div>
          <button className="btn btn-secondary" onClick={() => setEditingProject(true)}>Editar Projeto</button>
        </div>
      )}

      <div className="progress-section">

        <h3>Progresso: {progress}%</h3>

        <div className="progress-bar-container large">
          <div className="progress-bar" style={{ width: `${progress}%` }}>{progress}%</div>
        </div>

        <div className="task-summary">

          <span className="badge badge-pending">{pending} pendentes</span>
          <span className="badge badge-progress">{inProgress} em progresso</span>
          <span className="badge badge-done">{completed} concluídas</span>

        </div>

      </div>

      <div className="tasks-section">

        <div className="tasks-header">

          <h3>Tarefas ({project.tasks.length})</h3>

          <button className="btn btn-primary" onClick={() => setShowTaskForm(!showTaskForm)}>
            {showTaskForm ? "Cancelar" : "+ Nova Tarefa"}
          </button>

        </div>

        {showTaskForm && <TaskForm onSubmit={handleAddTask} onCancel={() => setShowTaskForm(false)} />}
        <TaskList tasks={project.tasks} onUpdate={handleUpdateTask} onRemove={handleRemoveTask} onComplete={handleCompleteTask} />

      </div>

    </div>

  );

}
