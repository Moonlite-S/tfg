/*
    These components are used to create a generic form that can be used to create and edit tasks, submittals, and other forms.
*/

// * To edit the css for the selection components, you need to edit the css in the Buttons.tsx file
const generic_input_css = "bg-white border rounded-xl border-gray-400 focus:outline-none focus:ring focus:ring-orange-400 p-2 dark:bg-stone-900 dark:border-stone-700 dark:text-stone-100 dark:focus:ring-orange-700"
const generic_select_css = "border rounded-xl border-gray-400 focus:outline-none focus:ring focus:ring-orange-400 p-2 dark:bg-stone-900 dark:border-stone-700 dark:text-stone-100 dark:focus:ring-orange-700"

type GenericFormProps = {
    children: React.ReactNode
    form_id: string
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    className?: string
}

export function GenericForm({children, form_id, onSubmit, className} : GenericFormProps) {
    return (
        <form id={form_id} onSubmit={onSubmit} data-testid={form_id} className={`w-full mx-auto ${className}`}>
            {children}
        </form>
    )
}

export function GenericFormBGContainer({children, className} : {children: React.ReactNode, className?: string}) {
    return (
        <div className={`bg-orange-50 rounded-lg p-4 grid gap-2 mx-2 border border-orange-200 dark:bg-stone-800 dark:border-stone-700 ${className}`}>
            {children}
        </div>
    )
}

type GenericInputProps = {  
    label: string
    value?: string
    name: string
    type: string
    className?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    readOnly?: boolean
    focus?: boolean
    optional?: boolean
}
export function GenericInput({label, value, type, className, onChange, name, readOnly, focus, optional=false}: GenericInputProps) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name}>{optional ? "" : <span className="text-red-500 dark:text-red-400">*</span>} {label}</label>
            <input aria-label={label} 
                type={type} 
                id={name}
                name={name} 
                defaultValue={value} 
                onChange={onChange} 
                required={!optional} 
                className={`${generic_input_css} ${className}`} 
                readOnly={readOnly} 
                autoFocus={focus}
                data-testid={name}
            />
        </div>
    )
}

type GenericSelectProps = {
    label: string
    value?: string
    name: string
    options: string[]
    className?: string
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
    optional?: boolean
    readOnly?: boolean
}

export function GenericSelect({label, value, options, className, onChange, name, optional=false, readOnly=false}: GenericSelectProps) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={value}>{optional ? "" : <span className="text-red-500 dark:text-red-400">*</span>} {label}</label>
            <select 
                id={value} 
                data-testid={name + "-select"} 
                name={name} 
                defaultValue={value} 
                onChange={onChange} 
                required={!optional} 
                className={`${generic_select_css} ${className} ${readOnly ? "cursor-not-allowed bg-gray-100" : "bg-white"}`}
                onMouseDown={e => readOnly && e.preventDefault()}
                onKeyDown={e => readOnly && e.preventDefault()}
            >
                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

type GenericTextAreaProps = {
    label: string
    value?: string
    name: string
    className?: string
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    readOnly?: boolean
    optional?: boolean
}

export function GenericTextArea({label, value, name, className, onChange, readOnly, optional=false}: GenericTextAreaProps) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name}>{optional ? "" : <span className="text-red-500 dark:text-red-400">*</span>} {label}</label>
            <textarea id={name} name={name} defaultValue={value} onChange={onChange} required={!optional} className={`${generic_input_css} ${className}`} readOnly={readOnly}/>
        </div>
    )
}

type GenericSliderProps = {
    label: string
    value: number
    name: string
    className?: string
    onChange: (value: number) => void
    optional?: boolean
}

export function GenericSlider({label, value, name, className, onChange, optional=false}: GenericSliderProps) {
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value))
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Math.min(100, Math.max(0, Number(e.target.value)))
        onChange(newValue)
    }

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name}>{optional ? "" : <span className="text-red-500 dark:text-red-400">*</span>} {label}</label>
            <div className="flex items-center gap-4">
                <input
                    type="range"
                    id={`${name}-slider`}
                    name={`${name}-slider`}
                    min="0"
                    max="100"
                    value={value}
                    onChange={handleSliderChange}
                    className={`w-full ${className}`}
                    data-testid={`${name}-slider`}
                />
                <input
                    type="number"
                    id={`${name}-input`}
                    name={`${name}-input`}
                    min="0"
                    max="100"
                    value={value}
                    onChange={handleInputChange}
                    className={`${generic_input_css} w-16 text-center ${className}`}
                    data-testid={`${name}-input`}
                />
            </div>
        </div>
    )
}

type GenericCheckboxProps = {
    label: string
    value: boolean
    name: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    optional?: boolean
    tooltip?: string
    readOnly?: boolean
    left_aligned?: boolean
}

export function GenericCheckbox({label, value, name, onChange, optional=false, tooltip, readOnly=false, left_aligned=false}: GenericCheckboxProps) {
    return (
        <div className={`flex gap-2 items-center ${left_aligned ? "flex-row-reverse" : "flex-row"}`}>
            <label htmlFor={name} title={tooltip}>{optional ? "" : <span className="text-red-500 dark:text-red-400">*</span>} {label}</label>

            {tooltip && 
                <div className="relative text-xs text-gray-500 pointer-events-none bottom-2 right-1 dark:text-gray-400" title={tooltip}>
                    ?
                </div>}

            <input 
                type="checkbox" 
                id={name} 
                name={name} 
                checked={value} 
                onChange={onChange} 
                className={`${generic_input_css}`} 
                data-testid={name + "-checkbox"}  
                title={tooltip}
                readOnly={readOnly}
            />

        </div>
    )
}

