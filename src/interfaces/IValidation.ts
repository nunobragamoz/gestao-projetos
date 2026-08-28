
//IvalidationError - Erro de Validacao

export interface IValidationResult {
    isvalid: boolean;
    errors: Record<string, string>;
}

/**
 * IValidator<T> - Generico para validadores
 * Qualquer validador implementa validate(data) e retorna IValidationResult
 */

export interface IValidator<T> {
    validate(data: T): IValidationResult;
}