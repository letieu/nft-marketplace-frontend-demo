import { getEllipsisTxt } from "../../helpers/format";
import { useEthereum } from "../../contexts/ethereum-context";
import { Sale } from "../../services/sale";

const marketAddress = import.meta.env.VITE_MARKET_ADDRESS as string

export default function SaleCard({ sale }: { sale: Sale }) {
  const { provider, account } = useEthereum()

  async function handleBuyClick() {
    if (!provider) return
    if (!account) return

    try {
      // TODO: 
    } catch (error) {
      console.log(error)
      return
    }
  }

  return (
    <div key={sale.nft.tokenId} className="shadow rounded-md bg-white flex flex-col items-center">
      <div
        className="w-full h-0 border-t-4 border-primary transform transition duration-500 hover:scale-110"
        style={{ paddingBottom: "80%", position: "relative" }}
      >
        <img src={sale.nft.metadata.image} alt={sale.nft.metadata.name}
          style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="p-2 flex-1 w-full">
        <h2 className="text-sm font-medium text-gray-800 mb-1 overflow-ellipsis overflow-hidden">{sale.nft.metadata.name}</h2>
        <p className="text-xs text-gray-500 mb-2">
          Token ID: {sale.nft.tokenId} <br />
          Token Address: {getEllipsisTxt(sale.nft.tokenAddress)} <br />
        </p>
        <div className="flex justify-between">
          <p className="text-sm font-medium text-gray-800 mb-1">Price: {sale.price} MATIC</p>
          <button className="rounded-md py-1 text-sm text-blue-300 hover:text-gray-800" onClick={() => handleBuyClick()}>buy</button>
        </div>
      </div>
    </div>
  )
}
