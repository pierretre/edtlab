---
# Please respect these sections and template for good integration in the web site
title: "Aggregation of digital twins in the manner of Systems of Systems" # Avoid accents in title
type: "PhD"  # Options (Limited): "PostDoc", "PhD", "Engineer", "Intern"
location: "Lyon, France"
expectedStartDate: "Autumn 2026"  # Expected start date - flexible format: "Spring 2025", "Q2 2025", "2025-06-01", etc.
publishedDate: 2026-03-16  # Date when job offer was published in YYYY-MM-DD format
filled: false  # Position availability status: true if position is filled, false if still available
description: "The goal is to develop a System of Systems approach from the design stage onwards. This will enable each component of the digital twin to be identified in relation to a physical system functionality, and their assembly will result in a complete digital twin through aggregation, whose lifecycle management will be controllable, just like the physical system." # Brief summary of the position (2-3 sentences) for list summury printing. The detailed description goes in the Body section below.
requirements: ["Master degree in computer science", "Programming skills", "Modelling skills", "Experience with digital twins is a plus"] # Some requirements in a list
tags:
  - "PC2"  # Options (Feel free to add others): "PC1", "PC2", "PC3", "PC4", "PC5", "General", ... 
contacts: ["hiring.manager@edt-program.fr", "Jannik.Laval@univ-lyon2.fr", "Sylvain.Guerin@imt-atlantique.fr"]  # Array of contact emails for this position
---

## Context

Digital twins are virtual representations of real-world products, systems, or processes, enabling simulation, integration, testing, monitoring, and maintenance. They play a pivotal role in optimizing complex systems across a wide range of domains, from industrial manufacturing and energy to environmental monitoring and healthcare.

The Engineering Digital Twin [EDT program](https://edtlab.fr/en/), funded by the France 2030 investment plan, is a national initiative aimed at advancing the foundations of digital twin engineering in France and Europe. By bringing together leading academic and industrial partners, EDT seeks to strengthen the bases for the design, use, and deployment of digital twins, addressing key open challenges in model hybridization, composability, development methodologies, digital coupling, and human–twin interaction.

A Digital Twin is a complex tool composed of different interconnected layers (data, AI, hardware, software) that observes the reference system (actual twin, AT) through sensors and modifies it through actuators. These components, both physical and virtual, are assembled to form a scalable global system. Thus, each component of the DT responds to a function of the AT, and their assembly results in a complete DT, mirroring the AT.

Our work shows that for digital twins to be as close as possible to the physical system, they must be as modular as the latter [Smati2023, Smati2025]. The atomic elements of the AT would have their own "atomic" DT, which would take the form of software components. These atomic components would themselves be assembled to form DTs, linked to these physical elements.

A System of Systems (SoS) is the result of aggregating several independent, interoperable, and interconnected systems to create a larger system [Ackoff]. As an AT can be a System of Systems (SoS), e.g. a complete assembly line composed of multiple robots, its digital twin (DT) can be represented a system of systems. The DT architecture would mirror that of the AT, making it easier to identify and modify DT components (addition, deletion, replacement, or revision). This architecture will facilitate modularity and adaptation throughout its life cycle. This approach, based on the assembly of digital twins, would facilitate the construction of DTs that are more capable of evolving and responding to different users.

## Thesis Objectives

This PhD project aims to develop a System of Systems approach from the design stage onwards. This will enable each component of the digital twin to be identified in relation to a physical system functionality, and their assembly will result in a complete digital twin through aggregation, whose lifecycle management will be controllable, just like the physical system. This architecture will facilitate modularity and adaptation throughout the system's lifecycle. 

Key scientific challenges include:

- making digital twins composable and reusable. They have the right granularity and representativeness of the structure of the actual twin system.
- composing digital twin to be faithful to the real system.
- defining a set of rules for composing independent and scalable digital twins systems.
- considering continuous growth, continuous change, increasing complexity, and decreasing quality, inherent in complex software systems.

The aim of this thesis is therefore to address the obstacles to the architecture of such a system, considering the rules of composability of digital twins, the constraints to be taken into account, and the level of granularity of the composition, while considering the two dimensions of the digital twin.

The work will lead to the following results:

- A reflection on the granularity and representativeness of the structure of a digital twin system (should the structure of a digital twin be similar to the system represented?);
- A digital twin metamodel integrating the independence of components, their interconnection (geographical independence), and the connection with the real system;
- An architecture allowing the federation of components while ensuring an incremental development process (functional and managerial independence).

The results of this thesis will directly contribute to the Artemis platform, an open-source framework set to become a benchmark in the field.

## Work Environment

The PhD candidate will be co-supervised by Jannik Laval, Université de Lyon 2 and Sylvain Guérin, IMT-Atlantique within [DISP laboratory](https://www.disp-lab.fr).

The candidate will benefit from a stimulating scientific and industrial environment of the highest level, with access to a national network of leading research institutions and industry partners, regular interactions with the broader EDT community through workshops, seminars, and joint demonstrators, and the opportunity to contribute to Artemis, the program's open software platform.

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
- Russell L. Ackoff, Towards a System of Systems Concepts, Management Science, Jul., 1971, Vol. 17, No. 11, Theory Series (Jul., 1971), pp. 661-671, Stable URL: <https://www.jstor.org/stable/2629308>
- Meriem Smati, Vincent Cheutet, Christophe Danjou, Jannik Laval. Digital Twin System of Systems: A Layered Architecture Proposal. 13th International Conference on Model-Based Software and Systems, Engineering (MODELSWARD 2025), Feb 2025, Porto, Portugal. hal-04990305
- Meriem Swati, The Use of Cognitive Digital Twins on an IoT System for Edge Resilience and Anomaly Detection, Mémoire de fin d'études, *Ecole Supérieure en Informatique -08 Mai 1945- Sidi Bel Abbes*, 2023