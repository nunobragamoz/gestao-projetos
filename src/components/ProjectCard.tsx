
import type { IProject } from "../interfaces/IProject";

interface ProjectCardProps {

    project: IProject;
    onDelete: (id: string) => void;
    onView: (id: string) => void;

}

export default function ProjectCard({ project, onDelete, onView }: ProjectCardProps) {

    const total = project.tasks.length;
    const completed = project.tasks.filter(t => t.status === "concluída").length
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
    const pending = project.tasks.filter(t => t.status === "pendente").length;
    const inProgress = project.tasks.filter(t => t.status === "em progresso").length;

    return (
        
        <div className="project-card">

            <div className="project-header">
                <h3>{project.name}</h3>
                <button className="btn btn-danger btn-sm" onClick={() => onDelete(project.id)} title="Excluir">x</button>
            </div>

            <p className="project-desc">{project.description}</p>
            
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%`}}>{progress}%</div>
            </div>

            <div className="task-summary">
                <span className="badge badge-pending">{pending} pendentes</span>
                <span className="badge badge-progress">{inProgress} em progresso</span>
                <span className="badge badge-done">{completed} concluídas</span>
            </div>

            <button className="btn btn-primary btn-block" onClick={() => onView(project.id)}>Ver Projecto</button> 

        </div>
    );
}