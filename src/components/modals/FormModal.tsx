import { Fade, Modal } from "@mui/material"
import { COLORS } from "../../styles/stylings"
import ModalHeader from "./FormHeader"
import styles from "./FormModal.module.scss"
import Button from "../button/Button"
import { FormState } from "../../models/forms/common"


function FormModal({
    isModalVisible,
    setModalVisible,
    onClose,
    children,
    title,
    btnLabel,
    btnHoverText,
    btnOnClick,
    formState,
    submitDisabled = false,
    showFooterBtn = true,
}: {
    isModalVisible: boolean
    setModalVisible: (visible: boolean) => void
    onClose?: () => void
    children: React.ReactNode
    title: string
    btnLabel: string
    btnHoverText: string
    btnOnClick: () => void
    formState: FormState
    submitDisabled?: boolean
    showFooterBtn?: boolean
}) {
    return (
        <Modal
            open={isModalVisible}
            onClose={() => { setModalVisible(false); onClose && onClose() }}
            closeAfterTransition
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: COLORS.backdropColor,
                    },
                },
            }}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Fade in={isModalVisible}>
                <div className={styles.container}>
                    <ModalHeader
                        onClose={() => { setModalVisible(false); onClose && onClose() }}
                        title={title}
                    />
                    <div className={styles["body"]}>
                        {children}
                    </div>
                    <div className={styles["footer"]}>
                        {
                            showFooterBtn && (


                                <Button
                                    disable={
                                        submitDisabled || formState === FormState.LOADING ||
                                        formState === FormState.SUCCESS
                                    }
                                    label={btnLabel}
                                    onClick={btnOnClick}
                                    hoverText={btnHoverText}
                                    isLoading={formState === FormState.LOADING}
                                />

                            ) 
                        }
                    </div>
                </div>
            </Fade>
        </Modal>
    );
}

export default FormModal