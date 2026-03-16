import { getDestinations, cmsIds } from "@/lib/data";
import { notFound } from "next/navigation";
import DestinationView from "@/components/DestinationView";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function PilgrimageDetailPage({ params }: PageProps) {
    const { slug } = await params;
    
    const pilgrims = await getDestinations(cmsIds.pilgrim);
    
    const destination = pilgrims.find(
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
