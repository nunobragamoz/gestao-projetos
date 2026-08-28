
import { useState } from "react";
import type { IProjectFormData } from "../interfaces/IProject";

interface ProjectFormProps {

    onSubmit: (data: IProjectFormData) => void;
    onCancel: () => void;
    initialData?: IProjectFormData;

}

export default function ProjectForm({ onSubmit, onCancel, initialData }: ProjectFormProps) {

    const [name, setName] = useState(initialData?.name || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: Record<string,string> = {};

        if (name.trim().length < 3) newErrors.name = "O nome deve ter 3 caracteres no minimo!";

        if (description.trim().length < 10) newErrors.description = "A descrição deve ter 10 caracteres no minimo!";

        if (Object.keys(newErrors).length > 0) { 
            setErrors(newErrors); 
            return;
        }
        
        setErrors({});

        onSubmit({ name: name.trim(), description: description.trim()});
    };

    return (

        <form className="form-card" onSubmit={handleSubmit}>
            <h3>{initialData ? "Editar Projecto" : "Novo Projecto"}</h3>

            <div className="form-group">

                <label htmlFor="name">Nome do Projecto</label>

                <input id="name" type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder="Ex: Redesenho de Homepage" className={errors.name ? "input-error" : ""} />

                {errors.name && <span className="error-msg">{errors.name}</span>}

            </div>

            <div className="form-group">

                <label htmlFor="description">Descrição</label>

                <textarea id="description" value={description} onChange={e => setDescription(e.target.value)}
                placeholder="Descreva em poucas palavras o objectivo do Projecto." rows={3}
                className={errors.description ? "input-error" : ""}/>

                {errors.description && <span className="error-msg">{errors.description}</span>}

            </div>

            <div className="form-actions">

                <button type="submit" className="btn btn-primary">{initialData ? "Guardar" : "Criar Projecto"}</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
            </div>
            
        </form>
    );
}

