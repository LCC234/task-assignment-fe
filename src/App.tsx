import { styled } from "@mui/material/styles";
import { MaterialDesignContent, SnackbarProvider } from "notistack";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Overlay from "./components/Overlay";
import TaskManagePage from "./pages/TaskManagePage";
import { COLORS } from "./styles/stylings";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Overlay />,
        children: [
            {
                element: <TaskManagePage />,
                index: true,
            }
        ],
    },
]);

const notistackStyles = styled(MaterialDesignContent)(() => ({
    "&.notistack-MuiContent-success": {
        backgroundColor: COLORS.green,
    },
    "&.notistack-MuiContent-error": {
        backgroundColor: COLORS.red,
    },
    "&.notistack-MuiContent-warning": {
        backgroundColor: COLORS.orange,
    },
    "&.notistack-MuiContent-info": {
        backgroundColor: COLORS.blue,
    },
}));  

function App() {


    return (
        <SnackbarProvider
            maxSnack={3}
            autoHideDuration={5000}
            Components={{
                success: notistackStyles,
                error: notistackStyles,
                warning: notistackStyles,
                info: notistackStyles,
            }}
        >
            <RouterProvider router={router} />
        </SnackbarProvider>
    );
}


export default App
