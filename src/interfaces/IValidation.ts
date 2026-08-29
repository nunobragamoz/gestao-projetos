
//IvalidationError - Erro de Validacao

export interface IValidationResult { 
    isValid: boolean;
    errors: Record<string, string>;
}

//Generico para validadores

export interface IValidator<T> {
    validate(data: T): IValidationResult;
}