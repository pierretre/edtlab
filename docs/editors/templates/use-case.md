# Référence — Génération de fiches Use Case EDT

> Ce fichier vit hors de `src/content/use-cases` pour ne pas être traité comme une fiche par la collection Astro. Il sert de référence pour la génération de nouvelles fiches.

---

## 1. Nommage des fichiers

```
uc{NN}-{slug-descriptif}-{org-contact}-r{M}-{m}-{lang}.md
```

Exemples :
- `uc07-kopr-smart-grid-datathings-r1-0-fr.md`
- `uc21-ecoboattwin-vectura-r1-0-en.md`

- `{NN}` : numéro à deux chiffres, à confirmer avec le responsable du programme
- `r{M}-{m}` : version (r0-1 = brouillon initial, r1-0 = première version publiée)
- `{lang}` : `fr` ou `en`

---

## 2. Frontmatter — champs et valeurs valides

```yaml
---
id: ucNN                          # OBLIGATOIRE — ex: uc07 (doit correspondre au nom de fichier)
title: "Titre court du UC"        # OBLIGATOIRE — affiché dans la liste et les cartes
provider: "Org1 / Org2"          # Nom(s) de l'organisation fournissant le UC
contacts:
  - name: Prénom Nom
    org: Laboratoire / Entreprise
    email: prenom.nom@domaine.fr
    role: "Titre / Fonction"
summary: >-                       # OBLIGATOIRE — résumé en 2-4 phrases, affiché dans les cartes
  Texte du résumé...
lang: fr                          # OBLIGATOIRE — fr | en
photo: /media/uploads/xxx.png     # chemin depuis /public ; défaut: /media/use-cases/uc-default.svg
                                  # ⚠️ ne PAS laisser vide — une chaîne vide bypass le défaut Zod
domain: maritime                  # CHAÎNE LIBRE côté schéma (z.string()) — mais suivre cette
                                  # convention pour la cohérence : industrial-engineering | energy |
                                  # geospatial | maritime | telecommunications | environment |
                                  # health | robotics | agriculture | other
maturity: prototype               # concept | poc | prototype | operational
originType: engineered            # natural | anthropic | engineered | infrastructure | process
version: r0.1                     # identifiant de version
status: published                 # draft | published  (défaut: published)
tags:
  - tag-en-kebab-case
publishedDate: 2026-01-01T00:00:00.000Z   # OBLIGATOIRE — format ISO 8601
usersCount: 5                     # nombre entier UNIQUEMENT (pas de "30+") — optionnel
usagePhase: "operations"          # chaîne libre — optionnel
usageLevel: consortium            # reduced | consortium | public — optionnel
since: 2024-01-01                 # date — optionnel
schema: /media/uploads/uc07-schema.svg  # chaîne libre (chemin de schéma) — optionnel
objectives:                       # liste de chaînes — optionnel
  - "Objectif 1"
users:                             # liste — chaîne simple ou { name, role } — optionnel
  - name: "Rôle utilisateur"
    role: "Description du rôle"
approvedBy:                       # objet — optionnel, si le UC a été formellement validé
  name: "Prénom Nom"
  email: valideur@domaine.fr
  title: "Titre / Fonction"
  org: "Organisation"
  date: 2026-01-01
approvedDate: 2026-01-01          # date — optionnel
license: "CC-BY-4.0"              # chaîne libre — optionnel
pepr: "identifiant PEPR"          # chaîne libre — optionnel
lastUpdated: 2026-01-01           # date — optionnel, à mettre à jour à chaque révision de contenu
---
```

`previewToken` et `confirmToken` existent aussi dans le schéma mais sont des jetons système (liens de prévisualisation/confirmation) — ne pas les renseigner à la main dans une nouvelle fiche.

### Valeurs `maturity`

| Valeur | Définition |
|---|---|
| `concept` | Idée / étude de faisabilité, pas encore de prototype |
| `poc` | Preuve de concept sur données ou sous-système réduit |
| `prototype` | Prototype fonctionnel sur système réel mais en environnement lab |
| `operational` | Déployé en conditions réelles, utilisé en production |

### Valeurs `originType`

| Valeur | Définition |
|---|---|
| `natural` | Système naturel (écosystème, corps humain, terrain) |
| `anthropic` | Infrastructure bâtie (bâtiment, réseau, ville) |
| `engineered` | Système conçu et fabriqué (machine, véhicule, robot, équipement) |
| `infrastructure` | Infrastructure à grande échelle (réseau électrique, transport) |
| `process` | Procédé ou flux (chaîne de production, processus métier) |

---

## 3. Structure des sections (corps du fichier)

### 3.1 `## Résumé`

1–3 paragraphes décrivant :
- Le **système physique** (ce qui est jumelé)
- Le **jumeau numérique** et ses usages principaux
- Le **contexte** (projet, financement, partenaires si pertinent)

### 3.2 `## Description fonctionnelle`

#### `### Utilisateurs`

Liste des profils utilisateurs. Format :
```markdown
- **Un ingénieur de maintenance** — surveille X, déclenche Y.
- **Un opérateur de production** — ...
```

#### `### Besoins fonctionnels`

Un besoin par item. Format strict :
```markdown
- **Verbe(s)** · *Un profil utilisateur* **veut [action]** pour [objectif].
  **Métrique :** critère mesurable de succès.
```

Verbes d'action suggérés : Décrire, Surveiller, Diagnostiquer, Prédire, Contrôler, Optimiser, Évaluer, Analyser, Planifier.

### 3.3 `## Caractérisation du Jumeau Numérique`

Introduire avec :
```markdown
*Grille basée sur le <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">framework unifié de Gil et al. (2024)</a> — 21 caractéristiques.*
```

Puis 21 sous-sections `### MC{N} - {Titre}` (voir §4 ci-dessous).

### 3.4 `## Enjeux scientifiques et techniques`

Introduire avec :
```markdown
*Chaque enjeu est annoté par les questions de recherche (RQ_X) de la feuille de route EDT [[Combemale et al., 2025](https://inria.hal.science/hal-05223776)].*
```

Chaque enjeu = `### Titre de l'enjeu` + 1-3 paragraphes + ligne de RQ :
```markdown
RQ associées : RQ_XX (label court), RQ_YY (label court)
```

Utiliser **uniquement** les codes RQ de la taxonomie §5. Ne jamais inventer de code.

### 3.5 `## Matériel`

Liste de ressources concrètes : datasets, dépôts, démonstrations, posters.
```markdown
- [Titre](url-ou-chemin) — description courte
- [Poster UC07](/media/use-cases/uc07-poster.pdf)
```

### 3.6 `## Références`

Publications et liens académiques. Format :
```markdown
- Auteurs — *Titre de l'article* — Venue, Année. [DOI](url) ou [HAL](url)
- Combemale B. et al. [Engineering Digital Twins: A Research Roadmap](https://inria.hal.science/hal-05223776). EDTconf 2025. ⟨hal-05223776⟩
```

### 3.7 `## Thèses en cours`

```markdown
- [Titre de la thèse](/fr/travaux-de-recherche/slug) — Prénom Nom, Labo (PC{N})
```

Laisser vide (section présente mais sans contenu) si aucune thèse connue.

---

## 4. Guide MC1–MC21 (framework Gil et al., 2024)

| # | Titre | Ce qu'il faut décrire |
|---|---|---|
| MC1 | Système étudié | Nature et frontières du système physique ; sous-systèmes clés ; environnement opérationnel |
| MC2 | Composants d'action physiques | Actionneurs ; types de commandes ; si pas de commande directe, le dire explicitement |
| MC3 | Composants de captation physiques | Capteurs ; grandeurs mesurées ; fréquences d'acquisition ; protocoles |
| MC4 | Interaction physique → virtuel | Comment les données physiques alimentent le JN ; fréquence ; format ; transformation |
| MC5 | Interaction virtuel → physique | Comment le JN agit sur le physique ; si pas d'actionnement, l'indiquer et décrire la boucle de décision humaine |
| MC6 | Services du JN | Liste des services fonctionnels offerts par le JN (monitoring, simulation, prédiction, planification…) |
| MC7 | Échelle temporelle | Temps réel / quasi-réel / batch ; horizon temporel des analyses ; cadence de mise à jour |
| MC8 | Multiplicités | Un JN pour N physiques ? N JNs pour un physique ? JNs composés ? |
| MC9 | Phases du cycle de vie | Phases couvertes : conception, fabrication, exploitation, maintenance, fin de vie |
| MC10 | Modèles et données | Types de modèles (physiques, ML, hybrides, SysML…) et données (séries temporelles, relationnelles, AAS…) |
| MC11 | Outils et facilitateurs | Stack technique : langages, frameworks, bases de données, middleware, standards |
| MC12 | Constellation du JN | Architecture interne : composants, flux de données, pipeline — peut inclure un schéma ASCII ou un diagramme |
| MC13 | Processus de jumelage et évolution | Comment le JN est construit, mis à jour, versionné, maintenu en cohérence avec le physique |
| MC14 | Fidélité et validité | Comment la précision des modèles est évaluée ; jeux de données de validation ; métriques d'erreur |
| MC15 | Connexion technique | Protocoles de communication (MQTT, REST, OPC-UA, WebSocket…) ; standards d'échange |
| MC16 | Hébergement / déploiement | Cloud, edge, on-premise, SaaS, embarqué — avec niveau de détail disponible |
| MC17 | Insights et prise de décision | Outputs du JN : alertes, tableaux de bord, recommandations, rapports — à quel niveau de détail et pour qui |
| MC18 | Intégration horizontale | Connexions avec d'autres systèmes, JNs, APIs externes, standards d'interopérabilité (AAS, IFC…) |
| MC19 | Propriété et confidentialité des données | Gouvernance des données ; données sensibles ; propriété intellectuelle ; RGPD si applicable |
| MC20 | Standardisation | Standards sectoriels utilisés (ISO, IEC, OMG, OASIS…) et conformité visée |
| MC21 | Sécurité et sûreté | Sécurité logicielle (auth, chiffrement) ; sûreté fonctionnelle si boucle de commande (EN ISO 10218, IEC 61511…) |

---

## 5. Taxonomie RQ — feuille de route EDT

**Source** : Combemale B. et al. — *Engineering Digital Twins: A Research Roadmap* — EDTconf 2025. [hal-05223776](https://inria.hal.science/hal-05223776v1)
**PDF local** : `public/media/use-cases/Engineering_Digital_Twins__A_Research_Roadmap-authorversion.pdf`

> ⚠️ La catégorie **RQ_F n'existe pas**. Les codes `RQ_F1`–`RQ_F4` présents dans certaines fiches (uc18, uc21) sont erronés — la bonne catégorie est **RQ_T** (Trustworthiness) : F1→T1, F2→T2, F3→T3, F4→T4.

### D — Données

| Code | Label court |
|---|---|
| RQ_D1 | déploiement capteurs |
| RQ_D2 | données non mesurables / partiellement observables |
| RQ_D3 | collecte de données hétérogènes |
| RQ_D4 | métadonnées pour synergie inter-modèles |
| RQ_D5 | manipulation homogène des métadonnées |
| RQ_D6 | évolution des modèles de simulation |
| RQ_D7 | interface CRUD modèles de simulation |
| RQ_D8 | entraînement des modèles IA |
| RQ_D9 | interface CRUD modèles IA |
| RQ_D10 | agrégation de données inter-DTs |
| RQ_D11 | interopérabilité sémantique inter-DTs |

### I — Intelligence (gestion des modèles)

| Code | Label court |
|---|---|
| RQ_I1 | conditions d'utilisation d'un modèle déductif (enveloppe de validité) |
| RQ_I2 | conditions d'utilisation d'un modèle inductif (FATES+) |
| RQ_I3 | patterns d'hybridation déductif × inductif |
| RQ_I4 | opérateurs de composition pour hybridation |
| RQ_I5 | effet de l'hybridation sur la validité / FATES+ |

### U — Interface et expérience utilisateur

| Code | Label court |
|---|---|
| RQ_U1 | création de représentations visuelles DT |
| RQ_U2 | perception et compréhension du système original |
| RQ_U3 | périphériques d'entrée et interactions DT |
| RQ_U4 | navigation dans l'espace et le temps |
| RQ_U5 | utilisabilité des DTs |
| RQ_U6 | collaboration dans un DT |
| RQ_U7 | agrégation d'UI inter-DTs |

### C — Connectivité

| Code | Label court |
|---|---|
| RQ_C1 | orchestration dynamique Cloud/Edge |
| RQ_C2 | reconfiguration et résilience des liens physique↔DT |
| RQ_C3 | co-optimisation réseau / DT |
| RQ_C4 | échange bidirectionnel cohérent dans le temps |
| RQ_C5 | coordination de l'accès aux jumeaux physiques (fédération) |
| RQ_C6 | connectivité frugale et adaptative |

### T — Trustworthiness (qualité, fidélité, conformité)

| Code | Label court |
|---|---|
| RQ_T1 | propagation de la qualité des données vers les modèles |
| RQ_T2 | analyse automatique de la qualité des modèles |
| RQ_T3 | composition d'incertitudes / fidélité inter-DTs |
| RQ_T4 | quantification de la précision et fidélité |
| RQ_T5 | propriétés de qualité par cas d'usage |
| RQ_T6 | surveillance continue de la qualité |
| RQ_T7 | conformité réglementaire |

### E — Écosystème / Intégration

| Code | Label court |
|---|---|
| RQ_E1 | interface métadonnées modèles et services |
| RQ_E2 | modularisation des DTs |
| RQ_E3 | orchestration dynamique au déploiement |
| RQ_E4 | interopérabilité sémantique multi-points de vue |
| RQ_E5 | sécurité des données et traçabilité |
| RQ_E6 | standards et protocoles d'interopérabilité |

### P — Processus / Cycle de vie d'ingénierie

| Code | Label court |
|---|---|
| RQ_P1 | points de vue et cadre architectural |
| RQ_P2 | outils de collaboration équipe DT |
| RQ_P3 | stratégies de communication parties prenantes |
| RQ_P5 | gestion modèles/données par secteur |
| RQ_P6 | passage à l'échelle |
| RQ_P8 | déploiement et versionnement des modèles |
| RQ_P9 | DevSecOps pour les DTs |
| RQ_P10 | conformité réglementaire (processus) |
