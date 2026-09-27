import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PlaceRundown } from "@/components/places/place-rundown";
import { syntheticPlace } from "@/lib/places/fixture";

type PlacePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: syntheticPlace.slug }];
}

export async function generateMetadata({ params }: PlacePageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== syntheticPlace.slug) return {};

  return {
    title: `${syntheticPlace.name} | The Rundown | PullUp`,
    description: `Synthetic review fixture with Total Damage, tenure, accessibility facts, provider identity, and sources for ${syntheticPlace.name}.`,
  };
}

export default async function PlacePage({ params }: PlacePageProps) {
  const { slug } = await params;
  if (slug !== syntheticPlace.slug) notFound();

  return <PlaceRundown place={syntheticPlace} />;
}
