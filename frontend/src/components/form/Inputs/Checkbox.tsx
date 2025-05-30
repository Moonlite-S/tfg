import { generic_input_css } from "@/components/form/Inputs/Utils/css"
import { type UseFormRegister, type FieldValues, type Path } from "react-hook-form"

type CheckboxProps<TFormValues extends FieldValues> = {
    label: string
    name: string
    className?: string
    readOnly?: boolean
    focus?: boolean
    dataTestId?: string
    disabled?: boolean
    required?: boolean
    left_aligned?: boolean
    register: UseFormRegister<TFormValues>
    defaultValue?: boolean
}

export function Checkbox<TFormValues extends FieldValues>(props: CheckboxProps<TFormValues>) {
    const { label, name, className, readOnly, focus, dataTestId, disabled, required, left_aligned = false, register, defaultValue } = props
    
    return (
        <div className={`flex flex-row gap-2 items-center`}>
            <label htmlFor={name} className={`${left_aligned ? "order-1" : "order-2"}`}>
                {required ? <span className="text-red-500 dark:text-red-400">*</span> : ""}
                {label}
            </label>


            <input 
                type="checkbox" 
                id={name}
                required={required} 
                className={`${generic_input_css} ${className} ${left_aligned ? "order-2" : "order-1"}`} 
                readOnly={readOnly} 
                autoFocus={focus}
                data-testid={dataTestId ?? name + "-checkbox"}
                disabled={disabled}
                defaultChecked={defaultValue}
                {...register(name as Path<TFormValues>)}
                />

        </div>
    )
}