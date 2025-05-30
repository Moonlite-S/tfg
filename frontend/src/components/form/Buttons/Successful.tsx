type SuccessfulProps = {
    message?: string
    className?: string
}

export function Successful({message = "Submitted!", className}: SuccessfulProps) {
    return (
        <div 
            className={`mt-3 text-center text-green-800 bg-green-100 dark:bg-green-900 p-3 border hover:scale-105 border-green-200 dark:border-green-800 rounded-md hover:shadow-sm hover:bg-green-200 dark:hover:bg-green-800 transition-all duration-100 ${className}`}>
                <span className="block">Submitted!</span>
                <span className="block">{message}</span>
        </div>
    )
}
