import { useEffect, useState } from "react";
import { useProjects } from "../hooks/useProjects";
import type { IProject, IProjectFormData } from "../interfaces/IProject";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import { withLoading } from "../hoc/withLoading";

// Component que recebe os dados carregados

function ProjectGrid({ projects, onDelete }: {
  
  projects: IProject[];

  onDelete: (id: string) => void;

}) {

  if (projects.length === 0) {

    return <p className="empty-msg">0 Projectos ainda. Crie um projecto primeiro!</p>;
  }

  return (

    <div className="project-grid">

      {projects.map(p =>
        <ProjectCard key={p.id} project={p} onDelete={onDelete} />
      )}

    </div>
  );
}

// HOC - Spinner no ProjectGrid

const ProjectGridWithLoading = withLoading(ProjectGrid, "Carregando...");

export default function Dashboard() {

  const { projects, loading, error, loadProjects, createProject, deleteProject } = useProjects();

  const [showForm, setShowForm] = useState(false);

  // Load

  useEffect(() => {

    loadProjects();
  
  }, [loadProjects]);

  const handleCreate = async (data: IProjectFormData) => {
   
    await createProject(data);

    setShowForm(false);

  };

  const handleDelete = async (id: string) => {

    if (window.confirm("Tem a certeza que quer excluir o projecto?")) {

      await deleteProject(id);

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

      {error && <div className="error-banner">{error}</div>}

      {showForm && <ProjectForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />}
      
      <ProjectGridWithLoading loading={loading} projects={projects} onDelete={handleDelete} />

    </div>
  );

}
