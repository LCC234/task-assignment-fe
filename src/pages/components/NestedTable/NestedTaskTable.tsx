import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import CircleIcon from "../../../assets/images/circle.svg?react";
import { TaskStatus, TaskStatusDisplay } from "../../../models/TaskStatus";
import { useGetDevelopersQuery } from "../../../services/developerService";
import { TaskTreeMap } from "../../../services/dto/tasks/getTasks";
import { usePostAssignTaskMutation, usePostUpdateTaskStatusMutation } from "../../../services/taskService";
import NestedRow from "./NestedRow";
import styles from "./NestTaskTable.module.scss";
import { useSnackbar } from "notistack";
import { getTruncatedTitle } from "../../../utils/string";


function NestedTaskTable({
    taskData,
}: {
    taskData: TaskTreeMap[] | undefined;
}) {

    const { enqueueSnackbar } = useSnackbar();
    const {
        data: developerData,
    } = useGetDevelopersQuery(
        {
            all: true
        },
        {
            refetchOnMountOrArgChange: true,
        }
    );

    const [postAssignTask] = usePostAssignTaskMutation();
    const [postUpdateTaskStatus] = usePostUpdateTaskStatusMutation();

    return (
        <div className={styles.table}>
            <div className={styles.header}>
                <div className={styles["header-left"]}>
                    <div className={styles["header-task-title"]}>Tasks</div>
                    <div className={styles["legend"]}>
                        {
                            Object.values(TaskStatus).map((status: string) => (
                                <div key={status} className={styles["legend-item"]}>
                                    {status === TaskStatus.ToDo ? (
                                        <CircleIcon className={`${styles["icon-status"]} ${styles["status-to-do"]}`} />
                                    ) : status === TaskStatus.InProgress ? (
                                        <MdOutlineAccessTimeFilled className={`${styles["icon-status"]} ${styles["status-in-progress"]}`} />
                                    ) : (
                                        <FaCheckCircle className={`${styles["icon-status"]} ${styles["status-completed"]}`} />
                                    )}
                                    <div className={styles["legend-label"]}>{TaskStatusDisplay[status]}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={styles["header-right"]}>
                    <div className={styles["header-skill-title"]}>Skills</div>
                    <div className={styles["header-status-title"]}>Status</div>
                    <div className={styles["header-assignee-title"]}>Assignee</div>
                </div>
            </div>
            <div className={styles.body}>
                {
                    (taskData && taskData.length > 0) ? (
                        <>
                            {taskData.map((task) => (
                                <NestedRow
                                    key={task.id}
                                    rowData={task}
                                    developerData={developerData ? developerData : []}
                                    onAssigneeChange={async (developerId, taskId) => {
                                        try {
                                            await postAssignTask({ taskId, developerId }).unwrap();
                                            const developerName = developerData?.find(dev => Number(dev.id) === developerId)?.name;
                                            enqueueSnackbar(`Task "${getTruncatedTitle(task.title)}" assigned${developerName ? ` to ${developerName}` : ""} successfully!`, { variant: 'success' });
                                        }
                                        catch (err) {
                                            console.error("Failed to assign task:", err);
                                            enqueueSnackbar(`Failed to assign task "${getTruncatedTitle(task.title)}". Please try again.`, { variant: 'error' });
                                        }
                                    }}
                                    onStatusChange={async (status, taskId) => {
                                        try {
                                            await postUpdateTaskStatus({ taskId, status }).unwrap();
                                            enqueueSnackbar(`Task "${getTruncatedTitle(task.title)}" marked as ${TaskStatusDisplay[status]} successfully!`, { variant: 'success' });
                                        }
                                        catch (err) {
                                            console.error("Failed to update task status:", err);
                                            enqueueSnackbar(`Failed to update task "${getTruncatedTitle(task.title)}" status. Please try again.`, { variant: 'error' });
                                        }
                                    }}
                                />
                            ))}
                            <div className={styles["footer"]}/>
                        </>
                    ) : (
                        <div className={styles["no-data"]}>
                            No tasks available.
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default NestedTaskTable;