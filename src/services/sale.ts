import axios from "axios";
import { Nft } from "./nft";

export type CreateSalePayload = {
  tokenAddress: string;
  tokenId: string;
  price: number;
  sellerAddress: string;
  signature: string;
}

export type Sale = {
  _id: string;
  nft: Nft;
  price: number;
  sellerAddress: string;
  listTime: string;
  signature: string;
}

export function saveSale(paload: CreateSalePayload) {
  return axios.post('/sales', paload)
}

export function getSales() {
  return axios.get('/sales')
}
