import { getDestinations, cmsIds } from "@/lib/data";
import { notFound } from "next/navigation";
import DestinationView from "@/components/DestinationView";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function PilgrimageDetailPage({ params }: PageProps) {
    const { slug } = await params;
    
    // Pilgrims are usually in the pilgrimage CMS, but let's check special too just in case
    const [pilgrims, special] = await Promise.all([
        getDestinations(cmsIds.pilgrim),
        getDestinations(cmsIds.special),
    ]);

    const allDestinations = [...pilgrims, ...special];
    
    const destination = allDestinations.find(
        (d) => d.name.toLowerCase().replace(/\s+/g, '-') === slug || d.id === slug
    );

    if (!destination) {
        return notFound();
    }

    return (
        <DestinationView 
            destination={destination} 
            theme="spiritual"
            breadcrumbParent="Pilgrimage Places"
            breadcrumbParentHref="/pilgrimage"
        />
    );
}

