---
title: "Navigating through the temporal aspects of the digital twin"
type: "PhD"
pc: PC5
location: "Rennes, France"
expectedStartDate: "October 2026"
filled: false
publishedDate: 2026-03-15
description: "PhD position in Human-Computer Interaction and Virtual Reality focusing on immersive interfaces for digital twin systems"
requirements: ["Master's degree in Computer Science, HCI, VR or related field", "Experience with VR/AR technologies", "Strong programming skills (C#, JavaScript, Python)", "Knowledge of 3D graphics and visualization", "Fluency in English and French"]
contacts: ["valerie.gouranton@irisa.fr"]
---

## Position Overview

We are seeking a highly motivated PhD candidate to join the PC5 team working on Human-Digital Twin Interaction. This PhD position focuses on Human-Computer Interaction (HCI), Artificial Intelligence (AI), Virtual Reality (VR), and digital twin systems, with a particular emphasis on the temporal dimensions of digital twins.

The objective of the PhD is to investigate how users can interact with digital twins whose data, models, and states evolve across multiple temporal dimensions: past, present, future, and alternative scenarios. The work will focus on designing software architectures, temporal data models, AI-enhanced analysis methods, immersive visualizations, and interaction techniques that enable users to explore, compare, and understand the temporal behavior of complex systems represented by digital twins.

The thesis will be grounded in two main application domains:

1. **Industrial systems**: operational dynamics, monitoring, diagnosis, prediction, and scenario comparison.
2. **Territorial evolution**: archaeological landscapes, long-term transformations of inhabited environments.

These domains will serve as primary use cases for designing, implementing, and evaluating the proposed approach.

The thesis will also establish links with two complementary use cases of the broader Engineering Digital Twins (EDT) program:

- The geological CO₂ storage digital twin: real-time data assimilation, uncertainty updates, risk quantification, anomaly detection.
- The Digital Twin of France and its Territories: open 3D geodata, interaction capabilities, simulation of physical phenomena.
- The Care Process Digital Twin for complex demand with resource management: access to historical and real-time data.

These use cases will provide points of alignment, comparison, and generalization within the EDT program, particularly regarding multi-scale systems, prospective simulation, real-time data assimilation, uncertainty-aware prediction, anomaly detection, and decision support.

## Research Focus

In this PhD, a digital twin is defined as the digital counterpart of a physical entity or system, aggregating models, heterogeneous data, simulations, AI components, and interaction capabilities to support visualization, monitoring, analysis, prediction, control, and decision-making.

A key characteristic of digital twins is their dynamic nature: the data they exploit and generate are intrinsically temporal. A digital twin does not only represent the current state of a physical system; it may also provide access to past states, reconstructed trajectories, possible futures, and alternative scenarios.

This thesis will investigate the concept of an **omnichronic digital twin**, defined as a digital twin capable of describing, exposing, and maintaining coherent representations of its system across multiple temporalities: past, present, and future. Such a twin should allow users to:

- Explore historical evolutions.
- Understand the current state of the system.
- Compare alternative scenarios.
- Anticipate future dynamics.
- Reason about uncertainties or inconsistencies between temporal states.

The main objective of the PhD is to develop an architecture and interaction framework enabling users to navigate, compare, and understand the temporal dimensions of complex digital twins. This raises architectural, AI, and HCI challenges, including:

- How to structure temporal data and models.
- How to synchronize past, present, and simulated states.
- How to exploit AI methods to infer missing states, detect anomalies, predict future trajectories, or characterize uncertainty.
- How to design immersive interfaces that make temporal exploration understandable and actionable.

AI will be a key component of the omnichronic digital twin, contributing to:

- Data assimilation.
- Temporal pattern recognition.
- Anomaly detection.
- Predictive modeling.
- Surrogate modeling.
- Uncertainty estimation.
- Scenario generation.
- Explanation support.

However, the PhD will not focus solely on algorithmic performance. A central issue will be how AI-generated outputs can be represented, questioned, and manipulated by users in immersive environments, while preserving interpretability, trust, and temporal coherence.

The thesis will contribute to Human-Digital Twin Interaction by addressing a central question: **How can users interact with a digital twin that is not limited to the present moment but is able to expose, relate, explain, and question multiple temporal states of a system?**

## Scientific Challenges

### From an Architectural and AI Perspective

The digital twin must support:

- Coherent state representation across past, present, and future states.
- Synchronization between real-time data, historical data, and simulated states.
- Explicit representation of uncertainty, confidence, and temporal validity.
- Multi-scale temporal data, from near real-time monitoring to long-term evolution.
- Lifecycle management of models, simulations, data sources, and AI components.
- Interoperability between heterogeneous data formats, models, visualization systems, and AI services.
- Traceability of transformations linking observed, reconstructed, AI-inferred, simulated, and predicted states.
- Integration of AI models for prediction, anomaly detection, uncertainty estimation, and scenario generation.
- Explainability and traceability of AI-generated temporal states.

### From a Human-Computer Interaction and Immersive Visualization Perspective

Users must be able to:

- Navigate temporal layers without losing system coherence.
- Compare states across time and scenarios.
- Distinguish between measured, reconstructed, AI-inferred, simulated, predicted, or uncertain information.
- Understand temporal causality, trends, anomalies, and scenario impacts.
- Interpret AI-generated predictions, classifications, or anomalies in relation to the underlying physical system.
- Question, compare, and refine AI-supported scenarios through interactive exploration.
- Interact with large and complex 3D digital twins through intuitive temporal exploration techniques.
- Reason about uncertainty and alternative interpretations without data fragmentation.

## Primary Application Domains

### 1. Industrial Systems and Operational Dynamics

The first domain focuses on using temporal data stored within a digital twin to support analysis, anticipation, and decision-making in industrial systems. Digital twins can help users:

- Explore system history.
- Identify root causes of failures.
- Detect trends and behaviors preceding incidents.
- Understand the role of operating conditions, triggering events, or performance anomalies.

Key objectives:

- Support hindsight: analyzing past incidents, reconstructing event chains, understanding causal relationships.
- Support foresight: simulating future behaviors, comparing alternative configurations, anticipating risks or performance degradation.

AI methods are particularly relevant for:

- Anomaly detection.
- Temporal pattern recognition.
- Root-cause analysis.
- Predictive modeling.
- Scenario generation.

The challenge for the PhD will be to connect AI capabilities with interactive and immersive exploration tools, ensuring users understand not only what the system predicts or detects but also why a temporal trajectory is considered abnormal, risky, or relevant for decision-making.

Research questions in this domain include:

- Navigating between historical traces, current monitoring data, and predicted future states.
- Identifying failures, anomalies, and their temporal development.
- Comparing planned, simulated, and observed system behaviors.
- Supporting root-cause analysis through temporal exploration.
- Integrating AI-based anomaly detection, prediction, and root-cause analysis into interactive temporal exploration.
- Making AI-generated alerts, predictions, and confidence levels interpretable for users.
- Representing uncertainty and confidence in future trajectories.
- Designing immersive decision-support interfaces for monitoring, diagnosis, and anticipation.

This domain connects naturally with the EDT use case on geological CO₂ storage, which focuses on:

- Near real-time data assimilation.
- Uncertainty updates.
- Predicting future dynamics under different uncertainties.
- Quantifying risks.
- Detecting or anticipating anomalies, for example leaks.

It also connects, on a narrower perspective, with the Care Process Digital Twin for complex demand with resource management use case, especially on the FAIR access management of historical and real-time data. Another relevant connection with the Digital Factory Digital Twin use case for predicting and mitigating the impacts of climate change relates to the simulation of climate change scenarios.

### 2. Territorial Evolution and Archaeological Landscapes

The second domain focuses on temporal exploration of territorial evolution, particularly in archaeological landscapes, heritage territories, and long-term transformations of inhabited environments.

Traditional archaeological research relies on GIS maps, stratigraphic diagrams, excavation records, and spatial databases, but XR and digital twin technologies enable immersive exploration of reconstructed landscapes, hidden layers, and competing hypotheses.

Key challenges:

- Articulating heterogeneous data sources: archaeological remains, historical records, geophysical data, environmental models, dating uncertainties, excavation phases, spatial infrastructures, alternative scholarly hypotheses.
- Enabling users to explore reconstructed past states, compare competing interpretations, understand site/territory evolution, and make explicit the uncertainty attached to each temporal layer.
- Making AI-supported reconstructions and scenarios understandable in XR, by distinguishing observed evidence, expert interpretation, AI-inferred states, and simulated futures.

Research questions in this domain include:

- Navigating between local site-scale data and broader territorial dynamics.
- Representing long-term transformations of landscapes, settlements, infrastructures, and environmental systems.
- Integrating heterogeneous spatial and temporal data.
- Visualizing invisible or abstract layers, for example underground structures, environmental processes, former territorial organizations.
- Integrating AI-supported reconstruction, interpolation, or classification methods into temporal exploration.
- Distinguishing observed, expert-interpreted, AI-inferred, and simulated territorial states.
- Making uncertainty and hypotheses visible in immersive temporal exploration.
- Designing interaction techniques for comparing temporal states, territorial trajectories, and interpretative scenarios.

This domain connects with the EDT use case on the Digital Twin of France and its Territories, which focuses on:

- Building a dynamic and prospective digital model of the territory.
- Providing open-source technical foundations and open 3D geodata sets.
- Supporting geographical digital twin initiatives in France.

## Research Questions

The PhD will address the following research questions:

1. **Temporal architecture and coherence:** How can a digital twin maintain coherent representations of past, present, and future states while integrating measured data, reconstructed states, AI-inferred states, simulation outputs, predictions, and uncertainties?
2. **AI-enhanced temporal modeling:** How can AI methods support temporal exploration in digital twins, for example data assimilation, anomaly detection, missing-state reconstruction, predictive modeling, scenario generation, and uncertainty estimation?
3. **Multi-scale temporal representation:** How can temporal data be represented across heterogeneous scales, for example near real-time monitoring vs. long-term territorial/archaeological/environmental transformations?
4. **Interaction with temporal layers and AI outputs:** How can users interactively explore, compare, and manipulate temporal states, including AI-generated predictions or inferred states, in immersive environments without losing system coherence?
5. **Uncertainty, explainability, and status of information:** How can immersive interfaces make explicit the status of information — observed, inferred, reconstructed, AI-generated, simulated, predicted, uncertain, or conflicting — to support understanding, trust, and decision-making?
6. **Scenario-based reasoning:** How can users compare alternative futures, planned scenarios, and observed evolutions for applications such as industrial diagnosis, risk monitoring, anomaly anticipation, territorial reasoning, archaeological interpretation, or operational decision support?

## Research Environment

The position is based in Rennes, within the SEAMLESS team at Inria/IRISA, under the supervision of Prof. Valérie Gouranton and Prof. Jean-Yves Didier from Université Évry Paris-Saclay (IRA2 team, IBISC laboratory). The PhD will also be co-supervised by Ronan Gaugne from Inria/IRISA (SEAMLESS team) and Théophane Nicolas (Inrap).

## Qualifications

### Required

- Master’s degree in Computer Science, HCI, AI, Virtual Reality, Data Visualization, or a related field.
- Strong background in at least one of the following: AI, Machine Learning, 3D graphics, visualization, interaction design, or VR/AR technologies.
- Programming skills in C++, C#, JavaScript, or Python.
- Interest in digital twins, temporal data, simulation, AI-enhanced analysis, and interactive systems.
- Excellent written and oral communication skills in English and French.
- Strong analytical and problem-solving abilities.

### Preferred

- Experience with machine learning methods for time-series analysis, anomaly detection, predictive modeling, uncertainty estimation, or data fusion.
- Familiarity with explainable AI, human-AI interaction, or AI-assisted decision support.
- Experience with game engines such as Unity or Unreal Engine.
- Knowledge of user experience design and evaluation methods.
- Familiarity with web technologies, real-time systems, or data visualization frameworks.
- Experience with 3D geodata, simulation data, scientific visualization, or digital twin platforms.
- Previous research experience in AI, HCI, XR, visualization, or digital engineering.

## Funding and Benefits

- **Duration:** 3 years.
- **Expected start date:** October 2026.
- **Location:** Rennes, France.
- **Salary:** PhD stipend according to French standards.
- **Benefits:** Health insurance, social security, professional development support.
- **Travel:** Support for conference attendance and research collaborations.

## About SEAMLESS / IRISA / Inria Rennes

The SEAMLESS team collaborates with teams in archaeology, cultural heritage, museology, and immersive technologies on designing innovative methods and tools combining XR, digital imaging, 3D reconstruction, and additive technologies. The team is currently involved in projects related to digital twins, XR for archaeology and cultural heritage, immersive interaction, and cognitive archaeology in virtual environments.

## About IRA2 / IBISC / Université Évry Paris-Saclay

The IRA2 team specializes in Human-Machine Interaction, including robotics, extended reality, and industrial applications. The team investigates the links between digital twins, immersive technologies, and industrial use cases, in collaboration with partners such as IRT SystemX and the Innovation Center in Évry.

## Bibliography

### Territorial Evolution and Archaeological Landscapes Use Case

Haibt, M. (2024). End-to-end digital twin creation of the archaeological landscape in Uruk-Warka (Iraq). *International Journal of Digital Earth, 17*(1). <https://doi.org/10.1080/17538947.2024.2324964>

Pavlidis, G., Koutsoudis, A., Tsiafaki, D., Karta, M., Sevetlidis, V., Arampatzakis, V., Sarris, A., Polidorou, M., Klinkenberg, V., Boukhers, Z., Kong, L., Farinetti, E., Moreno Navarro, F., Kakogiannos, I., Aparicio, S., Ortega Heras, J., Ramonet, F., Agapiou, A., Hadjipetrou, S., … Saloustros, S. (2025). *Future-Proofing Heritage with ARGUS: A Multimodal Digital Twin Approach for Sustainable Preservation*. <https://doi.org/10.5281/zenodo.17755550>

Spence Morrow, G., & Wernke, S. A. (2023). Thinking through the tool: collaborative archaeological bodywork in immersive virtual reality. *Virtual Archaeology Review, 15*(30), 21–34. <https://doi.org/10.4995/var.2024.19806>

Ren, L., Dong, J., Zhang, L., Laili, Y., Wang, X., Qi, Y., ... & Deen, M. J. (2024). Industrial metaverse for smart manufacturing: Model, architecture, and applications. *IEEE Transactions on Cybernetics, 54*(5), 2683–2695. <https://doi.org/10.1109/TCYB.2024.3372591>

Li, S., Xie, H. L., Zheng, P., & Wang, L. (2024). Industrial Metaverse: A proactive human-robot collaboration perspective. *Journal of Manufacturing Systems, 76*, 314–319. <https://doi.org/10.1016/j.jmsy.2024.08.003>
