import axios from "axios";

async function pinFileToIPFS(file: File) {
  const formData = new FormData();
  formData.append('file', file)

  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`
      }
    });
    return res.data.IpfsHash;
  } catch (error) {
    console.log(error);
  }
}

async function pinJSONToIPFS(json: any) {
  const data = JSON.stringify(json);

  const config = {
    method: 'post',
    url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_PINATA_JWT}`
    },
    data: data
  };

  const res = await axios(config);
  return res.data.IpfsHash;
}

export async function uploadNftToIPFS(name: string, description: string, image: File) {
  const imageHash = await pinFileToIPFS(image);
  const metadataHash = await pinJSONToIPFS({
    name,
    description,
    image: `https://ipfs.io/ipfs/${imageHash}`,
  });

  return `https://ipfs.io/ipfs/${metadataHash}`
}
