import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Canonical host redirect: apex -> www
      {
        source: "/:path*",
        has: [{ type: "host", value: "jluxemedicalaesthetics.com" }],
        destination: "https://www.jluxemedicalaesthetics.com/:path*",
        permanent: true,
      },

      // Keep old Yoast sitemap endpoint working
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", permanent: true },

      // Removed WooCommerce pages -> nearest commercial destination
      { source: "/checkout", destination: "/pricing", permanent: true },
      { source: "/checkout/:path*", destination: "/pricing", permanent: true },
      { source: "/my-account", destination: "/contact-us", permanent: true },
      { source: "/my-account/:path*", destination: "/contact-us", permanent: true },
      { source: "/cart", destination: "/pricing", permanent: true },
      { source: "/cart/:path*", destination: "/pricing", permanent: true },
      { source: "/products", destination: "/pricing", permanent: true },
      { source: "/products/:path*", destination: "/pricing", permanent: true },

      // Legacy/removed informational pages
      { source: "/gallery", destination: "/treatment", permanent: true },
      { source: "/consultation-and-consent-form", destination: "/contact-us", permanent: true },
      { source: "/1496-2", destination: "/contact-us", permanent: true },
      { source: "/aesthetics-glossary", destination: "/blog", permanent: true },

      // Legacy treatment pages -> closest live treatment sections
      { source: "/im-vitamin-injection", destination: "/iv-vitamin-drip", permanent: true },
      { source: "/fat-dissolving-injections", destination: "/body-sculpting-2", permanent: true },
      { source: "/body-services", destination: "/body-sculpting-2", permanent: true },
      { source: "/ems-treatment", destination: "/body-sculpting-2", permanent: true },
      { source: "/laser-lipo-pads", destination: "/body-sculpting-2", permanent: true },
      { source: "/lymphatic-drainage-massage", destination: "/body-sculpting-2", permanent: true },
      { source: "/wood-therapy", destination: "/body-sculpting-2", permanent: true },
      {
        source: "/skin-tightening-radio-frequency",
        destination: "/body-sculpting-2",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
