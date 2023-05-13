import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useEthereum } from '../contexts/ethereum-context';
import { Sale, getSales } from '../services/sale';
import SaleCard from '../components/nft-cards/SaleCard';

export default function Market() {
  const { account } = useEthereum();
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchSales() {
      if (!account) return;
      try {
        const { data } = await getSales();
        setSales(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // set loading state to false
      }
    }
    fetchSales();
  }, [account]);

  return (
    <>
      <div className="mb-8 flex justify-start h-10 items-center">
        <Link to="/create-nft" className="bg-blue-500 text-white font-bold rounded-md py-2 px-4">
          Create NFT
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-5 gap-4">
          {sales.map(sale =>
            <SaleCard sale={sale} key={sale._id} />
          )}
        </div>
      )}
    </>
  )
}
