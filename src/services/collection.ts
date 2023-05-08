import axios from "axios";
import { Addressable } from "ethers";

export type Collection = {
  _id: string;
  tokenAddress: string;
  description: string;
  ownerAddress: string;
  name: string;
  symbol: string;
}

export function createCollection(tokenAddress: string | Addressable, description: string) {
  return axios.post('/nft-collections', {
    tokenAddress,
    description,
  })
}

export function getOwnedCollections(ownerAddress: string) {
  return axios.get(`/nft-collections/owned/${ownerAddress}`)
}
