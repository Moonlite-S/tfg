export function ExpandableRowButtonContainer({ children }: { children: React.ReactNode; }) {
    return (
        <div className="px-2 flex flex-row gap-2">
            {children}
        </div>
    );
}
