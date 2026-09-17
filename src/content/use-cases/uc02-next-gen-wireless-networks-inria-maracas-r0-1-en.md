---
id: uc02
title: Digital Twins for Next-Generation Wireless Communication Networks
provider: Inria
contacts:
  - name: Malcolm Egan
    org: Inria, EP MARACAS
    email: malcom.egan@inria.fr
  - name: Maxime Guillaud
    org: Inria, EP MARACAS
    email: maxime.guillaud@inria.fr
summary: >-
  Digital twins for modern wireless communication systems - massive-scale terrestrial and non-terrestrial networks - modeling signal generation, propagation and reception, user mobility, and traffic to predict reliability and latency, and to optimize modulation, coding, and resource allocation.
usersCount: 0
lang: en
photo: /media/uploads/uc-default.svg
# domain : industrial-engineering | energy | geospatial | maritime | telecommunications | environment | health | robotics | agriculture | other
domain: telecommunications
# maturity : concept | poc | prototype | operational
maturity: poc
# originType : natural | anthropic | engineered | infrastructure | process
originType: infrastructure
# version : identifiant de version du UC (ex r0.1, r1.0, ...). La dernière est affichée par défaut sur la liste.
version: r0.1
# draft or published
status: draft
tags:
  - reseaux-sans-fil
  - 5g
  - reseaux-non-terrestres
  - acces-multiple-massif
  - fiabilite-latence
  - telecommunications
publishedDate: 2026-09-17T00:00:00.000Z
---

## Summary

The physical system is a modern wireless communication system, at the scale of massive terrestrial or non-terrestrial networks (satellite constellations, IoT devices, ground stations). It relies on the accurate characterization of signal generation, propagation and reception, user mobility, and the quantity or type of data to be communicated.

The digital twin models and predicts reliability and latency from a model of the physical twin. This information is then used to optimize modulation, coding, and resource allocation. Two illustrative application contexts are highlighted: non-terrestrial communication networks (satellite/IoT/ground-station links) and massive multiple-access communication networks.

The work is carried out at Inria, EP MARACAS, and draws on the SLICES-RI CorteXlab testbed for reproducible physical-layer experimentation.

---

## Functional Description

### Users

- **A network engineer / researcher** - develops and calibrates physical-twin models of signal propagation and reliability, and validates them through testbed experimentation.
- **A network operator** - relies on the digital twin's predictions to configure modulation, coding, and resource-allocation strategies.

### Functional Requirements

- **Predict** · *A network engineer* wants to model and predict the reliability and latency of the communication system from the physical twin to anticipate network performance under varying conditions. **Metric:** to be specified (e.g. prediction accuracy on reliability/latency vs. testbed measurements).

- **Optimize** · *A network operator* wants to optimize modulation, coding, and resource allocation based on the digital twin's reliability and latency predictions to maximize network performance. **Metric:** to be specified.

---

## Digital Twin Characterization

*Grid based on the <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">unified framework by Gil et al. (2024)</a> - 21 characteristics.*

### MC1 - System under study

Modern wireless communication systems at massive scale: terrestrial networks and non-terrestrial networks (satellite-to-satellite, ground-to-satellite, and IoT-to-satellite bidirectional links, ground stations, central processing), as well as massive multiple-access communication networks. The system encompasses signal generation, propagation, and reception, user mobility, and the data to be communicated.

### MC2 - Physical Acting Components

Not detailed on available material. The digital twin's optimization outputs (modulation, coding, resource allocation) are presumably applied to transmission equipment configuration; the actuation mechanism itself is to be specified.

### MC3 - Physical sensing components

Not detailed on available material beyond the SLICES-RI CorteXlab testbed, which provides reproducible physical-layer experimentation (signal generation, propagation, and reception measurements).

### MC4 - Physical-to-Virtual Interaction

Physical-twin models are calibrated from testbed experimentation (SLICES-RI CorteXlab) and, presumably, from network observations. Frequencies and data formats are to be specified.

### MC5 - Virtual-to-Physical Interaction

No control loop is described in the available material. The digital twin's reliability/latency predictions inform modulation, coding, and resource-allocation optimization, presumably applied by network engineers/operators or downstream systems.

### MC6 - Digital Twin Services

- Modeling and prediction of reliability and latency
- Optimization of modulation, coding, and resource allocation

### MC7 - Twinning Time-scale

To be specified. Optimization decisions on modulation/coding/resource allocation suggest a need for near-real-time or operational-timescale predictions, but the available material does not specify a cadence.

### MC8 - Multiplicities

Multi-node networks: non-terrestrial networks combine satellites, IoT devices, and ground stations with a central processing node; massive multiple-access networks involve a large number of simultaneous users/devices around a central access point.

### MC9 - Life-cycle Stages

Design and optimization of next-generation network protocols; physical-layer experimentation and validation via the CorteXlab testbed.

### MC10 - Digital Twin Models and Data

- Physical-twin models of signal generation, propagation, and reception
- Data from reproducible physical-layer experimentation (SLICES-RI CorteXlab)
- Further model and data details to be specified

### MC11 - Tooling and Enablers

SLICES-RI CorteXlab testbed for reproducible physical-layer experimentation.

### MC12 - Digital Twin Constellation

Not detailed on available material.

### MC13 - Twinning Process and Digital Twin Evolution

Continual/online learning of the physical-twin models is identified as a specific engineering challenge, implying an incremental, continuously-updated twinning process rather than a one-off calibration.

### MC14 - Fidelity and Validity Considerations

Uncertainty quantification for reliability and latency predictions is identified as a specific engineering challenge. Validation approach and error metrics are to be specified.

### MC15 - Digital Twin Technical Connection

To be specified.

### MC16 - Digital Twin Hosting/Deployment

To be specified; experimentation is conducted on the SLICES-RI CorteXlab testbed.

### MC17 - Insights and decision-making

- Reliability and latency predictions
- Recommended modulation, coding, and resource-allocation configurations

### MC18 - Horizontal integration

Non-terrestrial network architecture connects satellites, IoT devices, ground stations, and a central processing system via bidirectional links (IoT-satellite, ground-satellite, satellite-satellite, ground network).

### MC19 - Data ownership and privacy

To be specified.

### MC20 - Standardisation

To be specified; the use case targets "next-generation" wireless networks, implying eventual alignment with emerging telecom standards, though none are named in the available material.

### MC21 - Security and Safety Considerations

Not addressed in the available material.

---

## Scientific and Technical Challenges

*Each challenge is annotated with research questions (RQ_X) from the EDT research roadmap [[Combemale et al., 2025](https://inria.hal.science/hal-05223776)].*

### Continual/online learning for physical twin models

Continuously updating the physical-twin models (signal generation, propagation, reception) as new data becomes available, rather than relying on a one-off calibration, to keep predictions aligned with the real system's evolving behavior.

Associated RQs: RQ_D6 (simulation model evolution), RQ_D8 (AI model training)

### Uncertainty quantification for reliability and latency

Quantifying the uncertainty of reliability and latency predictions produced by the digital twin, so that downstream optimization of modulation, coding, and resource allocation can account for prediction confidence.

Associated RQs: RQ_T4 (accuracy and fidelity quantification), RQ_I5 (validity envelope)

---

## Resources

- [UC02 Poster - Digital Twins for Next-Generation Wireless Communication Networks](/media/use-cases/uc02-poster-wireless-networks-inria.pdf) - Use Case Workshop, Lyon, 6-7 January 2026

## References

- [UC02 Poster - Digital Twins for Next-Generation Wireless Communication Networks](/media/use-cases/uc02-poster-wireless-networks-inria.pdf) - Malcolm Egan, Maxime Guillaud, Inria EP MARACAS - Use Case Workshop, Lyon, 6-7 January 2026
- Combemale B., Vicat-Blanc P., Blouin A., Bril El Haouzi H., Bruel J.-M. et al. [Engineering Digital Twins: A Research Roadmap](https://inria.hal.science/hal-05223776). EDTconf 2025 - 2nd International Conference on Engineering Digital Twins, Oct 2025, Grand Rapids, Michigan, United States. pp.1-7. ⟨hal-05223776⟩ - scientific roadmap of the EDT programme (RQ_X codes).

## Ongoing Theses
