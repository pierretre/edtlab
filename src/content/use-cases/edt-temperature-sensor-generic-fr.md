---
id: edt-temperature-sensor-generic
title: Capteur de température industriel — Jumeau numérique générique
summary: >-
  Jumeau numérique d'un capteur de température industriel : acquisition temps réel,
  agrégation multi-sondes, alertes de seuil, historique long-terme et simulateur intégré.
  Conçu comme cas générique pour illustrer un JN simple à partir d'un capteur connecté.
domain: industrial-engineering
maturity: operational
lang: fr
photo: /media/use-cases/edt-temperature-sensor-generic.png
schema: /media/use-cases/edt-temperature-sensor-generic-schema.svg
provider: EDT (programme Engineering Digital Twins)
originType: engineered
since: 2026-04-30
usagePhase: exploitation
usageLevel: consortium
users:
  - name: Opérateur de supervision
    role: Surveillance temps réel et acquittement des alertes
  - name: Ingénieur procédé
    role: Analyse des données historiques et calibration des seuils
  - name: Chercheur EDT
    role: Banc d'essai pour méthodes d'agrégation et de détection
objectives:
  - Acquérir et historiser la température en provenance d'un ou plusieurs capteurs
  - Détecter en temps réel les dépassements de seuil et émettre des alertes
  - Fournir une interface de supervision (tableau de bord) accessible depuis le poste opérateur
  - Permettre la rejouabilité de scénarios via un simulateur intégré, sans matériel physique
tags:
  - capteur-temperature
  - jumeau-numerique
  - supervision
  - alerte-seuil
  - simulation
  - generique
contacts:
  - name: Programme EDT
    org: France 2030 / Engineering Digital Twins
    email: contact@edtlab.fr
    role: Coordinateur
references:
  - title: Plateforme PTF — Plateforme de Fabrication de Jumeaux Numériques
    venue: edtlab.fr
    url: https://edtlab.fr/use-cases/
  - title: Capteur DS18B20 — Documentation technique
    venue: Maxim Integrated / Analog Devices
    url: https://www.analog.com/en/products/ds18b20.html
resources: []
license: CC-BY-4.0
publishedDate: 2026-04-30T00:00:00.000Z
lastUpdated: 2026-04-30T00:00:00.000Z
version: '0.1'
status: draft
previewToken: edt-temp-generic-2026
---

Cas d'usage générique illustrant un jumeau numérique de capteur de température industriel. Volontairement neutre (pas d'affiliation à un partenaire spécifique du consortium), il sert de référence pour démontrer la grille de caractérisation MC1–MC21 et la carte d'identité unifiée du Portfolio.

---

## Caractérisation du Jumeau Numérique

*Grille basée sur le <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">framework unifié de Gil et al. (2024)</a> — 21 caractéristiques.*

### MC1 — Système étudié

Dispositif de mesure de température composé d'un ou plusieurs capteurs (sonde PT100, DS18B20, thermocouple) connectés via USB ou bus série à un poste de supervision. Le système couvre l'acquisition de la mesure, son agrégation lorsqu'il y a plusieurs sondes, le calcul de moyennes glissantes, la détection de dépassement de seuils paramétrables, et la persistance long-terme des historiques.

### MC2 — Composants d'action physiques

Pas d'actionneur physique dans la version de base. Le système est observationnel : il informe l'opérateur ou un système amont. Une extension future pourrait piloter un dispositif de régulation (ventilateur, vanne) via une boucle de rétroaction.

### MC3 — Composants de captation physiques

- Un ou plusieurs capteurs de température (PT100, DS18B20, thermocouple)
- Bus de transmission (USB-série, 1-Wire, Modbus série)
- Poste hôte assurant l'alimentation et l'acquisition

### MC4 — Interaction physique → virtuel

Acquisition périodique (par défaut toutes les 5 secondes) des mesures de chaque sonde. Les valeurs sont horodatées (UTC), agrégées (moyenne sur les sondes co-localisées) et transmises au moteur de surveillance et à l'historique.

### MC5 — Interaction virtuel → physique

À compléter — non applicable dans la version observationnelle de base.

### MC6 à MC21 — À compléter

*Sections à compléter au fur et à mesure de la consolidation du cas générique.*

---

## Notes

- Ce UC est marqué `maturity: operational` pour illustrer le champ `usageLevel: consortium` introduit en HN-T009.
- Le `schema` pointe vers un SVG à produire (placeholder pour l'instant).
- Les `users`, `objectives`, `usagePhase` exercent les nouveaux champs structurés de la carte d'identité.
