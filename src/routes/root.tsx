import { Outlet, createBrowserRouter } from "react-router-dom";
import Header from "../components/header";
import ConnectSelect from "./ConnectSelect";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/connect-select",
        element: <ConnectSelect />,
      },
    ]
  },
]);

export function Root() {
  return (
    <>
      <Header />
      <main>
        <div className="py-10 relative md:py-10 gap-x-6 mx-auto max-w-screen px-4">
          <Outlet />
        </div>
      </main>
    </>
  )
}
