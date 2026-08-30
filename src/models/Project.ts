import type { IProject, IProjectFormData } from "../interfaces/IProject";
import type { ITask } from "../interfaces/ITask";
import type { IValidationResult, IValidator } from "../interfaces/IValidation";
import type { TaskCountByStatus } from "../types/types";
import { Task } from "./Task";
import { v4 as uuidv4 } from "uuid";

// Classe Project
// Cada Project, numa relacao tem-um, tem uma lista de tarefas Tasks

export class Project {
    private _id: string;
    private _name: string;
    private _description: string;
    private _createdAt: string;
    private _tasks: Task[];

    constructor(data: IProject) {
        this._id = data.id;
        this._name = data.name;
        this._description = data.description;
        this._createdAt = data.createdAt;
        this._tasks = data.tasks.map(t => new Task(t));
    }


    // Getters e Setters com encapsulamento

    get id(): string { return this._id; }
    get name(): string { return this._name;}
    set name(value: string) { this._name = value; }
    get description(): string { return this._description; }
    set description(value: string) { this._description = value; }
    get createdAt(): string { return this._createdAt; }
    get tasks(): Task[] { return this._tasks; }

    // Adicionar tarefa

    addTask(task: Task): void {

        this._tasks.push(task);

    }

    // Remover tarefa

    removeTask(taskId: string): void {

        this._tasks = this._tasks.filter(t => t.id !== taskId);
    }

    // Fazer update de uma tarefa

    updateTask(taskId: string, updated: ITask): void {
        
        const index = this._tasks.findIndex(t => t.id === taskId);

        if (index !== -1) {
            this._tasks[index] = new Task(updated);
        }
    }

    // Calculo do Progresso do Projecto em percentagem

    getProgress(): number {

        if (this._tasks.length === 0) return 0;

        const completed = this._tasks.filter(t => t.status === "concluída").length;

        return Math.round((completed / this._tasks.length) * 100);

    }

    // Contador de tarefas tipo mapped type

    getTaskCountByStatus(): TaskCountByStatus {

        return {
            "pendente": this._tasks.filter(t => t.status === "pendente").length,
            "em progresso": this._tasks.filter(t => t.status === "em progresso").length,
            "concluída": this._tasks.filter(t => t.status === "concluída").length,
        };
    }

    // Conversor para API

    toJSON(): IProject {

        return {
            id: this._id,
            name: this._name,
            description: this.description,
            createdAt: this._createdAt,
            tasks: this._tasks.map(t => t.toJSON()),
        };
    }

    // Fabrica projectos dos dados inseridos no formulario

    static fromFormData(data: IProjectFormData): Project {

        return new Project({
            id: uuidv4(),
            name: data.name,
            description: data.description,
            createdAt: new Date().toISOString(),
            tasks: [],
        });
    }
}

// Implementador do IValidator de formato

export class ProjectValidator implements IValidator<IProjectFormData> {

    validate(data: IProjectFormData): IValidationResult {

        const errors: Record<string, string> = {};

        if (!data.name || data.name.trim().length < 3) {

            errors.name = "O nome deve ter 3 caracteres no minimo!";
        }

        if (data.name && data.name.trim().length > 50) {

            errors.name = "O maximo de caracteres é 50.";
        }

        if (!data.description || data.description.trim().length < 10) {

            errors.description = "A descricao deve ter 10 caracteres no minimo!";
        }

        return {

            isValid: Object.keys(errors).length === 0,
            errors,
        };

    }
    
}