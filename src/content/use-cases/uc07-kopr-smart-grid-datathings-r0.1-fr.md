---
id: uc01
title: KOPR SmartGrid DigitalTwin
provider: DataThings S.A.
contacts:
  - name: Fouquet Francois
    org: DataThings
    email: francois.fouquet@datathings.com
summary: >-
  Jumeau numérique de la grille de distribution électrique, en aide à la décision pour les gestionnaires de réseaux : planification de la maintenance, détection de problèmes, simulation d'extensions ou de reconfigurations.
  Il acquiert en temps réel les données des compteurs intelligents et des capteurs de terrain (4G, LoRa), ainsi que la composition physique du réseau (câbles, transformateurs...).
  Des modèles de machine learning et d'IA prédisent l'état futur du réseau, notamment la consommation des points de livraison et la production solaire et éolienne selon la météo.
  Des simulations « what-if » évaluent l'impact des scénarios par un calcul de type power-flow.
  Le système fournit enfin des alertes et des visualisations en temps réel pour aider à reconfigurer la grille et à piloter les productions renouvelables, notamment pour lisser les fluctuations de tension.
usersCount: 30+
lang: fr
photo: 
# domain : industrial-engineering | energy | geospatial | maritime | telecommunications | environment | health | robotics | agriculture | other
domain: energy
# maturity : concept | poc | prototype | operational
maturity: operational
# originType : natural | anthropic | engineered | infrastructure | process
originType: infrastructure
# version : identifiant de version du UC (ex r0.1, r1.0, ...). La dernière est affichée par défaut sur la liste.
version: r0.1
license: BUSL-1.1
# license : identifiant SPDX
tags:
  - capteur-puissance-electrique
  - monitoring-consommation
  - alerte-seuil
  - jumeau-numerique
  - simulation
publishedDate: 2026-04-15T00:00:00.000Z
lastUpdated: 2026-04-15T00:00:00.000Z

---
## Résumé
<!-- Décrivez en 3-5 phrases le cas d'usage : quel système physique, quel jumeau numérique, quels objectifs. -->

**KOPR** est un jumeau numérique des réseaux électriques de distribution, surtout des grilles basse tension mises sous pression par les énergies renouvelables (photovoltaïque, éolien), les véhicules électriques et les pompes à chaleur. 
Il construit une réplique numérique du réseau et apprend en quasi temps réel à partir de sources variées : SIG, systèmes de gestion, compteurs communicants et capteurs de terrain (4G, LoRa).

Le jumeau **agrège, visualise, analyse et apprend** à partir de ces données pour aider les gestionnaires à décider : surveillance des infrastructures, détection de problèmes, planification de la maintenance et simulation « what-if » (extension ou reconfiguration, impact calculé par power-flow). 
Des modèles de machine learning et d'IA prédisent l'état futur du réseau.

Il accompagne la transition énergétique en rendant les réseaux plus intelligents, fiables et efficaces. 
Déployé à l'échelle nationale au Luxembourg, KOPR gère plus de **330 000 points de livraison**, reflète plus d'**1 million d'éléments de réseau** et analyse plus de **45 milliards de relevés par an** (soit plus de **225 milliards** cumulés sur 5 ans). 
Il s'appuie sur GreyCat, une base de données programmable, temporelle et graphe, pour traiter ces volumes.

---

## Description fonctionnelle

### Utilisateurs
<!-- Liste des rôles utilisateurs concrets qui interagissent avec le JN (développeur, opérateur, chercheur, mainteneur, décideur, etc.). -->

- **Un opérateur d'exploitation** — supervise le réseau en temps réel, détecte et traite les incidents
- **Un ingénieur planification** — simule des scénarios d'extension ou de reconfiguration du réseau
- **Un mainteneur** — planifie les interventions à partir des états et alertes du jumeau

### Besoins fonctionnels
<!-- Typologies disponibles : Décrire | Diagnostiquer | Prédire | Optimiser | Contrôler | Sécuriser | Interagir. Combinaisons possibles avec '+' (ex : Décrire + Sécuriser).

Format : <Typologie> · <Utilisateur> veut <action> pour <objectif>, dans <contexte>. Métrique : <indicateur quantifié>. -->

- **Décrire** · *Un opérateur d'exploitation* **veut visualiser en quasi temps réel l'état de charge des transformateurs et des départs basse tension** pour repérer les zones en dépassement de contraintes, dans un centre de conduite. **Métrique :** > 330 000 points de livraison suivis, rafraîchissement à la cadence des données (15 min smart meters, temps quasi réel capteurs 4G).

- **Diagnostiquer** · *Un opérateur d'exploitation* **veut localiser les surcharges, sous-tensions et pertes non techniques** pour prioriser les interventions et investissements, en exploitation. **Métrique :** > 1 M d'éléments de réseau reflétés, > 45 Md de relevés analysés par an.

- **Prédire** · *Un ingénieur planification* **veut anticiper l'état futur du réseau (charge, tension) à partir de l'historique et de la météo** pour dimensionner l'accueil des EnR et des VE, en phase de planification. **Métrique :** horizon de prévision configurable, injection de scénarios de modification tels que le déploiement de panneaux solaires dans une zone géographique.

- **Optimiser** · *Un ingénieur planification* **veut simuler des scénarios « what-if » d'extension ou de reconfiguration** (isolation d'un concentrateur, ordonnancement des onduleurs PV et des VE) pour respecter les contraintes réseau, en amont des travaux. **Métrique :** calcul d'impact par méthode de type power-flow sur le réseau complet. Au-delà des contraintes techniques, les contraintes financières et les objectifs d'efficacité énergétique sont également à prendre en compte, par exemple pour limiter les pertes entre le tarif d'achat et le tarif de vente.

---

## Caractérisation du Jumeau Numérique

*Grille basée sur le <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">framework unifié de Gil et al. (2024)</a> — 21 caractéristiques.*

### MC1 — Système étudié
<!-- Décrivez le système physique étudié (le jumeau physique), son environnement et les agents/opérateurs présents. -->

Réseau électrique de distribution, principalement basse tension : transformateurs (postes de distribution), câbles et lignes, concentrateurs, ainsi que les points de livraison (clients) équipés de compteurs communicants. L'environnement est marqué par l'intégration croissante des productions décentralisées (photovoltaïque, éolien) et de nouvelles charges (véhicules électriques, pompes à chaleur). Les agents en présence sont les gestionnaires de réseau (DSO), les opérateurs de conduite et les consommateurs/producteurs raccordés.

### MC2 — Composants d'action physiques
<!-- Listez les actionneurs et mécanismes par lesquels le jumeau numérique peut agir sur le système physique. -->

Le périmètre principal en exploitation est observationnel et décisionnel : le jumeau produit états, alertes et recommandations à destination des exploitants. Une boucle de commande (« prescription et actionnement ») est toutefois déjà déployée à périmètre limité : à partir des violations de contraintes anticipées, KOPR génère des recommandations puis des ordres pour les charges flexibles — limitation d'injection des onduleurs PV, plafonnement de puissance des bornes de recharge VE, activation d'une production pilotable (ex. hydrogène) ou déclenchement de relais de compteurs pour la réponse à la demande. Le déploiement est **progressif** : mode conseil, puis supervision semi-autonome, puis boucle fermée complète à mesure que la confiance opérationnelle augmente (voir scénarios).

### MC3 — Composants de captation physiques
<!-- Listez les capteurs et mécanismes par lesquels le système physique transmet des données au jumeau numérique. -->

- **AMI / compteurs communicants (smart meters)** aux points de livraison — relevés de consommation/production
- **SCADA** — états d'exploitation : ouverture/fermeture des interrupteurs, fusibles, disjoncteurs (flux d'événements quasi temps réel)
- **PMU et capteurs de qualité de l'énergie** — mesures phasorielles tension/courant haute fréquence sur des postes sélectionnés
- **Capteurs terrain** installés sur les postes et transformateurs, remontant via 4G ou LoRa
- **Systèmes d'information géographique (SIG)** — topologie et composition physique du réseau (câbles, transformateurs, postes)
- **ERP** — métadonnées d'actifs : caractéristiques techniques, calibres, historiques de maintenance
- **Contexte externe** — flux météo (irradiance solaire, vent, température) et métadonnées calendaires (jours fériés, périodes scolaires), prédicteurs importants de charge et de production

### MC4 — Interaction physique → virtuel
<!-- Décrivez les données transmises du système physique vers le jumeau numérique : protocoles, fréquences, types de données, standards et normes. -->

Ingestion multi-sources dont les schémas et fréquences diffèrent radicalement (de la sous-seconde à l'hebdomadaire) : SIG en exports par lots (quotidiens à hebdomadaires), synchronisation ERP des métadonnées d'actifs, relevés AMI au pas de 15 minutes, événements d'état SCADA en quasi temps réel (Kafka / MQTT), données phasorielles PMU haute fréquence, mesures des capteurs de poste (4G/LoRa) et flux météo/calendaires externes.

L'intégration n'est pas un simple raccordement mais un **problème de modélisation** : chaque flux est réconcilié avec un **graphe temporel** partagé — un connecteur analyse le format source, résout le nœud d'actif cible par identité, puis insère la valeur au bon horodatage (`setAt(t, valeur)`). Comme le graphe conserve l'intégralité de l'historique, les données arrivant en retard (exports SIG/ERP par lots) sont insérées rétroactivement à leur instant correct sans casser la cohérence du modèle vivant.

### MC5 — Interaction virtuel → physique
<!-- Décrivez les données transmises du jumeau numérique vers le système physique : commandes, alertes, paramètres, standards et normes. -->

Au niveau analytique, KOPR transmet aux systèmes des exploitants des prévisions de consommation et de production (estimations de charge prospectives) et émet des avertissements lorsqu'il anticipe une violation de contrainte (surcharge de câble, saturation de transformateur, excursion de tension) *avant* qu'elle ne se matérialise. Au niveau opérationnel, des ordres correctifs sont transmis aux équipements raccordés via des dispositifs de contrôle : limitation d'injection PV, plafonnement de puissance des bornes VE, pilotage de production flexible, relais de compteurs. Cette boucle est déployée à périmètre limité (déploiement par phases). L'actionnement futur généralisé est envisagé.

### MC6 — Services du JN
<!-- Listez les services fournis par le jumeau numérique : simulation, optimisation, détection, visualisation, etc. -->

- **Supervision temps réel** : agrégation et visualisation de l'état du réseau (charge des transformateurs, tensions, flux) à la cadence des données
- **Détection de problèmes** : identification des surcharges, sous-/sur-tensions, anomalies et pertes non techniques
- **Prédiction** : estimation des états futurs du réseau (charge, tension) par apprentissage automatique / IA
- **Simulation « what-if »** : évaluation de scénarios d'extension, de reconfiguration ou d'ordonnancement, avec calcul d'impact par méthode de type power-flow
- **Aide à la planification et à la maintenance** : priorisation des interventions et des investissements
- **Analyse historique** : exploitation de plusieurs centaines de milliards de relevés historisés (45 Md/an sur ~5 ans) pour le diagnostic et le reporting

### MC7 — Échelle temporelle
<!-- Précisez les échelles de temps : synchronisation temps réel, plus rapide, plus lent que le système physique. -->

Cadences hétérogènes : quasi temps réel pour les capteurs 4G/LoRa des postes et transformateurs ( < 5 seconds), pas de 15 minutes pour les smart meters. Le jumeau fonctionne en quasi temps réel (apprentissage continu) et peut être accéléré pour rejouer rapidement l'historique ou simuler des scénarios prospectifs.

### MC8 — Multiplicités
<!-- Le JN est-il composé de sous-jumeaux ? Architecture centralisée ou décentralisée ? Multi-instance ? -->

Jumeau à grande échelle couvrant l'ensemble d'un réseau de distribution : plus d'1 million d'éléments de réseau et 330 000+ points de livraison reflétés dans une même instance. Architecture centralisée autour d'un modèle temporel-graphe unifié, déployable par gestionnaire de réseau (multi-instances possibles selon les exploitants).

### MC9 — Phases du cycle de vie
<!-- Quelles phases du cycle de vie sont couvertes ? Conception, fabrication, exploitation, maintenance, démantèlement. -->

Système en exploitation, couvrant principalement les phases d'exploitation et de maintenance du réseau, ainsi que la planification (extension, reconfiguration, raccordement des EnR et VE).

### MC10 — Modèles et données
<!-- Décrivez les modèles utilisés (physiques, données, hybrides) et les données d'entrée/sortie. -->

- **Modèle topologique (graphe)** : composition physique du réseau issue du SIG (transformateurs, câbles, points de livraison, concentrateurs)
- **Modèles data-driven** : machine learning / IA pour la prévision d'états (charge, tension) et la détection d'anomalies
- **Modèles physiques** : calcul d'écoulement de charge (power-flow) pour les simulations « what-if »
- **Flux de données** : relevés horodatés des smart meters (kWh, puissance) et mesures des capteurs de poste (tension, courant, température), séries temporelles à grande échelle

### MC11 — Outils et facilitateurs
<!-- Listez les outils, frameworks et plateformes utilisés pour réaliser les services du JN, lister les API. -->

- **GreyCat** — base de données temporelle et graphe assurant le stockage, la modélisation et le traitement à grande échelle des séries temporelles et de la topologie réseau
- Bibliothèques de machine learning / IA pour la prédiction et la simulation
- Interface web de visualisation et d'analyse (`@greycat/web`)
- Connecteurs d'ingestion vers les SIG, les infrastructures de comptage (AMI) et les capteurs terrain

### MC12 — Constellation du JN
<!-- Comment les modèles, données, outils et services sont-ils orchestrés ensemble ? Architecture logique du JN. -->

Chaîne : sources hétérogènes (SIG, AMI/smart meters, capteurs 4G/LoRa) → connecteurs d'ingestion → modèle temporel-graphe GreyCat → moteurs d'analyse (ML/IA de prévision et détection, power-flow) → services de visualisation, d'alerte et de simulation exposés via l'interface web. La topologie du graphe relie les mesures aux éléments physiques du réseau, permettant analyses et simulations contextualisées.

### MC13 — Processus de jumelage et évolution
<!-- Décrivez la méthodologie de développement du JN, ses jalons et ses évolutions prévues. -->

Approche incrémentale : intégration progressive des sources de données (SIG, comptage, capteurs terrain), enrichissement du modèle de réseau, puis ajout des services d'analyse (détection, prévision) et de simulation. Évolution vers une boucle de pilotage (envoi d'ordres aux équipements) prévue dans la feuille de route.

### MC14 — Fidélité et validité
<!-- Quelle est la précision des modèles ? Comment sont-ils validés et calibrés ? Quelle est la précision des mesures ? Sont elles bruitées ? Partielles ? Polluées ? -->

La fidélité repose sur la qualité de la topologie SIG et sur la couverture du comptage. 
Les modèles de prévision sont calibrés et validés par confrontation aux relevés réels (back-testing sur l'historique). 
Les données peuvent être partielles (points non instrumentés), bruitées ou en retard (relevés manquants de smart meters), ce qui nécessite estimation et interpolation d'état sur les segments non observés.

### MC15 — Connexion technique
<!-- Quels protocoles réseau et architectures de communication sont utilisés entre le physique et le virtuel ? -->

Communications terrain via réseaux cellulaires (4G) et LoRa pour les capteurs de poste. Collecte des smart meters de proche en proche : chaque compteur relaie les relevés vers un **concentrateur de données** co-localisé avec le poste de transformation local, qui agrège et transmet au système central. Les états SCADA remontent en flux d'événements quasi temps réel (Kafka / MQTT) ; l'intégration des SIG et ERP se fait par connecteurs/API. La commande future généralisée des équipements est envisagée via un protocole standardisé de type ISO.

### MC16 — Hébergement / déploiement
<!-- Où est hébergé le JN ? Local, cloud, plateforme dédiée ? Mode de déploiement. -->

KOPR s'exécute sur un **serveur central unique** qui maintient le graphe temporel à l'échelle nationale, exécute les calculs de power-flow, orchestre les modèles ML distribués, sert le tableau de bord des exploitants et exécute les simulations « what-if ». La collecte de données est en revanche distribuée (concentrateurs co-localisés avec les postes). Le déploiement (cloud ou on-premise chez le gestionnaire de réseau) est dimensionné pour la volumétrie (330 000+ points de livraison, 45 Md+ relevés/an, ~225 Md historisés). Accès aux services via interface web, protocole binaire, json-rpc et MCP.

### MC17 — Insights et prise de décision
<!-- Quels insights et aides à la décision le JN fournit-il aux opérateurs ? -->

- **Carte et tableau de bord temps réel** : état du réseau (charge des câbles, taux d'utilisation des transformateurs, profils de tension) obtenu en résolvant le graphe temporel à *t = maintenant* ; l'opérateur repère directement les transformateurs surchargés, comportements anormaux ou congestions prévues dans la vue réseau
- **Alertes d'anomalie et avertissements de congestion** : déclenchement au dépassement de seuils configurables, ou en anticipation d'une violation de contrainte avant qu'elle ne survienne
- **Prévisions de charge et de production** exposées comme estimations prospectives
- **Résultats de simulation « what-if »** : facteurs de charge, profils de tension et avertissements de congestion par scénario, en quelques secondes
- **Recommandations / prescriptions** pour les charges flexibles (limitation d'injection PV, plafonds VE, réponse à la demande), en mode conseil puis, à terme, en boucle fermée
- **Transparence des modèles** : exposition continue de la qualité et de la performance de prédiction des modèles, indiquant aux opérateurs quels résultats sont fiables et où l'incertitude augmente

### MC18 — Intégration horizontale
<!-- Le JN échange-t-il des données avec d'autres systèmes (SCADA, autres JN, SI) ? -->

Fortement intégré à l'écosystème d'exploitation. 
En entrée : SIG (topologie), ERP (métadonnées d'actifs), AMI (smart meters), SCADA (états d'exploitation en flux temps réel), PMU/capteurs de qualité, et services externes (météo, calendriers). 
En sortie : prévisions transmises aux systèmes des exploitants et ordres correctifs vers les équipements pilotables (onduleurs PV, bornes VE, relais de compteurs). 
Le défi n'est pas le raccordement mais la réconciliation de schémas, la résolution d'identité et l'insertion temporelle dans un modèle partagé, dans un écosystème industriel hétérogène et évolutif (systèmes hérités, frontières organisationnelles).

### MC19 — Propriété et confidentialité des données
<!-- Y a-t-il des considérations de propriété ou confidentialité des données ? RGPD ? -->

Le jumeau traite des données de comptage (consommation/production) à l'échelle de centaines de milliers de points de livraison, potentiellement rattachables à des clients donc soumises à des exigences de confidentialité et de protection des données (RGPD). 
L'accès aux flux opérationnels, aux capacités de simulation et aux interfaces d'actionnement est contrôlé par des **API authentifiées** et des **politiques d'accès par rôle**. 
Les données restent sous la gouvernance du gestionnaire de réseau hôte ; l'intégration de sources indépendantes et hétérogènes (SCADA, AMI, SIG, ERP, météo) impose une couche de gouvernance de données dédiée (réconciliation de schémas, résolution d'identité, qualité des données).

### MC20 — Standardisation
<!-- Quelles normes sont suivies (FMI, AAS, ISO-23247, etc.) ? -->

Il n'existe pas encore de standard universellement adopté pour représenter et échanger les données d'exploitation du réseau (topologie, télémétrie, métadonnées d'actifs, prévisions, interfaces de commande) : l'écosystème smart-grid reste fragmenté (systèmes hérités, protocoles propriétaires, schémas spécifiques par organisation). 
KOPR repose donc sur un **modèle unifié** (langage GreyCat / GCL) et sur des couches de réconciliation dédiées. 
Les standards d'interopérabilité émergents, en particulier le **Common Information Model (CIM)** et les initiatives de modélisation sémantique associées, pourraient simplifier l'intégration future ; l'actionnement des équipements est envisagé via plusieurs protocoles standardisés.

### MC21 — Sécurité et sûreté
<!-- Y a-t-il des considérations de cybersécurité ou de sûreté de fonctionnement ? -->

KOPR opère dans un contexte d'**infrastructure critique** : sécurité et isolation opérationnelle sont des considérations de conception essentielles. 
L'accès aux données, à la simulation et à l'actionnement passe par des API authentifiées et des politiques d'accès par rôle. 
La **séparation stricte entre les mondes de simulation et le modèle opérationnel vivant** garantit qu'une analyse exploratoire ou une simulation en échec ne peut pas affecter la production. 
Les recommandations et actions automatisées sont encadrées par la supervision des opérateurs et des seuils de sûreté configurables. 
Côté sûreté de fonctionnement, les fonctions analytiques critiques (power-flow, court-circuit) sont calculées de façon **redondante** par des algorithmes différents lors des phases de tests, avec des contrôles de cohérence structurelle avant toute simulation ou recommandation de commande.

---

## Enjeux scientifiques et techniques

<!--
Décrivez librement les questions scientifiques/techniques ouvertes que ce UC permet d'explorer.
Pour chaque enjeu, donnez :
- un titre court (### Titre)
- un paragraphe de contexte (1 à 3 phrases)
- éventuellement une image illustrative : ![légende](/media/use-cases/xxx.png)
- les ressources associées :
  - bac à sable : notebook, repo, démo en ligne
  - thèses / doctorants travaillant sur le sujet
  - publications de référence
  - autres liens (datasets, outils, …)
-->


### Génération de stratégies de pilotage des équipements flexibles

Doter KOPR d'un **moteur de génération de scénarios de pilotage** des équipements flexibles du réseau — pompes à chaleur, onduleurs photovoltaïques, bornes de recharge VE. 
Chaque scénario proposé doit respecter les **contraintes réseau** (tenue de tension, charge des transformateurs) tout en appliquant une règle d'**équité** (« fair distribution ») qui équilibre les possibilités d'usage entre utilisateurs, ainsi que des **règles contractuelles** (par exemple, une pompe à chaleur ne peut être déconnectée plus de 2 h par jour) et des **signaux de marché** (déconnexion de la production photovoltaïque lorsque le prix d'achat s'écarte trop du prix de revente sur le marché de gros). 
Le moteur propose les scénarios, **KOPR en calcule l'évaluation** (impact réseau par power-flow, coûts, respect des contraintes) et un **tableau de bord** restitue en temps réel les scénarios et leurs évaluations sous forme de séries temporelles.

En l'absence de lien physique descendant vers les équipements, le module est d'abord proposé en **dry-run** : il permet une évaluation qualitative et la publication comparée de plusieurs scénarios avant tout actionnement réel. 
Côté algorithmique, la génération pourra s'appuyer sur des méthodes **multi-objectifs** (algorithmes génétiques), des **solveurs de contraintes**, voire de l'**IA générative**.

**Bac à sable** : module de génération de scénarios en mode *dry-run* sur le jumeau KOPR — démo / notebook *à publier* · [GreyCat](https://greycat.io) (moteur d'évaluation temporel-graphe et power-flow)

**Thèse** : *Génération et évaluation de stratégies de pilotage multi-objectifs des flexibilités sous contraintes réseau, d'équité et de marché* — doctorant à préciser (DataThings / partenaire académique, 2025–2028)

**Références** :
- [Samadi et al. (2014) — Real-Time Pricing for Demand Response Based on Stochastic Approximation](https://doi.org/10.1109/TSG.2014.2302854) — IEEE Transactions on Smart Grid
- [Rusitschka et al. (2013) — Adaptive Middleware for Real-time Prescriptive Analytics in Large Scale Power Systems](https://doi.org/10.1145/2541596.2541601) — ACM Middleware Industry
- Hartmann & Fouquet — *KOPR: A Production-Grade Digital Twin for Smart Grid Operations Built with GreyCat* (boucle « prescription et actionnement », déploiement par phases)

**Autres liens** : [KOPR — site officiel](https://kopr-twin.com/) · [GreyCat](https://greycat.io)

### Stratégie d'isolation et de planification des travaux

Lorsqu'un segment de réseau ou un concentrateur doit être isolé — maintenance programmée, travaux d'extension, réparation après incident — il faut déterminer un **plan de reconfiguration** (séquence de manœuvres des organes de coupure) qui isole la cible tout en **maintenant l'alimentation** du reste du réseau et le respect des contraintes (tenue de tension, charge des transformateurs, limites des départs de secours). L'enjeu est double : (i) **trouver** automatiquement une reconfiguration faisable parmi un très grand nombre de combinaisons d'états d'interrupteurs, et (ii) **planifier** la fenêtre d'intervention dans le temps, en s'appuyant sur les prévisions de charge et de production pour choisir le créneau de moindre impact.

KOPR évalue chaque plan candidat par simulation « what-if » (power-flow sur la topologie reconfigurée) et par projection sur l'horizon d'intervention. La recherche de reconfiguration peut combiner **parcours de graphe** (identification des chemins d'alimentation de secours), **solveurs de contraintes** et **optimisation** (minimisation des clients coupés, des pertes et du risque de dépassement). Comme pour l'enjeu précédent, et en l'absence de commande descendante généralisée, le module est proposé en **dry-run** pour une évaluation qualitative et la publication comparée de plusieurs plans.

![Isolation d'un concentrateur : recherche d'une reconfiguration de secours et choix de la fenêtre d'intervention de moindre impact](/media/use-cases/uc01-isolation-planification.png)

**Bac à sable** : module de recherche de reconfiguration en mode *dry-run* sur le jumeau KOPR — démo / notebook *à publier* · [GreyCat](https://greycat.io) (parcours de graphe temporel et power-flow)

**Thèse** : *Recherche de reconfigurations de secours et planification d'interventions sous contraintes sur graphe temporel de distribution* — doctorant à préciser (DataThings / partenaire académique, 2025–2028)

**Références** :
- [Hartmann et al. (2019) — GreyCat: Efficient What-If Analytics for Data in Motion at Scale](https://doi.org/10.1016/j.is.2019.03.004) — Information Systems
- [Haas et al. (2011) — Data is Dead… Without What-If Models](https://doi.org/10.14778/3402755.3402769) — Proceedings of the VLDB Endowment
- Hartmann & Fouquet — *KOPR: A Production-Grade Digital Twin for Smart Grid Operations Built with GreyCat* (planification par scénarios, isolation d'un concentrateur)

**Autres liens** : [KOPR — site officiel](https://kopr-twin.com/) · [GreyCat](https://greycat.io)

---

## Matériel
<!-- Liste des datasets, models, repos : - [title](url) — venue. -->

Le UC est fourni sous la forme d'un **kit d'évaluation source-available** (Business Source License, `BUSL-1.1`) : une version minimale de KOPR, ses composants d'exécution et des générateurs de données de substitution, afin de permettre une prise en main sans accès aux données réelles d'un opérateur.

**Dépôt source-available (KOPR minimal)**
- Dépôt public partagé avec **DataThings**, contenant une version réduite de KOPR — complexité et besoins en données minimisés pour faciliter l'évaluation
- Code en langage **GreyCat (GCL)** décrivant les compteurs communicants, les panneaux solaires et les topologies de réseau

**Runtime et licence**
- Runtime **GreyCat** ([greycat.io](https://greycat.io)) fourni par DataThings, avec une **licence Pro** donnant accès à l'ensemble des modules pro — notamment le calcul **power-flow** et la **prédiction solaire**

**Données et générateurs**
- **Topologie réseau** — génération du réseau basse tension à partir des données **OpenStreetMap**, complétées par un algorithme dédié co-développé avec DataThings (la topologie réelle étant difficile à obtenir, cet algorithme constitue l'une des premières tâches du projet)
- **Météo** — flux d'un fournisseur ouvert de type **Open-Meteo**
- **Consommation / production** — générateur de profils aléatoires fourni par DataThings, basé sur ses données d'entraînement

**Évaluation**
- Pour une évaluation par des tiers : benchmark possible sur des **topologies réelles**, sur un ensemble restreint d'utilisateurs et après validation par l'opérateur de réseau concerné

## Références
<!-- Liste de publications, sites web. Format markdown standard : - [title](url) — venue. -->

- [KOPR — site officiel](https://kopr-twin.com/)
- Hartmann, T., Fouquet, F. — *KOPR: A Production-Grade Digital Twin for Smart Grid Operations Built with GreyCat* — Engineering Digital Twins (chapitre d'ouvrage), DataThings / Trier University of Applied Sciences
- [Fouquet et al. (2024) — GreyCat: A Framework to Develop Digital Twins at Large Scale](https://doi.org/10.1145/3652620.3688265) — ACM/IEEE MODELS Companion '24
- [Hartmann et al. (2019) — GreyCat: Efficient What-If Analytics for Data in Motion at Scale](https://doi.org/10.1016/j.is.2019.03.004) — Information Systems
- [Hartmann et al. (2014) — A Native Versioning Concept to Support Historized Models at Runtime](https://doi.org/10.1007/978-3-319-11653-2_16) — MODELS 2014
- [Hartmann et al. (2019) — The Next Evolution of MDE: Seamless Integration of Machine Learning into Domain Modeling](https://doi.org/10.1007/s10270-017-0600-2) — Software and Systems Modeling
- [GreyCat](https://greycat.io) — plateforme de modélisation temporelle-graphe
