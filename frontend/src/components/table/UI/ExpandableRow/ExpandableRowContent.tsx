
export function ExpandableRowContent({ children }: { children: React.ReactNode; }) {
    return (
        <div className="bg-gray-200 p-2 rounded-md border border-gray-300 dark:bg-stone-800 dark:text-stone-100">
            {children}
        </div>
    );
}
