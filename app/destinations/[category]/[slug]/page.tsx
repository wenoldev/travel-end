import { getDestinations, cmsIds, slugify } from "@/lib/data";
import { notFound } from "next/navigation";
import DestinationView from "@/components/DestinationView";

interface PageProps {
    params: Promise<{ category: string; slug: string }>;
}

export default async function DestinationPage({ params }: PageProps) {
    const { category, slug } = await params;
    
    // Validate category and get corresponding CMS ID
    const cmsId = cmsIds[category as keyof typeof cmsIds];
    
    if (!cmsId) {
        return notFound();
    }

    // Fetch only the relevant category
    const destinations = await getDestinations(cmsId);
    
    const destination = destinations.find(
        (d) => slugify(d.name) === slug || d.id === slug
    );

    if (!destination) {
        return notFound();
    }

    // Determine breadcrumb label based on category
    const categoryLabels: Record<string, string> = {
        tamilnadu: "Tamil Nadu",
        kerala: "Kerala",
        karnataka: "Karnataka",
        pilgrim: "Pilgrimage"
    };

    return (
        <DestinationView 
            destination={destination} 
            breadcrumbParent={categoryLabels[category] || "Domestic Tours"}
            breadcrumbParentHref={category === 'pilgrim' ? '/pilgrimage' : '/destinations'}
        />
    );
}
