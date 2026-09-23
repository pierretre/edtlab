---
id: uc10b
title: JUNN
provider: IGN
contacts:
  - name: Benoit Frédéricque
    org: IGN
    email: benoit.fredericque@ign.fr
    role: Tech Lead 
  - name: Quentin Houéry
    org: IGN
    email: quentin.houery@ign.fr
    role: Project coordinator
summary: >-
JUNN est une démarche visant à développer un socle technologique commun, ouvert et souverain, qui facilitera le déploiement des jumeaux numériques de territoires. Opéré à terme au travers d’une plateforme en ligne partagée, ce socle mutualisera des services de base génériques, prêts à l’emploi, et offrira un espace d’intégration et de combinaison de composants logiciels plus spécialisés (tels que des outils logiciels pour la simulation du risque d’inondation), développés et valorisés par les acteurs métier des différents secteurs d’usage.
usersCount: 0
lang: fr
# domain : industrial-engineering | energy | geospatial | maritime | telecommunications | environment | health | robotics | agriculture | other
domain: geospatial
# maturity : concept | poc | prototype | operational
maturity: prototype
# originType : natural | anthropic | engineered | infrastructure | process
originType: natural
# version : identifiant de version du UC (ex r0.1, r1.0, ...). La dernière est affichée par défaut sur la liste.
version: r0.1
# draft or published
status: published
tags:
  - territoire
  - géospatial
  - open-source
  - 3d
  - multi-échelle
  - planification-territoriale
  - risques-naturels
publishedDate: 2026-06-24T00:00:00.000Z
---

## Résumé

Le système physique est la France et ses territoires :
systèmes naturels et anthropisés liés à l'occupation des sols, à la
construction, dans un contexte de changement climatique et de menaces
anthropiques croissantes.

Les Jumeau Numériques des Territoires (JNT) sont des modèles
numérique dynamiques et prospectifs des territoires. Ils s’inscrivent à une
échelle territoriale plus fine que les modèles à l’échelle mondiale et plus
abstraites que les jumeaux numériques locaux (ex : Jumeau d’ouvrage d’art,
jumeaux d’usines). Le programme JUNN a pour objectif de fournir une fondation
technique open-source et un jeu de données 3D ouvert pour faciliter le
développement d'initiatives de jumeaux numériques de territoires.

Sept familles de cas d'usage métier ont été priorisés :
planification urbaine durable, identification de sites d'énergies
renouvelables, territoires résilients face aux catastrophes naturelles,
optimisation de l'usage de l'eau, adaptation des forêts au changement climatique,
lutte contre les épidémies, optimisation des offres de mobilité territoriale.

---

## Description fonctionnelle

### Utilisateurs

- **Un décideur territorial (collectivité, État)** - exploite les visualisations et simulations de scénarios pour orienter les politiques d'aménagement, de gestion des risques ou d'adaptation climatique.
- **Un chercheur / scientifique** - utilise la fondation open-source et les données géospatiales pour développer et valider des modèles de phénomènes physiques ou sociaux à l'échelle du territoire.
- **Un développeur de jumeaux numériques** - s'appuie sur la fondation technique pour construire des jumeaux territoriaux locaux ou thématiques.
- **Un opérateur technique (IGN, collectivité)** - alimente et maintient le jeu de données 3D ouvert en évolution continue.

### Besoins fonctionnels

- **Décrire + Visualiser** · *Un décideur territorial* veut disposer d'une représentation 3D unifiée et à jour du territoire (occupation des sols, bâti, relief, végétation) pour comprendre l'état actuel et simuler l'impact de scénarios d'actions. **Métrique :** cohérence des données multi-sources, couverture nationale à 20 cm/pixel.

- **Simuler + Prédire** · *Un expert risques* veut simuler des phénomènes physiques (inondations, incendies, glissements de terrain) sur le modèle 3D pour évaluer la résilience des territoires et planifier les actions préventives. **Métrique :** résultats de simulation cohérents avec les observations de référence.

- **Identifier + Évaluer** · *Un planificateur* veut identifier des sites favorables aux énergies renouvelables (solaire, éolien) ou cartographier les zones à risque pour orienter les décisions d'aménagement. **Métrique :** couverture nationale des analyses thématiques.

- **Agréger + Fédérer** · *Un développeur de jumeaux territoriaux* veut réutiliser le socle technique open-source pour construire des JN locaux ou thématiques interopérables avec JUNN. **Métrique :** nombre d'initiatives locales s'appuyant sur la fondation.

---

## Caractérisation du Jumeau Numérique

*Grille basée sur le <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">framework unifié de Gil et al. (2024)</a> - 21 caractéristiques.*

### MC1 - Système étudié

La France et ses territoires : systèmes naturels (relief, hydrographie, végétation, forêts) et anthropisés (occupation des sols, bâti, infrastructure, réseaux de transport), couvrant les échelles mondiale, nationale et locale, dans un contexte de changement climatique et de pression anthropique.

### MC2 - Composants d'action physiques

JUNN est un outil de connaissance, de simulation et d'aide à la décision. Les sorties du
JN alimentent les politiques publiques d'aménagement, de gestion des risques
naturels et d'adaptation climatique. Il n’est pas prévu d’actionneur
directement dans le socle pour l’instant. En revanche, des actionneurs peuvent
être ajoutés sous la forme d’extensions au socle.

### MC3 - Composants de captation physiques

Données produites dans le cadre du programme JUNN

- - Maillages
     sémantiques non texturés (Wasure + CGAL + LidarHD / IGN, Geometry Factory
     & LASTIG)
  - Maillages
     texturés photoréalistes (IGO, 4 départements pilotes)
  - Données
     vectorielles multithématiques (SIRADEL - données, LUXCARTA - logiciel)
  
  Données et sources externes identifiées pour être
  référencées dynamiquement par le socle JUNN
  
  - Orthoimages,
     MNS (Modèle Numérique de Surface) et MNT (Modèle Numérique de Terrain) -
     IGN, 20 cm/pixel, échelle nationale
  
  - Cartes d'occupation des sols
    (Land Use Land Cover) - IGN, 20 cm/pix
  
  - Capteurs  IoT terrain, data spaces

### MC4 - Interaction physique → virtuel

Collecte et agrégation continue de données géographiques 3D multi-sources (raster, vecteur, maillage) depuis les capteurs terrain, bases de données IGN et partenaires. Agrégation de données locales comportementales pour alimenter les modèles nationaux. Connexion aux modèles climatiques mondiaux (DestinE).

### MC5 - Interaction virtuel → physique

Pas de boucle de contrôle automatique. Le socle JUNN produit des visualisations
interactives, simulations de scénarios et insights thématiques (risques,
énergie, mobilité) consommés par les décideurs publics et opérateurs
territoriaux pour orienter les politiques et actions sur le terrain.

### MC6 - Services du JN

- Collecte et combinaison de données géographiques 3D multi-sources (modèle 3D unifié du territoire)
- Interaction et visualisation du modèle 3D (exploration, requêtes spatiales)
- Orchestration de simulations de phénomènes physiques pour évaluer l'impact de scénarios d'actions
- Support aux 7 cas d'usage métier priorisés (planification urbaine, énergie renouvelable, risques naturels, eau, forêts, épidémies, mobilité)

### MC7 - Échelle temporelle

Temporalité prospective et de planification : simulation
de scénarios à court, moyen et long terme, visualisation de données historiques.
Mise à jour continue du jeu de données géospatiales selon les cycles de
production IGN et des partenaires.  Connexion à des données temps réel à l’aide de
services externes (ex : API HUB EAU).

### MC8 - Multiplicités

Architecture multi-échelles (mondial → national → local) et multi-thématique (sols, bâti, eau, végétation, mobilité, risques). Vocation fédératrice : agréger les jumeaux territoriaux locaux au niveau national et s'articuler avec DestinE à l'échelle mondiale.

### MC9 - Phases du cycle de vie

Opération et gestion continue des territoires (surveillance de l'évolution du territoire, détection de changements). Planification et prospective (aménagement, adaptation climatique). Réponse aux crises (catastrophes naturelles, épidémies).

### MC10 - Modèles et données

Données produites dans le cadre du programme JUNN

- Maillages
   sémantiques non texturés (Wasure + CGAL + LidarHD / IGN, Geometry Factory
   & LASTIG)
- Maillages
   texturés photoréalistes (IGO, 4 départements pilotes)
- Données
   vectorielles multithématiques (SIRADEL - données, LUXCARTA - logiciel)

Données et sources externes indentifiées pour être
référencées dynamiquement par le socle JUNN

- Orthoimages,
   MNS (Modèle Numérique de Surface) et MNT (Modèle Numérique de Terrain) -
   IGN, 20 cm/pixel, échelle nationale
- Cartes
   d'occupation des sols (Land Use Land Cover) - IGN, 20 cm/
- LLM
   et IA pour les applications scientifiques et de décision (H2E AI
   Factory France)

### MC11 - Outils et facilitateurs

DestinE (Destination Earth, modèles climatiques mondiaux), H2E AI Factory France, géoplatformes nationales, LidarHD (IGN), CGAL library, Wasure (LASTIG), Geometry Factory, SIRADEL, LUXCARTA, LLM, infrastructure IoT, data spaces, catalogues de données.

### MC12 - Constellation du JN

Architecture en couches : connecteurs (IoT, data spaces, bases de données, capteurs, jumeaux d'infrastructure et territoriaux) → fondation technique open-source (traitement, catalogues, données 3D, modèles de simulation) → géoplatformes → visualisation et LLM → applications (scientifiques, décideurs, collaboratives, techniques). Articulation verticale avec DestinE (mondial) et jumeaux locaux.

### MC13 - Processus de jumelage et évolution

Approche ouverte et collaborative : fondation logicielle open-source et jeu de données 3D ouvert en évolution continue. Intégration progressive des résultats de recherche des projets ciblés EDT (PC1 à PC5) pour renforcer les capacités de JUNN. Déploiement progressif par niveaux de maturité des données (raster → vecteur → maillage).

### MC14 - Fidélité et validité

Données géospatiales de référence produites par l'IGN (organisme officiel français de cartographie et géodésie). Résolution 20 cm/pixel pour les données raster. Niveaux de fidélité croissants selon le type de données (du raster non texturé aux maillages photoréalistes). Extension nationale progressive (4 départements pilotes pour les maillages texturés).

### MC15 - Connexion technique

Connecteurs vers les jumeaux d'infrastructure, jumeaux territoriaux locaux, IoT, capteurs terrain, data spaces, bases de données nationales. Standards d'interopérabilité géospatiale (OGC, INSPIRE). Connexion à DestinE pour les données climatiques mondiales.

### MC16 - Hébergement / déploiement

Socle technique open-source, déployable à différentes échelles. Architecture distribuée articulant niveau national  et déploiements locaux. Connexion à l'infrastructure DestinE au niveau européen/mondial.

### MC17 - Insights et prise de décision

- Visualisation et exploration interactive du territoire en 3D
- Simulation de l'impact de scénarios d'aménagement (urbanisme, énergie, infrastructures)
- Cartographie des risques naturels (inondations, incendies, glissements)
- Identification de sites favorables aux énergies renouvelables
- Optimisation de l'usage de l'eau et des ressources forestières
- Aide à la gestion des crises épidémiques et à la planification de la mobilité

### MC18 - Intégration horizontale

Architecture conçue pour fédérer des données et outils multi-sources (IGN, SIRADEL, LUXCARTA, DestinE, collectivités). Standards OGC et INSPIRE pour l'interopérabilité. Vocation à devenir l'infrastructure de référence pour les jumeaux de territoires en France, en comblant le fossé entre l'échelle mondiale (DestinE) et les applications locales.

### MC19 - Propriété et confidentialité des données

Toutes les données produites dans le cadre du programme JUNN
sont des données ouvertes (open data IGN). Le socle JUNN permettra par ailleurs
de gérer des données non-ouvertes, en particulier pour les usages sensibles
(sécurité, infrastructure critique).

### MC20 - Standardisation

Standards géospatiaux internationaux (OGC : WMS, WFS, 3D Tiles, CityGML ; INSPIRE). Interopérabilité avec DestinE. Stack technique open-source pour favoriser l'adoption et la réutilisation par les collectivités et partenaires de recherche.

### MC21 - Sécurité et sûreté

Sécurité des données territoriales sensibles (infrastructure critique, occupation des sols stratégique). Souveraineté numérique des données géographiques nationales (rôle central de l'IGN). Disponibilité et intégrité du jeu de données de référence.

---

## Enjeux scientifiques et techniques

*Chaque enjeu est annoté par les questions de recherche (RQ_X) de la feuille de route EDT [[Combemale et al., 2025](https://inria.hal.science/hal-05223776)]. JUNN est un cas d'usage intégrateur, destiné à bénéficier des résultats de l'ensemble des projets ciblés EDT (PC1 à PC5).*

### Modélisation hybride multi-sources et multi-échelles (PC1)

Combiner des modèles de natures très différentes (raster, vecteur, maillage 3D, modèles de simulation physique) et des données d'échelles hétérogènes (mondiale, nationale, locale) au sein d'une représentation cohérente et exploitable du territoire.

RQ associées : RQ_I3 (hybridation de modèles), RQ_I4 (opérateurs d'hybridation), RQ_D6 (évolution des modèles)

### Interopérabilité des outils et des données géospatiales (PC2)

Assurer la compatibilité et l'échange entre des sources de données hétérogènes (IGN, SIRADEL, LUXCARTA, DestinE, IoT terrain), des formats variés (raster, vecteur, 3D Tiles, CityGML), les modèles de simulations et des platformes différentes, tout en respectant les standards OGC et INSPIRE.

RQ associées : RQ_D11 (interopérabilité sémantique), RQ_E1 (standardisation des interfaces), RQ_E2 (modularisation)

### Gestion du cycle de vie et développement collaboratif des modèles (PC3)

Gérer l'évolution continue du jeu de données 3D ouvert, des modèles et de la fondation logicielle open-source dans un contexte multi-acteurs (IGN, collectivités, chercheurs, industriels), en assurant la traçabilité des versions, la cohérence des mises à jour et la gouvernance ouverte.

RQ associées : RQ_D6 (évolution des modèles), RQ_E3 (co-simulation et composition), RQ_D4 (qualité et couverture des données)

### Collecte intelligente de données territoriales (PC4)

Optimiser les stratégies d'acquisition de données géospatiales à grande échelle (type, résolution, fréquence de mise à jour) pour alimenter les JNT de manière efficiente, en s'appuyant sur des capteurs IoT, des drones, des satellites et des sources participatives.

RQ associées : RQ_D3 (collecte de données hétérogènes), RQ_D4 (qualité et couverture des données), RQ_D2 (incertitude des données)

### Interactions humain-machine pour l'exploration territoriale (PC5)

Concevoir des interfaces de visualisation et d'exploration du modèle adaptées à des utilisateurs aux profils variés (décideurs, chercheurs, grand public), permettant une interrogation intuitive, la comparaison de scénarios et l'interprétation des résultats de simulation.

RQ associées : RQ_F5 (interfaces et visualisation), RQ_F2 (explicabilité), RQ_F3 (composition et incertitude)

### Passage à l'échelle nationale

Relever les défis techniques du déploiement à l'échelle nationale d'un socle de jumeau numérique territorial (volumétrie des données, calcul distribué, temps de rendu 3D, gestion des mises à jour continues) tout en maintenant des performances d'accès et  d'appropriation pour les utilisateurs.

RQ associées : RQ_E4 (scalabilité), RQ_E5 (performance et temps réel), RQ_I2 (composition de simulations)

---

## Matériel

## Références

- [Poster JNFT](/media/use-cases/uc10b-poster-jnft-ign.pdf) - Use Case Workshop, Lyon, 6-7 janvier 2026
- Combemale B., Vicat-Blanc P., Blouin A., Bril El Haouzi H., Bruel J.-M. et al. [Engineering Digital Twins: A Research Roadmap](https://inria.hal.science/hal-05223776). EDTconf 2025 - 2nd International Conference on Engineering Digital Twins, Oct 2025, Grand Rapids, Michigan, United States. pp.1-7. ⟨hal-05223776⟩ - feuille de route scientifique du programme EDT (codes RQ_X).

## Thèses en cours
