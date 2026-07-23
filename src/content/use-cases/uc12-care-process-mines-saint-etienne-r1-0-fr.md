---
id: uc12
title: Jumeau numérique du parcours de soins
provider: Mines Saint-Étienne
contacts:
  - name: Thierry Garaix
    org: Mines Saint-Étienne
    email: garaix@emse.fr
    role: Maître-assistant
summary: >-
  Jumeau numérique du parcours de soins hospitalier multi-étapes - de l'admission à la rééducation - couplé au
  processus de travail des ressources médicales et paramédicales. La chirurgie, les urgences et le traitement
  du cancer sont les principaux cas d'usage, avec pour objectif de simuler et d'optimiser l'organisation des
  soins et des équipes.
usersCount: 0
lang: fr
# domain : industrial-engineering | energy | geospatial | maritime | telecommunications | environment | health | robotics | agriculture | other
domain: health
# maturity : concept | poc | prototype | operational
maturity: prototype
# originType : natural | anthropic | engineered | infrastructure | process
originType: process
# version : identifiant de version du UC (ex r0.1, r1.0, ...). La dernière est affichée par défaut sur la liste.
version: r1.0
# draft or published
status: published
tags:
  - sante
  - parcours-de-soins
  - gestion-des-ressources
  - jumeau-numerique
  - simulation
  - aide-a-la-decision
publishedDate: 2026-07-21T00:00:00.000Z
---

## Résumé

Le système physique étudié est le parcours de soins hospitalier : le processus multi-étapes de l'admission à
la rééducation, couplé au processus de travail des ressources médicales et paramédicales (médecins,
infirmiers, blocs opératoires, lits). La chirurgie, les urgences et le traitement du cancer sont les
principaux cas d'usage.

Le jumeau numérique est un logiciel de supervision, de prédiction et d'aide à la décision fondé sur
l'analyse de données et des modèles de processus détaillés - un réseau de jumeaux numériques couvrant
plusieurs unités de soins et partenaires hospitaliers. Il permet de simuler et d'évaluer des scénarios futurs
d'offre et de demande de soins, de proposer des configurations organisationnelles optimisées, de soutenir une
régulation équitable et coordonnée des parcours de soins, et de former le personnel face à des situations de
crise ou à de nouvelles organisations.

Le cas d'usage est mené avec plusieurs partenaires hospitaliers et de recherche, dont le CHU de
Saint-Étienne, l'Hôpital Le Corbusier (Firminy), AÉSIO Santé, IMT Mines Albi-Carmaux, Telecom Sud Paris. Différentes versions sont développées et expérimentées in situ selon le service (bloc opératoire, service d'urgences) et le partenaire hospitalier.

---

## Description fonctionnelle

### Utilisateurs

- **Un responsable de parcours de soins** - surveille le flux de patients et la charge des ressources pour organiser la prise en charge.
- **Un administrateur hospitalier / régulateur** - arbitre les configurations organisationnelles et la régulation des parcours entre services.
- **Un personnel médical/paramédical** - est formé aux situations de crise ou à de nouvelles organisations via la simulation.
- **Un chercheur / analyste de processus** - étudie les parcours patients réels et l'usage des ressources pour calibrer les modèles.

### Besoins fonctionnels

- **Piloter** · *Le chef de service* suit l'activité en temps réel, est alerté de risques à venir. Peut anticiper l'évolution du système sans action, ou avec des actions managériales simulées dans le système.  **Métrique :** Ecart entre activité prévue et constatée, en mode suivi et simulé.

- **Prédire + Optimiser** · *Un responsable de parcours de soins* veut simuler et évaluer des scénarios futurs d'offre et de demande de soins pour proposer des configurations organisationnelles optimisées, en amont des décisions de planification de capacité. **Métrique :** scénarios comparés sur la charge des ressources et les indicateurs de parcours (temps d'attente, occupation).

- **Optimiser + Décrire** · *Un administrateur hospitalier* veut soutenir une régulation équitable et coordonnée des parcours de soins entre services pour équilibrer la charge entre unités, dans les opérations quotidiennes. **Métrique :** réduction du déséquilibre des parcours / de la variance des temps d'attente entre unités.

- **Diagnostiquer** · *Un chercheur* veut analyser les parcours patients réels à partir des données de suivi indoor et de supervision pour identifier les goulets d'étranglement et calibrer les modèles de simulation, pendant les phases de développement des modèles. **Métrique :** parcours patients reconstruits et comparés aux parcours modélisés.

- **Former + Décrire** · *Un personnel médical/paramédical* veut s'entraîner à des situations de crise ou à de nouvelles organisations grâce à la supervision et simulation détaillées (y compris en réalité virtuelle) pour se préparer à de réels changements opérationnels, en amont du déploiement. **Métrique :** nombre de scénarios couverts par les sessions de formation.

---

## Caractérisation du Jumeau Numérique

*Grille basée sur le <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">framework unifié de Gil et al. (2024)</a> - 21 caractéristiques.*

### MC1 - Système étudié

Le parcours de soins hospitalier : processus multi-étapes de l'admission du patient à la rééducation, couplé
au processus de travail des ressources médicales et paramédicales (médecins, infirmiers, blocs opératoires,
lits, zones d'attente). La chirurgie, les urgences et le traitement du cancer sont les principaux cas
d'usage, situés au sein d'une ou plusieurs unités hospitalières (ex. CHU de Saint-Étienne, Hôpital Le
Corbusier).

### MC2 - Composants d'action physiques

Aucun actionneur direct : le jumeau numérique est orienté aide à la décision. Les sorties (recommandations,
configurations optimisées, scénarios de formation) sont exploitées par des opérateurs humains - responsables
de parcours, administrateurs, personnel soignant.

### MC3 - Composants de captation physiques

- Système de suivi indoor - localisation en temps réel des patients et du personnel dans les unités de soins
- Systèmes d'information hospitaliers - événements d'admission, sortie et transfert de patients, occupation des ressources

### MC4 - Interaction physique → virtuel

Exploitation du système de suivi indoor et des données de processus hospitaliers pour reconstruire les
parcours patients réels et l'usage des ressources, alimentant les modèles de supervision et de simulation.
Fréquences et formats à préciser.

### MC5 - Interaction virtuel → physique

Aucune commande directe sur les ressources physiques : le jumeau numérique produit un tableau de bord de
contrôle en temps réel, des résultats de simulation et des configurations organisationnelles optimisées,
exploités par les responsables de parcours et les administrateurs.

### MC6 - Services du JN

- Tableau de bord de contrôle en temps réel de la charge patients/ressources
- Supervision détaillée et simulation à événements discrets des unités de soins
- Simulation et évaluation de scénarios futurs d'offre et de demande de soins
- Proposition de configurations organisationnelles optimisées
- Environnement de formation du personnel (y compris en réalité virtuelle) pour les situations de crise ou nouvelles organisations
- Analyse des parcours patients réels à partir des données de suivi indoor

### MC7 - Échelle temporelle

Combine supervision en temps réel (suivi indoor, tableau de bord de contrôle) et simulation de scénarios
tactiques/stratégiques (configuration organisationnelle, planification de capacité). Pas de boucle de
commande temps réel fermée.

### MC8 - Multiplicités

Un réseau de jumeaux numériques : plusieurs unités de soins et partenaires hospitaliers (CHU de
Saint-Étienne, Hôpital Le Corbusier) sont modélisés, avec une capacité de coordination à l'échelle du réseau.

### MC9 - Phases du cycle de vie

Couvre l'exploitation des parcours de soins (admission à la rééducation) et la conception/planification
organisationnelle (évaluation de configurations futures), ainsi que la formation du personnel.

### MC10 - Modèles et données

- Modèles de processus détaillés des unités de soins (simulation à événements discrets)
- Modèles orientés données alimentés par l'analyse des parcours patients réels et le suivi indoor
- Données : événements d'admission/sortie/transfert de patients, traces de localisation indoor, occupation des ressources

### MC11 - Outils et facilitateurs

Tableau de bord de contrôle en temps réel, logiciel de supervision/simulation détaillée, environnement de
formation en réalité virtuelle, exploitation d'un système de suivi indoor.

### MC12 - Constellation du JN

Pipeline : ingestion des données de suivi indoor et hospitalières → analyse des parcours patients réels →
modèles de processus/simulation détaillés → tableau de bord de contrôle, configurations optimisées et
scénarios de formation VR. Un réseau de jumeaux numériques coordonné entre unités de soins.

### MC13 - Processus de jumelage et évolution

Approche incrémentale construite avec les partenaires hospitaliers (CHU de Saint-Étienne, Hôpital Le
Corbusier) et de recherche (IMT Mines Albi-Carmaux, Telecom Sud Paris). Détails à préciser à mesure que le réseau
de jumeaux numériques se développe.

### MC14 - Fidélité et validité

Calibration à partir de l'analyse des parcours patients réels issus des données de suivi indoor. Démarche de
validation et métriques d'erreur à préciser.

### MC15 - Connexion technique

Connexion au système de suivi indoor et aux systèmes d'information hospitaliers. Protocoles à préciser.

### MC16 - Hébergement / déploiement

Dans les hôpitaux partenaires.

### MC17 - Insights et prise de décision

- Tableau de bord de contrôle en temps réel de la charge des unités de soins
- Configurations organisationnelles optimisées pour les scénarios d'offre et de demande
- Recommandations de régulation équitable et coordonnée entre parcours de soins
- Retours de formation pour le personnel face à des situations de crise ou de nouvelles organisations

### MC18 - Intégration horizontale

Implique plusieurs partenaires hospitaliers (CHU de Saint-Étienne, Hôpital Le Corbusier, AÉSIO Santé) et de
recherche (IMT Mines Albi-Carmaux, Telecom Sud Paris), coordonnant un réseau de jumeaux numériques entre unités de
soins.

### MC19 - Propriété et confidentialité des données

Les données de parcours et de localisation des patients sont des données de santé sensibles. La gouvernance
et la conformité réglementaire (protection des données de santé) restent à formaliser entre les partenaires
hospitaliers.

### MC20 - Standardisation

À préciser.

### MC21 - Sécurité et sûreté

Le traitement de données patients sensibles (localisation, parcours) nécessite un contrôle d'accès et des
mesures de protection des données de santé. Pas de boucle de commande directe - risque de sûreté
opérationnelle limité au périmètre de l'aide à la décision.

---

## Enjeux scientifiques et techniques

*Chaque enjeu est annoté par les questions de recherche (RQ_X) de la feuille de route EDT [[Combemale et al., 2025](https://inria.hal.science/hal-05223776)].*

### Coordination d'un réseau de jumeaux numériques

Coordonner le réseau de jumeaux numériques entre unités de soins et partenaires hospitaliers, afin que les
optimisations locales restent cohérentes avec une régulation globale, équitable et coordonnée des parcours de
soins.

RQ associées : RQ_C5 (coordination de l'accès fédéré), RQ_D10 (agrégation de données inter-DTs)

### Optimisation combinatoire pilotée par les données

Concevoir des modèles et algorithmes d'optimisation combinatoire pilotés par les données, efficaces pour
proposer des configurations organisationnelles optimisées pour des parcours de soins complexes et
multi-étapes sous contraintes de ressources.

RQ associées : RQ_D8 (entraînement des modèles IA), RQ_T5 (propriétés de qualité par cas d'usage)

### Calibration automatisée des modèles

Automatiser le paramétrage des modèles par inférence bayésienne et apprentissage par renforcement, afin de
maintenir les modèles de simulation et d'optimisation alignés avec le comportement observé des parcours de
soins sans réglage manuel extensif.

RQ associées : RQ_D6 (évolution des modèles de simulation), RQ_D9 (interface CRUD modèles IA)

### Accès FAIR aux données historiques et temps réel

Gérer l'accès FAIR (Trouvable, Accessible, Interopérable, Réutilisable) aux données historiques et temps réel
des parcours de soins - incluant les données sensibles de suivi indoor et de patients - à travers le réseau
de partenaires hospitaliers.

RQ associées : RQ_D3 (collecte de données hétérogènes), RQ_E5 (sécurité des données et traçabilité)

---

## Matériel

- [Care process DT for complex demand with resource management (Poster)](/media/use-cases/uc12-poster-care-process-mines-saint-etienne.pdf) - Use Case Workshop, Lyon, 6-7 janvier 2026

## Références

- [Poster - Care process DT for complex demand with resource management](/media/use-cases/uc12-poster-care-process-mines-saint-etienne.pdf) - Thierry Garaix, Mines Saint-Étienne - Use Case Workshop, Lyon, 6-7 janvier 2026
- Combemale B., Vicat-Blanc P., Blouin A., Bril El Haouzi H., Bruel J.-M. et al. [Engineering Digital Twins: A Research Roadmap](https://inria.hal.science/hal-05223776). EDTconf 2025 - 2nd International Conference on Engineering Digital Twins, Oct 2025, Grand Rapids, Michigan, United States. pp.1-7. ⟨hal-05223776⟩ - feuille de route scientifique du programme EDT (codes RQ_X).

## Thèses en cours
