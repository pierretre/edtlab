---
title: "Composing and Configuring Digital Twin Architectures to Meet User Requirements (Energy, Performance, Budget)"
type: "PhD"
location: "Anglet, France"
expectedStartDate: "Fall 2026"
publishedDate: 2026-03-15
filled: false
description: "This PhD project investigates methods for composing and configuring digital twin architectures in order to meet user requirements under multiple non-functional constraints such as energy consumption, performance, and budget."
requirements:
  - "Master degree in Computer Science, Software Engineering, or a related field"
  - "Strong background in software architecture, distributed systems, or systems engineering"
  - "Programming skills (Python, Java, or similar)"
  - "Interest in modeling, optimization, and digital twin technologies"
tags:
  - "PC2"
  - "PhD"
  - "Digital Twin"
  - "Software Architecture"
  - "Design Space Exploration"
  - "Non-Functional Requirements"
  - "EDT"
contacts: ["johann.bourcier@univ-pau.fr", "benoit.combemale@inria.fr"]
---

## Context

Digital twins are virtual representations of real-world products, systems, or processes, enabling simulation, integration, testing, monitoring, and maintenance. They play a pivotal role in optimizing complex systems across a wide range of domains, from industrial manufacturing and energy to environmental monitoring and healthcare.

The Engineering Digital Twin [EDT program](https://edtlab.fr/en/), funded by the France 2030 investment plan, is a national initiative aimed at advancing the foundations of digital twin engineering in France and Europe. By bringing together leading academic and industrial partners, EDT seeks to strengthen the bases for the design, use, and deployment of digital twins, addressing key open challenges in model hybridization, composability, development methodologies, digital coupling, and human–twin interaction.

Engineering a digital twin requires composing a large number of architectural components spanning the entire data-to-decision pipeline: sensors and data acquisition mechanisms, communication infrastructures, storage systems, system representation models, simulation and prediction engines, decision modules, and mechanisms for implementing actions.

However, there is rarely a single optimal architecture. Depending on the application context, user needs, and available resources, different architectural configurations may be preferable. Digital twin systems must therefore be designed while considering multiple non-functional constraints such as **energy consumption, system performance, and operational budget**.

Selecting the most appropriate architecture therefore requires exploring complex **architectural trade-offs** between competing objectives such as performance, energy consumption, and model precision. Similar trade-offs have been studied in areas such as approximate scientific computing, where multiple execution configurations must be explored to balance performance and accuracy (Sallou et al., 2020). This challenge can be seen as navigating a **Digital Twin Architectural Design Space**, where each point corresponds to a possible composition and configuration of the digital twin architecture.


## Thesis Objectives

This PhD project aims to develop methods and tools for composing and configuring digital twin architectures to meet user requirements under multiple non-functional constraints such as energy consumption, system performance, and operational budget. Key scientific challenges include:

- Modeling the Digital Twin Architectural Design Space (DT-ADS), capturing architectural variability across the entire digital twin pipeline, from data acquisition and storage to system modeling, prediction, decision, and actuation.
- Representing user requirements and non-functional constraints (energy, performance, budget) and linking them to architectural configuration choices.
- Exploring architectural trade-offs within the DT-ADS to support the automated or semi-automated composition and configuration of digital twin architectures.

The results of this thesis will directly contribute to the Artemis platform, an open-source framework set to become a benchmark in the field.

## Work Environment

The PhD candidate will be co-supervised by Johann Bourcier (University of Pau and Pays de l’Adour) and Benoît Combemale (Inria) within the GL team in the LIUPPA laboratory (https://liuppa.univ-pau.fr). The candidate will benefit from a stimulating scientific and industrial environment of the highest level, with access to a national network of leading research institutions and industry partners, regular interactions with the broader EDT community through workshops, seminars, and joint demonstrators, and the opportunity to contribute to Artemis, the program's open software platform.

## What You Will Gain from This PhD

This PhD offers the opportunity to:

- Develop highly sought-after skills in system modeling, real-time data processing, and collaborative innovation.
- Collaborate with leading partners (Inria, CEA, CNRS, etc.) and validate your research on real-world industrial use cases.
- Join a network of PhD candidates within the EDT program, fostering collaboration, peer support, and interdisciplinary exchanges.
- Contribute to an open-source platform (Artemis) and publish in international conferences and journals.
- Gain recognition in a rapidly growing field, with career prospects in academic research, industrial R&D, or entrepreneurship.

Upon completion, you will be positioned as a recognized expert in a key domain for industry and research, with diverse professional opportunities in France and internationally.

## References

- Benoît Combemale, Pascale Vicat-Blanc, Arnaud Blouin, Hind Bril El Haouzi, Jean-Michel Bruel, et al.. Engineering Digital Twins: A Research Roadmap. EDTconf 2025 - 2nd International Conference on Engineering Digital Twins, Oct 2025, Grand Rapids, Michigan, United States. pp.1-7. <hal-05223776> 

- J. Sallou, A. Gauvain, J. Bourcier, B. Combemale, J.R. de Dreuzy. Loop Aggregation for Approximate Scientific Computing. International Conference on Computational Science (ICCS), 2020, pp.141–155.

- Sven Apel, Don Batory, Christian Kästner, Gunter Saake. Feature-Oriented Software Product Lines: Concepts and Implementation. Springer, 2013.