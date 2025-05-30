import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useNavigate } from "react-router-dom"
import { useCallback, useState } from "react"

type Redirect = {
    label: string,
    value: string
}

type APIRedirect = {
    label: string,
    value: () => Promise<void>
}

type AlertProps = {
    title: string
    description: string
    close_alert?: boolean
}

type APIAlertProps = {
    optional_links: APIRedirect[]
} & AlertProps

type NavAlertProps = {
    redirects: Redirect[]
} & AlertProps

/**
 *  Cool ass alert component from shadcn
 *
 * @param title
 * @param description
 * @param redirects - A list of Redirect objects where label is the text of the button and value is the route to redirect to (only router-dom routes)
 * @param close_alert
 * @returns
 */
export function Alert({ title, description, redirects, close_alert=false }: NavAlertProps) {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(true)

    const handleClose = useCallback(() => {
        setIsOpen(false)
    }, [])

    return (
    <AlertDialog open={isOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>
                    {description}
                </AlertDialogDescription>
            </AlertDialogHeader>
            
            <AlertDialogFooter>
                {redirects.map((redirect: Redirect, index: number) => (
                    <AlertDialogCancel key={index} onClick={() => navigate(redirect.value)}>{redirect.label}</AlertDialogCancel>
                ))}

                {close_alert && (
                    <AlertDialogCancel onClick={handleClose}>Close</AlertDialogCancel>
                )}
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    )
}

// Alert that uses API calls rather than navigation links
export function APIAlert({ title, description, optional_links, close_alert=false }: APIAlertProps) {
    const [isOpen, setIsOpen] = useState(true)

    const handleClose = useCallback(() => {
        setIsOpen(false)
    }, [])

    return (
    <AlertDialog open={isOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>
                    {description}
                </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
                {optional_links.map((redirect: APIRedirect, index: number) => (
                    <AlertDialogCancel key={index} onClick={() => redirect.value}>{redirect.label}</AlertDialogCancel>
                ))}

                {close_alert && (
                    <AlertDialogCancel onClick={handleClose}>Close</AlertDialogCancel>
                )}
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    )
}
