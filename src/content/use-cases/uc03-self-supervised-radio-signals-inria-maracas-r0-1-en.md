---
id: uc03
title: Self-Supervised Methods for Radio Propagation Signals
provider: Inria
contacts:
  - name: Maxime Guillaud
    org: Inria, EP MARACAS
    email: maxime.guillaud@inria.fr
summary: >-
  Digital twin of a mobile wireless device, learned in a self-supervised way from radio propagation signals (channel charting), to enable real-time pseudo-location tracking, radio resource management, predictive networking resource allocation, and authentication.
usersCount: 0
lang: en
photo: /media/uploads/uc-default.svg
# domain : industrial-engineering | energy | geospatial | maritime | telecommunications | environment | health | robotics | agriculture | other
domain: telecommunications
# maturity : concept | poc | prototype | operational
maturity: concept
# originType : natural | anthropic | engineered | infrastructure | process
originType: engineered
# version : identifiant de version du UC (ex r0.1, r1.0, ...). La dernière est affichée par défaut sur la liste.
version: r0.1
# draft or published
status: draft
tags:
  - apprentissage-auto-supervise
  - channel-charting
  - localisation-radio
  - reseaux-sans-fil
  - authentification
  - telecommunications
publishedDate: 2026-09-17T00:00:00.000Z
---

## Summary

The physical system is any device connected wirelessly to a radio access network (5G, WiFi, etc.) or to a set of receivers (Bluetooth, ADS-B, etc.).

The digital twin is the mobile wireless device itself, with its position considered as the main property, together with other features (device characteristics, typical mobility patterns, etc.). The digital twin is built in a self-supervised way ("channel charting"): high-dimensional radio observations, obtained through a linear time-varying (LTV) filter between the device and the base station, are mapped to a reduced-dimension latent representation - a "pseudo-position" - without requiring labeled ground-truth position data. This representation supports real-time pseudo-location tracking, radio resource management, predictive networking resource allocation, and authentication.

The work is carried out at Inria, EP MARACAS.

---

## Functional Description

### Users

- **A network engineer / researcher** - develops and validates the self-supervised channel-charting models used to build the device's digital twin.
- **A network operator** - relies on the digital twin's pseudo-location and features for radio resource management and predictive resource allocation.

### Functional Requirements

- **Describe** · *A network operator* wants a real-time pseudo-location (channel chart) of connected devices to support radio resource management. **Metric:** to be specified.

- **Predict** · *A network operator* wants predictive networking resource allocation based on the device's digital twin (position, mobility patterns) to anticipate network needs. **Metric:** to be specified.

- **Secure** · *A network operator* wants to use the device's digital twin (position and features) as a basis for authentication. **Metric:** to be specified.

---

## Digital Twin Characterization

*Grid based on the <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">unified framework by Gil et al. (2024)</a> - 21 characteristics.*

### MC1 - System under study

Any device connected by wireless to a radio access network (5G, WiFi, etc.) or to a set of receivers (Bluetooth, ADS-B, etc.), situated in an urban or open radio-propagation environment between the device and a base station / access point.

### MC2 - Physical Acting Components

No direct actuator described. The digital twin's outputs (pseudo-location, predictive resource allocation, authentication decisions) feed radio resource management and network decisions; the actuation mechanism on the physical radio system is not detailed.

### MC3 - Physical sensing components

Radio signal observations of the device, captured through a linear time-varying (LTV) filter between the device and the base station, producing a high-dimensional observation of the propagation channel.

### MC4 - Physical-to-Virtual Interaction

The high-dimensional radio-channel observation (from the LTV filter) is reduced, through self-supervised dimensionality reduction ("channel charting"), to a low-dimensional latent representation (pseudo-position). This is learned without labeled ground-truth position data, continuously from streamed radio observations.

### MC5 - Virtual-to-Physical Interaction

No direct physical control loop described. The digital twin's pseudo-position and features feed downstream network functions: radio resource management, predictive resource allocation, and authentication.

### MC6 - Digital Twin Services

- Real-time pseudo-location tracking
- Radio resource management
- Predictive networking resource allocation
- Authentication

### MC7 - Twinning Time-scale

Real time for pseudo-location tracking; continuous, online self-supervised learning of the underlying channel-charting model as new radio observations stream in.

### MC8 - Multiplicities

A digital twin per mobile wireless device. In a network with several devices, each device may produce its own channel chart; charts produced by different devices are not necessarily spatially consistent with one another, raising a multi-actor alignment challenge (see below).

### MC9 - Life-cycle Stages

Continuous operational phase: the digital twin (channel-charting model) is learned and updated online as the device operates within the network.

### MC10 - Digital Twin Models and Data

- **Self-supervised dimensionality-reduction model** ("channel charting"): maps high-dimensional radio-channel observations to a reduced-dimension latent representation (pseudo-position)
- **Data**: high-dimensional radio observations (via the LTV filter), device features, typical mobility patterns
- **Outputs of interest**: position (physical space, 2D or 3D) and pseudo-position (channel chart, latent space, xD)

### MC11 - Tooling and Enablers

Linear time-varying (LTV) filter; self-supervised / channel-charting learning methods. Further tooling details to be specified.

### MC12 - Digital Twin Constellation

Pipeline: device-to-base-station radio link → LTV filter → high-dimensional observation → self-supervised dimensionality reduction → reduced-dimension pseudo-position representation, consumed by downstream network functions (location tracking, resource management, authentication).

### MC13 - Twinning Process and Digital Twin Evolution

Purely self-supervised and continuous: the channel-charting model is learned online from streamed radio observations, without labeled ground-truth position. A central challenge is achieving temporal consistency in a non-stationary world - reliably discriminating non-stationary effects (the physical world evolving) from stationary, statistically inferable effects, requiring the inclusion of expert knowledge to resolve this stability-plasticity dilemma.

### MC14 - Fidelity and Validity Considerations

Fidelity is challenged by the non-stationary nature of the physical world and the self-supervised setting (no ground-truth position labels). Anomaly detection is identified as a specific challenge, though not further detailed in the available material.

### MC15 - Digital Twin Technical Connection

Radio interface between the device and the access network or receiver set (5G, WiFi, Bluetooth, ADS-B). Protocols and further technical details to be specified.

### MC16 - Digital Twin Hosting/Deployment

To be specified.

### MC17 - Insights and decision-making

- Real-time pseudo-position (channel chart) of the device
- Radio resource management decisions
- Predictive networking resource allocation
- Authentication decisions

### MC18 - Horizontal integration

In a network with multiple devices, the individually-learned channel charts may need to be fused and aligned across actors, given that they are not necessarily spatially consistent with one another and that information exchange between devices is limited.

### MC19 - Data ownership and privacy

Device position and radio-signal data used for location tracking and authentication are potentially privacy-sensitive; governance is to be formalised.

### MC20 - Standardisation

To be specified.

### MC21 - Security and Safety Considerations

Authentication is one of the digital twin's intended usages, making the reliability of the pseudo-position/feature representation a security-relevant property. Anomaly detection is identified as a challenge, though not further detailed in the available material.

---

## Scientific and Technical Challenges

*Each challenge is annotated with research questions (RQ_X) from the EDT research roadmap [[Combemale et al., 2025](https://inria.hal.science/hal-05223776)].*

### Multi-actor fusion and alignment

Multiple channel charts produced independently by different devices in a network are not necessarily spatially consistent with one another; the corresponding digital twin representations require specific alignment methods operating under limited information exchange between devices.

Associated RQs: RQ_D10 (cross-DT data aggregation), RQ_C5 (federated access coordination)

### Anomaly detection

Identified as a specific engineering challenge for this use case; the available material does not provide further detail beyond the heading itself.

Associated RQs: RQ_T6 (continuous quality monitoring)

### Achieving temporal consistency in a non-stationary world

In a self-supervised learning setting, it is difficult to reliably discriminate non-stationary effects (due to the physical world being in constant evolution) from stationary effects that can be statistically inferred. Resolving this stability-plasticity dilemma requires the inclusion of expert knowledge.

Associated RQs: RQ_I2 (conditions for consistent use of an inductive model), RQ_D6 (simulation model evolution)

---

## Resources

- [UC03 Poster - Self-Supervised Methods for Radio Propagation Signals](/media/use-cases/uc03-poster-self-supervised-radio-signals-inria.pdf) - Use Case Workshop, Lyon, 6-7 January 2026

## References

- [UC03 Poster - Self-Supervised Methods for Radio Propagation Signals](/media/use-cases/uc03-poster-self-supervised-radio-signals-inria.pdf) - Maxime Guillaud, Inria EP MARACAS - Use Case Workshop, Lyon, 6-7 January 2026
- Combemale B., Vicat-Blanc P., Blouin A., Bril El Haouzi H., Bruel J.-M. et al. [Engineering Digital Twins: A Research Roadmap](https://inria.hal.science/hal-05223776). EDTconf 2025 - 2nd International Conference on Engineering Digital Twins, Oct 2025, Grand Rapids, Michigan, United States. pp.1-7. ⟨hal-05223776⟩ - scientific roadmap of the EDT programme (RQ_X codes).

## Ongoing Theses
