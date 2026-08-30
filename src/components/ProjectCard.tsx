import { Link } from "react-router-dom";
import type { IProject } from "../interfaces/IProject";
import { Project } from "..//models/Project";

interface ProjectCardProps {
    project: IProject;
    onDelete: (id: string) => void;
}

// Classe Instanciada para uso dos metodos de negociacao getProgress
// e getTaskCountByStatus

export default function ProjectCard({ project, onDelete }: ProjectCardProps) {

    const proj = new Project(project);

    const progress = proj.getProgress();

    const counts = proj.getTaskCountByStatus();

    return (

        <div className="project-card">

                <div className="project-header">

                    <h3>{project.name}</h3>
                    <button className="btn btn-danger btn-sm" onClick={() => onDelete(project.id)} title="Excluir">x</button>
                
                </div>


            <p className="project-desc">{project.description}</p>

            <div className="progress-bar-container">

                <div className="progress-bar" style={{ width: `${progress}%` }}>{progress}%</div>
            
            </div>

            <div className="task-summary">

                <span className="badge badge-pending">{counts["pendente"]} pendentes</span>
                <span className="badge badge-progress">{counts["em progresso"]} em progresso</span>
                <span className="badge badge-done">{counts["concluída"]} concluída</span>
            
            </div>

            {/* React router*/}
            
            <Link to={`/projects/${project.id}`} className="btn btn-primary btn-block">
                Ver Projecto
            </Link> 

        </div>

    );
    
}