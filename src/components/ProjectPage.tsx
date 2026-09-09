
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { IProject, IProjectFormData } from "../interfaces/IProject";
import type  { ITask, ITaskFormData } from "../interfaces/ITask";
import { useProjects } from "../hooks/useProjects";
import { useTasks } from "../hooks/useTasks";
import { Project } from "../models/Project";
import ProjectForm from "./ProjectForm";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

export default function ProjectPage() {

  const { id } = useParams<{ id: string }>();

  const { projects, loadProjects, updateProject } = useProjects();

  const [showTaskForm, setShowTaskForm] = useState(false);

  const [editingProject, setEditingProject] = useState(false);

  // Procurar o projeto no global state

  const projectData: IProject | null = projects.find(p => p.id === id) || null;

  // Hook das tarefas

  const { addTask, updateTask, removeTask, completeTask } = useTasks(projectData);

  useEffect(() => {

    if (projects.length === 0) loadProjects();

  }, [projects.length, loadProjects]);

  if (!projectData) {

    return (

      <div className="loading-container">

        <div className="spinner"></div>

        <p>Carregando...</p>

      </div>
    );
  }
  
  const project = new Project(projectData);

  const progress = project.getProgress();

  const counts = project.getTaskCountByStatus();


  const handleEditProject = async (data: IProjectFormData) => {

    await updateProject({ ...projectData, name: data.name, description: data.description });

    setEditingProject(false);

  };

  const handleAddTask = async (data: ITaskFormData) => {

    await addTask(data);
    setShowTaskForm(false);

  };

  const handleUpdateTask = async (taskId: string, taskData: ITask) => {

    await updateTask(taskId, taskData);

  };

  return (

    <div className="project-page">

      <Link to="/projects" className="back-link">Voltar</Link>

      {editingProject ? (

        <ProjectForm onSubmit={handleEditProject} onCancel={() => setEditingProject(false)}
          initialData={{ name: projectData.name, description: projectData.description }} />
      
        ) : (

        <div className="project-detail-header">

          <div>

            <h2>{projectData.name}</h2>
            <p>{projectData.description}</p>

          </div>

          <button className="btn btn-secondary" onClick={() => setEditingProject(true)}>Editar Projeto</button>
        
        </div>

      )}

      <div className="progress-section">

        <h3>Progresso: {progress}%</h3>

        <div className="progress-bar-container large">

          <div className="progress-bar" style={{ width: `${progress}%` }}>{progress}%</div>
       
        </div>

        <div className="task-summary">

          <span className="badge badge-pending">{counts["pendente"]} pendentes</span>
          <span className="badge badge-progress">{counts ["em progresso"]} em progresso</span>
          <span className="badge badge-done">{counts.concluída} concluídas</span>

        </div>

      </div>

      <div className="tasks-section">

        <div className="tasks-header">

          <h3>Tarefas ({projectData.tasks.length})</h3>

          <button className="btn btn-primary" onClick={() => setShowTaskForm (!showTaskForm)}>
            
            {showTaskForm ? "Cancelar" : "+ Nova Tarefa"}

          </button>

        </div>

        {showTaskForm && <TaskForm onSubmit={handleAddTask} onCancel={() => setShowTaskForm(false)} />}
        
        <TaskList tasks={projectData.tasks} onUpdate={handleUpdateTask} onRemove={removeTask} onComplete={completeTask} />

      </div>

    </div>

  );

}
