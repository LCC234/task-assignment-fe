import { IoAdd } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { TiFlowChildren } from 'react-icons/ti';
import { Task } from '../../models/task';
import styles from './NestedTaskView.module.scss';
import { MdModeEdit } from "react-icons/md";

function NestedTaskView({
    taskList,
    onEmptyClick,
    onAddClick,
    onAddChildClick,
    onDeleteClick,
    onEditClick,
}: {
    taskList: Task[];
    onEmptyClick: () => void;
    onAddClick: (depth: number, parentTaskId?: number | null) => void;
    onAddChildClick: (depth: number, taskId?: number | null) => void;
    onDeleteClick: () => void;
    onEditClick: (task: Task) => void;
}) {
    return (
        <div className={styles.container}>
            {
                taskList.length === 0 ? (
                    <div className={styles["create-task-btn"]} onClick={onEmptyClick}>
                        New Task
                    </div>
                ) : (
                    taskList.map((task, index) => (
                        <div className={styles["task-row"]} key={index} style={{ marginLeft: `${task.depth * 2}rem` }}>
                            <div className={styles["task-item"]}>
                                <div className={styles["task-title"]}>
                                    {task.title}
                                </div>
                                <div className={styles["task-icons"]}>
                                    {
                                        task.depth > 0 && (
                                            <IoAdd
                                                onClick={() => onAddClick(task.depth, task.parentTaskId)}

                                            />
                                        )
                                    }
                                    <TiFlowChildren
                                        onClick={() => onAddChildClick(task.depth, task.id)}
                                    />
                                    {/* <MdDelete
                                        onClick={onDeleteClick}
                                    /> */}
                                    {/* <MdModeEdit 
                                        onClick={() => onEditClick(task)}
                                    /> */}
                                </div>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default NestedTaskView;
