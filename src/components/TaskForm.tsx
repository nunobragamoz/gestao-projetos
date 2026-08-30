import { useState } from "react";
import type { ITaskFormData } from "../interfaces/ITask";
import type { TaskStatus } from "../types/types";
import { useValidation } from "../hooks/useValidation";
import { TaskValidator } from "../models/Task";


interface TaskFormProps {

    onSubmit: (data: ITaskFormData) => void;
    onCancel: () => void;
    initialData?: ITaskFormData;

}

const taskValidator = new TaskValidator();


export default function TaskForm({ onSubmit, onCancel, initialData }: TaskFormProps) {

  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [dueDate, setDueDate] = useState(initialData?.dueDate || "");
  const [status, setStatus] = useState<TaskStatus>(initialData?.status ?? "pendente");

const { errors, validate, clearErrors } = useValidation(taskValidator);

const handleSubmit = (e: React.FormEvent) => {

  e.preventDefault();

  const data: ITaskFormData = { title: title.trim(), description: description.trim(), dueDate, status };
  
    if (validate(data)) {
      onSubmit(data);
      clearErrors();
    }
};

return (

    <form className="form-card" onSubmit={handleSubmit}>

        <h3>{initialData ? "Editar Tarefa" : "Nova Tarefa"}</h3>

        <div className="form-group">

            <label htmlFor="title">Título *</label>

            <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)}
            placeholder="Ex: Criação de Mockups para o Cliente" className={errors.title ? "input-error" : ""} />

            {errors.title && <span className="error-msg">{errors.title}</span>}

        </div>

        <div className="form-group">

            <label htmlFor="task-desc">Descrição *</label>

            <textarea id="task-desc" value={description} onChange={e => setDescription(e.target.value)}
            placeholder="Faça uma breve descrição da tarefa" rows={2}
            className={errors.description ? "input-error" : ""} />

            {errors.description && <span className="error-msg">{errors.description}</span>}

        </div>

        <div className="form-row">

        <div className="form-group">

          <label htmlFor="dueDate">Data de Conclusão *</label>

          <input id="dueDate" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)}
            className={errors.dueDate ? "input-error" : ""} />

          {errors.dueDate && <span className="error-msg">{errors.dueDate}</span>}

        </div>

        <div className="form-group">

          <label htmlFor="status">Status</label>

          <select id="status" value={status} onChange={e => setStatus(e.target.value as TaskStatus)}>
            <option value="pendente">Pendente</option>
            <option value="em progresso">Em Progresso</option>
            <option value="concluída">Concluída</option>
          </select>

        </div>

      </div>

      <div className="form-actions">

        <button type="submit" className="btn btn-primary">{initialData ? "Guardar" : "Adicionar Tarefa"}</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>

      </div>

    </form>
  );
}