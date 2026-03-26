import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function AnalyticsScripts() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      {clarityId ? (
        <>
          <Script id="microsoft-clarity-stub" strategy="afterInteractive">
            {`
              window.clarity = window.clarity || function() {
                (window.clarity.q = window.clarity.q || []).push(arguments);
              };
            `}
          </Script>
          <Script id="microsoft-clarity" strategy="lazyOnload">
          {`
            (function(c,l,r,i,t,y){
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "script", "${clarityId}");
          `}
          </Script>
        </>
      ) : null}
    </>
  );
}
