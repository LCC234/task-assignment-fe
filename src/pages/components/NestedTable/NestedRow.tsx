import Tag from "../../../components/tag/Tag";
import { TaskTreeMap } from "../../../services/dto/tasks/getTasks";
import { COLORS } from "../../../styles/stylings";
import styles from "./NestedRow.module.scss";
import { IoIosArrowDown } from "react-icons/io";

function NestedRow({
    rowData,
}: {
    rowData: TaskTreeMap;
}) {
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
                
            </div>
        </div>
    );
}

export default NestedRow;