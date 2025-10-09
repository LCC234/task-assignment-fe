import { AddTaskForm } from "../../models/forms/AddTask";
import CustomDropdown from "../dropdowns/CustomDropdown";
import TextInput, { FormFieldState, FormFieldStyle } from "../input/Input";
import styles from "./AddTaskFormComponent.module.scss";


function AddTaskFormComponent({
    formData,
    setFormData,
    skillsItems,
}: {
    formData: AddTaskForm;
    setFormData: (data: AddTaskForm) => void;
    skillsItems: { [key: string]: string };
}) {



    return (
        <div className={styles.container}>
            <TextInput
                label="Title"
                value={formData.title}
                onChange={(val) =>
                    setFormData({
                        ...formData,
                        title: val
                    })
                }
                styleType={FormFieldStyle.BASIC}
                multiline={true}
            />
            <CustomDropdown
                label={"Skills Required"}
                items={skillsItems}
                value={formData.skillIds}
                onChange={(event) => {
                    console.log(event.target.value);
                    setFormData({
                        ...formData,
                        skillIds: typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value,
                    });
                }}
                styleType={FormFieldStyle.BASIC}
                state={FormFieldState.ENABLE}
                multiple={true}
            />
        </div>
    );
}

export default AddTaskFormComponent;