import { IoIosArrowDown } from "react-icons/io";
import CustomDropdown from "../../../components/dropdowns/CustomDropdown";
import { FormFieldState, FormFieldStyle } from "../../../components/input/Input";
import Tag from "../../../components/tag/Tag";
import { convertDevelopersToMap, Developer, filterDevelopersBySkills } from "../../../models/developer";
import { TaskStatus, TaskStatusDisplay } from "../../../models/TaskStatus";
import { TaskTreeMap } from "../../../services/dto/tasks/getTasks";
import { COLORS } from "../../../styles/stylings";
import styles from "./NestedRow.module.scss";
import { useEffect, useRef, useState } from "react";
import  CircleIcon from "../../../assets/images/circle.svg?react";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

function NestedRow({
    rowData,
    developerData,
    onAssigneeChange,
    onStatusChange,
}: {
    rowData: TaskTreeMap;
    developerData: Developer[];
    onAssigneeChange: (developerId: number, taskId: number) => void;
    onStatusChange: (status: TaskStatus, taskId: number) => void;
}) {

    const hasChildren = rowData.childTasks && rowData.childTasks.length > 0;
    const [isExpanded, setIsExpanded] = useState(true);
    const [height, setHeight] = useState<string | number>("auto");
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const childContainerRef = contentRef.current;

        if (!childContainerRef) return;

        if (isExpanded) {
            const scrollHeight = childContainerRef.scrollHeight;
            setHeight(scrollHeight + "px");

            const timeout = setTimeout(() => {
                setHeight("auto");
            }, 300);
            return () => clearTimeout(timeout);
        } else {
            const currentHeight = childContainerRef.scrollHeight;
            requestAnimationFrame(() => {
                setHeight(currentHeight + "px");
                requestAnimationFrame(() => {
                    setHeight("0px");
                });
            });
        }

    }, [isExpanded, rowData.childTasks.length]);


    return (
        <div className={styles["group-row"]}>
            <div className={styles.row}>
                <div className={styles.indent} style={{ width: `${rowData.depth * 1 + ((!hasChildren && rowData.depth > 0) ? 2 : 0)}rem` }} />
                {
                    hasChildren && (
                        <IoIosArrowDown className={`${styles["toggle-icon"]} ${!isExpanded ? "" : styles.collapsed}`} onClick={() => setIsExpanded(!isExpanded)} />
                    )
                }

                <div
                    className={styles.title}
                    style={{
                        fontSize: `${rowData.depth > 1 ? 0.85 :  1}rem`,
                        fontWeight: `${rowData.depth > 1 ? 400 : 500}`,
                    }}
                >
                    {
                        rowData.status === TaskStatus.ToDo ? (
                            <CircleIcon className={`${styles["icon-status"]} ${styles["status-to-do"]}`} />
                        ) : rowData.status === TaskStatus.InProgress ? (
                            <MdOutlineAccessTimeFilled className={`${styles["icon-status"]} ${styles["status-in-progress"]}`} />
                        ) : (
                            <FaCheckCircle className={`${styles["icon-status"]} ${styles["status-completed"]}`} />
                        )
                    }
                    {rowData.title}

                </div>
                <div className={styles["row-right"]}>

                    <div className={styles.skill}>
                        {rowData.requiredSkills && rowData.requiredSkills.length > 0 && (
                            rowData.requiredSkills.map((skill, ind) => (
                                <Tag key={skill} text={skill} backgroundColor={rowData.skillIds[ind] % 2 === 0 ? COLORS.purple : COLORS.redLight} />
                            ))
                        )}
                    </div>

                    <div className={styles.status}>
                        {
                            hasChildren ? (
                                <div className={styles["status-label"]}>
                                    {TaskStatusDisplay[rowData.status]}
                                </div>
                            ) : (
                                <CustomDropdown
                                    label={""}
                                    items={TaskStatusDisplay}
                                    value={rowData.status}
                                    onChange={(event) => {
                                        onStatusChange(event.target.value as TaskStatus, rowData.id);
                                    }}
                                    styleType={FormFieldStyle.BASIC_NO_LABEL}
                                    state={FormFieldState.ENABLE}
                                    className={styles["status-dropdown"]}
                                />
                            )
                        }

                    </div>

                    <div className={styles.assignee}>
                        <CustomDropdown
                            label={""}
                            items={convertDevelopersToMap(filterDevelopersBySkills(developerData, rowData.skillIds))}
                            value={rowData.assignedDeveloperId ? rowData.assignedDeveloperId.toString() : ""}
                            onChange={(event) => {
                                onAssigneeChange(Number(event.target.value), rowData.id);
                            }}
                            styleType={FormFieldStyle.BASIC_NO_LABEL}
                            state={FormFieldState.ENABLE}
                            className={styles["assignee-dropdown"]}
                        />
                    </div>
                </div>
            </div>
            {hasChildren && (
                <div className={`${styles["children-rows"]}`} ref={contentRef} style={{ height: height }}>
                    {
                        rowData.childTasks.map((child) => (
                            <NestedRow
                                key={child.id}
                                rowData={child}
                                developerData={developerData ? developerData : []}
                                onAssigneeChange={(developerId, taskId) => {
                                    onAssigneeChange(developerId, taskId);
                                }}
                                onStatusChange={(status, taskId) => {
                                    onStatusChange(status, taskId);
                                }}
                            />
                        ))
                    }
                </div>
            )}
        </div>
    );
}

export default NestedRow;