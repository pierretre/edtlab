---
# Please respect these sections and template for good integration in the web site
title: "Modeling the construction of digital twins" # Avoid accents in title
type: "PhD"  # Options (Limited): "PostDoc", "PhD", "Engineer", "Intern"
location: "Brest, France"
expectedStartDate: "Autumn 2026"  # Expected start date - flexible format: "Spring 2025", "Q2 2025", "2025-06-01", etc.
publishedDate: 2026-03-16  # Date when job offer was published in YYYY-MM-DD format
filled: false  # Position availability status: true if position is filled, false if still available
description: "The goal is to develop an environment for building and executing digital twins based on a digital twin model and its lifecycle." # Brief summary of the position (2-3 sentences) for list summary printing. The detailed description goes in the Body section below.
requirements: ["Master degree in computer science", "Programming skills", "Modeling skills", "Experience with digital twins is a plus"] # Some requirements in a list
tags:
 - "PC3"  # Options (Feel free to add others): "PC1", "PC2", "PC3", "PC4", "PC5", "General", ...
contacts: ["hiring.manager@edt-program.fr", "fabien.dagnat@imt-atlantique.fr", "Jannik.Laval@univ-lyon2.fr"]  # Array of contact emails for this position
---

## Context

Digital twins are virtual representations of real-world products, systems, or processes, enabling simulation, integration, testing, monitoring, and maintenance. They play a pivotal role in optimizing complex systems across a wide range of domains, from industrial manufacturing and energy to environmental monitoring and healthcare.

The Engineering Digital Twin [EDT program](https://edtlab.fr/en/), funded by the France 2030 investment plan, is a national initiative aimed at advancing the foundations of digital twin engineering in France and Europe. By bringing together leading academic and industrial partners, EDT seeks to strengthen the bases for the design, use, and deployment of digital twins, addressing key open challenges in model hybridization, composability, development methodologies, digital coupling, and human–twin interaction.

The construction of digital twins applies to many fields: industry for process or product control, territories to aid decision-making, but also medicine and archaeology, for example. Many digital twins are currently being built, often on an ad hoc basis, i.e., with a short-term operational objective. Finally, it should be noted that these digital twins sometimes exist before their reference system, and sometimes simultaneously with part of the life of their reference system. They could even serve as an "archive" and therefore be used after the reference system has been withdrawn.

In the long term, digital twins should be able to exist for a period that could exceed that of their reference system (a factory, a product, a territory, etc.). Digital twins must therefore be designed and built to be maintainable, scalable, and interoperable, based on existing information and to collect all future information.

To this end, we would like to propose an approach to building digital twins based on principles similar to those of DevOps. In other words, principles that enable continuous improvement of the various building blocks that make up the digital twin, while ensuring the interoperability and consistency of the information (data and models) collected.

## Thesis Objectives

This PhD project aims to develop an environment for building and executing digital twins based on a digital twin model and its lifecycle. To this end, case studies relying on existing digital twins (models and data) will be central to the work in order to cover a wide range of uses.

Key scientific challenges include:

- How to coordinate the digital twin's components and information sources to ensure managerial consistency and the usability of data and models,
- How to describe the deployment operations of digital twin building blocks, and
- How the digital twin's lifecycle integrates with its use.

To adapt the DevOps approach to digital twin construction and execution tools, we want to:

- Use the MDE approach to create and manipulate abstractions relevant to the digital twin. In particular, we will identify the stages in the lifecycle of a DT.
- Develop a DSL to describe and operationalize the DevOps stages relevant to the DT. It should be possible to describe DT services, data sources, data manipulations, constraints, etc. This DSL could be an extension of existing languages such as Ansible, or a kind of middleware orchestrating several other DSLs.
- Propose a DevOps methodology (including traceability, evolution, analysis, and change impact management) for DTs using the new abstractions/DSLs to ensure the usability of the information managed by the DT.

The results of this thesis will directly contribute to the Artemis platform, an open-source framework set to become a benchmark in the field.

## Work Environment

The PhD candidate will be co-supervised by Fabien Dagnat, IMT-Atlantique and Jannik Laval, Université de Lyon 2 within [LabSTICC/PS4](https://p4s.enstb.org).

The candidate will benefit from a stimulating scientific and industrial environment of the highest level, with access to a national network of leading research institutions and industry partners, regular interactions with the broader EDT community through workshops, seminars, and joint demonstrators, and the opportunity to contribute to Artemis, the program's open software platform.

Both teams have been contributing to research on digital twins for several years, particularly on the need to apply software engineering (SE) and model-based systems engineering (MBSE) principles to such systems. We also have solid experience in DevOps and complex software deployment.

It is part of the EDT program and will interact with other theses on related topics such as:

- Assembly of digital twins as SoS
- Federation of data and models to define digital twins
- Variability

## What You Will Gain from This PhD

This PhD offers the opportunity to:

- Develop highly sought-after skills in system modeling, real-time data processing, and collaborative innovation.
- Collaborate with leading partners (Inria, CEA, CNRS, etc.) and validate your research on real-world industrial use cases.
- Join a network of PhD candidates within the EDT program, fostering collaboration, peer support, and interdisciplinary exchanges.
- Contribute to an open-source platform (Artemis) and publish in international conferences and journals.
- Gain recognition in a rapidly growing field, with career prospects in academic research, industrial R&D, or entrepreneurship.

Upon completion, you will be positioned as a recognized expert in a key domain for industry and research, with diverse professional opportunities in France and internationally.

## References

- Benoît Combemale, Pascale Vicat-Blanc, Arnaud Blouin, Hind Bril El Haouzi, Jean-Michel Bruel, et al.. Engineering Digital Twins: A Research Roadmap. *EDTconf 2025 - 2nd International Conference on Engineering Digital Twins*, Oct 2025, Grand Rapids, Michigan, United States. pp.1-7. [⟨hal-05223776⟩](https://inria.hal.science/hal-05223776v1)
- Gwendal Beaumont, Antoine Beugnard, Salvador Martínez, Christelle Urtado, Sylvain Vauttier, Towards Automating the Life Cycle Management of Digital Twins ER2025 - 44th International Conference on Conceptual Modeling, Oct 2025, Poitiers, France. pp.412-430, ⟨10.1007/978-3-032-08623-5_22⟩
- Antoine Beugnard , A software engineering perspective on digital twin: many candidates, none elected, SWC 2023: IEEE Smart World Congress, IEEE Smart World Congress, Aug 2023, Portsmouth, United Kingdom. ⟨10.1109/SWC57546.2023.10448955⟩
- Tarek Alskaif, Önder Babur, Francis Bordeleau, Loek Cleophas, Benoît Combemale, et al., Evolution at the Core of Digital Twin Engineering EDTconf 2025 - 2nd International Conference on Engineering Digital Twins, Oct 2025, Grand Rapids, Michigan, United States. pp.1-6
- Judith Michael, Loek Cleophas, Steffen Zschaler, Tony Clark, Benoît Combemale, et al., Model‐Driven Engineering for Digital Twins: Opportunities and Challenges,  Systems Engineering, 2025, 28 (5), pp.659-670. ⟨10.1002/sys.21815⟩