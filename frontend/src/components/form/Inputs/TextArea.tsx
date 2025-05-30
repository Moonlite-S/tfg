import { generic_input_css } from "@/components/form/Inputs/Utils/css"
import type { UseFormRegister, FieldValues, Path } from "react-hook-form"
import { Label } from "@/components/form/Label"

type TextAreaProps<TFormValues extends FieldValues> = {
    name: string
    label: string
    placeholder: string
    required?: boolean
    register: UseFormRegister<TFormValues>
}

export function TextArea<TFormValues extends FieldValues>(props: TextAreaProps<TFormValues>) {
    const {name, label, placeholder, required = false, register} = props

    return (
        <div className="grid w-full grid-cols-1 gap-2">
            <Label label={label} name={name} required={required}/>
            <textarea 
                id={name}
                placeholder={placeholder} 
                className={generic_input_css} 
                {...register(name as Path<TFormValues>)} 
                data-testid={name + "-textarea"}  
            />
        </div>
    )
}
