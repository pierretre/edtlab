---
id: uc25
title: Stockage géologique CO₂
provider: IFP Energies nouvelles
contacts:
  - name: Abir El Feki
    org: IFP Energies nouvelles
    email: abir.el-feki@ifpen.fr
    role: Digitalization Project Manager
summary: >-
  Jumeau numérique de surveillance d'un stockage géologique de CO₂ en aquifère salin, permettant l'assimilation de données en quasi-temps réel, la prédiction du comportement dynamique du réservoir, la quantification des risques et la détection d'anomalies (fuites, non-conformités).
usersCount: 0
lang: fr
# domain : industrial-engineering | energy | geospatial | maritime | telecommunications | environment | health | robotics | agriculture | other
domain: energy
# maturity : concept | poc | prototype | operational
maturity: poc
# originType : natural | anthropic | engineered | infrastructure | process
originType: natural
# version : identifiant de version du UC (ex r0.1, r1.0, ...). La dernière est affichée par défaut sur la liste.
version: r0.1
# draft or published
status: draft
tags:
  - co2
  - stockage-géologique
  - aquifère
  - surveillance
  - assimilation-de-données
  - géothermie
publishedDate: 2026-06-24T00:00:00.000Z
---

## Résumé

Le système physique est un site de stockage géologique de CO₂ dans un aquifère salin, comprenant le réservoir souterrain (roches poreuses et perméables), les fluides (CO₂ supercritique et saumure), les puits d'injection et les équipements de surface associés.

Le jumeau numérique est un système de surveillance conçu pour mettre à jour en continu les paramètres et l'état du réservoir par assimilation de données, prédire son évolution dynamique sur des horizons pluridécennaux, quantifier les risques associés et détecter les anomalies (fuites, non-conformités). Au démarrage du projet, le JN consiste en un POC initial implémentant une brique fonctionnelle unique avec des modèles de substitution rapides, une visualisation de base et un affichage de données en quasi-temps réel dans une application web. FIWARE a été identifié comme dorsale open-source potentielle pour la future architecture.

---

## Description fonctionnelle

### Utilisateurs

- **Un ingénieur de surveillance de site** - surveille en continu l'état du stockage, interprète les alertes et valide les prédictions du JN.
- **Un décideur opérationnel** - ajuste les paramètres d'injection et les plans de surveillance sur la base des recommandations du JN.
- **Un expert en risques et conformité réglementaire** - évalue les risques de fuite, vérifie la conformité avec le cadre réglementaire européen sur le stockage géologique de CO₂.
- **Un chercheur en géosciences / modélisation** - calibre et améliore les modèles de réservoir, valide les stratégies d'assimilation de données.

### Besoins fonctionnels

- **Décrire + Prédire** · *Un ingénieur de surveillance* veut disposer d'une représentation à jour de l'état du réservoir (pression, température, saturation en gaz, fraction molaire CO₂ dissous) pour anticiper son évolution sur 0 à 30 ans. **Métrique :** prédictions cohérentes avec les observations sur le pas de temps annuel.

- **Détecter + Alerter** · *Un décideur opérationnel* veut être alerté en quasi-temps réel d'anomalies (comportement anormal de la pression, potentiel de fuite) pour déclencher des actions correctives. **Métrique :** délai de détection inférieur à un seuil défini, taux de faux positifs maîtrisé.

- **Quantifier + Évaluer** · *Un expert risques* veut obtenir des évaluations probabilistes des risques (fuite hors réservoir, surpression) mises à jour au fil des données pour alimenter le reporting réglementaire. **Métrique :** intervalles de confiance sur les risques quantifiés par scénario.

- **Optimiser** · *Un ingénieur de surveillance* veut identifier les stratégies d'acquisition de données (type, localisation, fréquence) les plus informatives pour améliorer la précision des modèles tout en maîtrisant les coûts. **Métrique :** réduction de l'incertitude des paramètres clés pour un budget d'instrumentation donné.

---

## Caractérisation du Jumeau Numérique

*Grille basée sur le <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">framework unifié de Gil et al. (2024)</a> - 21 caractéristiques.*

### MC1 - Système étudié

Site de stockage géologique de CO₂ dans un aquifère salin profond : réservoir poreux et perméable (maillage radial 2D, NX=100, NZ=20), fluides (CO₂ supercritique et saumure), puits d'injection et couche de couverture. Contexte opérationnel : installation de stockage avec unité de capture et puits d'injection.

### MC2 - Composants d'action physiques

Équipements de contrôle du puits d'injection (vannes, débitmètres). Dans le POC actuel, le JN est un outil de surveillance et d'aide à la décision ; les actions physiques restent sous contrôle humain. Objectif futur : recommandations automatisées sur les paramètres d'injection.

### MC3 - Composants de captation physiques

- Capteurs de pression et de température dans les puits d'injection et de surveillance
- Capteurs géochimiques (composition des fluides)
- Réseau sismique (microsismicité)
- Potentiellement : données satellitaires de déformation de surface (InSAR)
- Données d'exploitation (débit d'injection, volumes cumulés)

### MC4 - Interaction physique → virtuel

Acquisition de données depuis les capteurs de puits pour alimenter les algorithmes d'assimilation et mettre à jour les paramètres du modèle de réservoir. Dans le POC : pas de temps annuel (Time step of 1Y, horizon 0-30 ans). Objectif futur : assimilation en quasi-temps réel via FIWARE.

### MC5 - Interaction virtuel → physique

Pas de boucle de contrôle automatique actuellement. Le JN produit des prédictions et alertes (anomalies, risques de fuite) transmises aux opérateurs pour ajuster les paramètres d'injection ou déclencher des interventions de surveillance.

### MC6 - Services du JN

- Simulation de l'évolution du réservoir (température, pression, saturation en gaz, fraction molaire CO₂ dissous)
- Assimilation de données pour la mise à jour des paramètres et de l'état du système
- Quantification et mise à jour des risques (fuite, surpression)
- Détection et anticipation d'anomalies
- Recommandations sur les stratégies optimales d'acquisition de données

### MC7 - Échelle temporelle

Horizons de simulation de 0 à 30 ans, pas de temps annuel dans le POC. Objectif à terme : assimilation en quasi-temps réel (heures à jours) pour la surveillance opérationnelle.

### MC8 - Multiplicités

Modèle géologique 2D radial représentant un puits d'injection central et le réservoir environnant. Extension future prévue : multi-puits, échelle du réservoir complet, intégration des installations de surface.

### MC9 - Phases du cycle de vie

Phase d'exploitation et de surveillance du site de stockage (injection active et post-injection). Le JN supporte également la planification (stratégie de surveillance, optimisation des campagnes de mesure).

### MC10 - Modèles et données

- **Modèles de réservoir 2D radiaux** (R core) : simulation des écoulements CO₂/saumure, basée sur les équations de transport en milieu poreux
- **Modèles de substitution rapides** (surrogate models) : proxies des simulations haute-fidélité pour l'assimilation en quasi-temps réel
- **Moteur Python** : assimilation de données, construction et mise à jour des modèles ML
- **Sorties d'intérêt** : température, pression, saturation en gaz, fraction molaire du CO₂ dissous, évolution temporelle sur la carte NX=100 × NZ=20
- **FIWARE** : backbone IoT pour la future architecture de collecte de données

### MC11 - Outils et facilitateurs

R (modèles et simulateurs), Python (moteur d'assimilation et ML), FIWARE (backbone IoT, future architecture), application web de visualisation ([co2-storage.fastit.dev](https://co2-storage.fastit.dev/)).

### MC12 - Constellation du JN

Pipeline : acquisition de données (capteurs puits, surface) → assimilation et mise à jour des paramètres → simulation du réservoir (surrogate models) → quantification des incertitudes → détection d'anomalies et évaluation des risques → visualisation et tableau de bord.

### MC13 - Processus de jumelage et évolution

Démarche incrémentale : POC initial (brique fonctionnelle unique) → intégration de nouvelles sources de données → extension de l'architecture vers FIWARE → généralisation à d'autres applications souterraines (géothermie) via des ontologies contextualisées.

### MC14 - Fidélité et validité

Modèles de substitution calibrés sur des simulations de référence haute-fidélité. Validation à établir sur des données de terrain réelles. Propagation des incertitudes sur les paramètres physiques (perméabilité, porosité, etc.) à formaliser.

### MC15 - Connexion technique

Application web externe pour la visualisation et le display quasi-temps réel ([co2-storage.fastit.dev](https://co2-storage.fastit.dev/)). FIWARE identifié pour la future intégration des flux de capteurs IoT. Protocoles d'échange avec les systèmes d'acquisition de terrain à définir.

### MC16 - Hébergement / déploiement

Application web déployée ([co2-storage.fastit.dev](https://co2-storage.fastit.dev/)). Solution cible : intégration complète (Fully integrated solution) via FIWARE. Détails d'hébergement (cloud, on-premise) à préciser.

### MC17 - Insights et prise de décision

- Prédictions probabilistes de l'état actuel et futur du réservoir (pression, saturation, fraction molaire CO₂)
- Mise à jour des évaluations de risque (fuites, surpression) au fil des données
- Alertes en cas de détection d'anomalies
- Recommandations sur les stratégies optimales d'acquisition de données

### MC18 - Intégration horizontale

Architecture conçue pour être générique et réutilisable à d'autres échelles (du puits unique au réservoir complet et aux installations de surface) et à d'autres applications souterraines (géothermie) via des ontologies contextualisées.

### MC19 - Propriété et confidentialité des données

Données de surveillance du site de stockage potentiellement sensibles (capacités, comportement du réservoir, incidents). Conformité avec le cadre réglementaire européen de surveillance des sites de stockage géologique de CO₂ (Directive 2009/31/CE) à intégrer.

### MC20 - Standardisation

Ontologies contextualisées pour la réutilisabilité inter-applications souterraines. Alignement avec les standards de l'industrie pétrolière et gazière pour la modélisation de réservoir. Conformité avec le cadre réglementaire européen de surveillance des stockages CO₂.

### MC21 - Sécurité et sûreté

Enjeu central de sûreté : détection précoce de fuites de CO₂ hors du réservoir. Le JN est un outil de surveillance critique pour garantir l'intégrité du site et la conformité réglementaire. Sécurité de l'application web (authentification, contrôle d'accès) à assurer.

---

## Enjeux scientifiques et techniques

*Chaque enjeu est annoté par les questions de recherche (RQ_X) de la feuille de route EDT [[Combemale et al., 2025](https://inria.hal.science/hal-05223776)].*

### Assimilation de données en quasi-temps réel

Intégrer des flux de données hétérogènes et bruités (pression, température, sismicité) dans des modèles physiques de réservoir pour maintenir une représentation à jour de l'état du système. Enjeu de latence, de cohérence des formats et de robustesse aux données manquantes.

RQ associées : RQ_D3 (collecte de données hétérogènes), RQ_D2 (incertitude des données)

### Modèles de substitution pour la simulation rapide

Construire et mettre à jour en continu des surrogate models (modèles ML) précis et rapides en remplacement des simulations de réservoir haute-fidélité, pour permettre l'assimilation et l'exploration de scénarios en quasi-temps réel.

RQ associées : RQ_I3 (hybridation de modèles), RQ_I4 (opérateurs d'hybridation)

### Quantification et propagation des incertitudes

Caractériser les incertitudes sur les paramètres physiques (perméabilité, porosité, conditions aux limites) et les propager jusqu'aux prédictions et évaluations de risque pour produire des intervalles de confiance exploitables par les opérateurs.

RQ associées : RQ_D2 (incertitude des données), RQ_I5 (enveloppe de validité), RQ_F3 (composition et incertitude)

### Détection d'anomalies et gestion des risques

Identifier en quasi-temps réel des comportements anormaux du réservoir (surpression, migration de CO₂ hors du réservoir prévu) et mettre à jour les évaluations de risque pour déclencher des actions correctives au bon moment.

RQ associées : RQ_F4 (analyse de défaillances), RQ_F1 (vérification formelle)

### Optimisation des stratégies d'acquisition de données

Déterminer le type, la localisation et la fréquence optimaux des mesures pour améliorer la précision des modèles et réduire les incertitudes critiques, tout en maîtrisant les coûts d'instrumentation et de surveillance.

RQ associées : RQ_D3 (collecte de données hétérogènes), RQ_D4 (qualité et couverture des données)

### Généricité et réutilisabilité via les ontologies

Concevoir le JN pour qu'il soit applicable à d'autres contextes souterrains (géothermie, autres aquifères, autres échelles) sans reprise majeure, en s'appuyant sur des ontologies contextualisées interopérables.

RQ associées : RQ_D11 (interopérabilité sémantique), RQ_D6 (évolution des modèles), RQ_E2 (modularisation)

---

## Matériel

- Application web de démonstration : [co2-storage.fastit.dev](https://co2-storage.fastit.dev/)

## Références

- [Poster Stockage géologique CO₂](/media/use-cases/uc25-poster-co2storage-ifpen.pdf) - Use Case Workshop, Lyon, 6-7 janvier 2026

## Thèses en cours
