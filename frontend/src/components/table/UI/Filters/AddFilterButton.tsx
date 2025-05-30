export function AddFilterButton({ onAddFilter }: { onAddFilter: () => void }) {
    return (
        <div className="flex flex-col gap-3">
            <button
                className="h-full px-2 py-4 transition bg-orange-300 rounded-xl hover:bg-orange-400 dark:bg-stone-600 dark:text-white dark:hover:bg-stone-500"
                type="button"
                onClick={onAddFilter}
            >
               Add Filter
            </button>
        </div>
    );
}
