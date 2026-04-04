import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocalLandingPageView from "@/src/components/seo/LocalLandingPageView";
import {
  getLocalLandingPage,
  getLocalLandingPagesForArea,
} from "@/src/lib/seo/local-landing-pages";

const area = "bow";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getLocalLandingPagesForArea(area).map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLocalLandingPage(area, slug);

  if (!page) {
    return {};
  }

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: page.path,
    },
    keywords: [
      page.primaryKeyword,
      ...page.secondaryKeywords,
      `${page.serviceLabel} ${page.locationName}`,
      `${page.serviceLabel} London`,
      "J Luxe Medical Aesthetics",
    ],
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: page.path,
      siteName: "J Luxe Medical Aesthetics",
      images: [
        {
          url: page.image,
          width: 1200,
          height: 630,
          alt: page.imageAlt,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: [page.image],
    },
  };
}

export default async function LocalAreaPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getLocalLandingPage(area, slug);

  if (!page) {
    notFound();
  }

  return <LocalLandingPageView page={page} />;
}
