import { ScrollArea } from "@/components/ui/scroll-area"

export default function DashboardPage() {
    return (
        <div className="w-full h-full flex flex-row gap-4">
            <Section label="Projects">
                <div>
                    <h1>Yo test</h1>
                </div>
            </Section>
            <Section label="Tasks">
                <div>
                    <h1>Yo test</h1>
                </div>
            </Section>
            <Section label="Users">
                <div>
                    <h1>Yo test</h1>
                </div>
            </Section>
        </div>
    )
}

/**
 * A section is a container for a section of the dashboard.
 * It is used to group related content together. Typically used for the Projects, Tasks, etc.
 * @param name - The name of the section.
 * @param children - The content of the section.
 */
export function Section({label, children}: {label: string, children: React.ReactNode}) {
    return (
        <div className="w-[20rem] h-[60rem] p-4 border">
            <h4>{label}</h4>
            <ScrollArea className="w-full h-[50rem]">
                {children}
            </ScrollArea>
        </div>
    )
}