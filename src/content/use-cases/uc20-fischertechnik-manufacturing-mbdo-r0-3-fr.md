---
id: uc20
title: Démonstrateur Fischertechnik - Jumeaux numériques pour les systèmes de production
provider: IRISA / RWTH Aachen / ISW Stuttgart / Univ. Regensburg (projet MBDO)
contacts:
  - name: Didier Vojtisek
    org: IRISA, Inria
    email: didioer.vojtisek@inira.fr
    role: Ingénieur de recherche
summary: >-
  Démonstrateur de recherche pour l'ingénierie des jumeaux numériques de systèmes de production manufacturière, basé sur une ligne Fischertechnik modulaire (stockage haute baie, manutention, transport, traitement, tri). Une architecture de référence partagée - passerelle, synchroniseur, moteur DT, gestionnaires de données et de modèles, services - est instanciée pour trois scénarios d'exploitation complémentaires : surveillance énergétique, replanification flexible et maintenance prédictive. Ce démonstrateur sert de plateforme comparative pour évaluer les approches d'ingénierie des jumeaux numériques.
lang: fr
photo: /media/use-cases/uc-default.svg
# domain : industrial-engineering | energy | geospatial | maritime | telecommunications | environment | health | robotics | agriculture | other
domain: industrial-engineering
# maturity : concept | poc | prototype | operational
maturity: prototype
# originType : natural | anthropic | engineered | infrastructure | process
originType: engineered
version: r0.3
status: published
tags:
  - manufacturing
  - systeme-de-production
  - architecture-reference
  - mqtt
  - sysmlv2
  - maintenance-predictive
  - replanification
  - surveillance-energetique
  - mbdo
publishedDate: 2026-06-24T00:00:00.000Z
---

## Résumé

Ce cas d'usage est un **démonstrateur de recherche** pour l'ingénierie des jumeaux numériques de systèmes de production. La plateforme physique est une ligne de fabrication modulaire Fischertechnik composée de six stations - magasin automatisé , deux robots à préhenseur à vide, tapis roulant, station de traitement multifonction (tour, four, pince) et ligne de tri par couleur - pilotées par trois PLCs RevPi (Plc-01 à Plc-03) via un switch Ethernet et le protocole MQTT.

Une **architecture de référence** partagée est instanciée pour trois scénarios d'exploitation de complexité croissante. Elle distingue les composants cœur du JN (passerelle DT, synchroniseur, moteur, gestionnaires de données et de modèles) des services à valeur ajoutée (monitoring, analyse, planification, notification). Cette architecture est mise en œuvre par génération de code dirigée par les modèles (MontiGem) à partir de modèles MontiArc et SysMLv2.

L'objectif principal est de montrer comment **une même infrastructure DT** peut être réutilisée pour des préoccupations opérationnelles multiples et concurrentes, et de constituer une **base de comparaison** pour l'évaluation des approches d'ingénierie des jumeaux numériques.

Ce travail est issu du projet **MBDO** (*Model-Based DevOps*, ANR + DFG), réunissant IRISA (Université de Rennes), RWTH Aachen et ISW (Univ. Stuttgart).

---

## Description fonctionnelle

### Utilisateurs

- **Un opérateur de production** - supervise la ligne en temps réel, reçoit les alertes et applique les procédures recommandées
- **Un gestionnaire d'usine** - suit la consommation énergétique agrégée, pilote les objectifs de production et évite les arrêts sur dépassement de capacité
- **Un ingénieur de maintenance** - détecte les anomalies comportementales des machines, planifie les interventions préventives et confirme les récupérations
- **Un planificateur de production** - coordonne les fenêtres de maintenance avec les objectifs de débit et minimise les temps d'arrêt non planifiés
- **Un chercheur en ingénierie des JN** - utilise le démonstrateur comme plateforme de référence pour expérimenter et comparer des approches de conception de JN

### Besoins fonctionnels

- **Décrire + Surveiller** · *Un opérateur* **veut visualiser en temps réel la consommation énergétique de chaque machine et la consommation agrégée** pour détecter les anomalies et planifier les prochaines étapes. **Métrique :** tableau de bord interactif, rafraîchissement continu, alerte si consommation agrégée s'approche ou dépasse la limite du réseau intelligent.

- **Diagnostiquer + Contrôler** · *Un gestionnaire d'usine* **veut être notifié si la consommation totale de production dépasse la limite fixée par le réseau intelligent** pour éviter un arrêt de production forcé. **Métrique :** délai de notification < cadence de mise à jour ; différence limite−consommation calculée et archivée.

- **Diagnostiquer + Optimiser** · *Un ingénieur de maintenance* **veut que le JN détecte automatiquement les disruptions de la trajectoire nominale de production et sélectionne une trajectoire alternative** pour maintenir le débit sans intervention manuelle systématique. **Métrique :** taux de détection des disruptions, temps de récupération, réduction du temps d'arrêt non planifié.

- **Prédire + Contrôler** · *Un ingénieur de maintenance* **veut que le JN surveille les déviations de vitesse moteur sous différentes charges et propose une intervention avant la défaillance** pour éviter les arrêts imprévus. **Métrique :** détection d'anomalie avant défaillance physique ; indicateurs MTBF et MTTR calculés automatiquement.

---

## Caractérisation du Jumeau Numérique

*Grille basée sur le <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">framework unifié de Gil et al. (2024)</a> - 21 caractéristiques.*

### MC1 - Système étudié

Le système étudié est un démonstrateur de système de production modulaire Fischertechnik composé d'un magasin automatisé (*High-Bay Warehouse*, HBW), de deux robots à préhenseur à vide (*Vacuum Gripper Robots*, VGR01 et VGR02), d'un convoyeur (*Conveyor Belt*, CB), d'une station de traitement multifonction (*Multi-Processing Station*, MPS) et d'une ligne de tri (*Sorting Line*, SL). Les équipements sont pilotés par des contrôleurs RevPi.

Le système manipule des jetons de différentes couleurs. Le HBW permet de stocker et de mettre à disposition des pièces sur son convoyeur intégré. Les deux VGR assurent la manutention des pièces entre les différents modules. La MPS réalise une séquence de traitement comprenant notamment un four, une table tournante, un mécanisme de transport par préhension à vide et un convoyeur de sortie. La ligne de tri permet de classer les pièces selon leur couleur et de les orienter vers différentes sorties.

Les modules sont combinés selon différents scénarios de production. Le système de commande et les interfaces avec les contrôleurs dépendent du scénario considéré et peuvent notamment inclure un système SCADA .

### MC2 - Composants d'action physiques

Les composants physiques actionnables du système comprennent les moteurs électriques ainsi que les actionneurs pneumatiques disponibles sur les différents modules de production. Les actionneurs pneumatiques sont notamment commandés par l'intermédiaire d'un compresseur et de vannes. Ces actionneurs sont pilotés par les PLC auxquels les équipements sont connectés. Selon le scénario considéré, le jumeau numérique peut transmettre des commandes à ces PLC, directement ou via le système de commande de l'installation, à différents niveaux d'abstraction.

Au niveau élémentaire, il peut commander des actions individuelles, telles que le déplacement d'un axe de robot, la rotation d'un mécanisme, le déplacement d'un convoyeur ou l'activation d'un actionneur pneumatique. Au niveau fonctionnel, il peut également déclencher des séquences composées de plusieurs actions élémentaires. Par exemple, un VGR peut recevoir une commande de prise, déplacement et dépôt d'une pièce, tandis que la MPS peut exécuter une séquence combinant l'introduction d'une pièce dans le four, son transfert vers la table tournante, son traitement et son éjection vers le convoyeur de sortie.

Certains scénarios peuvent également inclure des actions réalisées par un opérateur humain. Le jumeau numérique peut alors générer une demande d'intervention à destination de l'opérateur, qui réalise l'action requise sur le système physique.

### MC3 - Composants de captation physiques

Les composants de captation comprennent les encodeurs et compteurs d'impulsions des axes motorisés, les interrupteurs de référence et les barrières lumineuses intégrées aux différentes stations. Les encodeurs permettent d'obtenir des informations sur la position et le mouvement des axes, tandis que les interrupteurs de référence fournissent des positions de référence. Les barrières lumineuses détectent la présence et le passage des pièces aux points de transfert et de sortie. La ligne de tri dispose également d'un capteur de couleur permettant de déterminer la couleur des pièces.

L'état des actionneurs des équipements - notamment des moteurs, des vannes et des compresseurs - est également observable par le système de contrôle à intervalles réguliers. Des mesures de consommation énergétique peuvent en outre être acquises au niveau des équipements au moyen de mécanismes d'instrumentation adaptés à l'installation.

Les données issues de ces mécanismes de captation sont transmises par les systèmes de contrôle et peuvent être mises à disposition du jumeau numérique. Certaines informations, telles que la position ou la vitesse des axes, peuvent également être dérivées des signaux bruts de captation.

### MC4 - Interaction physique → virtuel

Les données issues du système physique sont transmises par les PLC au broker MQTT, qui constitue le mécanisme de communication entre le système physique et le jumeau numérique. La DigitalTwin-Gateway reçoit les messages MQTT et filtre, transforme ou agrège les données avant de les transmettre au jumeau numérique. Selon leur nature et leur utilisation, certaines données peuvent ainsi être conservées, agrégées ou ignorées.

Pour les données produites par les PLC, la fréquence de publication des données brutes dépend de la fréquence d'acquisition et de traitement configurée dans les PLC. La fréquence effective de mise à jour du jumeau numérique peut donc différer de cette fréquence brute, notamment lorsque les données sont filtrées ou agrégées par la Gateway.

### MC5 - Interaction virtuel → physique

Les sorties générées par le jumeau numérique sont transmises au système de commande de l'installation. Selon le scénario considéré, le jumeau numérique peut soit se substituer au système SCADA pour commander directement les équipements via les interfaces de communication disponibles, soit interagir avec le backend du SCADA en se substituant à son interface opérateur.

Les commandes disponibles correspondent aux capacités d'actionnement définies dans MC2. Elles peuvent être émises à différents niveaux d'abstraction, depuis des actions élémentaires sur les actionneurs jusqu'à des opérations fonctionnelles composées de plusieurs actions. Par exemple, le jumeau numérique peut demander le déplacement d'un axe, l'activation d'un actionneur ou le déplacement d'un convoyeur, ou déclencher une opération fonctionnelle telle que la prise, le déplacement et le dépôt d'une pièce ou une séquence complète de traitement dans la station multifonction.

Lorsque le jumeau numérique interagit avec le backend du SCADA, celui-ci peut également fournir des scénarios d'exécution prédéfinis. Ces scénarios, définis manuellement ou générés à partir d'un modèle, encapsulent des séquences complexes d'actions et peuvent être déclenchés par le jumeau numérique comme des opérations de plus haut niveau.

### MC6 - Services du JN

Le jumeau numérique est prévu pour répondre à minima à 3 cas d'utilisations: Surveillance énergétique, Replanification flexible et Maintenance prédictive qui combinent les services suivants:  .

- **Acquisition et contextualisation des données**
  - collecte des données temps réel ;
  - synchronisation avec le DT ;
  - enrichissement par le contexte (modèle, scénario, historique...).
- **Visualisation et supervision**
  - visualisation de l'état courant ;
  - tableaux de bord ;
  - consultation de l'historique ;
  - notifications.
- **Analyse**
  - calcul d'indicateurs (KPI) ;
  - agrégation ;
  - corrélation entre données ;
  - comparaison comportement attendu / observé ;
  - détection de dérive ou d'anomalie.
- **Décision et optimisation**
  - optimisation énergétique ;
  - replanification ;
  - sélection de scénarios alternatifs ;
  - recommandations.
- **Pilotage**
  - exécution de commandes ;
  - exécution de missions ;
  - interaction avec le SCADA ;
  - interaction avec l'opérateur.

### MC7 - Échelle temporelle

Multi-temporelle : **event-driven** (MQTT) pour l'acquisition capteurs et la détection de disruptions (latence < temps de cycle machine), **cyclique par pièce produite** pour l'enrichissement contextuel et la détection d'anomalie moteur (UC3), **périodique** pour la récupération de la limite réseau (REST, UC1) et le calcul des KPI, **long terme** pour l'historisation et l'analyse rétrospective (InfluxDB, PostgreSQL).

### MC8 - Multiplicités

Les trois scénarios fonctionnent en parallèle sur la **même infrastructure DT partagée** (gateway, synchronizer, engine, data manager). Chaque scénario instancie ses propres services (Shadow Aggregator, Replanning Service, Maintenance Planner) qui opèrent de manière indépendante mais partagent l'accès aux mêmes digital shadows. Cette architecture multi-service illustre la **fédération de JN** sur un même système physique.

### MC9 - Phases du cycle de vie

Le jumeau numérique intervient principalement durant la phase d'exploitation (*as-operated*) de la ligne de production, où il assure la supervision, l'analyse et le pilotage du système physique. Il s'appuie également sur des modèles de conception (*as-designed*), notamment des modèles SysMLv2 et MontiArc, qui décrivent l'architecture et le comportement attendu du système et servent de référence pour l'analyse, la validation et la replanification.

### MC10 - Modèles et données

**Modèles**

Les modèles numériques représentent la structure, le comportement et la sémantique du système physique.

- **Modèles structurels SysMLv2** : description des équipements, de leurs propriétés, ports, interfaces et de la topologie de l'installation.
- **Modèles architecturaux (MontiArc)** : description de l'architecture fonctionnelle de la ligne, des composants, de leurs interfaces et des flux entre eux. Ces modèles servent notamment à générer certaines parties du jumeau numérique.
- **Modèles comportementaux SysMLv2** : description des comportements attendus, des séquences de production et des machines d'états utilisées pour suivre l'évolution du procédé et détecter des écarts.
- **Asset Administration Shell (AAS)** : représentation normalisée des actifs, de leurs propriétés et des métadonnées associées, utilisée pour contextualiser les équipements et faciliter leur intégration.

**Données**

Les données représentent l'état courant, l'historique et les connaissances construites à partir de l'exploitation du système.

- **État courant du système** : représentation synchronisée des états des équipements, des pièces et des variables observées.
- **Historique** : séries temporelles des mesures, événements et états collectés durant l'exploitation.
- **Données contextuelles** : informations de production, paramètres de fonctionnement, événements, consommation énergétique, etc.
- **Connaissances dérivées** : profils de référence (*baseline*), indicateurs, modèles statistiques ou analytiques construits à partir des données historiques et utilisés pour l'analyse, la détection d'anomalies ou l'aide à la décision.

Un particularité du processus de construction du jumeau FischerTechnik est que les schémas de donnée sont inférés autant que possible depuis les modèles pour en formaliser le mapping.

### MC11 - Outils et facilitateurs

Le développement et l'exécution du jumeau numérique s'appuient sur des technologies d'**Ingénierie Dirigée par les Modèles (IDM/MDE)** et sur une infrastructure logicielle assurant l'intégration avec le système physique et l'exécution des services du DT.

- **Technologies et outils IDM/MDE** - les modèles constituent un moyen central de spécifier la structure, le comportement et les processus associés au système de production. La plateforme s'appuie notamment sur des technologies de modélisation architecturale, telles que MontiArc, sur des modèles basés sur SysMLv2 pour décrire la structure et le comportement des systèmes, ainsi que sur des formalismes de modélisation de processus tels que BPMN lorsque cela est nécessaire pour représenter et orchestrer des workflows.
- **MontiGem** - générateur dirigé par les modèles utilisé par certains scénarios et permettant de produire une partie de l'application du jumeau numérique à partir de modèles, notamment le backend du JN, la persistance des données et le frontend du DT. Des interfaces avec les systèmes externes et des comportements spécifiques peuvent être ajoutés sous forme de code manuel.
- **Infrastructure du jumeau numérique** - ensemble de composants logiciels fournissant les fonctions communes nécessaires aux services du DT, notamment la gestion des interfaces avec le système physique, la synchronisation, la gestion des données, la gestion des modèles et l'orchestration des services.
- **Interfaces de communication du DT** - mécanismes permettant de connecter le jumeau numérique aux systèmes de contrôle de l'installation. Dans la configuration étudiée, MQTT est utilisé comme infrastructure de communication et d'agrégation des données issues des équipements physiques avant leur traitement par le jumeau numérique
- **Gestionnaires de données et de modèles** - composants fournissant aux services du DT un accès aux modèles numériques, aux données d'exploitation, aux historiques et aux connaissances dérivées, indépendamment des mécanismes de stockage sous-jacents.
- **AAS Manager** - composant permettant aux services du DT d'accéder aux informations d'actifs et à leurs métadonnées représentées sous forme d'Asset Administration Shells (AAS), et de les exploiter pour contextualiser les équipements et leurs propriétés.
- **Environnement d'exécution et d'intégration** - composants logiciels, notamment développés en Java/Spring Boot, permettant d'implémenter les interfaces avec les systèmes externes ainsi que les comportements et services spécifiques qui ne sont pas générés automatiquement.
- **Workflow Controller** - composant d'orchestration permettant de coordonner des séquences de traitement et des boucles de décision impliquant l'analyse des données, la planification et l'exécution d'actions.
- **Mécanismes de persistance** - **InfluxDB** est utilisé pour la persistance des données temporelles et des séries de mesures, tandis que **PostgreSQL** est utilisé pour les données relationnelles et structurées nécessaires aux services du DT.

### MC12 - Constellation du JN

```
Système physique
    ↕ MQTT
DT Gateway (DT-MQTT Upstream/Downstream Interfaces)
    ↕
DT Engine (Controller + Service Manager + Synchronizer)
    ↓                   ↓              ↓
    ↓           Data Manager      Model Manager
    ↓           (InfluxDB +        (SysMLv2Parser +
    ↓            PostgreSQL)        AAS Manager)
    ↓
    Services 
   ├── Monitoring & Visualization 
   ├── Data Aggregation & Historization 
   ├── Analysis & Anomaly Detection 
   ├── Energy Management & Optimization 
   ├── Planning & Replanning 
   ├── Predictive Maintenance 
   ├── Notification & Decision Support 
   └── Execution & Control

```

La constellation du jumeau numérique est orchestrée par un moteur DT qui coordonne la synchronisation avec le système physique, l'accès aux modèles et aux données, ainsi que l'exécution des services du jumeau numérique. Les données issues des contrôleurs et des équipements physiques sont collectées et agrégées par l'intermédiaire du gateway et de l'infrastructure MQTT, puis intégrées au jumeau numérique par le synchroniseur. Le Data Manager fournit aux services l'accès aux données courantes et historiques, tandis que le Model Manager fournit l'accès aux modèles numériques et aux informations sémantiques associées. Le Service Manager orchestre l'exécution des services et coordonne leurs interactions avec les données, les modèles et le système physique

### MC13 - Processus de jumelage et évolution

Le développement du jumeau numérique suit une approche itérative inspirée de l'Ingénierie Dirigée par les Modèles et du DevOps. Le système physique et son jumeau numérique peuvent être conçus et faire l'objet d'une co-évolution. Les modèles de conception décrivent la structure, le comportement et les propriétés attendues du système et peuvent être utilisés pour générer ou configurer les composants logiciels du jumeau numérique.

Après déploiement, les données et événements collectés durant l'exploitation permettent de vérifier le comportement du système, d'identifier des écarts ou de nouveaux besoins et de faire évoluer les modèles, les configurations et les services du jumeau numérique. Les modifications peuvent être introduites par les concepteurs durant les phases de développement, par les opérateurs au cours de l'exploitation ou, lorsque cela est prévu par le scénario, automatiquement à partir des données et événements observés.

Le processus forme ainsi une boucle continue entre modélisation, génération et intégration, déploiement, exploitation, observation et évolution. Les modifications du système physique peuvent entraîner une évolution des modèles et des services du jumeau numérique, tandis que l'analyse de l'exploitation du jumeau numérique peut conduire à des adaptations du système physique, de ses contrôleurs ou de son architecture de commande.

L'approche permet ainsi de faire évoluer progressivement la constellation du jumeau numérique et ses services sans imposer une séquence fixe de cas d'utilisation. De nouveaux modèles, services et mécanismes d'intégration peuvent être ajoutés en fonction des besoins du scénario et de l'évolution du système physique.

L'implémentation actuelle ne couvre toutefois pas encore l'ensemble de cette boucle. Les mécanismes de modélisation, de génération, d'intégration, de déploiement et d'exploitation sont disponibles ou en cours d'intégration, mais l'utilisation systématique des données issues de l'exploitation pour faire évoluer automatiquement ou semi-automatiquement les modèles du système et du jumeau numérique reste un objectif de développement.

### MC14 - Fidélité et validité

La fidélité des modèles constituant le jumeau numérique est adaptée aux objectifs du scénario et aux services fournis. La plateforme ne suppose pas l'existence d'une représentation unique et complète du système physique : plusieurs modèles ou instances spécialisées du jumeau numérique peuvent représenter différents aspects du système avec des niveaux de détail distincts. Un service peut ainsi utiliser une représentation comportementale ou fonctionnelle du système sans nécessiter une représentation géométrique ou topologique détaillée, tandis que d'autres services peuvent exploiter des modèles plus détaillés lorsque cela est nécessaire.

La validité d'une représentation est donc évaluée par rapport à l'usage auquel elle est destinée et aux propriétés du système qu'elle doit reproduire ou exposer. Les modèles structurels et comportementaux peuvent être vérifiés par rapport aux propriétés et comportements attendus du système, tandis que les représentations synchronisées avec le système physique sont confrontées aux données et événements observés durant l'exploitation. Les écarts entre le comportement attendu et le comportement observé peuvent ainsi être utilisés pour identifier des anomalies ou des incohérences.

Les différents modèles et représentations peuvent être combinés ou faire l'objet d'une collaboration entre plusieurs instances spécialisées du jumeau numérique. Cette approche permet de limiter la complexité et le coût de représentation aux informations nécessaires au service considéré, tout en conservant la possibilité d'enrichir progressivement la représentation lorsque de nouveaux besoins apparaissent.

La gestion explicite des incertitudes et la quantification systématique des erreurs de représentation constituent encore des aspects à approfondir. La validation actuelle repose principalement sur la comparaison entre les modèles et comportements attendus, les états observés du système physique et les résultats attendus des scénarios d'utilisation. Dans la mesure du possible, les modèles comportementaux utilisés par le jumeau numérique sont dérivés des modèles et spécifications élaborés durant la phase de conception, conformément à l'approche Model-Based DevOps. La validation consiste ainsi notamment à vérifier la cohérence entre le comportement spécifié lors de la conception, le comportement implémenté dans le jumeau numérique et le comportement observé sur le système physique.

### MC15 - Connexion technique

La connexion technique entre le système physique et le jumeau numérique dépend de la frontière du système physique retenue pour le scénario considéré. Les données provenant des équipements physiques sont collectées de manière unifiée via une infrastructure MQTT. Les PLC publient les états et mesures disponibles, qui sont collectés, filtrés et agrégés par le gateway avant leur intégration au jumeau numérique.

La communication du jumeau numérique vers le système physique est en revanche dépendante de l'architecture de commande et des composants inclus dans le système physique considéré. Lorsque le système physique est limité aux équipements et à leurs PLC, les commandes du DT sont transmises aux contrôleurs par les interfaces de communication et protocoles de commande spécifiques à l'installation, notamment via des connexions TCP dédiées. MQTT n'est alors pas utilisé comme mécanisme générique de commande des PLC.

Lorsque le SCADA est inclus dans la frontière du système physique, le jumeau numérique peut interagir avec celui-ci au niveau de ses interfaces de commande. Il peut alors se substituer à l'interface opérateur et invoquer les opérations exposées par le backend du SCADA, notamment au travers d'API REST ou d'interfaces gRPC sur WebSocket.

Les interfaces web et de service utilisées pour les applications et services du jumeau numérique comprennent notamment les API REST de Spring et les mécanismes de notification push tels que Server-Sent Events (SSE). Des interfaces REST peuvent également être utilisées pour accéder à des services externes, tels que les services fournissant des informations énergétiques. Les mécanismes d'import et d'export associés aux AAS permettent l'échange de métadonnées d'actifs avec des systèmes externes.

### MC16 - Hébergement / déploiement

Le déploiement de référence utilisé pour les expérimentations héberge le moteur du jumeau numérique, les services associés et les composants de gestion des données sur un serveur central. Les fonctionnalités du jumeau numérique sont accessibles à travers des interfaces de communication et de service, notamment une interface web basée sur Spring, ainsi que des interfaces REST, gRPC et WebSocket.

L'architecture ne requiert toutefois pas que tous les composants soient hébergés sur une même machine. Les différents composants de la constellation peuvent être déployés de manière distribuée selon les contraintes du scénario et de l'infrastructure disponible. Ainsi, le broker MQTT, les bases de données ou certains services spécifiques du jumeau numérique peuvent être hébergés sur des systèmes distincts du serveur principal.

Le déploiement de référence est actuellement utilisé dans des environnements de laboratoire et d'expérimentation, notamment sur les sites partenaires.

### MC17 - Insights et prise de décision

Le jumeau numérique fournit des informations et des éléments d'aide à la décision à partir de la représentation synchronisée du système physique, de ses modèles et des données historiques.

**La visualisation** permet d'inspecter l'état courant du système et l'évolution de ses composants et processus. Elle peut également fournir une représentation des états attendus ou des trajectoires prévues afin de permettre à l'opérateur de comprendre le comportement du système et d'identifier visuellement d'éventuels écarts.

**L'analyse basée sur les modèles et les données** permet de comparer le comportement observé avec le comportement attendu et d'identifier des disruptions, anomalies ou divergences. Les données historiques et contextuelles peuvent être utilisées pour caractériser ces écarts, en rechercher les causes possibles et estimer leur évolution.

**La planification et l'analyse de scénarios** permettent de comparer des trajectoires ou stratégies alternatives, notamment pour la récupération après une disruption, l'optimisation de l'exploitation ou la planification d'une intervention de maintenance. Ces analyses peuvent être utilisées pour évaluer des scénarios *what-if* avant la sélection d'une action.

**Le jumeau numérique peut également produire des alertes, notifications et recommandations** destinées aux opérateurs et aux ingénieurs. Ces résultats peuvent concerner une anomalie détectée, une action de maintenance recommandée, une stratégie de récupération ou un plan alternatif. Selon le scénario, une décision peut être validée par un utilisateur avant d'être transmise au système de commande pour exécution.

### MC18 - Intégration horizontale

Le jumeau numérique échange des informations avec des systèmes externes indépendants de la ligne de production et de son infrastructure DT. Dans le scénario de surveillance énergétique, le jumeau numérique interroge périodiquement l'interface REST d'un service externe représentant le réseau énergétique afin de récupérer la limite de consommation disponible. Cette information est ensuite intégrée aux données du jumeau numérique et combinée aux mesures de consommation de la ligne pour calculer le budget énergétique disponible.

L'architecture permet également d'intégrer des services et systèmes externes au moyen d'interfaces adaptées à leur rôle et à leur protocole de communication. Les mécanismes associés aux AAS peuvent notamment être utilisés pour échanger ou interpréter des informations d'actifs et de contexte dans des environnements interopérables. La possibilité d'échanger des informations avec d'autres jumeaux numériques ou systèmes de production peut ainsi être envisagée, mais l'interopérabilité avec des infrastructures industrielles hétérogènes et l'intégration de plusieurs DT distribués n'ont pas encore été évaluées dans le démonstrateur.

### MC19 - Propriété et confidentialité des données

Les données d'exploitation produites par le système physique dans le cadre du démonstrateur - notamment les états, mesures et événements des équipements - sont considérées comme librement utilisables dans le contexte du projet.

La majorité des modèles utilisés par le jumeau numérique sont créés dans le cadre du projet, notamment les modèles SysML et MontiCore, et sont diffusés comme des artefacts open source conformément aux conditions de licence applicables au projet.

Certains modèles et artefacts techniques externes utilisés comme sources par des services spécifiques du jumeau numérique peuvent toutefois être soumis à des restrictions de propriété intellectuelle et de confidentialité. C'est notamment le cas de certains modèles sources fournis pour la génération de visualisations 3D des équipements Fischertechnik. Ces modèles sources sont soumis à des accords de confidentialité et leur accès est limité aux détenteurs des équipements physiques concernés. Ces artefacts sous NDA constituent une exception par rapport aux modèles développés dans le cadre du projet.

Les composants logiciels et les modèles développés dans le cadre du projet MBDO peuvent être diffusés séparément de ces artefacts propriétaires. Les outils ou exécutables produits à partir de modèles sources soumis à des restrictions peuvent également être diffusables, sous réserve de vérifier les clauses contractuelles et les droits applicables à ces artefacts dérivés. En particulier, la possibilité de redistribuer un outil compilé qui intègre ces modèles sans redistribuer les modèles sources eux-mêmes doit être confirmée au regard des accords de confidentialité et des conditions de licence applicables.

L'architecture distingue ainsi les données d'exploitation et la majorité des modèles et composants développés dans le cadre du projet, qui peuvent être librement diffusés selon leurs licences, des modèles sources externes soumis à des restrictions d'accès et de redistribution.

### MC20 - Standardisation

L'architecture et l'ingénierie du jumeau numérique s'appuient sur plusieurs standards et technologies standardisées :

- **ISO 23247** (*Digital Twin framework for manufacturing*) - utilisé comme cadre de référence pour structurer la description de la constellation du jumeau numérique et de ses interactions avec le système physique ;
- **SysMLv2 (OMG)** - utilisé pour la modélisation structurelle et comportementale des systèmes et de leurs processus ;
- **MQTT 5.0 (OASIS)** - utilisé pour la collecte et la distribution des données provenant des contrôleurs et équipements physiques via une infrastructure de messagerie ;
- **Asset Administration Shell (AAS)**, basé sur les standards et spécifications de l'écosystème Industrie 4.0 - utilisé pour la représentation et l'échange de métadonnées et d'informations contextuelles sur les actifs ;
- **BPMN (OMG)** - utilisé pour la modélisation et l'orchestration de certains workflows et processus de décision.

L'approche d'ingénierie s'appuie également sur des technologies de **Model-Driven Engineering (MDE)** pour transformer les modèles en composants logiciels et en infrastructures du jumeau numérique. Les langages et modèles utilisés dans cette approche sont ainsi intégrés dans une chaîne d'ingénierie fondée sur des technologies de modélisation plutôt que traités comme de simples formats de données.

L'architecture est conçue pour permettre l'ajout de protocoles de communication industriels supplémentaires. Le support d'**OPC UA (Open Platform Communications Unified Architecture)** est notamment envisagé comme une évolution future pour la communication avec les contrôleurs et équipements industriels.

### MC21 - Sécurité et sûreté

Le démonstrateur repose sur une installation Fischertechnik compacte dont les composants mécaniques et les niveaux d'énergie mis en œuvre limitent fortement les risques physiques, y compris ceux associés aux opérations à distance. Sur les différents sites de déploiement, le jumeau numérique est exécuté au sein du réseau local dédié à l'installation Fischertechnik. Les communications entre le jumeau numérique, les systèmes de contrôle et les équipements physiques restent ainsi confinées à l'infrastructure réseau locale de l'installation, ce qui limite l'exposition directe du système à des réseaux externes.

Le jumeau numérique peut néanmoins déclencher des opérations d'actionnement, notamment dans les scénarios impliquant la replanification ou des actions de maintenance. Il peut également supporter des opérations nécessitant une intervention ou une validation humaine avant leur exécution. Cette possibilité constitue un mécanisme de supervision de la boucle de commande : certaines décisions ou actions peuvent être soumises à un opérateur avant d'être transmises au système de contrôle physique.

Dans le démonstrateur actuel, les mécanismes spécifiques de cybersécurisation des communications entre le système physique et le jumeau numérique - notamment l'authentification, le chiffrement et la gestion formelle des autorisations - ne sont pas encore traités de manière exhaustive. Les interfaces d'accès au jumeau numérique sont toutefois exposées à travers l'architecture applicative et ses interfaces de service, plutôt que par un accès direct et non contrôlé depuis l'extérieur.

La transposition de cette architecture à des équipements industriels présentant des risques pour les personnes nécessiterait des mécanismes de sécurité et de sûreté supplémentaires.

---

## Scénarios d'exploitation

### UC1 - Surveillance de la consommation énergétique maximale

La ligne est connectée à un réseau intelligent qui fixe dynamiquement une limite de puissance totale. Le JN mesure et journalise la consommation de chaque machine, agrège la consommation du process, récupère la limite réseau en temps réel via REST, calcule le budget résiduel et notifie l'opérateur et le gestionnaire lorsque la consommation s'approche ou dépasse la limite.

**Architecture** : MontiArc C&C model → MontiGem → Backend (Spring Boot + PostgreSQL) + Frontend ; Shadow Aggregator + Dashboard Service + Notification Service sur moteur DT.

### UC2 - Replanification flexible après disruption

Le JN surveille en continu la progression nominale d'une pièce entre les stations. Lorsqu'une disruption est détectée (progression attendue non confirmée dans le délai imparti), il identifie l'étape et le composant affecté, sélectionne une trajectoire alternative via SCADA, notifie l'ingénieur de maintenance et archive la décision pour analyse des KPI (MTTR, MTBF par composant).

**Architecture** : SysMLv2 state machine (cycle de production) → SysMLV2Parser → Anomaly Detection Service + Replanning Service + Notification Service ; InfluxDB pour l'historique des disruptions ; SCADA pour l'actionnement.

### UC3 - Maintenance prédictive des équipements

Le JN enregistre en continu les signaux moteur (vitesse, timing d'arrivée capteurs) avec leur contexte (poids de charge, mode de cycle, compteurs d'usage). Pour chaque cycle, il compare la vitesse observée au profil baseline conditionné et détecte les déviations. Lorsqu'une tendance à la dégradation est identifiée, il génère un plan de maintenance (action recommandée, fenêtre d'intervention) et alerte les parties prenantes.

**Architecture** : AAS pour les métadonnées d'actifs ; InfluxDB pour les séries temporelles ; Analyser + Planner + GUI + Mailing Service ; BPMN (Workflow Controller) pour la boucle décision-action ; DT-MQTT Upstream Interface pour l'acquisition des signaux moteur.

---

## Enjeux scientifiques et techniques

*Chaque enjeu est annoté par les questions de recherche (RQ_X) de la feuille de route EDT [[Combemale et al., 2025](https://inria.hal.science/hal-05223776)].*

### Architecture modulaire et réutilisable pour l'ingénierie des jumeaux numériques

Le démonstrateur explore une architecture de référence organisée autour de composants génériques - gateway, synchronisation, moteur du jumeau numérique, gestionnaires de données et de modèles - auxquels peuvent être associés différents services. L'enjeu scientifique et technique est de déterminer comment modulariser les capacités d'un jumeau numérique afin de permettre leur composition et leur réutilisation selon les préoccupations opérationnelles considérées, tout en préservant la cohérence des interfaces et des données partagées.

L'architecture doit notamment permettre d'intégrer des services hétérogènes - surveillance, visualisation, analyse, planification ou interaction avec le système physique - sans imposer une refonte du cœur du jumeau numérique.

**RQ associées :** RQ\_E2 (modularisation des JN), RQ\_E3 (composition et orchestration au niveau du déploiement), RQ\_E6 (standards et protocoles d'interopérabilité).

### Composition de services et de préoccupations opérationnelles

Un même système de production peut être observé et piloté selon plusieurs préoccupations opérationnelles : suivi énergétique, suivi de la production, maintenance, visualisation ou analyse de l'état du système. Ces préoccupations peuvent exploiter des données et des modèles communs, tout en produisant des analyses et des décisions différentes.

L'enjeu est de permettre la **composition de ces services et de leurs modèles**, en explicitant leurs dépendances, leurs interfaces et leurs interactions avec le système physique. Cette composition doit également permettre de gérer les situations dans lesquelles plusieurs services produisent des informations ou des décisions susceptibles d'influencer une même installation.

Cet enjeu concerne en particulier la composition de jumeaux numériques ou de sous-jumeaux numériques spécialisés, qui peuvent partager certaines données et modèles tout en conservant des responsabilités distinctes.

**RQ associées :** RQ\_E2 (modularisation et composition), RQ\_E3 (orchestration et coordination de DT), RQ\_T3 (composition d'incertitudes inter-DTs)

### Ingénierie model-driven et génération de composants de jumeaux numériques

Le démonstrateur explore l'utilisation d'une approche d'ingénierie dirigée par les modèles pour produire une partie de l'infrastructure du jumeau numérique à partir de modèles de systèmes. Cette approche permet notamment de générer une partie des composants applicatifs et de maintenir un lien explicite entre les modèles d'ingénierie et leur réalisation logicielle.

L'enjeu est d'étendre cette approche à l'ingénierie de jumeaux numériques plus complexes, en couvrant non seulement les composants applicatifs générés, mais également la configuration des interfaces, des modèles, des flux de données et des services associés. Il s'agit également de définir comment intégrer les extensions spécifiques nécessaires lorsque les comportements du domaine ne peuvent pas être entièrement générés automatiquement.

Cette approche s'inscrit dans une vision où le jumeau numérique peut être construit, adapté et évolué à partir d'un ensemble de modèles décrivant le système physique, ses comportements et les services qui lui sont associés.

**RQ associées :** RQ\_E2 (modularisation), RQ\_E1 (manipulation et interrogation des métadonnées des modèles et services), et les RQ du processus d'ingénierie relatives aux points de vue, types de modèles et gestion du cycle de vie des modèles (ie. RQ_D11 (interopérabilité sémantique) )

### Synchronisation et intégration de données et de modèles hétérogènes

Un jumeau numérique doit intégrer des informations provenant de sources de nature et de temporalité différentes : données événementielles issues des équipements physiques, données agrégées ou filtrées par des gateways, données persistées, modèles comportementaux et structurels, ainsi que des informations provenant de systèmes externes.

L'enjeu est de maintenir une représentation cohérente du système malgré l'hétérogénéité des sources, leurs différentes fréquences de mise à jour et leurs niveaux de précision. Cela inclut notamment la gestion des données retardées, partielles ou bruitées, ainsi que la définition de mécanismes permettant de préserver la cohérence temporelle et sémantique entre les données et les modèles utilisés par les services du jumeau numérique.

Dans cette perspective, la séparation entre collecte, filtrage, agrégation, persistance et exploitation des données constitue un élément important de l'architecture.

**RQ associées :** RQ\_C4 (échanges bidirectionnels cohérents et sûrs entre système physique et DT), RQ_D2 (incertitude des données), RQ_D3 (collecte de données hétérogènes), RQ_D6 (évolution des modèles), RQ_I5 (effet de l'hybridation sur la validité)

### Co-ingénierie et évolution continue du jumeau numérique

Le jumeau numérique est considéré comme un artefact évolutif pouvant être développé avant, pendant ou après la réalisation du système physique. Les modèles issus de la phase de conception peuvent être utilisés pour initialiser le jumeau numérique, tandis que les données et observations issues de l'exploitation peuvent ensuite contribuer à son évolution.

L'enjeu est de maintenir la cohérence entre les modèles du système physique, les données collectées pendant son exploitation et les modèles et services du jumeau numérique au cours du temps. Cette évolution peut concerner la structure du système, ses comportements, ses modèles de données ou les services associés.

L'approche MBDO vise ainsi à dépasser une séparation stricte entre les phases de conception, de déploiement et d'exploitation, en permettant une évolution coordonnée du système physique et de son jumeau numérique.

**RQ associées :** RQ\_P1 (points de vue et architecture d'ingénierie), RQ\_P5 (gestion des modèles et données), RQ\_P8 (déploiement et versionnement des modèles), RQ\_E2 (modularisation et gestion de la variabilité).

### Analyse comportementale et aide à la décision pour la maintenance

L'intégration de données d'exploitation, de modèles de comportement nominal et de connaissances sur les équipements permet d'identifier des écarts entre le comportement attendu et le comportement observé. L'enjeu est de combiner modèles, données historiques et connaissances du domaine afin de produire des informations exploitables pour le diagnostic et la planification d'actions de maintenance.

Les travaux futurs devront notamment étudier comment faire évoluer les modèles comportementaux à partir des données d'exploitation, quantifier la confiance accordée aux détections et intégrer les contraintes opérationnelles de la maintenance dans les décisions proposées.

**RQ associées :** RQ\_T1 (qualité des données et des modèles), RQ\_T4 (validation de la fidélité et de l'exactitude), RQ\_T6 (surveillance et amélioration continue des propriétés de qualité).

---

## Matériel

Le démonstrateur Fischertechnik est fourni comme une **plateforme de référence reproductible pour la recherche, l'expérimentation et l'enseignement** autour de l'ingénierie des jumeaux numériques de systèmes de production. Le matériel fourni comprend la plateforme physique, les composants logiciels, les modèles, les configurations et les procédures nécessaires pour reproduire les expérimentations sur différents sites.

### Plateforme physique et réplication multi-sites

La plateforme repose sur une ligne de production modulaire Fischertechnik, reproduite sur plusieurs sites partenaires du projet, notamment à l'IRISA (Rennes), à la RWTH Aachen et à l'ISW Stuttgart. Les configurations matérielles et logicielles, notamment le code des contrôleurs et du SCADA, sont partagées afin de faciliter la réplication des expérimentations et la comparaison des résultats entre sites.

### Ressources logicielles et d'ingénierie

Le matériel fourni comprend les briques nécessaires à la construction et au déploiement de jumeaux numériques, notamment :

- les composants génériques d'accès au système physique, de synchronisation et de gestion des données et modèles ;
- les services et interfaces nécessaires à l'intégration de scénarios spécifiques ;
- les modèles **SysMLv2** et **MontiArc** décrivant la structure et le comportement des systèmes ;
- les modèles et métadonnées **AAS**, lorsque requis par les scénarios considérés ;
- les configurations et scripts permettant de démarrer et de connecter les composants physiques, le SCADA et les services du jumeau numérique.

Les procédures d'installation, de configuration et d'intégration, ainsi que le savoir-faire partagé entre les sites partenaires, facilitent la reproduction de la plateforme et de ses expérimentations.

### Dimension éducative

La plateforme est conçue avec l'objectif de pouvoir être utilisée à terme comme support pédagogique pour l'expérimentation des systèmes cyber-physiques, de l'Industrie 4.0, de l'ingénierie dirigée par les modèles et des jumeaux numériques. L'organisation GitHub du projet, **`edt-edu`**, reflète cette ambition de partager progressivement le code, les exemples, les configurations et les ressources nécessaires à l'apprentissage et à l'expérimentation.

### Stack technique

Les principales technologies utilisées comprennent **SysMLv2**, **MontiGem**, **MontiArc**, **MQTT**, **Spring Boot / Java**, **gRPC**, **WebSocket**, **REST**, **InfluxDB**, **PostgreSQL** et **BPMN**.

**Code source :** <https://github.com/edt-edu/>

## Références

- Bilal L., Hellwig A., Treton P., Vojtisek D., Zhang J., Combemale B., Jézéquel J.-M., Michael J., Rumpe B., Wortmann A. - *Digital Twins for Manufacturing Systems: A Case Study Based On a Fischertechnik Factory* - MBDO project, IRISA / RWTH Aachen / ISW Stuttgart / Univ. Regensburg, 2026
- [Projet MBDO - Model-Based DevOps](https://mbdo.github.io) (ANR + DFG)
- ISO 23247-1:2021 - *Digital twin framework for manufacturing*
- Combemale B. et al. [Engineering Digital Twins: A Research Roadmap](https://inria.hal.science/hal-05223776). EDTconf 2025. ⟨hal-05223776⟩
