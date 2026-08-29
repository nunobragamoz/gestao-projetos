import { ITask, ITaskFormData } from "../interfaces/ITask";
import { IValidationResult, IValidator } from "../interfaces/IValidation";
import { TaskStatus } from "../types/types";
import { v4 as uuidv4 } from "uuid";


//Classe Base

abstract class BaseEntity {
    protected _id: string;
    protected _createdAt: Date;

    constructor(id?: string) {
        this._id = id || uuidv4(); // gera id quando nao fornecido
        this._createdAt = new Date();
    }

    //Getter
    get id(): string {
        return this._id;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    //Obrigar subclasses a implementar
    abstract toJSON(): object;


}

//Classe Task - Vai herdar de BaseEntity
export class Task extends BaseEntity implements ITask {

    private _title: string;
    private _description: string;
    private _dueDate: string;
    private _status: TaskStatus;

    constructor(data: ITask) {

        super(data.id);        //constructor da class base
        this._title = data.title;
        this._description = data.description;
        this._dueDate = data.dueDate;
        this._status = data.status;
    }

    //Getters + setters + validation
    get title(): string { return this._title; }
    set titled(value: string) { this._title = value; }

    get description(): string { return this._description; }
    set description(value: string) { this._description = value; }

    get dueDate(): string { return this._dueDate; }
    set dueDate(value: string) { this._dueDate = value; }

    get status(): TaskStatus { return this._status; }
    set status(value: TaskStatus) { this._status = value; }

    markAsCompleted(): void {
        this._status = "concluída";
    }

    isOverdue(): boolean {

        return new Date(this._dueDate) < new Date() && this._status !== "concluída";
    }

    toJSON(): ITask {
        return {
            id: this._id,
            title: this._title,
            description: this._description,
            dueDate: this._dueDate,
            status: this._status,
        };
    }

    static fromFormData(data: ITaskFormData): Task {
        return new Task({
            id: uuidv4(),
            ...data,
        });
    }
}

    export class taskValidator implements IValidator<ITaskFormData> {
        validate(data: ITaskFormData): IValidationResult {
            const errors: Record<string, string> = {};

            if (!data.title || data.title.trim().length < 3) {
                errors.title = "O título deve ter 3 caracteres no mínimo.";
            }

            if (!data.description || data.description.trim().length < 5) {
                errors.description = "A descricao deve ter 5 caracteres no minimo.";
            }

            if (!data.dueDate) {
                errors.dueDate = " A data de conclusao e obrigatoria.";
            }

            const validStatusses: TaskStatus[] = ["pendente", "em progresso", "concluída"];
            if (!validStatusses.includes(data.status)) {
                errors.status = "Status invalido.";
            }

            return {
                isValid: Object.keys(errors).length === 0,
                errors,
            };
        }
    }
