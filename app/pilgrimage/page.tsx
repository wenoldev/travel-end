import { getDestinations, cmsIds } from "@/lib/data";
import PilgrimageList from "@/components/PilgrimageList";

export default async function PilgrimagePage() {
    const pilgrimagePlaces = await getDestinations(cmsIds.pilgrim);
    
    return (
        <PilgrimageList pilgrimagePlaces={pilgrimagePlaces} />
    );
}
