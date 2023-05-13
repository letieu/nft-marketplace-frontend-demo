import axios from "axios";

export type CreateSalePayload = {
  tokenAddress: string;
  tokenId: string;
  price: number;
  sellerAddress: string;
  signature: string;
};

export function saveSale(paload: CreateSalePayload) {
  return axios.post('/sales', paload)
}

export function getSales() {
  return axios.get('/sales')
}
