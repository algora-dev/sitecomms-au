/** Australian care-sector planning data. Reviewed 19 September 2026.
 * Shortlists are unranked; clinical nurse call is outside this scope.
 */
export const AGED_CARE_PATH = "/industries/aged-care-retirement-villages";
export const AGED_CARE_TITLE = "Aged Care & Retirement Village PA, Paging & Intercom Systems Australia";
export const AGED_CARE_HEADLINE = "PA, paging and intercom systems for aged care and retirement villages";
export const AGED_CARE_DESCRIPTION = "Compare PA, IP paging, announcement and intercom systems for Australian aged care homes and retirement villages, including visitor video, existing-PA reuse, indicative pricing and finance options.";
export const careSources = {
  "axis-edge": {
    "label": "Axis Australia — Audio Manager Edge",
    "href": "https://www.axis.com/en-au/products/axis-audio-manager-edge",
    "kind": "Technical documentation"
  },
  "axis-console": {
    "label": "AXIS C6110 — paging console and two-way communication",
    "href": "https://www.axis.com/en-au/products/axis-c6110",
    "kind": "Manufacturer"
  },
  "axis-bridge": {
    "label": "AXIS C8110 — analogue audio bridge",
    "href": "https://www.axis.com/en-au/products/axis-c8110",
    "kind": "Manufacturer"
  },
  "axis-entry": {
    "label": "AXIS I8116-E — network video intercom",
    "href": "https://www.axis.com/en-au/products/axis-i8116-e",
    "kind": "Manufacturer"
  },
  "axis-Australian": {
    "label": "Axis Australia — Audio Manager Edge",
    "href": "https://www.axis.com/en-au/products/axis-audio-manager-edge",
    "kind": "Manufacturer Australian site"
  },
  "2n-entry": {
    "label": "2N IP Verso 2.0 — modular entrance intercom",
    "href": "https://www.2n.com/en-GB/products/intercoms/2n-ip-verso-2/",
    "kind": "Manufacturer"
  },
  "2n-Australian": {
    "label": "advanceNET Australia — 2N product category",
    "href": "https://www.advance-net.com.au/product-category/2n/",
    "kind": "Australian wholesaler category; confirm exact revision"
  },
  "algo-adapter": {
    "label": "Algo — 8301 user guide",
    "href": "https://docs.algosolutions.com/docs/8301-user-guide",
    "kind": "Manufacturer technical documentation"
  },
  "algo-speaker": {
    "label": "Algo 8188 — IP ceiling speaker",
    "href": "https://www.algosolutions.com/product/8188-ip-ceiling-speaker/",
    "kind": "Manufacturer"
  },
  "algo-Australian": {
    "label": "advanceNET Australia — Algo 8301",
    "href": "https://www.advance-net.com.au/product/algo-8301-sip-paging-adapter-bell-scheduler/",
    "kind": "Australian product listing"
  },
  "toa-intercom": {
    "label": "TOA N-8000 — dedicated IP intercom family",
    "href": "https://www.toa.co.uk/products/intercom-systems/n-8000-series/",
    "kind": "Manufacturer"
  },
  "toa-gateway": {
    "label": "TOA IP-A1PG — paging gateway and web scheduler",
    "href": "https://www.toa.co.uk/products/ip-a1pg/",
    "kind": "Manufacturer"
  },
  "toa-interface": {
    "label": "TOA IP-A1AF — audio interface",
    "href": "https://www.toa.co.uk/products/ip-a1af/",
    "kind": "Manufacturer"
  },
  "toa-Australian": {
    "label": "TOA — Australia authorised dealers",
    "href": "https://toa.com.sg/dealers/29",
    "kind": "Manufacturer dealer listing"
  },
  "frontrow-system": {
    "label": "FrontRow Conductor — campus communications",
    "href": "https://www.gofrontrow.com.au/products/conductor/",
    "kind": "Official Australian product information"
  },
  "frontrow-Australian": {
    "label": "FrontRow Australia — Conductor",
    "href": "https://www.gofrontrow.com.au/products/conductor/",
    "kind": "Australian-facing manufacturer information; not care-sector deployment evidence"
  },
  "prospero-system": {
    "label": "Keenfinity Australia — Bosch PROSPERO IP PA",
    "href": "https://www.keenfinity-group.com/au/en/solutions/public-address-solutions/public-address-and-voice-alarm-systems/prospero/",
    "kind": "Manufacturer"
  },
  "prospero-Australian": {
    "label": "Keenfinity Australia — Bosch PROSPERO",
    "href": "https://www.keenfinity-group.com/au/en/solutions/public-address-solutions/public-address-and-voice-alarm-systems/prospero/",
    "kind": "Manufacturer Australian site"
  },
  "care-scope": {
    "label": "Australian Government — types of aged care services",
    "href": "https://www.health.gov.au/topics/aged-care/providing-aged-care-services/types-of-services",
    "kind": "Sector context, not product or clinical certification"
  },
  "spon-system": {
    "label": "SPON — school PA solution; care application and Australian support unverified",
    "href": "https://sponcomm.com/solution-detail/smart-pa-solution-for-schools",
    "kind": "Manufacturer capability description, not Australian care-sector evidence"
  }
} as const;
export type CareSourceId = keyof typeof careSources;
export type CarePlatformId = "axis" | "2n" | "algo" | "toa" | "spon" | "prospero" | "frontrow";
type CarePlatform = { id: CarePlatformId; name: string; family: string; category: string; fit: string; verdict: string; summary: string; paging: string; intercom: string; visitor: string; integration: string; value: string; costWatch: string; core: string; audio: string; call: string; entrance: string; australianMarket: string; strengths: readonly string[]; tradeoffs: readonly string[]; sources: readonly CareSourceId[]; auSources: readonly CareSourceId[]; };
export const carePlatforms: readonly CarePlatform[] = [
  {
    "id": "axis",
    "name": "Axis",
    "family": "Audio Manager Edge, C6110 and compatible network audio / intercom",
    "category": "Browser-managed network audio",
    "fit": "Strong first look for browser-managed audio, two-way console operation and security convergence",
    "verdict": "Consider for managed common-area announcements, with entrance intercom specified separately.",
    "summary": "Edge puts zoning, schedules and health monitoring inside compatible audio devices, with browser-based administration. The C6110 console adds reception paging and supported two-way communication; the I8116-E extends the family to visitor video at entrances, and the C8110 bridges retained analogue audio into the design.",
    "paging": "Built-in Edge zones, schedules and health monitoring; browser-managed without a separate server for the Edge tier.",
    "intercom": "C6110 console with compatible microphone-equipped endpoints; two-way paths must be designed.",
    "visitor": "I8116-E network video intercom within the same ecosystem.",
    "integration": "SIP/multicast plus the Axis camera/access ecosystem; C8110 bridges analogue audio.",
    "value": "Included Edge management and reuse of an existing Axis environment can reduce extra system components.",
    "costWatch": "Price the actual speaker mix, console, entrance hardware and any larger-site management tier separately.",
    "strengths": [
      "Well-documented browser workflow for zones, schedules and health checks is a useful administration benchmark.",
      "Network audio, paging console, video intercom and security/access integration can be designed as one environment.",
      "C8110 bridging allows suitable retained analogue speaker circuits to be reused in a staged design."
    ],
    "tradeoffs": [
      "Edge's documented 200-device / 20-zone limit is about management zones, not speakers; larger estates need the appropriate management design first.",
      "Day-to-day simplicity is not a substitute for demonstrating term changes, calling and outage behaviour on the proposed configuration.",
      "Entrance video and door-control work are separate purchases that need their own quoting discipline."
    ],
    "core": "Edge on compatible devices; C6110 console where reception paging/calling is required.",
    "audio": "Selected indoor/outdoor Axis speakers; C8110 plus a suitable amplifier for retained 100V lines.",
    "call": "C6110 with compatible two-way endpoints, configured and demonstrated.",
    "entrance": "I8116-E network video intercom with door-release and receiving arrangement designed explicitly.",
    "australianMarket": "Axis publishes Australian-facing audio and intercom pages. Those establish manufacturer information, not a care-sector installation, local stock or every-state service coverage.",
    "sources": [
      "axis-edge",
      "axis-console",
      "axis-bridge",
      "axis-entry"
    ],
    "auSources": [
      "axis-Australian"
    ]
  },
  {
    "id": "2n",
    "name": "2N",
    "family": "IP Verso 2.0 and the chosen receiving / access-control system",
    "category": "Entrance and access intercom",
    "fit": "Consider for an entrance, gate and visitor-access-led brief",
    "verdict": "Consider for entrance/video communication with a defined answering and access workflow.",
    "summary": "IP Verso 2.0 is a modular entrance-intercom platform. For a care facility or village, specify the visitor answering location, after-hours arrangements and access-control interface. This is not a clinical call-response or whole-site PA specification.",
    "paging": "Not a current whole-site PA/scheduler assumption; legacy Net Audio is in discontinued-product support.",
    "intercom": "Entrance-led full-duplex audio/video communication with configured receiving devices.",
    "visitor": "Core strength: modular entrance panels with camera, buttons and access modules.",
    "integration": "SIP-based integration with chosen telephony/access-control ecosystems.",
    "value": "Deep entrance/access specialisation rather than broad paging coverage.",
    "costWatch": "Price modules, door hardware, receiving stations, licences and any access-control integration, not just the door panel.",
    "strengths": [
      "An entrance-focused product family provides a starting point for visitor communication.",
      "Manufacturer product information and an Australian wholesaler category are available for enquiry."
    ],
    "tradeoffs": [
      "A door intercom is not a site-wide PA system; paging must come from a different design.",
      "Keep current entrance products separate from legacy Net Audio, which 2N places in discontinued-product support.",
      "The Italian retirement/rehabilitation case study is workflow evidence, not proof of the same revision or installation in Australia."
    ],
    "core": "IP Verso 2.0 with the required reader/button/camera modules.",
    "audio": "Not a paging platform; use alongside a PA design where announcements are needed.",
    "call": "Configured receiving arrangement: reception station, resident handset/app workflow or answering service.",
    "entrance": "Core of the design; include door hardware, accessibility and after-hours routing.",
    "australianMarket": "advanceNET publishes a 2N category in Australia. Confirm the exact product revision, warranty and installation support; a listing is not proof of a care-sector deployment.",
    "sources": [
      "2n-entry"
    ],
    "auSources": [
      "2n-Australian"
    ]
  },
  {
    "id": "algo",
    "name": "Algo",
    "family": "8301 adapter / scheduler and compatible SIP endpoints",
    "category": "SIP-first and hybrid migration",
    "fit": "Consider when retaining suitable PA equipment or planning a SIP-linked upgrade.",
    "verdict": "Compare for a staged upgrade with a defined amplifier interface and staff workflow.",
    "summary": "The 8301 connects IP paging and scheduling to a compatible analogue amplifier and provides local scheduling without a cloud dependency. Selected endpoints, including the 8188 ceiling speaker with its accessory call button options, add two-way audio where required.",
    "paging": "8301 built-in scheduler plus SIP/multicast paging; does not require SIP registration for schedules.",
    "intercom": "Selected two-way endpoints (e.g. 8188 with compatible call accessories); not a dedicated intercom architecture.",
    "visitor": "Not primarily an access/video-intercom ecosystem.",
    "integration": "SIP/multicast and line-level interfacing to a suitable amplifier.",
    "value": "Can retain existing PA infrastructure and avoid a large central server for basic scheduled paging.",
    "costWatch": "Include call accessories, mounting, any console and optional management licences.",
    "strengths": [
      "The 8301 is both a bell/announcement scheduler and a migration interface for existing amplifiers.",
      "Staged migration: new IP areas and retained analogue circuits can be considered together.",
      "An Australian product listing provides a supply enquiry starting point; confirm whole-system support."
    ],
    "tradeoffs": [
      "A gateway cannot give individual-room control to speakers sharing one undivided analogue circuit.",
      "General talkback endpoints do not supply a clinical call-response workflow.",
      "The complete staff workflow across scheduler, telephony and accessories still needs designing."
    ],
    "core": "8301 scheduler/adapter; add console and management only where the brief requires them.",
    "audio": "8188 indoor PoE speaker, suitable outdoor horn and the retained amplifier interface.",
    "call": "8188 talkback with compatible call accessories, or a separate dedicated intercom design.",
    "entrance": "Confirm exact package; not an entrance-specialist ecosystem.",
    "australianMarket": "advanceNET publishes Australian education solutions that include Algo IP paging and bell products. Ask the proposed provider to confirm support for the whole design rather than just the adapter.",
    "sources": [
      "algo-adapter",
      "algo-speaker"
    ],
    "auSources": [
      "algo-Australian"
    ]
  },
  {
    "id": "toa",
    "name": "TOA",
    "family": "N-8000 intercom; IP-A1 network PA where appropriate",
    "category": "Dedicated audio intercom and network PA",
    "fit": "Consider where dedicated audio intercom architecture is central",
    "verdict": "Particularly relevant when station-to-station audio intercom is the core requirement, with credible network-PA families alongside.",
    "summary": "N-8000 is a dedicated intercom family with calling and paging. It merits attention when staff/room audio stations are the central requirement. For a SIP-first PA design, IP-A1 provides gateways and interfaces; the IP-A1PG adds web scheduling. The families are distinct architectures that must be designed deliberately.",
    "paging": "IP-A1PG web scheduling and SIP/multicast paging; interface options for passive speakers.",
    "intercom": "Core strength: dedicated N-8000 master/sub-station audio intercom architecture.",
    "visitor": "Audio-only door stations; visitor video is less central in the cited family.",
    "integration": "Good interface/gateway options for mixed and hybrid designs.",
    "value": "Mature dedicated-audio-intercom depth without needing a video-led ecosystem.",
    "costWatch": "Do not price an N-8000 exchange or voice-alarm rack as mandatory for a simpler IP-A1 design, or vice versa.",
    "strengths": [
      "Dedicated intercom requirements can be assessed against a purpose-built station architecture.",
      "IP-A1PG adds a documented scheduler with browser scheduling.",
      "Interfaces and amplifiers support genuinely hybrid site designs."
    ],
    "tradeoffs": [
      "An audio-only N-8000 door station is not a like-for-like replacement for a video-entry system.",
      "Interoperability and limits need checking for the specific combination of families and endpoints.",
      "Confirm Australian supply and support for the exact parts in the proposal."
    ],
    "core": "IP-A1PG for IP-A1 scheduling designs, or an N-8000 exchange for dedicated intercom designs.",
    "audio": "IP-A1 speakers/horns and interface-fed amplifiers for passive zones.",
    "call": "N-8000 master and sub-stations designed for staff/room communication.",
    "entrance": "Audio-only door stations where video is not required.",
    "australianMarket": "TOA's own authorised-dealer page identifies Australis Music Group in Australia. Confirm local availability, product revision and support for the actual N-8000 or IP-A1 proposal.",
    "sources": [
      "toa-intercom",
      "toa-gateway",
      "toa-interface"
    ],
    "auSources": [
      "toa-Australian"
    ]
  },
  {
    "id": "spon",
    "name": "SPON",
    "family": "PA / intercom family; local delivery to verify",
    "category": "Conditional: Australian support unverified",
    "fit": "Only investigate further after confirming a credible Australian supply/support route.",
    "verdict": "Not a default Australian care-sector shortlist entry while local delivery evidence remains unverified.",
    "summary": "SPON describes paging and intercom functions in its manufacturer school solution. A care-site application needs a separate operational design, exact product verification and documented Australian supply/support. This is not evidence of clinical nurse-call capability or an Australian care installation.",
    "paging": "Manufacturer describes managed paging; confirm the locally proposed system.",
    "intercom": "Verify exact endpoint, answering station and software compatibility.",
    "visitor": "Require evidence for the proposed video/access configuration; no local package verified.",
    "integration": "Request documented interfaces and a demonstrated end-to-end workflow.",
    "value": "Potential consolidation should be assessed only after support and compatibility are established.",
    "costWatch": "Do not infer a price advantage from overseas components or broad family claims.",
    "strengths": [
      "Manufacturer information is available as a starting point for a technical enquiry.",
      "A written scope can test whether one platform could cover the required general functions."
    ],
    "tradeoffs": [
      "Australian supply, warranty and local support have not been verified in this review.",
      "Care workflows, privacy controls and any clinical systems require separate specification."
    ],
    "core": "Confirm the proposed server/controller, licences and current supported software.",
    "audio": "Confirm exact indoor/outdoor endpoints and the required coverage design.",
    "call": "Confirm microphones, call controls, answering points and permissions.",
    "entrance": "Confirm the specific entrance device and access interface before specifying it.",
    "australianMarket": "Australian supply/support not verified. No manufacturer link below is being presented as Australian distributor evidence.",
    "sources": [
      "spon-system"
    ],
    "auSources": []
  },
  {
    "id": "prospero",
    "name": "Bosch PROSPERO",
    "family": "PROSPERO software, PRP-CST and audio / amplifier interfaces",
    "category": "Browser-managed IP PA",
    "fit": "Worth quoting for managed common-area announcements",
    "verdict": "A credible browser-managed IP PA option for shared lounges, reception and common areas with scheduled tasks and amplifier interfaces.",
    "summary": "PROSPERO is not only a school-bell platform. The Australian manufacturer page positions it for medium-sized commercial sites, with browser/server control, scheduled tasks, paging and amplifier interfaces. That gives it a credible role in shared lounges, reception and other common areas.",
    "paging": "Strong: browser-managed scheduled broadcasts, live/pre-recorded zoned paging and amplifier interfaces.",
    "intercom": "Zone monitoring and bidirectional audio at interface-module level; room intercom workflow is not established by the core package.",
    "visitor": "No equivalent current visitor-video entrance family established; do not infer one from PROSPERO.",
    "integration": "Standard TCP/IP and PoE call stations/interface modules; amplifier-based passive zones.",
    "value": "Managed PA/scheduling depth without paying for specialist voice-alarm architecture.",
    "costWatch": "Price software licence, host, call stations and one endpoint/interface per required zone; PROSPERO and PRAESENSA are different systems.",
    "strengths": [
      "Web-managed scheduling and zoned paging fit common-area announcement workflows.",
      "Amplifier interfaces support passive-speaker zones in larger shared spaces.",
      "Current Australian-facing product page gives a local enquiry route."
    ],
    "tradeoffs": [
      "The call station's zone-monitoring speaker is not proof of room talkback.",
      "Establish any two-way requirement separately from the core package.",
      "Do not infer certified evacuation suitability from an emergency function."
    ],
    "core": "PROSPERO software licence on the required host, with PRP-CST call station(s).",
    "audio": "IP endpoints and/or interface modules feeding suitable amplifiers and passive speakers.",
    "call": "Specify separately; quote a documented room-calling solution if required.",
    "entrance": "Confirm exact package; no visitor-video family established for this brief.",
    "australianMarket": "Keenfinity maintains an Australian PROSPERO product page. Check the current locally supplied package and support arrangements.",
    "sources": [
      "prospero-system"
    ],
    "auSources": [
      "prospero-Australian"
    ]
  },
  {
    "id": "frontrow",
    "name": "FrontRow",
    "family": "Conductor with compatible classroom / room-audio systems",
    "category": "Room-audio-led campus communications",
    "fit": "Conditional fit where its room-audio ecosystem is already useful",
    "verdict": "Conditional when an existing FrontRow room-audio environment or a specialised activity/training-room audio requirement makes it relevant; not a default aged-care greenfield shortlist entry.",
    "summary": "Conductor combines campus paging, schedules and intercom with compatible room audio. It remains worth assessing where FrontRow is already installed or a training/activity-room audio requirement is important alongside announcements.",
    "paging": "Conductor server provides campus schedules, zones and alerts.",
    "intercom": "Compatible classroom-audio and intercom interfaces; specify microphone/call control.",
    "visitor": "Not an entrance/video-intercom proposition.",
    "integration": "FrontRow campus/room ecosystem; confirm any telephony requirement explicitly.",
    "value": "Attractive where existing or new FrontRow room audio is genuinely useful.",
    "costWatch": "Separate room voice amplification/AV control from the essential campus PA price.",
    "strengths": [
      "A coherent workflow joins room audio, announcements and intercom where that ecosystem is already valuable.",
      "FrontRow maintains an official Australian contact and product route."
    ],
    "tradeoffs": [
      "A classroom-led ecosystem is not the default starting point for a new care-only brief; that is a fit judgement, not a capability claim.",
      "Compare the required functions rather than buying classroom features by default."
    ],
    "core": "Conductor server, licences and administrative station.",
    "audio": "Compatible room interfaces; amplifier connections for common areas.",
    "call": "Compatible room microphone/call interface quoted separately.",
    "entrance": "Confirm exact package; not a specialist entrance ecosystem.",
    "australianMarket": "FrontRow publishes Conductor information on its Australian site. A care application is conditional on an existing operational need for that ecosystem; no Australian care-sector deployment is established here.",
    "sources": [
      "frontrow-system"
    ],
    "auSources": [
      "frontrow-Australian"
    ]
  }
];
export type CareUseCase = { id: string; whatMatters: string; startingPoints: readonly CarePlatformId[]; why: string; sources: readonly CareSourceId[]; };
export const careUseCases: readonly CareUseCase[] = [
  {
    "id": "reception-paging",
    "whatMatters": "Common-area announcements and schedules",
    "startingPoints": [
      "axis",
      "algo",
      "prospero"
    ],
    "why": "Compare reception operation, zone boundaries, schedule changes and backup/recovery, rather than assuming that each product has the same control layer.",
    "sources": [
      "axis-edge",
      "algo-adapter",
      "prospero-system"
    ]
  },
  {
    "id": "entrance-intercom",
    "whatMatters": "Entrance, gate and visitor video communication",
    "startingPoints": [
      "2n",
      "axis"
    ],
    "why": "Define the door panel, answering location and access interface as a complete workflow. These options are not a clinical assistance-call specification.",
    "sources": [
      "2n-entry",
      "axis-entry"
    ]
  },
  {
    "id": "integrated-communication",
    "whatMatters": "PA with separately specified general intercom",
    "startingPoints": [
      "axis",
      "toa"
    ],
    "why": "Compare the actual paging and intercom families and demonstrate their interfaces. One brand name does not guarantee a unified configuration.",
    "sources": [
      "axis-console",
      "toa-intercom"
    ]
  },
  {
    "id": "retain-pa",
    "whatMatters": "Retained PA / staged migration",
    "startingPoints": [
      "algo",
      "axis",
      "toa"
    ],
    "why": "Evaluate exact amplifier interfaces, tested existing circuits and required independent zones. Retaining equipment is a design option, not an automatic saving.",
    "sources": [
      "algo-adapter",
      "axis-bridge",
      "toa-interface"
    ]
  },
  {
    "id": "security-convergence",
    "whatMatters": "Entrance access and communications coordination",
    "startingPoints": [
      "axis",
      "2n"
    ],
    "why": "Ask for a demonstrated visitor-answering and access workflow with defined operator permissions. Keep clinical escalation and general entrance communication separate.",
    "sources": [
      "axis-entry",
      "2n-entry"
    ]
  },
  {
    "id": "staff-two-way",
    "whatMatters": "General staff or room two-way communication",
    "startingPoints": [
      "toa",
      "axis",
      "algo"
    ],
    "why": "Specify call initiation, answering, simultaneous requests and privacy controls. A talkback endpoint alone does not provide nurse-call escalation or clinical response.",
    "sources": [
      "toa-intercom",
      "axis-console",
      "algo-speaker"
    ]
  }
];
type CareQuestion = { id: string; question: string; answer: string; sources: readonly CareSourceId[]; };
export const careQuestions: readonly CareQuestion[] = [
  {
    "id": "best-system",
    "question": "Which PA or intercom system is best for a retirement village?",
    "answer": "Start with the job: general announcements, visitor intercom, retained PA, or clinical resident assistance. These are different scopes. Compare the exact package, Australian support evidence and staff workflow, rather than choosing a universal winning brand. SPON remains conditional until Australian supply/support is verified; ITC is not in the main comparison.",
    "sources": []
  },
  {
    "id": "paging-nurse-call",
    "question": "Is an aged-care paging system the same as nurse call?",
    "answer": "No. Paging can mean announcements over loudspeakers or private messages to staff devices. Nurse call is a separately specified resident/staff response system, potentially including call points, pendants, alert routing and escalation. A general PA speaker with a microphone is not automatically an equivalent replacement for a specialist nurse-call response system.",
    "sources": []
  },
  {
    "id": "aged-care-home-quiet",
    "question": "Can aged-care announcements be limited to certain wings or times?",
    "answer": "The brief can specify which wings, common areas and staff areas receive routine messages. Confirm that the proposed zones and scheduling deliver those rules, then test authorised urgent-message overrides separately. Do not infer clinical suitability from a scheduling feature.",
    "sources": [
      "axis-edge",
      "algo-adapter"
    ]
  },
  {
    "id": "keep-speakers",
    "question": "Can we keep our existing 100V speakers and upgrade the controls?",
    "answer": "Potentially. Interfaces such as Algo 8301 and Axis C8110 connect to suitable analogue audio equipment. Have the installer check the amplifier, wiring, load, condition and coverage. An interface normally feeds an amplifier; it does not directly power a 100V speaker line or create individual-room control within one shared circuit.",
    "sources": [
      "algo-adapter",
      "axis-bridge"
    ]
  },
  {
    "id": "wireless",
    "question": "Does IP paging mean wireless or Wi-Fi speakers?",
    "answer": "No. IP describes network communication; many of the compared endpoints use wired Ethernet and Power over Ethernet. Wireless nurse-call equipment is a different design choice. Identify the real cable, switch and power requirements rather than assuming that an IP upgrade needs no wiring.",
    "sources": [
      "algo-speaker",
      "axis-console"
    ]
  },
  {
    "id": "room-talkback",
    "question": "Can residents or staff speak back through a room speaker?",
    "answer": "Only where the selected endpoint and control system support two-way audio. Algo documents talkback for its 8188, for example. Specify the microphone, call button, answering location and privacy controls; general facility talkback is not automatically equivalent to clinical nurse call.",
    "sources": [
      "algo-speaker",
      "axis-console"
    ]
  },
  {
    "id": "video-entry",
    "question": "Can a retirement village use video intercom at gates or building entrances?",
    "answer": "Entrance products such as 2N IP Verso 2.0 and Axis I8116-E provide technical starting points. Quote visitor video, reception answering, door release and after-hours routing together. Verify exact local supply and support rather than assuming a product-page example represents your installed design.",
    "sources": [
      "2n-entry",
      "axis-entry"
    ]
  },
  {
    "id": "cost-question",
    "question": "How much does a retirement-village PA or intercom upgrade cost?",
    "answer": "Use the SiteComms calculator for an indicative general PA/intercom range based on areas, infrastructure and optional calling. There is no single per-bed price. The worked example on this page uses the same calculator, not a brand quote. Clinical nurse call, extensive door/access work and certified evacuation systems need separate scopes and quotes.",
    "sources": []
  },
  {
    "id": "leasing-question",
    "question": "Can an aged care home or retirement village finance or lease a PA system?",
    "answer": "First identify the legal organisation and its authority to enter an arrangement. Then ask a qualified finance provider to assess the asset, installation costs, term and ownership conditions. SiteComms does not make a lender-eligibility or approval decision; the dedicated Australian finance review is still pending.",
    "sources": []
  },
  {
    "id": "installer-question",
    "question": "How do we find a suitable installer or service provider in Australia?",
    "answer": "Ask for relevant project experience, exact product support, a coverage design and a demonstration of staff tasks. SiteComms can review your enquiry and reply with suggested providers' public contact details. We do not claim to cover the whole market and do not send your enquiry to the providers we recommend.",
    "sources": []
  }
];
