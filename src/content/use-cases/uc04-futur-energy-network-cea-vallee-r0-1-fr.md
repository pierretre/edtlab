---
id: uc04
title: Système multi-énergie expérimental
provider: CEA LITEN
contacts:
  - name: Mathieu Vallée
    org: CEA LITEN
    email: mathieu.vallee@cea.fr
    role: Chercheur
summary: >-
  Jumeau numérique d'un système multi-énergie expérimental (micro-réseau électrique, réseau de chaleur et de froid, H₂, gaz naturel) pour la prédiction de la production et de la demande, l'estimation d'état, le calcul de consignes de contrôle optimal et la détection de défauts. Lié au PEPR Réseaux du Futur.
usersCount: 0
lang: fr
photo: /media/use-cases/uc04-futur-energy-network-cea.pdf
# domain : industrial-engineering | energy | geospatial | maritime | telecommunications | environment | health | robotics | agriculture | other
domain: energy
# maturity : concept | poc | prototype | operational
maturity: poc
# originType : natural | anthropic | engineered | infrastructure | process
originType: engineered
# version : identifiant de version du UC (ex r0.1, r1.0, ...). La dernière est affichée par défaut sur la liste.
version: r0.1
# draft or published
status: published
tags:
  - multi-énergie
  - micro-réseau
  - contrôle-optimal
  - chaleur-et-froid
  - solaire
  - stockage
  - hybridation
  - pepr
publishedDate: 2026-06-24T00:00:00.000Z
---

## Résumé

Le système physique est une infrastructure multi-énergie expérimentale du CEA LITEN, constituée de deux sous-systèmes couplés : un **micro-réseau électrique** (photovoltaïque 180 kW, batteries BESS 460 kWh / 560 kVA, groupe électrogène 132 kVA, 15 véhicules électriques 150–600 kWh, émulateurs de stockage) et un **réseau de chaleur et de froid** (solaire thermique HP 50 kW / 180°C et BP 210 kW / 110°C, pompes à chaleur HT et TFP, ORC, stockage thermique HP/BP, production de froid, émulateur de charge 200°C/20 bar). L'infrastructure intègre également des vecteurs H₂ (PEM électrolyseur, réseau GN, cogénération) et est connectée à un réseau de distribution basse pression 90°C (~400 kW) et froid 7°C (~400 kW) desservant 4 sous-stations.

Le jumeau numérique associe modèles physiques et ML pour couvrir trois niveaux imbriqués : JN d'**équipement individuel** (contrôle, estimation d'état, détection de défauts, maintenance prédictive), JN de **systèmes et réseaux** (prédiction, contrôle optimal, diagnostic), JN **multi-énergie et multi-échelle** (dispatch optimal, participation au marché). La composition entre niveaux constitue un enjeu scientifique central.

Ce UC s'inscrit dans le cadre du PEPR Future Energy Networks (Réseaux du Futur).

**Contributeurs** : Mathieu Vallée, Nicolas Vasset, Grégory Païs, François Boudehenn, Cédric Paulus, Grégory Guyot.

---

## Description fonctionnelle

### Utilisateurs

- **Un opérateur du système** - surveille l'état en temps réel, reçoit les alertes de défauts et applique (ou valide) les consignes de contrôle calculées par le JN.
- **Un ingénieur d'exploitation** - analyse les performances, diagnostique les anomalies et optimise les stratégies d'exploitation à court et moyen terme.
- **Un chercheur en systèmes énergétiques** - développe et valide des modèles de composants, des algorithmes de contrôle et des méthodes d'estimation d'état sur l'infrastructure expérimentale.
- **Un planificateur réseau** - utilise le JN multi-énergie pour évaluer des stratégies de dispatch optimal et de participation aux marchés de l'énergie.

### Besoins fonctionnels

- **Prédire** · *Un opérateur* veut anticiper la production solaire et la demande (chaleur, froid, électricité) pour préparer le dispatch des équipements. **Métrique :** erreur de prédiction sur l'horizon opérationnel (heure à jour).

- **Estimer** · *Un ingénieur d'exploitation* veut connaître l'état complet du système (notamment le niveau du stockage thermique) à partir de mesures partielles pour piloter correctement les équipements. **Métrique :** écart entre l'état estimé et l'état réel sur les variables non directement mesurées.

- **Optimiser** · *Un opérateur* veut recevoir des consignes de contrôle optimales pour chaque équipement afin de minimiser les coûts et maximiser l'efficacité énergétique globale. **Métrique :** réduction de la consommation ou du coût par rapport à une stratégie de référence.

- **Détecter + Corriger** · *Un ingénieur d'exploitation* veut être alerté en temps réel des erreurs et défauts sur les équipements pour maintenir l'efficacité et la robustesse opérationnelles. **Métrique :** délai de détection, taux de faux positifs.

---

## Caractérisation du Jumeau Numérique

*Grille basée sur le <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">framework unifié de Gil et al. (2024)</a> - 21 caractéristiques.*

### MC1 - Système étudié

Infrastructure multi-énergie expérimentale CEA LITEN : micro-réseau électrique (PV, BESS, groupe électrogène, VE), réseau de chaleur HP/BP (solaire thermique, PAC, ORC, stockage), réseau de froid (GF absorption, PAC froid), vecteurs H₂ et gaz naturel (PEM, cogénération, chaudière GN), et réseau de distribution chaleur/froid vers 4 sous-stations. Système multi-vecteur, multi-équipement, multi-échelle.

### MC2 - Composants d'action physiques

Actionneurs sur les équipements du système expérimental : commandes des PAC (HT, TFP), régulation des convertisseurs PV et BESS, gestion de la charge des VE, pilotage des vannes et pompes du réseau thermique, contrôle du groupe électrogène, gestion de l'électrolyse H₂. Le JN calcule les consignes optimales (setpoints) transmises à l'architecture de contrôle.

### MC3 - Composants de captation physiques

- Capteurs de puissance et énergie électrique (flux PV, BESS, réseau, VE)
- Capteurs thermiques (températures, débits, niveaux de stockage HP/BP)
- Capteurs d'état des équipements (SOC batteries, état PAC, ORC)
- Capteurs environnementaux (irradiance solaire, température extérieure)
- Compteurs de production (PV, solaire thermique) et de consommation (sous-stations)
- Mesures partielles : le stockage thermique (St. HP et BP) n'est que partiellement instrumenté

### MC4 - Interaction physique → virtuel

Acquisition temps réel des mesures capteurs depuis l'infrastructure expérimentale. Synchronisation des modèles avec les données réelles pour maintenir une représentation cohérente de l'état du système (WP4.2). Calibration et adaptation continues des modèles sur les données d'exploitation (WP4.3). Défi spécifique : estimation de l'état du stockage thermique à partir de mesures partielles.

### MC5 - Interaction virtuel → physique

Boucle de contrôle active : le JN calcule des consignes de contrôle optimales (setpoints) pour chaque équipement et les transmet à l'architecture de contrôle multi-niveau. Détection et correction d'erreurs et de défauts en temps réel pour maintenir l'efficacité et la robustesse opérationnelles.

### MC6 - Services du JN

- Prédiction de la production solaire (PV et thermique) et de la demande (chaleur, froid, électricité)
- Estimation de l'état du système à partir de mesures partielles (observateur d'état, filtres)
- Calcul des consignes de contrôle optimal pour chaque équipement (dispatch multi-vecteur)
- Détection, isolation et correction d'erreurs et de défauts sur les équipements
- Optimisation du dispatch multi-énergie et scénarios de participation au marché (niveau système)

### MC7 - Échelle temporelle

Architecture multi-temporelle : temps réel (contrôle, détection de défauts, milliseconde à seconde), court terme (prédiction de production et demande, minutes à heures), moyen terme (dispatch journalier et hebdomadaire), long terme (stratégies de participation au marché). Chaque niveau de JN opère sur son propre horizon temporel.

### MC8 - Multiplicités

Architecture multi-niveau explicite à trois couches imbriquées :
- **Niveau équipement** : JN individuel par composant (PAC, batteries, solaire thermique…) pour le contrôle local, l'estimation d'état, la détection de défauts et la maintenance prédictive
- **Niveau système/réseau** : JN du micro-réseau électrique ou du réseau thermique pour la prédiction, le contrôle optimal et le diagnostic
- **Niveau multi-énergie** : JN global couvrant l'ensemble du système (dispatch optimal, participation au marché)

La composition entre niveaux (comment les JN d'équipements alimentent les JN systèmes) est une question scientifique ouverte (WP2.2).

### MC9 - Phases du cycle de vie

Phase d'exploitation de l'infrastructure expérimentale. Maintenance prédictive des équipements (niveau JN d'équipement). Optimisation de l'exploitation (niveau JN système). Exploration de scénarios prospectifs pour les futurs réseaux d'énergie (niveau JN multi-énergie).

### MC10 - Modèles et données

- **Modèles physiques** des composants (thermodynamique des PAC, ORC, stockage thermique ; électrique pour PV, BESS, réseau) et des réseaux (bilan de puissance électrique, bilan enthalpique thermique)
- **Modèles ML** pour la prédiction de la demande, la production solaire et l'état des composants difficiles à modéliser analytiquement
- **Modèles d'optimisation** pour le dispatch multi-vecteur et le calcul des consignes (programmation mathématique, contrôle prédictif par modèle - MPC)
- **Modèles d'estimation d'état** pour les variables non directement mesurées (filtres, observateurs)
- **Données** : mesures temps réel, historique d'exploitation, prévisions météo (irradiance, température)

### MC11 - Outils et facilitateurs

Outils de modélisation physique (thermodynamique, électrique), bibliothèques ML (prédiction, estimation d'état), solveurs d'optimisation (MPC, programmation stochastique). Plateforme expérimentale CEA LITEN (INES - Institut National de l'Énergie Solaire). PEPR Future Energy Networks (cadre scientifique et financement).

### MC12 - Constellation du JN

Trois niveaux imbriqués : JN d'équipements (modèles locaux, boucles de contrôle temps réel) → JN de systèmes/réseaux (agrégation, optimisation réseau, diagnostic) → JN multi-énergie (dispatch global, marché). Chaque niveau reçoit des mesures du système physique et émet des consignes vers le niveau inférieur ou vers les actionneurs. Composition inter-niveaux à formaliser.

### MC13 - Processus de jumelage et évolution

Calibration initiale des modèles physiques sur les données d'essai des équipements, puis adaptation continue sur les données d'exploitation (WP4.3). Architecture de contrôle multi-niveau en cours de développement. Extension progressive depuis le niveau équipement vers les niveaux système et multi-énergie.

### MC14 - Fidélité et validité

Couplage modèles physiques (fidélité élevée pour les composants bien caractérisés) et modèles ML (pour la demande et les composants difficiles à modéliser). Synchronisation continue avec les données réelles (WP4.2) pour maintenir la fidélité. Validation sur le système expérimental (données capteurs vs. sorties modèles).

### MC15 - Connexion technique

Interfaces pour l'hybridation des systèmes physiques et numériques (WP1.1). Acquisition temps réel depuis les capteurs de l'infrastructure LITEN. Transmission des consignes vers l'architecture de contrôle. Optimisation des réseaux pour le couplage numérique (WP4.4).

### MC16 - Hébergement / déploiement

Infrastructure expérimentale CEA LITEN / INES. Boucle de contrôle temps réel déployée sur site (contraintes de latence). Niveaux d'optimisation système et multi-énergie potentiellement en cloud ou edge. Architecture distribuée à préciser selon les niveaux.

### MC17 - Insights et prise de décision

- Consignes de contrôle optimal pour chaque équipement (temps réel)
- Prédictions de production solaire et de demande énergétique (court terme)
- Estimations de l'état du système (notamment stockage thermique)
- Alertes et diagnostics de défauts
- Scénarios d'optimisation du dispatch multi-énergie et de participation au marché

### MC18 - Intégration horizontale

Composition inter-JN au sein du système multi-énergie (WP2.2). Potentiel de connexion à des réseaux externes (réseau électrique de distribution, réseau gaz naturel, marchés de l'énergie). Optimisation des réseaux pour le couplage numérique inter-systèmes (WP4.4). Vocation de démonstrateur pour les futurs réseaux d'énergie multi-vecteur.

### MC19 - Propriété et confidentialité des données

Données opérationnelles de l'infrastructure expérimentale CEA LITEN. Dans une perspective d'extension à des réseaux réels, les données de consommation et d'état du réseau seraient potentiellement sensibles (vie privée, sécurité énergétique).

### MC20 - Standardisation

Architecture de référence pour la gestion de la variabilité, de la fidélité et des incertitudes dans les JN multi-énergie (WP2.1). Standards de communication pour les systèmes multi-énergie (IEC 61850, CIM, OCPP pour les VE) à intégrer. Modularisation pour la composabilité (WP2.2).

### MC21 - Sécurité et sûreté

Boucle de contrôle active sur un système physique expérimental avec des contraintes de sécurité (pression 20 bar, températures élevées 200°C, haute tension). Fiabilité et robustesse des consignes critiques. Détection et correction d'erreurs pour la sûreté opérationnelle. Mécanismes de fallback dans l'architecture de contrôle multi-niveau.

---

## Enjeux scientifiques et techniques

*Chaque enjeu est annoté par les questions de recherche (RQ_X) de la feuille de route EDT [[Combemale et al., 2025](https://inria.hal.science/hal-05223776)] et par les Work Packages du PEPR Future Energy Networks.*

### Collecte intelligente de données pour les systèmes multi-énergie (WP4.1)

Définir des stratégies optimales d'instrumentation et d'acquisition pour un système multi-vecteur hétérogène, en tenant compte des contraintes de coût, de latence et de couverture. Défi particulier : les variables d'état les plus critiques (stockage thermique) sont souvent les moins accessibles à la mesure directe.

RQ associées : RQ_D3 (collecte de données hétérogènes), RQ_D1 (déploiement capteurs)

### Synchronisation et calibration des modèles sur données réelles (WP4.2, WP4.3)

Maintenir en continu la cohérence entre les modèles numériques et le système physique réel, en adaptant les paramètres des modèles au fil du vieillissement des équipements et de l'évolution des conditions d'exploitation. Défi : calibration en ligne sans interruption du service.

RQ associées : RQ_D8 (entraînement des modèles IA), RQ_D2 (incertitude des données), RQ_D6 (évolution des modèles)

### Hybridation modèles physiques et ML (WP1.1, WP3.1)

Construire des modèles hybrides couplant la physique (thermodynamique, électrique) et le machine learning (prédiction de la demande, comportement non-linéaire des composants) pour concilier interprétabilité physique et capacité d'adaptation aux données. Analyser la composition de tels modèles hybrides.

RQ associées : RQ_I3 (hybridation de modèles), RQ_I4 (opérateurs d'hybridation), RQ_I5 (effet de l'hybridation sur la validité)

### Architecture de référence multi-niveau et gestion de la variabilité/fidélité/incertitude (WP2.1)

Formaliser une architecture de référence permettant de gérer la variabilité des modèles (fidélité variable selon le niveau), les incertitudes de mesure et de prédiction, et la coexistence de niveaux de représentation (équipement, système, multi-énergie) dans un cadre cohérent.

RQ associées : RQ_I5 (enveloppe de validité), RQ_E1 (standardisation des interfaces), RQ_T3 (composition d'incertitudes / fidélité inter-DTs)

### Modularisation et composabilité intra et inter-JN (WP2.2)

Concevoir les JN d'équipements et de systèmes comme des modules composables, permettant leur agrégation cohérente au niveau multi-énergie et leur réutilisation dans d'autres contextes (extension à d'autres sites, autres configurations multi-énergie).

RQ associées : RQ_E2 (modularisation), RQ_E3 (orchestration dynamique au déploiement), RQ_D10 (agrégation de données inter-DTs)

### Optimisation multi-vecteur et couplage numérique des réseaux (WP4.4)

Calculer en temps (quasi-)réel des consignes de contrôle optimal pour un système couplant simultanément plusieurs vecteurs énergétiques (électricité, chaleur HP/BP, froid, H₂, gaz naturel), avec des contraintes physiques, économiques et de marché hétérogènes.

RQ associées : RQ_C3 (co-optimisation réseau / DT), RQ_C4 (échange bidirectionnel cohérent dans le temps), RQ_D11 (interopérabilité sémantique)

---

## Matériel

## Références

- [Poster UC04 - Système multi-énergie expérimental](/media/use-cases/uc04-futur-energy-network-cea.pdf) - Use Case Workshop, Lyon, 6-7 janvier 2026
- PEPR Future Energy Networks (Réseaux du Futur) - cadre scientifique et financement
- Combemale B., Vicat-Blanc P., Blouin A., Bril El Haouzi H., Bruel J.-M. et al. [Engineering Digital Twins: A Research Roadmap](https://inria.hal.science/hal-05223776). EDTconf 2025 - 2nd International Conference on Engineering Digital Twins, Oct 2025, Grand Rapids, Michigan, United States. pp.1-7. ⟨hal-05223776⟩ - feuille de route scientifique du programme EDT (codes RQ_X).

## Thèses en cours
