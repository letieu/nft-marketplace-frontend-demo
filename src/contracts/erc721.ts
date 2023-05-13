import { Signer, ethers } from "ethers";
import abi from "./abi/@openzeppelin/contracts/token/ERC721/ERC721.sol/ERC721.json"

export async function ensureApproved(
  signer: Signer,
  nftAddress: string,
  targetAddress: string,
) {
  const collection = new ethers.Contract(nftAddress, abi, signer);
  const isApproved = await collection.isApprovedForAll(await signer.getAddress(), targetAddress);

  if (!isApproved) {
    const tx = await collection.setApprovalForAll(targetAddress, true);
    await tx.wait();
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
