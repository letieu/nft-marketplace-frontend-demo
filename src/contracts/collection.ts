import { Signer, ethers } from "ethers"
import abi from "./abi/contracts/collection/Collection.sol/Collection.json"
import { bytecode } from "./bytecode/collection.json"

export type DeployCollectionParams = {
  name: string;
  symbol: string;
}

export async function deployCollection(
  signer: Signer,
  params: DeployCollectionParams,
) {
  const Collection = new ethers.ContractFactory(
    abi,
    bytecode,
    signer,
  )

  const contract = await Collection.deploy(
    params.name,
    params.symbol,
  )

  return contract
}

export async function mintNft(
  signer: Signer,
  tokenAddress: string,
  tokenURI: string,
  toAddress: string,
) {
  const collection = new ethers.Contract(
    tokenAddress,
    abi,
    signer,
  )

  return collection.mint(
    toAddress,
    tokenURI,
  )
}

export async function getTransferLogs(txHash: string) {
  const provider = new ethers.JsonRpcProvider(
    import.meta.env.VITE_CHAIN_PROVIDER,
  )
  // wait for tx to be mined
  await provider.waitForTransaction(txHash)
  const txReceipt = await provider.getTransactionReceipt(txHash)
  const iface = new ethers.Interface(abi)

  const transferLogs = txReceipt ? txReceipt.logs
    .map((log) => {
      try {
        return iface.parseLog({
          topics: log.topics as string[],
          data: log.data,
        })
      } catch (e) {
        return null
      }
    })
    .filter(Boolean)
    .filter((log) => log?.name === "Transfer") : []

  return transferLogs
}

export async function getMintedIds(txHash: string) {
  const transferLogs = await getTransferLogs(txHash)
  const ids = transferLogs.map((log) => log?.args?.tokenId).map((id) => id?.toString())
  return ids as string[]
}
