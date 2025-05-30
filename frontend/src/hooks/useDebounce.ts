export function useDebounce() {
    /**
     * Creates a debounced version of a function that delays its execution
     * until after a specified wait time has elapsed since the last call.
     * 
     * @template T - The type of the function to be debounced
     * @param {T} func - The function to debounce
     * @param {number} wait - The number of milliseconds to delay
     * @returns {(...args: Parameters<T>) => void} - The debounced function
     */
    function debounce<T extends (...args: any[]) => void>(
        func: T,
        wait: number
    ): (...args: Parameters<T>) => void {
        let timeoutId: number | undefined;

        return function debounced(this: any, ...args: Parameters<T>): void {
            const context = this;

            // Clear the previous timeout if it exists
            if (typeof timeoutId !== "undefined") {
                window.clearTimeout(timeoutId);
            }

            // Set up new timeout
            timeoutId = window.setTimeout(() => {
                func.apply(context, args);
                timeoutId = undefined;
            }, wait);
        };
    }

    return { debounce }
}
