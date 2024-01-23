import { cmsConfig } from "@/config";
import { getCMSImageUrl } from "@/utils/cms.utils";
import { useQuery } from "@tanstack/react-query";

interface Partner {
  slug: string;
  name: string;
  image: string;
  link?: string;
}

async function fetchPartners(): Promise<Partner[]> {
  const response = await fetch(
    `${cmsConfig.cmsApiUrl}/api/partners?populate=image`
  );
  const jsonResponse = await response.json();
  return jsonResponse.data.map((partner: any) => {
    return {
      slug: partner.attributes.slug,
      name: partner.attributes.name,
      image: getCMSImageUrl(partner.attributes.image.data.attributes.url),
      link: partner.attributes.link,
    } as Partner;
  });
}

export default function useGetPartners() {
    return useQuery({
      queryKey: ["partners"],
      queryFn: fetchPartners,
    });
}
