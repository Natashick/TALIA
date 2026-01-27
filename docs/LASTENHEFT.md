# LASTENHEFT
## Anforderungsspezifikation für das System TALIA
### Threat Analysis and Learning Intelligence for Automotive

---

**Dokumentversion:** 1.0  
**Datum:** 27.01.2026  
**Status:** Genehmigt  
**Autor:** Natashick  
**Auftraggeber:** [Organisationsname]  
**Projekt:** TALIA - KI-Assistent für Sicherheitsbedrohungsanalyse

---

## 1. EINLEITUNG

### 1.1 Zweck des Dokuments
Dieses Dokument definiert die Anforderungen des Auftraggebers an die Entwicklung der Webanwendung **TALIA** (Threat Analysis and Learning Intelligence for Automotive) - ein intelligentes System zur Analyse von Sicherheitsbedrohungen unter Verwendung künstlicher Intelligenz.

### 1.2 Anwendungsbereich
Das System ist bestimmt für:
- Analyse von IT-Sicherheitsbedrohungen in der Automobilindustrie
- Beratung zu Cybersicherheitsfragen
- Schulung und Information von Sicherheitsspezialisten
- Interaktive Kommunikation über eine Chat-Schnittstelle

### 1.3 Zielgruppe
- IT-Sicherheitsspezialisten
- Automobilingenieure
- Leiter von Sicherheitsabteilungen
- Bedrohungsanalysten
- Technische Berater

---

## 2. SYSTEMBESCHREIBUNG

### 2.1 Systemzweck
TALIA ist eine Webanwendung mit Chat-Schnittstelle, die die Funktionen der OpenAI Assistants API nutzt, um fachkundige Beratung zu Sicherheitsfragen in der Automobilbranche bereitzustellen.

### 2.2 Hauptfunktionen
1. **Interaktive Chat-Schnittstelle**
   - Eingabe von Fragen im Textformat
   - Erhalt strukturierter Antworten mit Markdown-Unterstützung
   - Speicherung des Gesprächsverlaufs innerhalb der Sitzung

2. **Sicherheitsbedrohungsanalyse**
   - Beratung zu Cybersicherheitsfragen
   - Analyse potenzieller Schwachstellen
   - Empfehlungen zum Schutz von Systemen

3. **Schulung und Information**
   - Erklärung von Sicherheitskonzepten
   - Bereitstellung aktueller Informationen
   - Unterstützung bei Entscheidungsfindung

---

## 3. FUNKTIONALE ANFORDERUNGEN

### 3.1 Benutzeroberfläche

#### FA-UI-001: Hauptseite
**Priorität:** Hoch  
**Beschreibung:** Das System muss eine intuitive Chat-Oberfläche bereitstellen
- Logo und Systemname im Header
- Bereich zur Anzeige des Nachrichtenverlaufs
- Texteingabefeld
- Senden-Button

#### FA-UI-002: Nachrichtenanzeige
**Priorität:** Hoch  
**Beschreibung:** Nachrichten müssen als Dialog angezeigt werden
- Benutzernachrichten werden rechts ausgerichtet
- Assistentennachrichten werden links ausgerichtet
- Visuelle Unterscheidung zwischen Nachrichtentypen
- Markdown-Formatierungsunterstützung in Antworten

#### FA-UI-003: Texteingabe
**Priorität:** Hoch  
**Beschreibung:** Benutzer müssen komfortable Eingabemöglichkeiten haben
- Mehrzeiliges Textfeld
- Nachricht senden per Enter-Taste
- Zeilenumbruch per Shift+Enter
- Placeholder mit Hinweis

#### FA-UI-004: Statusanzeige
**Priorität:** Mittel  
**Beschreibung:** System muss Benutzer über aktuellen Status informieren
- Indikator "TALIA tippt..." während der Verarbeitung
- Eingabesperre während Anfrageverarbeitung
- Visuelles Feedback bei Aktionen

### 3.2 Chat-Funktionalität

#### FA-CHAT-001: Sitzungserstellung
**Priorität:** Hoch  
**Beschreibung:** Beim ersten Zugriff erstellt das System automatisch eine neue Sitzung (Thread)
- Automatische Initialisierung beim Laden
- Speicherung der Sitzungs-ID im lokalen Speicher
- Wiederherstellung der Sitzung bei erneutem Besuch

#### FA-CHAT-002: Nachrichten senden
**Priorität:** Hoch  
**Beschreibung:** Benutzer können Textnachrichten senden
- Validierung nicht-leerer Texte
- Hinzufügen der Nachricht zum Verlauf
- Versand an Server zur Verarbeitung

#### FA-CHAT-003: Antworten empfangen
**Priorität:** Hoch  
**Beschreibung:** System erhält und zeigt Antworten vom KI-Assistenten an
- Warten auf Verarbeitungsabschluss
- Erhalt strukturierter Antworten
- Anzeige mit Markdown-Unterstützung

#### FA-CHAT-004: Gesprächsverlauf
**Priorität:** Mittel  
**Beschreibung:** Speicherung des Gesprächskontexts
- Speicherung aller Nachrichten innerhalb der Sitzung
- Automatisches Scrollen zur letzten Nachricht
- Anzeige chronologischer Reihenfolge

#### FA-CHAT-005: Fehlerbehandlung
**Priorität:** Hoch  
**Beschreibung:** System muss Fehler korrekt behandeln
- Wiederherstellung bei Sitzungsablauf
- Erstellung neuer Sitzung bei 404-Fehler
- Information des Benutzers über Fehler

### 3.3 Backend-Funktionalität

#### FA-API-001: Gesundheitscheck
**Priorität:** Mittel  
**Beschreibung:** Endpunkt zur Überprüfung der Funktionsfähigkeit
- GET /api/health
- Gibt Status "ok" zurück

#### FA-API-002: Thread-Erstellung
**Priorität:** Hoch  
**Beschreibung:** API zur Erstellung einer neuen Dialogsitzung
- POST /api/assistants/threads
- Gibt thread_id zurück
- Integration mit OpenAI API

#### FA-API-003: Nachrichten senden
**Priorität:** Hoch  
**Beschreibung:** API zur Verarbeitung von Benutzernachrichten
- POST /api/assistants/threads/:threadId/messages
- Empfängt Nachrichtentext
- Erstellt Run in OpenAI
- Wartet auf Verarbeitungsabschluss (Polling)
- Gibt Assistentenantwort zurück

#### FA-API-004: Fallback-Mechanismus
**Priorität:** Hoch  
**Beschreibung:** Automatische Wiederherstellung bei Fehlern
- Erkennung nicht existierender Threads
- Automatische Erstellung eines neuen Threads
- Erneute Nachrichtenübermittlung

---

## 4. NICHT-FUNKTIONALE ANFORDERUNGEN

### 4.1 Performance

#### NFA-PERF-001: Antwortzeit
**Beschreibung:** System muss auf Benutzeraktionen reagieren
- Visuelles Feedback < 100ms
- Anwendungsinitialisierung < 3s
- Nachrichtenverarbeitung abhängig von OpenAI API (typisch 5-30s)

#### NFA-PERF-002: Polling
**Beschreibung:** Überprüfung des Nachrichtenverarbeitungsstatus
- Abfrageintervall: 1 Sekunde
- Maximale Anzahl Versuche: 90 (90 Sekunden Timeout)

### 4.2 Benutzerfreundlichkeit (Usability)

#### NFA-UX-001: Intuitivität
**Beschreibung:** Oberfläche muss ohne Schulung verständlich sein
- Minimalistisches Design
- Standard-Interaktionsmuster
- Hinweise und Platzhalter

#### NFA-UX-002: Responsive Design
**Beschreibung:** Korrekte Darstellung auf verschiedenen Geräten
- Unterstützung für Desktop-Auflösungen
- Anpassung für Bildschirme < 900px
- Mobile Optimierung

#### NFA-UX-003: Barrierefreiheit
**Beschreibung:** Einhaltung von Accessibility-Prinzipien
- Unterstützung für Tastaturnavigation
- Focus-Indikatoren
- Unterstützung für prefers-reduced-motion

### 4.3 Sicherheit

#### NFA-SEC-001: Schutz von API-Schlüsseln
**Beschreibung:** Kritische Daten dürfen für Client nicht zugänglich sein
- API-Schlüssel nur serverseitig gespeichert
- Umgebungsvariablen für Konfiguration
- Keine Zugangsdaten im Code

#### NFA-SEC-002: Validierung von Eingabedaten
**Beschreibung:** Alle eingehenden Daten müssen validiert werden
- Überprüfung des JSON-Formats
- Validierung erforderlicher Parameter
- Behandlung fehlerhafter Daten

#### NFA-SEC-003: Aktualisierung von Abhängigkeiten
**Beschreibung:** Verwendung aktueller Bibliotheksversionen
- Regelmäßige Sicherheitsprüfungen (npm audit)
- Update kritischer Schwachstellen
- CVE-Überwachung

### 4.4 Zuverlässigkeit

#### NFA-REL-001: Fehlerbehandlung
**Beschreibung:** System muss alle Fehlertypen korrekt behandeln
- Try-catch-Blöcke für asynchrone Operationen
- Informative Fehlermeldungen
- Graceful Degradation

#### NFA-REL-002: Sitzungswiederherstellung
**Beschreibung:** Automatische Wiederherstellung bei Sitzungsverlust
- Erkennung abgelaufener Threads
- Erstellung neuer Threads
- Speicherung des Benutzerkontexts

### 4.5 Kompatibilität

#### NFA-COMP-001: Browser
**Beschreibung:** Unterstützung moderner Webbrowser
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

#### NFA-COMP-002: Node.js
**Beschreibung:** Anforderungen an Server-Umgebung
- Node.js 18+ (empfohlen 20+)
- npm für Paketverwaltung

---

## 5. TECHNOLOGISCHE ANFORDERUNGEN

### 5.1 Frontend Framework
**Anforderung:** Next.js 15+ mit App Router
**Begründung:** 
- Modernes React-Framework
- Server-side Rendering und Optimierung
- Integriertes Routing

### 5.2 UI Framework
**Anforderung:** React 19+
**Begründung:**
- Komponentenarchitektur
- Effizientes Rendering
- Großes Ökosystem

### 5.3 Styling
**Anforderung:** CSS Modules + Custom CSS
**Begründung:**
- Isolierte Styles
- Volle Kontrolle über Design
- Unterstützung für CSS-Variablen

### 5.4 KI-Integration
**Anforderung:** OpenAI Assistants API
**Begründung:**
- Thread-basierte Konversationen
- Verwalteter Kontext
- Hohe Antwortqualität

### 5.5 Markdown-Rendering
**Anforderung:** react-markdown mit remark-gfm
**Begründung:**
- Sicheres Markdown-Rendering
- GitHub Flavored Markdown
- Unterstützung für Tabellen und Listen

---

## 6. ANFORDERUNGEN AN DIE BEREITSTELLUNG

### 6.1 Plattform
**Anforderung:** Vercel (empfohlen) oder ähnliche Serverless-Plattform
**Begründung:**
- Native Next.js-Unterstützung
- Automatische Skalierung
- Globales CDN

### 6.2 Umgebungsvariablen
**Erforderlich:**
- `OPENAI_API_KEY` - OpenAI API-Schlüssel (Format: sk...)
- `OPENAI_ASSISTANT_ID` - Assistenten-ID (Format: asst...)

### 6.3 Build-Konfiguration
**Anforderung:** Deaktivierung von Turbopack für Kompatibilität
```bash
npm run build
```

---

## 7. EINSCHRÄNKUNGEN UND ANNAHMEN

### 7.1 Einschränkungen

#### LIMIT-001: Abhängigkeit von OpenAI
**Beschreibung:** System ist vollständig abhängig von der Verfügbarkeit der OpenAI API
- Aktiver API-Schlüssel erforderlich
- Rate-Limit-Beschränkungen von OpenAI
- Abhängigkeit von OpenAI-Service-Uptime

#### LIMIT-002: Verarbeitungs-Timeout
**Beschreibung:** Maximale Verarbeitungszeit einer Anfrage ist begrenzt
- 90 Sekunden für Antworterhalt
- Kann für komplexe Anfragen unzureichend sein

#### LIMIT-003: Serverless-Einschränkungen
**Beschreibung:** Einschränkungen der Serverless-Umgebung
- Maximale Funktionsausführungszeit
- Speicherbeschränkungen
- Cold Starts

### 7.2 Annahmen

#### ANNAHME-001: Netzwerkverbindung
**Beschreibung:** Stabile Internetverbindung wird vorausgesetzt
- Benutzer hat Internetzugang
- Verbindungsgeschwindigkeit ist ausreichend

#### ANNAHME-002: Moderne Browser
**Beschreibung:** Zielgruppe verwendet moderne Browser
- Unterstützung für ES2020+
- localStorage API
- Fetch API

#### ANNAHME-003: Englische Oberfläche
**Beschreibung:** Hauptsprache der Oberfläche ist Englisch
- Antworten in anderen Sprachen möglich
- Abhängig von Assistentenkonfiguration

---

## 8. ABNAHMEKRITERIEN

### 8.1 Funktionale Kriterien

✅ **AK-FUNKT-001:** Benutzer kann Anwendung öffnen und Chat-Oberfläche sehen  
✅ **AK-FUNKT-002:** System erstellt automatisch neue Sitzung beim ersten Zugriff  
✅ **AK-FUNKT-003:** Benutzer kann Nachricht senden und Antwort erhalten  
✅ **AK-FUNKT-004:** Antworten werden mit korrekter Markdown-Formatierung angezeigt  
✅ **AK-FUNKT-005:** Gesprächsverlauf wird innerhalb der Sitzung gespeichert  
✅ **AK-FUNKT-006:** Bei 404-Fehler wird automatisch neuer Thread erstellt  
✅ **AK-FUNKT-007:** Alle API-Endpunkte funktionieren korrekt  

### 8.2 Technische Kriterien

✅ **AK-TECH-001:** Anwendung lässt sich fehlerfrei kompilieren  
✅ **AK-TECH-002:** Alle Abhängigkeiten sind korrekt installiert  
✅ **AK-TECH-003:** API-Schlüssel sind geschützt und clientseitig nicht zugänglich  
✅ **AK-TECH-004:** Keine kritischen Sicherheitslücken vorhanden  
✅ **AK-TECH-005:** Anwendung funktioniert in Serverless-Umgebung  

### 8.3 UX-Kriterien

✅ **AK-UX-001:** Oberfläche ist intuitiv verständlich  
✅ **AK-UX-002:** Visuelles Feedback auf Benutzeraktionen  
✅ **AK-UX-003:** Korrekte Funktion bei Desktop-Auflösungen  
✅ **AK-UX-004:** Anzeige des Verarbeitungsprozesses  

---

## 9. RISIKEN UND GEGENMASSNAHMEN

### 9.1 Risiken

| ID | Risiko | Wahrscheinlichkeit | Auswirkung | Gegenmaßnahme |
|----|--------|-------------------|------------|---------------|
| RISIKO-001 | Ausfall OpenAI API | Niedrig | Hoch | Benutzerinformation, Retry-Mechanismus |
| RISIKO-002 | Überschreitung Rate Limits | Mittel | Mittel | Nutzungsüberwachung, Anfragenwarteschlangen |
| RISIKO-003 | Serverless Timeout | Mittel | Mittel | Polling-Optimierung, Timeout-Erhöhung |
| RISIKO-004 | Abhängigkeits-Schwachstellen | Mittel | Hoch | Regelmäßige Audits, automatische Updates |
| RISIKO-005 | Veraltete Abhängigkeiten | Mittel | Niedrig | Monitoring (node-domexception) |

---

## 10. ANFORDERUNGEN AN DIE DOKUMENTATION

### 10.1 Technische Dokumentation
- Systemarchitektur
- API-Dokumentation
- Komponentendiagramme
- Beschreibung der Datenstrukturen

### 10.2 Benutzerdokumentation
- Benutzerhandbuch
- Häufig gestellte Fragen (FAQ)
- Verwendungsbeispiele

### 10.3 Betriebsdokumentation
- Bereitstellungsanweisungen
- Umgebungskonfiguration
- Monitoring und Logging

---

## 11. GLOSSAR

| Begriff | Definition |
|---------|------------|
| **TALIA** | Threat Analysis and Learning Intelligence for Automotive - Systemname |
| **Thread** | Dialogsitzung in der OpenAI Assistants API |
| **Run** | Prozess der Nachrichtenverarbeitung durch den Assistenten |
| **Assistant** | KI-Agent von OpenAI mit definierten Anweisungen |
| **Polling** | Periodische Überprüfung des Operationsstatus |
| **Serverless** | Architektur ohne Serververwaltung (Functions as a Service) |
| **Cold Start** | Verzögerung beim ersten Start einer Serverless-Funktion |
| **Rate Limit** | Begrenzung der API-Anfragen |

---

## 12. ANHÄNGE

### Anhang A: Umgebungsvariablen
```bash
OPENAI_API_KEY=sk-********************************
OPENAI_ASSISTANT_ID=asst_********************************
```

### Anhang B: API-Endpunkte
```
GET  /api/health
POST /api/assistants/threads
POST /api/assistants/threads/:threadId/messages
```

---

## UNTERSCHRIFTEN UND GENEHMIGUNGEN

| Rolle | Name | Unterschrift | Datum |
|-------|------|--------------|-------|
| Auftraggeber | | | |
| Projektleiter | | | |
| Technischer Leiter | | | |

---

**Ende des Dokuments**

*Dokument erstellt gemäß internationalen Softwareentwicklungsstandards und Anforderungen an Projektdokumentation.*