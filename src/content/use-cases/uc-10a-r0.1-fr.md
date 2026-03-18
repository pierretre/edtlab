---
id: "UC-10a"
title: "Jumeaux numériques géographiques — Initiatives de recherche"
summary: "Panorama des initiatives de recherche sur les jumeaux numériques géographiques (territoires, villes, environnements), portées par IGN et CNRS, couvrant simulation urbaine, interopérabilité géospatiale, visualisation immersive et mobilité."
domain: geospatial
maturity: prototype        # concept | poc | prototype | operational
lang: fr
photo: "/media/use-cases/uc-10a.png"
tags:
  - geospatial
  - urban-simulation
  - territory
  - interoperability
  - immersive-visualisation
  - open-source
contacts:
  - name: "Mathieu BRÉDIF"
    org: "IGN / LASTIG / JNFT"
    email: "mathieu.bredif@ign.fr"
    role: "UC owner"
  - name: "Gilles GESQUIÈRE"
    org: "CNRS / Co-Dir. PEPR VDBI"
    email: "gilles.gesquiere@univ-lyon2.fr"
    role: "UC owner"
pepr: "VDBI"
references: []
resources: []
license: "CC-BY-4.0"
publishedDate: 2026-03-16
lastUpdated: 2026-03-16
version: "0.1"
status: published
---

## Jumeau physique

Le territoire au sens large : tout ce qui se trouve sur, au-dessus et en dessous du sol, incluant les humains, les infrastructures, les usages sociaux, les fonctions écosystémiques (climat, vivant, cycle de l'eau, habitats) et les construits sociétaux tels que la réglementation. Le Physical Twin couvre des échelles multiples, du bâtiment au territoire national.

## Jumeau numérique

Représentation territoriale dynamique et multi-échelle intégrant des données physiques, environnementales et socio-économiques. Le JN permet la simulation de phénomènes clés, des mises à jour collaboratives sécurisées et une aide à la décision basée sur les données. Il s'appuie sur un socle technique open source et des jeux de données 3D ouverts, couvrant plusieurs briques de recherche : simulation de l'évolution du bâti (SimPLU), interopérabilité en espace n-D (VCity), simulation de propagation épidémique (ICI), visualisation urbaine (CityFAB), simulation d'îlots de chaleur (URCLIM), simulation de mobilité (Terra Mobilita).

## Usages

- En tant qu'**urbaniste ou décideur territorial**, je veux **simuler l'impact de scénarios d'aménagement sur le bâti et les flux** afin d'**évaluer différentes options avant toute décision opérationnelle**, dans le contexte d'une planification urbaine soumise à des contraintes réglementaires et environnementales croissantes.

- En tant que **chercheur en épidémiologie**, je veux **simuler la propagation d'une épidémie dans un tissu urbain réel** afin d'**évaluer l'efficacité de mesures de gestion de crise**, dans le contexte d'une modélisation centrée sur les individus et les paramètres de planification urbaine.

- En tant qu'**ingénieur en mobilité**, je veux **générer des cartes d'occupation sémantiques et topologiques de l'espace public** afin de **modéliser et optimiser les flux de déplacements urbains**, dans le contexte d'une ville cherchant à réduire la congestion et à améliorer l'accessibilité.

- En tant que **développeur de jumeaux numériques territoriaux**, je veux **accéder à une infrastructure commune de données 3D ouvertes et interopérables** afin de **construire mes propres JN thématiques sans repartir de zéro**, dans le contexte d'un écosystème fragmenté où le manque d'infrastructure partagée freine la pérennité des initiatives.

## Technologies mobilisées

- SimPLU (simulation évolution du bâti)
- VCity (interopérabilité spatiotemporelle et sémantique)
- CityFAB (visualisation XR géolocalisée)
- URCLIM (géo-visualisation 3D des îlots de chaleur)
- Terra Mobilita (simulation de mobilité)
- Ontologies et web sémantique
- Données 3D ouvertes (orthoimages, MNS, maillages, vecteurs)
