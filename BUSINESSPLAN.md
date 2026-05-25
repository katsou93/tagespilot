# TagesPilot — Businessplan 2026

## Executive Summary

**TagesPilot** ist die erste KI-native Praxissoftware speziell für Tagespflegeeinrichtungen in Deutschland. Wir ersetzen Komda (40 Jahre alte Windows-Software, 596€/Monat) durch eine Cloud-native KI-Plattform für 199€/Monat — finanziert durch die staatliche GKV-Förderung nach § 8 Abs. 8 SGB XI (bis zu 12.000€ pro Einrichtung, gültig bis 2030).

**Das Marktfenster:** 7.184 Tagespflegen in DE, +10,3% Wachstum, TI-Pflicht seit Juli 2025, elektronische Abrechnung Pflicht ab Dezember 2026. Kein einziger KI-nativer Konkurrent.

---

## 1. Problem

Tagespflegeeinrichtungen in Deutschland arbeiten täglich mit:

- **Fahrtdienst per WhatsApp** — Inhaber koordiniert 8–12 Abholungen per Gruppe
- **Pflegedokumentation auf Papier** — 30–45 Min täglich pro Pflegekraft verschwendet
- **SGB XI-Abrechnung per Excel** — Fehlerquote ~8%, damit verlorene Einnahmen
- **Angehörigen-Kommunikation per Telefon** — 30+ Anrufe täglich
- **Komda als einzige Alternative** — 25.000€ im ersten Jahr, Windows-only, veraltet

---

## 2. Lösung

TagesPilot kombiniert drei KI-Module die so für Tagespflege noch nie existiert haben:

| Modul | Was es macht | Zeitersparnis |
|-------|-------------|---------------|
| **KI-Fahrtdienst** | Tägliche Routen automatisch optimiert, Rollstuhlanforderungen, Google Maps | 45 Min/Tag |
| **KI-Dokumentation** | Sprachnotiz → vollständiges MDK-Protokoll in Sekunden | 30 Min/Tag/Kraft |
| **KI-Abrechnung** | SGB XI-Tagessätze, Entlastungsbetrag, GKV-Einreichung fehlerlos | 3 Std/Monat |

---

## 3. Markt

| Kennzahl | Wert |
|----------|------|
| Tagespflegeeinrichtungen DE | 7.184 |
| Private Träger (Zielgruppe) | 3.060 (42,6%) |
| Wachstum p.a. | +10,3% |
| In Planung/Bau | 683 |
| Aktueller Software-Marktführer | Komda (40 Jahre alt) |
| KI-native Konkurrenten | 0 |
| GKV-Förderung je Einrichtung | bis 12.000€ (§ 8 Abs. 8 SGB XI, bis 2030) |

### Serviceable Market (Jahr 3)
- 3.000 private Tagespflegen × 199€/Monat = **7,16 Mio€ ARR** (theoretisch)
- Realistisches Ziel Jahr 3: **3% Marktanteil = ~90 Kunden = ~214k€ ARR**

---

## 4. Geschäftsmodell

### Preisstruktur

| Tier | Preis | Für |
|------|-------|-----|
| **Starter** | 99€/Mo | 1–10 Tagesgäste, Basis-Features |
| **Pro** | 199€/Mo | bis 25 Gäste, alle KI-Features |
| **Einrichtung+** | 299€/Mo | unbegrenzt, Analytics, Multi-Standort |

### Förderungs-Argument (Kern-USP)
- Komda: 596€/Mo = 12.000€ Förderung deckt nur 20 Monate
- TagesPilot Pro: 199€/Mo = **12.000€ Förderung deckt 60 Monate (5 Jahre)**
- Pitch: "Wir kosten Sie faktisch nichts — die Pflegekasse zahlt."

### Unit Economics
- Ø MRR/Kunde: 199€
- Entwicklungskosten: ~3.500€/Mo (IT-Partner)
- KI-API Kosten: ~15€/Kunde/Mo
- Bruttomargin: ~72%
- Breakeven: ~25 zahlende Kunden

---

## 5. Wettbewerb

| | Komda | Vivendi | TagesPilot |
|--|-------|---------|------------|
| Tagespflege-spez. | ✓ (40 Jahre alt) | ~ | ✓ (KI-nativ) |
| Preis Jahr 1 | ~25.600€ | ~15.000€+ | 2.388€ |
| Cloud-native | ✗ | ~ | ✓ |
| KI-Dokumentation | Basis | ✗ | ✓ vollständig |
| Angehörigen-App | ✗ | ✗ | ✓ |
| Förderung deckt | ~20 Monate | ~25 Monate | **60 Monate** |
| KI-Fahrtdienst | Nur Route | ✗ | ✓ vollständig |

---

## 6. Go-to-Market

### Phase 1 (Monate 1–3): Pilot
- 3 Tagespflegen kostenlos, volle Features
- Dafür: Referenz, Feedback, Video-Testimonial
- Kontakte: Bundesverband privater Anbieter sozialer Dienste (bpa)

### Phase 2 (Monate 4–6): Erste Zahlkunden
- Förderantrag-Workshop: "Wir holen euch 12.000€ GKV-Förderung"
- Ziel: 10 zahlende Einrichtungen bis Monat 6
- Kanal: bpa-Mitgliedermagazin, LinkedIn Tagespflege-Gruppen

### Phase 3 (Monate 7–12): Skalierung
- 30 Kunden = 5.970€ MRR
- ITSG-Zertifizierung für offizielle GKV-Abrechnung (parallel laufend)
- Partnerschaft mit Pflegekasse als Förder-Partner

### Viraler Wachstumsmechanismus
Tagespflegeleitungen kennen sich regional — 1 begeisterter Kunde = 5 Empfehlungen im Stadtgebiet.
Empfehlungsprogramm: 1 Monat gratis pro erfolgreicher Weiterempfehlung.

---

## 7. Produkt-Roadmap

### MVP (Monat 1–2) — Jetzt fertig
- [x] Dashboard mit Tagesübersicht
- [x] Gästeverwaltung & Pflegegrad-Stammdaten
- [x] Fahrtdienst-Planung mit Routen-Visualisierung
- [x] KI-Dokumentation (Claude API, Sprache → Protokoll)
- [x] Abrechnungsübersicht mit Recharts-Charts
- [x] Deploy-ready für Vercel

### Phase 2 (Monat 3–6)
- [ ] Echte Google Maps Integration (Fahrtdienst)
- [ ] Spracherkennung (Web Speech API) für Doku
- [ ] Angehörigen-App (separates Frontend)
- [ ] DATEV/Lexware-Schnittstelle für Lohnabrechnung
- [ ] Automatische Förderantrag-Generierung

### Phase 3 (Monat 7–12)
- [ ] ITSG-Zertifizierung → offizielle GKV §302-Abrechnung
- [ ] ePA-Anbindung (Telematikinfrastruktur)
- [ ] Qualitätsbericht MDK-automatisiert
- [ ] Multi-Einrichtungs-Verwaltung

---

## 8. Finanzen

### Kostenstruktur (Monat 1–6)

| Position | Kosten |
|----------|--------|
| IT-Partner (Entwicklung) | 3.500€/Mo |
| Claude API (KI) | 50–200€/Mo |
| Vercel Hosting | 20€/Mo |
| Marketing/Content | 300€/Mo |
| ITSG-Zertifizierung (einmalig) | ~8.000€ |
| **Gesamt** | **~4.100€/Mo + 8k einmalig** |

### Revenue-Projektion

| Zeitpunkt | Kunden | MRR | ARR |
|-----------|--------|-----|-----|
| Monat 3 | 3 (Pilot) | 0€ | — |
| Monat 6 | 10 | 1.990€ | 23.880€ |
| Monat 9 | 25 | 4.975€ | 59.700€ |
| Monat 12 | 50 | 9.950€ | 119.400€ |
| Jahr 2 | 150 | 29.850€ | 358.200€ |
| Jahr 3 | 300 | 59.700€ | 716.400€ |

### Breakeven: Monat 8–9 (bei ~25 Kunden)

---

## 9. Rollen

| Person | Rolle |
|--------|-------|
| Du (Business) | Vertrieb, Förderanträge, Verbände, Kundenbeziehungen |
| IT-Partner | Frontend/Backend, Claude API, Vercel-Deploy, ITSG |

---

## 10. Risiken & Gegenmaßnahmen

| Risiko | Gegenmaßnahme |
|--------|---------------|
| Komda upgradet KI | Schnell zu ersten 10 Kunden, Referenzen sichern |
| ITSG-Zertifizierung dauert | MVP ohne Abrechnung starten, Komda parallel nutzen |
| Niedriges Tech-Verständnis der Zielgruppe | Onboarding unter 60 Min, persönlicher Support |
| Fördertopf läuft aus | Förderung bis 2030 gesetzlich gesichert (PUEG) |

---

## 11. Nächste Schritte — die ersten 30 Tage

1. **Woche 1:** MVP auf Vercel deployen (GitHub → Vercel, 10 Minuten)
2. **Woche 2:** 5 Tagespflegen in Krefeld/NRW kontaktieren für Pilot-Gespräch
3. **Woche 3:** Fördercheck-Tool entwickeln (zeigt Einrichtungen ob sie noch Förderung beantragen können)
4. **Woche 4:** Ersten Pilot-Kunden onboarden, Feedback aufnehmen
5. **Monat 2:** bpa-Regionalverband NRW kontaktieren für Partnerschaft

---

*TagesPilot — Die erste KI-native Software für Tagespflege · Krefeld, 2026*
