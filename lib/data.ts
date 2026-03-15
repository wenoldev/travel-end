
export interface Destination {
  id: string;
  name: string;
  image: string;
  category: string;
  description: string;
  tags?: string[];
  content?: {
    overview?: string;
    highlights?: string[];
    bestTimeToVisit?: string;
  };
}

export interface Package {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  image: string;
  duration: string;
  accommodation: string;
  tag?: string;
  type: 'normal' | 'couples';
  spots?: string[];
  itinerary?: {
    day: number;
    title: string;
    details: string;
  }[];
}

import siteConfig from "@/data/siteConfig.json";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://eylza-services.vercel.app";

export const cmsIds = siteConfig.cmsIds;

async function fetchCMSContent(cmsId: string) {
  const url = `${API_BASE_URL}/api/v1/public/cms/${cmsId}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour but allow revalidation
    });

    if (!res.ok) {
      console.error(`Failed to fetch CMS content for ${cmsId} (${url}): ${res.status} ${res.statusText}`);
      return [];
    }

    const json = await res.json();
    return json.data || [];
  } catch (error: any) {
    console.error(`Error fetching CMS content for ${cmsId} (${url}):`, error.message);
    // Return empty array to prevent page crash
    return [];
  }
}

export async function getDestinations(cmsId?: string): Promise<Destination[]> {
  return fetchCMSContent(cmsId || cmsIds.special);
}

export async function getPackages(cmsId?: string): Promise<Package[]> {
  return fetchCMSContent(cmsId || cmsIds.packages);
}

