import Blockies from 'react-blockies';
import { getEllipsisTxt } from '../helpers/format';
import { Link } from 'react-router-dom';
import { Collection, getOwnedCollections } from '../services/collection';
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

export function MyCollections() {
  const { account } = useWeb3React();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!account) return;
    const fetchCollections = async () => {
      try {
        const { data } = await getOwnedCollections(account);
        setCollections(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchCollections();
  }, [account]);

  return (
    <div className="">
      <div className="mb-8">
        <Link to="/create-collection" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md mb-4">
          Create collection
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-4">
          {collections.map((collection) => (
            <div className="bg-gray-100 rounded-md border-gray-300 border p-2 flex flex-col items-center" key={collection.tokenAddress}>
              <Blockies
                seed={collection.tokenAddress}
                size={40}
                scale={5}
                className="identicon"
              />
              <h2 className="font-medium text-lg mt-2">{collection.name}</h2>
              <p className="text-gray-500 text-md mt-2">{getEllipsisTxt(collection.tokenAddress)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
