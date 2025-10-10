import { useState } from "react";
import { useGetDevelopersQuery } from "../../../services/developerService";
import { getTasksResponse, TaskTreeMap } from "../../../services/dto/tasks/getTasks";
import NestedRow from "./NestedRow";
import styles from "./NestTaskTable.module.scss";
import { convertDevelopersToMap, filterDevelopersBySkills } from "../../../models/developer";
import { usePostAssignTaskMutation } from "../../../services/taskService";


function NestedTaskTable({
    taskData
}: {
    taskData: TaskTreeMap[] | undefined;
}) {


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

    return (
        <div className={styles.table}>
            <div className={styles.header}>
                Task Tree
            </div>
            <div className={styles.body}>
                {taskData?.map((task) => (
                    <NestedRow
                        key={task.id}
                        rowData={task}
                        developerData={developerData ? developerData : []}
                        onAssigneeChange={async (developerId, taskId) => {
                            try {
                                await postAssignTask({ taskId, developerId }).unwrap();

                            }
                            catch (err) {
                                console.error("Failed to assign task:", err);
                            }
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default NestedTaskTable;