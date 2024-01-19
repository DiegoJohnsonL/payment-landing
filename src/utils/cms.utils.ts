export function getCMSImageUrl(imageUrl: string) {
  // running strapi locally, we need to add the absolute url
  if (imageUrl.startsWith("/")) {
    return `${process.env.NEXT_PUBLIC_CMS_BACKEND_BASE_URL}${imageUrl}`;
  }
  return imageUrl;
}