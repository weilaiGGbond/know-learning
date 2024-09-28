import { createBrowserRouter } from "react-router-dom";
import Login from "@renderer/pages/login";
import Home from "@renderer/pages/home/index";
import UserHome from "@renderer/pages/user/userHome";
const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/userhome',
        element: <UserHome />
    },
    {
        path: '*',
        element: <Login />
    },
])
export default router


