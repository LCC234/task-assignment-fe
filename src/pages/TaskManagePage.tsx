import { useEffect, useState } from "react";
import Button, { ButtonStyleType } from "../components/button/Button";
import styles from "./TaskManagePage.module.scss";
import { IoMdAddCircle } from "react-icons/io";
import FormModal from "../components/modals/FormModal";
import { FormState } from "../models/forms/common";
import { AddTaskForm, defaultAddTaskForm, isTaskFormValid } from "../models/forms/AddTask";
import AddTaskFormComponent from "../components/forms/AddTaskFormComponent";
import { defaultSkillItems } from "../models/Skill";
import { useGetSkillsQuery } from "../services/skillService";
import { useGetDevelopersQuery } from "../services/developerService";
import { convertDevelopersToMap } from "../models/developer";
import { useDeduceSkillsRequiredMutation } from "../services/aiService";
import { MdDelete } from "react-icons/md";
import { TiFlowChildren } from "react-icons/ti";
import { IoAdd } from "react-icons/io5";

function TaskManagePage() {

    const [isTaskTreeModalOpen, setIsTaskTreeModalOpen] = useState(false);
    const [taskTreeFormState, setTaskTreeFormState] = useState<FormState>(FormState.DEFAULT);

    const [isCreateTaskFormModalOpen, setIsCreateTaskFormModalOpen] = useState(false);
    const [createTaskFormData, setCreateTaskFormData] = useState<AddTaskForm>(defaultAddTaskForm)
    const [createTaskFormState, setCreateTaskFormState] = useState<FormState>(FormState.DEFAULT);

    const [newTaskList, setNewTaskList] = useState<AddTaskForm[]>([{
        title: 'Gaming', parentId: null, assignToId: '', status: 'To-Do', skillIds: ["1"], depth: 0
    }]);

    const {
        data: skillData
    } = useGetSkillsQuery({}, {
        refetchOnFocus: true,
    });

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

    const [deduceSkillsRequired] = useDeduceSkillsRequiredMutation();

    useEffect(() => {
        console.log("newTaskList updated:", newTaskList, createTaskFormState);
    }, [newTaskList, createTaskFormState]);

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
                    {
                        newTaskList.length === 0 ? (
                            <div className={styles["create-task-btn"]} onClick={() => {
                                setIsTaskTreeModalOpen(false);
                                setIsCreateTaskFormModalOpen(true);
                            }}>
                                New Task
                            </div>
                        ) : (
                            newTaskList.map((task, index) => (
                                <div key={index} className={styles["task-item"]}>
                                    <div className={styles["task-title"]}>
                                        {task.title}
                                    </div>
                                    <div className={styles["task-icons"]}>
                                        {
                                            task.depth > 0 && (
                                                <IoAdd />
                                            )
                                        }
                                        <TiFlowChildren />
                                        <MdDelete />
                                    </div>
                                </div>
                            ))
                        )
                    }

                </div>
            </FormModal>

            <FormModal
                isModalVisible={isCreateTaskFormModalOpen}
                setModalVisible={(visible: boolean) => setIsCreateTaskFormModalOpen(visible)}
                title="New Task Details"
                btnLabel="Confirm"
                btnHoverText="Confirm task details"
                onClose={() => {
                    setCreateTaskFormData(defaultAddTaskForm());
                    setCreateTaskFormState(FormState.DEFAULT);
                    setIsTaskTreeModalOpen(true);
                }}
                btnOnClick={async () => {
                    setCreateTaskFormState(FormState.LOADING);
                    const taskForm: AddTaskForm = createTaskFormData;
                    try {
                        const skillRequired = await deduceSkillsRequired({ description: createTaskFormData.title }).unwrap();
                        if (skillRequired && skillRequired.skillIds) {
                            taskForm.skillIds = skillRequired.skillIds.map(id => id.toString());
                        }

                    } catch (error) {
                        console.error("Error creating task:", error);
                        // setCreateTaskFormState(FormState.ERROR);
                    }
                    setNewTaskList([...newTaskList, taskForm]);
                    setCreateTaskFormData(defaultAddTaskForm());
                    setCreateTaskFormState(FormState.DEFAULT);
                    setIsCreateTaskFormModalOpen(false);
                    setIsTaskTreeModalOpen(true);

                }}
                formState={createTaskFormState}
                submitDisabled={isTaskFormValid(createTaskFormData) === false || createTaskFormState === FormState.LOADING}
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