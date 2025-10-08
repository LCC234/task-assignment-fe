import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Overlay from "./components/Overlay";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Overlay />,
        children: [
        ],
    },
]);

function App() {
  

  return (
    <RouterProvider router={router} />
  );
}


export default App
