import styles from "./Tag.module.scss";


function Tag({
    text,
    backgroundColor,
}: {
    text: string;
    backgroundColor?: string;
}) {
    return (
        <div className={styles.tag} style={{ backgroundColor }}>
            {text}
        </div>
    );
}

export default Tag;
