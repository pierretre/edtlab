---
# Please respect these sections and template for good integration in the web site
title: "AI-Assisted Model-Driven Security Engineering for Digital Twins: Toward an Automated Round-Trip Framework"
type: "PhD"
location: "Saclay, France"
expectedStartDate: "Fall 2026" 
publishedDate: 2026-04-09  
filled: false  
description: "This PhD thesis has the objective to address the challenges of modeling Digital Twins by integrating Artificial Intelligence (AI) assistance, enhanced security modeling, simulation and round-trip feedback." 
requirements: ["Master degree in computer science", "Programming skills", "Modeling skills", "English or French", "Experience with digital twins is a plus"] 
tags:
 - "PC3"  
contacts: ["marcos.didonetdelfabro@cea.fr", "brahim.hamid@irit.fr"]  # Array of contact emails for this position
---

## Description

The modeling of complex cyber-physical systems using standards such as UML and SysML remains a difficult task, currently lacking integration with Artificial Intelligence (AI) to assist the design process. While developers already use generative AI and prompting, these efforts are still not systematic. Integration of security concerns, either from standards or from experts knowledge, is mostly a manual process [2]. Round-trip engineering, which intend to synchronise design-time models and runtime execution feedback, remains under-explored [1]. Existing security platforms for Digital Twins (DT), are often proprietary and costly, and the process of applying security mitigations, or simulating scenarios before applying into the real infrastructure, remains unexplored.

## Research Objectives

The primary goal of this thesis is to study and define an assisted Model-Driven Engineering (MDE) framework, that helps closing the loop between design and execution

- Systematizing AI Integration and security modeling: creating an AI-assisted environment within modeling tools to move beyond prompting, assisting designers with security concerns.
- Automating Round-Trip Security Engineering: creating a platform where the cycle of Design -> Execution -> Re-design has improved automation
- Security Injection and Synchronization: developing mechanisms to update architectural models based on security reports, attack simulations, and vulnerability scans (e.g., Mitre ATT&CK or CVE data).
- Cyber-Security Simulation: Enabling the execution/simulation of complex attack scenarios on a Digital Twin reference architecture to evaluate system configurations without risking physical infrastructure.

## Proposed Methodology

The research will conduct a detailed research on current state of the art to refine and support the objectives previously presented. The study will enable to direct the research actions for a proposed framework. The basis artifacts initially used will be the Asset Administration Sheel (AAS) specification, which will serve as basis for DigitalTwin modeling. A formalisation of the framework and solution will be required, as well as the implementation and integration of a POC within the scope of the case studies of the EDT program.

## Work Environment

The PhD candidate will be co-supervised by [Pr. Brahim Hamid](https://www.irit.fr/~Brahim.Hamid/) (IRIT/UT2J) and [Dr. Marcos Didonet Del Fabro](https://www.linkedin.com/in/didonet/) (CEA List).

## References

[1] S. Peldszus, J. Bürger and J. Jürjens, "UMLsecRT: Reactive Security Monitoring of Java Applications With Round-Trip Engineering," in IEEE Transactions on Software Engineering, vol. 50, no. 1, pp. 16-47, Jan. 2024, doi: 10.1109/TSE.2023.3326366.

[2] Lifecycle Security for IoMT Systems: Bridging the Gap Between Design and Operation ,  Marcos Didonet Del Fabro, Mahender Kumar, Nabil Moukafih, Miroslaw Malinowski, Pascal Bannerot, Gregory Epiphaniou, Nikolaos Matragkas, IoTBDS, 2026, To appear.
