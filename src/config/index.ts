export const domainsConfig = {
  urlMeteor: process.env.NEXT_PUBLIC_METEOR_URL || "https://themeteor.io",
  urlNFT: process.env.NEXT_PUBLIC_NFT_URL || "https://nft.themeteor.io",
  urlPayment: process.env.NEXT_PUBLIC_PAYMENT_URL || "https://payment-landing.vercel.app",
  urlPaymentAPI: process.env.NEXT_PUBLIC_PAYMENT_API_URL || "http://meteor-payment-dev.us-east-1.elasticbeanstalk.com",
};

export const cmsConfig = {
  cmsApiUrl: process.env.NEXT_PUBLIC_CMS_BACKEND_BASE_URL || "https://cms.themeteor.io",
}

export const RQueryKeys = {
  products: 'products',
}