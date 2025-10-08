import { IoClose } from "react-icons/io5";
import styles from "./FormHeader.module.scss";

function ModalHeader({
    title,
    onClose,
}: {
    title: string;
    onClose: () => void;
}) {
    return (
        <div className={styles["header"]}>
            <span className={styles["header-title"]}>{title}</span>
            <div
                className={styles["header-btn"]}
                onClick={onClose}
            >
                <IoClose />
            </div>
        </div>
    );
}

export default ModalHeader;