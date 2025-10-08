import Tooltip from "@mui/material/Tooltip";
import styles from "./Button.module.scss";
import CircularProgress from "@mui/material/CircularProgress";

export interface ButtonIconProps {
    element: React.ReactNode;
    position: "start" | "end";
}

export enum ButtonStyleType {
    FILLED,
    OUTLINED,
}

function Button(
    {
        label,
        onClick,
        className,
        iconProps,
        disable = false,
        hoverText = "",
        styleType = ButtonStyleType.FILLED,
        isLoading = false,
    }: {
        label: string;
        onClick: () => void;
        className?: string;
        iconProps?: ButtonIconProps;
        disable?: boolean;
        hoverText?: string;
        styleType?: ButtonStyleType;
        isLoading?: boolean;
    }
) {
    return (
        <Tooltip
            title={
                disable ? "" : <span style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }}>{hoverText}</span>
            }

        >
            <div
                onClick={() => {
                    if (disable || isLoading) return;
                    onClick();
                }}
                className={`${className ? className : ""}  ${styleType === ButtonStyleType.FILLED ? styles.filled : styles.outlined} ${disable ? styles.disabled : ""} ${styles.plain}`}
            >
                {
                    isLoading ? (
                        <CircularProgress
                            size={20}
                            sx={{
                                color: styleType === ButtonStyleType.FILLED ? "#fff" : "#000000",
                            }}
                        />
                    ) : (
                        <>
                            {iconProps?.position === "start" && (
                                <>
                                    {iconProps.element}
                                    <div className={styles.spacer} />
                                </>
                            )}

                            {label}

                            {iconProps?.position === "end" && (
                                <>
                                    <div className={styles.spacer} />
                                    {iconProps.element}
                                </>
                            )}
                        </>
                    )
                }
            </div>
        </Tooltip>
    );
}

export default Button;