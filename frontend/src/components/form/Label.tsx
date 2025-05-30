import { InfoIcon } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

type LabelProps = {
    label: string
    name: string
    required?: boolean
    align?: "left" | "right" | "center"
    className?: string
}

export function Label({label, name, required = false, align = "left", className = ""}: LabelProps) {
    return (
        <label 
            className={`${className} flex flex-row gap-2`}
            style={{textAlign: align}}
            htmlFor={name}
        >
            {required ? <span className="text-red-500 dark:text-red-400">* </span> : ""} 
                {label}
        </label>
    )
}

type LabelWithTooltipProps = LabelProps & {
    tooltipText: string
}

export function LabelWithTooltip({label, name, required = false, tooltipText = ""}: LabelWithTooltipProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex flex-row gap-2">
                        <Label label={label} name={name} required={required} />
                        <InfoIcon className="w-4 h-4" />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="text-sm w-72 text-center">{tooltipText}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}


