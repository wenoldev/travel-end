import { getPackages } from "@/lib/data";
import siteConfig from "@/data/siteConfig.json";
import PackagesList from "@/components/PackagesList";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Runner Packages | TravelEnd',
  description: 'Explore recent festivals and local trip packages with TravelEnd.',
};

export default async function RunnerPackagesPage() {
  const runnerCmsId = (siteConfig.cmsIds as any).runnerPackages;
  const packages = runnerCmsId ? await getPackages(runnerCmsId) : [];
  
  // Ensure they are typed as runner
  const typedPackages = packages.map(p => ({ ...p, type: 'runner' as const }));

  return (
    <div className="pt-20">
      <PackagesList packages={typedPackages} type="runner" />
    </div>
  );
}
