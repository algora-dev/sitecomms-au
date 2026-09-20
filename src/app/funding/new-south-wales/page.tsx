import StateFundingGuide from "@/components/funding/StateFundingGuide";
import { STATE_FUNDING_GUIDES } from "@/lib/funding/guides";
import { buildMetadata } from "@/lib/seo";
// Request-time status prevents a static build from preserving an open-round label indefinitely.
export const dynamic = "force-dynamic";
const guide = STATE_FUNDING_GUIDES.find(item => item.state === "NSW")!;
export const metadata = buildMetadata({ title: "New South Wales PA and Communications Funding Routes", description: guide.description, path: "/funding/new-south-wales" });
export default function Page() { return <StateFundingGuide guide={guide} />; }
