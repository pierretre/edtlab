---
type: PhD
pc: PC1
publishedDate: 2026-03-15
references:
  - liang-2024-harnessing
  - ma-2025-bridging
  - michael-2023-explaining
  - thagard-1997-abductive
  - li-2020-digital
  - rudin-2019-stop
  - sokol-2020-one
  - rasheed-2020-digital
  - fuller-2020-digital
lang: en
description: PhD position on explainable and distributed reasoning mechanisms to
  bridge the reality gap in hybrid digital twins
requirements:
  - Master's degree in Computer Science, Artificial Intelligence, or related
    field
  - Strong background in AI, reasoning systems, or distributed systems
  - Programming skills
  - Interest in cyber-physical systems and digital twins
  - Fluency in English
contacts:
  - gerald.rocher@univ-cotedazur.fr
title: Distributed Abductive Reasoning for Self-Explaining Digital Twins
location: Nice, France
host: UniCA, I3S Kairos
supervisors:
  - name: Gerald ROCHER
    org: UniCA, I3S Kairos
    role: director
  - name: Andreas Tettamanzi
    org: UniCA, I3S Wimmics
    role: co-supervisor
startDate: 2026-09-01
researchStatus: ongoing
filled: true
researcher:
    name: Baptiste BILLEBAULT
---

## Position Overview

We are seeking a motivated PhD candidate to contribute to the **Engineering Digital Twins (EDT)** program within  **Catalyst: the Reliable Hybrid Model Forge**. The research focuses on developing **explainable and distributed reasoning mechanisms for hybrid digital twins**, with the goal of interpreting discrepancies between model predictions/simulation and real-world observations.

Digital Twins are increasingly used to design, operate, and maintain complex **Cyber-Physical Systems (CPS)**. Modern implementations rely on **hybrid models** that combine physics-based models with data-driven components. This hybridization enables digital twins to operate in environments where physical models are incomplete, evolving, or partially unknown.

However, as digital twins interact with their physical counterparts, **discrepancies inevitably arise between predicted and observed behaviors**. This phenomenon, known as the **reality gap**, may result from model abstraction, sensor drift, environmental variability, or system degradation.

The goal of this PhD is to develop methods enabling digital twins to **interpret and explain these discrepancies**, transforming them from simple prediction errors into actionable knowledge about the system and its requirements.

## Research Focus

Current approaches often treat discrepancies between digital twins and physical systems as numerical errors that must be minimized through reactive model adaptation. While effective in some cases, these methods present several limitations.

First, they rarely provide **human-interpretable explanations** for the causes of the observed mismatches. Second, reasoning processes are typically implemented in **centralized architectures**, preventing contextual reasoning near data sources. Third, adaptation mechanisms often ignore the broader **system requirements**, potentially improving local model accuracy at the expense of global objectives.

This PhD proposes to address these challenges by introducing **abductive reasoning** as a central mechanism for interpreting the reality gap in hybrid digital twins.

Unlike deduction (deriving predictions from physical models) or induction (learning models from data), **abduction focuses on generating plausible explanations for unexpected observations**. It is therefore well suited to identifying the causes of discrepancies between model predictions and real-world data.

The research will explore a **hierarchical and distributed explanation architecture** where:

- Local explanations are generated at the **edge**, close to sensors and data sources  
- Intermediate reasoning layers at the **fog level** refine and combine explanations  
- Global reasoning at the **cloud or system-level twin** validates explanations and evaluates their impact on system requirements  

This hierarchical process creates a **traceable chain of explanations**, linking low-level sensor anomalies to high-level system behaviors.

The main research directions include:

- **Abductive reasoning for hybrid digital twins**  
  Designing reasoning mechanisms capable of explaining discrepancies between physics-based and data-driven models.

- **Distributed explanation architectures**  
  Developing reasoning frameworks operating across edge–fog–cloud infrastructures.

- **Hierarchical explanation generation**  
  Building multi-level explanation processes connecting local observations to system-level interpretations.

- **Requirement-aware reasoning**  
  Ensuring that model corrections and explanations preserve global system requirements.

Ultimately, the goal is to transform digital twins from **reactive error-correction systems into proactive, self-explaining companions** capable of supporting trustworthy decision-making in complex cyber-physical environments.

## Key Responsibilities

- Conduct research on abductive reasoning methods for digital twins
- Develop distributed architectures for explanation generation
- Design algorithms linking local anomalies to global system interpretations
- Implement and evaluate prototypes in cyber-physical system scenarios
- Collaborate with interdisciplinary researchers in AI and digital twin engineering
- Publish research results in international conferences and journals
- Participate in EDT program meetings and collaborative activities

## Research Environment

The PhD will be conducted at **Université Côte d’Azur**, within a research environment specializing in **artificial intelligence, cyber-physical systems, and digital twin technologies**.

The candidate will collaborate with researchers working on:

- explainable artificial intelligence  
- hybrid digital twin architectures  
- distributed systems and edge computing  
- cyber-physical system modeling  

### Facilities and Resources

- Access to computing infrastructure for distributed experimentation
- Collaboration with researchers in digital twin engineering
- Participation in interdisciplinary EDT research activities
- Opportunities for international collaborations and conference participation

