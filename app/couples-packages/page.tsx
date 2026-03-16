import React, { Suspense } from 'react';
import { getPackages, cmsIds } from '@/lib/data';
import PackagesList from '@/components/PackagesList';

export default async function CouplesPackagesPage() {
  const packages = await getPackages(cmsIds.couplesPackages);
  console.log({packages});
  
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Romantic Packages...</div>}>
      <PackagesList packages={packages} type="couples" />
    </Suspense>
  );
}
