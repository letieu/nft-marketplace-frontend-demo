import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Nft, getOwnedNfts } from '../services/nft';
import { useEthereum } from '../contexts/ethereum-context';
import MyNftCard from '../components/nft-cards/MyNftCard';

export default function MyNfts() {
  const { account } = useEthereum();
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
          {nfts.map(nft =>
            <MyNftCard nft={nft} key={nft._id} />
          )}
        </div>
      )}
    </>
  );
}
