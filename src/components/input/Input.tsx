import { InputAdornment } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { ReactNode } from "react";
import { BORDERS, COLORS } from "../../styles/stylings";
import styles from "./Input.module.scss";

type IconProps = {
    element: ReactNode;
    position: "start" | "end";
    onClick?: () => void;
};

export enum FormFieldStyle {
    BASIC = "basic",
    BASIC_NO_LABEL = "basic-no-label",
    LABEL_ANIMATION = "label-animation",
}

export enum FormFieldState {
    DISABLE = "disable",
    ENABLE = "enable",
    DISABLE_GREY_LABEL = "disable-grey-label",
}

function TextInput({
    label,
    value,
    onChange,
    placeholder,
    type,
    required,
    variant = "outlined",
    iconProps,
    styleType = FormFieldStyle.BASIC,
    state = FormFieldState.ENABLE,
    error = false,
    textInputRef: ref,
    onKeyDown,
    autoComplete = "off"
}: {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    required?: boolean;
    variant?: "filled" | "outlined";
    iconProps?: IconProps;
    styleType?: FormFieldStyle;
    readOnly?: boolean;
    state?: FormFieldState;
    error?: boolean;
    textInputRef?: React.Ref<HTMLInputElement>;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    autoComplete?: string
}) {
    return (
        <div className={styles.container}>
            <FormControl
                variant="outlined"
                size="small"
                className={
                    `${state == FormFieldState.DISABLE
                        ? styles["input-form-disabled"]
                        : state == FormFieldState.DISABLE_GREY_LABEL
                            ? styles["input-form-disabled-grey-label"]
                            : styles["input-form"]
                    } ` + ` ${error ? styles.error : ""}`
                }
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "&.Mui-focused": {
                            fieldset: {
                                borderColor: error
                                    ? COLORS.red
                                    : state == FormFieldState.ENABLE
                                        ? COLORS.purple
                                        : COLORS.lightGreyBorder,
                                borderWidth:
                                    state == FormFieldState.ENABLE
                                        ? "2px"
                                        : "1px",
                            },
                            svg: {
                                color: error ? COLORS.red : COLORS.textBlack,
                            },
                        },
                        backgroundColor:
                            state == FormFieldState.ENABLE
                                ? COLORS.white
                                : COLORS.lightGrey,
                        borderRadius: BORDERS.radiusForm,
                    },
                    "& .MuiInputLabel-root": {
                        "&.Mui-focused": {
                            color: error ? COLORS.red : COLORS.purple,
                        },
                        "&.MuiFormLabel-filled": {},
                        fontSize: "1rem",
                    },
                    "& .MuiInputBase-root": {
                        height: "100%",
                    },
                    "& .MuiInputBase-adornedStart": {
                        "& .MuiInputAdornment-positionStart": {},
                    },
                }}
            >
                {styleType === FormFieldStyle.LABEL_ANIMATION ? (
                    <InputLabel htmlFor="custom-text-input">{label}</InputLabel>
                ) : styleType === FormFieldStyle.BASIC ? (
                    <div className={styles["input-label-above"]}>{label}</div>
                ) : null}

                <OutlinedInput
                    autoComplete={autoComplete}
                    type={type}
                    value={value}
                    onChange={(e) =>
                        state == FormFieldState.ENABLE &&
                        onChange(e.target.value)
                    }
                    readOnly={state != FormFieldState.ENABLE}
                    endAdornment={
                        iconProps?.position === "end" &&
                        iconProps.element && (
                            <InputAdornment
                                position="end"
                                onClick={iconProps.onClick}
                                sx={{
                                    cursor: iconProps.onClick ? "pointer" : "default",
                                }}
                            >
                                {iconProps.element}
                            </InputAdornment>
                        )
                    }
                    startAdornment={
                        iconProps?.position === "start" &&
                        iconProps.element && (
                            <InputAdornment
                                position="start"
                                onClick={iconProps.onClick}
                                sx={{
                                    cursor: iconProps.onClick ? "pointer" : "default",
                                }}
                            >
                                {iconProps.element}
                            </InputAdornment>
                        )
                    }
                    label={
                        styleType === FormFieldStyle.LABEL_ANIMATION
                            ? label
                            : undefined
                    }
                    placeholder={
                        styleType === FormFieldStyle.BASIC ||
                            styleType === FormFieldStyle.BASIC_NO_LABEL
                            ? placeholder
                            : undefined
                    }
                    onKeyDown={onKeyDown}
                    inputRef={ref}
                />
            </FormControl>
            {/* )} */}
        </div>
    );
}

export default TextInput;
