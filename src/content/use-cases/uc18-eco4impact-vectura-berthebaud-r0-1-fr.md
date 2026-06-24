---
id: uc18
title: eco4impact
provider: Vectura System
contacts:
  - name: Sébastien Berthebaud
    org: Vectura System
    email: sebastien.berthebaud@vectura-system.com
summary: >-
  Plateforme SaaS de jumeau numérique pour la décarbonation prédictive des flottes de transport routier (ICE, BEV, FCEV), couvrant la planification stratégique 2030-2050 et la planification tactique/journalière via Digital Truck Twins, génération de scénarios et modèles économiques/CO₂.
usersCount: 0
lang: fr
photo: /media/use-cases/uc18-eco4impact-vectura.png
# domain : industrial-engineering | energy | geospatial | maritime | telecommunications | environment | health | robotics | agriculture | other
domain: energy
# maturity : concept | poc | prototype | operational
maturity: prototype
# originType : natural | anthropic | engineered | infrastructure | process
originType: engineered
# version : identifiant de version du UC (ex r0.1, r1.0, ...). La dernière est affichée par défaut sur la liste.
version: r1.0
# draft or published
status: published
tags:
  - transport-logistique
  - décarbonation
  - flotte
  - tco
  - lca
  - saas
publishedDate: 2026-06-23T00:00:00.000Z
---

## Résumé

Le système physique étudié est la flotte de transport logistique routier - poids lourds thermiques (ICE), électriques à batterie (BEV) et à pile à combustible (FCEV) - opérée sur des itinéraires multimodaux dans un environnement dynamique (trafic, météo, topographie).

Le jumeau numérique eco4impact est une plateforme SaaS prédictive utilisée pour deux horizons : la planification stratégique 2030-2050 (transition technologique, infrastructures de recharge/H₂) et la planification tactique/journalière (génération de tournées optimales, planification énergétique). Il intègre des Digital Truck Twins (modèles physiques et de données), un générateur de scénarios et des modèles économiques/CO₂ (TCO, LCA), connectés au jumeau physique par ingestion continue des données télématiques, d'usage et d'infrastructure.

Deux développements parallèles : le consortium EcoRoadLog (en cours de constitution avec logisticiens, fédérations et universités en France et Allemagne) et Eco4Impact-Offroad pour les applications hors-route (projet avec UNICEM et FNTP).

---

## Description fonctionnelle

### Utilisateurs

- **Un gestionnaire de flotte** - pilote l'opérationnel quotidien (tournées, énergie) et évalue les scénarios de renouvellement.
- **Un décideur logistique / direction** - arbitre les choix stratégiques de transition (technologies, calendrier, infrastructures) sur des horizons longs.
- **Un analyste TCO / RSE** - évalue les compromis coût-risque et les KPIs de durabilité (CO₂e, conformité réglementaire).
- **Une autorité publique / fédération professionnelle** - simule l'impact des régulations, subventions et tarifications CO₂.

### Besoins fonctionnels

- **Prédire + Optimiser** · *Un décideur logistique* veut simuler des trajectoires de transition de flotte 2030-2050 (mix ICE/BEV/FCEV, calendrier d'investissement) pour définir une stratégie de décarbonation soutenable, dans un contexte d'incertitude sur le mix énergétique et les prix. **Métrique :** différents scénarios comparés sur l'horizon 10-25 ans avec TCO et CO₂e quantifiés.

- **Optimiser** · *Un gestionnaire de flotte* veut générer des tournées quotidiennes et plannings énergétiques optimaux pour minimiser la consommation et respecter les contraintes opérationnelles (trafic, météo, points de recharge). **Métrique :** réduction de la consommation énergétique vs planning de référence ; respect 100 % des fenêtres de livraison.

- **Évaluer + Prédire** · *Un analyste TCO* veut estimer le coût total de possession et l'empreinte carbone pour comparer des configurations de véhicules sous différents scénarios de prix et de régulation. **Métrique :** TCO et LCA quantifiés par scénario avec intervalle de confiance.

- **Décrire + Prédire** · *Une autorité publique* veut simuler l'impact des régulations, subventions et tarifications CO₂ sur l'adoption des technologies bas-carbone, en phase d'élaboration des politiques publiques. **Métrique :** sensibilité de l'adoption aux paramètres réglementaires.

---

## Caractérisation du Jumeau Numérique

*Grille basée sur le <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">framework unifié de Gil et al. (2024)</a> - 21 caractéristiques.*

### MC1 - Système étudié

Système logistique de transport routier réel : poids lourds (ICE, BEV, FCEV), processus de transport (missions, tournées), itinéraires multimodaux, conducteurs, infrastructure (points de livraison, stations de recharge/H₂), et contexte environnemental (trafic, météo, topographie).

### MC2 - Composants d'action physiques

Pas d'actionneur direct dans la version actuelle : le JN (Jumeau Numérique) est principalement décisionnel. Les sorties pilotent les choix humains (gestionnaire de flotte, direction) - planning, allocation véhicules, calendrier d'investissement.

### MC3 - Composants de captation physiques

- Capteurs télématiques embarqués (consommation, position, vitesse, charge, état de batterie)
- Données d'infrastructure (points de recharge, prix énergie)
- Sources externes (trafic, météo, tendances de marché)

### MC4 - Interaction physique → virtuel

Ingestion continue des données télématiques des véhicules et des données d'usage logistique (TMS). Couplage avec les données externes (trafic, météo, marché) pour la calibration et l'enrichissement des scénarios. Standards et fréquences à préciser selon l'intégration TMS.

### MC5 - Interaction virtuel → physique

Pas de commande directe : le JN produit des recommandations (tournées, plannings énergétiques, décisions de renouvellement) consommées par les opérateurs humains ou exportées vers le TMS.

### MC6 - Services du JN

- Génération de scénarios stratégiques (2030-2050) et tactiques (journaliers) via Sequence Building Blocks
- Optimisation des tournées et de l'usage énergétique sous contraintes
- Prédiction du TCO, du LCA et des impacts CO₂ par scénario
- Comparaison de configurations de flotte (mix technologique, profils de mission)
- Reporting quotidien (CO₂e, ESG, CSRD)

### MC7 - Échelle temporelle

Deux échelles couplées : tactique/journalière (planification opérationnelle) et stratégique (horizons 5 à 25 ans). Pas temps réel strict - le JN est un outil de simulation et de décision.

### MC8 - Multiplicités

Architecture multi-instance : un Digital Truck Twin par véhicule ou par configuration-type, agrégés en flotte. Possibilité de raisonner à l'échelle d'une mission, d'une flotte ou d'un parc national.

### MC9 - Phases du cycle de vie

Couvre principalement l'exploitation (planification quotidienne) et la stratégie d'évolution de flotte (renouvellement, transition technologique). LCA couvre le cycle de vie complet des véhicules pour l'évaluation environnementale.

### MC10 - Modèles et données

- **Digital Truck Twins** : couplage de modèles physiques (consommation, autonomie) et de modèles ML calibrés sur télématique
- **Générateur de scénarios** basé sur Sequence Building Blocks (scénario : enchaînement de plusieurs scènes/missions types)
- **Modèles économiques (TCO)** intégrant prix énergie, maintenance, amortissement, taxation CO₂
- **Modèles d'analyse du cycle de vie (LCA)**
- **Données** : télématique, infrastructure, prix énergie, météo, trafic, tendances de marché

### MC11 - Outils et facilitateurs

Plateforme SaaS web.

### MC12 - Constellation du JN

Pipeline : ingestion (télématique + sources externes) → calibration des Digital Truck Twins → générateur de scénarios → moteur d'optimisation/simulation → modèles TCO et LCA → interface utilisateur (planification stratégique, simulation tactique, reporting).

### MC13 - Processus de jumelage et évolution

Démarche incrémentale et collaborative : consortium EcoRoadLog en construction avec logisticiens, fédérations et universités (France et Allemagne). Déclinaison Eco4Impact-Offroad pour les applications hors-route avec UNICEM et FNTP.

### MC14 - Fidélité et validité

Calibration des Digital Truck Twins sur données télématiques réelles. Validation par comparaison consommations modélisées vs mesurées sur cycles d'exploitation. Modélisation prédictive sous forte incertitude - propagation des incertitudes (mix énergétique futur, prix, régulations) à préciser.

### MC15 - Connexion technique

Ingestion via API depuis les TMS et plateformes télématiques. Protocoles et standards précis à préciser.

### MC16 - Hébergement / déploiement

SaaS - plateforme web hébergée. Détails (cloud, datacenter, multi-tenant) à préciser.

### MC17 - Insights et prise de décision

- Comparaison de scénarios de transition de flotte avec TCO et CO₂e quantifiés
- Tournées et plannings énergétiques optimaux pour l'exploitation quotidienne
- Reporting CO₂e, ESG, CSRD
- Sensibilité de l'adoption aux paramètres réglementaires (régulations, subventions, tarification CO₂)

### MC18 - Intégration horizontale

Connecté aux TMS (Transport Management Systems) et FMS (Fleet Management Systems) pour les flux opérationnels. Intégration future de bases de composants et APIs carburants envisagée.

### MC19 - Propriété et confidentialité des données

Données opérationnelles (télématique, missions) potentiellement sensibles (concurrence, contractualisation). Gouvernance et conformité RGPD à formaliser dans le contexte SaaS multi-tenant.

### MC20 - Standardisation

Reporting aligné avec ESG et CSRD. Standards de modélisation des Digital Truck Twins et de l'inventaire LCA à préciser.

### MC21 - Sécurité et sûreté

Sécurité applicative SaaS (authentification, isolation des tenants). Pas de boucle de commande temps réel - risques de sûreté opérationnelle limités au périmètre décisionnel.

---

## Enjeux scientifiques et techniques

*Chaque enjeu est annoté par les questions de recherche (RQ_X) de la feuille de route EDT [[Combemale et al., 2025](https://inria.hal.science/hal-05223776)].*

### Génération automatisée de scénarios

Défi central du UC : produire des scénarios réalistes et diversifiés à la fois pour la planification stratégique et tactique, à partir de Sequence Building Blocks. Enjeu d'expressivité, de combinatoire et de plausibilité des trajectoires.

RQ associées : RQ_D6 (évolution des modèles), RQ_E2 (modularisation)

### Intégration de données hétérogènes et incertaines

Fusionner et nettoyer des données issues de sources nombreuses et incertaines (télématique, infrastructure, tendances de marché) tout en assurant la cohérence des formats et de la sémantique.

RQ associées : RQ_D3 (collecte de données hétérogènes), RQ_D11 (interopérabilité sémantique)

### Couplage multi-modèles

Aligner et intégrer des modèles complexes - Machine Learning, jumeaux physiques des camions, modèles prédictifs de coût et analyse du cycle de vie - au sein d'un même pipeline d'évaluation.

RQ associées : RQ_I3 (hybridation de modèles), RQ_I4 (opérateurs d'hybridation)

### Modélisation prédictive sous forte incertitude

Prévoir le TCO des motorisations émergentes sous des incertitudes structurelles (mix énergétique futur, prix, régulations) et propager ces incertitudes jusqu'aux décisions.

RQ associées : RQ_D2 (incertitude des données), RQ_I5 (enveloppe de validité), RQ_F3 (composition et incertitude)

---

## Matériel

## Références

- [Poster eco4impact](/media/use-cases/uc18-poster-eco4impact-vectura.pdf) - Use Case Workshop, Lyon, 6-7 janvier 2026
- Combemale B., Vicat-Blanc P., Blouin A., Bril El Haouzi H., Bruel J.-M. et al. [Engineering Digital Twins: A Research Roadmap](https://inria.hal.science/hal-05223776). EDTconf 2025 - 2nd International Conference on Engineering Digital Twins, Oct 2025, Grand Rapids, Michigan, United States. pp.1-7. ⟨hal-05223776⟩ - feuille de route scientifique du programme EDT (codes RQ_X).

## Thèses en cours
