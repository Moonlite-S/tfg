import type { FieldValues } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { GenericForm, GenericFormBGContainer } from "@/components/ui/GenericForm"
import { Submit } from "@/components/form/Buttons/Submit"
import { FormGroup, FormChild } from "@/components/form/Containers/FormGroup"
import { Checkbox } from "@/components/form/Inputs/Checkbox"
import { CreateSelect } from "@/components/form/Inputs/CreateSelect"
import { SearchSelect } from "@/components/form/Inputs/SearchSelect"
import { TextArea } from "@/components/form/Inputs/TextArea"
import type { FormHookDefaults } from "@/components/form/Interfaces/BasePropFormHookDefaults"
import type { FormFetchDataProps } from "@/components/form/Interfaces/FormFetchData"
import { PROJECT_STATUS } from "@/components/form/Schemas/StatusSchema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/form/Inputs/Input"

type ProjectBaseProps<TFormValues extends FieldValues> = {
    manager_list: FormFetchDataProps[]
    client_list: FormFetchDataProps[]
    city_list: string[]
    point_of_contact_list: FormFetchDataProps[]
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    method: "POST" | "PUT"
    project_id: string
} & FormHookDefaults<TFormValues>

const templates = [
    {value: 'default', label: 'Default'},
    {value: 'commercial', label: 'Commercial'},
    {value: 'educational', label: 'Educational'},
    {value: 'food service', label: 'Food Service'},
    {value: 'industrial', label: 'Industrial'},
    {value: 'institutional', label: 'Institutional'},
    {value: 'medical', label: 'Medical'},
    {value: 'municipal', label: 'Municipal'},
    {value: 'religious', label: 'Religious'},
    {value: 'residential', label: 'Residential'}, 
]

export function ProjectFormBase<TFormValues extends FieldValues>({register, control, manager_list, client_list, city_list, point_of_contact_list, onSubmit, method, errors, isProcessing, project_id}: ProjectBaseProps<TFormValues>) {
    const navigate = useNavigate()

    return (
        <GenericForm form_id="project_creation" onSubmit={onSubmit}>
            <GenericFormBGContainer>
                <h2 className="text-2xl font-bold">{method === "POST" ? "Create" : "Update"} Project {project_id ? `(${project_id})` : ""}</h2>

                <Input label="Project Name" name="project_name" type="text" register={register} />
                {errors.project_name && <p className="text-red-500">{errors.project_name.message}</p>}

                <FormGroup grid_cols={2}>
                    <FormChild>
                        <Input label="Date Created" name="start_date" type="date" register={register} />
                        {errors.start_date && <p className="text-red-500">{errors.start_date.message}</p>}
                    </FormChild>

                    <FormChild>
                        <Input label="Date Due" name="end_date" type="date" register={register} />
                        {errors.end_date && <p className="text-red-500">{errors.end_date.message}</p>}

                        <FormChild layout="row" className="justify-end">
                            <Checkbox label="Deadline" name="isDeadline" register={register} />
                            <Checkbox label="No Date Due" name="no_date_due" register={register} />
                        </FormChild>
                    </FormChild>
                </FormGroup>

                <FormGroup grid_cols={2}>
                    <FormChild>
                        <CreateSelect label="Point of Contact" name="point_of_contact" options={point_of_contact_list} control={control} optional />
                        {errors.point_of_contact && <p className="text-red-500">{errors.point_of_contact.message}</p>}
                    </FormChild>

                    <FormChild>
                        <CreateSelect label="Client Name" name="client_name" options={client_list} control={control} />
                        {errors.client_name && <p className="text-red-500">{errors.client_name.message}</p>}
                    </FormChild>
                </FormGroup>

                <FormGroup grid_cols={2}>
                    <FormChild>
                        <SearchSelect label="Project Manager" name="manager" options={manager_list} control={control}  />
                        {errors.manager && <p className="text-red-500">{errors.manager.message}</p>}
                    </FormChild>

                    <FormChild>
                        <CreateSelect label="City" name="city" options={city_list.map((city) => ({value: city, label: city}))} control={control} />
                        {errors.city && <p className="text-red-500">{errors.city.message}</p>}
                    </FormChild>
                </FormGroup>

                <TextArea label="Project Description" name="description" placeholder="Enter a description for the project" register={register} />
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}

                <FormGroup grid_cols={2}>
                    <FormChild>
                        <SearchSelect label="Project Type" name="template" options={templates} control={control} />
                        {errors.template && <p className="text-red-500">{errors.template.message}</p>}
                    </FormChild>

                    <FormChild>
                        <SearchSelect label="Status" name="status" options={PROJECT_STATUS.map((status) => ({value: status, label: status}))} control={control} />
                        {errors.status && <p className="text-red-500">{errors.status.message}</p>}
                    </FormChild>
                </FormGroup>

                { method === "PUT" &&
                    <>
                        <Input label="Folder Location" name="folder_location" type="text" register={register} tooltip="CAUTION: You should only change this if you change the actual folder location on the server." />
                        {errors.folder_location && <p className="text-red-500">{errors.folder_location.message}</p>}
                    </>
                }

                <h4 className="mt-4 text-lg font-bold">Details:</h4>

                <FormGroup grid_cols={2}>
                    <FormChild>
                        <Input label="Size (sqft)" name="project_size" type="text" register={register} />
                        {errors.project_size && <p className="text-red-500">{errors.project_size.message}</p>}
                    </FormChild>
                </FormGroup>
                
                <FormGroup>
                    <Button className="" onClick={() => navigate("/projects")}>Cancel</Button>
                    <Submit isSubmitting={isProcessing} label="Submit" />
                </FormGroup>
            </GenericFormBGContainer>
        </GenericForm>
    )
}