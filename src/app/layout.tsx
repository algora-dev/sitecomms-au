import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ProjectStateBoot } from "@/components/project-state";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { GA4_MEASUREMENT_ID } from "@/lib/analytics";
import { Suspense } from "react";
import { siteIndexingEnabled } from "@/lib/indexing";
import { AttributionBoot } from "@/components/attribution-boot";
import { ScrollToTopOnNavigation } from "@/components/scroll-to-top-on-navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  robots: siteIndexingEnabled()
    ? { index: true, follow: true, googleBot: { index: true, follow: true } }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  title: {
    default: "SiteComms Australia | IP paging, bell & PA system guidance for Australia",
    template: "%s | SiteComms Australia",
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    locale: site.locale,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SiteComms Australia - IP paging, PA, bell and intercom planning for Australia" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={inter.variable}>
      <body className="flex min-h-screen flex-col" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
        {GA4_MEASUREMENT_ID ? (
          <>
            {/* Internal-only routes must never load analytics or leak into browser history-linked URLs. */}
            <script
              dangerouslySetInnerHTML={{
                __html: `if(!location.pathname.startsWith('/insights')){var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}';document.head.appendChild(s);window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_MEASUREMENT_ID}',{anonymize_ip:true});}`,
              }}
            />
          </>
        ) : null}
        {/* Microsoft Clarity - session recording & heatmaps. Production hosts only.
         QA override for staging: set window.__CLARITY_QA__ = true in the browser
         console BEFORE page load to force-load Clarity on a non-production host.
         Project-level masking is set to Balanced mode in the Clarity dashboard. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if(location.hostname==='sitecomms.au'||location.hostname==='www.sitecomms.au'||window.__CLARITY_QA__===true){(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","ynyyoqllam");}`,
          }}
        />
        <Suspense>
          <AttributionBoot />
        </Suspense>
        <Suspense>
          <ScrollToTopOnNavigation />
        </Suspense>
        <a href="#main-content" className="sc-skip-link">Skip to main content</a>
        <Suspense fallback={null}><ProjectStateBoot /></Suspense>
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
