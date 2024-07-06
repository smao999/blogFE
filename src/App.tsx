import {Suspense, useEffect} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { StyleProvider } from '@ant-design/cssinjs';
import routes from "@/router";
import store from "@/store";
import {changeTheme} from "@/utils/changeTheme";
import SuspenseLoading from "@/components/SuspenseLoading";

function App() {
    const Route = createBrowserRouter(routes);
    const themeType = store(state => state.themeType);

    useEffect(() => {
        changeTheme(themeType);
    }, [themeType]);

  return (
    <Suspense fallback={<SuspenseLoading/>}>
        <StyleProvider hashPriority="high">
            <RouterProvider router={Route}/>
        </StyleProvider>
    </Suspense>
  )
}

export default App
