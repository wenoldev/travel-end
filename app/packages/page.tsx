import React, { Suspense } from 'react';
import { getPackages, cmsIds } from '@/lib/data';
import PackagesList from '@/components/PackagesList';

export default async function PackagesPage() {
  const packages = await getPackages(cmsIds.packages);
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Packages...</div>}>
      <PackagesList packages={packages} type="normal" />
    </Suspense>
  );
}
