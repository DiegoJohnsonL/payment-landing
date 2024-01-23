export const domainsConfig = {
  urlMeteor: process.env.NEXT_PUBLIC_METEOR_URL || "https://themeteor.io",
  urlNFT: process.env.NEXT_PUBLIC_NFT_URL || "https://nft.themeteor.io",
};

export const cmsConfig = {
  cmsApiUrl: process.env.NEXT_PUBLIC_CMS_BACKEND_BASE_URL || "https://cms.themeteor.io",
}

export const RQueryKeys = {
  products: 'products',
}