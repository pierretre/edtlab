---
id: uc20
title: Démonstrateur Fischertechnik — Jumeaux numériques pour les systèmes de production
provider: IRISA / RWTH Aachen / ISW Stuttgart / Univ. Regensburg (projet MBDO)
contacts:
  - name: Lina Bilal
    org: IRISA, Université de Rennes
    email: lina.bilal@inria.fr
    role: Chercheuse (première auteure)
summary: >-
  Démonstrateur de recherche pour l'ingénierie des jumeaux numériques de systèmes de production manufacturière, basé sur une ligne Fischertechnik modulaire (stockage haute baie, manutention, transport, traitement, tri). Une architecture de référence partagée — passerelle, synchroniseur, moteur DT, gestionnaires de données et de modèles, services — est instanciée pour trois scénarios d'exploitation complémentaires : surveillance énergétique, replanification flexible et maintenance prédictive. Ce démonstrateur sert de plateforme comparative pour évaluer les approches d'ingénierie des jumeaux numériques.
lang: fr
photo: /media/use-cases/uc-default.svg
# domain : industrial-engineering | energy | geospatial | maritime | telecommunications | environment | health | robotics | agriculture | other
domain: industrial-engineering
# maturity : concept | poc | prototype | operational
maturity: prototype
# originType : natural | anthropic | engineered | infrastructure | process
originType: engineered
version: r0.1
status: draft
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

Ce cas d'usage est un **démonstrateur de recherche** pour l'ingénierie des jumeaux numériques de systèmes de production. La plateforme physique est une ligne de fabrication modulaire Fischertechnik composée de six stations — entrepôt haute baie, deux pinces à vide, tapis roulant, station multi-traitements (tour, four, pince) et poste de tri couleur — pilotées par trois PLCs RevPi (Plc-01 à Plc-03) via un switch Ethernet et le protocole MQTT.

Une **architecture de référence** partagée est instanciée pour trois scénarios d'exploitation de complexité croissante. Elle distingue les composants cœur du JN (passerelle DT, synchroniseur, moteur, gestionnaires de données et de modèles) des services à valeur ajoutée (monitoring, analyse, planification, notification). Cette architecture est mise en œuvre par génération de code dirigée par les modèles (MontiGem) à partir de modèles MontiArc et SysMLv2.

L'objectif principal est de montrer comment **une même infrastructure DT** peut être réutilisée pour des préoccupations opérationnelles multiples et concurrentes, et de constituer une **base de comparaison** pour l'évaluation des approches d'ingénierie des jumeaux numériques.

Ce travail est issu du projet **MBDO** (*Model-Based DevOps*, ANR + DFG), réunissant IRISA (Université de Rennes), RWTH Aachen, ISW (Univ. Stuttgart) et Univ. Regensburg.

**Auteurs** : Lina Bilal, Alexander Hellwig, Pierre Treton, Didier Vojtisek, Jingxi Zhang, Benoît Combemale, Jean-Marc Jézéquel, Judith Michael, Bernhard Rumpe, Andreas Wortmann.

---

## Description fonctionnelle

### Utilisateurs

- **Un opérateur de production** — supervise la ligne en temps réel, reçoit les alertes et applique les procédures recommandées
- **Un gestionnaire d'usine** — suit la consommation énergétique agrégée, pilote les objectifs de production et évite les arrêts sur dépassement de capacité
- **Un ingénieur de maintenance** — détecte les anomalies comportementales des machines, planifie les interventions préventives et confirme les récupérations
- **Un planificateur de production** — coordonne les fenêtres de maintenance avec les objectifs de débit et minimise les temps d'arrêt non planifiés
- **Un chercheur en ingénierie des JN** — utilise le démonstrateur comme plateforme de référence pour expérimenter et comparer des approches de conception de JN

### Besoins fonctionnels

- **Décrire + Surveiller** · *Un opérateur* **veut visualiser en temps réel la consommation énergétique de chaque machine et la consommation agrégée** pour détecter les anomalies et planifier les prochaines étapes. **Métrique :** tableau de bord interactif, rafraîchissement continu, alerte si consommation agrégée s'approche ou dépasse la limite du réseau intelligent.

- **Diagnostiquer + Contrôler** · *Un gestionnaire d'usine* **veut être notifié si la consommation totale de production dépasse la limite fixée par le réseau intelligent** pour éviter un arrêt de production forcé. **Métrique :** délai de notification < cadence de mise à jour ; différence limite−consommation calculée et archivée.

- **Diagnostiquer + Optimiser** · *Un ingénieur de maintenance* **veut que le JN détecte automatiquement les disruptions de la trajectoire nominale de production et sélectionne une trajectoire alternative** pour maintenir le débit sans intervention manuelle systématique. **Métrique :** taux de détection des disruptions, temps de récupération, réduction du temps d'arrêt non planifié.

- **Prédire + Contrôler** · *Un ingénieur de maintenance* **veut que le JN surveille les déviations de vitesse moteur sous différentes charges et propose une intervention avant la défaillance** pour éviter les arrêts imprévus. **Métrique :** détection d'anomalie avant défaillance physique ; indicateurs MTBF et MTTR calculés automatiquement.

---

## Caractérisation du Jumeau Numérique

*Grille basée sur le <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">framework unifié de Gil et al. (2024)</a> — 21 caractéristiques.*

### MC1 - Système étudié

Ligne de fabrication modulaire Fischertechnik : six stations physiques interconnectées — *HighBayWarehouse01* (9 slots, élévateur, bras), *VacuumGripper01* et *VacuumGripper02* (pinces à vide 3 axes), *ConveyorBelt01* (tapis avec barrières lumineuses), *MultiProcessingStation01* (tour 270°, four avec LED, tapis de sortie) et *SortingLine01* (tri couleur par 3 éjecteurs pneumatiques). Contrôlée par 3 PLCs RevPi connectés via Ethernet. La ligne représente le flux complet : stockage → manutention → transport → traitement → contrôle qualité → routage.

### MC2 - Composants d'action physiques

Actionneurs des stations pilotés via MQTT depuis les PLCs : axes verticaux, horizontaux et rotatifs des pinces (signaux booléens `move-vertical-up/down`, `move-horizontal-forward/backward`, `move-rotation-clockwise`), convoyeur avant/arrière, éjecteurs pneumatiques du poste de tri (`enable-valve-first/second/third-ejector`), compresseur et valves des pinces, contrôle du four (LED `enable-oven-light`), bras de l'entrepôt haute baie (`move-arm-to-rack`, `move-cantilever`). Le JN transmet des missions de haut niveau (ex. `pickup(x,y,z)`) décomposées en séquences d'actionnement bas niveau par le contrôleur.

### MC3 - Composants de captation physiques

- **Encodeurs et compteurs d'impulsions** — position des axes (sujets à dérive d'encodeur)
- **Barrières lumineuses** — détection de pièces aux points de transfert et sorties de stations
- **Capteur de couleur** — lecture de la teinte au poste de tri (rouge, vert, jaune)
- **Interrupteurs de référence** — positions de fin de course des axes
- **Topics MQTT de dérivation** — positions virtuelles calculées depuis les signaux d'encodeur (ex. `horizontal-enc-`, `vertical-pos`, `motor-vertical-pos`)
- **Consommation énergétique** — mesure par machine pour le scénario de surveillance (UC1)
- **Vitesse moteur** — signaux d'encodeur et horodatages d'arrivée capteurs pour la maintenance prédictive (UC3)

### MC4 - Interaction physique → virtuel

Les PLCs RevPi publient proactivement l'ensemble des états I/O via MQTT (broker central). La **DT-MQTT Upstream Interface** souscrit aux topics pertinents, applique des règles de mapping (`typemap`, `propertymap`, `eventmap`) pour traduire les types MQTT en types DT, et transmet les données au moteur DT. Le synchroniseur maintient la cohérence entre les états physiques reçus et les modèles internes. Les données sont persistées en séries temporelles (InfluxDB, avec horodatage et identifiant de pièce) pour l'historisation et l'analyse rétrospective.

### MC5 - Interaction virtuel → physique

La **DT-MQTT Downstream Interface** traduit les commandes DT en messages MQTT destinés aux PLCs. Pour le scénario de replanification (UC2), le JN sélectionne une mission SCADA alternative et l'envoie via cette interface pour continuer le cycle de production malgré une disruption. Pour la maintenance prédictive (UC3), des actions correctives sont déclenchées automatiquement : arrêt d'urgence (`executeMethod(stop)`), réduction de débit ou commande de recalibration (`Move(1.1, 2.0, 0.0)`).

### MC6 - Services du JN

- **Surveillance énergétique (UC1)** : mesure et journalisation par machine, agrégation de la consommation de process, récupération de la limite réseau intelligent via REST, calcul du budget résiduel, tableau de bord interactif, service de notification par seuil
- **Replanification flexible (UC2)** : suivi de la trajectoire nominale de production (machine d'état SysMLv2), détection de disruption (progression attendue vs. observée), sélection d'une trajectoire alternative, notification de maintenance, archivage des décisions de replanification, calcul des KPI de disponibilité (MTTR, MTBF)
- **Maintenance prédictive (UC3)** : acquisition continue des signaux moteur (vitesse, timing), enrichissement contextuel (poids de charge, mode, compteurs d'usage), détection d'anomalie par comparaison avec le profil baseline, recommandation d'action de maintenance, planification de la fenêtre d'intervention, corrélation anomalie/qualité

### MC7 - Échelle temporelle

Multi-temporelle : **event-driven** (MQTT) pour l'acquisition capteurs et la détection de disruptions (latence < temps de cycle machine), **cyclique par pièce produite** pour l'enrichissement contextuel et la détection d'anomalie moteur (UC3), **périodique** pour la récupération de la limite réseau (REST, UC1) et le calcul des KPI, **long terme** pour l'historisation et l'analyse rétrospective (InfluxDB, PostgreSQL).

### MC8 - Multiplicités

Les trois scénarios fonctionnent en parallèle sur la **même infrastructure DT partagée** (gateway, synchronizer, engine, data manager). Chaque scénario instancie ses propres services (Shadow Aggregator, Replanning Service, Maintenance Planner) qui opèrent de manière indépendante mais partagent l'accès aux mêmes digital shadows. Cette architecture multi-service illustre la **fédération de JN** sur un même système physique.

### MC9 - Phases du cycle de vie

Exploitation de la ligne de production (monitoring temps réel, détection d'anomalies, replanification). Maintenance (planification préventive, intervention, confirmation de récupération). La phase de conception est supportée par les modèles MontiArc/SysMLv2 qui décrivent la structure et le comportement attendu.

### MC10 - Modèles et données

- **Modèles MontiArc** (C&C) : structure fonctionnelle de la ligne (composants, connecteurs, flux d'énergie par machine) — base de la génération du code DT (UC1)
- **Modèles SysMLv2 structurels** : description des machines (ports, propriétés, interfaces `FactorySystem`) et de la topologie de la ligne
- **Modèles SysMLv2 comportementaux** : machine d'état de la progression de la pièce le long du cycle de production (UC2)
- **Digital shadows** : séries temporelles InfluxDB (vitesse moteur, timing, contexte cycle — UC3) et tables PostgreSQL (consommation énergétique, événements de disruption — UC1/UC2)
- **AAS** (*Asset Administration Shell*) : métadonnées d'actifs, descriptions de composants, informations contextuelles pour l'interprétation des déviations (UC3)
- **Profils baseline** : vitesse nominale conditionnée par poids de charge et mode de cycle, construits sur données historiques (UC3)

### MC11 - Outils et facilitateurs

- **MontiArc** — modélisation C&C des systèmes cyber-physiques distribués (RWTH Aachen)
- **SysMLv2** — modélisation structurelle et comportementale (standard OMG)
- **MontiGem** — générateur MDE produisant une application web complète (backend Java/Spring Boot, schéma PostgreSQL, DAOs, frontend) depuis les modèles MontiArc
- **MQTT 5.0** — protocole de messagerie IIoT (broker central)
- **InfluxDB** — base de données de séries temporelles pour la journalisation continue (UC2, UC3)
- **PostgreSQL** — base relationnelle pour les données structurées (UC1, UC2)
- **AAS** — standard d'interopérabilité industrie 4.0 (UC3)
- **BPMN** — moteur de workflow pour l'orchestration des boucles de décision (UC3)
- **RevPi** (Raspberry Pi industriel) — PLCs des postes Fischertechnik

### MC12 - Constellation du JN

```
Physique (RevPi PLCs)
    ↕ MQTT
DT Gateway (DT-MQTT Upstream/Downstream Interfaces)
    ↕
Synchronizer ← → DT Engine (Controller + Service Manager)
                        ↓              ↓
               Data Manager      Model Manager
               (InfluxDB +        (SysMLv2Parser +
                PostgreSQL)        AAS Manager)
                        ↓
               Services (UC1: Shadow Aggregator + Dashboard + Notification)
                        (UC2: Anomaly Detection + Replanning + Notification)
                        (UC3: Analyser + Planner + GUI + Mailing)
```

Les services partagent l'accès aux données et modèles via le Data Manager et le Model Manager. Le Service Manager orchestre les services et coordonne les requêtes.

### MC13 - Processus de jumelage et évolution

Architecture de référence instanciée en trois étapes de complexité croissante : (i) UC1 (monitoring pur, sans actionnement) → (ii) UC2 (boucle de contrôle via replanification) → (iii) UC3 (analyse prédictive avec modèle comportemental et AAS). Les éléments architecturaux sont **explicitement réutilisés** d'un scénario au suivant, avec extension des composants existants plutôt que refonte. La génération de code (MontiGem) réduit l'effort d'implémentation des composants récurrents.

### MC14 - Fidélité et validité

Le démonstrateur Fischertechnik est un système compact à échelle réduite : la fidélité géométrique et de complexité vis-à-vis d'une usine réelle est intentionnellement limitée. Cette contrainte est assumée pour permettre la reproductibilité et la comparabilité des expériences. Pour UC3, la validation repose sur des scénarios de dégradation synthétiques contrôlés : augmentation de poids de charge, augmentation de friction (résistance mécanique intentionnelle), désalignement léger — tous produisant des déviations de vitesse mesurables et étiquetées comme « failure-prone ».

### MC15 - Connexion technique

- **MQTT 5.0** (OASIS) : canal principal physique ↔ JN (topics par machine `/${machine-id}/...`)
- **DT-MQTT Upstream/Downstream Interfaces** : traduction bidirectionnelle des types MQTT ↔ DT
- **REST API** : récupération de la limite énergétique depuis le réseau intelligent externe (UC1)
- **Server-Sent Events (SSE)** : notifications push vers le frontend (UC2 — alerte disruption)
- **Spring REST API** : interface web graphique de supervision (UC2, UC3)
- **AAS import/export** : interopérabilité des métadonnées d'actifs (UC3)

### MC16 - Hébergement / déploiement

Démonstrateur de laboratoire (IRISA Rennes, RWTH Aachen, ISW Stuttgart). Serveur local hébergeant le moteur DT, les services, PostgreSQL et InfluxDB. Interface web accessible depuis postes de travail. Architecture conçue pour être portée vers des systèmes de production à plus grande échelle, bien que cette extension n'ait pas encore été évaluée quantitativement.

### MC17 - Insights et prise de décision

- **UC1** : tableau de bord interactif avec graphiques en ligne des consommations par machine et agrégée, budget résiduel, alertes email/push au franchissement de seuil
- **UC2** : notification graphique de disruption (machine affectée mise en évidence dans la vue usine), contexte de disruption (étape, composant, trajectoire nominale active), confirmation de récupération par l'ingénieur
- **UC3** : alertes opérateur avec composant affecté et procédure de traitement recommandée, plan de maintenance avec action concrète (recalibration, reset, inspection, réduction de débit), fenêtre d'intervention estimée, vue agrégée des anomalies et corrélations qualité

### MC18 - Intégration horizontale

Intégration entrante depuis un **réseau intelligent externe** (REST, pour la limite de consommation dynamique — UC1). Les trois scénarios opèrent en parallèle sur le même DT, illustrant la composition de préoccupations opérationnelles multiples. AAS comme couche d'interopérabilité avec d'autres systèmes industrie 4.0 (UC3). Architecture explicitement conçue pour être extensible vers des lignes de production plus grandes et interconnectées.

### MC19 - Propriété et confidentialité des données

Démonstrateur de recherche open-source (projet MBDO — https://mbdo.github.io). Les données sont non confidentielles. Dans un contexte industriel réel, les données de production, de maintenance et les modèles comportementaux des machines seraient propriétaires et soumis à des exigences de confidentialité.

### MC20 - Standardisation

- **ISO 23247** (*Digital twin framework for manufacturing*) — cadre de référence utilisé pour structurer l'architecture
- **SysMLv2** (OMG) — modélisation structurelle et comportementale
- **MQTT 5.0** (OASIS) — protocole de communication IIoT
- **AAS** (*Asset Administration Shell*, Industrial Digital Twin Association) — métadonnées d'actifs et interopérabilité Industrie 4.0
- **BPMN** (OMG) — orchestration des workflows de décision (UC3)

### MC21 - Sécurité et sûreté

Démonstrateur de laboratoire à risques physiques réduits (système Fischertechnik compact). Contrôle d'accès aux interfaces de commande via l'architecture DT (seuls les services autorisés accèdent à la DT-MQTT Downstream Interface). Dans un contexte industriel réel, les interfaces d'actionnement (replanification, maintenance corrective) nécessiteraient authentification et supervision opérateur formelle.

---

## Scénarios d'exploitation

### UC1 — Surveillance de la consommation énergétique maximale

La ligne est connectée à un réseau intelligent qui fixe dynamiquement une limite de puissance totale. Le JN mesure et journalise la consommation de chaque machine, agrège la consommation du process, récupère la limite réseau en temps réel via REST, calcule le budget résiduel et notifie l'opérateur et le gestionnaire lorsque la consommation s'approche ou dépasse la limite.

**Architecture** : MontiArc C&C model → MontiGem → Backend (Spring Boot + PostgreSQL) + Frontend ; Shadow Aggregator + Dashboard Service + Notification Service sur moteur DT.

### UC2 — Replanification flexible après disruption

Le JN surveille en continu la progression nominale d'une pièce entre les stations. Lorsqu'une disruption est détectée (progression attendue non confirmée dans le délai imparti), il identifie l'étape et le composant affecté, sélectionne une trajectoire alternative via SCADA, notifie l'ingénieur de maintenance et archive la décision pour analyse des KPI (MTTR, MTBF par composant).

**Architecture** : SysMLv2 state machine (cycle de production) → SysMLV2Parser → Anomaly Detection Service + Replanning Service + Notification Service ; InfluxDB pour l'historique des disruptions ; SCADA pour l'actionnement.

### UC3 — Maintenance prédictive des équipements

Le JN enregistre en continu les signaux moteur (vitesse, timing d'arrivée capteurs) avec leur contexte (poids de charge, mode de cycle, compteurs d'usage). Pour chaque cycle, il compare la vitesse observée au profil baseline conditionné et détecte les déviations. Lorsqu'une tendance à la dégradation est identifiée, il génère un plan de maintenance (action recommandée, fenêtre d'intervention) et alerte les parties prenantes.

**Architecture** : AAS pour les métadonnées d'actifs ; InfluxDB pour les séries temporelles ; Analyser + Planner + GUI + Mailing Service ; BPMN (Workflow Controller) pour la boucle décision-action ; DT-MQTT Upstream Interface pour l'acquisition des signaux moteur.

---

## Enjeux scientifiques et techniques

*Chaque enjeu est annoté par les questions de recherche (RQ_X) de la feuille de route EDT [[Combemale et al., 2025](https://inria.hal.science/hal-05223776)].*

### Architecture de référence réutilisable pour les JN de systèmes de production

La principale contribution du démonstrateur est de montrer qu'une même architecture de référence (gateway → synchronizer → engine → data/model managers + services) peut être **instanciée et réutilisée** pour des préoccupations opérationnelles multiples et concurrentes sur le même système physique. L'enjeu est de formaliser les contrats de service, les mécanismes de coordination entre services, et les conditions de réutilisation des éléments architecturaux, afin que cette architecture devienne un standard praticable pour l'industrie manufacturière.

RQ associées : RQ_E2 (modularisation), RQ_E3 (orchestration du déploiement), RQ_E6 (standards et protocoles d'interopérabilité)

### Composition de JN pour des préoccupations opérationnelles multiples

Les trois scénarios traitent le même système physique sous trois angles différents (énergie, production, maintenance). Un système de production réel nécessite que ces préoccupations coexistent et interagissent : une replanification peut affecter la consommation énergétique ; une anomalie moteur peut déclencher une replanification. L'enjeu est de concevoir des mécanismes de **composition et de coordination** entre JN opérant des préoccupations différentes, avec des contrats explicites sur les données partagées, les priorités d'action et les effets secondaires.

RQ associées : RQ_E3 (orchestration du déploiement), RQ_T3 (composition d'incertitudes inter-DTs)

### Génération de JN par approche model-driven (MDE)

L'implémentation utilise MontiGem pour générer automatiquement une grande partie de l'infrastructure DT (backend, base de données, frontend) depuis les modèles MontiArc. L'enjeu est d'étendre cette approche de génération à l'ensemble de l'architecture DT — gateway, synchronizer, services — afin de réduire radicalement l'effort d'ingénierie et d'améliorer la cohérence entre modèles et implémentation. Cela inclut la gestion des extensions manuelles nécessaires pour les comportements spécifiques au domaine.

RQ associées : RQ_E2 (modularisation), RQ_D7 (manipulation des modèles), RQ_D11 (interopérabilité sémantique)

### Synchronisation en temps réel et gestion de l'hétérogénéité des sources

L'intégration de sources hétérogènes (MQTT event-driven, REST polling, modèles SysMLv2, AAS) dans un moteur DT cohérent soulève des enjeux de synchronisation, de résolution d'identité et de cohérence des digital shadows. L'enjeu est de formaliser les mécanismes de synchronisation bidirectionnelle dans des architectures DT à sources multiples, et de gérer les données partielles, en retard ou bruitées (ex. dérive d'encodeur).

RQ associées : RQ_D2 (incertitude des données), RQ_D3 (collecte de données hétérogènes), RQ_D6 (évolution des modèles), RQ_I5 (effet de l'hybridation sur la validité)

### Maintenance prédictive par détection comportementale et planification automatique

Le scénario UC3 illustre une boucle MAPE-K complète (Monitor–Analyse–Plan–Execute) sur un système de production physique. L'enjeu est de généraliser cette approche à des systèmes de production réels, où les profils de comportement nominal sont plus complexes, les données plus bruitées, et les actions de maintenance plus contraintes (fenêtres d'arrêt, disponibilité techniciens). Cela inclut la construction automatique des profils baseline, le transfert d'apprentissage entre machines similaires et la corrélation anomalie–qualité.

RQ associées : RQ_I3 (hybridation de modèles), RQ_I5 (effet de l'hybridation sur la validité), RQ_D6 (évolution des modèles), RQ_T4 (précision et fidélité)

---

## Matériel

Le démonstrateur Fischertechnik est disponible comme plateforme de référence partagée dans le cadre du projet MBDO :

- **Code source** : disponible sur https://mbdo.github.io (projet ANR + DFG)
- **Plateforme physique** : ligne Fischertechnik reproduite dans plusieurs laboratoires partenaires (IRISA Rennes, RWTH Aachen, ISW Stuttgart)
- **Modèles** : MontiArc (C&C), SysMLv2 (structurel + comportemental), AAS (métadonnées actifs)
- **Stack technique** : MontiGem, MQTT, InfluxDB, PostgreSQL, Spring Boot/Java, BPMN

## Références

- Bilal L., Hellwig A., Treton P., Vojtisek D., Zhang J., Combemale B., Jézéquel J.-M., Michael J., Rumpe B., Wortmann A. — *Digital Twins for Manufacturing Systems: A Case Study Based On a Fischertechnik Factory* — MBDO project, IRISA / RWTH Aachen / ISW Stuttgart / Univ. Regensburg, 2026
- [Projet MBDO — Model-Based DevOps](https://mbdo.github.io) (ANR + DFG)
- ISO 23247-1:2021 — *Digital twin framework for manufacturing*
- Combemale B. et al. [Engineering Digital Twins: A Research Roadmap](https://inria.hal.science/hal-05223776). EDTconf 2025. ⟨hal-05223776⟩
