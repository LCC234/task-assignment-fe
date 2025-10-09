import { AddTaskForm } from "../../models/forms/AddTask";
import TextInput, { FormFieldStyle } from "../input/Input";
import styles from "./AddTaskFormComponent.module.scss";


function AddTaskFormComponent({
    formData,
    setFormData
} : {
    formData: AddTaskForm;
    setFormData: (data: AddTaskForm) => void;
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
        </div>
    );
}

export default AddTaskFormComponent;