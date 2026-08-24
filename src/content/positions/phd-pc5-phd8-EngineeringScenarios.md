---
# Please respect these sections and template for good integration in the web site
title: "Modeling Interaction Scenarios for Digital Twins in Mixed Reality" # Avoid accents in title
type: "PhD"  # Options (Limited): "PostDoc", "PhD", "Engineer", "Intern"
pc: PC5
location: "Brest, France"
expectedStartDate: "Q4 2026"  # Expected start date - flexible format: "Spring 2025", "Q2 2025", "2025-06-01", etc.
publishedDate: 2026-04-01  # Date when job offer was published in YYYY-MM-DD format
filled: false  # Position availability status: true if position is filled, false if still available
description: "The effective use of digital twins requires interactive scenarios capable of organizing the system’s objectives, roles, activities, and behaviors within a real-time framework. This requirement is further heightened in mixed reality, where the user interacts with both digital representations and a physical environment, necessitating the joint design of the business model, interaction, and scenario execution." # Brief summary of the position (2-3 sentences) for list summury printing. The detailed description goes in the Body section below.
requirements: ["Master degree in computer science", "Experience with digital twins", "Programming skills"] # Some requirements in a list
contacts: ["querrec@enib.fr", "Valerie.Gouranton@irisa.fr", "vhavard@cesi.fr", "elodie.bouzekri@univ-brest.fr"]  # Array of contact emails for this position
---

## Context

Digital twins are playing an increasingly important role in the industrial, energy, urban planning, and environmental sectors, where they are used to represent, simulate, and predict the behavior of complex systems. In these contexts, their value extends beyond visualization: they serve as tools for training, decision support, monitoring, failure prediction, and resource optimization [1,2]
However, the effective use of these digital twins requires interactive scenarios capable of organizing the system’s objectives, roles, activities, and behaviors within a real-time framework. This requirement is further heightened in mixed reality, where the user interacts with both digital representations and a physical environment, necessitating the joint design of the business model, interaction, and scenario execution.

The thesis aims to design a scenario model for digital twins and the associated authoring tools, in order to enable domain experts to describe, instantiate, and execute interactive scenarios. In this context, a scenario is defined as the interplay of four dimensions: objectives, environments, roles, and interactive activities.
The first dimension concerns objectives. These include both high-level objectives, such as understanding, learning, or demonstrating, and implementation objectives, such as assigning tasks, reacting to an event, or managing an activity. These objectives depend on the uses of the digital twin, whether for training, business operations, failure prediction, or resource allocation.
The second dimension concerns environments. Here, it is important to distinguish between the scenario’s supporting environment—such as virtual reality, augmented reality, an educational resource, or a technical document—and the business environment, that is, the digital twin itself. The main scientific challenge concerns the representation of this digital twin, which can be based on discrete automatic system models, physical models, task models, or social models.
The third dimension concerns roles. Participants play roles in the scenario, such as expert, learner, trainer, mediator, or decision-maker. These roles are not necessarily the same as those in task models, even though a scenario may involve a role derived from a specific task model. Furthermore, the number of roles to be played in a scenario may exceed the number of participants. This raises the question of how to assign a role to an autonomous agent and how that agent should interact to ensure the scenario is executed successfully.
The fourth dimension encompasses the activities that form the core of the scenario. These activities are inherently interactive and take place in real time. They involve orchestrating actions linked to business domain models, carried out through interactions within an immersive or mixed environment. The central challenge is therefore to link the interaction paradigms available in mixed reality to the relevant actions on the business model.
Based on this definition, the thesis’s research question is to design a scenario model that is sufficiently generic to cover various uses of the digital twin, while remaining operable via an authoring tool accessible without advanced computer skills. The tool must guide scenario design based on explicit objectives, following a “authoring by doing” or activity-oriented authoring approach. The thesis thus rests on the hypothesis that such a tool must be based on an explicit and manipulable model of the digital twin, that is, on a form of meta-model capable of representing the physical, functional, social, and task models mobilized in the scenario.

## Thesis Objectives

The project is based on several use cases covering dynamic, distributed, and multiscale systems. The first set concerns dynamic, multi-scale territorial representation, integrating physical, environmental, and socio-economic dimensions. In addition, there are cases involving sensor systems for state prediction, communication networks for resource optimization and allocation, radio propagation, multi-energy networks, thermal loops, and low-power systems.
These use cases are heterogeneous from a business perspective, but they share several modeling invariants: entities, states, events, relationships, constraints, resources, and objectives. This observation justifies the search for a meta-model capable of supporting multiple types of business models, while allowing for the definition of scenarios tailored to each application context. The scenario should therefore not be conceived as a narrative overlay independent of the system, but as a structure linking an objective, a business model, roles, and interactive activities.
For use cases focused on communication, sensors, and state prediction, research on digital twins highlights the need to explicitly represent information flows, real-time updates, relationships between sensors and business functions, as well as simulation and forecasting capabilities [3]. For cases related to energy, thermal systems, or infrastructure, the literature emphasizes the importance of a multi-model representation integrating physical, temporal, and decision-making dimensions [4]. Finally, for cases focused on training, assistance, or cooperation, research on VR and MR shows that scenario design must include roles, tasks, interactions, and forms of guidance [5].

The first scientific challenge concerns the definition of a generic scenario model for digital twins. Existing research offers relevant solutions for immersive education, training authoring, or certain industrial contexts, but these approaches often remain specialized and do not fully address situations where multiple types of models, roles, and interaction modalities must be coordinated within a real-time framework.
The second challenge concerns the definition of a meta-model for the digital twin. To be manipulable by an authoring tool, the digital twin must be represented in an explicit, structured, and sufficiently abstract manner to cover multiple application domains. The goal is to integrate physical, functional, discrete, social, and task models within a single representation, without losing the business-specific nature of the use cases.
The third challenge concerns the link between mixed-reality interaction and business actions based on the roles assigned during the execution of the scenario. It is not enough to describe the expected actions; an explicit correspondence must also be established between the available interaction paradigms—3D manipulation, gestures, selection, pointing, multimodality—and the relevant actions on the business model, while taking into account the roles assigned to users and those left to autonomous agents during scenario execution. This mapping is essential to make the scenario understandable, executable, and reusable.

## Work Environment

The PhD candidate will be co-supervised by Ronan Querrec, Bretagne INP - Lab-STICC, Valérie Gouranton, INSA Rennes - IRISA, Vincent Havard, CESI Rouen, LINEACT, Eloidie Bouzekri UBO - Lab-STICC.

## What You Will Gain from This PhD

This PhD offers the opportunity to:

- Develop highly sought-after skills in system modeling, real-time data processing, and collaborative innovation.
- Collaborate with leading partners (Inria, CEA, CNRS, etc.) and validate your research on real-world industrial use cases.
- Join a network of PhD candidates within the EDT program, fostering collaboration, peer support, and interdisciplinary exchanges.
- Contribute to an open-source platform (Artemis) and publish in international conferences and journals.
- Gain recognition in a rapidly growing field, with career prospects in academic research, industrial R&D, or entrepreneurship.

Upon completion, you will be positioned as a recognized expert in a key domain for industry and research, with diverse professional opportunities in France and internationally.

## References

[1] Barricelli, B. R., Casiraghi, E., & Fogli, D. (2019). A survey on digital twin: Definitions, characteristics, applications, and design implications. IEEE Access, 7, 167653–167671.

[2] Jones, D., Snider, C., Nassehi, A., Yon, J., & Hicks, B. (2020). Characterising the digital twin: A systematic literature review. CIRP Journal of Manufacturing Science and Technology, 29, 36–52.

[3] Antoun, M., Elhajj, I.H., Sayour, M. et al. Interactive digital twins enabling responsible extended reality applications. Sci Rep 15, 34539 (2025). <https://doi.org/10.1038/s41598-025-17855-9>

[4] Moghadam, M. S., Natephra, W., & Motamedi, A. (2021). BIM- and IoT-based virtual reality tool for real-time thermal comfort assessment in building enclosures. Building and Environment, 199, 107905. <https://doi.org/10.1016/j.buildenv.2021.107905>

[5] Alshammari, M., et al. (2023). Evaluating the use of mixed reality in CSI training through the integration of the task-technology fit and technology acceptance model. IEEE Access. <https://doi.org/10.1109/ACCESS.2023.3323949>

Bouzekri, E., Martinie, C., Palanque, P., Atwood, K., Gris, C.: Should I Add Recommendations to My Warning System? The RCRAFT Framework Can Answer This and Other Questions About Supporting the Assessment of Automation Designs. In: Ardito, C., Lanzilotti, R., Malizia, A., Petrie, H., Piccinno, A., Desolda, G., and Inkpen, K. (eds.) Human-Computer Interaction – INTERACT 2021. pp. 405–429. Springer International Publishing, Cham (2021). <https://doi.org/10.1007/978-3-030-85610-6_24>.

Havard, V., Courallet, A., Baudry, D., & Delalin, H. (2023, May 9). Digital twin, virtual reality and OPCUA-based architecture for pedagogical scenarios in manufacturing and computer sciences curriculum. In Proceedings of the 13th Conference on Learning Factories (CLF 2023). <https://doi.org/10.2139/ssrn.4457032>

Lécuyer, F., Gouranton, V., Reuzeau, A., Gaugne, R., & Arnaldi, B. (2019, June). Create by doing - Action sequencing in VR. In Computer Graphics International (CGI), Calgary, Canada.

Querrec, R., Vallejo, P., & Buche, C. (2013). MASCARET: Creating virtual learning environments from system modelling. In The Engineering Reality of Virtual Reality 2013 (Vol. 8649). SPIE.

Risy, M., Gouranton, V., & Arnaldi, B. (2024). Handing pedagogical scenarios back over to domain experts: A scenario authoring model for VR with pedagogical objectives. In Proceedings of the 19th International Joint Conference on Computer Vision, Imaging and Computer Graphics Theory and Applications (GRAPP).

Risy, M., Arnaldi, B., & Gouranton, V. (2026). SAMPO, a scenario authoring model for virtual reality with pedagogical objectives: An authoring perspective. Communications in Computer and Information Science.

Richard, K., Havard, V., & Baudry, D. (2021). Authoring-by-doing: An event-based interaction module for virtual reality scenario authoring framework. In L. T. De Paolis, P. Arpaia, & P. Bourdot (Eds.), Augmented reality, virtual reality, and computer graphics (pp. 519–527). Springer. <https://doi.org/10.1007/978-3-030-87595-4_38>

Richard, K., Havard, V., His, J., & Baudry, D. (2021). INTERVALES: Interactive virtual and augmented framework for industrial environment and scenarios. Advanced Engineering Informatics, 50, 101425. <https://doi.org/10.1016/j.aei.2021.101425>

Schiavi, B., Havard, V., Beddiar, K., & Baudry, D. (2021). Semi-automatic generation of virtual reality procedural scenarios for operation in construction based on 4D building information models. In Proceedings of the 21st International Conference on Construction Applications of Virtual Reality (pp. 104–111). <https://hal.science/hal-04098107>
