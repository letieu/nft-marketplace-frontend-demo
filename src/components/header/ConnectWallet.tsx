import { useWeb3React } from "@web3-react/core";
import { Link } from "react-router-dom";
import Blockies from 'react-blockies';
import { getEllipsisTxt } from "../../helpers/format";

export default function ConnectWallet() {
  const { account } = useWeb3React();

  if (account) {
    return (
      <div className="justify-end w-full gap-2 flex">
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            {getEllipsisTxt(account)}
          </div>

          <div className="">
            <Blockies
              seed="Jeremy"
              size={12}
              scale={3}
              className="identicon"
            />
          </div>
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
