import { Link } from "react-router-dom";
import Blockies from 'react-blockies';
import { getEllipsisTxt } from "../../helpers/format";
import { Popover } from "@headlessui/react";
import { useAuth } from "../../contexts/auth-context";

export default function ConnectButton() {
  const { logout, user } = useAuth();

  if (user) {
    return (
      <div className="justify-end w-full gap-2 flex">
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            {getEllipsisTxt(user.address)}
          </div>

          <Popover className="relative">
            <Popover.Button>
              <Blockies
                seed="Jeremy"
                size={12}
                scale={3}
                className="identicon"
              />
            </Popover.Button>

            <Popover.Panel className="absolute w-72 right-0">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative bg-white p-7 lg:grid-cols-2">
                  <div className="flex items-center gap-2 text-blue-500">
                    Username: {getEllipsisTxt(user?.username)}
                  </div>

                  <Link to="/"> Profile </Link>
                  <div role="button" onClick={logout} > Logout </div>
                </div>
              </div>
            </Popover.Panel>
          </Popover>
        </div>
      </div>
    )
  }

  return (
    <div className="justify-end w-full gap-2 flex">
      <Link to="/connect-select" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:bg-blue-600 transition duration-300 ease-in-out">
        Connect Wallet
      </Link>
    </div>
  )
}
