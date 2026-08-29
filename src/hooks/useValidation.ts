import { useState, useCallback } from "react";
import { IValidationResult, IValidator } from "../interfaces/IValidation";

export function useValidation<T>(validator: IValidator<T>) {

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = useCallback((data: T): boolean => {

        const result: IValidationResult = validator.validate(data);

        setErrors(result.errors);

        return result.isValid;

    }, [validator]);

    const clearErrors = useCallback(() => {

        setErrors({});

    }, []);

    return { errors, validate, clearErrors };
}