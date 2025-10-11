import { Avatar } from "@mui/material";
import styles from "./Header.module.scss";
import { PiProjectorScreenChartFill  } from "react-icons/pi";

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles["left-container"]}>
                <PiProjectorScreenChartFill  className={styles["logo"]} size={"1.6rem"}/>
                <span className={styles["title"]}>
                    Project Tracker
                </span>
            </div>

            <div className={styles["side-menu"]}>
                <Avatar sx={{ bgcolor: "#7b77ccff" }}>A</Avatar>
            </div>
        </header>
    );
}

export default Header;