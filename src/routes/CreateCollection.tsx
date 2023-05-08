import { useWeb3React } from "@web3-react/core"
import { useState } from "react"
import { deployCollection } from "../contracts/collection"
import { createCollection } from "../services/collection"
import { useAuth } from "../contexts/auth-context"

export default function CreateCollection() {
  const { provider } = useWeb3React()
  const { user } = useAuth()
  const [collection, setCollection] = useState({ name: "", description: "", symbol: "" })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    setCollection((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (!provider || !user) {
      alert("Please connect to MetaMask")
      return
    }

    setLoading(true)
    try {
      const contract = await deployCollection(provider.getSigner(), {
        name: collection.name,
        symbol: collection.symbol,
      })

      const deployHash = contract.deploymentTransaction()?.hash;
      const collectionAddress = contract.target

      // wait for the transaction to be mined
      await provider.waitForTransaction(deployHash as string)

      // create the collection in the backend
      await createCollection(collectionAddress, collection.description)

      alert("Collection created")
    } catch (error) {
      console.log("error", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-10">
      <form onSubmit={handleSubmit}>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name:
          <input
            className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="name"
            value={collection.name}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Symbol:
          <input
            className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="symbol"
            value={collection.symbol}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description:
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="description"
            value={collection.description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  )
}


