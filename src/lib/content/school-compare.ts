/** Reviewed 19 September 2026. No measured ranking, stock guarantee or partnership implied. */
export const comparisonSources = {
  "frontrow": {
    "label": "FrontRow Australia — Conductor",
    "href": "https://www.gofrontrow.com.au/products/conductor/",
    "kind": "Manufacturer Australian site"
  },
  "clearasound": {
    "label": "ClearaSound — FrontRow Conductor services",
    "href": "https://clearasound.com.au/audio-visual-systems-for-education/frontrow-conductor/",
    "kind": "Australian provider publication; not a SiteComms partnership"
  },
  "algo": {
    "label": "advanceNET — Algo 8301",
    "href": "https://www.advance-net.com.au/product/algo-8301-sip-paging-adapter-bell-scheduler/",
    "kind": "Australian wholesaler product listing"
  },
  "algo-manual": {
    "label": "Algo — 8301 user guide",
    "href": "https://docs.algosolutions.com/docs/8301-user-guide",
    "kind": "Manufacturer technical documentation"
  },
  "axis": {
    "label": "Axis Australia — Audio Manager Edge",
    "href": "https://www.axis.com/en-au/products/axis-audio-manager-edge",
    "kind": "Manufacturer Australian site"
  },
  "axis-manual": {
    "label": "Axis — Audio Manager Edge manual",
    "href": "https://help.axis.com/en-us/axis-audio-manager-edge",
    "kind": "Manufacturer technical documentation"
  },
  "prospero": {
    "label": "Keenfinity Australia — Bosch PROSPERO",
    "href": "https://www.keenfinity-group.com/au/en/solutions/public-address-solutions/public-address-and-voice-alarm-systems/prospero/",
    "kind": "Manufacturer Australian site"
  },
  "bodet": {
    "label": "advanceNET — Bodet Harmonys Trio",
    "href": "https://www.advance-net.com.au/product/bodet-harmonys-trio-speaker-led-display-strobe/",
    "kind": "Australian wholesaler product listing"
  },
  "toa": {
    "label": "TOA — IP-A1PG gateway",
    "href": "https://www.toa.co.uk/products/ip-a1pg/",
    "kind": "Manufacturer technical page; not Australian stock evidence"
  },
  "toa-au": {
    "label": "TOA — Australia authorised dealer",
    "href": "https://toa.com.sg/dealers/29",
    "kind": "Manufacturer Australian dealer directory; confirm exact family"
  },
  "monitor": {
    "label": "Australian Monitor — school paging and custom tones design",
    "href": "https://www.australianmonitor.com.au/pages/school-with-paging-and-custom-tones",
    "kind": "Australian manufacturer application design; not a named school installation"
  },
  "spon": {
    "label": "SPON — school PA solution",
    "href": "https://sponcomm.com/solution-detail/smart-pa-solution-for-schools",
    "kind": "Manufacturer description; Australian supply/support not verified"
  },
  "2n": {
    "label": "2N — IP Verso 2.0",
    "href": "https://www.2n.com/en-GB/products/intercoms/2n-ip-verso-2/",
    "kind": "Manufacturer entrance-intercom description"
  },
  "2n-au": {
    "label": "advanceNET — 2N product category",
    "href": "https://www.advance-net.com.au/product-category/2n/",
    "kind": "Australian wholesaler category; confirm exact revision and availability"
  }
} as const;
export type ComparisonSourceId = keyof typeof comparisonSources;
export type SchoolPlatform = {
 id: string; name: string; family: string; consider: string; summary: string;
 bells: string; intercom: string; legacy: string; visual: string; operations: string;
 cost: string; auEvidence: string; status: string;
 sources: readonly ComparisonSourceId[]; verify: readonly string[];
};
export const schoolPlatforms: readonly SchoolPlatform[] = [
  {
    "id": "frontrow",
    "name": "FrontRow Conductor",
    "family": "School communications with classroom audio integration",
    "consider": "A school needs campus controls coordinated with compatible classroom systems.",
    "summary": "Conductor documents scheduled bells, paging, intercom and alert workflows through its server, administrative station and compatible room systems. Compare a whole-campus configuration, not a classroom amplifier against a complete PA platform.",
    "bells": "Server-based schedules and zoned campus communication.",
    "intercom": "Compatible room audio/interfaces; ask which call controls are included.",
    "legacy": "Ask for the exact interface, amplification and retained-zone design.",
    "visual": "Compatible display integration is described; verify panels and programming.",
    "operations": "Ask staff to demonstrate schedule exceptions, call handling and priority cancellation.",
    "cost": "Separate classroom AV/voice amplification from the essential campus paging scope.",
    "auEvidence": "An Australian manufacturer site and a ClearaSound service page provide local enquiry evidence. Neither establishes every-state installation coverage.",
    "status": "Australian-facing manufacturer and provider evidence",
    "sources": [
      "frontrow",
      "clearasound"
    ],
    "verify": [
      "Which room devices, server, licences and administration station are included?",
      "Who services the complete classroom/campus configuration at this location?"
    ]
  },
  {
    "id": "algo",
    "name": "Algo",
    "family": "8301 scheduler, SIP/multicast endpoints and amplifier interfaces",
    "consider": "A staged upgrade should retain suitable PA infrastructure or work alongside SIP telephony.",
    "summary": "The 8301 combines scheduling with a line-level interface to an analogue amplifier. It supports SIP/multicast operation, while scheduled bells do not require SIP registration. Endpoint and answering requirements still need a complete design.",
    "bells": "8301 scheduled audio; live SIP or multicast paging where configured.",
    "intercom": "Quote selected talkback endpoints and call accessories, not an assumed whole-brand feature.",
    "legacy": "8301 line output feeds a suitable amplifier, not a bare 100V speaker circuit.",
    "visual": "Ask for the required compatible display/alerter and triggering method.",
    "operations": "Identify who manages the scheduler, telephone integration and device accounts.",
    "cost": "Include mounting, console/call accessories, network work and any optional management.",
    "auEvidence": "advanceNET lists the 8301 in Australia. Confirm current availability and responsibility for the full installed system.",
    "status": "Australian product listing",
    "sources": [
      "algo",
      "algo-manual"
    ],
    "verify": [
      "Which retained circuits will stay one shared zone?",
      "Does the quotation include the staff workflow as well as endpoints?"
    ]
  },
  {
    "id": "axis",
    "name": "Axis",
    "family": "Network audio with Audio Manager Edge",
    "consider": "A network-audio project prioritises managed zones, schedules and device health.",
    "summary": "Axis describes Audio Manager Edge as on-device management for compatible network audio. The published scope is up to 200 speakers and 20 zones; check the current management tier against the actual independent-zone requirement.",
    "bells": "Live and scheduled audio through the specified management configuration.",
    "intercom": "Confirm the actual microphone, console or separate intercom configuration.",
    "legacy": "Specify a compatible bridge and amplifier arrangement where analogue PA is retained.",
    "visual": "Confirm the selected visual devices and integration; audio management is not a display specification.",
    "operations": "Ask for administrator roles, fault notifications, backups and support ownership.",
    "cost": "Distinguish on-device management from optional central/multisite services.",
    "auEvidence": "Axis has an Australian-facing product page. This establishes manufacturer information, not local stock or an installer in every region.",
    "status": "Australian-facing manufacturer evidence",
    "sources": [
      "axis",
      "axis-manual"
    ],
    "verify": [
      "How many independently controlled zones does the brief need?",
      "Which functions survive internet, network, controller or power loss?"
    ]
  },
  {
    "id": "bosch-prospero",
    "name": "Bosch PROSPERO",
    "family": "IP PA platform, call stations and interfaces",
    "consider": "A multi-zone site needs centrally managed PA with a defined control and interface design.",
    "summary": "Keenfinity publishes an Australian PROSPERO page describing an IP PA platform, scheduling, browser access and a Windows Server-based control layer. Its education/commercial positioning is not proof of a particular Australian installation or life-safety approval.",
    "bells": "Scheduled broadcasts and configured zone control.",
    "intercom": "Ask for a demonstrated room-calling design; do not infer it from paging functions.",
    "legacy": "Identify the proposed audio/amplifier interfaces and retained circuits.",
    "visual": "Specify visual messaging separately and demonstrate any integration.",
    "operations": "Document server hosting, monitoring, backup and operator permissions.",
    "cost": "Include server/software, call stations, interfaces and commissioning, not just speakers.",
    "auEvidence": "The manufacturer publishes this system on its Australia site. Confirm local configuration, supply and support in the proposal.",
    "status": "Australian-facing manufacturer evidence",
    "sources": [
      "prospero"
    ],
    "verify": [
      "Who owns server maintenance, licensing and recovery?",
      "Does the emergency scope need separate qualified design and acceptance?"
    ]
  },
  {
    "id": "bodet",
    "name": "Bodet Harmonys",
    "family": "IP bells, announcements, time and visual messaging",
    "consider": "Scheduled announcements, clocks and visible messages need to be planned together.",
    "summary": "The Australian Harmonys Trio listing combines a speaker, LED time/message display and flash. It describes scheduling and microphone/alert functions within a wider configured system. Treat the controller, software and alert inputs as part of the proposal.",
    "bells": "Scheduled audio within the specified Harmonys control package.",
    "intercom": "Do not assume a call-response workflow from a speaker/display product.",
    "legacy": "Request a specific migration design rather than assuming analogue reuse.",
    "visual": "Trio combines audio, LED display and flash; verify content and trigger needs.",
    "operations": "Identify schedule ownership and the relevant software/controller requirements.",
    "cost": "Compare the complete control, microphone, display and installation package.",
    "auEvidence": "advanceNET publishes an Australian Harmonys Trio listing. Confirm exact models, lead time and full-system support.",
    "status": "Australian product listing",
    "sources": [
      "bodet"
    ],
    "verify": [
      "Which controller/software and messaging functions are included?",
      "How are visual alerts configured for the actual users and spaces?"
    ]
  },
  {
    "id": "toa",
    "name": "TOA",
    "family": "Specified PA or IP-A1 package; intercom scope separately defined",
    "consider": "An established PA design or an IP gateway/endpoints approach should be compared on the same brief.",
    "summary": "The IP-A1PG technical page documents web scheduling and conversion of SIP/ONVIF or local audio to multicast. TOA also publishes an Australian authorised-dealer entry. A dealer listing does not establish availability of every model or compatibility across product families.",
    "bells": "IP-A1PG web scheduling; confirm the complete locally supplied package.",
    "intercom": "Specify the relevant intercom family separately; do not treat all TOA products as interchangeable.",
    "legacy": "Confirm the exact interfaces and amplifier design for the retained system.",
    "visual": "Ask for the required devices and integration rather than a generic capability tick.",
    "operations": "Document gateway, endpoint and any intercom configuration ownership.",
    "cost": "Separate scheduling, paging, intercom and installation line items.",
    "auEvidence": "TOA lists Australis Music Group as an Australian authorised dealer. Verify the proposed product family and service route.",
    "status": "Australian dealer route; exact family to confirm",
    "sources": [
      "toa",
      "toa-au"
    ],
    "verify": [
      "Which exact Australian-supplied models and firmware form this design?",
      "Who supports interfaces between the chosen product families?"
    ]
  },
  {
    "id": "traditional",
    "name": "Traditional / hybrid PA",
    "family": "Amplifiers, existing speaker circuits and suitable controls",
    "consider": "Working speaker lines cover the required areas and fine-grained room control is not always necessary.",
    "summary": "Australian Monitor publishes a school design with paging and custom tones. This provides a local reference for conventional PA architecture rather than evidence that every project needs a full-IP replacement.",
    "bells": "Specify timer/scheduler and paging controls in the actual design.",
    "intercom": "Add a separately defined two-way system where required.",
    "legacy": "Retain only circuits, speakers and amplifiers that pass the required assessment.",
    "visual": "Separate scope unless a tested interface is included.",
    "operations": "Map physical circuits to required zones and document override behaviour.",
    "cost": "Include testing, repairs, interface work and any areas needing new infrastructure.",
    "auEvidence": "An Australian manufacturer application design is available. It is not a measured school case study or a price comparison.",
    "status": "Australian manufacturer design evidence",
    "sources": [
      "monitor"
    ],
    "verify": [
      "Can retained circuits deliver the required independent zones?",
      "What happens to the price if testing identifies failed infrastructure?"
    ]
  }
];
export const conditionalPlatform: { id: string; name: string; family: string; summary: string; sources: readonly ComparisonSourceId[]; verify: readonly string[] } = {
  "id": "spon",
  "name": "SPON",
  "family": "Integrated PA / intercom architecture",
  "summary": "SPON describes school paging, scheduling and communication functions. Australian supply, warranty, software support and installer responsibility have not been verified in this review. Treat it as a conditional option, not the default Australian recommendation.",
  "sources": [
    "spon"
  ],
  "verify": [
    "Identify a current Australian supply and support route in writing.",
    "Verify exact endpoints, software compatibility, licensing and recovery.",
    "Demonstrate the required workflows before relying on family-level claims."
  ]
};
export const schoolUseCases = [
 { title: "School bells, paging and classroom coordination", ids: ["frontrow", "bosch-prospero", "bodet"], note: "Different approaches: demonstrate the required classroom calling and visual workflows rather than assuming they are equivalent." },
 { title: "Retain suitable PA or stage an IP upgrade", ids: ["algo", "toa", "traditional"], note: "Compare the retained circuit boundaries, new independent zones and interface responsibilities." },
 { title: "Network-managed zones and scheduled messages", ids: ["axis", "algo", "bosch-prospero"], note: "Compare the actual operator workflow, management tier and network dependencies." },
 { title: "Bells, visible messages and time display", ids: ["bodet", "frontrow"], note: "Specify and demonstrate the exact display endpoints, software and trigger arrangements." },
] as const;

/** Foundation provenance is a projection of this source map and the existing page dates.
 * No new manufacturer/stock verification is claimed by adding these records.
 */
export function comparisonEvidenceRecords() {
  return Object.entries(comparisonSources).map(([id, source]) => ({
    source_id: `school-comparison:${id}`,
    ...source,
    authority: source.kind,
    owner: "SiteComms editorial owner",
    publication: "public_reference" as const,
    evidence_status: "inherited_phase_1_research" as const,
    source_version: "school-comparison-phase-1-2026-09-19",
    review_due_at: null,
    limitations: "Not stock, installation coverage, eligibility or partnership verification.",
  }));
}
