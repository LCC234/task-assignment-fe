import { IoAdd } from 'react-icons/io5';
import { TiFlowChildren } from 'react-icons/ti';
import { Task } from '../../models/task';
import { SkillMap } from '../../services/dto/skills/getSkills';
import { COLORS } from '../../styles/stylings';
import styles from './NestedTaskView.module.scss';
import Tag from '../../components/tag/Tag';

function NestedTaskView({
    taskList,
    onEmptyClick,
    onAddClick,
    onAddChildClick,
    onDeleteClick,
    onEditClick,
    skillMap,
}: {
    taskList: Task[];
    onEmptyClick: () => void;
    onAddClick: (depth: number, parentTaskId: number | null, parentTaskTitle: string | null) => void;
    onAddChildClick: (depth: number, taskId: number | null, parentTaskTitle: string | null) => void;
    onDeleteClick: () => void;
    onEditClick: (task: Task) => void;
    skillMap: SkillMap;
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
                                    {
                                        task.skillIds.map((skillId, idx) => {
                                            if (!skillMap[skillId]) return null;
                                            return (
                                                <>
                                                    <Tag
                                                        text={skillMap[skillId]}
                                                        backgroundColor={skillId % 2 === 0 ? COLORS.purple : COLORS.redLight}
                                                    />
                                                </>
                                            );
                                        })
                                    }
                                </div>
                                <div className={styles["task-icons"]}>
                                    {
                                        task.depth > 0 && (
                                            <IoAdd
                                                onClick={() => onAddClick(task.depth, task.parentTaskId, task.parentTaskTitle)}
                                                title='Add Sibling Task'
                                            />
                                        )
                                    }
                                    {
                                        task.depth < 3 && (
                                            <TiFlowChildren
                                                onClick={() => onAddChildClick(task.depth, task.id, task.title)}
                                                title='Add Sub-task'
                                            />
                                        )
                                    }
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
