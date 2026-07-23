---
id: uc19
title: Systèmes robotiques industriels manipulant des objets souples
provider: IRT Jules Verne / ERT ROC
contacts:
  - name: Sébastien Gérard
    org: IRT Jules Verne / ERT ROC
    email: sebastien.gerard@irt-jules-verne.fr
    role: Ingénieur R&D Expert Technique, Robotique et Cobotique
summary: >-
  Jumeau numérique d'un ou plusieurs bras robotisés automatisant la manipulation industrielle d'objets physiques souples (tissus composites, câbles). Le JN sert à la fois à la conception - maîtrise des comportements complexes, analyse de sécurité pour la certification CE - et à l'exécution - support au comportement cognitif du robot et sélection des actions de manipulation optimales dans des environnements ouverts, potentiellement partagés avec des opérateurs humains.
lang: fr
photo: /media/uploads/irt_jules_vernes.png
# domain : industrial-engineering | energy | geospatial | maritime | telecommunications | environment | health | robotics | agriculture | other
domain: robotics
# maturity : concept | poc | prototype | operational
maturity: poc
# originType : natural | anthropic | engineered | infrastructure | process
originType: engineered
version: r0.1
status: published
tags:
  - robotique-industrielle
  - cobotique
  - objets-souples
  - tissus-composites
  - analyse-securite
  - certification-ce
  - sysmLv2
  - ros2
publishedDate: 2026-06-24T00:00:00.000Z
---

## Résumé

Ce cas d'usage porte sur le **jumeau numérique de systèmes robotiques industriels** manipulant des objets physiques souples - typiquement des tissus composites ou des câbles - dans le cadre de processus d'automatisation industrielle. Le système physique est une ou plusieurs cellules robotisées (bras de type collaboratif ou industriel) opérant sur une plateforme robotique existante au sein de l'IRT Jules Verne / ERT ROC.

Le jumeau numérique couvre deux temporalités complémentaires. À la **conception**, il permet de maîtriser les comportements complexes du robot (atteignabilité, positions singulières, collisions) et de structurer le travail collaboratif nécessaire à l'analyse de sécurité des systèmes robotiques - y compris les architectures système de systèmes (SoS) - pour la certification CE. À l'**exécution**, il supporte le comportement cognitif du robot en environnement ouvert (potentiellement partagé avec des opérateurs humains) et lui permet de sélectionner les meilleures séquences d'actions pour manipuler les objets souples.

La pile technique initiale s'appuie sur **SysON** (modélisation SysMLv2), **ROS 2** (middleware robotique) et **Rust** (composants temps réel), avec des modèles préliminaires URDF et SysMLv2 au démarrage du projet.

---

## Description fonctionnelle

### Utilisateurs

- **Un programmeur robot** - conçoit et vérifie les programmes de manipulation à l'aide du JN (atteignabilité, détection de collisions, positions singulières)
- **Un ingénieur sécurité** - réalise l'analyse de sécurité du système robotique (FMEA, HAZOP, SoS) pour la certification CE à partir des modèles SysMLv2
- **Un opérateur de production** - supervise la cellule robotisée en temps réel, reçoit des alertes et peut interagir avec le robot dans un environnement partagé
- **Un intégrateur système** - compose le JN robot avec d'autres JN (cellule, ligne) dans une architecture SoS

### Besoins fonctionnels

- **Décrire + Vérifier** · *Un programmeur robot* **veut simuler et vérifier le comportement du bras robotisé** (zones d'atteignabilité, détection de singularités et de collisions) pour valider un programme de manipulation avant tout déploiement physique. **Métrique :** couverture des configurations explorées, absence de faux négatifs sur les collisions.

- **Analyser + Sécuriser** · *Un ingénieur sécurité* **veut instrumenter l'analyse de sécurité du système robotique (SoS)** avec les modèles SysMLv2 du JN pour structurer le travail collectif et produire la documentation requise pour la certification CE. **Métrique :** conformité aux normes de sécurité machines (EN ISO 10218, EN ISO/TS 15066 pour la cobotique).

- **Contrôler + Optimiser** · *Un robot en exploitation* **veut sélectionner en temps réel la meilleure séquence d'actions** pour manipuler un objet souple (tissu composite, câble) dans un environnement ouvert, en tenant compte des déformations de l'objet et de la présence éventuelle d'humains. **Métrique :** taux de succès de la manipulation, temps de cycle, distance de sécurité humain-robot.

---

## Caractérisation du Jumeau Numérique

*Grille basée sur le <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">framework unifié de Gil et al. (2024)</a> - 21 caractéristiques.*

### MC1 - Système étudié

Un ou plusieurs bras robotisés (type collaboratif ou industriel) automatisant la manipulation d'objets physiques souples - tissus composites, câbles - dans un atelier industriel. L'environnement est semi-structuré : position et déformation des objets manipulés sont partiellement imprévisibles. Les agents présents incluent les robots eux-mêmes, potentiellement des opérateurs humains (cobotique), des programmeurs et des techniciens de maintenance.

### MC2 - Composants d'action physiques

À la conception : aucun actionnement direct - le JN opère en simulation pour valider les trajectoires et les analyses de sécurité. À l'exécution : consignes de trajectoire et de force calculées par le JN et transmises au contrôleur du bras robotisé via ROS 2. Le JN agit comme un module de planification d'actions qui sélectionne dynamiquement la meilleure stratégie de manipulation selon l'état courant de l'objet souple.

### MC3 - Composants de captation physiques

- **Encodeurs d'articulations** - position et vitesse angulaire de chaque axe du bras (proprioception)
- **Capteurs de force/couple** - effort appliqué par l'effecteur sur l'objet (retour tactile)
- **Capteurs de vision** - caméras RGB et/ou capteurs de profondeur pour la perception de l'objet souple (forme, déformation, position 3D)
- **Capteurs de proximité** (cobotique) - détection de la présence humaine dans l'espace de travail
- **Éventuellement** : capteurs de déformation embarqués sur les outils (jauges, capteurs à fibres optiques)

### MC4 - Interaction physique → virtuel

Collecte des données proprioceptives (positions, vitesses, couples articulaires) et extéroceptives (images, nuages de points 3D de l'objet) en temps réel via ROS 2. Estimation de l'état de l'objet souple (forme déformée, position) à partir des mesures capteurs - problème inverse difficile. Mise à jour du modèle déformable de l'objet pour maintenir la cohérence entre représentation virtuelle et état physique réel.

### MC5 - Interaction virtuel → physique

Boucle de contrôle active à l'exécution : le JN calcule les trajectoires optimales et les consignes de force, puis les transmet au contrôleur du robot via ROS 2. Sélection des actions de manipulation (approche, saisie, déplacement, pose) adaptées à l'état courant de l'objet souple. À terme : modulation du comportement du robot en présence d'humains (adaptation de la vitesse, des forces, des trajectoires).

### MC6 - Services du JN

- **Vérification comportementale (design-time)** : calcul des zones d'atteignabilité, détection des positions singulières et des collisions pour chaque configuration du programme robot
- **Analyse de sécurité (design-time)** : structuration et outillage de l'analyse FMEA/HAZOP du SoS robotique, génération de la documentation pour la certification CE
- **Planification d'actions (run-time)** : sélection de la meilleure séquence d'actions de manipulation selon l'état courant de l'objet souple et du contexte
- **Simulation what-if** : exploration de scénarios de manipulation alternatifs (démantèlement nucléaire, configurations inattendues)
- **Support à la cobotique** : modélisation de l'espace de travail partagé, adaptation du comportement robot en présence humaine

### MC7 - Échelle temporelle

Architecture bi-temporelle. **Design-time** : simulation plus rapide que le temps réel pour l'exploration exhaustive des configurations (vérification formelle, analyse de sécurité). **Run-time** : boucle de contrôle temps réel strict (cadence ROS 2, typiquement < 10 ms pour le contrôle articulaire) couplée à une planification d'actions à horizon plus long (centaines de ms à quelques secondes).

### MC8 - Multiplicités

Architecture multi-niveau : JN du bras robotisé (cinématique/dynamique) + JN de l'objet souple manipulé (modèle déformable) + JN de la cellule (espace de travail, obstacles, présence humaine). Extension naturelle vers un SoS (système de systèmes) pour les cellules multi-robots. La composition de ces JN - notamment entre le JN robot et le JN objet souple - constitue un enjeu scientifique central.

### MC9 - Phases du cycle de vie

Conception et ingénierie système (analyse de sécurité, certification CE), programmation et validation des cellules robotisées, exploitation (contrôle run-time, adaptation comportementale), maintenance et requalification. Application envisagée au démantèlement de centrales nucléaires (cycle de vie du site).

### MC10 - Modèles et données

- **Modèles URDF** (Unified Robot Description Format) : description géométrique et cinématique du bras robotisé - modèle de départ disponible
- **Modèles SysMLv2** : architecture système, diagrammes fonctionnels et de sécurité, interfaces SoS - modèles préliminaires disponibles (via SysON)
- **Modèles cinématiques et dynamiques** : calcul des espaces atteignables, détection de singularités et de collisions
- **Modèles déformables** des objets souples (Position-Based Dynamics, éléments finis réduits, réseaux de neurones) : à construire - défi central du UC
- **Données** : séquences de manipulation enregistrées, nuages de points 3D, données de force/couple

### MC11 - Outils et facilitateurs

- **SysON** - éditeur SysMLv2 open-source (Eclipse/Sirius) pour la modélisation système et l'analyse de sécurité
- **ROS 2** - middleware robotique (communication temps réel, drivers capteurs/actionneurs, outils de visualisation)
- **Rust** - langage système pour les composants temps réel critiques (sécurité mémoire, performance)
- Bibliothèques de simulation robotique (MoveIt 2, Gazebo ou Isaac Sim pour la physique) et de modélisation des objets déformables

### MC12 - Constellation du JN

Chaîne : capteurs physiques (encodeurs, vision, F/T) → ROS 2 → estimateur d'état de l'objet souple → [modèle URDF/cinématique du robot] + [modèle déformable de l'objet] + [modèle SysMLv2 système] → planificateur d'actions → contrôleur ROS 2 → actionneurs. Les modèles SysMLv2 alimentent l'analyse de sécurité à la conception ; les modèles physiques alimentent la planification à l'exécution.

### MC13 - Processus de jumelage et évolution

Au démarrage du projet : plateforme robotique physique existante + modèles préliminaires URDF et SysMLv2. Évolution progressive : enrichissement des modèles déformables d'objets souples par calibration sur données réelles, intégration de la boucle de contrôle run-time, extension à des scénarios industriels concrets (aéronautique composite, câblage, démantèlement).

### MC14 - Fidélité et validité

La fidélité du modèle robot (URDF + cinématique) est élevée et bien maîtrisée. La fidélité du modèle d'objet souple est le défi central : flexibilité, friction, jeux et comportements non-linéaires sont difficiles à modéliser avec une précision suffisante pour la planification d'actions en temps réel. Calibration itérative sur données réelles de manipulation nécessaire.

### MC15 - Connexion technique

ROS 2 comme middleware principal (topics, services, actions) entre le JN et les composants physiques. Interface SysON/SysMLv2 vers les outils d'analyse de sécurité et de certification. Composants Rust pour les boucles temps réel critiques. Protocoles standards des contrôleurs robotiques (EtherCAT, CAN).

### MC16 - Hébergement / déploiement

Design-time : stations de travail d'ingénierie (SysON desktop ou cloud). Run-time : contrôleur embarqué sur la cellule robotisée (contraintes de latence temps réel strictes). Potentiellement : déport de la planification d'actions sur un serveur de calcul (edge computing) relié au contrôleur local via ROS 2.

### MC17 - Insights et prise de décision

- **Design-time** : cartes d'atteignabilité, rapports de collision et de singularité, documentation d'analyse de sécurité pour la certification CE
- **Run-time** : séquence d'actions de manipulation recommandée, avec évaluation de la probabilité de succès selon l'état estimé de l'objet souple
- **Alertes cobotiques** : détection de la présence humaine et adaptation comportementale du robot
- **Exploration de scénarios** : simulation de situations extrêmes ou rares (positions singulières, objet mal positionné, présence inattendue d'un opérateur)

### MC18 - Intégration horizontale

Composition avec d'autres JN au sein d'une cellule ou d'une ligne de production (SoS). Intégration avec les outils PLM/MES de l'entreprise (nomenclature des pièces, gammes opératoires). Potentiel d'interfaçage avec des systèmes de vision industrielle et des plateformes de simulation robotique (Gazebo, Isaac Sim). Extension aux SoS de démantèlement nucléaire (multi-robots, multi-sites).

### MC19 - Propriété et confidentialité des données

Les données de processus industriel (géométries des pièces, séquences de fabrication, paramètres de manipulation) sont propriétaires et confidentielles. Les modèles SysMLv2 d'analyse de sécurité pour la certification CE sont des documents réglementaires sensibles. Accès contrôlé aux données et aux modèles.

### MC20 - Standardisation

**SysMLv2** (standard OMG) pour la modélisation système et l'analyse de sécurité. **URDF** (standard ROS) pour la description géométrique des robots. **ROS 2** (standard de facto pour la robotique industrielle). **EN ISO 10218** et **EN ISO/TS 15066** pour la sécurité des robots collaboratifs. Absence de standard unifié pour les modèles d'objets déformables - enjeu de standardisation ouvert.

### MC21 - Sécurité et sûreté

La cobotique impose des exigences de sécurité strictes : la présence humaine dans l'espace de travail du robot doit être détectée et gérée en temps réel. La certification CE des systèmes robotiques (directive Machines 2006/42/CE, future 2023/1230/UE) requiert une analyse de sécurité formelle. Le scénario du démantèlement nucléaire ajoute des exigences de sûreté de niveau supérieur (environnement hostile, conséquences graves d'une défaillance). La séparation design-time / run-time dans le JN garantit que les simulations exploratoires n'interfèrent pas avec le contrôle réel.

---

## Enjeux scientifiques et techniques

*Chaque enjeu est annoté par les questions de recherche (RQ_X) de la feuille de route EDT [[Combemale et al., 2025](https://inria.hal.science/hal-05223776)].*

### Modélisation temps réel des objets physiques souples (tissus composites, câbles)

La modélisation fidèle et efficace d'objets déformables - tissus composites anisotropes, câbles, fils - constitue le défi scientifique central de ce UC. Les approches par éléments finis offrent une haute fidélité mais sont trop coûteuses pour le temps réel ; les approches Position-Based Dynamics (PBD) sont rapides mais approximatives ; les modèles neuronaux peuvent approximer le comportement mais nécessitent de grandes quantités de données d'entraînement. L'enjeu est de construire un **modèle hybride** physique + ML qui soit à la fois suffisamment fidèle pour planifier des actions de manipulation et suffisamment rapide pour opérer en boucle de contrôle temps réel.

RQ associées : RQ_I3 (hybridation de modèles physiques et ML), RQ_I4 (opérateurs d'hybridation), RQ_D2 (incertitude des données de déformation), RQ_I5 (enveloppe de validité du modèle déformable)

### Adaptabilité run-time du jumeau numérique

Le JN doit s'adapter en continu à l'état réel du système : déformations imprévisibles de l'objet manipulé, changements de configuration de la cellule, présence ou absence d'opérateurs humains. L'enjeu est de concevoir des **mécanismes d'adaptation run-time** qui permettent au JN de mettre à jour ses modèles à partir de données capteurs partielles et bruitées, sans interruption de la boucle de contrôle. Cela inclut l'estimation d'état en temps réel de l'objet souple à partir d'images (vision) et de données de force (tactile).

RQ associées : RQ_D6 (évolution des modèles en ligne), RQ_I6 (assimilation de données temps réel), RQ_I2 (composition de simulations à différentes fidélités)

### Interaction JN–opérateur dans des espaces de décision complexes

Certains scénarios (démantèlement de centrales nucléaires, manipulation de tissus composites à haute valeur) impliquent un très grand nombre de configurations possibles et des conséquences potentiellement graves d'une mauvaise décision. L'enjeu est de concevoir des **interfaces d'interaction JN–opérateur** qui permettent à l'opérateur de comprendre et de valider les recommandations du JN, de naviguer dans l'espace des scénarios possibles, et de garder la main sur les décisions critiques - sans être submergé par la complexité.

RQ associées : RQ_F1 (vérification des comportements), RQ_F4 (analyse de défaillances et scénarios extrêmes), RQ_E1 (interfaces standardisées entre JN et opérateurs)

### Analyse de sécurité formelle des SoS robotiques pour la certification CE

Les cellules robotisées impliquant plusieurs robots, des opérateurs humains et des objets manipulés constituent des **systèmes de systèmes** (SoS) dont l'analyse de sécurité est complexe. L'enjeu est de coupler les modèles SysMLv2 du JN avec des méthodes formelles d'analyse de sécurité (FMEA, FTA, HAZOP) pour automatiser (ou semi-automatiser) la production de la documentation de certification CE, tout en permettant un travail collaboratif entre les parties prenantes (programmeurs, ingénieurs sécurité, auditeurs).

RQ associées : RQ_E2 (modularisation et composabilité des JN dans un SoS), RQ_F3 (composition et propagation d'incertitudes), RQ_E3 (co-simulation inter-JN), RQ_I5 (validité des analyses de sécurité)

---

## Matériel

Au démarrage du projet, la plateforme disponible comprend :

- **Plateforme robotique physique** de l'IRT Jules Verne (ERT ROC) avec bras robotisés instrumentés
- **Modèles URDF** préliminaires du ou des robots
- **Modèles SysMLv2** préliminaires (via SysON) décrivant l'architecture système

## Références

- [Poster UC19 - Systèmes robotiques industriels manipulant des objets souples](/media/use-cases/uc19-poster-industrial-robotics-irt-jules-verne.pdf)
- [SysON](https://eclipse.dev/syson/) - Éditeur SysMLv2 open-source (Eclipse Foundation)
- [ROS 2](https://docs.ros.org/en/rolling/) - Robot Operating System 2
- Combemale B. et al. [Engineering Digital Twins: A Research Roadmap](https://inria.hal.science/hal-05223776). EDTconf 2025, Grand Rapids, Michigan. ⟨hal-05223776⟩

## Thèses en cours
