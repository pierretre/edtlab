---
id: uc14
title: Digital Twin Factory
provider: CNES
contacts:
  - name: Pierre Marie Brunet
    org: CNES
    email: pierre-marie.brunet@cnes.fr
    role: Responsable DTF
  - name: Johan Aussenac
    org: CNES
    email: johan.aussenac@cnes.fr
    role: Service Traitement, Plateformes et Hybridation Aval
  - name: Dawa Derksen
    org: CNES
    email: dawa.derksen@cnes.fr
    role: Point de contact
summary: >-
  Boîte à outils open-source et interopérable développée par le CNES pour faciliter la création de jumeaux numériques thématiques et locaux à partir de données de télédétection spatiale (optique VHR, SAR, IRT) et de modèles physiques. Appliquée à quatre territoires côtiers : lagune du Nokoué (Bénin), littoral métropolitain français, Nouvelle-Calédonie et Corse.
usersCount: 0
lang: fr
# domain : industrial-engineering | energy | geospatial | maritime | telecommunications | environment | health | robotics | agriculture | other
domain: geospatial
# maturity : concept | poc | prototype | operational
maturity: poc
# originType : natural | anthropic | engineered | infrastructure | process
originType: natural
# version : identifiant de version du UC (ex r0.1, r1.0, ...). La dernière est affichée par défaut sur la liste.
version: r0.1
# draft or published
status: published
tags:
  - côtier
  - télédétection
  - changement-climatique
  - open-source
  - hybridation
  - surrogate-models
  - hpc
  - ogc
publishedDate: 2026-06-24T00:00:00.000Z
---

## Résumé

Le système physique est l'ensemble des territoires côtiers naturels et anthropisés de France et de ses collectivités d'outre-mer, dans un contexte de changement climatique (montée des eaux, événements extrêmes, évolution des écosystèmes).

La Digital Twin Factory (DTF) est une boîte à outils partagée développée par le CNES, fournissant des briques logicielles avancées et interopérables pour faciliter la création de jumeaux numériques thématiques et locaux à partir de données de télédétection spatiale (optique VHR, SAR, IRT) et de produits dérivés haute valeur (3D, occupation des sols, détection de changements). Elle s'appuie sur un modèle partenarial : le partenaire apporte un défi scientifique, ses données et un modèle physique ; le CNES fournit les briques DTF et l'accompagne jusqu'à la démonstration de prototype, le partenaire pouvant ensuite passer à l'opérationnel en autonomie.

Quatre cas d'usage côtiers sont en cours de développement :
- **Lagune du Nokoué (Bénin)** — dynamique hydrologique saisonnière, impact des inondations, transport de polluants (contact : Yves Morel, Univ. Toulouse III)
- **Littoral métropolitain** — évolution du trait de côte sur 5 000+ km, stratégies d'adaptation (contact : Erwin Bergsma, CNES)
- **Nouvelle-Calédonie** — submersion marine autour de Nouméa, impact des mesures d'atténuation (contact : Christophe Coulet, BRGM)
- **Corse** — propagation des incendies de forêt, modèles data-driven pour le taux de propagation

Projet en cours — première démonstration : décembre 2025.

---

## Description fonctionnelle

### Utilisateurs

- **Un partenaire scientifique (laboratoire, université)** - soumet un défi de terrain et utilise les briques DTF pour construire son propre JN thématique ou local, puis passe à l'opérationnel en autonomie.
- **Un gestionnaire territorial (collectivité, État)** - exploite les prédictions et scénarios "what-if?" du JN pour définir des stratégies d'adaptation au changement climatique (trait de côte, inondations, incendies).
- **Un opérateur de crise** - utilise les simulations en quasi-temps réel pour évaluer l'impact d'un événement (inondation, incendie) et orienter la réponse opérationnelle.
- **Un chercheur en télédétection / modélisation** - contribue aux briques algorithmiques et valide les modèles de substitution sur les données in-situ.

### Besoins fonctionnels

- **Décrire + Détecter** · *Un gestionnaire territorial* veut disposer d'une réplique numérique fidèle et à jour du territoire côtier (occupation des sols, trait de côte, bathymétrie) pour surveiller l'évolution et détecter les changements. **Métrique :** cohérence entre la réplique et les observations satellite, délai de mise à jour.

- **Simuler + Prédire** · *Un partenaire scientifique* veut simuler la dynamique hydrologique ou la submersion marine à haute fidélité (SYMPHONIE, TELEMAC2D) pour prédire les impacts des événements extrêmes. **Métrique :** accord modèle/observations sur les données de validation in-situ.

- **Optimiser + Évaluer (what-if?)** · *Un gestionnaire territorial* veut comparer des scénarios d'adaptation (construction de digue, usage de végétation, déplacement de populations) pour identifier la stratégie la plus efficace. **Métrique :** comparaison quantifiée des scénarios sur des KPIs de risque ou de coût.

- **Accélérer** · *Un chercheur* veut remplacer des simulations HPC coûteuses par des surrogate models rapides pour permettre des analyses "what-if?" interactives. **Métrique :** temps de simulation surrogate vs. HPC, écart de précision acceptable.

---

## Caractérisation du Jumeau Numérique

*Grille basée sur le <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">framework unifié de Gil et al. (2024)</a> - 21 caractéristiques.*

### MC1 - Système étudié

Territoires côtiers naturels et anthropisés de France et de ses collectivités : lagune du Nokoué (Bénin), littoral métropolitain (5 000+ km), zones côtières de Nouvelle-Calédonie (Nouméa), forêts littorales corses. Phénomènes modélisés : dynamique hydrologique et lagunaire, évolution du trait de côte, submersion marine, propagation des incendies de forêt.

### MC2 - Composants d'action physiques

Pas d'actionneur direct. Le DTF est un outil de simulation et d'aide à la décision. Les sorties alimentent les décisions de gestion territoriale : plans d'adaptation du trait de côte, mesures d'atténuation des inondations (digues, végétalisation), plans de prévention des incendies.

### MC3 - Composants de captation physiques

- Imagerie optique très haute résolution (Pléiades, Pléiades-NEO / CNES)
- Imagerie radar SAR et infrarouge thermique (IRT)
- Données in-situ : stations hydrométéorologiques, données expérimentales (feux de forêt, Corse / Clements et al., 2015)
- Modèles numériques de terrain et de surface (MNT/MNS, maillage Nouméa)
- Collections ARCO (données satellitaires cloud-optimized, accès COPDES/EODAG)

### MC4 - Interaction physique → virtuel

Collecte de données spatiales via COPDES et EODAG, transformation en ARCO Datasets (données cloud-optimisées, Analysis-Ready). Pipelines de traitement automatisés (Bulldozer, GDAL, COS Model, Mesh/LoD, PICANTEO) pour générer les produits dérivés haute valeur (occupation des sols, détection de changements, maillages 3D) alimentant les répliques numériques.

### MC5 - Interaction virtuel → physique

Pas de boucle de contrôle automatique. Le DTF produit des prédictions (évolution du trait de côte, niveaux d'inondation, taux de propagation des incendies) et des scénarios d'adaptation ("what-if?") transmis aux gestionnaires et décideurs territoriaux.

### MC6 - Services du JN

- Génération de Digital Replicas (répliques numériques fidèles des territoires côtiers)
- Simulation de phénomènes physiques haute fidélité (SYMPHONIE — dynamique océanique, TELEMAC2D — submersion marine)
- Surrogate models data-driven pour la salinité de surface, la température et la propagation des incendies
- Détection de changements (PICANTEO)
- Cartographie d'occupation des sols (Land Use / Land Cover, Pléiades/Pléiades-NEO)
- Interface utilisateur (User Cockpit) pour l'exploration et la comparaison de scénarios

### MC7 - Échelle temporelle

Multi-temporelle selon les phénomènes : saisonnière (lagune Nokoué — saison sèche/humide), interannuelle (évolution du trait de côte), événementielle (submersion, incendies). Simulation de scénarios prospectifs pour l'adaptation au changement climatique.

### MC8 - Multiplicités

Multi-territoire (Bénin, France métropolitaine, Nouvelle-Calédonie, Corse) et multi-phénomène (hydrologie lagunaire, trait de côte, submersion, incendies). Architecture de briques réutilisables : un même pipeline DTF peut être instancié sur des territoires différents avec des données et modèles spécifiques.

### MC9 - Phases du cycle de vie

Surveillance et opération continue des territoires côtiers (suivi des changements, alerte). Planification et adaptation à moyen et long terme (stratégies de réponse au changement climatique). Gestion de crise (inondations, incendies de forêt).

### MC10 - Modèles et données

- **Modèles océanographiques haute fidélité** : SYMPHONIE (dynamique lagunaire et océanique, HPC), TELEMAC2D (submersion marine 2D)
- **Surrogate models** : modèles data-driven calibrés sur SYMPHONIE pour la salinité de surface et la température de la lagune du Nokoué
- **Modèles data-driven** : propagation des incendies (Rate of Spread), partiellement en remplacement des modèles empiriques
- **Produits dérivés haute valeur** : cartographies d'occupation des sols (Pléiades/Pléiades-NEO), maillages 3D, détection de changements, MNT/MNS
- **ARCO Datasets** : données satellitaires cloud-optimized pour le traitement distribué

### MC11 - Outils et facilitateurs

AntFlow (orchestration end-to-end), COPDES/EODAG (collecte données spatiales), GDAL, Bulldozer, COS Model, Mesh/LoD, PICANTEO (détection de changements), SYMPHONIE (modèle océanique), TELEMAC2D (modèle de submersion), Lightweight Platform, User Cockpit. Standards : OGC Earth Application Package (Container + CWL), OGC API Processes, OGC Tile & Map Services, STAC, S3, K8s/HPC (Slurm), OIDC.

### MC12 - Constellation du JN

Pipeline : collecte (COPDES/EODAG + données in-situ) → transformation (ARCO Datasets) → traitement (Bulldozer, COS Model, Mesh/LoD, PICANTEO) → Digital Replica → simulation/prévision (SYMPHONIE, TELEMAC2D, surrogate models) → User Cockpit. Orchestration AntFlow sur infrastructure hybride K8s/HPC.

### MC13 - Processus de jumelage et évolution

Modèle partenarial en 4 étapes : (1) le partenaire soumet un défi scientifique avec ses données et son modèle physique ; (2) CNES fournit les briques DTF et accompagne l'implémentation ; (3) CNES guide jusqu'à la démonstration prototype ; (4) le partenaire transite vers l'opérationnel en autonomie. Projet en cours, premier démo décembre 2025.

### MC14 - Fidélité et validité

Deux niveaux couplés : simulations haute fidélité (SYMPHONIE HPC, TELEMAC2D) servant de référence, et surrogate models rapides calibrés sur ces simulations. Validation sur données in-situ (stations hydrométéorologiques, données expérimentales feux Corse). Données spatiales de référence CNES (Pléiades/Pléiades-NEO).

### MC15 - Connexion technique

Interopérabilité by design via standards OGC : Earth Application Package (Container + CWL Workflow), OGC API Processes, OGC Tile & Map Services, STAC. Accès données via S3. Déploiement sur K8s et HPC (Slurm). Authentification OIDC.

### MC16 - Hébergement / déploiement

Plateforme légère (Lightweight Platform) combinant conteneurs K8s et HPC (Slurm). Architecture conteneurisée (OGC Earth Application Package) permettant un déploiement portable chez les partenaires. Accès aux données via COPDES (CNES) et EODAG.

### MC17 - Insights et prise de décision

- Prédiction de l'évolution du trait de côte et comparaison de stratégies d'adaptation (what-if?)
- Évaluation de l'impact des inondations (lagune Nokoué, Nouméa) et des mesures d'atténuation
- Prédiction du taux de propagation des incendies de forêt (Corse)
- Cartographie dynamique de l'occupation des sols et détection de changements
- Alertes et aide à la décision pour la gestion de crise

### MC18 - Intégration horizontale

Architecture DTF conçue pour la réutilisation inter-territoires et inter-partenaires. Support au réseau de recherche et industriel national et européen. Promotion du transfert technologique pour les services applicatifs basés sur les données spatiales. Interopérabilité avec les plateformes spatiales européennes via standards OGC.

### MC19 - Propriété et confidentialité des données

Données spatiales Pléiades/Pléiades-NEO sous licence CNES. Données in-situ apportées par les partenaires thématiques (laboratoires, BRGM). Authentification et contrôle d'accès via OIDC. Données sensibles pour certains territoires (Nouvelle-Calédonie, zones côtières stratégiques).

### MC20 - Standardisation

Standards OGC (Earth Application Package, API Processes, Tile & Map Services, STAC), CWL (Common Workflow Language) pour les workflows, S3 pour l'accès aux données. Format ARCO (Analysis-Ready, Cloud-Optimized) pour les données satellitaires. Architecture conteneurisée (Docker, K8s) pour la portabilité.

### MC21 - Sécurité et sûreté

Sécurité applicative (OIDC, contrôle d'accès par rôle). Pour les use cases à risque (inondations, incendies) : le DTF est un outil d'aide à la décision critique — la fiabilité des prédictions est essentielle pour la sécurité des populations. Intégrité des pipelines de traitement et des modèles à assurer.

---

## Enjeux scientifiques et techniques

*Chaque enjeu est annoté par les questions de recherche (RQ_X) de la feuille de route EDT [[Combemale et al., 2025](https://inria.hal.science/hal-05223776)].*

### Génération de répliques numériques précises à partir de données hétérogènes

Produire des représentations fidèles et à jour des territoires côtiers en fusionnant des données spatiales de natures variées (optique VHR, SAR, IRT, MNT, données in-situ) avec des degrés de couverture et de qualité variables selon les territoires (notamment Nouvelle-Calédonie et Corse, peu instrumentés).

RQ associées : RQ_D3 (collecte de données hétérogènes), RQ_D1 (déploiement capteurs), RQ_D2 (incertitude des données)

### Hybridation observations spatiales et modèles de simulation (PC1)

Assimiler les données d'observation spatiale dans les modèles physiques haute fidélité (SYMPHONIE, TELEMAC2D) pour réduire leurs incertitudes et améliorer la précision des prédictions, tout en gérant le désalignement spatial et temporel entre données spatiales et modèles.

RQ associées : RQ_I3 (hybridation de modèles), RQ_I4 (opérateurs d'hybridation), RQ_D2 (incertitude des données)

### Modèles de substitution pour la simulation rapide (surrogate models)

Construire et mettre à jour des surrogate models data-driven (salinité et température lagunaire, taux de propagation des incendies) permettant de remplacer ou compléter des simulations HPC coûteuses (SYMPHONIE), pour rendre les analyses "what-if?" interactives et accessibles.

RQ associées : RQ_I3 (hybridation de modèles), RQ_I5 (enveloppe de validité), RQ_T3 (composition d'incertitudes / fidélité inter-DTs)

### Architecture de référence interopérable pour les JN côtiers

Définir et implémenter une architecture DTF réutilisable et interopérable by design (OGC, STAC, ARCO, CWL) permettant à des partenaires variés de construire leurs propres JN thématiques et locaux en s'appuyant sur les briques CNES, sans refaire l'infrastructure de base.

RQ associées : RQ_E1 (standardisation des interfaces), RQ_E2 (modularisation), RQ_D11 (interopérabilité sémantique)

### Passage à l'échelle et orchestration des pipelines de traitement

Traiter des volumes massifs de données satellitaires (5 000+ km de littoral, imagerie VHR nationale) avec des pipelines distribués (K8s, HPC/Slurm) tout en maintenant des temps de réponse compatibles avec les besoins opérationnels et en assurant la reproductibilité des traitements.

RQ associées : RQ_P6 (passage à l'échelle), RQ_C1 (orchestration dynamique Cloud/Edge), RQ_P8 (déploiement et versionnement des modèles)

### Modélisation sur données à faible densité in-situ

Développer des approches de modélisation robustes pour les territoires faiblement instrumentés (Nouvelle-Calédonie, Corse), en maximisant l'apport des données spatiales et des modèles data-driven pour compenser l'absence de données terrain denses.

RQ associées : RQ_D2 (incertitude des données), RQ_I5 (enveloppe de validité), RQ_D4 (qualité et couverture des données)

---

## Matériel

## Références

- [Poster Digital Twin Factory](/media/use-cases/uc14-poster-dtf-cnes.pdf) - Use Case Workshop, Lyon, 6-7 janvier 2026
- Okpeitcha et al. (2022) — salinité de surface de la lagune du Nokoué (données 2020, référencées dans le poster)
- Clements et al. (2015) — feux expérimentaux Corse, taux de propagation (Rate of Spread)
- Combemale B., Vicat-Blanc P., Blouin A., Bril El Haouzi H., Bruel J.-M. et al. [Engineering Digital Twins: A Research Roadmap](https://inria.hal.science/hal-05223776). EDTconf 2025 - 2nd International Conference on Engineering Digital Twins, Oct 2025, Grand Rapids, Michigan, United States. pp.1-7. ⟨hal-05223776⟩ - feuille de route scientifique du programme EDT (codes RQ_X).

## Thèses en cours
