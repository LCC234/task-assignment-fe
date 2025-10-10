import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import styles from "./CustomDropdown.module.scss";
import { BORDERS, COLORS, FONTS } from "../../styles/stylings";
import { FormFieldState, FormFieldStyle } from "../input/Input";

function CustomDropdown({
    value,
    onChange,
    items,
    label,
    styleType = FormFieldStyle.BASIC,
    placeholder,
    state = FormFieldState.ENABLE,
    error = false,
    customDropdownRef,
    onKeyDown,
    multiple = false,
    className = "",
}: {
    value: string | string[];
    onChange: (event: SelectChangeEvent) => void;
    items: { [key: string]: string };
    label: string;
    styleType?: FormFieldStyle;
    placeholder?: string;
    state?: FormFieldState;
    error?: boolean;
    customDropdownRef?: React.Ref<HTMLInputElement>;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    multiple?: boolean;
    className?: string;
}) {
    return (
        <div className={styles.container}>
            {/* {
                showLabelOnTop && (
                    <div className={styles["dropdown-label"]}>{label}</div>
                )
            }
             */}
            <FormControl
                fullWidth
                size="small"
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
                        input: {
                            // padding: "0.3rem 0rem 0.3rem 0.7rem",
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
                            // transform: "translate(0.9rem, -0.4rem) scale(0.75)",
                        },
                        "&.MuiFormLabel-filled": {
                            // transform: "translate(0.9rem, -0.4rem) scale(0.75)",
                        },
                        // transform: "translate(0.7rem, 0.5rem) scale(1)",
                    },

                    "& .MuiSelect-select": {
                        cursor:
                            state == FormFieldState.ENABLE
                                ? "pointer"
                                : "default",
                        color: error
                            ? COLORS.redLight
                            : state == FormFieldState.ENABLE
                            ? COLORS.textBlack
                            : COLORS.lightGrey2,
                    },
                }}
                variant="outlined"
                className={
                    `${className} ${state == FormFieldState.DISABLE
                        ? styles["dropdown-disabled"]
                        : state == FormFieldState.DISABLE_GREY_LABEL
                        ? styles["dropdown-disabled-grey-label"]
                        : styles["dropdown"]}` + ` ${error ? styles.error : ""}`
                }
            >
                {styleType === FormFieldStyle.LABEL_ANIMATION ? (
                    <InputLabel
                        htmlFor="custom-text-input"
                        className={styles["font-style"]}
                    >
                        {label}
                    </InputLabel>
                ) : styleType === FormFieldStyle.BASIC ? (
                    <div className={styles["dropdown-label"]}>{label}</div>
                ) : null}

                <Select
                    // @ts-ignore
                    value={value}
                    onChange={onChange}
                    className={`${styles["select"]} ${styles["font-style"]}`}
                    multiple={multiple}
                    label={
                        styleType === FormFieldStyle.LABEL_ANIMATION
                            ? label
                            : undefined
                    }
                    displayEmpty={
                        styleType === FormFieldStyle.LABEL_ANIMATION
                            ? false
                            : true
                    }
                    renderValue={(value: string) => {
                        if (
                            !value &&
                            styleType !== FormFieldStyle.LABEL_ANIMATION
                        ) {
                            return (
                                <div className={styles["placeholder"]}>
                                    {placeholder}
                                </div>
                            );
                        }

                        if (multiple && Array.isArray(value)) {
                            if (value.length === 0) {
                                return (
                                    <div className={styles["placeholder"]}>
                                        {placeholder}
                                    </div>
                                );
                            }
                            // command separated values
                            return <>{value.map((val) => items[val]).join(", ")}</>;
                        }

                        return <>{items[value]}</>;
                    }}
                    readOnly={state != FormFieldState.ENABLE}
                    inputRef={customDropdownRef}
                    onKeyDown={onKeyDown}
                >
                    {Object.entries(items).map(([key, value]) => (
                        <MenuItem
                            sx={{
                                fontFamily: FONTS.default,
                                fontSize: "0.85rem",
                            }}
                            value={key}
                            key={key}
                        >
                            {value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default CustomDropdown;
