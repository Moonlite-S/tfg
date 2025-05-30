import { ComboBox } from "@/components/ui/combobox";

type ComboboxProps = {
    label: string
    placeholder: string
    options: { value: string; label: string }[]
    onChange: (e: unknown) => void
}

export function Combobox({ label, placeholder, options, onChange }: ComboboxProps) {
    return (
        <ComboBox label={label} placeholder={placeholder} options={options} onChange={onChange} />
    )
}
