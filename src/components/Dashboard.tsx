import { useState } from "react";
import type { IProject, IProjectFormData } from "../interfaces/IProject";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface DashboardProps {

  projects: IProject[];
  onCreate: (data: IProjectFormData) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;

}

export default function Dashboard({ projects, onCreate, onDelete, onView }: DashboardProps) {

  const [showForm, setShowForm] = useState(false);

  const handleCreate = (data: IProjectFormData) => {

    onCreate(data);
    setShowForm(false);

  };

  const handleDelete = (id: string) => {

    if (window.confirm("Tem a certeza que quer apagar este projecto?")) {
      onDelete(id);
    }

  };

  return (

    <div>

      <div className="dashboard-header">

        <h2>Dashboard — Projectos</h2>

        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancelar" : "+ Novo Projecto"}
        </button>

      </div>

      {showForm && <ProjectForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />}
      {projects.length === 0 ? (
        <p className="empty-msg">Nenhum projeto ainda. Cria o primeiro!</p>
      ) : (
        <div className="project-grid">
          {projects.map(p => <ProjectCard key={p.id} project={p} onDelete={handleDelete} onView={onView} />)}
        </div>
      )}

    </div>
  );

}
