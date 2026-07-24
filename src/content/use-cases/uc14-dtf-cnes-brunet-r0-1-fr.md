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
  Approche générique pour la construction de jumeaux numériques côtiers thématiques et locaux, s'appuyant sur une boîte à outils open-source (DTF) développée par le CNES à partir de données de télédétection spatiale (optique VHR, SAR, IRT). Illustrée par quatre applications : lagune du Nokoué (Bénin), littoral métropolitain, Nouvelle-Calédonie et Corse.
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

Le système physique générique est un territoire côtier naturel et anthropisé soumis au changement climatique : dynamique des eaux, occupation des sols, végétation, infrastructures. Les phénomènes d'intérêt varient selon le territoire (hydrologie lagunaire, évolution du trait de côte, submersion marine, propagation d'incendies), mais relèvent tous d'un même besoin : prédire et atténuer les impacts du changement climatique sur les milieux côtiers.

La **Digital Twin Factory (DTF)** est une approche générique et une boîte à outils open-source développée par le CNES pour faciliter la construction de jumeaux numériques thématiques et locaux à partir de données de télédétection spatiale (optique VHR, SAR, IRT) et de produits dérivés haute valeur (3D, occupation des sols, détection de changements). Elle fournit des briques logicielles interopérables by design (OGC, STAC, ARCO), un pipeline end-to-end orchestré (AntFlow), et un modèle partenarial en 4 étapes permettant à des partenaires scientifiques de construire leur propre JN avec l'appui du CNES, puis de passer à l'opérationnel en autonomie.

Quatre applications illustratives sont en cours de développement dans des contextes côtiers contrastés — voir section dédiée.

Projet en cours — première démonstration : décembre 2025.

---

## Description fonctionnelle

### Utilisateurs

- **Un partenaire scientifique (laboratoire, université)** — soumet un défi de terrain et utilise les briques DTF pour construire son propre JN thématique ou local, jusqu'à la démonstration prototype.
- **Un gestionnaire territorial (collectivité, État)** — exploite les prédictions et scénarios "what-if?" du JN pour définir des stratégies d'adaptation au changement climatique.
- **Un opérateur de crise** — utilise les simulations pour évaluer l'impact d'un événement (inondation, incendie) et orienter la réponse opérationnelle.
- **Un chercheur en télédétection / modélisation** — contribue aux briques algorithmiques et valide les modèles de substitution sur des données in-situ.

### Besoins fonctionnels

- **Décrire + Détecter** · *Un gestionnaire territorial* veut disposer d'une réplique numérique fidèle et à jour du territoire côtier (occupation des sols, trait de côte, bathymétrie) pour surveiller l'évolution et détecter les changements. **Métrique :** cohérence entre la réplique et les observations satellite, délai de mise à jour.

- **Simuler + Prédire** · *Un partenaire scientifique* veut simuler un phénomène physique côtier (hydrologie, submersion, incendie) à haute fidélité pour prédire les impacts des événements extrêmes. **Métrique :** accord modèle/observations sur les données de validation in-situ.

- **Évaluer (what-if?)** · *Un gestionnaire territorial* veut comparer des scénarios d'adaptation (construction de digue, usage de végétation, plan de prévention) pour identifier la stratégie la plus efficace. **Métrique :** comparaison quantifiée des scénarios sur des KPIs de risque ou de coût.

- **Accélérer** · *Un chercheur* veut remplacer des simulations HPC coûteuses par des surrogate models rapides pour permettre des analyses "what-if?" interactives. **Métrique :** temps de simulation surrogate vs. HPC, écart de précision acceptable.

---

## Caractérisation du Jumeau Numérique

*Grille basée sur le <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">framework unifié de Gil et al. (2024)</a> - 21 caractéristiques. Caractérisation générique, commune aux quatre applications illustratives.*

### MC1 - Système étudié

Territoire côtier naturel et anthropisé soumis au changement climatique : masses d'eau (lagunes, océan côtier), relief et bathymétrie, occupation des sols (végétation, bâti, infrastructures), processus dynamiques (hydrologie, érosion côtière, submersion, propagation du feu). Le périmètre géographique et les phénomènes d'intérêt sont définis par chaque application.

### MC2 - Composants d'action physiques

Pas d'actionneur direct. Le JN est un outil de simulation et d'aide à la décision. Les sorties alimentent les décisions de gestion territoriale (plans d'adaptation, mesures d'atténuation, plans de prévention des risques).

### MC3 - Composants de captation physiques

- Imagerie optique très haute résolution (Pléiades, Pléiades-NEO / CNES)
- Imagerie radar SAR et infrarouge thermique (IRT)
- Données in-situ propres à chaque application (stations hydrométéorologiques, capteurs terrain, données expérimentales)
- Modèles numériques de terrain et de surface (MNT/MNS, maillages bathymétriques)
- Collections ARCO (données satellitaires cloud-optimized, accès COPDES/EODAG)

### MC4 - Interaction physique → virtuel

Collecte de données spatiales via COPDES et EODAG, transformation en ARCO Datasets (Analysis-Ready, Cloud-Optimized). Pipelines de traitement automatisés (Bulldozer, GDAL, COS Model, Mesh/LoD, PICANTEO) pour générer les produits dérivés haute valeur alimentant la réplique numérique. Intégration des données in-situ pour la calibration et la validation.

### MC5 - Interaction virtuel → physique

Pas de boucle de contrôle automatique. Le JN produit des prédictions et des scénarios d'adaptation transmis aux gestionnaires et décideurs territoriaux via le User Cockpit.

### MC6 - Services du JN

- Génération de Digital Replicas (répliques numériques du territoire côtier)
- Simulation de phénomènes physiques haute fidélité (modèles physiques HPC selon l'application)
- Surrogate models data-driven pour accélérer les simulations
- Détection de changements (PICANTEO)
- Cartographie d'occupation des sols (Land Use / Land Cover)
- Interface utilisateur (User Cockpit) pour l'exploration et la comparaison de scénarios "what-if?"

### MC7 - Échelle temporelle

Multi-temporelle selon les phénomènes : saisonnière, interannuelle ou événementielle. Simulation de scénarios prospectifs pour l'adaptation au changement climatique sur des horizons moyens à longs.

### MC8 - Multiplicités

Architecture de briques réutilisables : un même pipeline DTF peut être instancié sur des territoires différents avec des données et des modèles physiques spécifiques. Multi-phénomène au sein d'une même application possible (ex. hydrologie + pollutants dans la lagune du Nokoué).

### MC9 - Phases du cycle de vie

Surveillance et opération continue des territoires côtiers (suivi des changements). Planification et adaptation à moyen et long terme (stratégies de réponse au changement climatique). Gestion de crise (inondations, incendies de forêt).

### MC10 - Modèles et données

- **Modèles physiques haute fidélité** : définis par chaque application (ex. SYMPHONIE pour la dynamique océanique, TELEMAC2D pour la submersion marine)
- **Surrogate models** : calibrés sur les simulations HPC pour remplacer les calculs coûteux dans les boucles d'exploration de scénarios
- **Modèles data-driven** : pour les phénomènes à forte composante empirique (ex. taux de propagation des incendies)
- **Produits dérivés haute valeur** : cartographies d'occupation des sols, maillages 3D, détection de changements, MNT/MNS
- **ARCO Datasets** : données satellitaires cloud-optimized pour le traitement distribué

### MC11 - Outils et facilitateurs

AntFlow (orchestration end-to-end), COPDES/EODAG (collecte données spatiales), GDAL, Bulldozer, COS Model, Mesh/LoD, PICANTEO (détection de changements), Lightweight Platform, User Cockpit. Standards : OGC Earth Application Package (Container + CWL), OGC API Processes, OGC Tile & Map Services, STAC, S3, K8s/HPC (Slurm), OIDC.

### MC12 - Constellation du JN

Pipeline générique : collecte (COPDES/EODAG + données in-situ) → transformation (ARCO Datasets) → traitement (Bulldozer, COS Model, Mesh/LoD, PICANTEO) → Digital Replica → simulation/prévision (modèle physique HPC + surrogate models) → User Cockpit. Orchestration AntFlow sur infrastructure hybride K8s/HPC.

### MC13 - Processus de jumelage et évolution

Modèle partenarial en 4 étapes : 

- le partenaire soumet un défi scientifique avec ses données et son modèle physique ; 
- CNES fournit les briques DTF et accompagne l'implémentation ; 
- CNES guide jusqu'à la démonstration prototype ; 
- le partenaire transite vers l'opérationnel en autonomie. Approche incrémentale appliquée à chaque territoire.

### MC14 - Fidélité et validité

Deux niveaux couplés : simulations haute fidélité (modèles physiques HPC) servant de référence, et surrogate models rapides calibrés sur ces simulations. Validation sur données in-situ spécifiques à chaque application. Données spatiales de référence CNES (Pléiades/Pléiades-NEO).

### MC15 - Connexion technique

Interopérabilité by design : OGC Earth Application Package (Container + CWL Workflow), OGC API Processes, OGC Tile & Map Services, STAC, S3. Déploiement sur K8s et HPC (Slurm). Authentification OIDC.

### MC16 - Hébergement / déploiement

Lightweight Platform combinant conteneurs K8s et HPC (Slurm). Architecture conteneurisée (OGC Earth Application Package) permettant un déploiement portable chez les partenaires. Accès aux données via COPDES (CNES) et EODAG.

### MC17 - Insights et prise de décision

- Réplique numérique à jour du territoire côtier
- Prédictions quantifiées (variables d'état selon le phénomène) avec incertitudes
- Comparaison de scénarios d'adaptation ("what-if?")
- Détection et cartographie des changements
- Alertes et aide à la décision pour la gestion de crise

### MC18 - Intégration horizontale

Architecture DTF conçue pour la réutilisation inter-territoires et inter-partenaires. Interopérabilité avec les plateformes spatiales nationales et européennes via standards OGC. Vocation de support au réseau de recherche et industriel national et européen, et de promotion du transfert technologique.

### MC19 - Propriété et confidentialité des données

Données spatiales Pléiades/Pléiades-NEO sous licence CNES. Données in-situ apportées par les partenaires thématiques. Authentification et contrôle d'accès via OIDC. Sensibilité variable selon les territoires (zones côtières stratégiques, données de défense).

### MC20 - Standardisation

OGC (Earth Application Package, API Processes, Tile & Map Services, STAC), CWL (Common Workflow Language), S3, format ARCO (Analysis-Ready, Cloud-Optimized). Architecture conteneurisée (Docker, K8s) pour la portabilité inter-partenaires.

### MC21 - Sécurité et sûreté

Sécurité applicative (OIDC, contrôle d'accès par rôle). Pour les applications à risque (inondations, incendies) : fiabilité des prédictions critique pour la sécurité des populations. Intégrité des pipelines de traitement et des modèles à assurer.

---

## Enjeux scientifiques et techniques

*Chaque enjeu est annoté par les questions de recherche (RQ_X) de la feuille de route EDT [[Combemale et al., 2025](https://inria.hal.science/hal-05223776)]. Ces enjeux sont communs aux quatre applications illustratives, avec des déclinaisons spécifiques à chacune.*

### Génération de répliques numériques précises à partir de données hétérogènes

Produire des représentations fidèles et à jour des territoires côtiers en fusionnant des données spatiales de natures variées (optique VHR, SAR, IRT, MNT, données in-situ) avec des degrés de couverture et de qualité variables selon les territoires — en particulier ceux faiblement instrumentés.

RQ associées : RQ_D3 (collecte de données hétérogènes), RQ_D4 (qualité et couverture des données), RQ_D2 (incertitude des données)

### Hybridation observations spatiales et modèles de simulation (PC1)

Assimiler les données d'observation spatiale dans les modèles physiques haute fidélité pour réduire leurs incertitudes, en gérant le désalignement spatial et temporel entre données satellites et grilles de simulation.

RQ associées : RQ_I3 (hybridation de modèles), RQ_I4 (opérateurs d'hybridation), RQ_D2 (incertitude des données)

### Modèles de substitution pour la simulation rapide

Construire et maintenir des surrogate models data-driven permettant de remplacer ou compléter des simulations HPC coûteuses, pour rendre les analyses "what-if?" interactives et accessibles aux partenaires non-spécialistes.

RQ associées : RQ_I3 (hybridation de modèles), RQ_I5 (enveloppe de validité), RQ_F3 (composition et incertitude)

### Architecture de référence interopérable (PC2)

Définir et implémenter une architecture DTF réutilisable by design (OGC, STAC, ARCO, CWL) permettant à des partenaires variés de construire leurs propres JN côtiers en s'appuyant sur les briques CNES sans refaire l'infrastructure de base.

RQ associées : RQ_E1 (standardisation des interfaces), RQ_E2 (modularisation), RQ_D11 (interopérabilité sémantique)

### Passage à l'échelle et orchestration des pipelines

Traiter des volumes massifs de données satellitaires avec des pipelines distribués (K8s, HPC/Slurm) en assurant la reproductibilité des traitements et des temps de réponse compatibles avec les besoins opérationnels.

RQ associées : RQ_E4 (scalabilité), RQ_E5 (performance et temps réel), RQ_I2 (composition de simulations)

---

## Applications illustratives

### Lagune du Nokoué (Bénin)

**Contact thématique** : Yves Morel — yves.morel@univ-tlse3.fr (Université Toulouse III)

**Phénomènes modélisés** : dynamique hydrologique lagunaire avec forts effets saisonniers (saisons sèche et humide), impact des inondations, transport de polluants.

**Spécificités techniques** : simulations HPC coûteuses avec le modèle océanique SYMPHONIE ; surrogate models pour la salinité de surface et la température de la lagune calibrés sur les résultats SYMPHONIE. Données d'occupation des sols dérivées de Pléiades et Pléiades-NEO (CNES).

**Enjeu particulier** : développement de surrogate models suffisamment précis pour remplacer SYMPHONIE dans les boucles d'exploration de scénarios saisonniers.

---

### Littoral métropolitain (France)

**Contact thématique** : Erwin Bergsma — erwin.bergsma@cnes.fr (CNES)

**Phénomènes modélisés** : évolution du trait de côte sur plus de 5 000 km de littoral métropolitain, caractérisation et dynamique des lignes de rivage, modélisation de l'évolution future.

**Spécificités techniques** : analyse multi-temporelle de séries d'images satellite pour la cartographie du trait de côte et du risque d'érosion. Scénarios d'adaptation "what-if?" (quelles mesures pour quels tronçons ?). Données de probabilité d'occurrence de l'eau.

**Enjeu particulier** : passage à l'échelle nationale (5 000+ km) avec cohérence spatiale et temporelle des analyses et des modèles d'évolution.

---

### Nouvelle-Calédonie

**Contact thématique** : Christophe Coulet — c.coulet@brgm.fr (BRGM)

**Phénomènes modélisés** : submersion marine autour de Nouméa dans les conditions actuelles et futures (montée des eaux), évaluation de l'impact de mesures d'atténuation (construction de digues, usage de végétation).

**Spécificités techniques** : simulations de submersion avec TELEMAC2D sur un maillage de haute résolution autour de Nouméa. Modèle numérique d'élévation (DEM) comme donnée d'entrée clé. Difficultés liées à la faible densité de données in-situ sur d'autres zones de l'île.

**Enjeu particulier** : modélisation robuste sur des zones à faible couverture instrumentale, en maximisant l'apport des données spatiales.

---

### Corse (incendies de forêt)

**Phénomènes modélisés** : propagation des incendies de forêt en période estivale, dépendance forte de la vitesse de propagation (Rate of Spread) à l'état de la végétation.

**Spécificités techniques** : données in-situ issues de feux expérimentaux (Clements et al., 2015 ; images aériennes post-feu). Modèles data-driven et de substitution à fort potentiel pour remplacer partiellement les modèles empiriques de calcul du taux de propagation. Images aériennes pour l'estimation du Rate of Spread.

**Enjeu particulier** : exploiter les données expérimentales rares pour entraîner des modèles data-driven généralisables à différents états de végétation et conditions météorologiques.

---

## Matériel

## Références

- [Poster DTF](/media/use-cases/uc14-poster-dtf-cnes.pdf) - Use Case Workshop, Lyon, 6-7 janvier 2026
- Okpeitcha et al. (2022) — salinité de surface de la lagune du Nokoué (données 2020)
- Clements et al. (2015) — feux expérimentaux Corse, taux de propagation (Rate of Spread)
- Combemale B., Vicat-Blanc P., Blouin A., Bril El Haouzi H., Bruel J.-M. et al. [Engineering Digital Twins: A Research Roadmap](https://inria.hal.science/hal-05223776). EDTconf 2025 - 2nd International Conference on Engineering Digital Twins, Oct 2025, Grand Rapids, Michigan, United States. pp.1-7. ⟨hal-05223776⟩ - feuille de route scientifique du programme EDT (codes RQ_X).

## Thèses en cours
