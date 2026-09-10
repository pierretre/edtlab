---
title: Monitoring and Verification of Applications involving Digital Twins.
type: PhD
pc: PC4
location: Grenoble-UGA
description: "-"
filled: false
tags: []
references: []
publishedDate: 2026-09-09
requirements:
  - Fluency in English and French
contacts: []
researcher:
  name: "-"
researchStatus: ongoing
---
## Context
A digital twin is a virtual representation of a real-world entity. It is often
presented as a predictive instrument, by enabling one to simulate multiple
possible outcomes of a real-world entity. In such a context, it is essential
that the digital twin exhibits behavior that is faithful to that of the system
it seeks to mimic. Any significant and sustained discrepancy between the twin
and its concrete counterpart can lead to incorrect predictions, false diagnoses,
and generally to an incorrect perception of the real system operation.
Current techniques fall short of meeting the need for analysis methods
that support heterogeneous models and provide meaningful feedback on the
correctness and quality of the models embedded within the digital twin.

A key shift we pursue in this thesis is to treat the digital twin not as
a static artifact validated once at design time, but as a live model that
co-evolves with runtime observations, with formal guarantees on both the
detection of deviations and the prediction of future behavior.

These techniques face several challenges. First, the expressiveness and
heterogeneity of models, as well as the coupling between composite
components, complicate both modeling and analysis. Second, environmental
uncertainty makes the behavior of such models difficult to predict.

The goal of this PhD thesis is to work on the two following related topics:

- Detection of deviations by using monitoring and runtime verification
techniques. We will use both the available models in the digital twin with
concrete information/data coming from real systems to identify some changes or
evolutions in the behavior of real applications. This information can be used
for predictive maintenance or for updating models that deviate from the original
ones.

- Uncertainty management by using Probabilistic Model Checking (PMC).
The behavior of the environment in physical systems is crucial to better
understand and control the applications at hand. PMC relies on probabilistic
models computed from models available in the digital twin and data retrieved
from the physical systems. These models allow the verification of probabilistic
properties, whose results can be visualized on a dashboard for observation of
the systems’ executions and use for runtime adaptative behavior.

The two strands are connected through a shared model-update loop: runtime
verdicts produced by monitoring inform the probabilistic re-estimation of
environment and system parameters, while PMC predictions guide the synthesis
and adaptation of monitors deployed at runtime.

All contributions made during this PhD will be validated via prototype tools
and applied to realistic case studies. In particular, we plan to work on a
case study involving drones, combining simulation and physical platforms,
with the goal of improving their navigation systems and avoiding abnormal
behaviors such as collisions, sub-optimal trajectories, and flyaways.

This PhD thesis is part of a national project called "Engineering Digital Twins" (EDT).

The thesis will be co-supervised by Gwen Salaün and Yliès Falcone, combining
expertise in formal methods for distributed and concurrent systems with
runtime verification and enforcement.


# Required skills and profile

**Required:**
- MSc / Master 2 Recherche in Computer Science or a closely related field
- Solid background in formal methods and verification
- Programming proficiency
- Good command of English as the working language
- Strong communication skills, autonomy, attention to detail, and a collaborative mindset

**Appreciated:**

- Familiarity with probabilistic methods (e.g., probabilistic model checking, tools such as PRISM or Storm)
- Knowledge of distributed systems and/or digital twins
- Exposure to robotics, control, or cyber-physical systems


# Start date

October 1, 2026 (some flexibility possible depending on the candidate's situation).
Funding is secured for three years through the EDT national project.


# Salary

About 2300 EUR gross per month, health insurance included (French Social Security system).


# Location

The PhD student will work at Inria center of University Grenoble Alpes,
at about 10 kilometers from Grenoble.
Located in the heart of the French Alps, Grenoble offers an exceptional quality of life,
combining immediate access to nature with the energy of a dynamic and innovative city.
Surrounded by mountains, lakes, and outdoor activities all year round, it is also a vibrant
hub for research, technology, culture, and entrepreneurship—making it an ideal place
to grow professionally while enjoying a rich and balanced lifestyle.


# Application content

- Letter of application
- Curriculum vitae
- Academic transcripts
- References or letters of recommendation, if any
- Scientific or technical publications, if any


# Application submission

Applications should be sent by e-mail to Gwen Salaün and Yliès Falcone,
ideally as a single PDF. Applications are reviewed on a rolling basis;
those received after June 30, 2026 may not be considered if a candidate
has already been selected.

# Contacts

Gwen Salaün: <gwen.salaun@inria.fr>

Yliès Falcone: <ylies.falcone@univ-grenoble-alpes.fr>
