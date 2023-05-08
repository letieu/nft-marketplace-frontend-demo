import { Outlet, createBrowserRouter } from "react-router-dom";
import Header from "../components/header";
import ConnectSelect from "./ConnectSelect";
import { MyCollections } from "./MyCollections";
import CreateCollection from "./CreateCollection";
import MyNfts from "./MyNfts";
import CreateNft from "./CreateNft";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/connect-select",
        element: <ConnectSelect />,
      },
      {
        path: "/my-collections",
        element: <MyCollections />,
      },
      {
        path: "/create-collection",
        element: <CreateCollection />,
      },
      {
        path: "my-nfts",
        element: <MyNfts />,
      },
      {
        path: "create-nft",
        element: <CreateNft />,
      }
    ]
  },
])

export function Root() {
  return (
    <>
      <Header />
      <main>
        <div className="py-10 relative mx-auto max-w-screen-xl px-4">
          <Outlet />
        </div>
      </main>
    </>
  )
}
