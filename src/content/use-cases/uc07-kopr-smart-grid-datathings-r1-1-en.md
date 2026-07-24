---

id: uc07

title: KOPR SmartGrid DigitalTwin

provider: DataThings S.A.

contacts:

  - name: Fouquet Francois

    org: DataThings

    email: francois.fouquet@datathings.com

    role: Founder & CEO

summary: >-

  Digital twin of the electricity distribution grid, providing decision support for network operators: maintenance planning, fault detection, simulation of extensions and reconfigurations.

  It acquires real-time data from smart meters and field sensors (4G, LoRa), as well as the physical composition of the network (cables, transformers...).

  Machine learning and AI models predict the future state of the network, in particular consumption at delivery points and solar and wind production based on weather data.

  What-if simulations assess the impact of scenarios via power-flow calculations.

  The system also provides real-time alerts and visualisations to help reconfigure the grid and manage renewable generation, particularly to smooth voltage fluctuations.

usersCount: 30

lang: en

photo: /media/uploads/kopr.png

# domain : industrial-engineering | energy | geospatial | maritime | telecommunications | environment | health | robotics | agriculture | other

domain: energy

# maturity : concept | poc | prototype | operational

maturity: operational

# originType : natural | anthropic | engineered | infrastructure | process

originType: infrastructure

# version : identifiant de version du UC (ex r0.1, r1.0, ...). La dernière est affichée par défaut sur la liste.

version: r1.1

status: published

license: BUSL-1.1

tags:

  - electric-power-sensor

  - consumption-monitoring

  - threshold-alert

  - digital-twin

  - simulation

publishedDate: 2026-04-15T00:00:00.000Z

lastUpdated: 2026-04-15T00:00:00.000Z



---

## Summary

**KOPR** is a digital twin of electricity distribution networks, focusing on low-voltage grids under pressure from renewable energy (photovoltaic, wind), electric vehicles and heat pumps.

It builds a digital replica of the network and learns in near real-time from diverse sources: GIS, management systems, smart meters and field sensors (4G, LoRa).

The twin **aggregates, visualises, analyses and learns** from this data to support operator decisions: infrastructure monitoring, fault detection, maintenance planning, and what-if simulation (network extension or reconfiguration, impact assessed via power-flow).
Machine learning and AI models predict the future state of the network.

It supports the energy transition by making grids smarter, more reliable and more efficient.
Deployed at national scale in Luxembourg, KOPR manages over **330,000 delivery points**, reflects more than **1 million network elements** and analyses over **45 billion meter readings per year** (more than **225 billion** cumulated over 5 years).
It relies on GreyCat, a programmable temporal graph database, to process these volumes.



---



## Functional Description



### Users

- **A grid operator** - monitors the network in real time, detects and handles incidents

- **A planning engineer** - simulates network extension or reconfiguration scenarios

- **A maintenance engineer** - schedules field interventions based on twin states and alerts



### Functional Requirements

- **Describe** · *A grid operator* **wants to visualise in near real-time the load state of transformers and low-voltage feeders** to identify constraint-violation zones, from a control centre. **Metric:** > 330,000 delivery points monitored, refresh at data cadence (15 min smart meters, near real-time 4G sensors).



- **Diagnose** · *A grid operator* **wants to locate overloads, under-voltages and non-technical losses** to prioritise interventions and investments, in live operations. **Metric:** > 1 M network elements reflected, > 45 bn meter readings analysed per year.



- **Predict** · *A planning engineer* **wants to anticipate the future state of the network (load, voltage) from historical data and weather** to size the hosting capacity for RES and EVs, in planning phase. **Metric:** configurable forecast horizon, injection of modification scenarios such as deployment of solar panels in a geographical area.



- **Optimise** · *A planning engineer* **wants to simulate what-if scenarios of extension or reconfiguration** (concentrator isolation, scheduling of PV inverters and EVs) to respect network constraints, ahead of works. **Metric:** impact calculated via power-flow on the full network. Beyond technical constraints, financial constraints and energy efficiency objectives must also be taken into account, e.g. to minimise losses between purchase and resale tariffs on the wholesale market.



---



## Digital Twin Characterisation



*Grid based on the <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">unified framework by Gil et al. (2024)</a> - 21 characteristics.*



### MC1 - System under study



Electricity distribution network, primarily low-voltage: distribution transformers (substations), cables and lines, data concentrators, and delivery points (customers) equipped with smart meters. The environment is shaped by the growing integration of distributed generation (photovoltaic, wind) and new loads (electric vehicles, heat pumps). The actors present are distribution system operators (DSOs), grid control room operators, and connected consumers/producers.



### MC2 - Physical action components



The primary scope in live operations is observational and decision-support: the twin produces states, alerts and recommendations for operators. A control loop ("prescription and actuation") is already deployed at limited scope: from anticipated constraint violations, KOPR generates recommendations and then orders for flexible loads - PV inverter injection curtailment, EV charging station power capping, activation of controllable generation (e.g. hydrogen) or smart meter relay switching for demand response. Deployment is **progressive**: advisory mode, then semi-autonomous supervision, then full closed-loop as operational confidence grows.



### MC3 - Physical sensing components



- **AMI / smart meters** at delivery points - consumption/production readings

- **SCADA** - operational states: switch, fuse and circuit-breaker open/close events (near real-time event stream)

- **PMUs and power quality sensors** - high-frequency phasor voltage/current measurements at selected substations

- **Field sensors** installed on substations and transformers, reporting via 4G or LoRa

- **Geographic Information Systems (GIS)** - network topology and physical composition (cables, transformers, substations)

- **ERP** - asset metadata: technical characteristics, ratings, maintenance history

- **External context** - weather feeds (solar irradiance, wind, temperature) and calendar metadata (public holidays, school periods), key predictors of load and generation



### MC4 - Physical → virtual interaction



Multi-source ingestion with radically different schemas and frequencies (from sub-second to weekly): GIS batch exports (daily to weekly), ERP asset metadata synchronisation, AMI readings at 15-minute intervals, SCADA state events in near real-time (Kafka / MQTT), high-frequency PMU phasor data, field sensor measurements (4G/LoRa), and external weather/calendar feeds.

Integration is not mere connection but a **modelling problem**: each stream is reconciled with a shared **temporal graph** - a connector parses the source format, resolves the target asset node by identity, then inserts the value at the correct timestamp (`setAt(t, value)`). Because the graph retains the full history, late-arriving data (GIS/ERP batch exports) is inserted retroactively at its correct instant without breaking the consistency of the live model.



### MC5 - Virtual → physical interaction



At the analytical level, KOPR transmits to operator systems load and generation forecasts (prospective state estimates) and issues warnings when it anticipates a constraint violation (cable overload, transformer saturation, voltage excursion) *before* it materialises. At the operational level, corrective orders are transmitted to connected equipment via control devices: PV injection curtailment, EV power capping, flexible generation dispatch, smart meter relays. This loop is deployed at limited scope (phased rollout). Full generalised actuation is planned.



### MC6 - DT services



- **Real-time supervision**: aggregation and visualisation of network state (transformer load, voltages, flows) at data cadence

- **Fault detection**: identification of overloads, under-/over-voltages, anomalies and non-technical losses

- **Prediction**: estimation of future network states (load, voltage) via machine learning / AI

- **What-if simulation**: evaluation of extension, reconfiguration or scheduling scenarios, with power-flow impact assessment

- **Planning and maintenance support**: prioritisation of interventions and investments

- **Historical analysis**: exploitation of hundreds of billions of archived readings (45 bn/year over ~5 years) for diagnostics and reporting



### MC7 - Time scale



Heterogeneous cadences: near real-time for 4G/LoRa field sensors at substations and transformers (< 5 seconds), 15-minute intervals for smart meters. The twin operates in near real-time (continuous learning) and can be accelerated to rapidly replay history or simulate prospective scenarios.



### MC8 - Multiplicities



Large-scale twin covering an entire distribution network: more than 1 million network elements and 330,000+ delivery points reflected in a single instance. Centralised architecture around a unified temporal graph model, deployable per network operator (multi-instance possible across operators).



### MC9 - Lifecycle phases



System in live operation, covering primarily the operation and maintenance phases of the network, as well as planning (extension, reconfiguration, RES and EV connection).



### MC10 - Models and data



- **Topological model (graph)**: physical network composition from GIS (transformers, cables, delivery points, concentrators)

- **Data-driven models**: machine learning / AI for state forecasting (load, voltage) and anomaly detection

- **Physical models**: load-flow (power-flow) computation for what-if simulations

- **Data streams**: timestamped smart meter readings (kWh, power) and substation sensor measurements (voltage, current, temperature), large-scale time series



### MC11 - Tools and enablers



- **GreyCat** - temporal graph database providing large-scale storage, modelling and processing of time series and network topology

- Machine learning / AI libraries for prediction and simulation

- Web visualisation and analytics interface (`@greycat/web`)

- Ingestion connectors to GIS, metering infrastructure (AMI) and field sensors



### MC12 - DT constellation



Pipeline: heterogeneous sources (GIS, AMI/smart meters, 4G/LoRa sensors) → ingestion connectors → GreyCat temporal graph model → analytics engines (ML/AI forecasting and detection, power-flow) → visualisation, alerting and simulation services exposed via the web interface. The graph topology links measurements to physical network elements, enabling contextualised analyses and simulations.



### MC13 - Twinning process and evolution



Incremental approach: progressive integration of data sources (GIS, metering, field sensors), enrichment of the network model, then addition of analytics services (detection, forecasting) and simulation. Evolution towards a control loop (sending orders to equipment) planned in the roadmap.



### MC14 - Fidelity and validity



Fidelity depends on GIS topology quality and metering coverage.
Forecasting models are calibrated and validated against real readings (back-testing on historical data).
Data may be partial (uninstrumented points), noisy or delayed (missing smart meter readings), requiring state estimation and interpolation over unobserved segments.



### MC15 - Technical connection



Field communications via cellular networks (4G) and LoRa for substation sensors. Smart meter collection via mesh relay: each meter relays readings to a **data concentrator** co-located with the local distribution substation, which aggregates and transmits to the central system. SCADA states are relayed as near real-time event streams (Kafka / MQTT); GIS and ERP integration is handled via connectors/APIs. Future generalised equipment actuation is planned via a standardised ISO-type protocol.



### MC16 - Hosting / deployment



KOPR runs on a **single central server** that maintains the national-scale temporal graph, executes power-flow calculations, orchestrates distributed ML models, serves the operator dashboard and runs what-if simulations. Data collection is distributed (concentrators co-located with substations). Deployment (cloud or on-premise at the network operator) is sized for the data volumes (330,000+ delivery points, 45 bn+ readings/year, ~225 bn archived). Services are accessible via web interface, binary protocol, json-rpc and MCP.



### MC17 - Insights and decision support



- **Real-time map and dashboard**: network state (cable load, transformer utilisation rates, voltage profiles) obtained by resolving the temporal graph at *t = now*; the operator directly identifies overloaded transformers, abnormal behaviour or predicted congestion in the network view

- **Anomaly alerts and congestion warnings**: triggered when configurable thresholds are exceeded, or in anticipation of a constraint violation before it occurs

- **Load and generation forecasts** exposed as prospective state estimates

- **What-if simulation results**: load factors, voltage profiles and congestion warnings per scenario, in seconds

- **Recommendations / prescriptions** for flexible loads (PV injection curtailment, EV power caps, demand response), in advisory mode then, ultimately, in closed loop

- **Model transparency**: continuous exposure of model quality and prediction performance, indicating to operators which results are reliable and where uncertainty increases



### MC18 - Horizontal integration



Tightly integrated with the operational ecosystem.
Inputs: GIS (topology), ERP (asset metadata), AMI (smart meters), SCADA (operational states as real-time stream), PMU/quality sensors, and external services (weather, calendars).
Outputs: forecasts transmitted to operator systems and corrective orders to controllable equipment (PV inverters, EV charging stations, smart meter relays).
The challenge is not connectivity but schema reconciliation, identity resolution and temporal insertion into a shared model, within a heterogeneous and evolving industrial ecosystem (legacy systems, organisational boundaries).



### MC19 - Data ownership and privacy



The twin processes metering data (consumption/production) across hundreds of thousands of delivery points, potentially traceable to individual customers and therefore subject to privacy and data protection requirements (GDPR).
Access to operational streams, simulation capabilities and actuation interfaces is controlled by **authenticated APIs** and **role-based access policies**.
Data remains under the governance of the host network operator; integrating independent and heterogeneous sources (SCADA, AMI, GIS, ERP, weather) requires a dedicated data governance layer (schema reconciliation, identity resolution, data quality).



### MC20 - Standardisation



No universally adopted standard yet exists for representing and exchanging grid operational data (topology, telemetry, asset metadata, forecasts, command interfaces): the smart-grid ecosystem remains fragmented (legacy systems, proprietary protocols, organisation-specific schemas).
KOPR therefore relies on a **unified model** (GreyCat language / GCL) and dedicated reconciliation layers.
Emerging interoperability standards, particularly the **Common Information Model (CIM)** and associated semantic modelling initiatives, could simplify future integration; equipment actuation is planned via several standardised protocols.



### MC21 - Security and safety



KOPR operates in a **critical infrastructure** context: security and operational isolation are essential design considerations.
Access to data, simulation and actuation goes through authenticated APIs and role-based access policies.
**Strict separation between simulation worlds and the live operational model** ensures that an exploratory analysis or a failing simulation cannot affect production.
Automated recommendations and actions are framed by operator supervision and configurable safety thresholds.
On the functional safety side, critical analytical functions (power-flow, short-circuit) are computed **redundantly** by different algorithms during test phases, with structural consistency checks before any simulation or control recommendation.



---



## Scientific and Technical Challenges



### Generating control strategies for flexible assets



Equipping KOPR with a **scenario generation engine** for flexible grid assets - heat pumps, PV inverters, EV charging stations.
Each proposed scenario must respect **network constraints** (voltage compliance, transformer load) while applying a **fairness rule** ("fair distribution") that balances usage opportunities across users, as well as **contractual rules** (e.g. a heat pump may not be disconnected for more than 2 hours per day) and **market signals** (PV generation curtailment when the purchase price diverges too far from the wholesale resale price).
The engine proposes scenarios, **KOPR evaluates them** (network impact via power-flow, costs, constraint compliance) and a **dashboard** presents scenarios and their evaluations in real time as time series.

In the absence of a downstream physical link to the equipment, the module is first offered in **dry-run** mode: it enables qualitative evaluation and side-by-side comparison of multiple scenarios before any real actuation.
Algorithmically, generation may draw on **multi-objective methods** (genetic algorithms), **constraint solvers**, or **generative AI**.

**Associated RQs:** `RQ_E2` (modularization), `RQ_U1` (creation of DT visual representations), `RQ_P6` (scaling)

**Sandbox**: scenario generation module in *dry-run* mode on the KOPR twin - demo / notebook *to be published* · [GreyCat](https://greycat.io) (temporal-graph and power-flow evaluation engine)

**PhD**: *Multi-objective generation and evaluation of flexibility control strategies under network, fairness and market constraints* - researcher TBD (DataThings / academic partner, 2025–2028)

**References**:

- [Samadi et al. (2014) - Real-Time Pricing for Demand Response Based on Stochastic Approximation](https://doi.org/10.1109/TSG.2014.2302854) - IEEE Transactions on Smart Grid

- [Rusitschka et al. (2013) - Adaptive Middleware for Real-time Prescriptive Analytics in Large Scale Power Systems](https://doi.org/10.1145/2541596.2541601) - ACM Middleware Industry

- Hartmann & Fouquet - *KOPR: A Production-Grade Digital Twin for Smart Grid Operations Built with GreyCat* (prescription-and-actuation loop, phased deployment)

**Other links**: [KOPR - official website](https://kopr-twin.com/) · [GreyCat](https://greycat.io)



### Isolation and maintenance scheduling strategy



When a network segment or concentrator must be isolated - planned maintenance, extension works, post-incident repair - a **reconfiguration plan** must be determined (sequence of switching device operations) that isolates the target while **maintaining supply** to the rest of the network and respecting constraints (voltage compliance, transformer load, backup feeder limits). The challenge is twofold: (i) **automatically finding** a feasible reconfiguration among a very large number of switch-state combinations, and (ii) **scheduling** the intervention window over time, leveraging load and generation forecasts to identify the lowest-impact time slot.

KOPR evaluates each candidate plan via what-if simulation (power-flow on the reconfigured topology) and projection over the intervention horizon. Reconfiguration search can combine **graph traversal** (identification of backup supply paths), **constraint solvers** and **optimisation** (minimising disconnected customers, losses and violation risk). As with the previous challenge, and in the absence of generalised downstream actuation, the module is offered in **dry-run** mode for qualitative evaluation and side-by-side comparison of plans.

![Concentrator isolation: backup reconfiguration search and lowest-impact intervention window selection](/media/use-cases/uc07-isolation-planification.png)

**Associated RQs:** `RQ_P6` (scaling), `RQ_E3` (dynamic deployment orchestration)

**Sandbox**: reconfiguration search module in *dry-run* mode on the KOPR twin - demo / notebook *to be published* · [GreyCat](https://greycat.io) (temporal graph traversal and power-flow)

**PhD**: *Backup reconfiguration search and constrained intervention scheduling on a distribution temporal graph* - researcher TBD (DataThings / academic partner, 2025–2028)

**References**:

- [Hartmann et al. (2019) - GreyCat: Efficient What-If Analytics for Data in Motion at Scale](https://doi.org/10.1016/j.is.2019.03.004) - Information Systems

- [Haas et al. (2011) - Data is Dead… Without What-If Models](https://doi.org/10.14778/3402755.3402769) - Proceedings of the VLDB Endowment

- Hartmann & Fouquet - *KOPR: A Production-Grade Digital Twin for Smart Grid Operations Built with GreyCat* (scenario-based planning, concentrator isolation)

**Other links**: [KOPR - official website](https://kopr-twin.com/) · [GreyCat](https://greycat.io)



---



## Material



The use case is provided as a **source-available evaluation kit** (Business Source License, `BUSL-1.1`): a minimal version of KOPR, its runtime components and substitute data generators, to enable hands-on evaluation without access to a real operator's data.

**Source-available repository (minimal KOPR)**

- Public repository shared with **DataThings**, containing a reduced version of KOPR - minimised complexity and data requirements to facilitate evaluation

- Code in **GreyCat (GCL)** language describing smart meters, solar panels and network topologies

**Runtime and licence**

- **GreyCat** runtime ([greycat.io](https://greycat.io)) provided by DataThings, with a **Pro licence** giving access to all pro modules - notably **power-flow** computation and **solar prediction**

**Data and generators**

- **Network topology** - low-voltage network generation from **OpenStreetMap** data, complemented by a dedicated algorithm co-developed with DataThings (the real topology being difficult to obtain, this algorithm is one of the first tasks of the project)

- **Weather** - feed from an open provider such as **Open-Meteo**

- **Consumption / generation** - random profile generator provided by DataThings, based on its training data

**Evaluation**

- For third-party evaluation: benchmarking possible on **real topologies**, on a restricted set of users and after validation by the relevant network operator



## References



- [KOPR - official website](https://kopr-twin.com/)

- Hartmann, T., Fouquet, F. - *KOPR: A Production-Grade Digital Twin for Smart Grid Operations Built with GreyCat* - Engineering Digital Twins (book chapter), DataThings / Trier University of Applied Sciences

- [Fouquet et al. (2024) - GreyCat: A Framework to Develop Digital Twins at Large Scale](https://doi.org/10.1145/3652620.3688265) - ACM/IEEE MODELS Companion '24

- [Hartmann et al. (2019) - GreyCat: Efficient What-If Analytics for Data in Motion at Scale](https://doi.org/10.1016/j.is.2019.03.004) - Information Systems

- [Hartmann et al. (2014) - A Native Versioning Concept to Support Historized Models at Runtime](https://doi.org/10.1007/978-3-319-11653-2_16) - MODELS 2014

- [Hartmann et al. (2019) - The Next Evolution of MDE: Seamless Integration of Machine Learning into Domain Modeling](https://doi.org/10.1007/s10270-017-0600-2) - Software and Systems Modeling

- [GreyCat](https://greycat.io) - temporal graph modelling platform
