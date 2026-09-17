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
  Jumeau numérique de surveillance d'un stockage géologique de CO₂ en aquifère salin, permettant l'assimilation de données en quasi-temps réel, la prédiction du comportement dynamique du réservoir, la quantification des risques et la détection d'anomalies (surpression, migration latérale de CO₂ au-delà des limites du réservoir).
usersCount: 0
lang: fr
photo: /media/uploads/uc25.png
# domain : industrial-engineering | energy | geospatial | maritime | telecommunications | environment | health | robotics | agriculture | other
domain: energy
# maturity : concept | poc | prototype | operational
maturity: poc
# originType : natural | anthropic | engineered | infrastructure | process
originType: natural
# version : identifiant de version du UC (ex r0.1, r1.0, ...). La dernière est affichée par défaut sur la liste.
version: r1.0
# draft or published
status: published
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

Le système physique est un site de stockage géologique de CO₂ dans un aquifère salin, comprenant le réservoir souterrain (roches poreuses et perméables), les fluides (CO₂ supercritique et saumure) et les puits d'injection.

Le jumeau numérique (JN) est un système de surveillance conçu pour mettre à jour en continu les paramètres et l'état du réservoir par assimilation de données, prédire son évolution dynamique sur des horizons pluridécennaux, quantifier les risques associés et détecter des anomalies de comportement du réservoir. L'intégration de la détection de fuites hors réservoir n'est pas envisagée à court terme : elle nécessiterait d'ajouter au modèle la roche couverture, des failles, des puits potentiellement défaillants, les aquifères situés au-dessus du stockage, voire tout le sous-sol jusqu'à la surface. Dans le périmètre actuel, la « fuite » détectable se limite donc à la migration latérale, c'est-à-dire au dépassement des limites latérales du complexe de stockage, à l'intérieur du réservoir uniquement, la roche couverture (caprock) n'étant pas représentée. L'ensemble de ces développements repose et est testé, à ce stade, uniquement sur des cas synthétiques, avec des données générées en amont. Au démarrage du projet, le JN consiste en un POC initial implémentant une brique fonctionnelle unique avec des modèles de substitution rapides, une visualisation de base et un affichage de données en quasi-temps réel dans une application web. FIWARE a été identifié comme socle open-source potentiel autour duquel construire la future architecture.

---

## Description fonctionnelle

### Utilisateurs

- **Un ingénieur de surveillance de site** - surveille en continu l'état du stockage et sa conformité, interprète les alertes et valide les prédictions du JN.
- **Un décideur opérationnel** - ajuste les paramètres d'injection et les plans de surveillance sur la base des recommandations du JN.
- **Un expert en risques et conformité réglementaire** - évalue les risques de fuite, vérifie la conformité avec le cadre réglementaire européen sur le stockage géologique de CO₂.
- **Un chercheur en géosciences / modélisation** - calibre et améliore les modèles de réservoir, valide les stratégies d'assimilation de données.

### Besoins fonctionnels ciblés

- **Décrire + Prédire** · *Un ingénieur de surveillance* veut disposer d'une représentation à jour de l'état du réservoir (pression, température, saturation en gaz, fraction molaire CO₂ dissous) pour vérifier la conformité du site en quasi temps réel et anticiper son évolution jusqu'à 30 ans. **Métrique :** prédictions cohérentes avec les observations sur le pas de temps annuel.

- **Détecter + Alerter** · *Un décideur opérationnel* veut être alerté en quasi-temps réel d'anomalies (comportement anormal de la pression, potentiel de fuite) pour déclencher des actions correctives. **Métrique :** dépassement de seuils physiques explicites : (1) pression anormale au puits ; (2) surpression dans le réservoir, c'est-à-dire seuil atteint dans une zone à risque (exploitation pétrolière, géothermique, etc.) ; (3) fuite, c'est-à-dire seuil de saturation en gaz ou de concentration en CO₂ dissous dépassé au-delà des limites latérales du réservoir. **Quasi-temps réel :** la cadence d'alerte dépend de la fréquence des données (puits : horaire ; données sismiques : supérieure à 1 an) et de la fréquence d'assimilation du modèle, qui lui est distincte : l'année dans un premier temps, puis le mois, et éventuellement le jour selon le coût CPU du processus d'assimilation.

- **Quantifier + Évaluer** · *Un expert risques* veut obtenir des évaluations probabilistes des risques (fuite hors des limites latérales du complexe de stockage, dans le réservoir uniquement puisque le caprock n'est pas représenté ; surpression) mises à jour au fil des données. **Métrique :** intervalles de confiance sur les risques quantifiés par scénario.

- **Optimiser** · *Un ingénieur de surveillance* veut identifier les stratégies d'acquisition de données (placement de puits) les plus informatives pour améliorer la précision des modèles tout en maîtrisant les coûts. **Métrique :** réduction de l'incertitude des paramètres clés pour un budget d'instrumentation donné. Note : cette recommandation sur les stratégies d'acquisition est réalisée en amont de la conception du système plutôt qu'en continu pendant l'exploitation du JN ; elle est ensuite remise à jour à la détection d'une anomalie ou d'une fuite.

---

## Caractérisation du Jumeau Numérique

*Grille basée sur le <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">framework unifié de Gil et al. (2024)</a> - 21 caractéristiques.*

### MC1 - Système étudié

Site de stockage géologique de CO₂ dans un aquifère salin profond : réservoir poreux et perméable (maillage radial 2D, NX=100, NZ=20), fluides (CO₂ supercritique et saumure) et puits d'injection. La roche couverture (caprock) n'est pas représentée dans le modèle. Contexte opérationnel : installation de stockage dont seul le puits d'injection est modélisé, et uniquement dans le réservoir. Cas actuellement uniquement synthétiques, avec données générées en amont.

### MC2 - Composants d'action physiques

Équipements de contrôle du puits d'injection (vannes, débitmètres). Dans le POC actuel, le JN est un outil de surveillance et d'aide à la décision ; les actions physiques restent sous contrôle humain. Objectif futur : recommandations automatisées sur les paramètres d'injection.

### MC3 - Composants de captation physiques

- Capteurs de pression et de température dans les puits d'injection et de surveillance
- Capteurs géochimiques (composition des fluide, CO₂ dissous) dans les puits de surveillance
- Potentiellement : données sismiques 3D pour surveiller la plume de CO₂ gazeux
- Données d'exploitation (débit d'injection, volumes cumulés)
- Hors périmètre : microsismicité et données satellitaires de déformation de surface (InSAR), que le modèle synthétique proposé ne peut pas prendre en compte sans y ajouter la mécanique

### MC4 - Interaction physique → virtuel

Acquisition de données depuis les capteurs de puits pour alimenter les algorithmes d'assimilation et mettre à jour les paramètres du modèle de réservoir. Dans le POC : pas de temps annuel, horizon 0-30 ans. Objectif futur : assimilation en quasi-temps réel via FIWARE. Cadence cible par paliers : annuelle, puis mensuelle, puis éventuellement journalière selon le coût CPU de l'assimilation. La fréquence d'assimilation reste distincte de la fréquence d'acquisition des données, horaire pour les puits et pluriannuelle pour la sismique.

### MC5 - Interaction virtuel → physique

Pas de boucle de contrôle automatique actuellement. Le JN produit des prédictions et alertes (anomalies, risques de fuite) transmises aux opérateurs pour ajuster les paramètres d'injection ou déclencher des interventions de surveillance.

### MC6 - Services du JN

- Simulation de l'évolution du réservoir (température, pression, saturation en gaz, fraction molaire CO₂ dissous)
- Assimilation de données pour la mise à jour des paramètres et de l'état du système
- Quantification et mise à jour des risques (fuite, surpression)
- Détection et anticipation d'anomalies
- Potentiellement : Mise à jour de la stratégie d'acquisition de données, déclenchée par la détection d'une anomalie ou d'une fuite

### MC7 - Échelle temporelle

Horizons de simulation de 0 à 30 ans, pas de temps annuel dans le POC. Objectif à terme : assimilation en quasi-temps réel pour la surveillance opérationnelle, au sens d'une montée en cadence progressive : l'année, puis le mois, puis éventuellement le jour selon le coût CPU de l'assimilation.

### MC8 - Multiplicités

Modèle géologique 2D radial représentant un puits d'injection central et le réservoir environnant. Pistes d'extension : multi-puits, échelle du réservoir complet, et extension verticale intégrant toutes les couches géologiques jusqu'à la surface afin de simuler les fuites à travers la roche couverture, les failles et les puits. Pas d'extension aux installations de surface (pompes, transport, captage).

### MC9 - Phases du cycle de vie

Phase d'exploitation et de surveillance du site de stockage (injection active et post-injection). Le JN supporte également la planification (stratégie de surveillance, optimisation des campagnes de mesure).

### MC10 - Modèles et données

- **Modèles de réservoir 2D radiaux** (R ou Python) : simulation des écoulements CO₂/saumure et des transferts thermiques, basée sur les équations d'écoulement des fluides, de transport des espèces et de diffusion thermique en milieu poreux
- **Modèles de substitution rapides** (surrogate models) : proxies des simulations haute-fidélité pour l'assimilation en quasi-temps réel
- **Moteur Python** : assimilation de données, construction et mise à jour des modèles ML
- **Sorties d'intérêt** : température, pression, saturation en gaz, fraction molaire du CO₂ dissous, évolution temporelle sur la carte NX=100 × NZ=20
- **FIWARE** : socle contexte data pour la future architecture de collecte de données
- Cas d'usage actuellement basés uniquement sur des données synthétiques, générées en amont. Le modèle radial est un modèle synthétique d'IFPEN.

### MC11 - Outils et facilitateurs

R et/ou Python selon les composants (modèles, simulateurs, moteur d'assimilation et ML), le choix du langage n'étant pas figé par composant, FIWARE (socle contexte data, future architecture), application web de visualisation ([co2-storage.fastit.dev](https://co2-storage.fastit.dev/)).

### MC12 - Constellation du JN

Pipeline : acquisition de données (capteurs puits, surface) → assimilation et mise à jour des paramètres → simulation du réservoir (surrogate models) → quantification des incertitudes → détection d'anomalies et évaluation des risques → visualisation et tableau de bord.

### MC13 - Processus de jumelage et évolution

Démarche incrémentale : POC initial (brique fonctionnelle unique) → intégration de nouvelles sources de données → extension de l'architecture avec intégration de la solution FIWARE → généralisation à d'autres applications souterraines (géothermie) via des ontologies contextualisées.

### MC14 - Fidélité et validité

Modèles de substitution calibrés sur des simulations de référence haute-fidélité. À ce stade, tout repose et est testé uniquement sur des cas synthétiques, avec des données générées en amont. Validation à établir sur des données de terrain réelles. Propagation des incertitudes sur les paramètres physiques (perméabilité, porosité, etc.) à formaliser.

### MC15 - Connexion technique

Application web externe pour la visualisation et l'affichage en quasi-temps réel ([co2-storage.fastit.dev](https://co2-storage.fastit.dev/)). FIWARE identifié pour la future intégration des flux de capteurs. Protocoles d'échange avec les systèmes d'acquisition de terrain reste à définir.

### MC16 - Hébergement / déploiement

Application web déployée ([co2-storage.fastit.dev](https://co2-storage.fastit.dev/)). solution intégrée complète, embarquant des brokers de contexte FIWARE et hébergée sur le Cloud. Un connecteur dédié vers le supercalculateur interne IFPEN y sera associé.

### MC17 - Insights et prise de décision

- Prédictions probabilistes de l'état actuel et futur du réservoir (pression, température, saturation, fraction molaire CO₂ dissous)
- Mise à jour des évaluations de risque (fuites au sens du dépassement des limites latérales du réservoir, surpression) au fil des données
- Alertes en cas de détection d'anomalies
- Potentiellement : Mise à jour de la stratégie d'acquisition déclenchée par la détection d'une anomalie ou d'une fuite

### MC18 - Intégration horizontale

Architecture conçue pour être générique et réutilisable à d'autres échelles (du puits unique au réservoir complet) et à d'autres applications souterraines (géothermie) via des ontologies contextualisées. Les installations de surface sont explicitement hors périmètre.

### MC19 - Propriété et confidentialité des données

Données de surveillance du site de stockage potentiellement sensibles (capacités, comportement du réservoir, incidents). Conformité avec le cadre réglementaire européen de surveillance des sites de stockage géologique de CO₂ (Directive 2009/31/CE) à intégrer. Le modèle physique peut également constituer une donnée confidentielle. Dans le cas présent, le modèle radial est un modèle synthétique d'IFPEN : il ne pose pas de problème de confidentialité.

### MC20 - Standardisation

Ontologies contextualisées pour la réutilisabilité inter-applications souterraines. Alignement avec les standards de l'industrie pétrolière et gazière pour la modélisation de réservoir. Conformité avec le cadre réglementaire européen de surveillance des stockages CO₂.

### MC21 - Sécurité et sûreté

Enjeu central de sûreté : détection précoce d'une migration de CO₂ au-delà des limites latérales du complexe de stockage (dépassement d'un seuil de saturation en gaz ou de concentration en CO₂ dissous) et de surpressions dans des zones à risque. La détection des fuites verticales à travers la roche couverture, les failles et les puits suppose une extension du modèle jusqu'à la surface, envisagée à plus long terme. Le JN est un outil de surveillance critique pour garantir l'intégrité du site et la conformité réglementaire. Sécurité de l'application web (authentification, contrôle d'accès) à assurer.

---

## Enjeux scientifiques et techniques

*Chaque enjeu est annoté par les questions de recherche (RQ_X) de la feuille de route EDT [[Combemale et al., 2025](https://inria.hal.science/hal-05223776)].*

### Assimilation de données en quasi-temps réel

Intégrer des flux de données hétérogènes et bruités (pression, température, géochimie : CO₂ dissous) dans des modèles physiques de réservoir pour maintenir une représentation à jour de l'état du système. La microsismicité n'est pas exploitable avec ce modèle. Dans un premier temps, l'assimilation de données sera basée sur les simulations haute-fidélité plutôt que sur des données de terrain réelles. Enjeu de latence, de cohérence des formats et de robustesse aux données manquantes, avec des fréquences d'acquisition très contrastées (horaire au puits, pluriannuelle pour la sismique) à assimiler dans un modèle dont la cadence propre est d'abord annuelle, puis mensuelle.

RQ associées : RQ_D3 (collecte de données hétérogènes), RQ_D2 (incertitude des données)

### Modèles de substitution pour la simulation rapide

Construire et mettre à jour en continu des surrogate models (modèles ML) précis et rapides en remplacement des simulations de réservoir haute-fidélité, pour permettre l'assimilation et l'exploration de scénarios en quasi-temps réel.

RQ associées : RQ_I3 (hybridation de modèles), RQ_I4 (opérateurs d'hybridation)

### Quantification et propagation des incertitudes

Caractériser les incertitudes sur les paramètres physiques (perméabilité, porosité) et les paramètres de contrôle futur du puits et les propager jusqu'aux prédictions et évaluations de risque pour produire des intervalles de confiance exploitables par les opérateurs.

RQ associées : RQ_D2 (incertitude des données), RQ_I5 (enveloppe de validité), RQ_T4 (quantification de la précision et fidélité)

### Détection d'anomalies et gestion des risques

Identifier en quasi-temps réel des comportements anormaux du réservoir comme la surpression et mettre à jour les évaluations de risque pour déclencher des actions correctives au bon moment. Deux familles de critères : (i) la pression, au puits et en termes de surpression atteignant un seuil dans une zone à risque (exploitation pétrolière, géothermique, etc.) ; (ii) la migration latérale, avec une saturation en gaz ou une concentration en CO₂ dissous dépassant un seuil au-delà des limites latérales du réservoir. La détection de migration verticale de CO₂ hors réservoir est envisagée à plus long terme, nécessitant d'intégrer dans le modèle les failles, les puits et les aquifères sus-jacents, du sous-sol jusqu'à la surface.

RQ associées : RQ_T6 (surveillance continue de la qualité), RQ_T5 (propriétés de qualité par cas d'usage)

### Optimisation des stratégies d'acquisition de données

Déterminer le type, la localisation et la fréquence optimaux des mesures pour améliorer la précision des modèles et réduire les incertitudes critiques, tout en maîtrisant les coûts d'instrumentation et de surveillance. Cette optimisation est réalisée en amont de la conception du système plutôt qu'en continu pendant l'exploitation du JN. Extension possible : Elle est ensuite remise à jour lors de la détection d'une anomalie ou d'une fuite.

RQ associées : RQ_D3 (collecte de données hétérogènes), RQ_D1 (déploiement capteurs)

### Généricité et réutilisabilité via les ontologies

Concevoir le JN pour qu'il soit applicable à d'autres contextes souterrains (géothermie, autres aquifères, autres échelles) sans reprise majeure, en s'appuyant sur des ontologies contextualisées interopérables.

RQ associées : RQ_D11 (interopérabilité sémantique), RQ_D6 (évolution des modèles), RQ_E2 (modularisation)

---

## Matériel

- Application web de démonstration : [co2-storage.fastit.dev](https://co2-storage.fastit.dev/)

## Références

- [Poster Stockage géologique CO₂](/media/use-cases/uc25-poster-co2storage-ifpen.pdf) - Use Case Workshop, Lyon, 6-7 janvier 2026

## Thèses en cours