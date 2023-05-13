import { ethers, getAddress, parseEther } from "ethers";
import abi from "./abi/contracts/marketplace/Marketplace.sol/Marketplace.json";
import { Signer } from "ethers/providers";

export type ListParams = {
    tokenAddress: string;
    tokenId: number;
    price: number;
    seller: string;
};

export type Listing = {
    tokenAddress: string;
    tokenId: number;
    price: number;
    seller: string;
    signature: string;
};

export const marketAddress = import.meta.env.VITE_MARKET_ADDRESS as string;
const chainId = +(import.meta.env.VITE_CHAIN_ID as string);

export function createListSignature(
    signer: Signer,
    params: ListParams,
): Promise<string> {
    const formatedParams = {
        tokenAddress: params.tokenAddress,
        tokenId: params.tokenId,
        price: parseEther(params.price.toString()),
        seller: params.seller,
    };
    const domain = {
        name: "Marketplace",
        version: "1.0.0",
        chainId: chainId,
        verifyingContract: getAddress(marketAddress),
    };
    const types = {
        ListParams: [
            { name: "tokenAddress", type: "address" },
            { name: "tokenId", type: "uint256" },
            { name: "price", type: "uint256" },
            { name: "seller", type: "address" },
        ],
    };

    return signer.signTypedData(domain, types, formatedParams);
}

export function buyNFT(signer: Signer, listing: Listing) {
    const marketplace = new ethers.Contract(marketAddress, abi, signer);
    return marketplace.buyNFT(
        {
            tokenAddress: listing.tokenAddress,
            tokenId: listing.tokenId,
            price: ethers.parseEther(listing.price.toString()),
            seller: listing.seller,
        },
        listing.signature,
        { value: ethers.parseEther(listing.price.toString()) },
    );
}

// ====================== views ======================
export function getMarketPercent(provider: ethers.Provider) {
    const marketplace = new ethers.Contract(marketAddress, abi, provider);
    return marketplace.marketPercent();
}
