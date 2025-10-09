import { useState } from "react";
import Button, { ButtonStyleType } from "../components/button/Button";
import styles from "./TaskManagePage.module.scss";
import { IoMdAddCircle } from "react-icons/io";
import FormModal from "../components/modals/FormModal";
import { FormState } from "../models/forms/common";
import { AddTaskForm, defaultAddTaskForm } from "../models/forms/AddTask";
import AddTaskFormComponent from "../components/forms/AddTaskFormComponent";
import { defaultSkillItems } from "../models/Skill";
import { useGetSkillsQuery } from "../services/skillService";
import { useGetDevelopersQuery } from "../services/developerService";
import { convertDevelopersToMap } from "../models/developer";

function TaskManagePage() {

    const [isTaskTreeModalOpen, setIsTaskTreeModalOpen] = useState(false);
    const [taskTreeFormState, setTaskTreeFormState] = useState<FormState>(FormState.DEFAULT);

    const [isCreateTaskFormModalOpen, setIsCreateTaskFormModalOpen] = useState(false);
    const [createTaskFormData, setCreateTaskFormData] = useState<AddTaskForm>(defaultAddTaskForm)
    const [createTaskFormState, setCreateTaskFormState] = useState<FormState>(FormState.DEFAULT);

    const {
        data: skillData
    } = useGetSkillsQuery({});

    const {
        data: developerData,
    } = useGetDevelopersQuery(
        {
            requiredSkillsIDs: createTaskFormData.skillIds.length > 0 ? createTaskFormData.skillIds.map(id => parseInt(id)) : []
        },
        {
            refetchOnMountOrArgChange: true,
        }
    );

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        Project Overview
                    </div>
                    <Button
                        label="Create"
                        onClick={() => {
                            setIsTaskTreeModalOpen(true);
                        }}
                        className={styles["create-button"]}
                        hoverText="Create a new task"
                        styleType={ButtonStyleType.FILLED}
                        iconProps={{
                            element: (
                                <IoMdAddCircle size={30} color="white" />
                            ),
                            position: "start",
                        }}
                    />
                </div>
            </div>
            <FormModal
                isModalVisible={isTaskTreeModalOpen}
                setModalVisible={(visible: boolean) => setIsTaskTreeModalOpen(visible)}
                title="Create New Task Tree"
                btnLabel="Create"
                btnHoverText="Create task tree"
                btnOnClick={() => { }}
                formState={taskTreeFormState}
            >
                <div className={styles["form-content"]}>
                    <div className={styles["create-task-btn"]} onClick={() => {
                        setIsTaskTreeModalOpen(false);
                        setIsCreateTaskFormModalOpen(true);
                    }}>
                        New Task
                    </div>
                </div>
            </FormModal>

            <FormModal
                isModalVisible={isCreateTaskFormModalOpen}
                setModalVisible={(visible: boolean) => setIsCreateTaskFormModalOpen(visible)}
                title="Create New Task"
                btnLabel="Create"
                btnHoverText="Create task"
                btnOnClick={() => { }}
                formState={createTaskFormState}
            >
                <AddTaskFormComponent
                    formData={createTaskFormData}
                    setFormData={setCreateTaskFormData}
                    skillsItems={skillData ? skillData : defaultSkillItems}
                    developerItems={convertDevelopersToMap(developerData ? developerData : [])}
                />
            </FormModal>

        </>
    );
}

export default TaskManagePage;