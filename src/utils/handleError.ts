import { toast } from "@/utils";

export interface CustomError {
    errors?: string | string[];
    [key: string]: any;
}

export function handleError(error: unknown) {
    if (typeof error === 'object' && error !== null && 'errors' in error) {
        const err = error as CustomError;
        toast('error', err.errors);
    } else {
        toast('error', 'An unknown error occurred');
    }
}