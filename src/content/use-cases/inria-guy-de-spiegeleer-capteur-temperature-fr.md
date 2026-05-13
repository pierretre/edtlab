---
id: inria-gdespieg-capteur-temperature
title: Inria — Guy de Spiegeleer — Capteur de température
summary: >-
  Jumeau numérique d'un capteur de température USB : acquisition temps réel,
  alerte de dépassement de seuil, et simulateur pour tester le comportement sans
  matériel.
domain: industrial-engineering
maturity: prototype
lang: fr
photo: /media/use-cases/inria-guy-de-spiegeleer-capteur-temperature.png
tags:
  - capteur-usb
  - monitoring-temperature
  - alerte-seuil
  - jumeau-numerique
  - simulation
contacts:
  - name: Guy de Spiegeleer
    org: Inria
    email: guy.de-spiegeleer@inria.fr
    role: UC owner
pepr: ''
references:
  - title: Temperature Sensor
    url: >-
      https://fr.aliexpress.com/item/1005004139995534.html?spm=a2g0o.order_list.order_list_main.4.531a1802AyNwZz&gatewayAdapt=glo2fra
resources: []
license: CC-BY-4.0
publishedDate: 2026-04-15T00:00:00.000Z
lastUpdated: 2026-04-15T00:00:00.000Z
version: '0.1'
status: published
previewToken: inria-gdespieg-temp-2026
provider: Inria
originType: engineered
users:
  - Développeurs et chercheurs testant des règles d'alerte
  - Opérateurs supervisant des capteurs physiques
objectives:
  - Superviser la température en temps réel via un capteur USB
  - Détecter et alerter lors du dépassement d'un seuil configurable
  - Simuler le capteur pour tester le comportement sans matériel réel
usagePhase: prototype-et-test
since: 2026-04-15T00:00:00.000Z
---

Système de supervision de température basé sur un capteur USB connecté à un PC. Le jumeau numérique complète le dispositif physique en permettant de simuler le capteur, de rejouer des scénarios et de tester les règles d'alerte (notamment le dépassement de seuil) sans matériel réel.

---

## Caractérisation du Jumeau Numérique

*Grille basée sur le <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">framework unifié de Gil et al. (2024)</a> — 21 caractéristiques.*

### MC1 — Système étudié

Dispositif de mesure de température composé d'un capteur branché en USB sur un PC, d'une interface logicielle affichant la mesure toutes les 5 secondes, et d'un système d'alerte déclenché lorsque la température dépasse un seuil maximal configuré.

### MC2 — Composants d'action physiques

Pas d'actionneur physique dans la version actuelle — le système est purement observationnel. L'alerte est un signal applicatif (notification, log, écran).

### MC3 — Composants de captation physiques

- Capteur de température connecté en USB (type sonde PT100, DS18B20, ou thermocouple + convertisseur USB)
- PC hôte assurant l'alimentation et l'acquisition via le port USB

### MC4 — Interaction physique → virtuel

Acquisition périodique de la mesure de température toutes les 5 secondes via le driver USB du capteur. Transmission de la valeur brute à l'interface d'affichage et au module de surveillance de seuil.

### MC5 — Interaction virtuel → physique

*A compléter — pas d'action retour physique dans la version prototype. Piste future : commander un actionneur (ventilation, chauffage) en fonction de la mesure.*

### MC6 — Services du JN

- **Supervision temps réel** : affichage de la mesure de température rafraîchie toutes les 5 secondes
- **Détection de dépassement de seuil** : alerte quand la température franchit le seuil maximal configuré
- **Simulation** : le jumeau permet de simuler le capteur (génération de mesures virtuelles) pour tester le comportement de l'interface et des alertes sans matériel
- **Rejeu de scénarios** : possibilité de forcer des profils de température (rampe, pic, oscillation) pour valider les règles d'alerte

### MC7 — Échelle temporelle

Temps réel à pas fixe de 5 secondes. Le jumeau numérique fonctionne à la même cadence ou peut être accéléré pour rejouer rapidement des scénarios de test.

### MC8 — Multiplicités

Un seul jumeau pour un seul capteur dans la version prototype. Extension possible à N capteurs parallèles.

### MC9 — Phases du cycle de vie

Prototype en phase de conception et de validation. Usage typique : développement et test de règles d'alerte avant déploiement sur matériel réel.

### MC10 — Modèles et données

- Modèle de simulation du capteur : générateur de mesures (constante, rampe, bruit, pic)
- Flux de données : valeurs de température horodatées (timestamp, valeur en °C)
- *A compléter — persistance éventuelle en base ou fichier CSV*

### MC11 — Outils et facilitateurs

*A compléter — langage et framework (Python, Node.js, Rust ?), librairie d'accès USB (pyserial, hid), framework d'UI (Tkinter, Electron, web).*

### MC12 — Constellation du JN

Architecture simple : driver USB → module d'acquisition → module de surveillance de seuil → interface utilisateur. Le simulateur se substitue au driver USB en mode test.

### MC13 — Processus de jumelage et évolution

Approche incrémentale : d'abord le capteur physique + interface, puis ajout du simulateur pour les tests, puis raffinement des règles d'alerte.

### MC14 — Fidélité et validité

Le simulateur reproduit la plage de mesure et la cadence du capteur physique. Validation par comparaison des valeurs simulées et des valeurs mesurées sur scénarios de référence.

### MC15 — Connexion technique

Bus USB entre le capteur et le PC. Communication locale uniquement dans la version prototype.

### MC16 — Hébergement / déploiement

Exécution locale sur le PC hôte. Pas de composant cloud ou distant dans la version actuelle.

### MC17 — Insights et prise de décision

- Affichage continu de la mesure
- Alerte visuelle (et/ou sonore) au dépassement de seuil
- *A compléter — journalisation des alertes, export des historiques*

### MC18 — Intégration horizontale

*A compléter — intégration possible avec d'autres systèmes de supervision (MQTT, SCADA, webhook) en évolution future.*

### MC19 — Propriété et confidentialité des données

Données de température locales, non sensibles. Pas de partage externe dans la version prototype.

### MC20 — Standardisation

*A compléter — protocoles capteur (USB HID, série), format des données (JSON, CSV).*

### MC21 — Sécurité et sûreté

*A compléter — considérations minimales (accès physique au PC hôte). Pas de criticité de sûreté dans la version prototype.*

---

## Description fonctionnelle

### Utilisateurs

- **Développeur** — implémente et teste les règles d'alerte de température
- **Chercheur EDT** — utilise le jumeau comme banc d'essai pour méthodes d'agrégation et de détection
- **Opérateur de supervision** — surveille la température en exploitation et acquitte les alertes

### Besoins fonctionnels

*Format : <Utilisateur> veut <action> pour <objectif>, dans <contexte>. **Métrique :** <indicateur quantifié>.*

- *Développeur* **veut rejouer des profils de température (rampe, pic, oscillation) via le simulateur** pour valider une règle d'alerte sans matériel physique, en phase de prototypage. **Métrique :** reproductibilité 100 %, scénario d'1 h rejoué en < 1 s.

- *Chercheur EDT* **veut comparer plusieurs algorithmes de détection sur un même flux de mesures** pour identifier le meilleur compromis sensibilité / faux positifs, en phase de recherche méthodologique. **Métrique :** ≥ 3 algorithmes comparés sur ≥ 50 scénarios de référence.

- *Opérateur de supervision* **veut visualiser la température courante et être alerté au franchissement de seuil** pour intervenir avant détérioration du procédé, dans une cellule de production en exploitation continue. **Métrique :** rafraîchissement ≤ 5 s, délai d'alerte < 1 s après franchissement.

---

## Données

*A compléter — format des mesures (timestamp, valeur, unité), persistance éventuelle, export.*
