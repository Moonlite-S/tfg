type SubmitProps = {
    label?: string
    test_id?: string
    isSubmitting: boolean
}

export function Submit(props: SubmitProps) {
    const { label = "Submit", test_id = "Submit", isSubmitting } = props
    return (
        <button 
            type="submit"
            data-testid={test_id}
            disabled={isSubmitting} 
            className='button'
        >
            <span className="inline-block transition-all duration-100 transform">
                {isSubmitting ? "Submitting..." : label}
            </span>
        </button>
    )
}
