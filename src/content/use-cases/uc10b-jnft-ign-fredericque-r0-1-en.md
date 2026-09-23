---
id: uc10b
title: JUNN
provider: IGN
contacts:
  - name: Benoit Frédéricque
    org: IGN
    email: benoit.fredericque@ign.fr
    role: Tech Lead
  - name: Quentin Houéry
    org: IGN
    email: quentin.houery@ign.fr
    role: Project coordinator
summary: >-
  JUNN is an initiative to develop a common, open and sovereign technological foundation that will facilitate
  the deployment of digital twins of territories. Ultimately operated through a shared online platform, this
  foundation will pool generic, ready-to-use base services and offer a space for integrating and combining
  more specialised software components (such as software tools for flood-risk simulation), developed and
  valorised by business actors from the different application sectors.
usersCount: 0
lang: en
# domain : industrial-engineering | energy | geospatial | maritime | telecommunications | environment | health | robotics | agriculture | other
domain: geospatial
# maturity : concept | poc | prototype | operational
maturity: prototype
# originType : natural | anthropic | engineered | infrastructure | process
originType: natural
# version : identifiant de version du UC (ex r0.1, r1.0, ...). La dernière est affichée par défaut sur la liste.
version: r0.1
# draft or published
status: published
tags:
  - territoire
  - géospatial
  - open-source
  - 3d
  - multi-échelle
  - planification-territoriale
  - risques-naturels
publishedDate: 2026-06-24T00:00:00.000Z
---

## Summary

The physical system is France and its territories:
natural and anthropised systems related to land use and construction, in a context of climate change and
growing anthropic threats.

Digital Twins of Territories (DTT) are dynamic and prospective digital models of territories. They sit at a
territorial scale finer than world-scale models and more abstract than local digital twins (e.g. a civil
engineering structure's twin, factory twins). The JUNN programme aims to provide an open-source technical
foundation and an open 3D dataset to facilitate the development of digital twin of territories initiatives.

Seven families of business use cases have been prioritised: sustainable urban planning, identification of
renewable energy sites, territories resilient to natural disasters, optimisation of water use, adaptation of
forests to climate change, epidemic response, and optimisation of territorial mobility offers.

---

## Functional Description

### Users

- **A territorial decision-maker (local authority, State)** - uses visualisations and scenario simulations to steer planning, risk-management or climate-adaptation policies.
- **A researcher / scientist** - uses the open-source foundation and geospatial data to develop and validate models of physical or social phenomena at territorial scale.
- **A digital twin developer** - relies on the technical foundation to build local or thematic territorial digital twins.
- **A technical operator (IGN, local authority)** - feeds and maintains the open 3D dataset in continuous evolution.

### Functional Requirements

- **Describe + Visualise** · *A territorial decision-maker* wants a unified, up-to-date 3D representation of the territory (land use, buildings, terrain, vegetation) to understand the current state and simulate the impact of action scenarios. **Metric:** consistency of multi-source data, national coverage at 20 cm/pixel.

- **Simulate + Predict** · *A risk expert* wants to simulate physical phenomena (floods, wildfires, landslides) on the 3D model to assess territorial resilience and plan preventive actions. **Metric:** simulation results consistent with reference observations.

- **Identify + Assess** · *A planner* wants to identify sites favourable to renewable energy (solar, wind) or map at-risk areas to inform planning decisions. **Metric:** national coverage of thematic analyses.

- **Aggregate + Federate** · *A territorial digital twin developer* wants to reuse the open-source technical foundation to build local or thematic digital twins interoperable with JUNN. **Metric:** number of local initiatives relying on the foundation.

---

## Digital Twin Characterisation

*Grid based on the <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">unified framework by Gil et al. (2024)</a> - 21 characteristics.*

### MC1 - System under study

France and its territories: natural systems (terrain, hydrography, vegetation, forests) and anthropised systems (land use, buildings, infrastructure, transport networks), spanning global, national and local scales, in a context of climate change and anthropic pressure.

### MC2 - Physical Acting Components

JUNN is a tool for knowledge, simulation and decision support. The digital twin's outputs
feed into public policy for planning, natural-risk management
and climate adaptation. No actuator is planned
directly within the foundation for now. However, actuators may
be added as extensions to the foundation.

### MC3 - Physical sensing components

Data produced within the JUNN programme:

- Untextured semantic meshes (Wasure + CGAL + LidarHD / IGN, Geometry Factory & LASTIG)
- Photorealistic textured meshes (IGO, 4 pilot départements)
- Multi-thematic vector data (SIRADEL - data, LUXCARTA - software)

External data and sources identified to be dynamically referenced by the JUNN foundation:

- Orthoimages, DSM (Digital Surface Model) and DTM (Digital Terrain Model) - IGN, 20 cm/pixel, national scale
- Land Use Land Cover maps - IGN, 20 cm/pixel
- Field IoT sensors, data spaces

### MC4 - Physical-to-Virtual Interaction

Continuous collection and aggregation of multi-source 3D geographic data (raster, vector, mesh) from field sensors, IGN and partner databases. Aggregation of local behavioural data to feed national models. Connection to global climate models (DestinE).

### MC5 - Virtual-to-Physical Interaction

No automatic control loop. The JUNN foundation produces interactive
visualisations, scenario simulations and thematic insights (risks,
energy, mobility) consumed by public decision-makers and territorial
operators to inform policies and actions on the ground.

### MC6 - Digital Twin Services

- Collection and combination of multi-source 3D geographic data (unified 3D model of the territory)
- Interaction and visualisation of the 3D model (exploration, spatial queries)
- Orchestration of physical-phenomena simulations to assess the impact of action scenarios
- Support for the 7 prioritised business use cases (urban planning, renewable energy, natural risks, water, forests, epidemics, mobility)

### MC7 - Twinning Time-scale

Prospective and planning temporality: simulation
of short-, medium- and long-term scenarios, visualisation of historical data.
Continuous update of the geospatial dataset following IGN and partner
production cycles. Connection to real-time data via
external services (e.g. the HUB EAU API).

### MC8 - Multiplicities

Multi-scale (world → national → local) and multi-thematic (soil, buildings, water, vegetation, mobility, risks) architecture. Federative purpose: aggregate local territorial twins at national level and interface with DestinE at world scale.

### MC9 - Life-cycle Stages

Continuous operation and management of territories (monitoring territorial evolution, change detection). Planning and foresight (development, climate adaptation). Crisis response (natural disasters, epidemics).

### MC10 - Digital Twin Models and Data

Data produced within the JUNN programme:

- Untextured semantic meshes (Wasure + CGAL + LidarHD / IGN, Geometry Factory & LASTIG)
- Photorealistic textured meshes (IGO, 4 pilot départements)
- Multi-thematic vector data (SIRADEL - data, LUXCARTA - software)

External data and sources identified to be dynamically referenced by the JUNN foundation:

- Orthoimages, DSM (Digital Surface Model) and DTM (Digital Terrain Model) - IGN, 20 cm/pixel, national scale
- Land Use Land Cover maps - IGN, 20 cm/pixel
- LLM and AI for scientific and decision-making applications (H2E AI Factory France)

### MC11 - Tooling and Enablers

DestinE (Destination Earth, global climate models), H2E AI Factory France, national geoplatforms, LidarHD (IGN), CGAL library, Wasure (LASTIG), Geometry Factory, SIRADEL, LUXCARTA, LLM, IoT infrastructure, data spaces, data catalogues.

### MC12 - Digital Twin Constellation

Layered architecture: connectors (IoT, data spaces, databases, sensors, infrastructure and territorial twins) → open-source technical foundation (processing, catalogues, 3D data, simulation models) → geoplatforms → visualisation and LLM → applications (scientific, decision-makers, collaborative, technical). Vertical articulation with DestinE (world scale) and local twins.

### MC13 - Twinning Process and Digital Twin Evolution

Open and collaborative approach: open-source software foundation and open 3D dataset in continuous evolution. Progressive integration of research results from the targeted EDT projects (PC1 to PC5) to strengthen JUNN's capabilities. Progressive deployment by data maturity levels (raster → vector → mesh).

### MC14 - Fidelity and Validity Considerations

Reference geospatial data produced by IGN (the official French mapping and geodesy agency). 20 cm/pixel resolution for raster data. Increasing fidelity levels depending on data type (from untextured raster to photorealistic meshes). Progressive national extension (4 pilot départements for textured meshes).

### MC15 - Digital Twin Technical Connection

Connectors to infrastructure twins, local territorial twins, IoT, field sensors, data spaces, national databases. Geospatial interoperability standards (OGC, INSPIRE). Connection to DestinE for global climate data.

### MC16 - Digital Twin Hosting/Deployment

Open-source technical foundation, deployable at different scales. Distributed architecture articulating national and local deployments. Connection to the DestinE infrastructure at European/world level.

### MC17 - Insights and decision-making

- Interactive visualisation and exploration of the territory in 3D
- Simulation of the impact of development scenarios (urban planning, energy, infrastructure)
- Mapping of natural risks (floods, wildfires, landslides)
- Identification of sites favourable to renewable energy
- Optimisation of water use and forest resources
- Support for epidemic crisis management and territorial mobility planning

### MC18 - Horizontal integration

Architecture designed to federate multi-source data and tools (IGN, SIRADEL, LUXCARTA, DestinE, local authorities). OGC and INSPIRE standards for interoperability. Ambition to become the reference infrastructure for digital twins of territories in France, bridging the gap between the world scale (DestinE) and local applications.

### MC19 - Data ownership and privacy

All data produced within the JUNN programme
are open data (IGN open data). The JUNN foundation will also
support managing non-open data, in particular for sensitive uses
(security, critical infrastructure).

### MC20 - Standardisation

International geospatial standards (OGC: WMS, WFS, 3D Tiles, CityGML; INSPIRE). Interoperability with DestinE. Open-source technical stack to foster adoption and reuse by local authorities and research partners.

### MC21 - Security and Safety Considerations

Security of sensitive territorial data (critical infrastructure, strategic land use). Digital sovereignty of national geographic data (IGN's central role). Availability and integrity of the reference dataset.

---

## Scientific and Technical Challenges

*Each challenge is annotated with research questions (RQ_X) from the EDT research roadmap [[Combemale et al., 2025](https://inria.hal.science/hal-05223776)]. JUNN is an integrative use case, designed to benefit from the results of all targeted EDT projects (PC1 to PC5).*

### Hybrid multi-source, multi-scale modelling (PC1)

Combining models of very different natures (raster, vector, 3D mesh, physical simulation models) and data of heterogeneous scales (world, national, local) within a coherent, exploitable representation of the territory.

Associated RQs: RQ_I3 (hybridisation patterns), RQ_I4 (composition operators for hybridisation), RQ_D6 (simulation model evolution)

### Interoperability of geospatial tools and data (PC2)

Ensuring compatibility and exchange between heterogeneous data sources (IGN, SIRADEL, LUXCARTA, DestinE, field IoT), varied formats (raster, vector, 3D Tiles, CityGML), simulation models and different platforms, while complying with OGC and INSPIRE standards.

Associated RQs: RQ_D11 (semantic interoperability), RQ_E1 (metadata interface for models and services), RQ_E6 (interoperability standards and protocols)

### Life-cycle management and collaborative model development (PC3)

Managing the continuous evolution of the open 3D dataset, the models and the open-source software foundation in a multi-actor context (IGN, local authorities, researchers, industry), ensuring version traceability, update consistency and open governance.

Associated RQs: RQ_D6 (simulation model evolution), RQ_P8 (model deployment and versioning), RQ_P5 (sector-specific model/data management)

### Intelligent collection of territorial data (PC4)

Optimising large-scale geospatial data-acquisition strategies (type, resolution, update frequency) to efficiently feed digital twins of territories, drawing on IoT sensors, drones, satellites and participatory sources.

Associated RQs: RQ_D3 (heterogeneous data collection), RQ_D1 (sensor deployment), RQ_D2 (data uncertainty)

### Human-machine interaction for territorial exploration (PC5)

Designing visualisation and exploration interfaces for the model, adapted to users with varied profiles (decision-makers, researchers, general public), enabling intuitive querying, scenario comparison and interpretation of simulation results.

Associated RQs: RQ_U1 (creation of DT visual representations), RQ_U2 (perception and understanding of the original system), RQ_U5 (usability of DTs)

### Scaling to national level

Addressing the technical challenges of deploying a territorial digital twin foundation at national scale (data volume, distributed computing, 3D rendering time, continuous update management) while maintaining access performance and appropriation by users.

Associated RQs: RQ_P6 (scaling), RQ_C1 (dynamic Cloud/Edge orchestration), RQ_D7 (simulation model CRUD interface)

---

## Material

## References

- [Poster JNFT](/media/use-cases/uc10b-poster-jnft-ign.pdf) - Use Case Workshop, Lyon, 6-7 January 2026
- Combemale B., Vicat-Blanc P., Blouin A., Bril El Haouzi H., Bruel J.-M. et al. [Engineering Digital Twins: A Research Roadmap](https://inria.hal.science/hal-05223776). EDTconf 2025 - 2nd International Conference on Engineering Digital Twins, Oct 2025, Grand Rapids, Michigan, United States. pp.1-7. ⟨hal-05223776⟩ - scientific roadmap of the EDT programme (RQ_X codes).

## Ongoing Theses
