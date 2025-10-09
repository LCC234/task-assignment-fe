import { useState } from "react";
import { useGetDevelopersQuery } from "../../../services/developerService";
import { getTasksResponse, TaskTreeMap } from "../../../services/dto/tasks/getTasks";
import NestedRow from "./NestedRow";
import styles from "./NestTaskTable.module.scss";
import { convertDevelopersToMap, filterDevelopersBySkills } from "../../../models/developer";


function NestedTaskTable({
    taskData
}: {
    taskData: TaskTreeMap[] | undefined;
}) {

    const [selectedTaskSkillIds, setSelectedTaskSkillIds] = useState<number[]>([]);

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
                    />
                ))}
            </div>
        </div>
    );
}

export default NestedTaskTable;