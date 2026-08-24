---
title: "Frugal and AI-Enhanced Data Governance for Reliable Digital Twins" # Avoid accents in title
type: "PhD"  # Options (Limited): "PostDoc", "PhD", "Engineer", "Intern"
pc: PC4
location: "Nancy, France"
expectedStartDate: "2026-10-01"  # Expected start date - flexible format: "Spring 2025", "Q2 2025", "2025-06-01", etc.
publishedDate: 2026-05-01  # Date when job offer was published in YYYY-MM-DD format
filled: false  # Position availability status: true if position is filled, false if still available
description: "Brief summary of the position and research focus" # Brief summary of the position (2-3 sentences). The detailed description goes in the Body section below.
requirements: ["Master degree in relevant field", "Experience with digital twins", "Programming skills", "Language requirements"] # Some requirements in a list
contacts: []  # Array of contact emails for this position
---

## Context

Digital twins are virtual representations of real-world products, systems, or processes, enabling simulation, integration, testing, monitoring, and maintenance. They play a pivotal role in optimizing complex systems across a wide range of domains, from industrial manufacturing and energy to environmental monitoring and healthcare.

The Engineering Digital Twin [EDT program](https://edtlab.fr/en/), funded by the France 2030 investment plan, is a national initiative aimed at advancing the foundations of digital twin engineering in France and Europe. By bringing together leading academic and industrial partners, EDT seeks to strengthen the bases for the design, use, and deployment of digital twins, addressing key open challenges in model hybridization, composability, development methodologies, digital coupling, and human–twin interaction.

## PhD Context Description

The digital transformation of industry is now at the heart of Industry 4.0 paradigms and cyber-physical systems, where industrial platforms (smart buildings, robotic lines, flexible production systems, etc.) are increasingly instrumented and interconnected. These environments are characterized by high structural and functional dynamism: production line reconfigurations, variable loads, robot mobility, human-machine interactions, and energy fluctuations. In this context, the ability to continuously monitor the system's state with high precision is essential for ensuring performance, operational safety and predictive maintenance (failures, bottlenecks, etc.).

Digital twins (DTs) emerge as a powerful tool to address these challenges. By creating an evolving virtual representation of a physical system, synchronized in (near) real-time with data streams from the real system, DTs enable not only current state supervision but also future evolution anticipation, decision scenario simulation, and control optimization [1]. However, the effectiveness of DTs relies on a fundamental assumption: the availability of reliable, relevant, and sufficiently rich data to ensure the fidelity of the digital model. In dynamic industrial platforms, this assumption is not always met.

Data collection represents a major scientific and technological challenge. Deployed sensors are often distributed, heterogeneous, energy-constrained, and connected via wireless networks prone to packet loss, variable latency, and interference. Moreover, the proliferation of measurement points generates massive data volumes, whose transmission, storage, and processing incur significant computational and energy costs, as well as a non-negligible environmental footprint. In this context, an approach based on comprehensive acquisition of all available data appears neither sustainable nor necessary.

The central problem of this thesis is therefore that of **information frugality** in feeding digital twins of dynamic industrial systems. Frugality is understood here as the ability to minimize resources (bandwidth, energy, computing power, storage, etc.) while maintaining a level of precision and reliability compatible with the physical system's requirements. The goal is to shift from a volume-based logic to a logic of information relevance and quality.

## Thesis Objectives

This PhD project aims to develop a methodological framework for information frugality in industrial digital twins, addressing key scientific challenges:

- **Data selection and compression**: Identifying the most informative data for faithful system representation in the DT, including sensor selection and intelligent sampling strategies [2,3].
- **Robust wireless transmission**: Adapting communication mechanisms to industrial constraints (noise, mobility, sensor density) while balancing reliability, latency, and energy consumption [4].
- **Uncertainty quantification and propagation**: Modeling measurement uncertainties and propagating them within the DT to provide confidence indicators alongside system state estimates [5].

The results will contribute to the Artemis platform, an open-source framework for digital twin engineering.

## Work Environment

The PhD candidate will be co-supervised by Dr. Moufida MAIMOUR, Dr. Samir SI-MOHAMMED and Pr. Hind BRIL EL HAOUZI within the MPSI department of the CRAN lab (<https://www.cran.univ-lorraine.fr/en/departments/mpsi/>) and Dr. Malcolm Egan  Tenured Research Scientist at Inria Equipe Maracas Lyon (<https://team.inria.fr/maracas/en/>)
The candidate will benefit from:

- A high-level scientific and industrial environment with access to a national network of research institutions and industry partners
- Regular interactions with the broader EDT community through workshops, seminars, and joint demonstrators
- The opportunity to contribute to Artemis, the program's open software platform

## What You Will Gain from This PhD

This PhD offers the opportunity to:

- Develop expertise in system modeling, real-time data processing, and industrial digital twins
- Collaborate with leading partners (Inria, CEA, CNRS, etc.) and validate research on real-world industrial use cases
- Join a network of PhD candidates within the EDT program
- Contribute to an open-source platform (Artemis) and publish in international conferences and journals
- Gain recognition in a rapidly growing field with diverse career prospects in academia, industry R&D, or entrepreneurship

## References

[1] Fei Tao, He Zhang, Ang Liu, and Andrew YC Nee. Digital twin in industry : State-of-the-art. IEEE Transactions on industrial informatics, 15(4) :2405–2415, 2018.

[2] N. Ahmad et al. Codesigned communication and data analytics for condition-based maintenance in smart buildings. IEEE Internet of Things Journal, 10(18) :15847–15856, 2023.

[3] X. Ge et al. Distributed event-triggered estimation over sensor networks : A survey. IEEE Transactions on
Cybernetics, 50(3) :1306–1320, 2019.

[4] S. Si-Mohammed. Multi-Criteria Selection and Configuration of IoT Network Technologies. PhD thesis,
Ecole normale supérieure de lyon-ENS LYON, 2023.

[5] M. Egan. Risk-aware estimation from compressed data beyond the Bayes risk. In IEEE International Sym-
posium on Information Theory (ISIT), 2025
