import {Control, FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";
import {FormEvent} from "react";

export type FormHookDefaults<TFormValues extends FieldValues> = {
    register: UseFormRegister<TFormValues>
    errors: FieldErrors<TFormValues> & {
        [K in keyof TFormValues]?: {
            message?: string;
            type?: string;
        }
    }
    control: Control<TFormValues>
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
    isProcessing: boolean
}