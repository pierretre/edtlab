# Spec — Use Cases Portfolio edtlab

*Version 0.1 — 2026-04-15 — rédigé par Hannah (orchestratrice edtlab)*

---

## 1. Contexte & vision

Le site **edtlab.fr** est la vitrine publique du projet EDT (Engineering Digital Twins). L'onglet **Use Cases Portfolio** présente les cas d'usage jumeaux numériques soumis par les partenaires du consortium. Il sert trois finalités :

- **Vitrine scientifique** — montrer la richesse et la diversité des cas d'usage EDT
- **Outil de dissémination** — permettre à des partenaires extérieurs de découvrir les UC et de contacter les responsables
- **Instrument de gouvernance** — assurer que chaque UC publié a été relu et autorisé par son responsable

Le portfolio distingue deux univers :
- **Public** — uniquement les UC validés (`status: published`), visibles de tout visiteur
- **Backoffice** — drafts non publiés, accessibles par lien + token, où se déroulent la rédaction, la relecture fournisseur, et l'approbation

---

## 2. Parties prenantes

| # | Partie prenante | Objectif | Pain points actuels |
|---|-----------------|----------|---------------------|
| P1 | **Visiteur public** (chercheur, industriel, décideur) | Découvrir des cas d'usage jumeaux numériques dans son domaine, identifier un interlocuteur | Difficulté à filtrer par domaine/maturité ; pas de recommandation |
| P2 | **Fournisseur UC** (UC owner, ex: Cetim, Inria) | Soumettre son cas d'usage, compléter les informations demandées, valider la mise en ligne | Formulaires pas intuitifs, pas de feedback sur ce qu'il reste à compléter |
| P3 | **Responsable EDT** (Guy) | Lancer la rédaction, suivre l'avancement, publier les UC approuvés, maintenir le portfolio | Pas de dashboard consolidé, statut des drafts pas visible |
| P4 | **Hannah** (orchestratrice IA) | Préparer les drafts à partir de sources hétérogènes, planifier les relances | Pas d'API pour créer un UC, tout en écriture de fichier |
| P5 | **Communication EDT** | Promouvoir les UC publiés sur les canaux EDT (newsletter, réseaux) | Pas d'export multi-format, pas de tracking de vues |

---

## 3. Cas d'usage

*Format : user story étendue + scénario nominal + critères d'acceptation. Chaque UC porte un code `UCP-NN`.*

### UCP-01 — Consulter la liste des UC publiés

> **En tant que** visiteur public  
> **Je veux** parcourir la liste de tous les UC publiés  
> **Dans le contexte** d'une première visite sur edtlab.fr  
> **Pour** identifier rapidement les cas d'usage qui m'intéressent  
> **Mesuré par** temps moyen pour trouver un UC pertinent < 30 s

**Scénario nominal**
1. Le visiteur arrive sur `/use-cases/`
2. Il voit une liste/grille des UC publiés avec : photo, titre, résumé, contacts, domaine, maturité
3. Les drafts sont invisibles (filtre `status: published`)
4. Il clique sur un UC pour accéder à la page détaillée

**Critères d'acceptation**
- Seuls les UC avec `status: published` apparaissent
- Le rendu est identique en version FR et EN
- Temps de chargement < 2 s

**Statut d'implémentation** : ✅ Implémenté

---

### UCP-02 — Consulter un UC en détail

> **En tant que** visiteur public  
> **Je veux** lire le contenu complet d'un UC  
> **Dans le contexte** d'une recherche de cas d'usage similaire au mien  
> **Pour** comprendre le système étudié, les modèles, et contacter le responsable  
> **Mesuré par** taux de clic vers les contacts / ressources externes

**Scénario nominal**
1. Le visiteur clique sur un UC depuis la liste
2. Il accède à la page détaillée (slug-based URL)
3. Il lit l'intro, la caractérisation du jumeau numérique (MC1-MC21), les données, les références
4. Il peut cliquer sur les contacts (email), les références (URL/PDF), les ressources

**Critères d'acceptation**
- Les 21 caractéristiques MC sont toutes rendues
- Les contacts sont cliquables (mailto)
- Les références et ressources externes ouvrent dans un nouvel onglet

**Statut d'implémentation** : ✅ Implémenté (UseCaseLayout.astro)

---

### UCP-03 — Rechercher un UC par mot-clé

> **En tant que** visiteur public (P1)  
> **Je veux** rechercher un UC par mot-clé  
> **Dans le contexte** d'une recherche ciblée (ex: "thermo-hydraulique")  
> **Pour** trouver rapidement les UC correspondant à mon besoin  
> **Mesuré par** taux de résultats pertinents > 80 %

**Scénario nominal**
1. Le visiteur saisit un mot-clé dans la barre de recherche
2. La recherche scanne le contenu complet (titre, résumé, body markdown)
3. Les résultats s'affichent filtrés

**Critères d'acceptation**
- La recherche couvre le body markdown entier (pas juste les tags)
- Temps de réponse < 500 ms

**Statut d'implémentation** : ✅ Implémenté (commit `504d5fc` — recherche plein texte)

---

### UCP-04 — Filtrer par domaine / maturité / tags

> **En tant que** visiteur public  
> **Je veux** filtrer les UC par domaine, maturité, ou tags  
> **Dans le contexte** d'une exploration thématique (ex: "tous les UC 'operational' en monitoring")  
> **Pour** réduire le bruit et cibler ma recherche  
> **Mesuré par** nombre de filtres utilisés / session

**Scénario nominal**
1. Le visiteur voit des boutons ou menus de filtrage en haut de `/use-cases/`
2. Il sélectionne un ou plusieurs filtres (domaine, maturité, tag)
3. La liste se met à jour en temps réel

**Critères d'acceptation**
- Filtres combinables (AND)
- L'URL reflète les filtres (shareable)

**Statut d'implémentation** : ❌ Manquant — à prévoir (UCP-04)

---

### UCP-05 — Créer un draft UC (backoffice)

> **En tant que** responsable EDT (P3) ou Hannah (P4)  
> **Je veux** créer un nouveau draft UC à partir d'informations collectées  
> **Dans le contexte** d'une nouvelle soumission d'un partenaire  
> **Pour** initier le workflow de rédaction et de validation  
> **Mesuré par** temps entre soumission partenaire et draft créé < 24 h

**Scénario nominal**
1. Le responsable dispose d'un template UC
2. Il crée un fichier `.md` dans `src/content/use-cases/` avec le frontmatter minimal (id, title, contacts, `status: draft`, `previewToken`)
3. Il remplit le contenu (intro + MC1-MC21 avec "A compléter" pour les sections non renseignées)
4. Il commit sur la branche de travail

**Critères d'acceptation**
- Le draft n'apparaît pas sur `/use-cases/`
- Le draft est accessible via `/preview/{slug}?token={previewToken}`
- Le schema Zod valide le frontmatter

**Statut d'implémentation** : ⚠️ Partiel — manuel (création de fichier à la main, pas d'UI). À automatiser : UCP-15

---

### UCP-06 — Prévisualiser un UC draft avec protection par token

> **En tant que** fournisseur UC (P2)  
> **Je veux** accéder à la preview de mon UC via un lien sécurisé  
> **Dans le contexte** d'une demande de relecture envoyée par email  
> **Pour** vérifier que le contenu est correct avant publication  
> **Mesuré par** taux d'ouverture du lien preview > 80 %

**Scénario nominal**
1. Le fournisseur reçoit un email avec le lien `/preview/{slug}?token={previewToken}`
2. Il clique sur le lien
3. La page preview s'affiche exactement comme la version publiée, avec un bandeau DRAFT en surimpression
4. Les UC en draft ne sont JAMAIS accessibles sans le bon token (404 sinon)

**Critères d'acceptation**
- Bandeau DRAFT visible en haut de page
- 404 si token absent ou invalide
- Layout identique à la page publiée
- Mode `noindex` pour éviter l'indexation par les moteurs de recherche

**Statut d'implémentation** : ✅ Implémenté (T003-S1, commits `5e0b304`, `5c3235a`)

---

### UCP-07 — Éditer les sections MC via formulaire

> **En tant que** fournisseur UC  
> **Je veux** compléter les sections "A compléter" de la caractérisation  
> **Dans le contexte** de la relecture de mon draft  
> **Pour** remplir les informations manquantes sans passer par un développeur  
> **Mesuré par** nombre de sections complétées / UC

**Scénario nominal**
1. Sur la page preview, le fournisseur double-clique sur une section MC
2. Un formulaire d'édition inline s'ouvre (textarea pré-rempli)
3. Il modifie le contenu et clique "Enregistrer"
4. L'API `/api/uc-section` met à jour le markdown source
5. La page se recharge avec le nouveau contenu

**Critères d'acceptation**
- Toutes les sections MC éditables
- Les modifications sont persistées dans le fichier `.md`
- Pas de perte de contenu en cas d'erreur

**Statut d'implémentation** : ✅ Implémenté (T003-S2, commits `6500c5b`, `dd7584d`, `7073a8c`)

---

### UCP-08 — Éditer les métadonnées (domaine, maturité, contacts, intro, image)

> **En tant que** fournisseur UC  
> **Je veux** modifier les métadonnées de l'UC (domaine, maturité, contacts, image)  
> **Dans le contexte** de l'affinage de ma fiche  
> **Pour** enrichir les informations structurées  
> **Mesuré par** complétude du frontmatter > 90 %

**Scénario nominal**
1. Le fournisseur double-clique sur un badge (domaine, maturité) → dropdown
2. Ou double-clique sur l'intro / les contacts / l'image → formulaire dédié
3. L'API `/api/uc-edit-meta` ou équivalent met à jour le frontmatter
4. La page se rafraîchit

**Critères d'acceptation**
- Domaine et maturité via dropdown (liste fermée)
- Contacts avec formulaire structuré (nom, org, email, rôle)
- Image via upload (drag&drop ou file picker)

**Statut d'implémentation** : ✅ Implémenté (commits `f446b1a`, `fdbbf43`, `6d2d2c3`, `e75ec03`)

---

### UCP-09 — Gérer les références (URL + PDF)

> **En tant que** fournisseur UC  
> **Je veux** ajouter, modifier ou supprimer des références (URL ou PDF uploadé)  
> **Dans le contexte** de l'ajout de publications scientifiques liées  
> **Pour** crédibiliser mon UC et permettre l'approfondissement  
> **Mesuré par** nombre moyen de références / UC > 2

**Scénario nominal**
1. Le fournisseur double-clique sur la section Références
2. Un formulaire structuré s'ouvre avec onglets "Lien URL" / "Upload PDF"
3. Pour URL : titre, venue (optionnel), url → bouton "Ajouter"
4. Pour PDF : titre + sélection fichier → upload vers `/public/docs/` → ajout auto de la référence
5. Liste des références existantes avec bouton de suppression

**Critères d'acceptation**
- Ajout URL fonctionne
- Upload PDF fonctionne, fichier servi correctement (MIME type PDF)
- Suppression fonctionne
- Affichage public et preview identiques
- Édition d'une référence existante (modifier titre ou URL)

**Statut d'implémentation** : ⚠️ Partiel (T004-S1) — formulaire fonctionne, affichage dans preview cassé (bug de rendu frontmatter vs body), édition pas encore implémentée

---

### UCP-10 — Approuver un UC et le publier

> **En tant que** fournisseur UC  
> **Je veux** autoriser la mise en ligne de mon UC  
> **Dans le contexte** où je suis satisfait du contenu de la preview  
> **Pour** déclencher sa publication  
> **Mesuré par** délai entre envoi du lien et approbation < 7 jours

**Scénario nominal**
1. En bas de la page preview, le fournisseur remplit le formulaire d'approbation (nom, prénom, poste, organisation, email, case à cocher)
2. Il clique "Signer et approuver"
3. L'API `/api/uc-approve` écrit `approvedBy: {...}` dans le frontmatter et passe `status` à `published`
4. (Optionnel) Email de confirmation envoyé au fournisseur via Brevo
5. Email de notification envoyé à Guy

**Critères d'acceptation**
- Tous les champs du formulaire sont obligatoires
- Case à cocher validée
- L'UC apparaît immédiatement sur `/use-cases/` après approbation
- `approvedBy` est affiché sur la page publiée (badge "Autorisé par ...")

**Statut d'implémentation** : ⚠️ Partiel (T003-S3) — fonctionne sauf l'envoi d'email qui plante si `BREVO_API_KEY` manquante (T003-S4 en STANDBY)

---

### UCP-11 — Notification email de confirmation

> **En tant que** responsable EDT  
> **Je veux** recevoir une notification quand un UC est approuvé  
> **Dans le contexte** du suivi des publications  
> **Pour** être informé sans avoir à consulter le repo  
> **Mesuré par** 100 % des approbations notifiées

**Scénario nominal**
1. Après une approbation via UCP-10
2. L'API envoie un email via Brevo à Guy (et optionnellement au fournisseur)
3. L'email contient : slug UC, nom du signataire, date, lien vers la page publiée

**Critères d'acceptation**
- Email envoyé à chaque approbation réussie
- Pas d'email si l'approbation est invalide
- Log des envois (succès/échec)

**Statut d'implémentation** : ⚠️ Bloqué (T003-S4) — code prêt, attente du token Brevo

---

### UCP-12 — Retirer un UC publié (retour en draft)

> **En tant que** responsable EDT  
> **Je veux** pouvoir repasser un UC publié en draft  
> **Dans le contexte** d'une correction nécessaire, d'une demande du fournisseur, ou d'une erreur détectée  
> **Pour** retirer temporairement ou définitivement l'UC de la vitrine publique  
> **Mesuré par** temps de réaction < 1 h

**Scénario nominal**
1. Guy modifie `status: published` → `status: draft` dans le frontmatter du fichier
2. L'UC disparaît immédiatement de `/use-cases/`
3. L'UC reste accessible via `/preview/{slug}?token=...` pour correction
4. Une fois corrigé et réapprouvé, il repasse en `published`

**Critères d'acceptation**
- Modification du statut propagée en < 1 min (dev mode hot-reload, prod = rebuild)
- Pas de cache agressif qui retient l'ancienne version

**Statut d'implémentation** : ✅ Implémenté (par nature du filtrage `status: published`, mais pas d'UI — manipulation manuelle du fichier)

---

## 4. Flows transverses

### Flow A — Vie d'un UC, de la soumission à la publication

```
Soumission partenaire
        ↓
Hannah crée le draft (UCP-05)
        ↓
Guy envoie le lien preview au fournisseur par email
        ↓
Fournisseur consulte le preview (UCP-06)
        ↓
Fournisseur complète les sections MC (UCP-07)
Fournisseur édite les métadonnées (UCP-08)
Fournisseur ajoute des références (UCP-09)
        ↓
Fournisseur approuve (UCP-10)
        ↓
status = published → UC visible sur /use-cases/ (UCP-01)
        ↓
Email de notification à Guy (UCP-11)
        ↓
[Cycle éventuel : retour en draft pour correction (UCP-12)]
```

### Flow B — Visite publique

```
Arrivée sur edtlab.fr
        ↓
Clic sur "Use Cases Portfolio"
        ↓
Liste filtrée par status: published (UCP-01)
        ↓
[Recherche par mot-clé (UCP-03)]
[Filtres domaine/maturité/tags (UCP-04) — non implémenté]
        ↓
Clic sur un UC
        ↓
Lecture de la fiche détaillée (UCP-02)
        ↓
[Contact via email contact (UCP-13 — non implémenté)]
```

---

## 5. Fonctionnalités manquantes — propositions

### UCP-13 — Contacter un responsable d'UC via formulaire

**Motivation** : actuellement un visiteur doit copier-coller une adresse email et écrire un message depuis son client mail. Friction élevée.

**Proposition** : bouton "Contacter" sur chaque UC → formulaire (nom, email, sujet, message) → envoi via Brevo à l'adresse du contact UC.

**Valeur** : augmente le taux de mise en relation, permet un tracking.

---

### UCP-14 — Dashboard Guy : état des drafts et approbations

**Motivation** : pas de visibilité consolidée sur les UC en cours de rédaction, en attente d'approbation, approuvés mais non publiés, etc.

**Proposition** : page `/admin/dashboard` (protégée) listant :
- Drafts par ancienneté (alerte > 30 jours)
- Drafts avec preview envoyé non ouverts
- Approbations reçues
- UC récemment publiés

**Valeur** : pilotage du portfolio, détection des blocages.

---

### UCP-15 — API / UI pour créer un draft UC

**Motivation** : aujourd'hui Hannah ou Guy crée un fichier `.md` à la main. Pas reproductible, pas traçable.

**Proposition** : page `/admin/new-uc` avec formulaire minimal (titre, contacts, domaine) qui crée le fichier draft avec le template MC prérempli.

**Valeur** : réduit le temps de création, garantit la conformité au schema.

---

### UCP-16 — Édition de référence existante

**Motivation** : UCP-09 permet seulement ajout/suppression. Pour modifier un titre ou une URL, il faut supprimer et recréer.

**Proposition** : bouton "Éditer" sur chaque référence, ouvrant un formulaire pré-rempli.

**Valeur** : UX plus fluide, préserve l'ordre.

---

### UCP-17 — Versioning et historique d'un UC

**Motivation** : aucun historique lisible des modifications, juste le `git log`. Un fournisseur qui revoit son UC 6 mois après ne sait pas ce qui a changé.

**Proposition** : afficher sur la page publiée un "Last updated" + lien vers un diff lisible (basé sur `git log` filtré par slug).

**Valeur** : transparence, traçabilité pour la gouvernance.

---

### UCP-18 — Demande de corrections (feedback du fournisseur)

**Motivation** : le fournisseur peut approuver ou éditer, mais pas "demander à l'équipe EDT de corriger quelque chose pour moi".

**Proposition** : bouton "Demander des corrections" à côté de "Approuver" → textarea → email à Guy avec les remarques. Le statut reste `draft`.

**Note** : cette fonctionnalité avait été développée puis retirée (commit `9c92368` — "remove correction request form"). Vérifier avec Guy si on la réintroduit.

---

### UCP-19 — Export PDF / poster d'un UC

**Motivation** : pour conférences, communication externe, archivage, un PDF figé de l'UC est utile.

**Proposition** : bouton "Télécharger en PDF" sur chaque UC public → génération via puppeteer ou équivalent.

**Valeur** : support commercial, dissémination.

---

### UCP-20 — Filtres sur la liste `/use-cases/` (lien avec UCP-04)

**Motivation** : voir UCP-04. Au-delà du filtre, proposer également des "tags cliquables" sur les pages détaillées qui renvoient vers la liste filtrée.

**Valeur** : navigation thématique, découverte.

---

### UCP-21 — Analytics de consultation des UC

**Motivation** : pas de donnée sur quels UC attirent du trafic, combien de clics contacts, etc.

**Proposition** : intégrer Plausible ou équivalent (respect RGPD), dashboard des vues par UC.

**Valeur** : priorisation éditoriale, pilotage produit.

---

### UCP-22 — Multilingue complet EN/FR pour tous les UC

**Motivation** : le site est bilingue (`prefixDefaultLocale: true`, routes `/en/` et `/fr/`), mais un UC n'existe actuellement que dans une langue.

**Proposition** : associer deux fichiers `.md` (FR + EN) au même UC logique, afficher un bouton de bascule langue.

**Valeur** : rayonnement international.

---

## 6. Métriques de succès (portfolio dans son ensemble)

| Métrique | Cible | Moyen de mesure |
|----------|-------|-----------------|
| Nombre d'UC publiés | 20 fin 2026 | Comptage frontmatter `status: published` |
| Délai moyen soumission → publication | < 4 semaines | À instrumenter (UCP-14) |
| Complétude moyenne des MC par UC | > 80 % des sections remplies | Script d'analyse (non "A compléter") |
| Taux d'ouverture des liens preview | > 80 % | À instrumenter (UCP-21) |
| Taux d'approbation sur délai | > 90 % | À instrumenter (UCP-14) |
| Nombre de visites par UC / mois | > 50 pour UC phares | Analytics (UCP-21) |
| Taux de clics vers contacts/ressources | > 10 % | Analytics |

---

## 7. Hors scope

- **Édition collaborative temps réel** (type Google Docs) — pas pertinent à ce stade
- **Commentaires publics sur les UC** — risque de spam, pas de valeur évidente
- **Système de rating / like** — ne correspond pas au positionnement académique
- **Intégration LDAP / SSO partenaire** — trop lourd pour le volume actuel
- **App mobile dédiée** — le site responsive suffit

---

## 8. Annexes

### A1 — Statut de synthèse des UCP

| Code | Titre | Statut |
|------|-------|--------|
| UCP-01 | Liste UC publiés | ✅ Implémenté |
| UCP-02 | Page détaillée UC | ✅ Implémenté |
| UCP-03 | Recherche mot-clé | ✅ Implémenté |
| UCP-04 | Filtres domaine/maturité/tags | ❌ Manquant |
| UCP-05 | Créer draft UC | ⚠️ Manuel |
| UCP-06 | Preview avec token | ✅ Implémenté |
| UCP-07 | Éditer sections MC | ✅ Implémenté |
| UCP-08 | Éditer métadonnées | ✅ Implémenté |
| UCP-09 | Gérer références | ⚠️ Partiel (bug affichage) |
| UCP-10 | Approuver un UC | ⚠️ Partiel (Brevo bloquant) |
| UCP-11 | Notification email | ⚠️ Bloqué (token Brevo) |
| UCP-12 | Retirer un UC publié | ✅ Implémenté (manuel) |
| UCP-13 | Formulaire de contact UC | ❌ Manquant |
| UCP-14 | Dashboard admin | ❌ Manquant |
| UCP-15 | UI création draft | ❌ Manquant |
| UCP-16 | Édition référence existante | ❌ Manquant |
| UCP-17 | Historique UC | ❌ Manquant |
| UCP-18 | Demande de corrections | ❌ Retiré (à réintroduire ?) |
| UCP-19 | Export PDF / poster | ❌ Manquant |
| UCP-20 | Tags cliquables | ❌ Manquant |
| UCP-21 | Analytics | ❌ Manquant |
| UCP-22 | Multilingue complet | ❌ Manquant |

### A2 — Correspondance avec les tâches Hannah

| UCP | Tâche | Sprint |
|-----|-------|--------|
| UCP-06 | HN-T003 | S1 |
| UCP-07 | HN-T003 | S2 |
| UCP-08 | HN-T003 (ajouts hors scope initial) | S2+ |
| UCP-09 | HN-T004 | S1 |
| UCP-10 | HN-T003 | S3 |
| UCP-11 | HN-T003 | S4 (STANDBY) |

### A3 — Références techniques

- Schema UC : `src/content/config.ts` (collection `use-cases`)
- Layout public : `src/layouts/UseCaseLayout.astro`
- Card listing : `src/components/UseCaseCard.astro` / `UseCaseList.astro`

*Note : depuis la simplification display-only, la route `/preview/[slug]` et les routes `/api/uc-*` ont été supprimées. L'édition se fait directement sur les fichiers `.md` via PR git.*

### A4 — Section « Description fonctionnelle » dans un UC

Section optionnelle à placer **après la grille MC1-MC21** et avant `## Données` dans le fichier `.md` d'un UC. Elle traduit les caractéristiques structurelles (MC) en **besoins utilisateurs concrets et mesurables**.

Structure :

```markdown
## Description fonctionnelle

### Utilisateurs

- **<Rôle 1>** — <description courte>
- **<Rôle 2>** — <description courte>

### Besoins fonctionnels

*Format : <Utilisateur> veut <action> pour <objectif>, dans <contexte>. **Métrique :** <indicateur quantifié>.*

- *<Utilisateur>* **veut <action>** pour <objectif>, dans <contexte d'utilisation>. **Métrique :** <indicateur>.
```

**Sémantique** :
- `<Utilisateur>` : un des rôles listés au-dessus (ou de la carte d'identité frontmatter `users[]`)
- `<action>` : ce que l'utilisateur veut faire avec / via le jumeau numérique
- `<objectif>` : la valeur métier ou résultat visé (le « pourquoi »)
- `<contexte>` : la phase, l'environnement ou l'état du système où le besoin s'exprime
- **`métrique`** : un indicateur quantifié et mesurable de réussite (latence, fréquence, profondeur d'historique, taux de couverture, etc.)

**Différence avec la grille MC1-MC21** :
- MC1-21 décrivent **la structure** du jumeau (comment il est fait)
- Description fonctionnelle décrit **les usages attendus** (qui veut quoi, dans quel but, avec quelle preuve d'usage)

Pour un exemple complet, voir `src/content/use-cases/inria-guy-de-spiegeleer-capteur-temperature-fr.md`.

---

*Fin du document. Révisions à venir dans le même fichier.*
