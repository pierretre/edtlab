---
id: uc12
title: Care Process Digital Twin
provider: Mines Saint-Étienne
contacts:
  - name: Thierry Garaix
    org: Mines Saint-Étienne
    email: garaix@emse.fr
    role: Associate Professor
summary: >-
  Digital twin of the multistep hospital care pathway - from admission to rehabilitation - combined with the
  working process of medical and paramedical resources. Surgery, emergency and cancer treatment are the main
  use cases, aiming to simulate and optimise the organisation of care and staff.
usersCount: 0
lang: en
photo: /media/uploads/uc12.png
# domain : industrial-engineering | energy | geospatial | maritime | telecommunications | environment | health | robotics | agriculture | other
domain: health
# maturity : concept | poc | prototype | operational
maturity: prototype
# originType : natural | anthropic | engineered | infrastructure | process
originType: process
# version : identifiant de version du UC (ex r0.1, r1.0, ...). La dernière est affichée par défaut sur la liste.
version: r1.0
# draft or published
status: published
tags:
  - sante
  - parcours-de-soins
  - gestion-des-ressources
  - jumeau-numerique
  - simulation
  - aide-a-la-decision
publishedDate: 2026-07-21T00:00:00.000Z
---

## Summary

The physical system under study is the hospital care pathway: the multistep process from admission to
rehabilitation, combined with the working process of medical and paramedical resources (physicians, nurses,
operating rooms, beds). Surgery, emergency care and cancer treatment are the main use cases.

The digital twin is a monitoring, prediction and decision-support software based on data analytics and
detailed process models - a network of digital twins covering several care units and hospital partners.
It supports simulation of future care-offer and demand scenarios, the design of optimised organisational
configurations, fair and coordinated regulation of care pathways, and staff training for crisis or new
organisational settings.

The use case is carried out with several hospital and research partners, including CHU Saint-Étienne,
Hôpital Le Corbusier (Firminy), AÉSIO Santé, IMT Mines Albi-Carmaux and Télécom SudParis. Different versions
are developed and tried out in situ depending on the service (operating room, emergency department) and the
hospital partner.

---

## Functional Description

### Users

- **A care pathway manager** - monitors patient flow and resource load to organise care delivery.
- **A hospital administrator / regulator** - arbitrates organisational configurations and pathway regulation across units.
- **A medical/paramedical staff member** - is trained on crisis situations or new organisational settings via simulation.
- **A researcher / process analyst** - studies real patient pathways and resource usage to calibrate models.

### Functional Requirements

- **Steer** · *A department head* monitors activity in real time and is alerted to upcoming risks. Can anticipate the system's evolution without action, or with managerial actions simulated within the system. **Metric:** gap between planned and observed activity, in both monitoring and simulation mode.

- **Predict + Optimise** · *A care pathway manager* wants to simulate and evaluate future care-offer and demand scenarios to propose optimised organisational configurations, ahead of capacity-planning decisions. **Metric:** scenarios compared on resource load and pathway indicators (waiting time, occupancy).

- **Optimise + Describe** · *A hospital administrator* wants to support a fair and coordinated regulation of care pathways across services to balance load between units, in day-to-day operations. **Metric:** reduction in pathway imbalance / waiting-time variance across units.

- **Diagnose** · *A researcher* wants to analyse real patient pathways from indoor tracking and monitoring data to identify bottlenecks and calibrate simulation models, during model-development phases. **Metric:** patient pathways reconstructed and compared against modelled pathways.

- **Train + Describe** · *A medical/paramedical staff member* wants to train on crisis or new organisational settings using detailed monitoring and simulation (including VR) to prepare for real operational changes, ahead of deployment. **Metric:** number of scenarios covered by training sessions.

---

## Digital Twin Characterisation

*Grid based on the <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">unified framework by Gil et al. (2024)</a> - 21 characteristics.*

### MC1 - System under study

The hospital care pathway: the multistep process from patient admission to rehabilitation, combined with the
working process of medical and paramedical resources (physicians, nurses, operating rooms, beds, waiting
areas). Surgery, emergency care and cancer treatment are the main use cases, situated within one or several
hospital units (e.g. CHU Saint-Étienne, Hôpital Le Corbusier).

### MC2 - Physical Acting Components

No direct actuator: the digital twin is decision-oriented. Outputs (recommendations, optimised
configurations, training scenarios) are consumed by human operators - care pathway managers, administrators,
staff.

### MC3 - Physical sensing components

- Indoor tracking system - real-time patient and staff location within care units
- Hospital information systems - patient admission, discharge and transfer events, resource occupancy

### MC4 - Physical-to-Virtual Interaction

Exploitation of the indoor tracking system and hospital process data to reconstruct real patient pathways and
resource usage, feeding the monitoring and simulation models. Frequencies and formats to be specified.

### MC5 - Virtual-to-Physical Interaction

No direct command on physical resources: the digital twin produces a real-time control dashboard, simulation
results and optimised organisational configurations, consumed by care pathway managers and administrators.

### MC6 - Digital Twin Services

- Real-time control dashboard of patient and resource load
- Detailed monitoring and discrete-event simulation of care units
- Simulation and evaluation of future care-offer and demand scenarios
- Proposal of optimised organisational configurations
- Staff training environment (including VR) for crisis or new organisational settings
- Analysis of real patient pathways from indoor tracking data

### MC7 - Twinning Time-scale

Combines real-time monitoring (indoor tracking, control dashboard) with simulation of tactical/strategic
scenarios (organisational configuration, capacity planning). Not a closed real-time control loop.

### MC8 - Multiplicities

A network of digital twins: multiple care units and hospital partners (CHU Saint-Étienne, Hôpital Le
Corbusier) are modelled, with the ability to coordinate across the network.

### MC9 - Life-cycle Stages

Covers care-pathway operations (admission to rehabilitation) and organisational design/planning (evaluation
of future configurations), as well as staff training.

### MC10 - Digital Twin Models and Data

- Detailed process models of care units (discrete-event simulation)
- Data-driven models fed by real patient pathway analysis and indoor tracking
- Data: patient admission/discharge/transfer events, indoor location traces, resource occupancy

### MC11 - Tooling and Enablers

Real-time control dashboard, detailed monitoring/simulation software, VR-based training environment,
exploitation of an indoor tracking system.

### MC12 - Digital Twin Constellation

Pipeline: indoor tracking and hospital data ingestion → analysis of real patient pathways → detailed
process/simulation models → control dashboard, optimised configurations and VR training outputs. A network of
digital twins coordinated across care units.

### MC13 - Twinning Process and Digital Twin Evolution

Incremental approach built with hospital partners (CHU Saint-Étienne, Hôpital Le Corbusier) and research
partners (IMT Mines Albi-Carmaux, Télécom SudParis). Details to be specified as the network of digital twins
matures.

### MC14 - Fidelity and Validity Considerations

Calibration against analysis of real patient pathways from indoor tracking data. Validation approach and
error metrics to be specified.

### MC15 - Digital Twin Technical Connection

Connection to the indoor tracking system and hospital information systems. Protocols to be specified.

### MC16 - Digital Twin Hosting/Deployment

In the partner hospitals.

### MC17 - Insights and decision-making

- Real-time control dashboard of care-unit load
- Optimised organisational configurations for care-offer and demand scenarios
- Fair and coordinated regulation recommendations across care pathways
- Training feedback for staff facing crisis or new organisational settings

### MC18 - Horizontal integration

Involves multiple hospital partners (CHU Saint-Étienne, Hôpital Le Corbusier, AÉSIO Santé) and research
partners (IMT Mines Albi-Carmaux, Télécom SudParis), coordinating a network of digital twins across care
units.

### MC19 - Data ownership and privacy

Patient pathway and location data are sensitive health data. Governance and regulatory compliance (health
data protection) to be formalised across the hospital partners.

### MC20 - Standardisation

To be specified.

### MC21 - Security and Safety Considerations

Handling of sensitive patient data (location, pathway) requires access control and health-data protection
measures. No direct control loop - operational safety risk limited to the decision-support scope.

---

## Scientific and Technical Challenges

*Each challenge is annotated with research questions (RQ_X) from the EDT research roadmap [[Combemale et al., 2025](https://inria.hal.science/hal-05223776)].*

### Coordinating a network of digital twins

Coordinating the network of digital twins across care units and hospital partners, so that local
optimisations remain consistent with global, fair and coordinated regulation of care pathways.

Associated RQs: RQ_C5 (federated access coordination), RQ_D10 (cross-DT data aggregation)

### Data-driven combinatorial optimisation

Designing efficient data-driven combinatorial optimisation models and algorithms to propose optimised
organisational configurations for complex, multistep care pathways with resource constraints.

Associated RQs: RQ_D8 (AI model training), RQ_T5 (quality properties per use case)

### Automated model calibration

Automating the setting of models via Bayesian inference and reinforcement learning, to keep simulation and
optimisation models aligned with observed care-pathway behaviour without extensive manual tuning.

Associated RQs: RQ_D6 (simulation model evolution), RQ_D9 (AI model CRUD interface)

### FAIR access to historical and real-time data

Managing FAIR (Findable, Accessible, Interoperable, Reusable) access to historical and real-time care-pathway
data - including sensitive indoor tracking and patient data - across the network of hospital partners.

Associated RQs: RQ_D3 (heterogeneous data collection), RQ_E5 (data security and traceability)

---

## References

- [Poster - Care process DT for complex demand with resource management](/media/use-cases/uc12-poster-care-process-mines-saint-etienne.pdf) - Thierry Garaix, Mines Saint-Étienne - Use Case Workshop, Lyon, 6-7 January 2026
- Combemale B., Vicat-Blanc P., Blouin A., Bril El Haouzi H., Bruel J.-M. et al. [Engineering Digital Twins: A Research Roadmap](https://inria.hal.science/hal-05223776). EDTconf 2025 - 2nd International Conference on Engineering Digital Twins, Oct 2025, Grand Rapids, Michigan, United States. pp.1-7. ⟨hal-05223776⟩ - scientific roadmap of the EDT programme (RQ_X codes).

## Ongoing Theses
