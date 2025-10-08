import Button, { ButtonStyleType } from "../components/button/Button";
import styles from "./TaskManagePage.module.scss";
import { IoMdAddCircle } from "react-icons/io";

function TaskManagePage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>
                    Project Overview
                </div>
                <Button
                    label="Create"
                    onClick={() => { console.log("Create New Task clicked"); }}
                    className={styles["create-button"]}
                    hoverText="Create a new task"
                    styleType={ButtonStyleType.FILLED}
                    iconProps={{
                        element: (
                            <IoMdAddCircle size={30} color="white" />
                        ),
                        position: "start",
                    }}
                />

            </div>

        </div>
    );
}

export default TaskManagePage;