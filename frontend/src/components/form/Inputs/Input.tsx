import { generic_input_css } from "@/components/form/Inputs/Utils/css"
import { type UseFormRegister, type FieldValues, type Path } from "react-hook-form"
import { Label, LabelWithTooltip } from "@/components/form/Label"

type InputProps<TFormValues extends FieldValues> = {
    label: string
    name: string
    defaultValue?: string
    type: "text" | "email" | "password" | "date" | "number"
    className?: string
    readOnly?: boolean
    focus?: boolean
    disabled?: boolean
    required?: boolean
    tooltip?: string
    register: UseFormRegister<TFormValues>
}

/**
 * Input component for form fields
 * 
 * @param props - The props for the Input component
 * @param props.label - The label for the input
 * @param props.name - The name of the input
 * @param props.defaultValue - The default value of the input (DEPRECATED IN FAVOR OF REACT HOOK FORM)
 * @param props.type - The type of the input
 * @param props.className - The class name of the input
 * @param props.readOnly - Whether the input is read-only
 * @param props.focus - Whether the input is focused
 * @param props.disabled - Whether the input is disabled
 * @param props.required - Whether the input is required
 * @param props.tooltip - The tooltip for the input
 * @param props.register - The register function for the input (from react-hook-form)
 * 
 * @returns The Input component
 */
export function Input<TFormValues extends FieldValues>(props: InputProps<TFormValues>) {
    const { label, name, defaultValue: value, type = "text", className, readOnly, focus, disabled, required, register, tooltip = false } = props
    return (
        <div className="w-full">
            {tooltip ? 
                <div className="w-1/5">
                    <LabelWithTooltip label={label} name={name} required={required} tooltipText={tooltip} /> 
                </div>
                : <Label label={label} name={name} required={required} />}

            <input 
                type={type} 
                id={name}
                defaultValue={value} 
                className={`${generic_input_css} ${className} ${readOnly ? "bg-gray-200" : "bg-white"} w-full`} 
                readOnly={readOnly} 
                autoFocus={focus}
                data-testid={name + "-input"}
                title={readOnly ? "This field is read-only" : ""}
                disabled={disabled}
                {...register(name as Path<TFormValues>, required ? { required: true } : undefined)}
                />
        </div>
    )
}