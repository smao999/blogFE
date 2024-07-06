import {lazy, ReactNode} from "react";
import {Navigate, RouteObject} from "react-router-dom";

import HomeLayout from "@/layout";

const Home = lazy(() => import('@/views/home'));
const Category = lazy(() => import('@/views/category'));
const About = lazy(() => import('@/views/about'))
const Files = lazy(() => import('@/views/file'))

const routes:Array<RouteObject & {label?: string, key?: string, icon?: ReactNode}> = [
    {
        path:'/',
        element: <Navigate to={'home'} replace />
    },
    {
        path:'/home',
        label: '首页',
        icon: '',
        element: <Home />
    },
    {
        path: '/file',
        label: '首页',
        icon: '',
        element: <Files />
    },
    {
        path:'/',
        element: <HomeLayout/>,
        children: [
            {
                path: '/category',
                element: <Category/>
            },
            {
                path: '/about',
                element: <About />
            }
        ]
    },
    {
        path: '*',
        element: <div>没有找到...</div>
    }
]

export default routes;
