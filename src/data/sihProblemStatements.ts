import { SIHProblemStatement } from '../types';

export const OFFICIAL_SIH_PROBLEM_STATEMENTS: SIHProblemStatement[] = [
  {
    id: 'sih-ndma-01',
    code: 'SIH2026-NDMA-142',
    title: 'AI-Driven Multimodal Offline-First Disaster Relief Logistics & Rescue Coordination System',
    organization: 'National Disaster Management Authority (NDMA)',
    category: 'Software',
    domainBucket: 'Disaster Management',
    description: 'During severe cyclonic or flood incidents, terrestrial cellular infrastructure suffers total collapse. Develop an intelligent system capable of decentralized ad-hoc mesh networking, satellite/drone imagery damage assessment, dynamic route optimization, and transparent survivor aid ledger that operates in sub-optimal or zero-connectivity environments.',
    expectedDeliverables: [
      'Offline-capable mobile P2P mesh app (Wi-Fi Direct / BLE)',
      'Lightweight edge AI model for satellite/drone orthomosaic flood segmentation',
      'Dynamic dispatch scheduling algorithm for rescue teams & ration supplies',
      'Tamper-evident relief audit log'
    ]
  },
  {
    id: 'sih-agri-02',
    code: 'SIH2026-AGRI-209',
    title: 'Autonomous Precision Spraying and Multispectral Pest Infestation Early Warning Platform for Smallholder Farmers',
    organization: 'Ministry of Agriculture & Farmers Welfare',
    category: 'Both',
    domainBucket: 'Agriculture & Rural Dev',
    description: 'Small and marginal farmers across India lose 25-30% of crop yield to delayed pest detection and indiscriminate pesticide application. Develop an affordable edge-computing drone/ground camera attachment with localized regional language advisory, hyper-local weather risk modeling, and targeted micro-droplet sprayer control.',
    expectedDeliverables: [
      'YOLO-based localized crop disease detection (<15MB on edge TPU/Raspberry Pi)',
      'Targeted micro-dosing hardware actuation logic',
      'Voice-first vernacular multilingual advisory (Hindi, Tamil, Marathi, Bengali)',
      'Offline sync with Kisan portal & MSP market linkage'
    ]
  },
  {
    id: 'sih-moe-03',
    code: 'SIH2026-MOE-318',
    title: 'Zero-Knowledge Blockchain Credential Verification & Anti-Impersonation System for Academic Records',
    organization: 'Ministry of Education & AICTE',
    category: 'Software',
    domainBucket: 'Blockchain & Cybersecurity',
    description: 'Fraudulent degree certificates and tampered marksheets undermine educational integrity. Construct a privacy-preserving national digital credential issuance and real-time verification protocol utilizing Zero-Knowledge Proofs (ZKP), preventing identity disclosure while enabling employers and universities to cryptographically verify validity in <2 seconds.',
    expectedDeliverables: [
      'Self-sovereign identity (SSI) DID specification aligned with APAAR/DigiLocker',
      'Zero-knowledge proof verification contract with sub-cent gas overhead',
      'Institution admin portal for batch cryptographic signing',
      'Tamper-proof verifiable credential QR verification mobile scanner'
    ]
  },
  {
    id: 'sih-morth-04',
    code: 'SIH2026-MORTH-405',
    title: 'Vision-AI Real-Time Blackspot Hazard Mapping & Emergency Golden-Hour Response Orchestration',
    organization: 'Ministry of Road Transport and Highways (MoRTH)',
    category: 'Software',
    domainBucket: 'Smart Vehicles & Mobility',
    description: 'India accounts for over 1.5 lakh road fatalities annually, predominantly due to hazardous blackspots and delayed golden-hour trauma response. Build an edge-AI vision system integrating municipal CCTV feeds, dashcam telemetry, and crash impact sensors to detect accidents in under 3 seconds and trigger automated EMS corridor clearances.',
    expectedDeliverables: [
      'Computer vision crash & anomaly detection pipeline with <2s false-alarm suppression',
      'Automated green corridor traffic signal pre-emption API integration',
      'GPS nearest trauma center dispatch notification with blood group & injury severity triage',
      'Predictive road surface pothole and blackspot heatmapping dashboard'
    ]
  },
  {
    id: 'sih-mohfw-05',
    code: 'SIH2026-MOHFW-512',
    title: 'Federated Privacy-Preserving AI for Rural Epidemiological Surveillance and Antibiotic Resistance Tracking',
    organization: 'Ministry of Health and Family Welfare (MoHFW) & ICMR',
    category: 'Software',
    domainBucket: 'MedTech / Healthcare',
    description: 'Fragmented health data across PHCs and CHCs impedes rapid disease outbreak containment and fuels antimicrobial resistance (AMR). Design a federated learning architecture that trains outbreak prediction models across rural health centers without patient medical records ever leaving the local clinic perimeter.',
    expectedDeliverables: [
      'Privacy-preserving Federated Learning client-server orchestration with Differential Privacy',
      'Syndromic surveillance dashboard for district CMOs',
      'Offline electronic prescription parser alerting on antibiotic over-prescription',
      'ABHA (Ayushman Bharat Health Account) compliant FHIR API wrapper'
    ]
  }
];

export const SAMPLE_PRESENTATION_DECKS = [
  {
    id: 'sample-ndma-strong',
    title: 'ResQMesh: P2P Disaster Grid & Edge AI Rescue Logistics',
    problemCode: 'SIH2026-NDMA-142',
    category: 'Software',
    teamName: 'Team Garuda X',
    summary: 'A high-scoring, architecturally solid presentation with detailed tech diagrams, edge YOLOv8 deployment benchmarks, LoRa/BLE mesh fallback, and NDMA integration.',
    content: `SLIDE 1: Title & Team Credentials
Project: ResQMesh - Multimodal Offline-First Disaster Logistics & Survivor Rescue Protocol
Problem Statement: SIH2026-NDMA-142 | Organization: National Disaster Management Authority (NDMA)
Team: Team Garuda X (6 Members: 2 Systems/Embedded, 2 ML Engineers, 1 Full-Stack, 1 Cloud Architect)

SLIDE 2: Problem Understanding & Indian Context
- Pain Point: Cellular tower blackouts during floods (e.g., Chennai floods, Wayanad landslides) isolate 10,000+ citizens within first 6 hours.
- Relief mismatch: Traditional manual paper distribution causes 40% relief supply misallocation.
- Key Need: A dual-layered zero-infrastructure communication mesh combined with aerial drone damage triage.

SLIDE 3: Proposed Solution - "ResQMesh"
- Layer 1: Survivor Beacon Mobile App operating on Wi-Fi Direct and Bluetooth Low Energy (BLE 5.2) mesh hops up to 800m peer-to-peer.
- Layer 2: Rapid Response Drone Payload with lightweight Edge TPU running custom quantized YOLOv10-tiny for survivor spot detection and water level depth estimation.
- Layer 3: Incident Commander Dashboard syncing locally via field ruggedized edge server (Raspberry Pi 5 + LoRa 868MHz Gateway) with automated deduplication.

SLIDE 4: Technical Architecture & System Flow
- Protocols: Protocol Buffers over UDP/CoAP for packet minimization; Libp2p for decentralized node discovery; SQLite with CRDTs (Conflict-free Replicated Data Types) for eventual consistency when cell signal returns.
- ML Edge Pipeline: TensorRT FP16 quantization of Drone aerial segmentation model (8.2 FPS on Jetson Orin Nano, 4.1W power draw).
- Security: Ed25519 asymmetric cryptographic signatures for every distress beacon to prevent fake disaster spamming; AES-GCM-256 encrypted payloads.

SLIDE 5: Proof of Concept & Hardware Benchmarks
- Tested 4-node BLE mesh latency across 3-story concrete building: Packet delivery ratio 92.4% with 3 hops.
- Drone image inference time: 42ms per 640x640 tile.
- Working physical prototype with field test video and GitHub repo available for jury live demonstration.

SLIDE 6: 36-Hour Hackathon Execution Roadmap & Milestones
- Phase 1 (Hours 0-12): Core BLE/Wi-Fi Direct mesh routing and beacon broadcast protocol lock.
- Phase 2 (Hours 12-24): Edge YOLO model integration on Jetson board and CRDT sync engine.
- Phase 3 (Hours 24-32): Field test simulation, NDMA triage dashboard UI, stress testing 50 concurrent virtual nodes.
- Phase 4 (Hours 32-36): Pitch rehearsal, code cleanup, packaging Docker container for jury evaluation.

SLIDE 7: Business Model, Government Viability & Open Standards
- Direct alignment with NDMA National Disaster Management Guidelines and SDRF operational drills.
- Deployment Cost: Zero recurring cellular data cost; Open-hardware field nodes cost <₹4,500 each.
- Scalability: Compatible with Bhuvan GIS spatial layers and NDMA CAP (Common Alerting Protocol).`
  },
  {
    id: 'sample-generic-wrapper',
    title: 'SmartDisasterAI: ChatGPT for Flood Rescue',
    problemCode: 'SIH2026-NDMA-142',
    category: 'Software',
    teamName: 'Team CodeWarriors',
    summary: 'A common hackathon pitch flaw: generic AI chatbot wrapper, relies on internet in a disaster blackout, unscalable, missing real architecture.',
    content: `SLIDE 1: Title
SmartDisasterAI - The Ultimate AI Solution for Disasters
Team: CodeWarriors

SLIDE 2: Problem
Disasters are very bad. People get stuck in floods and cannot call for help. Existing systems are slow and old-fashioned.

SLIDE 3: Our Unique Solution
We have built an AI chatbot website where victims can chat with our AI to tell their location and requirements.
The AI will automatically give them survival tips and tell the government where to go.

SLIDE 4: Tech Stack
- Frontend: React JS with Tailwind CSS
- Backend: Node.js and Express
- Database: MongoDB Atlas (Cloud)
- AI: OpenAI ChatGPT API (GPT-4)
- Hosting: Vercel and AWS

SLIDE 5: Features
- User-friendly modern UI with dark mode
- ChatGPT answers all questions about floods
- Google Maps shows where the relief camps are
- Admin can login and see list of people who asked for food

SLIDE 6: Future Roadmap
- We will add Blockchain in Phase 2 for safety.
- We will add Drone delivery in Phase 3.
- We will launch iOS and Android apps soon.

SLIDE 7: Conclusion
SmartDisasterAI will revolutionize disaster management in India and save millions of lives.`
  },
  {
    id: 'sample-agri-moderate',
    title: 'KisanDrishthi: Edge-AI Drone Crop Health & Vernacular Advisory',
    problemCode: 'SIH2026-AGRI-209',
    category: 'Both',
    teamName: 'Team AgroInnovators',
    summary: 'A solid hardware-software concept with clear strengths in vernacular voice interface, but with minor gaps in hardware BOM cost and battery endurance scalability.',
    content: `SLIDE 1: Project Title
KisanDrishthi - Autonomous Precision Pest Detection & Regional Audio Advisory
Problem Statement: SIH2026-AGRI-209 (Ministry of Agriculture & Farmers Welfare)
Team AgroInnovators | 6 Engineers

SLIDE 2: Problem & Ground Reality
- Indian smallholders (1-2 hectares) cannot afford ₹4,00,000 commercial agricultural drones.
- 28% yield loss from Armyworm and Aphid outbreaks due to 4-day delay in scouting.
- 72% of marginal farmers cannot read English text advisories on typical mobile apps.

SLIDE 3: Innovation & Proposed Architecture
- Hardware: Custom 3D-printed gimbal with Sony IMX477 camera mounted on affordable drone / tractor arm.
- Edge Computing: Raspberry Pi 4 with Coral USB Accelerator running MobileNetV3-SSD quantized to INT8 (14ms inference, 91.2% mAP on 12 Indian crop pests).
- Audio System: Offline Whisper-tiny + Piper TTS supporting Hindi, Marathi, and Kannada audio alerts played over field speaker or phone IVR call.

SLIDE 4: Hardware Schematic & Actuation
- ESP32 micro-controller controlling solenoid valves for targeted 50ml micro-spray bursts instead of blanket 500ml field spray.
- LiPo battery management circuit with 22-minute operational flight ceiling.

SLIDE 5: Validation & Field Data
- Tested against 3,200 labeled images from ICAR-IARI maize and tomato datasets.
- Reduction in chemical pesticide volume: estimated 42% savings.

SLIDE 6: Challenges & Mitigations
- Hardware cost is currently ₹28,000 for prototype; goal is ₹12,000 under MSME subsidy.
- Battery life limits continuous flight; mitigated by tractor-mount docking mode.

SLIDE 7: Roadmap for Grand Finale
- 36hr Goal: Live demo of live weed/pest spray trigger on physical target test-bed with real-time Marathi voice output.`
  }
];
