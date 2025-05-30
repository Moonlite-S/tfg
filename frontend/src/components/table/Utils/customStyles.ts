export const customStyles = {
    table: {
        style: {
            backgroundColor: "white",
            color: "black",
            borderWidth: "1px",
            borderStyle: "solid",
            "--status-active": "#FFCCCC",
            "--status-hold": "#cce2ff",
            "--status-review": "#fffacc",
            "--status-completed": "#90EE90",
            "--status-invoice-pending": "#f7e999",
            "--status-pending": "#FFCCCC",
            ".dark &": {
                backgroundColor: "#1c1917",
                color: "#e7e5e4",
                borderColor: "#808080",
                "--status-active": "#7d2d2d",
                "--status-hold": "#1e3a5f",
                "--status-review": "#5c5c1e",
                "--status-completed": "#1e5c1e",
                "--status-pending": "#7d2d2d",
                "--status-invoice-pending": "#665f37"
            }
        }
    },
    headRow: {
        style: {
            backgroundColor: "white",
            color: "black",
            ".dark &": {
                backgroundColor: "#363636",
                color: "#e7e5e4",
                borderColor: "#808080"
            }
        }
    },
    subHeader: {
        style: {
            backgroundColor: "white",
            color: "black",
            ".dark &": {
                backgroundColor: "#1a1a1a",
                color: "#e7e5e4",
            }
        }
    },
    rows: {
        style: {
            backgroundColor: "bl",
            color: "#383838",
            "&:hover": {
                backgroundColor: "#f3f4f6",
            },
            ".dark &": {
                backgroundColor: "#1c1917",
                color: "#e7e5e4",
                "&:hover": {
                    backgroundColor: "#292524",
                    color: "#e7e5e4",
                },
                '&:not(:last-of-type)': {
                    borderBottom: "1px solid #808080"
                },
            },
        }
    },
    pagination: {
        style: {
            backgroundColor: "white",
            color: "black",
            ".dark &": {
                backgroundColor: "#1c1917",
                color: "#e7e5e4",
            }
        },
        pageButtonsStyle: {
            borderRadius: '50%',
            height: '40px',
            width: '40px',
            padding: '8px',
            margin: 'px',
            cursor: 'pointer',
            transition: '0.4s',
            color: 'black',
            backgroundColor: 'transparent',
            '&:disabled': {
                cursor: 'unset',
                color: 'black',
            },
            '&:hover:not(:disabled)': {
                backgroundColor: '#7d7d7d',
            },
            '.dark &': {
                color: 'white',
                fill: 'white',
                '&:hover:not(:disabled)': {
                    backgroundColor: '#5e5e5e',
                },
            }
        }
    },
    noData: {
        style: {
            backgroundColor: "white",
            color: "black",
            ".dark &": {
                backgroundColor: "#1c1917",
                color: "#e7e5e4",
            }
        }
    },
    progress: {
        style: {
            backgroundColor: "white",
            color: "black",
            ".dark &": {
                backgroundColor: "#1c1917",
                color: "#e7e5e4",
            }
        }
    },
    expanderButton: {
        style: {
            backgroundColor: "white",
            color: "black",
            ".dark &": {
                backgroundColor: "#1c1917",
                color: "#e7e5e4",
                "&:hover": {
                    backgroundColor: "#7d7d7d",
                    color: "#e7e5e4",
                }
            },
        }
    }
};
