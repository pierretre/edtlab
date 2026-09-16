---
title: "Aggregation of digital twins in the manner of Systems of Systems"
type: "PhD" 
pc: PC2
host: INP-UGA, Verimag
supervisors:
  - name: Jannik LAVAL
    org: INP-UGA, Verimag
    role: director
  - name: Sylvain GUERIN
    org: IMT Atlantique, Lab-STICC P4S
    role: co-supervisor
startDate: 2026-09-01
researchStatus: ongoing
filled: true
researcher:
  name: Khaldi Anis Rabah
location: "Lyon, France"
expectedStartDate: "Autumn 2026"
publishedDate: 2026-03-16
description: "The goal is to develop a System of Systems approach from the design stage onwards. This will enable each component of the digital twin to be identified in relation to a physical system functionality, and their assembly will result in a complete digital twin through aggregation, whose lifecycle management will be controllable, just like the physical system."
requirements: ["Master degree in computer science", "Programming skills", "Modelling skills", "Experience with digital twins is a plus"]
contacts: ["Jannik.Laval@univ-lyon2.fr", "Sylvain.Guerin@imt-atlantique.fr"] 
references:
  - "edt-roadmap"
  - "russell-1971-system"
  - "meriem-2025-digital"
  - "meriem-2023-use"
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
