---
id: uc21
title: EcoBoatTwin
provider: Vectura System
contacts:
  - name: Sébastien Berthebaud
    org: Vectura System
    email: sebastien.berthebaud@vectura-system.com
summary: >-
  SaaS digital twin platform for energy optimisation and decarbonisation of working vessels (trawlers, service vessels, pushers, barges), integrating high-fidelity multi-physics models calibrated on real measurements, scenario-based simulations and economic/CO₂ models.
usersCount: 0
lang: en
photo: /media/use-cases/uc21-ecoboattwin-vectura.png
# domain : industrial-engineering | energy | geospatial | maritime | telecommunications | environment | health | robotics | agriculture | other
domain: maritime
# maturity : concept | poc | prototype | operational
maturity: prototype
# originType : natural | anthropic | engineered | infrastructure | process
originType: engineered
# version : identifiant de version du UC (ex r0.1, r1.0, ...). La dernière est affichée par défaut sur la liste.
version: r1.0
# draft or published
status: published
tags:
  - maritime
  - navire
  - décarbonation
  - hybride
  - tco
  - roi
  - saas
publishedDate: 2026-06-23T00:00:00.000Z
---

## Summary

The physical system under study consists of working vessels - trawlers, service vessels, pushers, barges - equipped with various powertrains (diesel, parallel hybrid, electric), hull geometries, fixed or variable-pitch propellers, hydraulic systems, fishing gear and on-board consumers. These vessels operate in variable maritime environments and generate heterogeneous data: propulsion, sea state, emissions, hydraulic loads, usage profiles.

EcoBoatTwin is a SaaS decision-support platform for naval architects, shipyards, shipowners and public authorities. It enables simulation, optimisation and comparison of vessel configurations and decarbonisation trajectories, integrating high-fidelity energy models (hull, propeller, engine, hybrid) calibrated on real measurements, fishing gear twins, scenario-based simulations and economic/CO₂ models (TCO, ROI).

The twin interacts with the physical twin through ingestion of real sensor data (model calibration), evaluation of design and retrofit variants (hybridisation, propeller optimisation), and simulation of port infrastructure needs for strategic planning at fleet scale.

---

## Functional Description

### Users

- **A naval architect** - explores design variants (hull, propeller, propulsion) and evaluates their energy performance before prototyping.
- **A shipyard** - sizes retrofits (hybridisation, new powertrain, optimised propeller) on existing vessels.
- **A shipowner** - arbitrates powertrain choices and fleet renewal timeline based on TCO and ROI.
- **A public authority / port** - models infrastructure needs (electric, H₂) to plan investments at fleet scale.

### Functional Requirements

- **Optimise** · *A naval architect* wants to simulate and optimise vessel configurations (hull/propeller/propulsion combinations) to achieve energy and environmental objectives, during the design phase. **Metric:** ≥ 3 configurations compared per operational scenario, consumption and CO₂e quantified.

- **Diagnose + Predict** · *A shipyard* wants to calibrate high-fidelity energy models from real sensor data (example with the HYBA project dataset, 80+ variables recorded over several months) to validate and improve the predictive accuracy of the twin. **Metric:** model vs measured consumption gap < business threshold on reference scenarios.

- **Evaluate + Predict** · *A shipowner* wants to predict the ROI of retrofit scenarios (hybridisation, new powertrain) on real operational cycles to decide on an investment. **Metric:** ROI over N years with sensitivity to energy prices and subsidies.

- **Optimise** · *A public authority* wants to model port infrastructure needs (electric charging, H₂) for strategic planning at fleet scale. **Metric:** infrastructure sizing aligned with adoption scenarios.

- **Describe + Evaluate** · *Various stakeholders* want to compare configurations and trajectories on common criteria (energy, CO₂e, cost) to align decisions. **Metric:** multi-stakeholder comparative dashboard.

---

## Digital Twin Characterisation

*Grid based on the <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">unified framework by Gil et al. (2024)</a> - 21 characteristics.*

### MC1 - System under study

Real working vessels (trawlers, service vessels, pushers, barges) and their sub-systems: propulsion (diesel, parallel hybrid, electric), hulls, fixed or variable-pitch propellers, hydraulic systems, fishing gear, on-board consumers. Operational environment: missions (fishing, towing, transport), sea state, weather conditions, port infrastructure.

### MC2 - Physical Acting Components

No direct control loop: the DT is a decision-support tool for design, retrofit and strategic arbitration. Outputs drive human decisions (architects, shipowners) or investment decisions (public authorities).

### MC3 - Physical sensing components

- 80+ on-board sensor channels (propulsion, hydraulics, sea state, emissions, usage)
- HYBA reference dataset for calibration
- External data (component databases, future fuel APIs)

### MC4 - Physical-to-Virtual Interaction

Ingestion of real sensor data for energy model calibration. Standardisation and calibration of 80+ heterogeneous sensor channels. Frequency and protocols to be specified according to on-board contexts.

### MC5 - Virtual-to-Physical Interaction

No direct command. DT outputs guide design choices (architect), retrofit decisions (shipyard), powertrain selection (shipowner) and infrastructure planning (port/authority).

### MC6 - Digital Twin Services

- Simulation and optimisation of vessel configurations and decarbonisation trajectories
- Calibration of high-fidelity energy models on real measurements
- Evaluation of design variants (hybridisation, powertrain, propeller)
- Modelling of port infrastructure needs (electric, H₂)
- ROI prediction on real operational cycles
- Multi-stakeholder comparison (architects, shipowners, authorities)

### MC7 - Twinning Time-scale

Not real-time for now: the DT is a simulation and decision-support tool. Analysis scales: mission (operational scenarios), vessel lifecycle (design, retrofit), fleet (strategic planning).

An embedded use for predictive energy optimisation could be envisaged in the near future.

### MC8 - Multiplicities

Multi-instance architecture: one twin per vessel or per type configuration. Aggregation at fleet scale for strategic planning and port infrastructure.

### MC9 - Life-cycle Stages

Covers design (architectural variants), retrofit (hybridisation, optimisation), operations (calibration, configuration comparison) and planning (port infrastructure). Partial LCA via economic and CO₂ modelling.

### MC10 - Digital Twin Models and Data

- **High-fidelity multi-physics energy models**: hull, propeller, thermal engine, hybrid, hydraulic
- **Digital twins of fishing gear**
- **Economic models (TCO, ROI)**, CO₂ and port infrastructure
- **3D hull reconstruction** by scan / video (unknown hulls)
- **Data**: HYBA dataset, sensor measurements (80+ channels), component databases, fuel APIs

### MC11 - Tooling and Enablers

SaaS web platform (multi-level UX/UI: basic, advanced and professional users). Technical details of the stack to be specified.

### MC12 - Digital Twin Constellation

Pipeline: measurement ingestion (HYBA and on-board) → multi-physics model calibration (hull, propeller, engine, hybrid, hydraulic) → mission scenario generator → optimisation/simulation engines → economic models (TCO, ROI) and infrastructure → multi-user interface (macro-scenarios, scenes, simulations).

### MC13 - Twinning Process and Digital Twin Evolution

Incremental approach: extension of the energy model to different vessel types (trawlers, service, pushers, barges) and progressive integration of fishing gear. Open calibration on new on-board datasets.

### MC14 - Fidelity and Validity Considerations

Calibration of high-fidelity models on 80+ real measurement channels (HYBA dataset). Validation by comparison of modelled vs measured consumption on characterised sea-state scenes. Approximate 3D reconstruction for undocumented hulls.

### MC15 - Digital Twin Technical Connection

Ingestion via API from on-board systems and component databases. Precise exchange protocols and standards to be specified.

### MC16 - Digital Twin Hosting/Deployment

SaaS - hosted web platform. Details (cloud, data centre, multi-tenant) to be specified.

### MC17 - Insights and decision-making

- Comparison of vessel configurations with consumption and CO₂e quantified per operational scene
- ROI of retrofit scenarios (hybridisation, powertrain, propeller)
- Port infrastructure sizing
- Multi-stakeholder dashboard (architects, shipowners, public authorities)

### MC18 - Horizontal integration

Integration of external component databases and fuel APIs planned. Connection to on-board systems for measurement ingestion.

### MC19 - Data ownership and privacy

On-board data (propulsion measurements, usage) potentially sensitive (shipowner competitiveness, architect intellectual property). Governance to be formalised in the multi-stakeholder SaaS context.

### MC20 - Standardisation

Naval energy standards and CO₂ reporting to be specified. Standardisation of 80+ sensor channels identified as a challenge.

### MC21 - Security and Safety Considerations

SaaS application security (authentication, tenant isolation). No real-time control loop - operational safety risks limited to the decision-making scope.

---

## Scientific and Technical Challenges

*Each challenge is annotated with research questions (RQ_X) from the EDT research roadmap [[Combemale et al., 2025](https://inria.hal.science/hal-05223776)].*

### Mission scenario automation

Automatically generate representative mission scenarios (bottom trawling, pelagic, sea state) for the evaluation and comparison of configurations.

Associated RQs: RQ_D6 (model evolution), RQ_E2 (modularisation)

### Multi-physics integration

Coupling and aligning complex models: hull, propeller, thermal engine, hybrid, hydraulic. Issues of numerical consistency, computation time and interfaces between disciplines.

Associated RQs: RQ_I3 (model hybridisation), RQ_I4 (hybridisation operators), RQ_F3 (composition and uncertainty)

### Heterogeneous data integration

Standardise and calibrate 80+ heterogeneous sensor channels. Issues of quality, timestamping, semantic consistency.

Associated RQs: RQ_D3 (heterogeneous data collection), RQ_D11 (semantic interoperability), RQ_F1 (data quality)

### Energy Management System (EMS)

Hybrid system coordination algorithms under computation time constraints (integration into multi-scenario optimisations).

Associated RQs: RQ_I3 (model hybridisation), RQ_F4 (accuracy and fidelity)

### 3D hull reconstruction

Approximate unknown hulls via 3D scan or video, to calibrate the hydrodynamic model in the absence of construction plans.

Associated RQs: RQ_D2 (data uncertainty, reconstruction under partial observation)

### External component integration

Connect component databases (engines, batteries, propellers) and future APIs (alternative fuels: H₂, methanol, etc.).

Associated RQs: RQ_E3 (deployment orchestration), RQ_E6 (syntactic interoperability)

### Economic and port modelling

Combine TCO, ROI, port infrastructure modelling and subsidy schemes for coherent strategic arbitrations.

Associated RQs: RQ_E2 (modularisation) - partially outside taxonomy: covers decision-support questions.

### Multi-level UX/UI design

Adapt the interface to highly contrasted user profiles: naval architect, shipyard, shipowner, public authority, from basic to professional level.

Associated RQs: RQ_U5 (usability), RQ_U6 (collaboration)

---

## Resources

- [HYBA dataset](https://www.francefilierepeche.fr/wp-content/uploads/2025/07/250625_HYBA-Rapport-Final.pdf) (multi-channel on-board measurements for energy model calibration)

## References

- [EcoBoatTwin Poster](/media/use-cases/uc21-poster-ecoboattwin-vectura.pdf) - Use Case Workshop, Lyon, 6-7 January 2026
- Combemale B., Vicat-Blanc P., Blouin A., Bril El Haouzi H., Bruel J.-M. et al. [Engineering Digital Twins: A Research Roadmap](https://inria.hal.science/hal-05223776). EDTconf 2025 - 2nd International Conference on Engineering Digital Twins, Oct 2025, Grand Rapids, Michigan, United States. pp.1-7. ⟨hal-05223776⟩ - scientific roadmap of the EDT programme (RQ_X codes).

## Ongoing Theses
