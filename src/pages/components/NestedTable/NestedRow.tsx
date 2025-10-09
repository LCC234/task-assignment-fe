import CustomDropdown from "../../../components/dropdowns/CustomDropdown";
import { FormFieldStyle, FormFieldState } from "../../../components/input/Input";
import Tag from "../../../components/tag/Tag";
import { convertDevelopersToMap, Developer, filterDevelopersBySkills } from "../../../models/developer";
import { TaskTreeMap } from "../../../services/dto/tasks/getTasks";
import { COLORS } from "../../../styles/stylings";
import styles from "./NestedRow.module.scss";
import { IoIosArrowDown } from "react-icons/io";

function NestedRow({
    rowData,
    developerData,
}: {
    rowData: TaskTreeMap;
    developerData: Developer[];
}) {
    // console.log("Row Data:", rowData);
    // console.log("Developer Data:", developerData);
    return (
        <div className={styles.row}>
            <div className={styles.indent} style={{ width: `${rowData.depth * 0.5}rem` }} />
            <IoIosArrowDown className={styles["toggle-icon"]} />
            <div className={styles.title}>
                {rowData.title}
                {rowData.requiredSkills && rowData.requiredSkills.length > 0 && (
                    rowData.requiredSkills.map((skill, ind) => (
                        <Tag key={skill} text={skill} backgroundColor={rowData.skillIds[ind] % 2 === 0 ? COLORS.purple : COLORS.redLight} />
                    ))
                )}
            </div>
            <div className={styles.assignee}>
                <CustomDropdown
                    label={""}
                    items={convertDevelopersToMap(filterDevelopersBySkills(developerData, rowData.skillIds))}
                    value={rowData.assignedDeveloperId ? rowData.assignedDeveloperId.toString() : ""}
                    onChange={(event) => {
                        console.log(event.target.value);
                        rowData.assignedDeveloperId = Number(event.target.value);
                    }}
                    styleType={FormFieldStyle.BASIC_NO_LABEL}
                    state={FormFieldState.ENABLE}
                />
            </div>
        </div>
    );
}

export default NestedRow;