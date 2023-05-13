import React, { useEffect, useState } from 'react'
import { configAxios } from '../services/axios'
import { User, getNonce, getToken, me } from '../services/auth'
import { useEthereum } from './ethereum-context'

export type Auth = {
  user: User | null
  logout: () => void
  login: () => Promise<void>
}

export const AuthContext = React.createContext<Auth>({
  user: null,
  logout: () => Promise.resolve(),
  login: () => Promise.resolve(),
})

export function useAuth() {
  return React.useContext(AuthContext)
}

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null)
  const { disconnect, connect, chainId, account } = useEthereum()

  async function logout() {
    await disconnect()
    localStorage.removeItem('token')
    setUser(null)
  }

  async function login() {
    try {
      const newProvider = await connect()
      const signer = await newProvider?.getSigner()
      const userAddresses = await signer?.getAddress()
      const { data } = await getNonce(userAddresses as string)
      const sign = await signer?.signMessage(data)
      const { data: authData } = await getToken(userAddresses as string, sign as string)

      localStorage.setItem('token', authData.access_token)
      configAxios()

      await fetchMe()
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchMe() {
    try {
      const { data } = await me()
      setUser(data)
    } catch (error) {
      logout()
    }
  }

  function isValidChainId() {
    if (!chainId) return false
    return +chainId === +import.meta.env.VITE_CHAIN_ID as number
  }

  async function reconnect() {
    try {
      const provider = await connect()
      if (provider) {
        fetchMe()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    configAxios()
    reconnect()
  }, [])

  useEffect(() => {
    if (user && chainId && !isValidChainId()) {
      alert(`Please change your network to ${import.meta.env.VITE_CHAIN_ID}`)
      logout()
    }
  }, [chainId, user])

  useEffect(() => {
    if (account && user) { // if connected
      if (account !== user.address) { // but not the same address
        logout()
      }
    }
  }, [account, user])

  return (
    <AuthContext.Provider value={{
      user,
      logout,
      login,
    }}>{children}</AuthContext.Provider>
  )
}
