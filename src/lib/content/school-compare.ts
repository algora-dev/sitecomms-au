/**
 * Australian schools comparison. Primary-document review: 25 September 2026.
 * One source for the public tables, profiles, shortlists and evidence register.
 * Editorial fit is not a measured score, quote, stock check or partner endorsement.
 */
export const SCHOOL_COMPARE_PATH = "/compare/schools";
export const SCHOOL_COMPARE_REVIEWED = "2026-09-25";
export const SCHOOL_COMPARE_VERSION = "au-schools-comparison-2026-09-25-v1";
export type ComparisonSource = {
  label: string; href: string; kind: string; scope: string; limits: string; reviewed_at: string;
};
export const comparisonSources = {
  "spon": {
    "label": "SPON — school communications design",
    "href": "https://sponcomm.com/solution-detail/smart-pa-solution-for-schools",
    "kind": "Manufacturer solution",
    "scope": "School workflows and example SPON components.",
    "limits": "Manufacturer description, not a verified Australian deployment or supply channel.",
    "reviewed_at": "2026-09-25"
  },
  "spon-software": {
    "label": "SPON — XC-9000 audio management software",
    "href": "https://sponcomm.com/products/audio-management-software",
    "kind": "Manufacturer technical page",
    "scope": "Scheduling, zones, SIP, two-way communication and stated platform capacity.",
    "limits": "Capacity is a manufacturer claim; confirm edition, licences, network design and local support.",
    "reviewed_at": "2026-09-25"
  },
  "frontrow": {
    "label": "FrontRow Australia — Conductor",
    "href": "https://www.gofrontrow.com.au/products/conductor/",
    "kind": "Australian-facing manufacturer",
    "scope": "Conductor campus communication and compatible classroom/display integration.",
    "limits": "Not proof of stock, individual school suitability or installer coverage.",
    "reviewed_at": "2026-09-25"
  },
  "clearasound": {
    "label": "ClearaSound — Conductor and school services",
    "href": "https://clearasound.com.au/audio-visual-systems-for-education/frontrow-conductor/",
    "kind": "Australian provider",
    "scope": "Conductor services; provider describes NSW and Queensland education coverage.",
    "limits": "Provider's own account, not independent verification or a SiteComms partnership.",
    "reviewed_at": "2026-09-25"
  },
  "algo": {
    "label": "advanceNET — Algo 8301 adapter and scheduler",
    "href": "https://www.advance-net.com.au/product/algo-8301-sip-paging-adapter-bell-scheduler/",
    "kind": "Australian distributor listing",
    "scope": "An Australian Algo enquiry route and 8301 product description.",
    "limits": "A listing is not a live inventory check or an installation quote.",
    "reviewed_at": "2026-09-25"
  },
  "algo-manual": {
    "label": "Algo — 8301 user guide",
    "href": "https://docs.algosolutions.com/docs/8301-user-guide",
    "kind": "Manufacturer technical documentation",
    "scope": "8301 scheduling, SIP/multicast and line-level integration.",
    "limits": "Applies to the specified device/firmware; confirm the full system configuration.",
    "reviewed_at": "2026-09-25"
  },
  "algo-speaker": {
    "label": "Algo — 8188 IP ceiling speaker",
    "href": "https://www.algosolutions.com/product/8188-ip-ceiling-speaker/",
    "kind": "Manufacturer technical page",
    "scope": "Specified 8188 talkback, call inputs and multicast endpoint behaviour.",
    "limits": "Not every speaker or retained analogue circuit has these features.",
    "reviewed_at": "2026-09-25"
  },
  "axis": {
    "label": "Axis Australia — Audio Manager Edge",
    "href": "https://www.axis.com/en-au/products/axis-audio-manager-edge",
    "kind": "Australian-facing manufacturer",
    "scope": "Edge management, scheduling and stated site/zone limits.",
    "limits": "Not a universal limit for every Axis architecture or proof of local inventory.",
    "reviewed_at": "2026-09-25"
  },
  "axis-manual": {
    "label": "Axis — Audio Manager Edge manual",
    "href": "https://help.axis.com/en-us/axis-audio-manager-edge",
    "kind": "Manufacturer technical documentation",
    "scope": "Configuration, schedules, priorities and supported workflows.",
    "limits": "Functions depend on device, software version and integration.",
    "reviewed_at": "2026-09-25"
  },
  "axis-display": {
    "label": "Axis Australia — C1710 display speaker",
    "href": "https://www.axis.com/en-au/products/axis-c1710",
    "kind": "Australian-facing manufacturer",
    "scope": "C1710 speaker, text display, strobe and two-way audio.",
    "limits": "The page describes functions with Axis audio management; third-party configurations can differ.",
    "reviewed_at": "2026-09-25"
  },
  "prospero": {
    "label": "Keenfinity Australia — Bosch PROSPERO",
    "href": "https://www.keenfinity-group.com/au/en/solutions/public-address-solutions/public-address-and-voice-alarm-systems/prospero/",
    "kind": "Australian-facing manufacturer",
    "scope": "IP PA, scheduling, controllers, stations and interfaces.",
    "limits": "Not certification of an Australian life-safety design or evidence of every integrator's capability.",
    "reviewed_at": "2026-09-25"
  },
  "bodet": {
    "label": "advanceNET — Bodet Harmonys Trio",
    "href": "https://www.advance-net.com.au/product/bodet-harmonys-trio-speaker-led-display-strobe/",
    "kind": "Australian distributor listing",
    "scope": "Harmonys Trio audio, display and flash; an Australian enquiry route.",
    "limits": "Confirm controller, commissioning, current availability and exact feature set.",
    "reviewed_at": "2026-09-25"
  },
  "bodet-range": {
    "label": "Bodet — Harmonys IP audio range",
    "href": "https://www.bodet-time.com/products/audio-alert-systems/ip-audio-system.html",
    "kind": "Manufacturer solution",
    "scope": "IP bells, live/recorded audio, clocks, alerts and system components.",
    "limits": "Not confirmation of an Australian installer or automatic suitability for a hearing-access project.",
    "reviewed_at": "2026-09-25"
  },
  "toa": {
    "label": "TOA — IP-A1PG gateway",
    "href": "https://www.toa.co.uk/products/ip-a1pg/",
    "kind": "Manufacturer technical page",
    "scope": "Gateway scheduling and SIP/ONVIF-to-multicast functions.",
    "limits": "Not Australian stock evidence. This gateway is not itself a 100V amplifier.",
    "reviewed_at": "2026-09-25"
  },
  "toa-au": {
    "label": "TOA — Australian authorised dealer directory",
    "href": "https://toa.com.sg/dealers/29",
    "kind": "Manufacturer dealer directory",
    "scope": "Identifies Australis Music Group as an Australian route.",
    "limits": "Confirm the exact IP/PA family, model revision, stock and service responsibility.",
    "reviewed_at": "2026-09-25"
  },
  "monitor": {
    "label": "Australian Monitor — school paging design",
    "href": "https://www.australianmonitor.com.au/pages/school-with-paging-and-custom-tones",
    "kind": "Manufacturer design example",
    "scope": "Illustrates a traditional school PA and triggered-tone design.",
    "limits": "The equipment list includes discontinued models. Not a current bill of materials or named deployment.",
    "reviewed_at": "2026-09-25"
  },
  "2n": {
    "label": "2N — IP Verso 2.0",
    "href": "https://www.2n.com/en-GB/products/intercoms/2n-ip-verso-2/",
    "kind": "Manufacturer technical page",
    "scope": "Entrance intercom and access use case.",
    "limits": "Entrance intercom is not a complete campus bell/PA solution.",
    "reviewed_at": "2026-09-25"
  },
  "2n-au": {
    "label": "advanceNET — 2N range",
    "href": "https://www.advance-net.com.au/product-category/2n/",
    "kind": "Australian distributor listing",
    "scope": "An Australian 2N enquiry route.",
    "limits": "Confirm exact model, integrations and stock; not a SiteComms partnership.",
    "reviewed_at": "2026-09-25"
  },
  "atlas": {
    "label": "AtlasIED — IPX endpoints",
    "href": "https://www.atlasied.com/ipx",
    "kind": "Manufacturer solution",
    "scope": "IP endpoints and notification ecosystem.",
    "limits": "Specify the controlling platform, integration and licensing; not an Australian installation.",
    "reviewed_at": "2026-09-25"
  },
  "atlas-au": {
    "label": "AtlasIED — Australian distribution announcement",
    "href": "https://www.atlasied.com/news/national-audio-systems-named-distributor-for-atlasied-in-australia",
    "kind": "Historical manufacturer announcement",
    "scope": "Names National Audio Systems as Australian distributor.",
    "limits": "Historical channel evidence only. Reconfirm the current arrangement and models before procurement.",
    "reviewed_at": "2026-09-25"
  },
  "qsys": {
    "label": "Q-SYS — audio, video and control platform",
    "href": "https://www.qsys.com/",
    "kind": "Manufacturer platform",
    "scope": "Broader programmable audio/video/control architecture.",
    "limits": "Does not establish a packaged school bell workflow, project cost or Australian school deployment.",
    "reviewed_at": "2026-09-25"
  },
  "macrosphere": {
    "label": "Macrosphere — school bells",
    "href": "https://www.macrosphere.com.au/school-bells/",
    "kind": "Australian provider",
    "scope": "Provider-published school bell/PA services and Queensland locations.",
    "limits": "Provider's own description retrieved in search; direct page fetch was unavailable in this review. No model or school deployment verified.",
    "reviewed_at": "2026-09-25"
  },
  "visionone": {
    "label": "Vision One — St Carlo Borromeo Primary School",
    "href": "https://visionone.com.au/portfolio/st-carlo-borromeo/",
    "kind": "Named integrator project",
    "scope": "Published Victorian assembly/performance audio project.",
    "limits": "An integrator's account of Audac-led audio work, not a whole-campus IP bell system or independent performance test.",
    "reviewed_at": "2026-09-25"
  },
  "advancenet": {
    "label": "advanceNET — contact and office information",
    "href": "https://www.advance-net.com.au/contact-us/",
    "kind": "Australian distributor",
    "scope": "Published Sydney and Perth office/contact routes.",
    "limits": "Office presence does not establish site installation coverage, stocked models or repair response times.",
    "reviewed_at": "2026-09-25"
  },
  "teachtek": {
    "label": "Teach TEK — school audio, lighting and bells",
    "href": "https://www.teachtek.education/audio-and-lighting",
    "kind": "Australian provider",
    "scope": "School bell/PA services and an Adelaide office/showroom.",
    "limits": "Does not specify a compared platform for a named school; not a partner endorsement.",
    "reviewed_at": "2026-09-25"
  },
  "scp-australia": {
    "label": "SCP Audio Australia — school audio examples",
    "href": "https://www.scpaudio.com/Schools",
    "kind": "Named supplier project",
    "scope": "Brisbane South State College multipurpose hall audio example.",
    "limits": "Hall sound reinforcement, not proof of SPON supply or campus paging.",
    "reviewed_at": "2026-09-25"
  }
} as const satisfies Record<string, ComparisonSource>;

export type ComparisonSourceId = keyof typeof comparisonSources;
export type SchoolPlatformId = "spon" | "frontrow" | "algo" | "axis" | "bosch-prospero" | "bodet" | "toa" | "traditional";
export type SchoolPlatform = {
 id: SchoolPlatformId; name: string; family: string; consider: string; summary: string;
 bells: string; intercom: string; legacy: string; visual: string; operations: string;
 cost: string; auEvidence: string; status: string; strengths: readonly string[];
 scale: string; components: string; tradeoff: string;
 sources: readonly ComparisonSourceId[]; verify: readonly string[];
};
export type SchoolUseCase = {
 id: string; title: string; brief: string; ids: readonly SchoolPlatformId[];
 reason: string; sources: readonly ComparisonSourceId[];
};
export type ComparisonNote = { id: string; name: string; text: string; sources: readonly ComparisonSourceId[] };
export type StateReference = {
 state: string; code: string; name: string; kind: string; text: string; limit: string;
 sources: readonly ComparisonSourceId[];
};
export type ComparisonQuestion = { question: string; answer: string; sources: readonly ComparisonSourceId[] };

export const schoolPlatforms: readonly SchoolPlatform[] = [
  {
    "id": "spon",
    "name": "SPON",
    "family": "Integrated IP paging, bells and two-way communication",
    "consider": "A feature-rich school platform with room to expand.",
    "summary": "SPON is a strong all-round shortlist option when a school wants scheduled bells, zoned announcements and two-way communication in one managed system. Its school design combines classroom panels, office consoles, outdoor endpoints and interfaces for retained speaker circuits.",
    "bells": "Scheduled tones, recorded messages and live zoned paging through XC-9000.",
    "intercom": "Two-way calls with specified classroom panels, consoles and compatible endpoints.",
    "legacy": "An IP amplifier/interface design can retain suitable conventional speaker circuits.",
    "visual": "GEN-3102A03 clock/notice display in the school design; specify any additional strobe requirements.",
    "operations": "Central browser/server management, permissions and priority workflows.",
    "cost": "A useful value candidate when one configured platform replaces several separate jobs. Compare the complete licensed, installed and supported system—not an endpoint price.",
    "auEvidence": "Manufacturer evidence is substantial. This review has not verified an Australian distributor/support route or a named Australian school installation. Obtain those details before committing.",
    "status": "Australian supply/support needs confirmation",
    "sources": [
      "spon",
      "spon-software"
    ],
    "strengths": [
      "Bells, paging and two-way workflows in one architecture.",
      "Indoor/outdoor endpoints and a route to retained speaker circuits.",
      "A central platform that can grow with additional buildings."
    ],
    "scale": "The XC-9000 page states up to 1,000 IP endpoints and expansion through cascaded servers. This is a manufacturer capacity statement, not our tested sizing or a promise for every licence.",
    "components": "Ask for the specified XC-9000 edition, office console, classroom call devices, indoor/outdoor speakers and any IP-to-amplifier interfaces.",
    "tradeoff": "The buying decision depends on a credible local integrator, a written support arrangement and an itemised licence/commissioning scope.",
    "verify": [
      "Who is the Australian supplier and who handles warranty, configuration backups, spares and onsite support?",
      "Which licences, server requirements and expansion limits apply to this quotation?",
      "Can staff demonstrate a bell exception, a room-to-office call and a priority message with cancellation?"
    ]
  },
  {
    "id": "frontrow",
    "name": "FrontRow Conductor",
    "family": "Campus communication linked to classroom audio",
    "consider": "Classroom voice amplification and school-wide communication need to work together.",
    "summary": "Conductor is an education-focused option for connecting campus paging, bells, intercom and alerts with compatible classroom systems. Give it particular attention where teacher voice reinforcement and classroom AV control are part of the same project.",
    "bells": "Scheduled bells and campus/zone announcements.",
    "intercom": "Room-to-office communication through compatible classroom equipment.",
    "legacy": "Ask for the quoted interface and retained amplifier/zone design.",
    "visual": "Compatible classroom/display integration; identify the actual screens and controls.",
    "operations": "Conductor server and administration tools coordinate supported room systems.",
    "cost": "Separate the essential campus PA scope from classroom audio and AV-control additions. The combined proposal may solve a broader job than a paging-only quote.",
    "auEvidence": "FrontRow has an Australian-facing Conductor page. ClearaSound describes Conductor services and education coverage in NSW and Queensland.",
    "status": "Australian product and provider evidence",
    "sources": [
      "frontrow",
      "clearasound"
    ],
    "strengths": [
      "Education-specific campus and classroom workflows.",
      "A relevant option when classroom audio is also being upgraded.",
      "Published Australian provider information."
    ],
    "scale": "Ask the supplier to size the server, room devices and campus links for the current school and the next stage.",
    "components": "A complete proposal should identify the server, office controls, compatible classroom systems, speakers, interfaces and programming.",
    "tradeoff": "Do not assume an existing classroom sound system is compatible or that every AV-control feature is included.",
    "verify": [
      "Which classroom products already on site can connect, and what has to change?",
      "Are display messages, classroom calls and door/access integrations included or separately programmed?",
      "Who supports the whole system rather than only the classroom hardware?"
    ]
  },
  {
    "id": "algo",
    "name": "Algo",
    "family": "SIP/multicast IP endpoints and hybrid upgrades",
    "consider": "Use the phone/network environment, retain good speakers and expand in stages.",
    "summary": "Algo is a flexible option for SIP-based paging and phased upgrades. The 8301 combines scheduling with a bridge to existing amplification, while selected IP endpoints add room-level audio and calls. It is more than a one-way speaker range: the specified 8188 supports talkback.",
    "bells": "8301 scheduling; SIP and multicast paging to configured endpoints.",
    "intercom": "8188 talkback and call-button workflows; specify the endpoint and call destination.",
    "legacy": "8301 line-level output feeds suitable amplification—not passive speakers directly.",
    "visual": "The range includes visual alerters and display endpoints; quote the specific devices.",
    "operations": "Endpoint configuration and management; identify the central supervision arrangement.",
    "cost": "Potential value in retaining sound cabling/amplifiers and adding IP only where needed. Include SIP, endpoint-management and any third-party notification costs.",
    "auEvidence": "advanceNET publishes Australian Algo listings. A wholesaler listing establishes an enquiry route, not a completed school design or live stock.",
    "status": "Australian distributor listing",
    "sources": [
      "algo",
      "algo-manual",
      "algo-speaker"
    ],
    "strengths": [
      "A practical bridge between older amplification and IP endpoints.",
      "SIP/multicast options for a staged network rollout.",
      "Documented talkback on selected speakers, not just standalone door intercoms."
    ],
    "scale": "Size multicast, VLAN routing, SIP registrations and supervision with the school's IT team. A multicast receiver count is not an acoustic or network design.",
    "components": "Often an 8301, suitable existing amplifiers, selected IP speakers and call/alert devices. A full IP design is also possible.",
    "tradeoff": "Distributed devices still need a coherent staff workflow; do not confuse a capable endpoint with a complete office call-handling system.",
    "verify": [
      "Which rooms have actual talkback, and how does a teacher initiate a call?",
      "Does the existing phone platform support the proposed call/priority behaviour?",
      "Who maintains schedules, device configurations and the network dependencies?"
    ]
  },
  {
    "id": "axis",
    "name": "Axis network audio",
    "family": "Managed network audio with display-speaker options",
    "consider": "Network management, audio supervision and integrated visual messages matter.",
    "summary": "Axis is a relevant shortlist option for managed IP audio. Audio Manager Edge handles schedules and zones, while devices such as the C1710 combine a speaker, text display, strobe and two-way audio. A visual-alert requirement should not automatically rule Axis out.",
    "bells": "Schedules and audio zones through Audio Manager Edge.",
    "intercom": "Two-way audio on specified endpoints, including C1710; define call controls.",
    "legacy": "Use a suitable network-audio bridge and amplifier design for retained circuits.",
    "visual": "C1710 combines text, strobe and audio; features vary with the management configuration.",
    "operations": "Network device management, health monitoring and prioritised content.",
    "cost": "Compare endpoint hardware, bridge requirements and the selected management tier. Avoid assuming the base software and optional remote services have the same licence basis.",
    "auEvidence": "Australian-localised Axis product pages describe the range and reseller route. Confirm the integrator's school-audio experience and service area.",
    "status": "Australian-facing manufacturer evidence",
    "sources": [
      "axis",
      "axis-manual",
      "axis-display"
    ],
    "strengths": [
      "Audio, text and strobe options within the network-audio range.",
      "Managed schedules and device health functions.",
      "A fit worth examining alongside an existing Axis/network strategy."
    ],
    "scale": "Axis states Audio Manager Edge supports up to 200 speakers and 20 zones. Larger or different deployments require a separately specified architecture.",
    "components": "Specify audio endpoints, display speakers where needed, paging inputs, management configuration and any legacy-audio bridges.",
    "tradeoff": "A camera/security integrator is not automatically a school audio specialist; demand an intelligibility and staff-workflow demonstration.",
    "verify": [
      "Which features work in the proposed management or third-party integration mode?",
      "How are two-way calls initiated, prioritised and answered at the office?",
      "What happens to bells and urgent messages when a controller, switch or link fails?"
    ]
  },
  {
    "id": "bosch-prospero",
    "name": "Bosch PROSPERO",
    "family": "Centrally managed IP public address",
    "consider": "The main job is centrally controlled announcements, schedules and zones.",
    "summary": "PROSPERO is a full-IP PA option presented for education and other medium-sized applications. Its published architecture brings together server management, call stations, interfaces and network speakers. Compare it as a configured system rather than an interchangeable collection of generic SIP devices.",
    "bells": "Server-based scheduling and live/recorded public address.",
    "intercom": "Do not assume classroom two-way calling from the PA description; request a design.",
    "legacy": "Specify the required interfaces, amplification and retained circuits.",
    "visual": "Request evidence for the exact display/strobe integration; not assumed as standard.",
    "operations": "Browser-based management of the configured IP PA system.",
    "cost": "Compare the server, stations, endpoint and commissioning scope. Do not price it from a speaker-only bill.",
    "auEvidence": "Keenfinity publishes a PROSPERO page for Australia. Confirm the relevant product family and local service route in the quotation.",
    "status": "Australian-facing manufacturer evidence",
    "sources": [
      "prospero"
    ],
    "strengths": [
      "A coordinated IP public-address architecture.",
      "Scheduling and operational control within a defined platform.",
      "An Australian-localised manufacturer reference."
    ],
    "scale": "Size the proposed server, endpoint count, zones and expansion capacity with the supplier.",
    "components": "Server/software, call stations, interfaces and suitable IP speakers.",
    "tradeoff": "A PA platform's emergency-message features are not proof of a compliant voice-evacuation system.",
    "verify": [
      "Which required functions are native, optional or require another system?",
      "Is the proposed server and backup-power arrangement acceptable to school IT?",
      "Who supplies and supports the exact PROSPERO family locally?"
    ]
  },
  {
    "id": "bodet",
    "name": "Bodet Harmonys",
    "family": "School bells, time, audio and visible alerts",
    "consider": "Coordinated bells, clocks and visible messages are central to the brief.",
    "summary": "Harmonys deserves particular attention when a bell upgrade also needs clocks and visible alerts. The range combines IP audio with scheduling and control; Harmonys Trio adds a clock/text display and flash to a speaker. Do not treat it as a classroom-intercom system without a separate design.",
    "bells": "Scheduled tones/messages and live announcements within the Harmonys system.",
    "intercom": "Not established as a standard two-way classroom workflow by these sources.",
    "legacy": "Ask for a supported interface to existing amplification where reuse is proposed.",
    "visual": "Harmonys Trio combines speaker, LED display/clock and flash.",
    "operations": "Specify the Sigma/controller and management arrangement with the endpoints.",
    "cost": "Compare the full controller-plus-endpoints proposal, especially when combined devices replace separate clocks and alert equipment.",
    "auEvidence": "advanceNET has an Australian Harmonys Trio listing. Confirm the controller, range availability and commissioning/support provider.",
    "status": "Australian distributor listing",
    "sources": [
      "bodet",
      "bodet-range"
    ],
    "strengths": [
      "A focused bells-and-time architecture.",
      "Integrated visible-alert options rather than audio alone.",
      "Australian product-listing evidence."
    ],
    "scale": "Ask for zone, schedule, endpoint and building-link limits for the proposed controller—not a generic range-wide maximum.",
    "components": "Controller/scheduling equipment, speakers or Trio devices, microphones/trigger controls and network infrastructure.",
    "tradeoff": "A visual alert can support a design, but selecting a strobe does not establish hearing-access eligibility or compliance.",
    "verify": [
      "Which indoor/outdoor devices, clocks and alert patterns are included?",
      "Can staff manage term changes, special-day schedules and cancellation easily?",
      "How will the design meet any individual hearing/access requirements?"
    ]
  },
  {
    "id": "toa",
    "name": "TOA",
    "family": "IP, traditional PA and designed hybrid systems",
    "consider": "Compare a PA specialist's architecture for new or retained speaker zones.",
    "summary": "TOA covers more than one architecture, so the exact family matters. The IP-A1PG gateway documents scheduling and conversion of SIP/ONVIF calls to multicast. A traditional or hybrid TOA proposal is a different configuration and needs its own amplifier, interface and zoning detail.",
    "bells": "IP-A1PG documents a web scheduler; traditional designs need specified scheduling/control.",
    "intercom": "Specify a dedicated intercom design; do not infer it from a paging gateway.",
    "legacy": "An appropriate amplifier/interface design is required; IP-A1PG is not a 100V amplifier.",
    "visual": "Require a specified device/trigger integration, not a range-wide assumption.",
    "operations": "Depends on the selected PA/IP family and control architecture.",
    "cost": "A retained-speaker approach may reduce replacement scope. Compare control, interfaces and commissioning as well as amplification.",
    "auEvidence": "TOA's Australian dealer directory identifies Australis Music Group. Verify the exact product family, revision and project support.",
    "status": "Australian dealer-directory evidence",
    "sources": [
      "toa",
      "toa-au"
    ],
    "strengths": [
      "An option for both conventional PA and selected IP requirements.",
      "A useful comparator for retained-speaker designs.",
      "Manufacturer-published Australian dealer information."
    ],
    "scale": "Ask for the actual zone/channel capacity and growth path of the proposed family.",
    "components": "A specific gateway/controller, amplifiers or IP endpoints, paging inputs and any required intercom.",
    "tradeoff": "A quote that says only 'TOA system' does not identify which functions are included.",
    "verify": [
      "Which exact products deliver bells, paging, priority and room calls?",
      "Is the quoted IP family supplied and supported locally?",
      "How are existing speaker loads, wiring and zones being checked?"
    ]
  },
  {
    "id": "traditional",
    "name": "Traditional / hybrid 100V",
    "family": "Retain suitable infrastructure; improve control where it helps",
    "consider": "The existing speakers work and bells/announcements remain the main job.",
    "summary": "A conventional amplifier-and-speaker system, or a hybrid with an IP control layer, can be a sensible alternative to replacing every endpoint. Australian Monitor's school design illustrates paging and triggered tones, but includes discontinued equipment: use it to understand the architecture, not as a current shopping list.",
    "bells": "A specified timer, scheduler or IP control layer triggers the required tones.",
    "intercom": "Requires a separate call system or suitable IP endpoints.",
    "legacy": "Reuse is central—but only after wiring, loading, condition and coverage checks.",
    "visual": "A separately designed alert/display system may be needed.",
    "operations": "Physical amplifier zones and the chosen control system determine operation.",
    "cost": "Potential value comes from avoiding unnecessary replacement, not from the label '100V'. Extra zoning, cabling or intercom can change the total.",
    "auEvidence": "Australian Monitor provides a local school design reference. Ask an integrator to quote current supported products.",
    "status": "Australian design reference; check current models",
    "sources": [
      "monitor"
    ],
    "strengths": [
      "Can retain suitable speakers and wiring.",
      "A useful benchmark for straightforward bells and announcements.",
      "Can be phased with a carefully specified IP upgrade."
    ],
    "scale": "Compare circuit loading, actual zones and expansion work; a room count is not an amplifier specification.",
    "components": "Current amplifiers, speakers, paging controls and scheduling; optional IP bridge.",
    "tradeoff": "One speaker circuit cannot become several independently controlled rooms just because its input is IP.",
    "verify": [
      "Which equipment is current and supported, and which existing equipment remains?",
      "What wiring/load tests and zone changes are included?",
      "What separate work is needed for two-way calls or visual messages?"
    ]
  }
];

export const schoolUseCases: readonly SchoolUseCase[] = [
  {
    "id": "all-round",
    "title": "One platform for the school day",
    "brief": "Bells, live paging, room calls and future buildings.",
    "ids": [
      "spon",
      "frontrow",
      "bosch-prospero"
    ],
    "reason": "Start with SPON for integrated feature breadth, FrontRow where classroom audio also matters, and PROSPERO for a PA-led design. Check the actual room-call scope.",
    "sources": [
      "spon",
      "spon-software",
      "frontrow",
      "prospero"
    ]
  },
  {
    "id": "classrooms",
    "title": "Classroom audio plus campus control",
    "brief": "Teachers need room audio as well as whole-school messages.",
    "ids": [
      "frontrow",
      "spon"
    ],
    "reason": "FrontRow is especially relevant to a combined classroom/campus brief. SPON offers another integrated communication approach; compare the teacher's actual controls.",
    "sources": [
      "frontrow",
      "clearasound",
      "spon"
    ]
  },
  {
    "id": "keep-speakers",
    "title": "Keep good speakers and upgrade in stages",
    "brief": "Modernise bells and paging without replacing everything.",
    "ids": [
      "algo",
      "toa",
      "traditional",
      "spon"
    ],
    "reason": "Compare an IP bridge, a designed PA upgrade and integrated IP amplification. The condition and zoning of existing circuits drive the decision.",
    "sources": [
      "algo",
      "toa",
      "monitor",
      "spon"
    ]
  },
  {
    "id": "visible",
    "title": "Bells with visible messages",
    "brief": "Clocks, text or strobes are part of the school brief.",
    "ids": [
      "bodet",
      "axis",
      "algo"
    ],
    "reason": "Compare dedicated combined devices and their controls—not a tick against a whole brand. Confirm the display/alert model and its management requirements.",
    "sources": [
      "bodet",
      "bodet-range",
      "axis-display",
      "algo-speaker"
    ]
  },
  {
    "id": "network",
    "title": "A network-led, expandable school",
    "brief": "IT wants manageable endpoints and a clear growth path.",
    "ids": [
      "spon",
      "axis",
      "algo"
    ],
    "reason": "SPON offers central platform control; Axis and Algo provide other managed network approaches. Compare endpoint, zone, licence and support limits separately.",
    "sources": [
      "spon-software",
      "axis",
      "algo-speaker"
    ]
  },
  {
    "id": "simple",
    "title": "Bells and announcements, without extra complexity",
    "brief": "Get the daily job done before buying unused features.",
    "ids": [
      "traditional",
      "algo",
      "bodet"
    ],
    "reason": "Request a simple base proposal and price optional calls, displays and expansion separately. A complete IP replacement is not the only starting point.",
    "sources": [
      "monitor",
      "algo",
      "bodet-range"
    ]
  }
];

export const specialistPlatforms: readonly ComparisonNote[] = [
  {
    "id": "2n",
    "name": "2N entrance intercom",
    "text": "A useful separate shortlist for the gate, visitor entrance and access workflow. It can complement campus paging; it is not a complete bell system. advanceNET provides an Australian enquiry route.",
    "sources": [
      "2n",
      "2n-au"
    ]
  },
  {
    "id": "atlasied",
    "name": "AtlasIED IPX / notification ecosystem",
    "text": "Consider when the brief includes a broader notification platform and endpoint integration. Specify the controller, licences and school workflow. The NAS distribution announcement is historical evidence; confirm the current Australian channel.",
    "sources": [
      "atlas",
      "atlas-au"
    ]
  },
  {
    "id": "qsys",
    "name": "Q-SYS for a broader AV/control project",
    "text": "Relevant when programmable audio, video and control are the main project. Do not assume a ready-made school bell/intercom package: require the integrator to demonstrate and support those workflows.",
    "sources": [
      "qsys"
    ]
  }
];

export const australianStateReferences: readonly StateReference[] = [
  {
    "state": "Queensland",
    "code": "QLD",
    "name": "Macrosphere school bell/PA services",
    "kind": "Provider service description",
    "text": "Macrosphere publishes school bell and PA services with Queensland locations. This is a starting point for a delivery discussion, not evidence that it installs every compared brand.",
    "limit": "The provider page was available as a search extract; direct retrieval failed during review. Confirm its current service area and proposed system.",
    "sources": [
      "macrosphere"
    ]
  },
  {
    "state": "New South Wales",
    "code": "NSW",
    "name": "ClearaSound and FrontRow Conductor",
    "kind": "Named product and provider route",
    "text": "ClearaSound describes Conductor and education services in NSW and Queensland. This links a compared platform to an Australian provider without implying a SiteComms partnership.",
    "limit": "Confirm the actual project location, commissioning scope and ongoing support.",
    "sources": [
      "clearasound"
    ]
  },
  {
    "state": "Victoria",
    "code": "VIC",
    "name": "St Carlo Borromeo Primary School",
    "kind": "Named, integrator-published project",
    "text": "Vision One describes an Audac-led outdoor assembly and performing-arts audio upgrade at the Greenvale school. It illustrates a different school audio job from daily campus bells and paging.",
    "limit": "This is not a SPON installation or evidence of a whole-campus IP bell system. Performance claims are the integrator's, not an independent test.",
    "sources": [
      "visionone"
    ]
  },
  {
    "state": "Western Australia",
    "code": "WA",
    "name": "advanceNET's Perth enquiry route",
    "kind": "Distributor location and product listings",
    "text": "advanceNET publishes a Perth contact route alongside Algo and Bodet product listings. That establishes somewhere to ask about Australian supply, not a guarantee of an onsite installer.",
    "limit": "Confirm equipment availability, installer responsibility and regional travel/support.",
    "sources": [
      "advancenet",
      "algo",
      "bodet"
    ]
  },
  {
    "state": "South Australia",
    "code": "SA",
    "name": "Teach TEK school audio and bells",
    "kind": "Provider service description",
    "text": "Teach TEK publishes school bell, audio and PA services with an Adelaide office/showroom. Ask it to identify the proposed architecture and exact models rather than assuming a brand from this listing.",
    "limit": "A provider service page is not a named deployment or verified statewide support arrangement.",
    "sources": [
      "teachtek"
    ]
  }
];

export const schoolComparisonQuestions: readonly ComparisonQuestion[] = [
  {
    "question": "Which school PA system offers the best value?",
    "answer": "Start with the same brief. SPON is a useful all-round value candidate where bells, paging and two-way workflows would otherwise need separate equipment. Retaining a sound existing system can favour a hybrid proposal; a combined classroom-audio project can favour a different platform. Without comparable Australian installed quotes, there is no defensible universal cheapest brand.",
    "sources": [
      "spon",
      "spon-software",
      "algo",
      "frontrow"
    ]
  },
  {
    "question": "Can the school keep its existing speakers?",
    "answer": "Possibly. Have the supplier inspect wiring, amplifier loading, condition and zone layout. A network adapter can feed suitable amplification, but does not turn every speaker on one circuit into a separately addressable endpoint. Quote the reused and replaced equipment clearly.",
    "sources": [
      "algo",
      "monitor"
    ]
  },
  {
    "question": "Does every IP speaker provide classroom intercom?",
    "answer": "No. Some specified endpoints support talkback; for example, Algo documents it for the 8188 and Axis for the C1710. Also check how a teacher starts a call, where it is answered and what happens during an announcement. A microphone used for monitoring is not by itself a complete office call workflow.",
    "sources": [
      "algo-speaker",
      "axis-display"
    ]
  },
  {
    "question": "Does choosing my state change the system recommendation?",
    "answer": "The technical starting point stays national. Location changes who can survey, install and support the school; school approvals, funding and finance also need the relevant jurisdiction. Confirm travel, response times and replacement equipment, especially for regional or remote sites.",
    "sources": []
  },
  {
    "question": "Can these systems be used for emergency announcements?",
    "answer": "Several manufacturers describe priority messages and alerts. That does not by itself establish that a proposed installation meets the school's emergency plan or any regulated voice-alarm requirement. Ask the school's responsible adviser to define the required system and acceptance tests; do not replace a designated life-safety system based on this comparison.",
    "sources": [
      "spon",
      "frontrow",
      "axis",
      "prospero"
    ]
  },
  {
    "question": "What happens when I ask SiteComms for help?",
    "answer": "You send a reviewed requirement to SiteComms. We review it and reply with suitable providers' public contact details; you decide whom to contact. Your enquiry is not automatically forwarded, and a request for guidance is not a purchase or a funding/finance approval.",
    "sources": []
  }
];

/** Projections of the same records; request time never becomes source verification time. */
export function comparisonEvidenceRecords() {
  return Object.entries(comparisonSources).map(([id, source]) => ({
    source_id: `school-comparison:${id}`,
    ...source,
    authority: source.kind,
    owner: "T3 Labs / SiteComms editorial owner",
    publication: "public_reference" as const,
    evidence_status: "document_review" as const,
    source_version: SCHOOL_COMPARE_VERSION,
    review_due_at: null,
    limitations: source.limits,
  }));
}
export function schoolPlatform(id: SchoolPlatformId): SchoolPlatform {
  const platform = schoolPlatforms.find(item => item.id === id);
  if (!platform) throw new Error(`Unknown school comparison platform: ${id}`);
  return platform;
}
