import { useForm } from "react-hook-form";
import { ProjectFormBase } from "./form_base";

type ProjectFormValues = {
    project_name: string
    start_date: string
    end_date: string
    status: string
}

export function ProjectForm() {
    const { register, handleSubmit, formState: { errors }, control } = useForm<ProjectFormValues>()
    
    const onSubmit = (data: ProjectFormValues) => {
        console.log(data)
    }

    return (
        <div>
            <h1>Project Form</h1>
            <ProjectFormBase 
                project_id={""}
                register={register}
                errors={errors}
                control={control}
                isProcessing={false}
                manager_list={[]}
                client_list={[]}
                city_list={[]}
                point_of_contact_list={[]}
                onSubmit={handleSubmit(onSubmit)}
                method="POST"
            />
        </div>
    )
}