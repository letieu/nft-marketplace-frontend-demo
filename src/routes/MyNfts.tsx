import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Nft, getOwnedNfts } from '../services/nft';
import { useWeb3React } from '@web3-react/core';
import { getEllipsisTxt } from '../helpers/format';

export default function MyNfts() {
  const { account } = useWeb3React();
  const [nfts, setNfts] = useState<Nft[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // add loading state

  useEffect(() => {
    async function fetchNfts() {
      if (!account) return;
      try {
        const { data } = await getOwnedNfts(account);
        setNfts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // set loading state to false
      }
    }
    fetchNfts();
  }, [account]);

  async function handleSellClick(nft: Nft) {
    // code to execute when sell button is clicked
  }

  return (
    <>
      <div className="mb-8 flex justify-start h-10 items-center">
        <Link to="/create-nft" className="bg-blue-500 text-white font-bold rounded-md py-2 px-4">
          Create NFT
        </Link>
      </div>
      {loading ? ( // check for loading state
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-5 gap-4">
          {nfts.map(nft => (
            <div key={nft.tokenId} className="shadow rounded-md bg-white flex flex-col items-center">
              <div
                className="w-full h-0 border-t-4 border-primary transform transition duration-500 hover:scale-110"
                style={{ paddingBottom: "80%", position: "relative" }}
              >
                <img src={nft.metadata.image} alt={nft.metadata.name}
                  style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="p-2 flex-1 w-full">
                <h2 className="text-sm font-medium text-gray-800 mb-1 overflow-ellipsis overflow-hidden">{nft.metadata.name}</h2>
                <p className="text-xs text-gray-500 mb-2">
                  Token ID: {nft.tokenId} <br />
                  Token Address: {getEllipsisTxt(nft.tokenAddress)} <br />
                </p>
                <span
                  onClick={() => handleSellClick(nft)}
                  className="text-blue-500 hover:text-blue-700 underline cursor-pointer"
                >
                  Sell
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/*  
  Added a 'Create NFT' button to the top left corner of the grid using flex container.
  Aligned text in a single line.
*/
