# GLOSSAR
## Comprehensive Technical Glossary for TALIA
### Threat Analysis and Learning Intelligence for Automotive

---

**Version:** 1.0  
**Datum:** 27.01.2026  
**Sprache:** Deutsch mit englischen Fachbegriffen

---

## Inhaltsverzeichnis

- [Einleitung](#einleitung)
- [Kategorien](#kategorien)
- [A](#a) | [B](#b) | [C](#c) | [D](#d) | [E](#e) | [F](#f) | [G](#g) | [H](#h) | [I](#i) | [J](#j) | [K](#k) | [L](#l) | [M](#m)
- [N](#n) | [O](#o) | [P](#p) | [Q](#q) | [R](#r) | [S](#s) | [T](#t) | [U](#u) | [V](#v) | [W](#w) | [X](#x) | [Y](#y) | [Z](#z)

---

## Einleitung

Dieses Glossar erläutert technische Begriffe, die im Zusammenhang mit **TALIA** (Threat Analysis and Learning Intelligence for Automotive) und den Bereichen Automotive Security, Softwareentwicklung und Datenschutz relevant sind.

### Symbolerklärung

- 🚗 **Automotive** - Fahrzeugspezifische Begriffe
- 🔒 **Security** - Sicherheits- und Cybersecurity-Begriffe
- 🔧 **Technical** - Technische/IT-Begriffe
- 📊 **Standards** - Normen und Regelwerke
- ⚖️ **Legal** - Rechtliche und Datenschutzbegriffe
- 🤖 **AI/ML** - Künstliche Intelligenz und Machine Learning

---

## Kategorien

### Nach Themenbereichen

**Automotive & Connected Vehicles:**
CAN-Bus, ECU, OBD-II, V2X, ADAS, Infotainment, Telematics, Gateway

**Security & Cybersecurity:**
Attack Vector, CIA-Triad, Encryption, Firewall, IDS/IPS, Penetration Test, TARA, Threat Model

**Software Development:**
API, Framework, Library, Repository, Version Control, CI/CD, Serverless

**Standards & Regulations:**
ISO 21434, UN R155, GDPR/DSGVO, SAE J3061, AUTOSAR

**Data Privacy:**
Personal Data, Consent, Data Subject, Controller, Processor, Privacy by Design

---

## A

### ADAS (Advanced Driver Assistance Systems) 🚗
**Definition:** Fortgeschrittene Fahrerassistenzsysteme wie Spurhalteassistent, Notbremsassistent, adaptiver Tempomat.

**Sicherheitsrelevanz:** ADAS-Systeme sind kritisch für Fahrzeugsicherheit und potenzielle Angriffsziele.

**Beispiel:** Adaptiver Tempomat (ACC), Spurhalteassistent (LKA)

**Siehe auch:** [ECU](#ecu-electronic-control-unit-), [V2X](#v2x-vehicle-to-everything-)

---

### API (Application Programming Interface) 🔧
**Definition:** Schnittstelle für die Kommunikation zwischen Softwarekomponenten.

**Bei TALIA:** 
- REST API für Communication zwischen Frontend und Backend
- OpenAI Assistants API für KI-Funktionalität

**Endpoints:**
- `GET /api/health` - Health Check
- `POST /api/assistants/threads` - Thread erstellen
- `POST /api/assistants/threads/:id/messages` - Nachricht senden

**Siehe auch:** [REST](#rest-representational-state-transfer-), [Endpoint](#endpoint-)

---

### App Router 🔧
**Definition:** Routing-System in Next.js 13+ basierend auf Dateistruktur im `app/` Verzeichnis.

**Vorteile:**
- Server Components by default
- Layouts und Templates
- Nested Routes
- API Routes als `route.ts`

**Bei TALIA:** Verwendet für Seiten- und API-Struktur

**Siehe auch:** [Next.js](#nextjs-)

---

### Assistant 🤖
**Definition:** KI-Modell von OpenAI mit definierten Anweisungen (Instructions) und Fähigkeiten (Tools).

**Bei TALIA:** 
- Spezialisiert auf Automotive Security
- Verwendet für Chat-Antworten
- Verwaltet via OpenAI Platform

**Konfiguration:**
- Name: "TALIA Security Assistant"
- Model: GPT-4 oder GPT-4 Turbo
- Instructions: Automotive Security Expertise

**Siehe auch:** [OpenAI](#openai-), [Thread](#thread-)

---

### Attack Feasibility 🔒
**Definition:** Bewertung der Machbarkeit eines Angriffs nach ISO 21434.

**Faktoren:**
- Elapsed Time (Zeitaufwand)
- Specialist Expertise (Expertenwissen)
- Knowledge of Item (Produktkenntnis)
- Window of Opportunity (Gelegenheit)
- Equipment (Ausrüstung)

**Rating:** Very Low, Low, Medium, High, Very High

**Siehe auch:** [TARA](#tara-threat-analysis-and-risk-assessment-), [ISO 21434](#iso-21434-)

---

### Attack Vector 🔒
**Definition:** Pfad oder Methode, die ein Angreifer nutzt, um in ein System einzudringen.

**Beispiele in Automotive:**
- CAN-Bus Injection
- OBD-II Port Exploitation
- Wireless (Bluetooth, WiFi, Cellular)
- USB/SD-Card Malware
- Over-the-Air (OTA) Update Manipulation
- Keyless Entry Relay Attack

**Siehe auch:** [Threat Model](#threat-model-), [Penetration Test](#penetration-test-)

---

### AUTOSAR (AUTomotive Open System ARchitecture) 🚗📊
**Definition:** Standardisierte Software-Architektur für Automotive ECUs.

**Varianten:**
- **AUTOSAR Classic Platform** - Für sicherheitskritische Echtzeitanwendungen
- **AUTOSAR Adaptive Platform** - Für hochleistungsfähige ECUs (z.B. ADAS)

**Relevanz:** Security-Standards für Software-Architektur

**Website:** https://www.autosar.org

**Siehe auch:** [ECU](#ecu-electronic-control-unit-)

---

### Automotive Security 🚗🔒
**Definition:** Schutz von Fahrzeugen und Fahrzeugsystemen vor Cyberangriffen.

**Bereiche:**
- In-Vehicle Network Security (CAN, LIN, FlexRay)
- V2X Communication Security
- OTA Update Security
- Infotainment & Connectivity Security
- ECU Software Security
- Privacy Protection

**Standards:** ISO 21434, UN R155, SAE J3061

**Siehe auch:** [ISO 21434](#iso-21434-), [UN R155](#un-r155-)

---

### AVV (Auftragsverarbeitungsvertrag) ⚖️
**Definition:** Vertrag zwischen Verantwortlichem und Auftragsverarbeiter gemäß Art. 28 DSGVO.

**Englisch:** Data Processing Agreement (DPA)

**Inhalt:**
- Gegenstand und Dauer der Verarbeitung
- Art und Zweck der Verarbeitung
- Art der personenbezogenen Daten
- Kategorien betroffener Personen
- Pflichten und Rechte des Verantwortlichen

**Bei TALIA:** AVVs mit OpenAI und Vercel

**Siehe auch:** [DSGVO](#dsgvo-datenschutz-grundverordnung-)

---

## B

### Backend 🔧
**Definition:** Serverseitige Komponente einer Webanwendung.

**Bei TALIA:**
- Next.js API Routes
- OpenAI SDK Integration
- Serverless Functions (Vercel)
- Node.js Runtime

**Aufgaben:**
- Thread-Management
- Nachrichtenverarbeitung
- OpenAI API-Kommunikation
- Error Handling

**Siehe auch:** [Frontend](#frontend-), [API](#api-application-programming-interface-)

---

### BDSG (Bundesdatenschutzgesetz) ⚖️
**Definition:** Deutsches Datenschutzgesetz, ergänzt die DSGVO.

**Relevanz:** Konkretisiert DSGVO-Vorgaben für Deutschland

**Wichtige Paragraphen:**
- § 26 - Datenverarbeitung im Beschäftigungskontext
- § 38 - Datenschutzbeauftragter
- § 53 - Vertraulichkeitsverpflichtung

**Siehe auch:** [DSGVO](#dsgvo-datenschutz-grundverordnung-)

---

### Bluetooth 🚗🔧
**Definition:** Drahtlose Kommunikationstechnologie für Kurzstrecken.

**Im Automotive:**
- Smartphone-Verbindung (Hands-free, Audio)
- Keyless Entry Systeme
- Diagnose-Tools

**Sicherheitsrisiken:**
- BlueBorne Vulnerability
- Pairing Attacks
- Eavesdropping
- Relay Attacks

**Siehe auch:** [Attack Vector](#attack-vector-)

---

### Browser 🔧
**Definition:** Softwareanwendung zum Anzeigen von Webseiten (z.B. Chrome, Firefox, Safari).

**Bei TALIA:** 
- Client-seitige Ausführung
- Keine Installation notwendig
- localStorage für Thread-ID

**Unterstützte Browser:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## C

### CAN-Bus (Controller Area Network) 🚗
**Definition:** Fahrzeuginternes Kommunikationsnetzwerk zur Verbindung von Steuergeräten (ECUs).

**Eigenschaften:**
- Bus-Topologie
- Multi-Master-System
- Message-basierte Kommunikation
- Kein Sender-Authentifizierung (klassisch)

**Sicherheitsprobleme:**
- Keine native Verschlüsselung
- Keine Authentifizierung
- Broadcast-Natur ermöglicht Sniffing
- Anfällig für Injection Attacks

**Schutzmaßnahmen:**
- CAN-FD mit optionaler Authentifizierung
- Network Segmentation via Gateway
- Intrusion Detection Systems (IDS)

**Siehe auch:** [ECU](#ecu-electronic-control-unit-), [Gateway](#gateway-)

---

### Chat 🔧
**Definition:** Interaktive Konversationsschnittstelle zur Kommunikation mit TALIA.

**Funktionen:**
- Texteingabe
- Nachrichtenverlauf
- Markdown-Formatierung in Antworten
- Auto-Scroll
- Typing Indicator

**Siehe auch:** [Thread](#thread-), [Message](#message-)

---

### CIA-Triad 🔒
**Definition:** Grundprinzipien der Informationssicherheit.

**Bestandteile:**
1. **Confidentiality (Vertraulichkeit)** - Schutz vor unbefugtem Zugriff
2. **Integrity (Integrität)** - Schutz vor unbefugter Änderung
3. **Availability (Verfügbarkeit)** - Sicherstellung des Zugriffs für Berechtigte

**Im Automotive:**
- Confidentiality: Verschlüsselung von V2X-Messages
- Integrity: Code Signing für Software-Updates
- Availability: Redundanz kritischer ECUs

---

### Client 🔧
**Definition:** Anwendung, die Services vom Server anfordert.

**Bei TALIA:** 
- Browser (Frontend)
- React-Komponenten
- Sendet HTTP-Requests an Backend

**Siehe auch:** [Server](#server-), [Frontend](#frontend-)

---

### Code Signing 🔒
**Definition:** Digitale Signatur von Software zur Verifikation von Authentizität und Integrität.

**Im Automotive:**
- Signierung von ECU-Firmware
- OTA-Update-Verifikation
- Boot-Loader Security (Secure Boot)

**Algorithmen:** RSA, ECDSA

**Siehe auch:** [OTA](#ota-over-the-air-)

---

### Component 🔧
**Definition:** Wiederverwendbare UI-Einheit in React.

**Bei TALIA:**
- Chat-Komponente (`page.tsx`)
- Header
- Message Bubbles
- Input Form

**Types:**
- Functional Components
- Server Components (Next.js)
- Client Components ("use client")

**Siehe auch:** [React](#react-)

---

### Cookie ⚖️
**Definition:** Kleine Textdatei, die im Browser gespeichert wird.

**Bei TALIA:** 
- ❌ Keine klassischen Cookies verwendet
- ✅ localStorage für Thread-ID

**Siehe auch:** [localStorage](#localstorage-)

---

### CSRF (Cross-Site Request Forgery) 🔒
**Definition:** Angriff, bei dem ein Benutzer ungewollt Aktionen auf einer Website ausführt.

**Schutz in TALIA:**
- Next.js hat eingebauten CSRF-Schutz
- SameSite Cookie-Attribute

---

### CSS (Cascading Style Sheets) 🔧
**Definition:** Stylesheet-Sprache zur Gestaltung von HTML-Elementen.

**Bei TALIA:**
- CSS Modules (`Chat.module.css`)
- Scoped Styles
- Custom Properties (CSS Variables)
- Responsive Design (Media Queries)

**Siehe auch:** [CSS Modules](#css-modules-)

---

### CSS Modules 🔧
**Definition:** Lokalisierte CSS-Styles, die automatisch eindeutige Klassennamen generieren.

**Vorteile:**
- Vermeidung von Namenskonflikten
- Komponentenbasiertes Styling
- Build-time Processing

**Bei TALIA:**
```javascript
import styles from './Chat.module.css';
<div className={styles.header}>...</div>
```

---

## D

### Data Subject ⚖️
**Definition (DSGVO):** Betroffene Person, deren personenbezogene Daten verarbeitet werden.

**Deutsch:** Betroffene Person

**Rechte:** Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch

**Bei TALIA:** Nutzer der Anwendung

**Siehe auch:** [DSGVO](#dsgvo-datenschutz-grundverordnung-)

---

### Deployment 🔧
**Definition:** Bereitstellung einer Anwendung auf einem Server oder Hosting-Plattform.

**TALIA Deployment:**
- Plattform: Vercel
- Typ: Serverless
- Process: Git Push → Automatic Build → Deploy
- Environments: Production, Preview, Development

**Commands:**
```bash
npm run build
npx vercel --prod
```

**Siehe auch:** [Vercel](#vercel-)

---

### DPA (Data Processing Agreement) ⚖️
**Definition:** Vertrag über Datenverarbeitung zwischen Verantwortlichem und Auftragsverarbeiter.

**Deutsch:** Auftragsverarbeitungsvertrag (AVV)

**Siehe:** [AVV](#avv-auftragsverarbeitungsvertrag-)

---

### DSGVO (Datenschutz-Grundverordnung) ⚖️
**Definition:** EU-weites Datenschutzgesetz, in Kraft seit 25.05.2018.

**Englisch:** GDPR (General Data Protection Regulation)

**Wichtige Artikel:**
- Art. 5 - Grundsätze der Verarbeitung
- Art. 6 - Rechtmäßigkeit der Verarbeitung
- Art. 7 - Bedingungen für Einwilligung
- Art. 13-14 - Informationspflichten
- Art. 15-22 - Rechte der betroffenen Person
- Art. 28 - Auftragsverarbeiter
- Art. 32 - Sicherheit der Verarbeitung
- Art. 33-34 - Datenpannen-Meldung
- Art. 77 - Beschwerderecht

**Bußgelder:** Bis zu 20 Mio. € oder 4% des weltweiten Jahresumsatzes

**Website:** https://eur-lex.europa.eu/eli/reg/2016/679/oj

**Siehe auch:** [Personenbezogene Daten](#personenbezogene-daten-), [Betroffene Person](#data-subject-)

---

## E

### ECU (Electronic Control Unit) 🚗
**Definition:** Elektronisches Steuergerät im Fahrzeug.

**Beispiele:**
- Engine Control Module (ECM) - Motorsteuerung
- Transmission Control Module (TCM) - Getriebesteuerung
- Body Control Module (BCM) - Karosserie-Funktionen
- Airbag Control Unit - SRS
- Anti-lock Braking System (ABS)
- Gateway - Netzwerkverbindung zwischen Bus-Systemen

**Anzahl:** Moderne Fahrzeuge haben 70-100+ ECUs

**Kommunikation:** CAN-Bus, LIN-Bus, FlexRay, Ethernet

**Siehe auch:** [CAN-Bus](#can-bus-controller-area-network-), [Gateway](#gateway-)

---

### Encryption (Verschlüsselung) 🔒
**Definition:** Umwandlung von Daten in unleserliche Form zum Schutz vor unbefugtem Zugriff.

**Typen:**
- **Symmetrisch:** Gleicher Schlüssel für Ver- und Entschlüsselung (AES)
- **Asymmetrisch:** Key-Pair (Public/Private Key) für Ver-/Entschlüsselung (RSA, ECC)

**Bei TALIA:**
- TLS 1.3 für Datenübertragung (Transport Encryption)
- AES-256 für Daten at-rest

**Algorithmen:**
- AES (Advanced Encryption Standard)
- RSA (Rivest-Shamir-Adleman)
- ECDSA (Elliptic Curve Digital Signature Algorithm)

**Siehe auch:** [TLS](#tls-transport-layer-security-)

---

### Endpoint 🔧
**Definition:** Spezifische URL eines API, die eine bestimmte Funktion bereitstellt.

**TALIA Endpoints:**
```
GET  /api/health
POST /api/assistants/threads
POST /api/assistants/threads/:threadId/messages
```

**Siehe auch:** [API](#api-application-programming-interface-), [REST](#rest-representational-state-transfer-)

---

### Environment Variables 🔧
**Definition:** Konfigurationswerte, die außerhalb des Codes gespeichert werden.

**Bei TALIA:**
```bash
OPENAI_API_KEY=sk-proj-...
OPENAI_ASSISTANT_ID=asst_...
```

**Speicherorte:**
- `.env.local` (lokal)
- Vercel Dashboard (Production)

**Vorteile:**
- Keine Secrets im Code
- Umgebungsspezifische Konfiguration
- Sicherheit

**Siehe auch:** [Security](#security-sicherheit-)

---

## F

### Firewall 🔒
**Definition:** Sicherheitssystem zur Überwachung und Kontrolle von Netzwerkverkehr.

**Typen:**
- Network Firewall (Hardware/Software)
- Web Application Firewall (WAF)
- Host-based Firewall

**Bei TALIA:**
- Vercel Edge Firewall
- DDoS Protection

**Siehe auch:** [Security](#security-sicherheit-)

---

### FlexRay 🚗
**Definition:** Hochgeschwindigkeits-Bussystem für sicherheitskritische Automotive-Anwendungen.

**Eigenschaften:**
- Deterministische Kommunikation
- Fehlertoleranz (Dual-Channel)
- Bis zu 10 Mbit/s
- Time-Triggered

**Anwendung:** ADAS, Steering, Braking

**Siehe auch:** [CAN-Bus](#can-bus-controller-area-network-), [ECU](#ecu-electronic-control-unit-)

---

### Framework 🔧
**Definition:** Strukturiertes Set von Tools und Libraries für Softwareentwicklung.

**Bei TALIA:**
- **Next.js** - Full-Stack React Framework
- **React** - UI Framework

**Siehe auch:** [Next.js](#nextjs-), [React](#react-)

---

### Frontend 🔧
**Definition:** Client-seitige Komponente einer Webanwendung (User Interface).

**Bei TALIA:**
- React Components
- Browser-basiert
- TypeScript
- CSS Modules

**Hauptdatei:** `app/page.tsx`

**Siehe auch:** [Backend](#backend-), [React](#react-)

---

### Fuzzing 🔒
**Definition:** Automatisiertes Testen mit zufälligen/manipulierten Eingaben zur Fehler-/Schwachstellenfindung.

**Im Automotive:**
- CAN-Bus Fuzzing (ungültige Messages)
- Protocol Fuzzing (V2X, Bluetooth)
- API Fuzzing

**Tools:** AFL, Boofuzz, Peach Fuzzer

**Siehe auch:** [Penetration Test](#penetration-test-)

---

## G

### Gateway 🚗
**Definition:** ECU, die verschiedene Fahrzeug-Netzwerke verbindet und Daten filtert.

**Funktionen:**
- Routing zwischen CAN, LIN, FlexRay, Ethernet
- Filtering und Access Control
- Protocol Translation
- Firewall-Funktionalität

**Sicherheitsrelevanz:** Zentrale Stelle zur Netzwerksegmentierung und IDS

**Siehe auch:** [ECU](#ecu-electronic-control-unit-), [CAN-Bus](#can-bus-controller-area-network-)

---

### GDPR (General Data Protection Regulation) ⚖️
**Definition:** EU Datenschutz-Grundverordnung

**Deutsch:** DSGVO

**Siehe:** [DSGVO](#dsgvo-datenschutz-grundverordnung-)

---

### Git 🔧
**Definition:** Versionskontrollsystem für Code-Management.

**Bei TALIA:**
- Repository auf GitHub
- Branching für Features
- Commit History
- Integration mit Vercel (Auto-Deploy)

**Commands:**
```bash
git add .
git commit -m "message"
git push origin main
```

---

## H

### HARA (Hazard Analysis and Risk Assessment) 🚗📊
**Definition:** Gefährdungs- und Risikoanalyse nach ISO 26262 (Functional Safety).

**Unterschied zu TARA:** 
- HARA = Functional Safety (Fehlerhafte Funktion)
- TARA = Cybersecurity (Böswillige Angriffe)

**Siehe auch:** [TARA](#tara-threat-analysis-and-risk-assessment-), [ISO 26262](#iso-26262-)

---

### Hash 🔒
**Definition:** Eindeutige Prüfsumme für Daten (Einweg-Funktion).

**Algorithmen:**
- SHA-256, SHA-3
- MD5 (veraltet, unsicher)

**Anwendungen:**
- Integrität verification
- Password Storage
- Digital Signatures

---

### HTTPS (Hypertext Transfer Protocol Secure) 🔒
**Definition:** Verschlüsseltes HTTP über TLS/SSL.

**Bei TALIA:** Alle Verbindungen über HTTPS

**Siehe auch:** [TLS](#tls-transport-layer-security-)

---

## I

### IDS (Intrusion Detection System) 🔒
**Definition:** System zur Erkennung von Angriffen und anomalem Verhalten.

**Typen:**
- Network-based IDS (NIDS)
- Host-based IDS (HIDS)

**Im Automotive:**
- CAN-IDS zur Erkennung von CAN-Bus-Angriffen
- Anomalieerkennung in ECU-Kommunikation

**Siehe auch:** [IPS](#ips-intrusion-prevention-system-)

---

### Infotainment 🚗
**Definition:** Information + Entertainment System im Fahrzeug.

**Komponenten:**
- Display/Touchscreen
- Navigation
- Audio/Video
- Smartphone Integration (Apple CarPlay, Android Auto)
- Connectivity (WiFi, Bluetooth, LTE/5G)

**Sicherheitsrisiken:**
- USB-Angriffe
- Bluetooth-Exploits
- App-Schwachstellen
- WiFi-Attacks
- Verbindung zu internem Netzwerk (Gateway)

**Siehe auch:** [Attack Vector](#attack-vector-), [Gateway](#gateway-)

---

### IPS (Intrusion Prevention System) 🔒
**Definition:** System zur aktiven Abwehr von Angriffen (IDS + Blocking).

**Unterschied zu IDS:** IPS reagiert aktiv und blockiert Angriffe

---

### ISO 21434 📊🔒
**Definition:** Internationaler Standard für Automotive Cybersecurity.

**Vollständiger Titel:** "Road vehicles — Cybersecurity engineering"

**Veröffentlichung:** August 2021

**Struktur:**
- Cybersecurity Governance
- Project-dependent Cybersecurity Management
- Distributed Cybersecurity Activities (Concept, Product Development, Production, Operations, Maintenance)
- Risk Assessment Methods (TARA)

**Lifecycle:** Concept → Development → Production → Operations → Decommissioning

**Website:** https://www.iso.org/standard/70918.html

**Siehe auch:** [TARA](#tara-threat-analysis-and-risk-assessment-), [UN R155](#un-r155-)

---

### ISO 26262 📊
**Definition:** Standard für Functional Safety in Automotive.

**Fokus:** Vermeidung unbeabsichtigter Fehler (Safety)

**Unterschied zu ISO 21434:** 
- 26262 = Safety (Fehler)
- 21434 = Security (Angriffe)

---

## J

### JavaScript (JS) 🔧
**Definition:** Programmiersprache für Web-Entwicklung.

**Bei TALIA:**
- TypeScript (typisiertes JavaScript)
- React Components
- Node.js Backend

**Siehe auch:** [TypeScript](#typescript-)

---

### JSON (JavaScript Object Notation) 🔧
**Definition:** Leichtgewichtiges Datenformat für Datenaustausch.

**Bei TALIA:**
- API Request/Response Format
- Configuration Files (`package.json`)

**Beispiel:**
```json
{
  "thread_id": "thread_abc123",
  "message": "Antwort von TALIA"
}
```

---

## K

### Keyless Entry 🚗
**Definition:** Schlüsselloses Zugangssystem zum Fahrzeug.

**Technologien:**
- RFID (Radio Frequency Identification)
- NFC (Near Field Communication)
- Bluetooth Low Energy (BLE)

**Sicherheitsrisiken:**
- **Relay Attack:** Signal-Verstärkung zwischen Key Fob und Fahrzeug
- **Replay Attack:** Aufzeichnung und Wiedergabe von Signalen
- **Jamming:** Störung der Funkverbindung

**Gegenmaßnahmen:**
- Distance Bounding
- Ultra-Wideband (UWB)
- Motion Sensors im Key Fob

**Siehe auch:** [Attack Vector](#attack-vector-)

---

### KI (Künstliche Intelligenz) 🤖
**Definition:** Simulation menschlicher Intelligenz durch Computer.

**Englisch:** AI (Artificial Intelligence)

**Bei TALIA:**
- OpenAI GPT-4 Modell
- Natural Language Processing (NLP)
- Kontext-basierte Antworten

**Siehe auch:** [OpenAI](#openai-), [Assistant](#assistant-)

---

## L

### Library 🔧
**Definition:** Sammlung wiederverwendbarer Code-Module.

**Bei TALIA verwendete Libraries:**
- `react` - UI Components
- `react-dom` - React Rendering
- `openai` - OpenAI SDK
- `react-markdown` - Markdown Rendering
- `remark-gfm` - GitHub Flavored Markdown

**Siehe auch:** [npm](#npm-)

---

### LIN-Bus (Local Interconnect Network) 🚗
**Definition:** Kostengünstiges serielles Bussystem für nicht-kritische Funktionen.

**Eigenschaften:**
- Single-Master, Multi-Slave
- Bis zu 20 kbit/s
- Einfache Implementierung

**Anwendungen:** Fensterheber, Spiegel, Sitze, Klimaanlage

**Siehe auch:** [CAN-Bus](#can-bus-controller-area-network-), [FlexRay](#flexray-)

---

### localStorage ⚖️🔧
**Definition:** Browser-Speicher für lokale Daten (Key-Value Store).

**Bei TALIA:**
- Speicherung der Thread-ID
- Persistenz über Browser-Sessions
- Maximal ~5-10 MB Speicher

**Zugriff:**
```javascript
localStorage.setItem('assistant_thread_id', 'thread_abc123');
const threadId = localStorage.getItem('assistant_thread_id');
localStorage.removeItem('assistant_thread_id');
```

**Siehe auch:** [Cookie](#cookie-), [Session](#session-)

---

## M

### Markdown 🔧
**Definition:** Leichtgewichtige Markup-Sprache zur Textformatierung.

**Bei TALIA:**
- Verwendung in TALIA-Antworten
- Rendering via `react-markdown`
- Unterstützung für GitHub Flavored Markdown (GFM)

**Syntax:**
```markdown
# Überschrift 1
## Überschrift 2
**fett** *kursiv*
- Liste
1. Nummerierte Liste
[Link](url)
`code`
```

---

### Message 🔧
**Definition:** Einzelne Nachricht in einem Thread.

**Bei TALIA:**
- User Messages (vom Nutzer)
- Assistant Messages (von TALIA)

**Eigenschaften:**
- `role`: "user" oder "assistant"
- `content`: Nachrichtentext
- `timestamp`: Zeitpunkt

**Siehe auch:** [Thread](#thread-)

---

## N

### Next.js 🔧
**Definition:** React-basiertes Full-Stack Framework.

**Version bei TALIA:** 15.5.7

**Features:**
- App Router (file-based routing)
- Server Components
- API Routes (Serverless Functions)
- Built-in Optimization (Images, Fonts)
- TypeScript Support

**Website:** https://nextjs.org

**Siehe auch:** [React](#react-), [Vercel](#vercel-)

---

### Node.js 🔧
**Definition:** JavaScript Runtime für serverseitige Ausführung.

**Version Requirements:** 18+

**Bei TALIA:**
- Backend Runtime
- npm Package Management
- API Routes Execution

**Website:** https://nodejs.org

---

### npm (Node Package Manager) 🔧
**Definition:** Paketmanager für JavaScript/Node.js.

**Bei TALIA:**
- Installation von Dependencies
- Script Execution
- Version Management

**Commands:**
```bash
npm install      # Dependencies installieren
npm run dev      # Development Server
npm run build    # Production Build
npm audit        # Security Check
```

---

## O

### OBD-II (On-Board Diagnostics II) 🚗
**Definition:** Standardisierte Diagnoseschnittstelle für Fahrzeuge.

**Port:** Meist unter dem Lenkrad

**Funktionen:**
- Fehlercode-Auslesen
- Live-Daten (Drehzahl, Geschwindigkeit, etc.)
- Emissionsdaten

**Sicherheitsrisiken:**
- Direkter Zugriff auf CAN-Bus
- Keine Authentifizierung
- Potenzial für Malware-Injection

**Angriffsvektoren:**
- OBD-II Dongles mit Malware
- Sniffing von CAN-Messages
- ECU Reprogramming

**Siehe auch:** [CAN-Bus](#can-bus-controller-area-network-), [Attack Vector](#attack-vector-)

---

### OpenAI 🤖
**Definition:** Unternehmen für KI-Forschung und -Entwicklung.

**Bei TALIA:**
- Provider der Assistants API
- GPT-4 Modell
- Thread und Message Management

**Services:**
- ChatGPT
- API (GPT, DALL-E, Whisper, etc.)
- Assistants API

**Website:** https://openai.com  
**API Docs:** https://platform.openai.com/docs

**Siehe auch:** [Assistant](#assistant-), [API](#api-application-programming-interface-)

---

### OTA (Over-the-Air) 🚗
**Definition:** Drahtlose Software-Updates für Fahrzeuge.

**Vorteile:**
- Schnelle Bug-Fixes
- Feature-Updates ohne Werkstattbesuch
- Kostenreduktion

**Sicherheitsrisiken:**
- Man-in-the-Middle Attacks
- Malicious Update Injection
- Rollback Attacks

**Schutzmaßnahmen:**
- Code Signing
- Secure Boot
- Encrypted Transmission
- Update Verification

**Siehe auch:** [Code Signing](#code-signing-), [Encryption](#encryption-verschlüsselung-)

---

## P

### Penetration Test (Pentest) 🔒
**Definition:** Autorisierter simulierter Angriff zur Identifikation von Schwachstellen.

**Phasen:**
1. Reconnaissance (Aufklärung)
2. Scanning
3. Gaining Access (Exploitation)
4. Maintaining Access
5. Covering Tracks
6. Reporting

**Im Automotive:**
- CAN-Bus Pentesting
- Wireless Pentesting (WiFi, Bluetooth)
- OBD-II Attacks
- Infotainment Testing
- V2X Security Testing

**Siehe auch:** [Fuzzing](#fuzzing-), [Attack Vector](#attack-vector-)

---

### Personenbezogene Daten ⚖️
**Definition (DSGVO):** Informationen, die sich auf eine identifizierte oder identifizierbare Person beziehen.

**Beispiele:**
- Name, Adresse
- E-Mail, Telefon
- IP-Adresse
- Standortdaten
- Kennzeichen (falls mit Person verknüpfbar)

**Bei TALIA:**
- Thread-ID (pseudonym)
- Nachrichten-Inhalte (falls personenbezogen eingegeben)

**Siehe auch:** [DSGVO](#dsgvo-datenschutz-grundverordnung-)

---

### Polling 🔧
**Definition:** Wiederholte Abfrage eines Status/Werts.

**Bei TALIA:**
- Prüfung des OpenAI Run-Status
- Intervall: 1 Sekunde
- Max. 90 Versuche (90 Sekunden)

**Code:**
```typescript
while (!terminal.has(status) && tries < 90) {
  await sleep(1000);
  const updated = await openai.beta.threads.runs.retrieve(...);
  status = updated.status;
  tries++;
}
```

---

## Q

### Query 🔧
**Definition:** Abfrage oder Anfrage (z.B. an eine Datenbank oder API).

**Bei TALIA:**
- User-Query = Benutzer-Frage im Chat
- API Query = Request an OpenAI API

---

## R

### React 🔧
**Definition:** JavaScript-Library für User Interfaces.

**Version bei TALIA:** 19.1.0

**Konzepte:**
- Komponenten (Functional Components)
- Hooks (useState, useEffect, useRef)
- JSX (JavaScript XML)
- Virtual DOM

**Bei TALIA:**
- UI Components
- State Management
- Event Handling

**Website:** https://react.dev

**Siehe auch:** [Next.js](#nextjs-), [Component](#component-)

---

### Replay Attack 🔒
**Definition:** Angriff durch Aufzeichnung und Wiedergabe gültiger Nachrichten.

**Im Automotive:**
- Aufzeichnung von Keyless Entry Signalen
- Wiedergabe von CAN-Bus Messages
- V2X Message Replay

**Gegenmaßnahmen:**
- Timestamps
- Nonces (Number used once)
- Rolling Codes
- Cryptographic Challenge-Response

---

### REST (Representational State Transfer) 🔧
**Definition:** Architekturstil für Web-APIs.

**Prinzipien:**
- Stateless
- Client-Server
- Cacheable
- Uniform Interface

**HTTP Methoden:**
- GET - Daten abrufen
- POST - Daten erstellen
- PUT - Daten aktualisieren
- DELETE - Daten löschen

**Bei TALIA:**
```
GET  /api/health
POST /api/assistants/threads
POST /api/assistants/threads/:id/messages
```

**Siehe auch:** [API](#api-application-programming-interface-), [Endpoint](#endpoint-)

---

### Run 🤖
**Definition:** Prozess der Nachrichtenverarbeitung durch OpenAI Assistant.

**Status:**
- `queued` - Wartet auf Verarbeitung
- `in_progress` - Wird verarbeitet
- `completed` - Erfolgreich abgeschlossen
- `failed` - Fehler aufgetreten
- `cancelled` - Abgebrochen
- `expired` - Timeout

**Bei TALIA:**
- Erstellt nach User-Message
- Polling bis `completed`
- Max. 90 Sekunden Timeout

**Siehe auch:** [Thread](#thread-), [Polling](#polling-)

---

## S

### SAE J3061 📊
**Definition:** SAE-Standard für Automotive Cybersecurity.

**Vollständiger Titel:** "Cybersecurity Guidebook for Cyber-Physical Vehicle Systems"

**Veröffentlichung:** 2016

**Fokus:** Guidebook (nicht normativ wie ISO 21434)

**Website:** https://www.sae.org/standards/content/j3061_201601/

**Siehe auch:** [ISO 21434](#iso-21434-)

---

### Secure Boot 🔒
**Definition:** Sicherheitsmechanismus, der nur signierte/verifizierte Software beim Boot-Prozess zulässt.

**Im Automotive:**
- ECU Boot-Loader prüft Firmware-Signatur
- Chain of Trust vom Hardware-Root-of-Trust
- Verhindert Malware-Ausführung

**Siehe auch:** [Code Signing](#code-signing-)

---

### Security (Sicherheit) 🔒
**Definition:** Schutz vor böswilligen Angriffen und unbefugtem Zugriff.

**Unterschied zu Safety:**
- Security = Schutz vor Angriffen (ISO 21434)
- Safety = Schutz vor Fehlern (ISO 26262)

**Bei TALIA:**
- API-Key-Schutz
- TLS-Verschlüsselung
- Input-Validierung
- Error Handling

**Siehe auch:** [Encryption](#encryption-verschlüsselung-), [Authentication](#authentication-)

---

### Server 🔧
**Definition:** Computer oder Programm, das Services für Clients bereitstellt.

**Bei TALIA:**
- Next.js Server
- API Routes
- Vercel Serverless Functions

**Siehe auch:** [Backend](#backend-), [Serverless](#serverless-)

---

### Serverless 🔧
**Definition:** Cloud-Computing-Modell ohne Server-Management (Functions as a Service).

**Bei TALIA:**
- Vercel Serverless Functions
- Automatische Skalierung
- Pay-per-Execution

**Vorteile:**
- Keine Server-Wartung
- Automatisches Scaling
- Cost-Efficient

**Limitationen:**
- Cold Starts
- Execution Timeouts
- Stateless

**Siehe auch:** [Vercel](#vercel-), [Backend](#backend-)

---

### Session 🔧
**Definition:** Zusammenhängende Interaktionsserie zwischen Client und Server.

**Bei TALIA:**
- Thread = Session mit OpenAI
- Thread-ID identifiziert Session

**Siehe auch:** [Thread](#thread-), [localStorage](#localstorage-)

---

### SSR (Server-Side Rendering) 🔧
**Definition:** Rendering von React-Komponenten auf dem Server statt im Browser.

**Vorteile:**
- Schnellere Initial Page Load
- SEO-Optimierung
- Bessere Performance auf langsamen Geräten

**Bei TALIA:**
- Next.js unterstützt SSR
- Server Components

**Siehe auch:** [Next.js](#nextjs-)

---

## T

### TALIA 🤖🚗
**Definition:** **T**hreat **A**nalysis and **L**earning **I**ntelligence for **A**utomotive

**Beschreibung:** KI-gestützter Assistent für Automotive Security-Beratung.

**Hauptfunktionen:**
- Interaktiver Chat
- Security-Beratung
- Standard-Referenz (ISO 21434, UN R155)
- TARA-Unterstützung

**Technologie:**
- Next.js 15.5.7
- React 19.1.0
- OpenAI Assistants API

---

### TARA (Threat Analysis and Risk Assessment) 🔒📊
**Definition:** Bedrohungs- und Risikoanalyse nach ISO 21434.

**Schritte:**
1. **Asset Identification** - Schutzbedürftige Assets identifizieren
2. **Threat Scenario Identification** - Bedrohungsszenarien entwickeln
3. **Impact Rating** - Auswirkungen bewerten (Safety, Financial, Operational, Privacy)
4. **Attack Path Analysis** - Angriffspfade analysieren
5. **Attack Feasibility Rating** - Machbarkeit bewerten
6. **Risk Determination** - Risiko bestimmen (Impact x Feasibility)
7. **Risk Treatment** - Maßnahmen definieren (Avoid, Reduce, Share, Retain)

**Output:** Risk Assessment Report mit Cybersecurity Goals und Requirements

**Siehe auch:** [ISO 21434](#iso-21434-), [Attack Feasibility](#attack-feasibility-)

---

### Telematics 🚗
**Definition:** Telekommunikation + Informatik; Übertragung von Fahrzeugdaten.

**Funktionen:**
- GPS-Tracking
- Remote Diagnostics
- Usage-Based Insurance (UBI)
- Stolen Vehicle Recovery
- Fleet Management

**Sicherheitsrisiken:**
- Unverschlüsselte Datenübertragung
- Backend-Schwachstellen
- Privacy-Risiken (Standortverfolgung)

**Siehe auch:** [V2X](#v2x-vehicle-to-everything-)

---

### Thread 🤖
**Definition:** Konversations-Session in der OpenAI Assistants API.

**Bei TALIA:**
- Speichert alle Messages einer Sitzung
- Erhält Kontext über mehrere Nachrichten
- Thread-ID im localStorage gespeichert

**Lifecycle:**
- Erstellt beim ersten Besuch
- Persistent über Browser-Sessions
- Kann manuell gelöscht werden

**Format:** `thread_abc123xyz`

**Siehe auch:** [Message](#message-), [Run](#run-)

---

### TLS (Transport Layer Security) 🔒
**Definition:** Kryptographisches Protokoll zur sicheren Datenübertragung.

**Früher:** SSL (Secure Sockets Layer)

**Bei TALIA:**
- TLS 1.3 (aktuellster Standard)
- HTTPS für alle Verbindungen
- Schutz vor Man-in-the-Middle Attacks

**Siehe auch:** [HTTPS](#https-hypertext-transfer-protocol-secure-), [Encryption](#encryption-verschlüsselung-)

---

### TypeScript 🔧
**Definition:** Typisierte Superset von JavaScript.

**Version bei TALIA:** ^5

**Vorteile:**
- Type Safety
- Bessere IDE-Unterstützung (IntelliSense)
- Fehler zur Compile-Time
- Code-Dokumentation durch Types

**Bei TALIA:**
- Alle Source-Dateien in TypeScript
- Type Definitions für APIs
- Interfaces für Data Models

**Website:** https://www.typescriptlang.org

**Siehe auch:** [JavaScript](#javascript-js-)

---

## U

### UI (User Interface) 🔧
**Definition:** Benutzeroberfläche einer Anwendung.

**Bei TALIA:**
- Chat-Interface
- Header mit Logo
- Message Display
- Input Form

**Siehe auch:** [Frontend](#frontend-), [UX](#ux-user-experience-)

---

### UN R155 📊⚖️
**Definition:** UNECE Regulation über Cybersecurity Management Systeme für Fahrzeuge.

**Vollständiger Titel:** "Uniform provisions concerning the approval of vehicles with regards to cyber security and cyber security management system"

**In Kraft:** Juni 2021

**Anwendung:** Verpflichtend für neue Fahrzeugtypen in EU ab Juli 2024

**Anforderungen:**
- Cybersecurity Management System (CSMS)
- Risk Assessment
- Testing
- Software Update Management
- Incident Response

**Website:** https://unece.org/transport/documents/2021/03/standards/un-regulation-no-155-cyber-security-and-cyber-security

**Siehe auch:** [ISO 21434](#iso-21434-), [UN R156](#un-r156-)

---

### UN R156 📊
**Definition:** UNECE Regulation über Software Update Management.

**Fokus:** Over-the-Air (OTA) Updates

**Anforderungen:**
- Update Management System
- Traceability
- Security

**Siehe auch:** [UN R155](#un-r155-), [OTA](#ota-over-the-air-)

---

### UX (User Experience) 🔧
**Definition:** Nutzererfahrung bei Verwendung einer Anwendung.

**Bei TALIA:**
- Intuitive Bedienung
- Responsive Design
- Schnelle Ladezeiten
- Clear Feedback (Typing Indicator)

**Siehe auch:** [UI](#ui-user-interface-)

---

## V

### V2I (Vehicle-to-Infrastructure) 🚗
**Definition:** Kommunikation zwischen Fahrzeug und Infrastruktur (Ampeln, Verkehrsschilder).

**Teil von:** V2X

**Siehe auch:** [V2X](#v2x-vehicle-to-everything-)

---

### V2V (Vehicle-to-Vehicle) 🚗
**Definition:** Direkte Kommunikation zwischen Fahrzeugen.

**Anwendungen:**
- Kollisionsvermeidung
- Platooning (Kolonnenfahren)
- Cooperative Awareness

**Teil von:** V2X

**Siehe auch:** [V2X](#v2x-vehicle-to-everything-)

---

### V2X (Vehicle-to-Everything) 🚗
**Definition:** Kommunikation des Fahrzeugs mit seiner Umgebung.

**Typen:**
- **V2V** - Vehicle-to-Vehicle
- **V2I** - Vehicle-to-Infrastructure
- **V2P** - Vehicle-to-Pedestrian
- **V2N** - Vehicle-to-Network (Cloud)

**Technologien:**
- DSRC (Dedicated Short Range Communication) / IEEE 802.11p
- C-V2X (Cellular V2X) / 5G

**Sicherheitsrisiken:**
- Message Spoofing
- Replay Attacks
- Sybil Attacks (Fake Multiple Identities)
- Denial of Service

**Schutzmaßnahmen:**
- Public Key Infrastructure (PKI)
- Message Authentication
- Certificate Management

**Siehe auch:** [Attack Vector](#attack-vector-), [Encryption](#encryption-verschlüsselung-)

---

### Vercel 🔧
**Definition:** Cloud-Plattform für Frontend- und Serverless-Deployment.

**Bei TALIA:**
- Hosting Platform
- Serverless Functions für API Routes
- Automatic Deployments (Git Integration)
- Global CDN
- Environment Variables Management

**Features:**
- Edge Network
- Analytics
- Preview Deployments
- Zero-Config

**Website:** https://vercel.com

**Siehe auch:** [Deployment](#deployment-), [Serverless](#serverless-)

---

### Vulnerability (Schwachstelle) 🔒
**Definition:** Fehler oder Schwäche in einem System, die ausgenutzt werden kann.

**Kategorien:**
- Software Vulnerabilities (Bugs, Logic Errors)
- Configuration Vulnerabilities (Misconfigurations)
- Design Vulnerabilities (Architectural Flaws)

**Datenbanken:**
- CVE (Common Vulnerabilities and Exposures)
- NVD (National Vulnerability Database)

**Siehe auch:** [Attack Vector](#attack-vector-), [Penetration Test](#penetration-test-pentest-)

---

## W

### WebSocket 🔧
**Definition:** Protokoll für bidirektionale Echtzeitkommunikation zwischen Client und Server.

**Bei TALIA:** Aktuell nicht verwendet (stattdessen REST API mit Polling)

---

## X

### XSS (Cross-Site Scripting) 🔒
**Definition:** Angriff durch Injection von Schadcode in Webseiten.

**Schutz in TALIA:**
- React automatic escaping
- Content Security Policy (CSP)
- Input Validation

---

## Y

### YAML 🔧
**Definition:** Datenserialisierungsformat (YAML Ain't Markup Language).

**Verwendung:** Configuration Files, CI/CD Pipelines

---

## Z

### Zero-Day 🔒
**Definition:** Schwachstelle, die öffentlich unbekannt ist und für die kein Patch existiert.

**Risiko:** Hohe Gefahr, da keine Schutzmaßnahmen verfügbar

---

## ANHANG

### A. Abkürzungsverzeichnis

| Abkürzung | Bedeutung |
|-----------|-----------|
| ADAS | Advanced Driver Assistance Systems |
| AES | Advanced Encryption Standard |
| API | Application Programming Interface |
| AUTOSAR | AUTomotive Open System ARchitecture |
| AVV | Auftragsverarbeitungsvertrag |
| BDSG | Bundesdatenschutzgesetz |
| CAN | Controller Area Network |
| CIA | Confidentiality, Integrity, Availability |
| CSRF | Cross-Site Request Forgery |
| CSS | Cascading Style Sheets |
| CVE | Common Vulnerabilities and Exposures |
| DPA | Data Processing Agreement |
| DSGVO | Datenschutz-Grundverordnung |
| ECU | Electronic Control Unit |
| GDPR | General Data Protection Regulation |
| HARA | Hazard Analysis and Risk Assessment |
| HTTPS | Hypertext Transfer Protocol Secure |
| IDS | Intrusion Detection System |
| IPS | Intrusion Prevention System |
| ISO | International Organization for Standardization |
| JS | JavaScript |
| JSON | JavaScript Object Notation |
| KI | Künstliche Intelligenz |
| LIN | Local Interconnect Network |
| NVD | National Vulnerability Database |
| OBD | On-Board Diagnostics |
| OTA | Over-the-Air |
| PKI | Public Key Infrastructure |
| REST | Representational State Transfer |
| SAE | Society of Automotive Engineers |
| SQL | Structured Query Language |
| SSR | Server-Side Rendering |
| TALIA | Threat Analysis and Learning Intelligence for Automotive |
| TARA | Threat Analysis and Risk Assessment |
| TLS | Transport Layer Security |
| UI | User Interface |
| UN | United Nations |
| UNECE | United Nations Economic Commission for Europe |
| UX | User Experience |
| V2I | Vehicle-to-Infrastructure |
| V2V | Vehicle-to-Vehicle |
| V2X | Vehicle-to-Everything |
| XSS | Cross-Site Scripting |
| YAML | YAML Ain't Markup Language |

### B. Weitere Ressourcen

**Standards:**
- ISO: https://www.iso.org
- SAE: https://www.sae.org
- UNECE: https://unece.org

**Security:**
- OWASP: https://owasp.org
- CVE: https://cve.mitre.org
- NVD: https://nvd.nist.gov

**Technologie:**
- Next.js: https://nextjs.org
- React: https://react.dev
- OpenAI: https://openai.com
- Vercel: https://vercel.com

**Datenschutz:**
- BfDI: https://www.bfdi.bund.de
- EDSA: https://edpb.europa.eu

### C. Projekt-Dokumentation

- [LASTENHEFT.md](./LASTENHEFT.md) - Anforderungsspezifikation
- [PFLICHTENHEFT.md](./PFLICHTENHEFT.md) - Technische Spezifikation
- [TECHNISCHE_DOKUMENTATION.md](./TECHNISCHE_DOKUMENTATION.md) - Tech Docs
- [KUNDENDOKUMENTATION.md](./KUNDENDOKUMENTATION.md) - User Manual
- [DATENSCHUTZERKLAERUNG.md](./DATENSCHUTZERKLAERUNG.md) - Privacy Policy

---

**Ende des Glossars**

*Für Ergänzungen oder Korrekturen: feedback@yourcompany.com*