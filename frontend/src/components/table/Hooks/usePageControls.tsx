import { useState } from "react"
import type { PageProps } from "../Interfaces/IPageProps"

export function usePageControls() {
    const [page, setPage] = useState<PageProps>({
        page_number: 1,
        per_page:parseInt(localStorage.getItem("per_page") || "10"),
    })

    const goNextPage = () => {
        setPage(prev => ({...prev, page_number: prev.page_number + 1}))
    }

    const goPreviousPage = () => {
        setPage(prev => ({...prev, page_number: prev.page_number - 1}))
    }

    const setPageNumber = (page_number: number) => {
        setPage(prev => ({...prev, page_number}))
    }

    const setPerPageNumber = (per_page: number) => {
        setPage(prev => ({...prev, per_page}))
    }

    const getCachedPerPage = () => {
        return parseInt(localStorage.getItem("per_page") || "10")
    }

    const setCachedPerPage = (per_page: number) => {
        localStorage.setItem("per_page", per_page.toString())
    }

    const setPerPageAndCache = (per_page: number) => {
        setCachedPerPage(per_page)
        setPerPageNumber(per_page)
    }

    return {
        page,
        setPageNumber,
        setPerPageNumber,
        getCachedPerPage,
        setCachedPerPage,
        setPerPageAndCache,
        goNextPage,
        goPreviousPage
    }
}
