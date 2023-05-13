import { useState } from "react";
import { getEllipsisTxt } from "../../helpers/format";
import { Nft } from "../../services/nft";
import { ensureApproved } from "../../contracts/erc721";
import { useEthereum } from "../../contexts/ethereum-context";
import { createListSignature } from "../../contracts/market";
import { saveSale } from "../../services/sale";

const marketAddress = import.meta.env.VITE_MARKET_ADDRESS as string

export default function MyNft({ nft }: { nft: Nft }) {
  const [price, setPrice] = useState<number>(0)
  const { provider, account } = useEthereum()

  async function handleSellClick(nft: Nft) {
    if (!provider) return
    if (!account) return

    try {
      const signer = await provider.getSigner()

      // approve market contract to transfer nft later
      await ensureApproved(signer, nft.tokenAddress, marketAddress)

      // create signature for list and save sale to db
      const signature = await createListSignature(signer, {
        tokenAddress: nft.tokenAddress,
        tokenId: +nft.tokenId,
        price: price,
        seller: nft.ownerAddress,
      })
      await saveSale({
        tokenAddress: nft.tokenAddress,
        tokenId: nft.tokenId,
        price: price,
        sellerAddress: account,
        signature,
      })

      alert("Sale created")
    } catch (error) {
      console.log(error)
      return
    }
  }

  return (
    <div key={nft.tokenId} className="shadow rounded-md bg-white flex flex-col items-center">
      <div
        className="w-full h-0 border-t-4 border-primary transform transition duration-500 hover:scale-110"
        style={{ paddingBottom: "80%", position: "relative" }}
      >
        <img src={nft.metadata.image} alt={nft.metadata.name}
          style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="p-2 flex-1 w-full">
        <h2 className="text-sm font-medium text-gray-800 mb-1 overflow-ellipsis overflow-hidden">{nft.metadata.name}</h2>
        <p className="text-xs text-gray-500 mb-2">
          Token ID: {nft.tokenId} <br />
          Token Address: {getEllipsisTxt(nft.tokenAddress)} <br />
        </p>
        <div className="flex justify-between">
          <input type="number" className="border border-gray-300 rounded-md w-1/2 p-1 text-sm text-gray-800" placeholder="Price" />
          <button className="rounded-md py-1 text-sm text-blue-300 hover:text-gray-800" onClick={() => handleSellClick(nft)}>Sell</button>
        </div>
      </div>
    </div>
  )
}
