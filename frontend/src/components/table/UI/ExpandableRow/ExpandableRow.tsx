export function BaseExpandableRow({children}: {children: React.ReactNode}) {
    return (
        <div className="bg-gray-100 flex flex-col gap-2 p-2 rounded-md dark:bg-stone-800">
            {children}
        </div>
    )
}