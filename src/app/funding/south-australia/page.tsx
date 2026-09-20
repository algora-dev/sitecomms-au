import StateFundingGuide from "@/components/funding/StateFundingGuide";
import { STATE_FUNDING_GUIDES } from "@/lib/funding/guides";
import { buildMetadata } from "@/lib/seo";
// Request-time status prevents a static build from preserving an open-round label indefinitely.
export const dynamic = "force-dynamic";
const guide = STATE_FUNDING_GUIDES.find(item => item.state === "SA")!;
export const metadata = buildMetadata({ title: "South Australia PA and Communications Funding Routes", description: guide.description, path: "/funding/south-australia" });
export default function Page() { return <StateFundingGuide guide={guide} />; }
