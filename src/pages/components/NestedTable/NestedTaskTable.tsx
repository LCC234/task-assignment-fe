import { getTasksResponse, TaskTreeMap } from "../../../services/dto/tasks/getTasks";
import NestedRow from "./NestedRow";
import styles from "./NestTaskTable.module.scss";


function NestedTaskTable({
    taskData
}: {
    taskData: TaskTreeMap[] | undefined;
}) {
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
                    />
                ))} 
            </div>
        </div>
    );
}

export default NestedTaskTable;