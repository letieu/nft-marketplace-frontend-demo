import axios from "axios";

export type NftMetadata = {
  name: string;
  description: string;
  image: string;
  external_url?: string;
  attributes: any;
};

export type Nft = {
  _id: string;
  tokenId: string;
  tokenAddress: string;
  uri: string;
  ownerAddress: string;
  creatorAddress: string;
  metadata: NftMetadata;
}

export function saveNft(tokenAddress: string, tokenId: string) {
  return axios.post('/nfts', { tokenAddress, tokenId })
}

export function getOwnedNfts(ownerAddress: string) {
  return axios.get(`/nfts/owned/${ownerAddress}`)
}
