---
title: "Structural Methods for Mixed Model/Data Digital Twin Engineering"
type: "PhD"
pc: PC1
location: "Rennes, France"
expectedStartDate: "October 2026"
filled: false
publishedDate: 2026-03-15
description: "PhD position on structural analysis methods for data based diagnostic of physics-based digital twin models"
requirements: ["Master's degree in Computer Science, Applied Mathematics, Control Systems, or related field", "Strong background in mathematical modeling and dynamical systems", "Algorithmic skills", "Interest in modeling languages such as Modelica and scientific computing", "Fluency in English"]
contacts: ["benoit.caillaud@inria.fr"]
lang: "en"
references:
  - "p-2014-principles"
  - "a-2014-porthamiltonian"
  - "b-2006-robust"
  - "l-2024-data"
  - "g-2024-sparse"
  - "j-2023-discovering"
  - "j-2001-simple"
  - "m-2008-sensor"
  - "b-2020-implicit"
  - "b-2025-benchmarking"
---

## Position Overview

We are seeking a highly motivated PhD candidate to contribute to the **Engineering Digital Twins (EDT)** program within **Catalyst: the Reliable Hybrid Model Forge**. The research focuses on developing new methods, algorithms, and tools that help designers correct **model/data mismatches** in digital twins of physics-dominated systems.

Modern modeling languages and tools allow engineers to build large-scale models directly from **first principles of physics**. Languages such as **Modelica** enable scalable modeling of complex cyber-physical systems, often using modeling paradigms such as **port-Hamiltonian systems**.

While assembling models from component libraries is relatively straightforward, practitioners often face major challenges in:

- parameter identification  
- consistent model initialization  
- fine-tuning of model dynamics  
- integrating empirical models for poorly understood subsystems  

This PhD aims to develop scalable methods that combine **physics-based modeling with data-driven approaches** to improve the reliability and accuracy of digital twin models.

## Research Focus

A key challenge in digital twin engineering is the integration of **experimental or simulated data** into complex physics-based models.

Existing approaches typically rely on **optimization-based data assimilation techniques**, including:

- data reconciliation  
- system identification  
- deep learning approaches such as autoencoders  

Although powerful, these methods often **do not scale well to large dynamical systems** involving thousands of variables.

This PhD proposes to address this challenge using **structural analysis techniques for differential-algebraic equation (DAE) systems**.

The core research idea is to transform the problem of data integration into the analysis of **structurally overdetermined models**. By leveraging structural analysis algorithms, it becomes possible to compute **Minimal Structurally Overdetermined (MSO) subsystems**, which can act as **parity spaces** to detect inconsistencies between model predictions and observed data.

These MSO subsystems can be solved using measured data, and the resulting **residuals** provide indicators of model inconsistencies. This approach enables the localization of model/data mismatches and supports targeted model corrections. Ultimately, the goal is to assist designers in discovering structural deficiencies in equation-based models, by identifying where the available data cannot be explained by the current set of equations.

The PhD research will investigate:

- **Structural Analysis for Digital Twin Models**: Adapting DAE structural analysis algorithms for model/data integration  
- **Parity Space Construction using MSOs**: Identifying subsystems suitable for mismatch detection  
- **Scalable Algorithms for Large Systems**: Leveraging graph-based algorithms with polynomial complexity  
- **Model Diagnosis and Correction**: Using statistical analysis of residuals to localize inconsistencies  

The proposed methods are particularly attractive because they scale well to **large sparse systems**, potentially containing **millions of equations**, and do not require prior knowledge of the reachable state space.

## Key Responsibilities

- Conduct research on structural analysis methods for differential-algebraic equation systems
- Develop algorithms to detect and localize model/data mismatches
- Implement prototype tools supporting model validation in digital twin workflows
- Evaluate scalability on large-scale engineering models
- Collaborate with researchers working on modeling languages and digital twin platforms
- Publish results in international conferences and journals
- Participate in EDT consortium activities and collaborative research meetings

## Research Environment

The PhD will be conducted within the **Engineering Digital Twins (EDT)** program, a national initiative aiming to advance the science and engineering of digital twin systems.

The candidate will work in a research environment combining expertise in:

- modeling languages such as Modelica  
- hybrid systems and dynamical systems  
- structural analysis of differential-algebraic equations  
- large-scale simulation and digital twin architectures  

### Facilities and Resources

- Access to advanced modeling and simulation tools
- Collaboration with researchers specializing in Modelica and hybrid systems
- Opportunities to test methods on real-world engineering models
- Participation in international scientific collaborations

## Qualifications

### Required

- Master's degree in Computer Science, Applied Mathematics, Automatic Control, or related fields
- Strong background in dynamical systems, numerical methods, or scientific computing
- Interest in modeling languages and digital twin technologies
- Strong analytical and problem-solving skills
- Good communication skills in English

### Preferred

- Knowledge of differential-algebraic equations (DAEs)
- Experience with modeling tools such as Modelica
- Background in control systems, system identification, or data assimilation
- Familiarity with graph algorithms or structural system analysis

## Application Process

Please [submit](https://recrutement.inria.fr/public/classic/en/offres/2026-10040) the following documents:

1. **Cover Letter** describing your motivation and research interests
2. **Curriculum Vitae**
3. **Academic Transcripts**
4. **Short Research Statement** (1–2 pages)
5. **Contact information for two academic references**

Applications should be sent using Inria's [job offer](https://recrutement.inria.fr/public/classic/en/offres/2026-10040) portal.

## Funding and Benefits

- **Duration**: 3 years
- **Salary**: Standard French PhD funding
- **Benefits**: Health insurance, social security, travel support for conferences

## Contact Information

**Supervisor**: Benoit Caillaud  
**Institution**: Inria, [Hycomes](https://team.inria.fr/hycomes/)  
**Email**: benoit.caillaud@inria.fr

## About the EDT Program

The **Engineering Digital Twins (EDT)** program is a major French research initiative bringing together leading research institutions to advance digital twin engineering. The program aims to develop new scientific foundations, software platforms, and industrial applications for next-generation digital twin systems.