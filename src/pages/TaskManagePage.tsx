import { useState } from "react";
import Button, { ButtonStyleType } from "../components/button/Button";
import styles from "./TaskManagePage.module.scss";
import { IoMdAddCircle } from "react-icons/io";
import FormModal from "../components/modals/FormModal";
import { FormState } from "../models/forms/common";

function TaskManagePage() {

    const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
    const [createTaskFormState, setCreateTaskFormState] = useState<FormState>(FormState.DEFAULT);

    const [isTaskFormModalOpen, setIsTaskFormModalOpen] = useState(false);

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
                            setIsCreateTaskModalOpen(true);
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
                isModalVisible={isCreateTaskModalOpen}
                setModalVisible={(visible: boolean) => setIsCreateTaskModalOpen(visible)}
                title="Create New Tasks"
                btnLabel="Create"
                btnHoverText="Create tasks"
                btnOnClick={() => {}}
                formState={createTaskFormState}
            >
                <div className={styles["form-content"]}>
                    <div className={styles["create-task-btn"]}>
                        New Task
                    </div>
                </div>
            </FormModal>
                
        </>
    );
}

export default TaskManagePage;