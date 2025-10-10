import { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import Button, { ButtonStyleType } from "../components/button/Button";
import AddTaskFormComponent from "../components/forms/AddTaskFormComponent";
import FormModal from "../components/modals/FormModal";
import { convertDevelopersToMap } from "../models/developer";
import { AddTaskForm, defaultAddTaskForm, isTaskFormValid } from "../models/forms/AddTask";
import { FormState } from "../models/forms/common";
import { defaultSkillItems } from "../models/Skill";
import { Task } from "../models/task";
import { useGetDevelopersQuery } from "../services/developerService";
import { useGetSkillsQuery } from "../services/skillService";
import { useCreateTaskMutation, useGetTaskPaginationQuery } from "../services/taskService";
import NestedTaskView from "./components/NestedTaskView";
import styles from "./TaskManagePage.module.scss";
import NestedTaskTable from "./components/NestedTable/NestedTaskTable";

function TaskManagePage() {

    const [isTaskTreeModalOpen, setIsTaskTreeModalOpen] = useState(false);
    const [taskTreeFormState, setTaskTreeFormState] = useState<FormState>(FormState.DEFAULT);

    const [isCreateTaskFormModalOpen, setIsCreateTaskFormModalOpen] = useState(false);
    const [createTaskFormData, setCreateTaskFormData] = useState<AddTaskForm>(defaultAddTaskForm)
    const [createTaskFormState, setCreateTaskFormState] = useState<FormState>(FormState.DEFAULT);

    const [newTaskList, setNewTaskList] = useState<Task[]>([
        // {
        //     title: 'Gaming', parentTaskId: null, assignedDeveloperId: null, status: 'To-Do', skillIds: [1], depth: 0, id: 0
        // },
        // {
        //     title: 'Gaming', parentTaskId: null, assignedDeveloperId: null, status: 'To-Do', skillIds: [1], depth: 1, id: 1
        // },
        // {
        //     title: 'Gaming', parentTaskId: null, assignedDeveloperId: null, status: 'To-Do', skillIds: [1], depth: 2, id: 1
        // },
    ]);

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

    const {
        data: taskData,
    } = useGetTaskPaginationQuery(
        {
            page: 1,
            pageSize: 100,
            searchText: "",
        },
        {
            refetchOnMountOrArgChange: true,
        }
    );

    const [createTask] = useCreateTaskMutation();

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
                <div className={styles.content}>
                    <NestedTaskTable
                        taskData={taskData?.rows}
                    />
                </div>
            </div>
            <FormModal
                isModalVisible={isTaskTreeModalOpen}
                setModalVisible={(visible: boolean) => setIsTaskTreeModalOpen(visible)}
                title="Create New Task Tree"
                btnLabel="Done"
                btnHoverText="Create task tree"
                btnOnClick={() => {
                    setIsTaskTreeModalOpen(false);
                    // setNewTaskList([]);
                    // setTaskTreeFormState(FormState.DEFAULT);
                }}
                onClose={() => {
                    setIsTaskTreeModalOpen(false);
                    // setNewTaskList([]);
                    // setTaskTreeFormState(FormState.DEFAULT);
                }}
                formState={taskTreeFormState}
                showFooterBtn={newTaskList.length > 0}
            >
                <div className={styles["form-content"]}>
                    <NestedTaskView
                        taskList={newTaskList}
                        onEmptyClick={() => {
                            setIsTaskTreeModalOpen(false);
                            setIsCreateTaskFormModalOpen(true);
                        }}
                        onAddClick={(depth: number, parentTaskId?: number | null) => {
                            setCreateTaskFormData(defaultAddTaskForm(depth, parentTaskId));
                            setIsTaskTreeModalOpen(false);
                            setIsCreateTaskFormModalOpen(true);
                        }}
                        onAddChildClick={(depth: number, taskId?: number | null) => {
                            setCreateTaskFormData(defaultAddTaskForm(depth + 1, taskId));
                            setIsTaskTreeModalOpen(false);
                            setIsCreateTaskFormModalOpen(true);
                        }}
                        onDeleteClick={() => { }}
                        onEditClick={(task: Task) => {
                            // setCreateTaskFormData(defaultAddTaskForm(task.depth, task.parentTaskId));
                            // setIsTaskTreeModalOpen(false);
                            // setIsCreateTaskFormModalOpen(true);
                        }}
                        skillMap={skillData ? skillData : {}}
                    />
                </div>
            </FormModal>

            <FormModal
                isModalVisible={isCreateTaskFormModalOpen}
                setModalVisible={(visible: boolean) => setIsCreateTaskFormModalOpen(visible)}
                title={"New Task Details" + (createTaskFormData.depth > 0 ? ` (Sub-task, Level ${createTaskFormData.depth})` : " (Root Task)")}
                btnLabel="Confirm"
                btnHoverText="Confirm task details"
                onClose={() => {
                    setIsTaskTreeModalOpen(true);
                    setCreateTaskFormState(FormState.DEFAULT);
                    setCreateTaskFormData(defaultAddTaskForm());
                }}
                btnOnClick={async () => {
                    setCreateTaskFormState(FormState.LOADING);
                    const taskForm: AddTaskForm = createTaskFormData;
                    try {
                        const createdTask = await createTask({
                            title: taskForm.title,
                            parentTaskId: taskForm.parentId ? taskForm.parentId : null,
                            assignedDeveloperId: taskForm.assignToId ? parseInt(taskForm.assignToId) : null,
                            status: taskForm.status,
                            skillIds: taskForm.skillIds.map(id => parseInt(id)),
                            depth: taskForm.depth,
                        }).unwrap();
                        console.log("Task created successfully:", createdTask);

                        // add the created task next to the parent id if exists, otherwise add to the end of the list
                        if (createdTask.parentTaskId) {
                            const parentIndex = newTaskList.findIndex(task => task.id === createdTask.parentTaskId);
                            if (parentIndex !== -1) {
                                const updatedTaskList = [...newTaskList];
                                updatedTaskList.splice(parentIndex + 1, 0, createdTask);
                                setNewTaskList(updatedTaskList);
                            } else {
                                setNewTaskList([...newTaskList, createdTask]);
                            }
                        } else {
                            setNewTaskList([...newTaskList, createdTask]);
                        }
                        // setNewTaskList([...newTaskList, createdTask]);
                        setCreateTaskFormData(defaultAddTaskForm());
                        setCreateTaskFormState(FormState.DEFAULT);
                        setIsCreateTaskFormModalOpen(false);
                        setIsTaskTreeModalOpen(true);
                    } catch (error) {
                        console.error("Error creating task:", error);
                        setCreateTaskFormState(FormState.ERROR);
                    }
                    // setNewTaskList([...newTaskList, taskForm]);


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