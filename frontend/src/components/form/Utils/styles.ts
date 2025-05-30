export const styles = (readonly: boolean) => (
    {
        control: (baseStyles: any, state: any) => ({
            ...baseStyles,
            borderRadius: "10px",
            borderColor: state.isFocused ? "orange" : "gray",
            boxShadow: state.isFocused ? "0 0 0 2px orange" : "none",
            minWidth: "200px",
            backgroundColor: readonly ? "#ebebed" : "white",
            color: "#000000",
            "&:hover": {
                borderColor: state.isFocused ? "orange" : "gray",
            },
            ".dark &": {
                backgroundColor: readonly ? "#292524" : "#1c1917",
                borderColor: state.isFocused ? "#f97316" : "#44403c",
                color: "#e7e5e4",
                "&:hover": {
                    borderColor: state.isFocused ? "#f97316" : "#57534e",
                },
            },
        }),
        menu: (baseStyles: any) => ({
            ...baseStyles,
            borderRadius: "10px",
            overflow: "hidden",
            display: readonly ? "none" : "block",
            backgroundColor: "white",
            ".dark &": {
                backgroundColor: "#1c1917",
            },
        }),
        menuList: (baseStyles: any) => ({
            ...baseStyles,
            borderRadius: "10px",
            backgroundColor: "white",
            ".dark &": {
                backgroundColor: "#1c1917",
            },
        }),
        option: (state: any) => ({
            padding: "5px 10px",
            backgroundColor: state.isFocused ? "#fafafa" : "white",
            color: "#000000",
            "&:hover": {
                backgroundColor: "#e0e0e6",
            },
            ".dark &": {
                backgroundColor: state.isFocused ? "#292524" : "#1c1917",
                color: "#e7e5e4",
                "&:hover": {
                    backgroundColor: "#292524",
                },
            },
        }),
        singleValue: (baseStyles: any) => ({
            ...baseStyles,
            color: "#000000",
            ".dark &": {
                color: "#e7e5e4",
            },
        }),
        input: (baseStyles: any) => ({
            ...baseStyles,
            color: "#000000",
            ".dark &": {
                color: "#e7e5e4",
            },
        }),
        placeholder: (baseStyles: any) => ({
            ...baseStyles,
            color: "#666666",
            ".dark &": {
                color: "#a8a29e",
            },
        }),
    }
)
