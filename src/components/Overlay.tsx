import { Outlet } from "react-router-dom";
import Header from "./Header";
import styles from "./Overlay.module.scss";

function Overlay() {
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.outlet}>
                <Outlet />
            </main>
        </div>
    );
}

export default Overlay;