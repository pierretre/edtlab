---
id: uc25
title: Geological CO₂ Storage
provider: IFP Energies nouvelles
contacts:
  - name: Abir El Feki
    org: IFP Energies nouvelles
    email: abir.el-feki@ifpen.fr
    role: Digitalization Project Manager
summary: >-
  Monitoring digital twin for a geological CO₂ storage site in a saline aquifer, enabling near-real-time data assimilation, prediction of the reservoir's dynamic behavior, risk quantification, and anomaly detection (overpressure, lateral CO₂ migration beyond reservoir boundaries).
usersCount: 0
lang: en
photo: /media/uploads/uc-default.svg
# domain : industrial-engineering | energy | geospatial | maritime | telecommunications | environment | health | robotics | agriculture | other
domain: energy
# maturity : concept | poc | prototype | operational
maturity: poc
# originType : natural | anthropic | engineered | infrastructure | process
originType: natural
# version : identifiant de version du UC (ex r0.1, r1.0, ...). La dernière est affichée par défaut sur la liste.
version: r0.4
# draft or published
status: published
tags:
  - co2
  - stockage-géologique
  - aquifère
  - surveillance
  - assimilation-de-données
  - géothermie
publishedDate: 2026-06-24T00:00:00.000Z
---

## Summary

The physical system is a geological CO₂ storage site in a saline aquifer, comprising the underground reservoir (porous and permeable rock), the fluids (supercritical CO₂ and brine), and the injection wells.

The digital twin (DT) is a monitoring system designed to continuously update the reservoir's parameters and state through data assimilation, predict its dynamic evolution over multi-decadal horizons, quantify the associated risks, and detect anomalous reservoir behavior. Integrating detection of leaks outside the reservoir is not planned in the short term: it would require adding the caprock, faults, potentially failing wells, aquifers above the storage complex, and possibly the entire subsurface up to the surface, to the model. Within the current scope, the detectable "leak" is therefore limited to lateral migration - i.e. exceeding the lateral boundaries of the storage complex, within the reservoir only, since the caprock is not represented. At this stage, all of this work relies on and is tested exclusively on synthetic cases, with data generated upstream. At project start, the DT consists of an initial POC implementing a single functional building block with fast surrogate models, basic visualization, and near-real-time data display in a web application. FIWARE has been identified as a potential open-source backbone around which to build the future architecture.

---

## Functional Description

### Users

- **A site monitoring engineer** - continuously monitors the storage site's state and compliance, interprets alerts, and validates the DT's predictions.
- **An operational decision-maker** - adjusts injection parameters and monitoring plans based on the DT's recommendations.
- **A risk and regulatory compliance expert** - assesses leak risks, checks compliance with the European regulatory framework for geological CO₂ storage.
- **A geoscience / modeling researcher** - calibrates and improves reservoir models, validates data-assimilation strategies.

### Targeted Functional Requirements

- **Describe + Predict** · *A monitoring engineer* wants an up-to-date representation of the reservoir's state (pressure, temperature, gas saturation, dissolved CO₂ mole fraction) to verify site compliance in near-real time and anticipate its evolution up to 30 years out. **Metric:** predictions consistent with observations on the annual time step.

- **Detect + Alert** · *An operational decision-maker* wants to be alerted in near-real time to anomalies (abnormal pressure behavior, potential leak) to trigger corrective actions. **Metric:** exceedance of explicit physical thresholds: (1) abnormal pressure at the well; (2) overpressure in the reservoir, i.e. a threshold reached in an at-risk zone (oil, geothermal operations, etc.); (3) leak, i.e. a gas-saturation or dissolved-CO₂-concentration threshold exceeded beyond the reservoir's lateral boundaries. **Near-real time:** the alert cadence depends on data frequency (wells: hourly; seismic data: more than 1 year) and on the model's assimilation frequency, which is distinct from it: yearly at first, then monthly, and possibly daily depending on the CPU cost of the assimilation process.

- **Quantify + Evaluate** · *A risk expert* wants probabilistic risk assessments (leak beyond the lateral boundaries of the storage complex, within the reservoir only since the caprock is not represented; overpressure) updated as data comes in. **Metric:** confidence intervals on quantified risks per scenario.

- **Optimize** · *A monitoring engineer* wants to identify the most informative data-acquisition strategies (well placement) to improve model accuracy while controlling costs. **Metric:** reduction in uncertainty on key parameters for a given instrumentation budget. Note: this recommendation on acquisition strategies is produced upstream of system design rather than continuously during DT operation; it is then updated whenever an anomaly or leak is detected.

---

## Digital Twin Characterization

*Grid based on the <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">unified framework by Gil et al. (2024)</a> - 21 characteristics.*

### MC1 - System under study

A geological CO₂ storage site in a deep saline aquifer: porous, permeable reservoir (2D radial mesh, NX=100, NZ=20), fluids (supercritical CO₂ and brine), and injection wells. The caprock is not represented in the model. Operational context: a storage facility of which only the injection well is modeled, and only within the reservoir. Currently synthetic cases only, with data generated upstream.

### MC2 - Physical Acting Components

Injection-well control equipment (valves, flow meters). In the current POC, the DT is a monitoring and decision-support tool; physical actions remain under human control. Future goal: automated recommendations on injection parameters.

### MC3 - Physical sensing components

- Pressure and temperature sensors in injection and monitoring wells
- Geochemical sensors (fluid composition, dissolved CO₂) in monitoring wells
- Potentially: 3D seismic data to monitor the gaseous CO₂ plume
- Operating data (injection rate, cumulative volumes)
- Out of scope: microseismicity and satellite surface-deformation data (InSAR), which the proposed synthetic model cannot account for without adding mechanics

### MC4 - Physical-to-Virtual Interaction

Data acquisition from well sensors to feed the assimilation algorithms and update the reservoir model's parameters. In the POC: annual time step, 0-30 year horizon. Future goal: near-real-time assimilation via FIWARE. Target cadence in stages: annual, then monthly, then possibly daily depending on the CPU cost of assimilation. The assimilation frequency remains distinct from the data-acquisition frequency, which is hourly for wells and multi-annual for seismic data.

### MC5 - Virtual-to-Physical Interaction

No automatic control loop at present. The DT produces predictions and alerts (anomalies, leak risks) transmitted to operators to adjust injection parameters or trigger monitoring interventions.

### MC6 - Digital Twin Services

- Simulation of reservoir evolution (temperature, pressure, gas saturation, dissolved CO₂ mole fraction)
- Data assimilation to update system parameters and state
- Risk quantification and updating (leak, overpressure)
- Anomaly detection and anticipation
- Potentially: updating the data-acquisition strategy, triggered by detection of an anomaly or leak

### MC7 - Twinning Time-scale

Simulation horizons of 0 to 30 years, annual time step in the POC. Eventual goal: near-real-time assimilation for operational monitoring, through a progressive ramp-up in cadence: yearly, then monthly, then possibly daily depending on the CPU cost of assimilation.

### MC8 - Multiplicities

A 2D radial geological model representing a central injection well and the surrounding reservoir. Possible extensions: multi-well, full-reservoir scale, and vertical extension integrating all geological layers up to the surface to simulate leaks through the caprock, faults, and wells. No extension to surface facilities (pumps, transport, capture).

### MC9 - Life-cycle Stages

Operating and monitoring phase of the storage site (active injection and post-injection). The DT also supports planning (monitoring strategy, optimization of measurement campaigns).

### MC10 - Digital Twin Models and Data

- **2D radial reservoir models** (R or Python): simulation of CO₂/brine flows and heat transfer, based on fluid-flow, species-transport, and thermal-diffusion equations in porous media
- **Fast surrogate models**: proxies for high-fidelity simulations, for near-real-time assimilation
- **Python engine**: data assimilation, construction and updating of ML models
- **Outputs of interest**: temperature, pressure, gas saturation, dissolved CO₂ mole fraction, temporal evolution over the NX=100 × NZ=20 grid
- **FIWARE**: context-data backbone for the future data-collection architecture
- Use cases currently based solely on synthetic data, generated upstream. The radial model is a synthetic IFPEN model.

### MC11 - Tooling and Enablers

R and/or Python depending on the component (models, simulators, assimilation and ML engine), with the language choice not fixed per component; FIWARE (context-data backbone, future architecture); web visualization application ([co2-storage.fastit.dev](https://co2-storage.fastit.dev/)).

### MC12 - Digital Twin Constellation

Pipeline: data acquisition (well, surface sensors) → assimilation and parameter updating → reservoir simulation (surrogate models) → uncertainty quantification → anomaly detection and risk assessment → visualization and dashboard.

### MC13 - Twinning Process and Digital Twin Evolution

Incremental approach: initial POC (single functional building block) → integration of new data sources → architecture extension with FIWARE integration → generalization to other subsurface applications (geothermal) via contextualized ontologies.

### MC14 - Fidelity and Validity Considerations

Surrogate models calibrated on high-fidelity reference simulations. At this stage, everything relies on and is tested exclusively on synthetic cases, with data generated upstream. Validation against real field data remains to be established. Propagation of uncertainty on physical parameters (permeability, porosity, etc.) remains to be formalized.

### MC15 - Digital Twin Technical Connection

External web application for near-real-time visualization and display ([co2-storage.fastit.dev](https://co2-storage.fastit.dev/)). FIWARE identified for the future integration of sensor streams. Exchange protocols with field acquisition systems remain to be defined.

### MC16 - Digital Twin Hosting/Deployment

Deployed web application ([co2-storage.fastit.dev](https://co2-storage.fastit.dev/)), a fully integrated solution embedding FIWARE context brokers and hosted in the cloud. A dedicated connector to IFPEN's internal supercomputer will be associated with it.

### MC17 - Insights and decision-making

- Probabilistic predictions of the reservoir's current and future state (pressure, temperature, saturation, dissolved CO₂ mole fraction)
- Updated risk assessments (leaks in the sense of exceeding the reservoir's lateral boundaries, overpressure) as data comes in
- Alerts upon anomaly detection
- Potentially: updated acquisition strategy triggered by detection of an anomaly or leak

### MC18 - Horizontal integration

Architecture designed to be generic and reusable across other scales (from a single well to the full reservoir) and other subsurface applications (geothermal) via contextualized ontologies. Surface facilities are explicitly out of scope.

### MC19 - Data ownership and privacy

Storage-site monitoring data is potentially sensitive (capacity, reservoir behavior, incidents). Compliance with the European regulatory framework for monitoring geological CO₂ storage sites (Directive 2009/31/EC) remains to be integrated. The physical model itself can also constitute confidential data. In this case, the radial model is a synthetic IFPEN model, so it poses no confidentiality issue.

### MC20 - Standardization

Contextualized ontologies for reusability across subsurface applications. Alignment with oil and gas industry standards for reservoir modeling. Compliance with the European regulatory framework for monitoring CO₂ storage.

### MC21 - Security and Safety Considerations

A central safety concern: early detection of CO₂ migration beyond the lateral boundaries of the storage complex (exceedance of a gas-saturation or dissolved-CO₂-concentration threshold) and of overpressure in at-risk zones. Detecting vertical leaks through the caprock, faults, and wells requires extending the model up to the surface, envisaged for the longer term. The DT is a critical monitoring tool for ensuring site integrity and regulatory compliance. Web-application security (authentication, access control) is to be ensured.

---

## Scientific and Technical Challenges

*Each challenge is annotated with research questions (RQ_X) from the EDT research roadmap [[Combemale et al., 2025](https://inria.hal.science/hal-05223776)].*

### Near-real-time data assimilation

Integrating heterogeneous, noisy data streams (pressure, temperature, geochemistry: dissolved CO₂) into physical reservoir models to maintain an up-to-date representation of the system's state. Microseismicity cannot be exploited with this model. Initially, data assimilation will be based on high-fidelity simulations rather than real field data. Challenges include latency, format consistency, and robustness to missing data, given highly contrasting acquisition frequencies (hourly at the well, multi-annual for seismic) to be assimilated into a model whose own cadence is initially annual, then monthly.

Associated RQs: RQ_D3 (heterogeneous data collection), RQ_D2 (data uncertainty)

### Surrogate models for fast simulation

Building and continuously updating accurate, fast surrogate models (ML models) to replace high-fidelity reservoir simulations, enabling near-real-time assimilation and scenario exploration.

Associated RQs: RQ_I3 (model hybridization), RQ_I4 (hybridization operators)

### Uncertainty quantification and propagation

Characterizing uncertainty on physical parameters (permeability, porosity) and future well control parameters, and propagating it through to predictions and risk assessments to produce confidence intervals usable by operators.

Associated RQs: RQ_D2 (data uncertainty), RQ_I5 (validity envelope), RQ_T4 (accuracy and fidelity quantification)

### Anomaly detection and risk management

Identifying abnormal reservoir behavior such as overpressure in near-real time and updating risk assessments to trigger corrective actions at the right time. Two families of criteria: (i) pressure, at the well and in terms of overpressure reaching a threshold in an at-risk zone (oil, geothermal operations, etc.); (ii) lateral migration, with gas saturation or dissolved-CO₂ concentration exceeding a threshold beyond the reservoir's lateral boundaries. Detection of vertical CO₂ migration outside the reservoir is envisaged for the longer term, requiring the model to integrate faults, wells, and overlying aquifers, from the subsurface up to the surface.

Associated RQs: RQ_T6 (continuous quality monitoring), RQ_T5 (quality properties per use case)

### Optimizing data-acquisition strategies

Determining the optimal type, location, and frequency of measurements to improve model accuracy and reduce critical uncertainties, while controlling instrumentation and monitoring costs. This optimization is produced upstream of system design rather than continuously during DT operation. Possible extension: it is then updated upon detection of an anomaly or leak.

Associated RQs: RQ_D3 (heterogeneous data collection), RQ_D1 (sensor deployment)

### Genericity and reusability via ontologies

Designing the DT to be applicable to other subsurface contexts (geothermal, other aquifers, other scales) without major rework, by relying on interoperable contextualized ontologies.

Associated RQs: RQ_D11 (semantic interoperability), RQ_D6 (model evolution), RQ_E2 (modularization)

---

## Resources

- Demo web application: [co2-storage.fastit.dev](https://co2-storage.fastit.dev/)

## References

- [Geological CO₂ Storage Poster](/media/use-cases/uc25-poster-co2storage-ifpen.pdf) - Use Case Workshop, Lyon, 6-7 January 2026

## Ongoing Theses
