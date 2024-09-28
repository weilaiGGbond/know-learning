import { createBrowserRouter } from "react-router-dom";
import Login from "@renderer/pages/login";
import Home from "@renderer/pages/home/index";
import UserHome from "@renderer/pages/user/userHome";
import Test from "@renderer/pages/test/index";
import MemorandumIndex from '@renderer/pages/memorandum/index'

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
        path: '/test',
        element: <Test />
    },
    {
        path: '/memorandum',
        element: <MemorandumIndex />
    },
    {
        path: '*',
        element: <Login />
    },
])
export default router


