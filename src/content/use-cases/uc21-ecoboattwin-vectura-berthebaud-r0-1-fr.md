---
id: uc21
title: EcoBoatTwin
provider: Vectura System
contacts:
  - name: Sébastien Berthebaud
    org: Vectura System
    email: sebastien.berthebaud@vectura-system.com
summary: >-
  Plateforme SaaS de jumeau numérique pour l'optimisation énergétique et la décarbonation des navires de travail (chalutiers, navires de service, pousseurs, barges), intégrant des modèles haute-fidélité multi-physiques calibrés sur mesures réelles, des simulations par scénarios et des modèles économiques/CO₂.
usersCount: 0
lang: fr
photo: /media/use-cases/uc21-ecoboattwin-vectura.png
# domain : industrial-engineering | energy | geospatial | maritime | telecommunications | environment | health | robotics | agriculture | other
domain: maritime
# maturity : concept | poc | prototype | operational
maturity: prototype
# originType : natural | anthropic | engineered | infrastructure | process
originType: engineered
# version : identifiant de version du UC (ex r0.1, r1.0, ...). La dernière est affichée par défaut sur la liste.
version: r0.1
# draft or published
status: published
tags:
  - maritime
  - navire
  - décarbonation
  - hybride
  - tco
  - roi
  - saas
publishedDate: 2026-06-23T00:00:00.000Z
---

## Résumé

Le système physique étudié est constitué de navires de travail — chalutiers, navires de service, pousseurs, barges — équipés de motorisations variées (diesel, hybride parallèle, électrique), de géométries de coques, d'hélices à pas variable ou fixe, de systèmes hydrauliques, d'engins de pêche et de consommateurs embarqués. Ces navires opèrent dans des environnements maritimes variables et génèrent des données hétérogènes : propulsion, état de mer, émissions, charges hydrauliques, profils d'usage.

EcoBoatTwin est une plateforme SaaS d'aide à la décision pour architectes navals, chantiers, armateurs et autorités publiques. Elle permet de simuler, optimiser et comparer des configurations de navires et des trajectoires de décarbonation, en intégrant des modèles énergétiques haute-fidélité (coque, hélice, moteur, hybride) calibrés sur mesures réelles, des jumeaux d'engins de pêche, des simulations basées sur scénarios et des modèles économiques/CO₂ (TCO, ROI).

Le jumeau interagit avec le jumeau physique par ingestion de données capteurs réelles (calibration des modèles), évaluation de variantes de conception et de rétrofit (hybridation, optimisation d'hélices), et simulation des besoins d'infrastructure portuaire pour une planification stratégique à l'échelle de la flotte.

---

## Description fonctionnelle

### Utilisateurs

- **Un architecte naval** — explore des variantes de conception (coque, hélice, propulsion) et évalue leur performance énergétique avant prototypage.
- **Un chantier naval** — dimensionne des rétrofits (hybridation, nouvelle motorisation, hélice optimisée) sur navires existants.
- **Un armateur** — arbitre les choix de motorisation et de calendrier de renouvellement de flotte en fonction du TCO et du ROI.
- **Une autorité publique / port** — modélise les besoins d'infrastructure (électrique, H₂) pour planifier les investissements à l'échelle d'une flotte.

### Besoins fonctionnels

- **Optimiser** · *Un architecte naval* veut simuler et optimiser des configurations de navire (combinaisons coque/hélice/propulsion) pour atteindre des objectifs énergétiques et environnementaux, en phase de conception. **Métrique :** ≥ 3 configurations comparées par scénario opérationnel, consommation et CO₂e quantifiés.

- **Diagnostiquer + Prédire** · *Un chantier naval* veut calibrer des modèles énergétiques haute-fidélité à partir des données capteurs réelles (exemple avec le jeu de données du projet HYBA, 80+ grandeurs enregistrées sur plusieurs mois) pour valider et améliorer la précision prédictive du jumeau. **Métrique :** écart consommation modèle vs mesures < seuil métier sur scénarios de référence.

- **Évaluer + Prédire** · *Un armateur* veut prédire le ROI de scénarios de rétrofit (hybridation, nouvelle motorisation) sur des cycles opérationnels réels pour décider d'un investissement. **Métrique :** ROI sur N années avec sensibilité aux prix énergie et subventions.

- **Optimiser** · *Une autorité publique* veut modéliser les besoins d'infrastructure portuaire (recharge électrique, H₂) pour une planification stratégique à l'échelle d'une flotte. **Métrique :** dimensionnement infrastructure aligné sur scénarios d'adoption.

- **Décrire + Évaluer** · *Différentes parties prenantes* veulent comparer des configurations et trajectoires sur des critères communs (énergie, CO₂e, coût) pour aligner les décisions. **Métrique :** tableau de bord comparatif multi-stakeholders.

---

## Caractérisation du Jumeau Numérique

*Grille basée sur le <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">framework unifié de Gil et al. (2024)</a> — 21 caractéristiques.*

### MC1 — Système étudié

Navires de travail réels (chalutiers, navires de service, pousseurs, barges) et leurs sous-systèmes : propulsion (diesel, hybride parallèle, électrique), coques, hélices à pas variable ou fixe, systèmes hydrauliques, engins de pêche, consommateurs embarqués. 

Environnement opérationnel : missions (pêche, remorquage, transport), état de mer, conditions météo, infrastructures portuaires.

### MC2 — Composants d'action physiques

Pas de boucle de commande directe : le JN est un outil d'aide à la décision pour la conception, le rétrofit et l'arbitrage stratégique. Les sorties pilotent des décisions humaines (architectes, armateurs) ou d'investissement (autorités publiques).

### MC3 — Composants de captation physiques

- 80+ canaux de capteurs embarqués (propulsion, hydraulique, état de mer, émissions, usage)
- Jeu de données de référence HYBA pour la calibration
- Données externes (bases de composants, futures APIs carburants)

### MC4 — Interaction physique → virtuel

Ingestion des données capteurs réelles pour la calibration des modèles énergétiques. Standardisation et calibration des 80+ canaux de capteurs hétérogènes. Fréquence et protocoles à préciser selon les contextes d'embarquement.

### MC5 — Interaction virtuel → physique

Pas de commande directe. Les sorties du JN orientent les choix de conception (architecte), de rétrofit (chantier), de motorisation (armateur) et d'infrastructure (port/autorité).

### MC6 — Services du JN

- Simulation et optimisation de configurations de navires et de trajectoires de décarbonation
- Calibration de modèles énergétiques haute-fidélité sur mesures réelles
- Évaluation de variantes de conception (hybridation, motorisation, hélice)
- Modélisation des besoins d'infrastructure portuaire (électrique, H₂)
- Prédiction du ROI sur cycles opérationnels réels
- Comparaison multi-parties prenantes (architectes, armateurs, autorités)

### MC7 — Échelle temporelle

Pas temps réel pour le moment : le JN est un outil de simulation et d'aide à la décision. Échelles d'analyse : mission (scénarios opérationnels), cycle de vie navire (conception, rétrofit), flotte (planification stratégique).

Il pourrait être envisagé dans un futur proche un usage embarqué pour de l'optimisation énergétique prédictive.

### MC8 — Multiplicités

Architecture multi-instance : un jumeau par navire ou par configuration-type. Agrégation à l'échelle d'une flotte pour la planification stratégique et l'infrastructure portuaire.

### MC9 — Phases du cycle de vie

Couvre la conception (variantes architecturales), le rétrofit (hybridation, optimisation), l'exploitation (calibration, comparaison de configurations) et la planification (infrastructure portuaire). LCA partielle via modélisation économique et CO₂.

### MC10 — Modèles et données

- **Modèles énergétiques haute-fidélité multi-physiques** : coque, hélice, moteur thermique, hybride, hydraulique
- **Jumeaux numériques d'engins de pêche**
- **Modèles économiques (TCO, ROI)**, CO₂ et infrastructure portuaire
- **Reconstruction 3D de coques** par scan / vidéo (coques « inconnues »)
- **Données** : jeu HYBA, mesures capteurs (80+ canaux), bases de composants, APIs carburants

### MC11 — Outils et facilitateurs

Plateforme SaaS web (UX/UI multi-niveau : utilisateurs basiques, avancés, professionnels). Détails techniques de la stack à préciser.

### MC12 — Constellation du JN

Pipeline : ingestion des mesures (HYBA et embarqué) → calibration des modèles multi-physiques (coque, hélice, moteur, hybride, hydraulique) → générateur de scénarios de mission → moteurs d'optimisation/simulation → modèles économiques (TCO, ROI) et infrastructure → interface multi-utilisateurs (macro-scénarios, scènes, simulations).

### MC13 — Processus de jumelage et évolution

Démarche incrémentale : extension du modèle énergétique aux différents types de navires (chalutiers, services, pousseurs, barges) et intégration progressive des engins de pêche. Calibration ouverte sur de nouveaux jeux de données embarquées.

### MC14 — Fidélité et validité

Calibration des modèles haute-fidélité sur 80+ canaux de mesures réelles (jeu HYBA). Validation par comparaison consommations modélisées vs mesurées sur scènes d'état de mer caractérisées. Reconstruction 3D approximative pour les coques non documentées.

### MC15 — Connexion technique

Ingestion via API depuis les systèmes embarqués et bases de composants. Protocoles et standards d'échange précis à préciser.

### MC16 — Hébergement / déploiement

SaaS — plateforme web hébergée. Détails (cloud, datacenter, multi-tenant) à préciser.

### MC17 — Insights et prise de décision

- Comparaison de configurations de navire avec consommation et CO₂e quantifiés par scène opérationnelle
- ROI de scénarios de rétrofit (hybridation, motorisation, hélice)
- Dimensionnement d'infrastructure portuaire
- Tableau de bord multi-stakeholders (architectes, armateurs, autorités publiques)

### MC18 — Intégration horizontale

Intégration de bases de composants externes et APIs carburants prévue. Connexion à des systèmes embarqués pour l'ingestion des mesures.

### MC19 — Propriété et confidentialité des données

Données embarquées (mesures de propulsion, usage) potentiellement sensibles (compétitivité armateur, propriété intellectuelle des architectes). Gouvernance à formaliser dans le contexte SaaS multi-stakeholder.

### MC20 — Standardisation

Standards énergétiques navals et reporting CO₂ à préciser. Standardisation des 80+ canaux de capteurs identifiée comme défi.

### MC21 — Sécurité et sûreté

Sécurité applicative SaaS (authentification, isolation des tenants). Pas de boucle de commande temps réel — risques de sûreté opérationnelle limités au périmètre décisionnel.

---

## Enjeux scientifiques et techniques

*Chaque enjeu est annoté par les questions de recherche (RQ_X) de la feuille de route EDT [[Combemale et al., 2025](https://inria.hal.science/hal-05223776)].*

### Automatisation des scénarios de mission

Générer automatiquement des scénarios de mission représentatifs (pêche de fond, pélagique, état de mer) pour l'évaluation et la comparaison de configurations.

RQ associées : RQ_D6 (évolution des modèles), RQ_E2 (modularisation)

### Intégration multi-physique

Coupler et aligner des modèles complexes : coque, hélice, moteur thermique, hybride, hydraulique. Enjeu de cohérence numérique, de temps de calcul et d'interfaces entre disciplines.

RQ associées : RQ_I3 (hybridation de modèles), RQ_I4 (opérateurs d'hybridation), RQ_F3 (composition et incertitude)

### Intégration de données hétérogènes

Standardiser et calibrer 80+ canaux de capteurs hétérogènes. Enjeux de qualité, d'horodatage, de cohérence sémantique.

RQ associées : RQ_D3 (collecte de données hétérogènes), RQ_D11 (interopérabilité sémantique), RQ_F1 (qualité des données)

### Système de gestion énergétique (EMS)

Algorithmes de coordination du système hybride sous contrainte de temps de calcul (intégration à des optimisations multi-scénarios).

RQ associées : RQ_I3 (hybridation de modèles), RQ_F4 (précision et fidélité)

### Reconstruction 3D de coques

Approximer les coques « inconnues » via scan 3D ou vidéo, pour calibrer le modèle hydrodynamique en l'absence de plans constructeurs.

RQ associées : RQ_D2 (incertitude des données, reconstruction sous observation partielle)

### Intégration de composants externes

Connecter des bases de composants (moteurs, batteries, hélices) et des APIs futures (carburants alternatifs : H₂, méthanol, etc.).

RQ associées : RQ_E3 (orchestration du déploiement), RQ_E6 (interopérabilité syntaxique)

### Modélisation économique et portuaire

Combiner TCO, ROI, modélisation d'infrastructure portuaire et schémas de subvention pour des arbitrages stratégiques cohérents.

RQ associées : RQ_E2 (modularisation) — partiellement hors taxonomie : recouvre des questions de support à la décision.

### Conception UX/UI multi-niveau

Adapter l'interface aux profils utilisateurs très contrastés : architecte naval, chantier, armateur, autorité publique, du niveau basique au professionnel.

RQ associées : RQ_U5 (utilisabilité), RQ_U6 (collaboration)

---

## Matériel

- [Jeu de données HYBA](https://www.francefilierepeche.fr/wp-content/uploads/2025/07/250625_HYBA-Rapport-Final.pdf) (mesures embarquées multi-canaux pour la calibration des modèles énergétiques)

## Références

- [Poster EcoBoatTwin](/media/use-cases/uc21-poster-ecoboattwin-vectura.pdf) — Use Case Workshop, Lyon, 6-7 janvier 2026
- Combemale B., Vicat-Blanc P., Blouin A., Bril El Haouzi H., Bruel J.-M. et al. [Engineering Digital Twins: A Research Roadmap](https://inria.hal.science/hal-05223776). EDTconf 2025 — 2nd International Conference on Engineering Digital Twins, Oct 2025, Grand Rapids, Michigan, United States. pp.1-7. ⟨hal-05223776⟩ — feuille de route scientifique du programme EDT (codes RQ_X).

## Thèses en cours
