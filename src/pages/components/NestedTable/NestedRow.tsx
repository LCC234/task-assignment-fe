import CustomDropdown from "../../../components/dropdowns/CustomDropdown";
import { FormFieldStyle, FormFieldState } from "../../../components/input/Input";
import Tag from "../../../components/tag/Tag";
import { convertDevelopersToMap, Developer, filterDevelopersBySkills } from "../../../models/developer";
import { TaskStatus, TaskStatusDisplay } from "../../../models/TaskStatus";
import { TaskTreeMap } from "../../../services/dto/tasks/getTasks";
import { COLORS } from "../../../styles/stylings";
import styles from "./NestedRow.module.scss";
import { IoIosArrowDown } from "react-icons/io";

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
    // console.log("Row Data:", rowData);
    // console.log("Developer Data:", developerData);
    return (
        <div className={styles["group-row"]}>
            <div className={styles.row}>
                <div className={styles.indent} style={{ width: `${rowData.depth * 1}rem` }} />
                <IoIosArrowDown className={styles["toggle-icon"]} />
                <div className={styles.title}>
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
                        <CustomDropdown
                            label={""}
                            items={TaskStatusDisplay}
                            value={rowData.status}
                            onChange={(event) => {
                                console.log(event.target.value);
                                onStatusChange(event.target.value as TaskStatus, rowData.id);
                            }}
                            styleType={FormFieldStyle.BASIC_NO_LABEL}
                            state={FormFieldState.ENABLE}
                            className={styles["assignee-status"]}
                        />
                    </div>

                    <div className={styles.assignee}>
                        <CustomDropdown
                            label={""}
                            items={convertDevelopersToMap(filterDevelopersBySkills(developerData, rowData.skillIds))}
                            value={rowData.assignedDeveloperId ? rowData.assignedDeveloperId.toString() : ""}
                            onChange={(event) => {
                                console.log(event.target.value);
                                // rowData.assignedDeveloperId = Number(event.target.value);
                                onAssigneeChange(Number(event.target.value), rowData.id);
                            }}
                            styleType={FormFieldStyle.BASIC_NO_LABEL}
                            state={FormFieldState.ENABLE}
                            className={styles["assignee-dropdown"]}
                        />
                    </div>
                </div>
            </div>
            {rowData.childTasks && rowData.childTasks.length > 0 && (
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
            )}
        </div>
    );
}

export default NestedRow;