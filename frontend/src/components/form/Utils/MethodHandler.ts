import { APIResponse } from "../../API/API";
import { AxiosResponse } from "axios";
/** DEPRECATED (Use CreateOrUpdate instead)
 * 
 * Method handler for the project form
 * @param method - The method to use
 * @param createMethod - The method to use for creating the project
 * @param updateMethod - The method to use for updating the project
 * @returns The method to use
 */
export function MethodHandler<T = APIResponse>(method: "POST" | "PUT", createMethod: (data: T) => Promise<APIResponse>, updateMethod: (data: T) => Promise<APIResponse>) {
    if (method === "POST") {
        return createMethod
    } else if (method === "PUT") {
        return updateMethod
    }
}

/**
 * This is the updated method handler for Creating or Updating an object to the backend
 * 
 * This is the method handler we'll be using from now on.
 * 
 * @param method - The method to use
 * @param createMethod - The method to use for creating the object
 * @param updateMethod - The method to use for updating the object
 * @returns The method to use
 */
export function CreateOrUpdate<T = AxiosResponse>(method: "POST" | "PUT", createMethod: (data: T) => Promise<T>, updateMethod: (data: T) => Promise<T>) {
    return method === "POST" ? createMethod : updateMethod
}
