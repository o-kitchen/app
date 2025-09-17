"use client";

import { Suspense } from "react";
import { LandingSection } from "@/components/home/landing-section";
import { DetailSection } from "@/components/home/detail-section";
import { Loading } from "@/components/loading";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <LandingSection />
        <Suspense fallback={<Loading />}>
          <DetailSection />
        </Suspense>
      </main>
    </div>
  );
}
