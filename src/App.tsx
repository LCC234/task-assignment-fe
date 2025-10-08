import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Overlay from "./components/Overlay";
import TaskManagePage from "./pages/TaskManagePage";

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

function App() {
  

  return (
    <RouterProvider router={router} />
  );
}


export default App
