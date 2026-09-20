import StateFundingGuide from "@/components/funding/StateFundingGuide";
import { STATE_FUNDING_GUIDES } from "@/lib/funding/guides";
import { buildMetadata } from "@/lib/seo";
// Request-time status prevents a static build from preserving an open-round label indefinitely.
export const dynamic = "force-dynamic";
const guide = STATE_FUNDING_GUIDES.find(item => item.state === "VIC")!;
export const metadata = buildMetadata({ title: "Victoria PA and Communications Funding Routes", description: guide.description, path: "/funding/victoria" });
export default function Page() { return <StateFundingGuide guide={guide} />; }
