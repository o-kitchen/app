import { Suspense } from "react";
import { LandingSection } from "@/components/home/landing-section";
import { DetailSection } from "@/components/home/detail-section";
import { Loading } from "@/components/loading";

// This can be a Server Component for better performance
export default function HomePage() {
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