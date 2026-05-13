---
id: uc00
title: Capteur de température
provider: Inria
contacts:
  - name: Guy de Spiegeleer
    org: Inria
    email: guy.de-spiegeleer@inria.fr
summary: >-
  Jumeau numérique d'un capteur de température USB : acquisition temps réel,
  alerte de dépassement de seuil, et simulateur pour tester le comportement sans
  matériel.
# usersCount : nombre d'utilisateurs effectifs du JN (métrique de diffusion)
usersCount: 1
lang: fr
photo: /media/use-cases/Temperature-Sensors-DirecTemp-USB-Thermometers-DTU6005-001.jpg
# domain : industrial-engineering | energy | geospatial | maritime | telecommunications | environment | health | robotics | agriculture | other
domain: industrial-engineering
# maturity : concept | poc | prototype | operational
maturity: prototype
# originType : natural | anthropic | engineered | infrastructure | process
originType: engineered
# version : identifiant de version du UC (ex r0.1, r1.0, ...). La dernière est affichée par défaut sur la liste.
version: r0.1
license: CC-BY-4.0
# license : identifiant SPDX
tags:
  - capteur-usb
  - monitoring-temperature
  - alerte-seuil
  - jumeau-numerique
  - simulation
# challenges : enjeux scientifiques/techniques. Chaque enjeu peut pointer vers un bac à sable
# (notebook, repo, démo en ligne) permettant de prendre en main le problème.
challenges:
  - title: Détection de pics non supervisée
    summary: >-
      Identifier en temps réel un franchissement de seuil sans labels
      d'entraînement, robuste au bruit du capteur USB.
    sandboxUrl: https://colab.research.google.com/drive/example-uc00-detection
    sandboxLabel: Notebook Colab
  - title: Rejeu accéléré de scénarios
    summary: >-
      Rejouer 1 h de profil de température en moins d'1 s tout en préservant
      la cadence relative des évènements.
    sandboxUrl: https://github.com/edt/uc00-replay
    sandboxLabel: Repo GitHub
  - title: Comparaison d'algorithmes de détection
    summary: >-
      Banc d'essai reproductible pour comparer ≥ 3 algorithmes de détection
      sur ≥ 50 scénarios de référence (sensibilité / faux positifs).
publishedDate: 2026-04-15T00:00:00.000Z
lastUpdated: 2026-04-15T00:00:00.000Z

---
## Résumé
<!-- Décrivez en 3-5 phrases le cas d'usage : quel système physique, quel jumeau numérique, quels objectifs. -->

Il est composé d'un système de supervision de température basé sur un capteur USB connecté à un PC. 

Le jumeau numérique complète le dispositif physique en permettant de simuler le capteur, de rejouer des scénarios, de tester différentes fonctionnalités somme les règles d'alerte (notamment le dépassement de seuil) avec un matériel réel simple.

Le prototype mis en oeuvre pour: 
- service de test pour l amise en place du portfolio,
- être distribué aux chercheurs intéressés de EDT pour accompagner leur travaux, 

---

## Enjeux scientifiques/techniques
### Installateur robuste - AT3
Disposer d'un installateur du jumeau numérique mettant à disposition du chercheur l'ensemble des éléments permettant de faire fonctionner, et de développer les fonctionnalités du jumeau numérique.

---

## Description fonctionnelle

### Utilisateurs
<!-- Liste des rôles utilisateurs concrets qui interagissent avec le JN (développeur, opérateur, chercheur, mainteneur, décideur, etc.). -->

- **Un développeur** — implémente et teste les règles d'alerte de température
- **Un chercheur** — utilise le jumeau comme banc d'essai pour méthodes d'agrégation et de détection
- **Un opérateur de supervision** — surveille la température en exploitation et acquitte les alertes

### Besoins fonctionnels
<!-- Typologies disponibles : Décrire | Diagnostiquer | Prédire | Optimiser | Contrôler | Sécuriser | Interagir. Combinaisons possibles avec '+' (ex : Décrire + Sécuriser).

Format : <Typologie> · <Utilisateur> veut <action> pour <objectif>, dans <contexte>. Métrique : <indicateur quantifié>. -->

- **Prédire** · *Un développeur* **veut rejouer des profils de température (rampe, pic, oscillation) via le simulateur** pour valider une règle d'alerte sans matériel physique, en phase de prototypage. **Métrique :** reproductibilité 100 %, scénario d'1 h rejoué en < 1 s.

- **Diagnostiquer** · *Un chercheur* **veut comparer plusieurs algorithmes de détection sur un même flux de mesures** pour identifier le meilleur compromis sensibilité / faux positifs, en phase de recherche méthodologique. **Métrique :** ≥ 3 algorithmes comparés sur ≥ 50 scénarios de référence.

- **Décrire + Sécuriser** · *Un opérateur de supervision* **veut visualiser la température courante et être alerté au franchissement de seuil** pour intervenir avant détérioration du procédé, dans une cellule de production en exploitation continue. **Métrique :** rafraîchissement ≤ 5 s, délai d'alerte < 1 s après franchissement.

---

## Caractérisation du Jumeau Numérique

*Grille basée sur le <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">framework unifié de Gil et al. (2024)</a> — 21 caractéristiques.*

### MC1 — Système étudié
<!-- Décrivez le système physique étudié (le jumeau physique), son environnement et les agents/opérateurs présents. -->

Dispositif de mesure de température composé d'un capteur branché en USB sur un PC, d'une interface logicielle affichant la mesure toutes les 5 secondes, et d'un système d'alerte déclenché lorsque la température dépasse un seuil maximal configuré.

### MC2 — Composants d'action physiques
<!-- Listez les actionneurs et mécanismes par lesquels le jumeau numérique peut agir sur le système physique. -->

Pas d'actionneur physique dans la version actuelle — le système est purement observationnel. L'alerte est un signal applicatif (notification, log, écran).

### MC3 — Composants de captation physiques
<!-- Listez les capteurs et mécanismes par lesquels le système physique transmet des données au jumeau numérique. -->

- Capteur de température connecté en USB (type sonde PT100, DS18B20, ou thermocouple + convertisseur USB)
- PC hôte assurant l'alimentation et l'acquisition via le port USB

### MC4 — Interaction physique → virtuel
<!-- Décrivez les données transmises du système physique vers le jumeau numérique : protocoles, fréquences, types de données, standards et normes. -->

Acquisition périodique de la mesure de température toutes les 5 secondes via le driver USB du capteur. Transmission de la valeur brute à l'interface d'affichage et au module de surveillance de seuil.

### MC5 — Interaction virtuel → physique
<!-- Décrivez les données transmises du jumeau numérique vers le système physique : commandes, alertes, paramètres, standards et normes. -->

Pas de donnée transmise. 

### MC6 — Services du JN
<!-- Listez les services fournis par le jumeau numérique : simulation, optimisation, détection, visualisation, etc. -->

- **Supervision temps réel** : affichage de la mesure de température rafraîchie toutes les 5 secondes
- **Détection de dépassement de seuil** : alerte quand la température franchit le seuil maximal configuré
- **Simulation** : le jumeau permet de simuler le capteur (génération de mesures virtuelles) pour tester le comportement de l'interface et des alertes sans matériel
- **Rejeu de scénarios** : possibilité de forcer des profils de température (rampe, pic, oscillation) pour valider les règles d'alerte

### MC7 — Échelle temporelle
<!-- Précisez les échelles de temps : synchronisation temps réel, plus rapide, plus lent que le système physique. -->

Temps réel à pas fixe de 5 secondes. Le jumeau numérique fonctionne à la même cadence ou peut être accéléré pour rejouer rapidement des scénarios de test.

### MC8 — Multiplicités
<!-- Le JN est-il composé de sous-jumeaux ? Architecture centralisée ou décentralisée ? Multi-instance ? -->

Un seul jumeau pour un seul capteur dans la version prototype. Extension possible à N capteurs parallèles.

### MC9 — Phases du cycle de vie
<!-- Quelles phases du cycle de vie sont couvertes ? Conception, fabrication, exploitation, maintenance, démantèlement. -->

Prototype en phase de conception et de validation. Usage typique : développement et test de règles d'alerte avant déploiement sur matériel réel.

### MC10 — Modèles et données
<!-- Décrivez les modèles utilisés (physiques, données, hybrides) et les données d'entrée/sortie. -->

- Modèle de simulation du capteur : générateur de mesures (constante, rampe, bruit, pic)
- Flux de données : valeurs de température horodatées (timestamp, valeur en °C)

### MC11 — Outils et facilitateurs
<!-- Listez les outils, frameworks et plateformes utilisés pour réaliser les services du JN, lister les API. -->

Jumeau numérique programmé en python, interface graphique en html natif. 

### MC12 — Constellation du JN
<!-- Comment les modèles, données, outils et services sont-ils orchestrés ensemble ? Architecture logique du JN. -->

Architecture simple : driver USB → module d'acquisition → module de surveillance de seuil → interface utilisateur. Le simulateur se substitue au driver USB en mode test.

### MC13 — Processus de jumelage et évolution
<!-- Décrivez la méthodologie de développement du JN, ses jalons et ses évolutions prévues. -->

Approche incrémentale : d'abord le capteur physique + interface, puis ajout du simulateur pour les tests, puis raffinement des règles d'alerte.

### MC14 — Fidélité et validité
<!-- Quelle est la précision des modèles ? Comment sont-ils validés et calibrés ? Quelle est la précision des mesures ? Sont elles bruitées ? Partielles ? Polluées ? -->

Le simulateur reproduit la plage de mesure et la cadence du capteur physique. Validation par comparaison des valeurs simulées et des valeurs mesurées sur scénarios de référence.

### MC15 — Connexion technique
<!-- Quels protocoles réseau et architectures de communication sont utilisés entre le physique et le virtuel ? -->

Bus USB entre le capteur et le PC. Communication locale uniquement dans la version prototype.

### MC16 — Hébergement / déploiement
<!-- Où est hébergé le JN ? Local, cloud, plateforme dédiée ? Mode de déploiement. -->

Exécution locale sur le PC hôte. Pas de composant cloud ou distant dans la version actuelle.

### MC17 — Insights et prise de décision
<!-- Quels insights et aides à la décision le JN fournit-il aux opérateurs ? -->

- Affichage continu de la mesure
- Alerte visuelle (et/ou sonore) au dépassement de seuil

### MC18 — Intégration horizontale
<!-- Le JN échange-t-il des données avec d'autres systèmes (SCADA, autres JN, SI) ? -->

Pas d'échange de donnée avec d'autres systèmes, mais extention possible. 

### MC19 — Propriété et confidentialité des données
<!-- Y a-t-il des considérations de propriété ou confidentialité des données ? RGPD ? -->

Données de température locales, non sensibles. Pas de partage externe dans la version prototype.

### MC20 — Standardisation
<!-- Quelles normes sont suivies (FMI, AAS, ISO-23247, etc.) ? -->

Pas de standard retenu pour le moment. 

### MC21 — Sécurité et sûreté
<!-- Y a-t-il des considérations de cybersécurité ou de sûreté de fonctionnement ? -->

Pas de risque identifié.

---

## Matériel
<!-- Liste des datasets, models, repos : - [title](url) — venue. -->

## Références
<!-- Liste de publications, sites web. Format markdown standard : - [title](url) — venue. -->

- [Temperature Sensor (datasheet AliExpress)](https://fr.aliexpress.com/item/1005004139995534.html?spm=a2g0o.order_list.order_list_main.4.531a1802AyNwZz&gatewayAdapt=glo2fra)
