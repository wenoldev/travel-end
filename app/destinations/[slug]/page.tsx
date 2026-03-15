import { getDestinations, cmsIds } from "@/lib/data";
import { notFound } from "next/navigation";
import DestinationView from "@/components/DestinationView";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function DestinationPage({ params }: PageProps) {
    const { slug } = await params;
    
    // Fetch from all domestic categories to find the correct destination
    const [tamilnadu, kerala, karnataka, other] = await Promise.all([
        getDestinations(cmsIds.tamilnadu),
        getDestinations(cmsIds.kerala),
        getDestinations(cmsIds.karnataka),
        getDestinations(cmsIds.otherPlaces),
    ]);

    const allDestinations = [...tamilnadu, ...kerala, ...karnataka, ...other];
    
    const destination = allDestinations.find(
        (d) => d.name.toLowerCase().replace(/\s+/g, '-') === slug || d.id === slug
    );

    if (!destination) {
        return notFound();
    }

    return (
        <DestinationView 
            destination={destination} 
            breadcrumbParent="Domestic Tours"
            breadcrumbParentHref="/destinations"
        />
    );
}

