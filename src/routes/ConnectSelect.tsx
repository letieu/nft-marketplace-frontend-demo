import { useAuth } from "../contexts/auth-context";
import { useEthereum } from "../contexts/ethereum-context";

export default function ConnectSelect() {
  const { account, chainId } = useEthereum();
  const { login, user } = useAuth();

  async function connectByMetamask() {
    await login();
  }

  async function connectByWalletConnect() {
    // TODO: implement
  }

  if (user) {
    return (
      <div className="flex justify-center">
        <div className="flex flex-col justify-center items-center">
          <p className="text-2xl font-bold">Connected</p>
          <table className="table-auto">
            <tbody>
              <tr>
                <td className="px-4 py-2">Wallet</td>
                <td className="px-4 py-2">{account}</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Chain</td>
                <td className="px-4 py-2">{chainId}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <ul className="flex justify-center px-2 py-2 text-white bg-gradient-to-r from-indigo-500 to-blue-500 rounded-md shadow-md">

        <li className="px-4 py-2 mr-2 rounded-md hover:bg-indigo-500 focus:bg-indigo-500 cursor-pointer transition duration-300 ease-in-out text-center">
          <button className="block" onClick={connectByMetamask}>Metamask</button>
        </li>

        <li className="px-4 py-2 rounded-md hover:bg-indigo-500 focus:bg-indigo-500 cursor-pointer transition duration-300 ease-in-out text-center">
          <button className="block" onClick={connectByWalletConnect}>WalletConnect</button>
        </li>

      </ul>
    </div>
  );
}
