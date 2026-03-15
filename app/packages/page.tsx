
import React, { Suspense } from 'react';
import { getPackages } from '@/lib/data';
import PackagesList from '@/components/PackagesList';

export default async function PackagesPage() {
  const packages = await getPackages();
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Packages...</div>}>
      <PackagesList packages={packages} />
    </Suspense>
  );
}
