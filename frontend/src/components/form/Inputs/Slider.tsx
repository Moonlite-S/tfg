import { Label } from "@/components/_Shared/Form/Label";
import { FieldValues, UseFormRegister, Path, Control, Controller, PathValue } from "react-hook-form";
import { Slider } from "@/components/ui/slider";
import { generic_input_css } from "./Utils/css";

type SliderProps = {
    label: string
    required: boolean
    name: string
    defaultValue: number
    max: number
    min: number
    step: number
}

type SliderContainerProps<TFormValues extends FieldValues> = SliderProps & {
    register: UseFormRegister<TFormValues>
}

// Adding control to the props for Controller component
type SliderWithInputProps<TFormValues extends FieldValues> = SliderProps & {
    control: Control<TFormValues>
}

// Input Component that shows only the slider and label for determining a value in a range
export function SliderContainer<TFormValues extends FieldValues>(props: SliderContainerProps<TFormValues>) {
    const { label, required, register, name, defaultValue, max, min, step } = props
    return (
        <>
            <Label label={label} required={required} name={name}/>
            <Slider {...register(name as Path<TFormValues>)} defaultValue={[defaultValue]} max={max} min={min} step={step} />
        </>
    )
}

// This one shows the slider and a text input for the value (for more precision)
export function SliderWithInput<TFormValues extends FieldValues>(props: SliderWithInputProps<TFormValues>) {
    const { label, required, name, defaultValue, max, min, step, control } = props

    return (
        <>
            <Label label={label} required={required} name={name}/>

            <div className="flex items-center gap-4">
                <Controller
                    control={control}
                    name={name as Path<TFormValues>}
                    defaultValue={defaultValue as PathValue<TFormValues, Path<TFormValues>>}
                    rules={{
                        required: required,
                        min: { value: min, message: "Minimum value is 0" },
                        max: { value: max, message: "Maximum value is 100" },
                     }}
                    render={({ field }) => (
                        <>
                            <Slider 
                                defaultValue={[defaultValue]} 
                                max={max} 
                                min={min} 
                                step={step}
                                value={[field.value]}
                                onValueChange={(values) => {
                                    field.onChange(values[0]);
                                }}
                            />
                            <div className="flex flex-col gap-2">
                                <input 
                                    type="number" 
                                    id={name}
                                    value={field.value} 
                                    className={`${generic_input_css} w-16 text-center`}
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        if (!isNaN(value)) {
                                            // Ensure value is within min and max bounds
                                            const boundedValue = Math.min(Math.max(value, min), max);
                                            field.onChange(boundedValue);
                                        }
                                    }}
                                    min={min}
                                    max={max}
                                    step={step}
                                />
                            </div>
                        </>
                    )}
                />
            </div>
        </>
    )
}
