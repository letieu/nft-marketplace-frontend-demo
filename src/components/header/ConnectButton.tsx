import { useWeb3React } from "@web3-react/core";
import { Link } from "react-router-dom";
import Blockies from 'react-blockies';
import { getEllipsisTxt } from "../../helpers/format";
import { Menu, Popover } from "@headlessui/react";

export default function ConnectButton() {
  const { account, connector } = useWeb3React();

  function logout() {
    if (connector?.deactivate) {
      void connector.deactivate()
    } else {
      void connector.resetState()
    }
  }

  if (account) {
    return (
      <div className="justify-end w-full gap-2 flex">
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            {getEllipsisTxt(account)}
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
