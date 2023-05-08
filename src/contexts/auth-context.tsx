import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState } from 'react'
import { configAxios } from '../services/axios'
import { User, getNonce, getToken, me } from '../services/auth'

export type Auth = {
  user: User | null
  logout: () => void
  login: () => Promise<void>
}

export const AuthContext = React.createContext<Auth>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => { },
  login: () => Promise.resolve(),
})

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null)
  const { connector, provider } = useWeb3React()

  function logout() {
    if (connector?.deactivate) {
      void connector.deactivate()
    } else {
      void connector.resetState()
    }

    localStorage.removeItem('token')
  }

  async function login() {

    try {
      const signer = provider?.getSigner()
      const userAddresses = await signer?.getAddress()
      const { data } = await getNonce(userAddresses as string)
      const sign = await signer?.signMessage(data)
      const { data: authData } = await getToken(userAddresses as string, sign as string)

      localStorage.setItem('token', authData.access_token)
      configAxios()
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

  async function reconnect() {
    await connector.connectEagerly?.()
    await fetchMe()
  }

  useEffect(() => {
    configAxios()
    reconnect()
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      logout,
      login,
    }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  return React.useContext(AuthContext)
}