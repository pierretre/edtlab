---
id: uc05
title: Boucle fluidique
provider: CETIM
contacts:
  - name: Mahussi Datongnon
    org: Inria
    email: mahussi-jeff-fidele.datongnon@inria.fr
  - name: Hubert Lejeune
    org: CETIM
    email: Hubert.Lejeune@cetim.fr
  - name: Jus Yoann
    org: CETIM
    email: Yoann.Jus@cetim.fr
summary: >-
  Jumeau numérique d’une boucle hydraulique fermée et instrumentée, dotée d'une pompe, 
  d'un échangeur thermique, et de divers organes de régulation.
# usersCount : nombre d'utilisateurs effectifs du JN (métrique de diffusion)
usersCount: 1
lang: fr
photo: /media/uploads/uc05-jnem-thermal-hydraulic-loop-cetim.jpg
# domain : industrial-engineering | energy | geospatial | maritime | telecommunications | environment | health | robotics | agriculture | other
domain: industrial-engineering
# maturity : concept | poc | prototype | operational
maturity: operational
# originType : natural | anthropic | engineered | infrastructure | process
originType: engineered
# version : identifiant de version du UC (ex r0.1, r1.0, ...). La dernière est affichée par défaut sur la liste.
version: r1.0
# draft or published
status: published
# license: CC-BY-4.0
# license : identifiant SPDX
tags:
  - boucle-fuidique
  - cetim
  - recalibrage
  - jumeau-numerique
  - simulation
publishedDate: 2026-06-04T00:00:00.000Z
---

## Résumé
Le jumeau numérique du système de boucle fluidique est conçu pour fournir des capacités de **surveillance et aide à la décision**. 
Le système physique est constitué d'une boucle hydraulique fermée équipée d'une pompe centrifuge, d'un échangeur thermique et plusieurs organes de régulation/actionneurs. 
Sa fonction est de fournir le débit, la pression et/ou la température demandés par l'opérateur.

Le jumeau numérique exploite ces données via une infrastructure de collecte afin d’alimenter un ensemble de modèles hybrides. 
Le cœur du système repose sur un **modèle physique thermo-hydraulique** capable de simuler le comportement du fluide en fonction des conditions opératoires. Ce modèle est complété par des **modèles data-driven** permettant d’améliorer certaines fonctions spécifiques comme la détection d’anomalies ou l’estimation de paramètres.

Les principales fonctions assurées par le jumeau numérique sont les suivantes :
- **Surveillance des conditions de fonctionnement** à partir des données capteurs et de la simulation.
- **Détection de cavitation**, en identifiant le risque de cavitation associé à un futur point de fonctionnement dans le système.
- **Capteur virtuel** permettant d’estimer le débit en cas de défaillance capteur.
- **Analyse énergétique**, via la simulation de scénarios alternatifs de fonctionnement (ex : stratégies de refroidissement).
- **Détection de divergence**, basée sur la comparaison continue entre mesures réelles et résultats simulés.

Lorsque des écarts significatifs sont détectés, les modèles data-driven interviennent alors pour **identifier les paramètres responsables des écarts** et estimer leur correction, permettant ainsi d’ajuster le modèle physique. Cette boucle d’adaptation garantit le maintien de la **fidélité du jumeau numérique** malgré l’évolution du système réel.

---

## Description fonctionnelle

### Utilisateurs

- **Un opérateur de supervision** - surveille les variables du système, consulte les indicateurs fournis par le jumeau numérique et prend des décisions opérationnelles (gestion du refroidissement). Il utilise les fonctionnalités d’aide à la détection de cavitation afin d’évaluer si un futur point de fonctionnement est susceptible de générer de la cavitation au niveau de la pompe, de la vanne d’aspiration ou de la vanne de régulation.
- **Un ingénieur développement (modélisation / simulation)** - conçoit, calibre et maintient le modèle physique thermo-hydraulique ainsi que son intégration dans le jumeau numérique.  
- **Un chercheur / expert R&D** - utilise le jumeau numérique comme plateforme expérimentale pour tester des stratégies d’hybridation, d’adaptation des modèles et d’amélioration de la fidélité. Il développe, entraîne et valide les modèles data-driven (localisation et estimation de défauts) utilisés pour le recalibrage du modèle.
- **Un système automatisé (via PLC)** - exécute les actions de contrôle (ajustement de la pompe, ouverture de vanne, activation du refroidissement) sur demande de l'opérateur.

### Besoins fonctionnels
<!-- Typologies disponibles : Décrire | Diagnostiquer | Prédire | Optimiser | Contrôler | Sécuriser | Interagir. Combinaisons possibles avec '+' (ex : Décrire + Sécuriser).

Format : <Typologie> · <Utilisateur> veut <action> pour <objectif>, dans <contexte>. Métrique : <indicateur quantifié>. -->

- **Décrire + Interagir** · *Un opérateur de supervision* **veut visualiser les variables clés (pression, débit, température) ainsi que l’état estimé du système par le jumeau numérique** afin de comprendre le comportement du procédé et de prendre des décisions opérationnelles éclairées en exploitation continue. **Métrique :** fréquence de rafraîchissement = 1 Hz.

- **Diagnostiquer** · *Un chercheur / expert R&D* **veut détecter et analyser les divergences entre les mesures réelles et les résultats du jumeau numérique** afin d'identifier les limites du modèle, les défauts potentiels ou les besoins de recalibrage. **Métrique :** fréquence d'analyse = 1/60 Hz, divergence simulation-réalité ≥ *seuil*.

- **Optimiser + Prédire** · *Un opérateur de supervision* **veut comparer plusieurs stratégies de refroidissement (FAST, SLOW, SMART)** afin de sélectionner le meilleur compromis entre durée du refroidissement et consommation énergétique avant leur mise en œuvre. **Métrique :** temps de refroidissement pour chaque scénario, énergie consommée pour chaque scénario.

- **Sécuriser + Diagnostiquer** · *Un opérateur de supervision* **veut évaluer le risque de cavitation associé à un futur point de fonctionnement** afin d'éviter les dégradations de la pompe, de la vanne d'aspiration et de la vanne de régulation avant l'application des nouvelles consignes.

- **Décrire + Sécuriser** · *Un opérateur de supervision* **veut continuer à disposer des variables critiques grâce à un capteur virtuel en cas de perte ou de défaillance du capteur de débit** afin de maintenir la supervision du procédé. Se déclenche dès que l'information sur le débit n'est pas remontée.

- **Optimiser + Diagnostiquer** · *Un chercheur / expert R&D* **veut entraîner, valider et évaluer des modèles data-driven de localisation et d'estimation de défauts** afin d'améliorer les capacités d'adaptation et de recalibrage du jumeau numérique. **Métrique :** précision de localisation ≥ *seuil*, erreur d'estimation ≤ *seuil*.

- **Contrôler** · *Un système automatisé (via PLC)* **veut exécuter les commandes émises par l'opérateur (ajustement de la pompe, pilotage des vannes, gestion du refroidissement)** afin d'appliquer les consignes sélectionnées.
---

## Caractérisation du Jumeau Numérique

*Grille basée sur le <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">framework unifié de Gil et al. (2024)</a> - 21 caractéristiques.*

### MC1 - Système étudié
<!-- Décrivez le système physique étudié (le jumeau physique), son environnement et les agents/opérateurs présents. -->

Le système étudié est une **boucle fluidique thermo-hydraulique** instrumentée, utilisée pour contrôler et observer des variables de procédé telles que la pression, le débit et la température. Il est composé d’un ensemble de composants physiques interconnectés incluant une pompe, une vanne de régulation et un système de refroidissement, formant un circuit fermé de circulation du fluide.

Le système évolue dans un environnement industriel comprenant :
- un contrôleur programmable (PLC Beckhoff) assurant le pilotage des actionneurs,
- une infrastructure informatique (PC industriel, réseau de communication),
- des opérateurs humains responsables de la supervision et de la maintenance.

Les agents impliqués incluent :
- des **opérateurs de supervision**, qui surveillent les variables du système,
- des **ingénieurs et mainteneurs**, qui analysent les performances et interviennent en cas de déviation,
- un **système automatisé (PLC)**, qui exécute les commandes.

### MC2 - Composants d'action physiques
<!-- Listez les actionneurs et mécanismes par lesquels le jumeau numérique peut agir sur le système physique. -->

Les composants d’action du système physique sont les **actionneurs permettant de modifier le comportement de la boucle fluidique** :

- **Pompe (contrôle de vitesse)** - ajuste le débit du fluide dans la boucle.
- **Vanne de régulation** - contrôle l’ouverture pour moduler la pression et le débit.
- **Système de refroidissement (vanne on/off)** - permet de réguler la température du fluide en activant ou désactivant le refroidissement.

Ces actionneurs sont pilotés via le **PLC Beckhoff**, qui exécute les consignes reçues du système de contrôle.

### MC3 - Composants de captation physiques
<!-- Listez les capteurs et mécanismes par lesquels le système physique transmet des données au jumeau numérique. -->

Le système est équipé de plusieurs **capteurs permettant de mesurer l’état du processus** et de fournir les données au jumeau numérique :

- **Capteurs de pression**
- **Capteurs de température**
- **Capteur de vitesse de pompe** 
- **Capteur de débit** 

Les données captées sont transmises au système numérique via le PLC et l’infrastructure de communication industrielle (OPC UA, MQTT), alimentant ainsi les modèles du jumeau numérique.

### MC4 - Interaction physique --> virtuel
<!-- Décrivez les données transmises du système physique vers le jumeau numérique : protocoles, fréquences, types de données, standards et normes. -->

L’interaction du système physique vers le jumeau numérique repose sur une **acquisition continue des données capteurs**, permettant de refléter l’état du système dans l’environnement virtuel.

Les données transmises incluent :
- **Variables de procédé** : pression (multi-points), température, débit (si disponible),
- **Variables de commande** : vitesse de pompe, position de la vanne de régulation, état du système de refroidissement

Sur le plan technique, la chaîne de transmission est structurée en plusieurs niveaux :

- **Collecte locale (niveau usine)** :
  - Les capteurs sont connectés au **PLC Beckhoff** et au serveur OPCUA, 
  - Les données sont structurées selon les standards industriels embarqués dans l’automate.

- **Communication industrielle** :
  - Utilisation du protocole **OPC UA** pour un échange standardisé et interopérable des données industrielles.

- **Ingestion et traitement** :
  - Stockage des données dans une base de données, assurant persistance et exploitation historique.

- **Fréquence et volume** : Acquisition à une fréquence de 1 Hz

### MC5 - Interaction virtuel --> physique
<!-- Décrivez les données transmises du jumeau numérique vers le système physique : commandes, alertes, paramètres, standards et normes. -->

L’interaction du jumeau numérique vers le système physique repose sur la **transmission de commandes et de recommandations opérationnelles** visant à ajuster dynamiquement le comportement de la boucle fluidique.

Les données transmises incluent :
  - ajustement de la **vitesse de la pompe**,
  - modification de l’**ouverture de la vanne de régulation**,
  - pilotage du refroidissement du procédé par la sélection d’un scénario thermique (FAST, SLOW ou SMART) déterminant les conditions d’activation du groupe froid durant la phase de refroidissement.
    - Scénario FAST : le groupe froid est sollicité à pleine puissance dès le début de la phase de refroidissement et reste actif jusqu’à l’atteinte de la température cible. Ce scénario privilégie la rapidité de refroidissement.
    - Scénario SLOW : aucun refroidissement actif n’est mis en œuvre. La diminution de la température repose uniquement sur les pertes thermiques naturelles de la boucle. Ce scénario minimise la consommation énergétique au détriment du temps de refroidissement.
    - Scénario SMART : approche intermédiaire combinant refroidissement passif et refroidissement actif. Dans un premier temps, la température diminue naturellement. Lorsque la température de la boucle atteint la valeur médiane entre la température initiale et la température cible, le groupe froid est activé pour finaliser le refroidissement. Ce scénario vise un compromis entre rapidité et consommation énergétique.

Sur le plan technique, la chaîne de transmission est organisée comme suit :

- Les décisions sont générées à partir des services du jumeau numérique (simulation, modèles data-driven).
- Les commandes sont transmises au **PLC Beckhoff**.

<!-- TICK -->
### MC6 - Services du JN
<!-- Listez les services fournis par le jumeau numérique : simulation, optimisation, détection, visualisation, etc. -->

Le jumeau numérique fournit un ensemble de **services opérationnels et analytiques** destinés à la surveillance, au diagnostic et à l’optimisation du système fluidique. Ces services reposent sur l’exploitation conjointe de modèles physiques et data-driven.

Les principaux services sont les suivants :

- **Surveillance et visualisation** : Fournit une représentation des variables du système (pression, température, débit).

- **Détection de cavitation** : Évaluer le risque de cavitation associé à un futur point de fonctionnement afin d'éviter les dégradations de la pompe, de la vanne d'aspiration et de la vanne de régulation avant l'application des nouvelles consignes.

- **Capteur virtuel** : Estime le débit en cas de défaillance capteur à partir du modèle physique et des autres données disponibles.

- **Analyse énergétique** : Comparer plusieurs stratégies de refroidissement (FAST, SLOW, SMART)** afin de sélectionner le meilleur compromis entre durée du refroidissement et consommation énergétique avant leur mise en œuvre.

- **Détection de divergence** : Compare en continu les résultats simulés avec les mesures réelles pour identifier les écarts significatifs entre le système physique et le jumeau numérique.

- **Diagnostic des causes de divergence** : Utilise des modèles data-driven pour identifier les paramètres du modèle physique responsables des écarts observés.

- **Estimation et mise à jour des paramètres** : Calcule des valeurs corrigées des paramètres du modèle afin d’améliorer la fidélité du jumeau numérique et de maintenir son alignement avec le système réel.

### MC7 - Échelle temporelle
<!-- Précisez les échelles de temps : synchronisation temps réel, plus rapide, plus lent que le système physique. -->

Le jumeau numérique fonctionne selon plusieurs **échelles temporelles complémentaires**, adaptées aux différents services et usages.

- **Run-time**  
  Les données capteurs sont acquises et transmises avec une fréquence de 1 Hz

- **Simulation de scénarios**
  De 5 s à 45 s en fonction du scenario choisi

- **Modèles inductifs**  
  - Génération du jeu d'entraînement : environ 560 s
  - Localisation et estimation d'un paramètre à mettre à jour : environ 35 s

### MC8 - Multiplicités
<!-- Le JN est-il composé de sous-jumeaux ? Architecture centralisée ou décentralisée ? Multi-instance ? -->

Pas de sous jumeau numérique

### MC9 - Phases du cycle de vie
<!-- Quelles phases du cycle de vie sont couvertes ? Conception, fabrication, exploitation, maintenance, démantèlement. -->

Le jumeau numérique couvre principalement les phases **d’exploitation, de maintenance et partiellement de conception/validation** du système fluidique.

- **Conception / validation (partielle)**  
  Le jumeau numérique est utilisé pour simuler différents scénarios de fonctionnement (variation de paramètres, stratégies de refroidissement), permettant de tester et valider des choix de conception ou de configuration sans intervention directe sur le système physique.

- **Exploitation (phase principale)**  
  Le cœur de l’usage du jumeau numérique se situe en exploitation, avec :
  - la surveillance des variables du système,
  - la détection de cavitation et d’anomalies,
  - le capteur virtuel pour pallier les défaillances capteurs,
  - l’analyse de performance (énergétique, comportement hydraulique).
  
- **Maintenance**  
  Le jumeau numérique joue un rôle actif dans la maintenance en :
  - détectant les divergences entre le modèle et le système réel,
  - identifiant les causes de dérive (paramètres dégradés),
  - facilitant le diagnostic.
  
- **Évolution continue (cycle de vie étendu)**  
  Grâce à l’hybridation, le jumeau numérique supporte une logique d’**amélioration continue**, avec :
  - mise à jour des paramètres du modèle,
  - adaptation aux évolutions du système réel,

### MC10 - Modèles et données
<!-- Décrivez les modèles utilisés (physiques, données, hybrides) et les données d'entrée/sortie. -->

Le jumeau numérique repose sur une **architecture hybride combinant modèles physiques et modèles data-driven**, alimentée par des flux de données issus du système réel et par des données synthétiques générées en simulation.

#### Modèles utilisés

- **Modèles physiques (déductifs)**  
  Le modèle **thermo-hydraulique 1D** (implémenté sous Simcenter Flomaster), utilisé pour simuler le comportement du système fluidique. Deux niveaux de complexité sont exploités :
  - un modèle **hydraulique**, pour des calculs rapides,
  - un modèle **thermo-hydraulique**, intégrant les effets thermiques.  
  Ces modèles permettent de calculer les variables de procédé (pression, débit, température) en fonction des paramètres physiques et des entrées de contrôle.

- **Modèles data-driven (inductifs)**  
  Deux types de modèles d’apprentissage sont intégrés pour compléter le modèle physique :
  - un **modèle de localisation de défaut** (arbre de décision), identifiant les paramètres responsables des écarts observés entre simulation et réalité,
  - un **modèle d’estimation de paramètres** (LS-SVR), permettant d’inférer les valeurs corrigées de ces paramètres.  

- **Architecture hybride**  
  - le modèle physique produit une simulation de référence,
  - les modèles data-driven analysent les écarts et ajustent les paramètres,
  - les paramètres du modèle de simulation sont mise à jour pour rester alignée avec le système réel.

#### Données

- **Données d’entrée (inputs)** : Ouverture Vanne, Vitesse Pompe, Température process

- **Paramètres du modèle physique** : coefficients de perte de charges au niveau des portions de tuyaux, pression du réservoir

- **Données de sortie (outputs)** : Pression Entrée Pompe, Pression Sortie Pompe , Débit simulé, Pression Entrée Echangeur, Pression Sortie Echangeur, Temperature

- **Données pour l’apprentissage** :
  Les modèles data-driven sont entraînés à partir de jeux de données combinant des **données synthétiques**, générées par simulation en faisant varier :
    - les données entrées,
    - les paramètres physiques,

### MC11 - Outils et facilitateurs
<!-- Listez les outils, frameworks et plateformes utilisés pour réaliser les services du JN, lister les API. -->

La réalisation du jumeau numérique repose sur un **écosystème d’outils industriels et de simulation**, 

#### Outils industriels et edge

- **Beckhoff PLC (TwinCAT)**  
  Assure le pilotage des actionneurs, l’acquisition des données capteurs et l’exécution des logiques de contrôle.
  
- **PC industriel (edge computing)**  
  Permet l’exécution locale de certains services nécessitant une faible latence et héberge des composants du jumeau numérique.

- **TwinCAT ADS (API)**  
  Bibliothèque utilisée pour la communication bidirectionnelle entre les applications numériques et le PLC (lecture/écriture des variables).

#### Simulation et interopérabilité

- **Simcenter Flomaster**  
  Outil de simulation thermo-hydraulique utilisé pour développer les modèles physiques du système.

- **FMPy (FMU execution)**  
  Framework permettant d’exécuter des modèles exportés au format **FMU (Functional Mock-up Unit)**,

_- **FMU / FMI (standard)**  
  Standard d’interopérabilité pour l’intégration de modèles multi-physiques dans des environnements distribués.

#### Communication et protocoles

- **OPC UA**  
  Standard industriel pour l’échange de données avec le PLC et les équipements.

#### Interface utilisateur

- **Application web**  
  Interface de visualisation et d’interaction permettant :
  - la supervision des variables du système,
  - l’accès aux résultats des simulations et analyses,
  - l’interaction avec les services du jumeau numérique.

### MC12 - Constellation du JN
<!-- Comment les modèles, données, outils et services sont-ils orchestrés ensemble ? Architecture logique du JN. -->

Architecture orientée services : capteurs --> PLC (collecte et contrôle) --> communication industrielle (OPC UA ) --> base de données --> services du jumeau numérique (simulation FMU, modèles data-driven, diagnostic) --> interface utilisateur et/ou retour PLC.

Les modèles data-driven complètent le modèle physique en analysant les écarts et en ajustant les paramètres à l’exécution.

**Boucle de retour** :  
services du jumeau numérique --> consignes du superviseur --> communication vers PLC (TwinCAT ADS) --> actionneurs (pompe, vanne, refroidissement) --> modification de l’état physique --> nouvelles mesures capteurs --> réalimentation du jumeau numérique.

### MC13 - Processus de jumelage et évolution
<!-- Décrivez la méthodologie de développement du JN, ses jalons et ses évolutions prévues. -->

Approche incrémentale et progressive :

- **Étape 1 - Modélisation physique initiale**  
  Développement d’un modèle hydraulique 1D et thermo-hydraulique 1D du système (simulation) avec une calibration initiale basée sur des données expérimentales.

- **Étape 2 - Connexion au système réel**  
  Intégration des capteurs et du PLC permettant l’acquisition des données et la synchronisation avec le modèle (mode observation + simulation).

- **Étape 3 - Déploiement des services de base**  
  Mise en place des premières fonctionnalités du jumeau numérique : simulation, visualisation, détection de cavitation, capteur virtuel.

- **Étape 4 - Introduction de l’hybridation**  
  Ajout de modèles data-driven entraînés sur des données simulées et réelles pour :
  - détecter les divergences,
  - identifier les paramètres responsables,
  - estimer leurs corrections.

- **Étape 5 - Boucle d’adaptation continue**  
  Intégration des modèles dans une boucle fermée permettant l’ajustement des paramètres du modèle physique à l’exécution.

**Évolution prévue :**
- passage vers des approches de **active learning**,
- amélioration de la fidélité du modèle (raffinement physique),

### MC14 - Fidélité et validité
<!-- Quelle est la précision des modèles ? Comment sont-ils validés et calibrés ? Quelle est la précision des mesures ? Sont elles bruitées ? Partielles ? Polluées ? -->

Le jumeau numérique reproduit le comportement du système fluidique avec un **niveau de fidélité dépendant à la fois du modèle physique et des mécanismes d’hybridation**.

- **Précision du modèle physique**  
  Le modèle thermo-hydraulique 1D capture la dynamique globale du système (pression, débit, température) avec une précision satisfaisante dans les conditions nominales. 

- **Calibration et validation**  
  Le modèle est initialement calibré à partir de données expérimentales issues du système réel.  

- **Adaptation dynamique (hybridation)**  
  La fidélité est maintenue dans le temps grâce à :
  - la **détection de divergence** entre simulation et mesures,
  - l’utilisation de modèles data-driven pour ajuster certains paramètres du modèle physique.  
  Cela permet de compenser les effets non modélisés (usure, pertes, conditions non prévues).

- **Gestion des limitations**  
  - Le **capteur virtuel** permet d’estimer les variables manquantes.  
  - Les mécanismes de validation empêchent l’application de corrections incohérentes.


### MC15 - Connexion technique
<!-- Quels protocoles réseau et architectures de communication sont utilisés entre le physique et le virtuel ? -->

- **Niveau physique --> edge**  
  Communication entre capteurs/actionneurs et le PLC Beckhoff via des bus industriels internes et interfaces d’E/S.

- **Niveau PLC --> systèmes numériques**  
  - **OPC UA** : protocole principal pour l’échange standardisé de données industrielles.

- **Boucle de retour (virtuel --> physique)**  
  - Communication vers le PLC via **TwinCAT ADS** pour appliquer les consignes sur les actionneurs.


### MC16 - Hébergement / déploiement
<!-- Où est hébergé le JN ? Local, cloud, plateforme dédiée ? Mode de déploiement. -->

Combine exécution locale et services cloud :

- **Niveau edge (local industriel)**  
  - PC industriel hébergeant des composants du jumeau numérique pour les traitements à **faible latence**.  
  - Communication directe avec le PLC via **TwinCAT ADS** pour les interactions.
  
- Niveau stockage
  - base de données relationnelle

- **Niveau applicatif**  
  - Interface web accessible à distance pour la supervision, la visualisation et l’interaction avec le jumeau numérique.

### MC17 - Insights et prise de décision
<!-- Quels insights et aides à la décision le JN fournit-il aux opérateurs ? -->

- **Visualisation de l’état du système**  
  - Affichage des variables (pression, débit, température)  

- **Détection et alertes**  
  - Alerte en cas de **risque de cavitation**  
  - Signalement des **écarts significatifs** entre le système réel et le modèle (divergence)

- **Diagnostic**  
  - Identification des **paramètres responsables des dérives**   

- **Analyse prédictive et scénarios**  
  - Simulation de scénarios alternatifs (what-if) des points de fonctionnement pour anticiper une cavitation  
  - Évaluation de stratégies de refroidissement de la boucle
  
### MC18 - Intégration horizontale
<!-- Le JN échange-t-il des données avec d'autres systèmes (SCADA, autres JN, SI) ? -->

- **Connexion avec les systèmes industriels**  
  - Intégration avec le **PLC Beckhoff** pour le pilotage et l’acquisition.  
  - Échange indirect avec des systèmes de supervision via les protocoles standards (OPC UA).

- **Connexion avec les systèmes d’information (IT)**  
  - Stockage et exploitation des données dans une base de données, pouvant être partagé avec d’autres applications (analytics, reporting).

### MC19 - Propriété et confidentialité des données
<!-- Y a-t-il des considérations de propriété ou confidentialité des données ? RGPD ? -->

  Le CETIM est propriétaire à la fois du banc (situé à Nantes, dans ses locaux) et des données associées. Les conditions de partage et de diffusion des données, ainsi que la définition des formats de données, font actuellement l'objet d'une étude.

### MC20 - Standardisation
<!-- Quelles normes sont suivies (FMI, AAS, ISO-23247, etc.) ? -->

- **FMI (Functional Mock-up Interface)**  
  Standard utilisé pour l’export et l’intégration des modèles sous forme de **FMU (Functional Mock-up Units)**, permettant leur exécution dans différents environnements (via FMPy).

- **OPC UA (Open Platform Communications Unified Architecture)**  
  Standard industriel pour l’échange de données entre le PLC et les systèmes numériques, garantissant **interopérabilité et indépendance vis-à-vis des fournisseurs**.

### MC21 - Sécurité et sûreté
<!-- Y a-t-il des considérations de cybersécurité ou de sûreté de fonctionnement ? -->

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


### Hybridation des modèles dans les jumeaux numériques
<!--
    - RQ_D6 Évolution des modèles
    - RQ_D7 Manipulation des modèles
    - RQ_D8 Entraînement des modèles
    - RQ_I3 Hybridation de modèles
    - RQ_I4 Opérateurs  d’hybridation
    - RQ_I5 Enveloppe de validité
    - RQ_T2 Qualité du modèle
-->
Le jumeau numérique de la boucle fluidique met en évidence le besoin de **combiner des modèles physiques (déductifs) et des modèles data-driven (inductifs)** pour répondre aux exigences des systèmes industriels modernes. En pratique, le modèle physique fournit une structure explicative robuste, tandis que les modèles d’apprentissage permettent de capturer des phénomènes non modélisés (pertes, dégradations, bruit). L’enjeu scientifique réside dans la définition de **modes d’hybridation cohérents et généralisables**, permettant une interaction structurée entre ces modèles.

---

## Matériel
<!-- Liste des datasets, models, repos : - [title](url) - venue. -->

## Références
<!-- Liste de publications, sites web. Format markdown standard : - [title](url) - venue. -->

- [Poster - EDT · UC05 · Boucle thermo-hydraulique JNEM](/media/use-cases/uc05-poster-jnem-thermal-hydraulic-loop-cetim.pdf) - Yoann Jus, CETIM


## Thèses en cours

- [Model Hybridization in Digital Twins for Mechanical Engineering](/fr/travaux-de-recherche/phd-pc1-cetim-model-hybridization) - Mahussi Datongnon, Inria (PC1)