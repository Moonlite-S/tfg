export const openFolder = (folder_path: string) => {
    if (folder_path) {
        const new_folder_path = `localexplorer:T:/${folder_path}`

        window.open(new_folder_path, "_blank")
    }
}