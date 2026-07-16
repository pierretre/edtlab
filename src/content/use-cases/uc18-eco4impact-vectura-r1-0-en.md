---
id: uc18
title: eco4impact
provider: Vectura System
contacts:
  - name: Sébastien Berthebaud
    org: Vectura System
    email: sebastien.berthebaud@vectura-system.com
summary: >-
  SaaS digital twin platform for predictive decarbonisation of road transport fleets (ICE, BEV, FCEV), covering strategic planning 2030-2050 and tactical/daily planning via Digital Truck Twins, scenario generation and economic/CO₂ models.
usersCount: 0
lang: en
photo: /media/uploads/uc18-eco4impact-vectura.png
# domain : industrial-engineering | energy | geospatial | maritime | telecommunications | environment | health | robotics | agriculture | other
domain: energy
# maturity : concept | poc | prototype | operational
maturity: prototype
# originType : natural | anthropic | engineered | infrastructure | process
originType: engineered
# version : identifiant de version du UC (ex r0.1, r1.0, ...). La dernière est affichée par défaut sur la liste.
version: r1.0
# draft or published
status: published
tags:
  - transport-logistique
  - décarbonation
  - flotte
  - tco
  - lca
  - saas
publishedDate: 2026-06-23T00:00:00.000Z
---

## Summary

The physical system under study is the road logistics transport fleet - heavy goods vehicles with internal combustion engines (ICE), battery electric vehicles (BEV) and fuel cell vehicles (FCEV) - operating on multimodal routes in a dynamic environment (traffic, weather, topography).

The eco4impact digital twin is a predictive SaaS platform used across two horizons: strategic planning 2030-2050 (technology transition, charging/H₂ infrastructure) and tactical/daily planning (optimal route generation, energy planning). It integrates Digital Truck Twins (physical and data models), a scenario generator and economic/CO₂ models (TCO, LCA), connected to the physical twin through continuous ingestion of telematics, usage and infrastructure data.

Two parallel developments: the EcoRoadLog consortium (being formed with logistics operators, federations and universities in France and Germany) and Eco4Impact-Offroad for off-road applications (project with UNICEM and FNTP).

---

## Functional Description

### Users

- **A fleet manager** - drives daily operations (routes, energy) and evaluates renewal scenarios.
- **A logistics decision-maker / management** - arbitrates strategic transition choices (technologies, timeline, infrastructure) over long horizons.
- **A TCO / CSR analyst** - evaluates cost-risk trade-offs and sustainability KPIs (CO₂e, regulatory compliance).
- **A public authority / professional federation** - simulates the impact of regulations, subsidies and CO₂ pricing.

### Functional Requirements

- **Predict + Optimise** · *A logistics decision-maker* wants to simulate fleet transition trajectories 2030-2050 (ICE/BEV/FCEV mix, investment timeline) to define a sustainable decarbonisation strategy, in a context of uncertainty about the energy mix and prices. **Metric:** different scenarios compared over a 10-25 year horizon with quantified TCO and CO₂e.

- **Optimise** · *A fleet manager* wants to generate optimal daily routes and energy schedules to minimise consumption and comply with operational constraints (traffic, weather, charging points). **Metric:** reduction in energy consumption vs reference plan; 100% compliance with delivery windows.

- **Evaluate + Predict** · *A TCO analyst* wants to estimate the total cost of ownership and carbon footprint to compare vehicle configurations under different price and regulatory scenarios. **Metric:** TCO and LCA quantified per scenario with confidence interval.

- **Describe + Predict** · *A public authority* wants to simulate the impact of regulations, subsidies and CO₂ pricing on the adoption of low-carbon technologies, during the policy development phase. **Metric:** sensitivity of adoption to regulatory parameters.

---

## Digital Twin Characterisation

*Grid based on the <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">unified framework by Gil et al. (2024)</a> - 21 characteristics.*

### MC1 - System under study

Real road logistics transport system: heavy goods vehicles (ICE, BEV, FCEV), transport processes (missions, routes), multimodal itineraries, drivers, infrastructure (delivery points, charging/H₂ stations), and environmental context (traffic, weather, topography).

### MC2 - Physical Acting Components

No direct actuator in the current version: the DT (Digital Twin) is primarily decision-oriented. Outputs drive human choices (fleet manager, management) - scheduling, vehicle allocation, investment timeline.

### MC3 - Physical sensing components

- On-board telematics sensors (consumption, position, speed, load, battery state)
- Infrastructure data (charging points, energy prices)
- External sources (traffic, weather, market trends)

### MC4 - Physical-to-Virtual Interaction

Continuous ingestion of vehicle telematics data and logistics usage data (TMS). Coupling with external data (traffic, weather, market) for calibration and scenario enrichment. Standards and frequencies to be specified according to TMS integration.

### MC5 - Virtual-to-Physical Interaction

No direct command: the DT produces recommendations (routes, energy schedules, renewal decisions) consumed by human operators or exported to the TMS.

### MC6 - Digital Twin Services

- Generation of strategic (2030-2050) and tactical (daily) scenarios via Sequence Building Blocks
- Route and energy usage optimisation under constraints
- Prediction of TCO, LCA and CO₂ impacts per scenario
- Comparison of fleet configurations (technology mix, mission profiles)
- Daily reporting (CO₂e, ESG, CSRD)

### MC7 - Twinning Time-scale

Two coupled scales: tactical/daily (operational planning) and strategic (5 to 25-year horizons). Not strict real-time - the DT is a simulation and decision tool.

### MC8 - Multiplicities

Multi-instance architecture: one Digital Truck Twin per vehicle or per type configuration, aggregated into a fleet. Ability to reason at the scale of a mission, a fleet or a national fleet.

### MC9 - Life-cycle Stages

Covers mainly operations (daily planning) and fleet evolution strategy (renewal, technology transition). LCA covers the full vehicle lifecycle for environmental assessment.

### MC10 - Digital Twin Models and Data

- **Digital Truck Twins**: coupling of physical models (consumption, range) and ML models calibrated on telematics
- **Scenario generator** based on Sequence Building Blocks (scenario: sequence of several scene/mission types)
- **Economic models (TCO)** integrating energy prices, maintenance, depreciation, CO₂ taxation
- **Life Cycle Analysis models (LCA)**
- **Data**: telematics, infrastructure, energy prices, weather, traffic, market trends

### MC11 - Tooling and Enablers

SaaS web platform.

### MC12 - Digital Twin Constellation

Pipeline: ingestion (telematics + external sources) → Digital Truck Twin calibration → scenario generator → optimisation/simulation engine → TCO and LCA models → user interface (strategic planning, tactical simulation, reporting).

### MC13 - Twinning Process and Digital Twin Evolution

Incremental and collaborative approach: EcoRoadLog consortium being built with logistics operators, federations and universities (France and Germany). Eco4Impact-Offroad extension for off-road applications with UNICEM and FNTP.

### MC14 - Fidelity and Validity Considerations

Calibration of Digital Truck Twins on real telematics data. Validation by comparison of modelled vs measured consumption over operational cycles. Predictive modelling under high uncertainty - uncertainty propagation (future energy mix, prices, regulations) to be specified.

### MC15 - Digital Twin Technical Connection

Ingestion via API from TMS and telematics platforms. Precise protocols and standards to be specified.

### MC16 - Digital Twin Hosting/Deployment

SaaS - hosted web platform. Details (cloud, data centre, multi-tenant) to be specified.

### MC17 - Insights and decision-making

- Comparison of fleet transition scenarios with quantified TCO and CO₂e
- Optimal routes and energy schedules for daily operations
- CO₂e, ESG, CSRD reporting
- Sensitivity of adoption to regulatory parameters (regulations, subsidies, CO₂ pricing)

### MC18 - Horizontal integration

Connected to TMS (Transport Management Systems) and FMS (Fleet Management Systems) for operational flows. Future integration of component databases and fuel APIs envisaged.

### MC19 - Data ownership and privacy

Operational data (telematics, missions) potentially sensitive (competition, contractualisation). Governance and GDPR compliance to be formalised in the multi-tenant SaaS context.

### MC20 - Standardisation

Reporting aligned with ESG and CSRD. Digital Truck Twin modelling standards and LCA inventory to be specified.

### MC21 - Security and Safety Considerations

SaaS application security (authentication, tenant isolation). No real-time control loop - operational safety risks limited to the decision-making scope.

---

## Scientific and Technical Challenges

*Each challenge is annotated with research questions (RQ_X) from the EDT research roadmap [[Combemale et al., 2025](https://inria.hal.science/hal-05223776)].*

### Automated scenario generation

Central challenge of this UC: producing realistic and diverse scenarios for both strategic and tactical planning, from Sequence Building Blocks. Issues of expressiveness, combinatorics and plausibility of trajectories.

Associated RQs: RQ_D6 (model evolution), RQ_E2 (modularisation)

### Integration of heterogeneous and uncertain data

Merging and cleaning data from numerous and uncertain sources (telematics, infrastructure, market trends) while ensuring consistency of formats and semantics.

Associated RQs: RQ_D3 (heterogeneous data collection), RQ_D11 (semantic interoperability)

### Multi-model coupling

Aligning and integrating complex models - Machine Learning, physical truck twins, predictive cost models and life cycle analysis - within a single evaluation pipeline.

Associated RQs: RQ_I3 (model hybridisation), RQ_I4 (hybridisation operators)

### Predictive modelling under high uncertainty

Forecasting TCO for emerging powertrains under structural uncertainties (future energy mix, prices, regulations) and propagating these uncertainties through to decisions.

Associated RQs: RQ_D2 (data uncertainty), RQ_I5 (validity envelope), RQ_T3 (uncertainty compounding across DTs)

---

## Resources

## References

- [eco4impact Poster](/media/use-cases/uc18-poster-eco4impact-vectura.pdf) - Use Case Workshop, Lyon, 6-7 January 2026
- Combemale B., Vicat-Blanc P., Blouin A., Bril El Haouzi H., Bruel J.-M. et al. [Engineering Digital Twins: A Research Roadmap](https://inria.hal.science/hal-05223776). EDTconf 2025 - 2nd International Conference on Engineering Digital Twins, Oct 2025, Grand Rapids, Michigan, United States. pp.1-7. ⟨hal-05223776⟩ - scientific roadmap of the EDT programme (RQ_X codes).

## Ongoing Theses
