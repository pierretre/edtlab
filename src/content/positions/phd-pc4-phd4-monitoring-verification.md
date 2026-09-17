---
title: "Monitoring and Verification of Applications Involving Digital Twins" # Avoid accents in title
type: "PhD"  # Options (Limited): "PostDoc", "PhD", "Engineer", "Intern"
pc: PC4
location: "Grenoble, France"
expectedStartDate: "2026-10-01"  # Expected start date - flexible format: "Spring 2025", "Q2 2025", "2025-06-01", etc.
publishedDate: 2026-09-16  # Date when job offer was published in YYYY-MM-DD format
filled: false  # Position availability status: true if position is filled, false if still available
description: "This PhD combines runtime monitoring/verification and probabilistic model checking to detect and manage deviations between a digital twin and its physical counterpart, validated on a drone navigation use case." # Brief summary of the position (2-3 sentences). The detailed description goes in the Body section below.
requirements: ["MSc / Master 2 Recherche in Computer Science or a closely related field", "Solid background in formal methods and verification", "Programming proficiency", "Good command of English as the working language", "Strong communication skills, autonomy, attention to detail, and a collaborative mindset"] # Some requirements in a list
contacts: ["gwen.salaun@inria.fr", "ylies.falcone@univ-grenoble-alpes.fr"]  # Array of contact emails for this position
---

## Context

A digital twin is a virtual representation of a real-world entity. It is often presented as a predictive instrument, by enabling one to simulate multiple possible outcomes of a real-world entity. In such a context, it is essential that the digital twin exhibits behavior that is faithful to that of the system it seeks to mimic. Any significant and sustained discrepancy between the twin and its concrete counterpart can lead to incorrect predictions, false diagnoses, and generally to an incorrect perception of the real system operation. Current techniques fall short of meeting the need for analysis methods that support heterogeneous models and provide meaningful feedback on the correctness and quality of the models embedded within the digital twin.

A key shift pursued in this thesis is to treat the digital twin not as a static artifact validated once at design time, but as a live model that co-evolves with runtime observations, with formal guarantees on both the detection of deviations and the prediction of future behavior.

These techniques face several challenges. First, the expressiveness and heterogeneity of models, as well as the coupling between composite components, complicate both modeling and analysis. Second, environmental uncertainty makes the behavior of such models difficult to predict.

This PhD thesis is part of the national project [Engineering Digital Twins (EDT)](https://edtlab.fr/en/), funded by the France 2030 investment plan.

## Thesis Objectives

The goal of this PhD thesis is to work on two related topics:

- **Detection of deviations** by using monitoring and runtime verification techniques. Both the models available in the digital twin and concrete information/data coming from real systems will be used to identify changes or evolutions in the behavior of real applications. This information can be used for predictive maintenance or for updating models that deviate from the original ones.
- **Uncertainty management** by using Probabilistic Model Checking (PMC). The behavior of the environment in physical systems is crucial to better understand and control the applications at hand. PMC relies on probabilistic models computed from models available in the digital twin and data retrieved from the physical systems. These models allow the verification of probabilistic properties, whose results can be visualized on a dashboard for observation of the systems' executions and used for runtime adaptive behavior.

The two strands are connected through a shared model-update loop: runtime verdicts produced by monitoring inform the probabilistic re-estimation of environment and system parameters, while PMC predictions guide the synthesis and adaptation of monitors deployed at runtime.

All contributions made during this PhD will be validated via prototype tools and applied to realistic case studies. In particular, the plan is to work on a case study involving drones, combining simulation and physical platforms, with the goal of improving their navigation systems and avoiding abnormal behaviors such as collisions, sub-optimal trajectories, and flyaways.

## Work Environment

The PhD will be co-supervised by Gwen Salaün and Yliès Falcone, combining expertise in formal methods for distributed and concurrent systems with runtime verification and enforcement.

The PhD student will work at the Inria center of Université Grenoble Alpes, about 10 kilometers from Grenoble. Located in the heart of the French Alps, Grenoble offers an exceptional quality of life, combining immediate access to nature with the energy of a dynamic and innovative city, and is a vibrant hub for research, technology, culture, and entrepreneurship.

Funding is secured for three years through the EDT national project, with a salary of about 2300 EUR gross per month, health insurance included (French Social Security system).

## What You Will Gain from This PhD

This PhD offers the opportunity to:

- Develop highly sought-after skills in system modeling, real-time data processing, and collaborative innovation
- Collaborate with leading partners within the EDT program and validate your research on real-world use cases
- Join a network of PhD candidates within the EDT program, fostering collaboration, peer support, and interdisciplinary exchanges
- Publish articles in high-reputation conferences and journals

Upon completion, you will be positioned as a recognized expert in a key domain for industry and research, with diverse professional opportunities in France and internationally.

## Profile

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

## Application Process

Applications should include:

- Letter of application
- Curriculum vitae
- Academic transcripts
- References or letters of recommendation, if any
- Scientific or technical publications, if any

Applications should be sent by e-mail to Gwen Salaün and Yliès Falcone, ideally as a single PDF. Applications are reviewed on a rolling basis.
