import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"
import { useAuth } from "../contexts/auth-context"
import { Collection, getOwnedCollections } from "../services/collection"
import { uploadNftToIPFS } from "../helpers/ipfs"
import { getMintedIds, getTransferLogs, mintNft } from "../contracts/collection"
import { saveNft } from "../services/nft"

export default function CreateNft() {
  const { provider, account } = useWeb3React()
  const { user } = useAuth()

  const [nft, setNft] = useState({ name: "", description: "", tokenAddress: "" })
  const [image, setImage] = useState()
  const [previewUrl, setPreviewUrl] = useState<string>()
  const [loading, setLoading] = useState(false)
  const { collections } = useCollections()

  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    setNft((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleImageChange = (event: any) => {
    const file = event.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (!provider || !user) {
      alert("Please connect to MetaMask")
      return
    }

    if (!image || !nft.name || !nft.description || !nft.tokenAddress) {
      alert("Please fill in all fields")
      return
    }

    setLoading(true)
    try {
      const uri = await uploadNftToIPFS(nft.name, nft.description, image)

      const tx = await mintNft(provider.getSigner(), nft.tokenAddress, uri, account as string)
      console.log("mint tx", tx.hash)

      const ids = await getMintedIds(tx.hash)
      console.log("ids", ids)

      await saveNft(nft.tokenAddress, ids[0])
      alert("NFT created successfully")
    } catch (err) {
      console.log(err)
      alert("Failed to create NFT")
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
            value={nft.name}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description:
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="description"
            value={nft.description}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
          Image:
          <input
            id="image"
            className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
        {previewUrl && (
          <img
            src={previewUrl}
            alt="NFT Preview"
            className="w-64 h-auto object-contain p-4 border rounded" // Modified to w-64 to make the image smaller
          />
        )}
        <br />

        {collections.length > 0 && (
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Collection:
            <select
              name="tokenAddress"
              className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              defaultValue=""
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Collection
              </option>
              {collections.map((collection) => {
                return (
                  <option key={collection._id} value={collection.tokenAddress}>
                    {collection.name}
                  </option>
                )
              })}
            </select>
          </label>
        )}
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

const useCollections = () => {
  const { account } = useWeb3React()
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!account) return
    const fetchCollections = async () => {
      try {
        const { data } = await getOwnedCollections(account)
        setCollections(data)
        setLoading(false)
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    }
    fetchCollections()
  }, [account])

  return {
    collections,
    loading
  }
}
