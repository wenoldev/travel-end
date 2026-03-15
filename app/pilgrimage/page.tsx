
import { getDestinations } from "@/lib/data";
import PilgrimageList from "@/components/PilgrimageList";

export default async function PilgrimagePage() {
    const destinations = await getDestinations();
    // Filter for pilgrimage category
    const pilgrimagePlaces = destinations.filter(
        (dest) => dest.category === "Pilgrimage"
    );

    return <PilgrimageList pilgrimagePlaces={pilgrimagePlaces} />;
}
