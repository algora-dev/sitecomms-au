import type { Metadata } from "next";
import { ProjectStatePanel } from "@/components/project-state";
import Link from "next/link";
import { Suspense } from "react";
import { IndustryAwareToolLink } from "@/components/industry-aware-tool-link";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { publishedDate, reviewedDate, reviewedLabel } from "@/lib/content-meta";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "PA, Paging & Intercom Finance & Leasing Australia",
  description:
    "Explore equipment finance, leasing and hire-purchase options for Australian paging, PA, school bell, intercom and communications-system projects, then run a quick finance check.",
  path: "/financing",
});

const faqs = [
  {
    q: "Can a paging, PA, bell or intercom system be financed in Australia?",
    a: "Potentially. Australian commercial equipment-finance providers publicly finance technology, AV, security and other business equipment. Whether a particular communications project is accepted depends on the organisation, equipment, transaction and finance provider.",
  },
  {
    q: "What finance structures may be available?",
    a: "Depending on the provider and transaction, options can include commercial equipment loans, finance leases, operating or rental leases and hire purchase. Under a hire-purchase arrangement, ownership transfers after the final required payment; a lease can instead end in return, renewal or a purchase option depending on the contract.",
  },
  {
    q: "Do I need a deposit?",
    a: "Not always. Some equipment-finance transactions may fund most or all of an eligible equipment invoice, subject to provider assessment and approval. Other transactions may require or benefit from an upfront contribution.",
  },
  {
    q: "Can schools explore equipment finance or leasing?",
    a: "Potentially. Schools should check sector-specific governance, accounting, borrowing and property requirements before entering any finance arrangement, as well as the finance provider’s eligibility and approval criteria.",
  },
  {
    q: "What if I do not know the project price yet?",
    a: "You can still use the finance checker with a rough site size, or use the SiteComms pricing calculator first and carry the indicative project range into the finance check.",
  },
  {
    q: "Can installation costs be included in equipment finance?",
    a: "Sometimes, depending on the provider, equipment and transaction. The finance provider decides which equipment, services and project costs can be included.",
  },
  {
    q: "Can an existing PA or paging system upgrade be financed?",
    a: "Potentially. Replacement, expansion and upgrade projects may be considered by commercial equipment-finance providers depending on the equipment and organisation.",
  },
  {
    q: "Can IP paging systems be leased instead of purchased upfront?",
    a: "Potentially. Commercial equipment finance can include leasing and rental-style structures as well as equipment loans. The available structure depends on the provider and transaction.",
  },
  {
    q: "Can a school bell and PA upgrade be financed?",
    a: "Potentially. Schools may be able to explore commercial equipment finance, but governance, borrowing, accounting and property requirements should be checked for the relevant school sector before proceeding.",
  },
  {
    q: "Does the SiteComms finance checker approve finance?",
    a: "No. SiteComms does not provide finance or make credit decisions. The checker only helps determine whether a specialist conversation looks useful and gives the SiteComms team enough context to suggest an appropriate next step or a provider’s public contact details. Your enquiry is not forwarded to that provider.",
  },
];

export default function FinancingPage() {
  const reviewed = reviewedLabel("/financing");
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
        headline: "Finance and leasing options for paging, PA, bell and intercom systems in Australia",
        description: "Equipment finance, leasing and hire-purchase options for Australian communications-system projects, plus a quick SiteComms finance check.",
        url: `${site.url}/financing`,
        datePublished: publishedDate("/financing"),
        dateModified: reviewedDate("/financing"),
      })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "SiteComms Australia", url: site.url },
        { name: "Finance & leasing", url: `${site.url}/financing` },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      }) }} />

      <header className="sc-container max-w-4xl py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">Australian project payment planning</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">
            Finance and leasing for paging, PA, bell and intercom systems
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--sc-slate)]">
            Paying the full project cost upfront is not the only possible route. Commercial equipment finance, leasing and hire-purchase structures may let an eligible organisation spread the cost of a communications-system project over regular payments.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Suspense><IndustryAwareToolLink to="/tools/finance-check" className="sc-btn-primary">Check whether finance is worth exploring</IndustryAwareToolLink></Suspense>
            <Suspense><IndustryAwareToolLink to="/pricing-tool" className="sc-btn-secondary">Estimate the project cost first</IndustryAwareToolLink></Suspense>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-[var(--sc-slate)]">
            Last reviewed {reviewed}. SiteComms does not provide finance, quote interest rates or make credit decisions. Actual options and approval are determined by the relevant finance provider.
          </p>
        </div>
      </header>

      <section className="border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)] py-14">
        <div className="sc-container max-w-4xl">
          <h2 className="text-2xl font-bold text-[var(--sc-blue-900)]">The short version</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div className="sc-card bg-white p-5">
              <h3 className="font-semibold text-[var(--sc-blue-900)]">1. Work out the rough project value</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Use an existing supplier estimate or the SiteComms pricing calculator. A broad range is enough to start the conversation.</p>
            </div>
            <div className="sc-card bg-white p-5">
              <h3 className="font-semibold text-[var(--sc-blue-900)]">2. Decide what feels manageable</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Think about the regular payment range the organisation could accommodate and whether any upfront contribution is available.</p>
            </div>
            <div className="sc-card bg-white p-5">
              <h3 className="font-semibold text-[var(--sc-blue-900)]">3. Discuss the actual structure</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">A finance specialist can then explain which structures may be relevant and what information is needed for a real application.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="sc-container max-w-5xl"><ProjectStatePanel purpose="finance" /></div>
      <article className="sc-container max-w-3xl py-14 sc-prose">
        <h2>What can equipment finance help with?</h2>
        <p>
          Commercial equipment finance is used to spread the cost of business and organisational assets over time. In Australia, finance providers publicly offer finance and leasing for technology, audio-visual equipment, security systems, medical equipment and other commercial assets. A paging or intercom project may include a mixture of hardware, software, installation and related work, so the exact financeable scope needs to be confirmed with the provider.
        </p>

        <h2>Finance lease, rental or equipment loan?</h2>
        <p>
          Different providers use different structures. Common Australian commercial-equipment options include equipment loans, finance leases, operating or rental leases and commercial hire purchase. Hire purchase is the clearest ownership-transfer structure: the financier owns the asset during the term and ownership transfers after the final required payment. A lease can instead involve return, renewal or a purchase option depending on the contract. SiteComms does not attempt to choose the contract type inside the checker.
        </p>

        <h2>Who might explore finance?</h2>
        <p>
          Equipment-finance providers in Australia publicly work with businesses, schools and education organisations, healthcare providers, government and local-government organisations, charities and other commercial entities. Provider appetite and approval criteria differ, which is why the SiteComms tool focuses on whether there is a useful conversation to have rather than trying to approve or reject an application.
        </p>

        <h2>What if the project cannot be paid upfront?</h2>
        <p>
          That is one of the main reasons to investigate finance or leasing. An organisation may want to preserve cash, spread the project cost, stage an upgrade or compare finance against another capital pathway. A low upfront contribution does not automatically mean there is no option: some Australian providers advertise up to 100% equipment finance for qualifying transactions, while other providers or structures may require different terms.
        </p>

        <h2>Schools: funding and finance are different questions</h2>
        <p>
          Australian government-school finance and leasing rules differ materially by jurisdiction. The SiteComms checker now uses reviewed public guidance for Queensland, NSW, Victoria, Western Australia, South Australia, Northern Territory and Tasmania, while still requiring the school to confirm its own authority. Victoria, for example, permits operating leases but not finance leases for school councils; WA school councils/boards must not borrow or obtain credit; and South Australian governing councils need written Ministerial consent to borrow.
        </p>

        <h2>What parts of a PA, paging or intercom project may be financed?</h2>
        <p>
          Depending on the provider and transaction, a communications project can include items such as central paging or control hardware, IP paging speakers and horns, PA amplifiers and passive speakers, school bell and scheduling hardware or software, intercom and entrance communication equipment, network interfaces and gateways, installation and commissioning where accepted by the finance provider, and related project equipment. The finance provider decides which equipment, services and project costs it will include. SiteComms does not determine what is financeable.
        </p>

        <h2>Pay upfront, use a funding pathway or spread the cost?</h2>
        <div className="not-prose my-7 grid gap-5 md:grid-cols-3">
          <div className="sc-card bg-white p-5">
            <h3 className="font-semibold text-[var(--sc-blue-900)]">Pay upfront</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Useful where the organisation already has capital available and wants no ongoing finance commitment.</p>
          </div>
          <div className="sc-card bg-white p-5">
            <h3 className="font-semibold text-[var(--sc-blue-900)]">Funding</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Relevant mainly where a genuine funding or capital pathway applies — particularly the <Link href="/tools/funding-check">school property pathways</Link> covered elsewhere on SiteComms.</p>
          </div>
          <div className="sc-card bg-white p-5">
            <h3 className="font-semibold text-[var(--sc-blue-900)]">Finance / leasing</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Relevant where the organisation wants to spread the cost or does not want to fund the entire project upfront. Start with the <Link href="/tools/finance-check">finance check</Link>.</p>
          </div>
        </div>
        <p>No option is universally better. The right answer depends on the organisation, the project and the pathways genuinely available to it.</p>

        <h2>Why organisations explore finance for communications systems</h2>
        <div className="not-prose my-7 grid gap-5 sm:grid-cols-2">
          <div className="sc-card bg-white p-5">
            <h3 className="font-semibold text-[var(--sc-blue-900)]">Schools and education</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">A communications upgrade may be needed before a preferred capital or funding timetable, or where a different payment structure is being considered.</p>
          </div>
          <div className="sc-card bg-white p-5">
            <h3 className="font-semibold text-[var(--sc-blue-900)]">Aged care and healthcare</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">A site may need to replace or improve communications while preserving capital for other facility priorities.</p>
          </div>
          <div className="sc-card bg-white p-5">
            <h3 className="font-semibold text-[var(--sc-blue-900)]">Commercial and industrial sites</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">A business may prefer predictable regular payments while replacing or expanding paging or intercom infrastructure.</p>
          </div>
          <div className="sc-card bg-white p-5">
            <h3 className="font-semibold text-[var(--sc-blue-900)]">Public and community facilities</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Councils, venues, charities and other organisations may want to compare purchase and equipment-finance structures.</p>
          </div>
        </div>
        <p>These examples do not mean every organisation in these categories qualifies for finance. Provider assessment and approval criteria always apply.</p>

        <h2>What happens after the finance check?</h2>
        <ol>
          <li><strong>Get your preliminary result.</strong> SiteComms shows whether a specialist finance conversation looks useful.</li>
          <li><strong>Ask SiteComms for the next step.</strong> If you want help, send enough information for the SiteComms team to understand the project.</li>
          <li><strong>Contact the provider SiteComms suggests.</strong> SiteComms replies with the provider or providers it thinks may be appropriate, their public contact details and why they may fit. You decide whether to contact them.</li>
        </ol>

        <p>
          Useful companions along the way: estimate the project first with the <Link href="/pricing-tool">pricing calculator</Link> or the <Link href="/pricing">pricing guide</Link>, review the <Link href="/tools/funding-check">school funding pathways page</Link> where a capital pathway may apply, compare equipment options in the <Link href="/compare">platform comparison</Link>, or revisit the <Link href="/systems/ip-paging-pa">IP paging architecture guide</Link>.
        </p>

        <div className="not-prose mt-10 rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-6">
          <h2 className="text-xl font-semibold text-[var(--sc-blue-900)]">Check in about a minute</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">
            Tell us who the project is for, roughly how much finance may be needed and what sort of regular payment feels manageable. The result is designed to show whether a specialist conversation looks useful — not to decide whether finance will be approved.
          </p>
          <Link href="/tools/finance-check" className="sc-btn-primary mt-4 inline-flex">Run the finance check</Link>
        </div>

        <h2>Sources and market context</h2>
        <p>
          The descriptions above are based on current public Australian equipment-finance and education-governance information. These links show that relevant commercial products and approved lease structures exist; they do not mean SiteComms has a commercial relationship with every organisation referenced or that any application will be approved.
        </p>
        <h3>Examples of current Australian finance pathways</h3>
        <ul>
          <li><a href="https://www.nab.com.au/business/loans-and-finance/vehicle-or-equipment/vehicle-and-equipment-loan">NAB — business vehicle and equipment finance</a></li>
          <li><a href="https://www.westpac.com.au/business-banking/loans-finance/vehicle-equipment-finance/">Westpac — business equipment loans, finance leases and hire purchase</a></li>
          <li><a href="https://www.commbank.com.au/business/loans-and-finance/car-and-equipment-finance/technology-equipment-finance.html">CommBank — technology equipment finance</a></li>
          <li><a href="https://vestonecapital.com/school-equipment-finance/">Vestone Capital — school and education equipment finance</a></li>
          <li><a href="https://finlease.com.au/finance/technology-equipment-finance/technology-finance-education/">Finlease — technology finance for education</a></li>
          <li><a href="https://www.anz.com.au/business/industries/health/">ANZ — health, aged-care, retirement-living and childcare finance context</a></li>
        </ul>
        <h3>Government-school governance examples</h3>
        <ul>
          <li><a href="https://education.qld.gov.au/parents-and-carers/school-information/student-device-programs/one-to-one-models">Queensland Department of Education — school device financing models</a></li>
          <li><a href="https://education.nsw.gov.au/policy-library/policies/pd-2020-0472">NSW Department of Education — financial management policy</a></li>
          <li><a href="https://www2.education.vic.gov.au/pal/asset-and-inventory-management-finance-manual-section-13/policy">Victoria — school asset and lease policy</a></li>
          <li><a href="https://www.education.wa.edu.au/web/policies/-/councils-and-boards-in-public-schools-procedures">Western Australia — school councils and boards procedures</a></li>
          <li><a href="https://www.education.sa.gov.au/docs/psp/governing-council/governing-council/school-governance-administrative-instruction.pdf">South Australia — School Governance Administrative Instruction</a></li>
          <li><a href="https://education.nt.gov.au/media/docs/policies/resource-management/farms-manual/financial-and-resource-management-for-schools-farms-manual-updated.pdf">Northern Territory — FARMS school finance manual</a></li>
          <li><a href="https://publicdocumentcentre.education.tas.gov.au/library/Document%20Centre/School-Associations-Ministerial-Instruction-No-12.pdf">Tasmania — School Associations Ministerial Instruction No 12</a></li>
        </ul>

        <div className="not-prose mt-8 rounded-xl border border-[var(--sc-border)] bg-white p-5 text-sm leading-relaxed text-[var(--sc-slate)]">
          SiteComms Australia is an information and planning resource operated by T3 Labs. It does not provide financial advice, finance products, credit assessment or approval. If you ask for practical help, the SiteComms team can review the information supplied and suggest an appropriate next step or provider to contact.
        </div>

        <div className="not-prose mt-8 rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-6 text-center">
          <h2 className="text-xl font-semibold text-[var(--sc-blue-900)]">Not sure whether finance is worth exploring?</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">It takes about a minute to get a preliminary result.</p>
          <Suspense><IndustryAwareToolLink to="/tools/finance-check" className="sc-btn-primary mt-4 inline-flex">Run the finance check</IndustryAwareToolLink></Suspense>
        </div>
      </article>

      <section className="border-t border-[var(--sc-border)] bg-[var(--sc-blue-50)] py-14">
        <div className="sc-container max-w-3xl">
          <h2 className="text-2xl font-bold text-[var(--sc-blue-900)]">Finance & leasing FAQs</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-[var(--sc-border)] bg-white p-5">
                <h3 className="font-semibold text-[var(--sc-blue-900)]">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
