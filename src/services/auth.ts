import axios from "axios"

export type User = {
  username: string
  address: string
  _id: string
}

export async function me() {
  return axios.post("/auth/me")
}

export async function getNonce(address: string) {
  return axios.post("/auth/nonce", { address })
}

export async function getToken(address: string, sign: string) {
  return axios.post("/auth/wallet_login", { address, sign })
}
