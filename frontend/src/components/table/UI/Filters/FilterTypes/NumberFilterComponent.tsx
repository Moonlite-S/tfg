import { useState, useEffect, type FormEvent } from "react"
import type { FilterComponentProps } from "./Interface/FilterComponentProps"

export function NumberFilterComponent({ filter, filterText, handleFilterTextChange }: FilterComponentProps) {
    const GTE = ">="
    const LTE = "<="
    const EQ = "=="
    const OPERATORS = [GTE, LTE, EQ]

    const [numericValue, setNumericValue] = useState<string>("")
    const [comparisonOperator, setComparisonOperator] = useState<string>(GTE)

    // Parse initial/updated filterText from parent
    useEffect(() => {
        let op = GTE
        let val = filterText

        // Check if filterText starts with a known operator
        const foundOp = OPERATORS.find(o => filterText.startsWith(o))
        if (foundOp) {
            op = foundOp
            // Extract the value part after the operator
            val = filterText.substring(foundOp.length)
        } else {
            // If no operator is found, assume the whole text is the value (or empty)
            val = filterText
        }

        setComparisonOperator(op)
        setNumericValue(val)
    }, [filterText]) // Rerun when the filterText prop changes


    // Function to call the parent's handler with the combined value
    // This gets triggered when the operator or numeric value changes
    const triggerParentUpdate = (operator: string, value: string) => {
        // If the numeric value is empty, treat it as clearing the filter by sending empty string
        const combinedValue = value ? `${operator}${value}` : ""
        // Create a synthetic event object mimicking the structure expected by handleFilterTextChange
        // This allows us to pass the combined value to the parent's handler
        const syntheticEvent = {
            target: { value: combinedValue },
            currentTarget: { value: combinedValue } // Include currentTarget if needed by parent's logic
        } as unknown as FormEvent<HTMLInputElement> // Use 'unknown' then cast to bypass strict type checks if necessary
        handleFilterTextChange(syntheticEvent)
    }

    const handleNumericInputChange = (e: FormEvent<HTMLInputElement>) => {
        const newValue = (e.target as HTMLInputElement).value
        setNumericValue(newValue) // Update local state first
        triggerParentUpdate(comparisonOperator, newValue) // Trigger parent update with current operator and new value
    }

    const handleOperatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newOperator = e.target.value
        setComparisonOperator(newOperator) // Update local state first

        // Trigger update only if there is a numeric value entered, otherwise changing operator is just preparatory
        if (numericValue) {
            triggerParentUpdate(newOperator, numericValue) // Trigger parent update with new operator and current value
        }
    }

    return (
        // Use flex container to keep input and select on the same line
        <div className="flex items-center w-full">
            <input
                id={`search-${filter.id}`}
                type="number"
                placeholder="Value..."
                aria-label="Search input"
                value={numericValue}
                onChange={handleNumericInputChange}
                className="flex-grow bg-orange-50 rounded-l-xl dark:bg-stone-800 dark:text-white focus:outline-none hide-number-spinners px-2 py-0.5" // Adjusted padding/rounding
            />

            <select
                value={comparisonOperator}
                onChange={handleOperatorChange}
                className="bg-orange-50 rounded-r-xl dark:bg-stone-800 dark:text-white focus:outline-none px-1 py-0.5 border-l border-orange-200 dark:border-stone-600"
            >
                {/* Use constants for values */}
                <option value={GTE}>{GTE}</option>
                <option value={LTE}>{LTE}</option>
                <option value={EQ}>{EQ}</option>
            </select>
        </div>
    )
}
