// Error pages 

interface ErrorPageProps {
    code: number;
    message: string;
}

function ErrorPage({ code, message }: ErrorPageProps) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">{code}</h1>
            <p className="text-lg">{message}</p>
        </div>
    )
}

// 404
export function Error404Page() {
    return <ErrorPage code={404} message="Page not found" />
}

// 401
export function Error401Page() {
    return <ErrorPage code={401} message="Unauthorized" />
}

// 403
export function Error403Page() {
    return <ErrorPage code={403} message="Forbidden" />
}