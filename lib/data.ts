
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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://eylza-services.vercel.app";
const DESTINATIONS_CMS_ID = "ffdfa167-aa38-4dba-97d4-05516b74ada5";
const PACKAGES_CMS_ID = "8f7fddd6-e8f7-4bce-af3b-a718df788d1d";

async function fetchCMSContent(cmsId: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/public/cms/${cmsId}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache'
      }
    });

    if (!res.ok) {
      console.error(`Failed to fetch CMS content for ${cmsId}: ${res.status} ${res.statusText}`);
      return [];
    }

    const { data } = await res.json();
    return data || [];
  } catch (error) {
    console.error(`Error fetching CMS content for ${cmsId}:`, error);
    return [];
  }
}

export async function getDestinations(): Promise<Destination[]> {
  return fetchCMSContent(DESTINATIONS_CMS_ID);
}

export async function getPackages(): Promise<Package[]> {
  return fetchCMSContent(PACKAGES_CMS_ID);
}
