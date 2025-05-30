import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FieldValues, Path, Control, Controller } from "react-hook-form";
import { generic_input_css } from "./Utils/css"
import { Label } from "@/components/_Shared/Form/Label"

type SelectDropdownProps<TFormValues extends FieldValues> = {
    name: string
    options: string[]
    placeholder: string
    control: Control<TFormValues>
    required?: boolean
    defaultValue?: string
}

/* Controller helps control the value in a controlled component
like Shadcn's UI Select Component.
*/

export function SelectContainer<TFormValues extends FieldValues>(props: SelectDropdownProps<TFormValues>) {
    const {name, options, placeholder, control, required, defaultValue} = props

    return (
        <div className="w-full">
            <Label label={placeholder} name={name} required={required}/>
            <Controller
                control={control}
                name={name as Path<TFormValues>}
                render={({field: {onChange, value}}) => (
                <Select onValueChange={onChange} value={value ?? defaultValue}>
                    <SelectTrigger className={generic_input_css + " bg-white"}>
                        <SelectValue placeholder={placeholder}/>
                    </SelectTrigger>

                    <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option} value={option}>
                            {option}
                        </SelectItem>
                            ))}
                    </SelectContent>
                </Select>   
                )}
            />
        </div>
    )
}

