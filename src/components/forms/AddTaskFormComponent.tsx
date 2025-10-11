import { AddTaskForm } from "../../models/forms/AddTask";
import CustomDropdown from "../dropdowns/CustomDropdown";
import TextInput, { FormFieldState, FormFieldStyle } from "../input/Input";
import styles from "./AddTaskFormComponent.module.scss";


function AddTaskFormComponent({
    formData,
    setFormData,
    skillsItems,
    developerItems,
    parentTaskTitle,
}: {
    formData: AddTaskForm;
    setFormData: (data: AddTaskForm) => void;
    skillsItems: { [key: number]: string };
    developerItems: { [key: string]: string };
    parentTaskTitle?: string;
}) {

    return (
        <div className={styles.container}>
            <div className={styles["parent-task-title"]}>
                {parentTaskTitle && formData.depth > 0 && (
                    <>
                        Parent Task - <span className={styles["parent-task-title"]}>{parentTaskTitle}</span>
                    </>
                )}
            </div>
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
                    setFormData({
                        ...formData,
                        skillIds: (typeof event.target.value === 'string' || typeof event.target.value === 'number') ? event.target.value.split(',') : event.target.value,
                    });
                }}
                styleType={FormFieldStyle.BASIC}
                state={FormFieldState.ENABLE}
                multiple={true}
            />
            <CustomDropdown
                label={"Assigned Developer (Skills must be chosen first)"}
                items={developerItems}
                value={formData.assignToId}
                onChange={(event) => {
                    setFormData({
                        ...formData,
                        assignToId: event.target.value as string,
                    });
                }}
                styleType={FormFieldStyle.BASIC}
                state={FormFieldState.ENABLE}
            />
        </div>
    );
}

export default AddTaskFormComponent;