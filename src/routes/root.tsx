import { Outlet, createBrowserRouter } from "react-router-dom";
import Header from "../components/header";
import ConnectSelect from "./ConnectSelect";
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";

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
  const { connector } = useWeb3React()

  useEffect(() => {
    if (connector && connector.connectEagerly) {
      connector.connectEagerly()
    }
  }, [])

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
