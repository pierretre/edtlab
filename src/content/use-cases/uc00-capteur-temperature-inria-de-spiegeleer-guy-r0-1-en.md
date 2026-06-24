---
id: uc00
title: Temperature sensor
provider: Inria
contacts:
  - name: Guy de Spiegeleer
    org: Inria
    email: guy.de-spiegeleer@inria.fr
summary: >-
  Digital twin of a USB temperature sensor: real-time acquisition, threshold
  alert, and simulator for testing behaviour without hardware.
# usersCount : number of actual DT users (diffusion metric)
usersCount: 1
lang: en
photo: /media/use-cases/Temperature-Sensors-DirecTemp-USB-Thermometers-DTU6005-001.jpg
# domain : industrial-engineering | energy | geospatial | maritime | telecommunications | environment | health | robotics | agriculture | other
domain: industrial-engineering
# maturity : concept | poc | prototype | operational
maturity: prototype
# originType : natural | anthropic | engineered | infrastructure | process
originType: engineered
# version : version identifier (e.g. r0.1, r1.0, ...). The latest is shown by default in the list.
version: r0.1
# draft or published
status: draft
license: CC-BY-4.0
tags:
  - capteur-usb
  - monitoring-temperature
  - alerte-seuil
  - jumeau-numerique
  - simulation
publishedDate: 2026-04-15T00:00:00.000Z
---
## Summary

The system consists of a temperature monitoring setup based on a USB sensor connected to a PC.

The digital twin complements the physical device by enabling sensor simulation, scenario replay, and testing of various features such as alert rules (notably threshold exceedance) using simple real hardware.

The prototype was developed to:
- serve as a test service for setting up the portfolio,
- be distributed to interested EDT researchers to support their work.

---

## Functional Description

### Users

- **A developer** - implements and tests temperature alert rules.
- **A researcher** - uses the twin as a test bench for aggregation and detection methods.
- **A supervision operator** - monitors temperature during operations and acknowledges alerts.

### Functional Requirements

- **Predict** · *A developer* wants to replay temperature profiles (ramp, peak, oscillation) via the simulator to validate an alert rule without physical hardware, during the prototyping phase. **Metric:** 100% reproducibility, 1-hour scenario replayed in < 1 s.

- **Diagnose** · *A researcher* wants to compare several detection algorithms on the same measurement stream to identify the best sensitivity / false positive trade-off, during the methodological research phase. **Metric:** ≥ 3 algorithms compared on ≥ 50 reference scenarios.

- **Describe + Secure** · *A supervision operator* wants to visualise the current temperature and be alerted when a threshold is crossed to intervene before process degradation, in a continuously running production cell. **Metric:** refresh ≤ 5 s, alert delay < 1 s after threshold crossing.

---

## Digital Twin Characterisation

*Grid based on the <a href="https://journals.sagepub.com/doi/10.1177/00375497241261406" target="_blank" rel="noopener noreferrer">unified framework by Gil et al. (2024)</a> - 21 characteristics.*

### MC1 - System under study

Temperature measurement device consisting of a USB sensor connected to a PC, a software interface displaying the measurement every 5 seconds, and an alert system triggered when the temperature exceeds a configured maximum threshold.

### MC2 - Physical Acting Components

No physical actuator in the current version - the system is purely observational. The alert is an application signal (notification, log, screen).

### MC3 - Physical sensing components

- USB temperature sensor (PT100 probe, DS18B20, or thermocouple + USB converter)
- Host PC providing power and acquisition via the USB port

### MC4 - Physical-to-Virtual Interaction

Periodic temperature measurement acquisition every 5 seconds via the sensor's USB driver. Transmission of the raw value to the display interface and the threshold monitoring module.

### MC5 - Virtual-to-Physical Interaction

No data transmitted.

### MC6 - Digital Twin Services

- **Real-time monitoring**: display of temperature measurement refreshed every 5 seconds
- **Threshold exceedance detection**: alert when temperature crosses the configured maximum threshold
- **Simulation**: the twin enables sensor simulation (virtual measurement generation) to test interface and alert behaviour without hardware
- **Scenario replay**: ability to force temperature profiles (ramp, peak, oscillation) to validate alert rules

### MC7 - Twinning Time-scale

Real-time at a fixed 5-second step. The digital twin operates at the same cadence or can be accelerated to quickly replay test scenarios.

### MC8 - Multiplicities

A single twin for a single sensor in the prototype version. Extension possible to N parallel sensors.

### MC9 - Life-cycle Stages

Prototype in the design and validation phase. Typical use: development and testing of alert rules before deployment on real hardware.

### MC10 - Digital Twin Models and Data

- Sensor simulation model: measurement generator (constant, ramp, noise, peak)
- Data stream: timestamped temperature values (timestamp, value in °C)

### MC11 - Tooling and Enablers

Digital twin implemented in Python, graphical interface in native HTML.

### MC12 - Digital Twin Constellation

Simple architecture: USB driver → acquisition module → threshold monitoring module → user interface. The simulator replaces the USB driver in test mode.

### MC13 - Twinning Process and Digital Twin Evolution

Incremental approach: first the physical sensor + interface, then addition of the simulator for testing, then refinement of alert rules.

### MC14 - Fidelity and Validity Considerations

The simulator reproduces the measurement range and cadence of the physical sensor. Validation by comparison of simulated and measured values on reference scenarios.

### MC15 - Digital Twin Technical Connection

USB bus between sensor and PC. Local communication only in the prototype version.

### MC16 - Digital Twin Hosting/Deployment

Local execution on the host PC. No cloud or remote component in the current version.

### MC17 - Insights and decision-making

- Continuous display of the measurement
- Visual (and/or audible) alert on threshold crossing

### MC18 - Horizontal integration

No data exchange with other systems, but extension possible.

### MC19 - Data ownership and privacy

Local temperature data, non-sensitive. No external sharing in the prototype version.

### MC20 - Standardisation

No standard adopted at this stage.

### MC21 - Security and Safety Considerations

No identified risk.

---

## Scientific and Technical Challenges

### Unsupervised peak detection

Identifying a threshold crossing in real time without training labels, robust to USB sensor noise. The central challenge is robustness to slow drifts (thermal offset) and false positives caused by measurement spikes.

**Sandbox**: [Colab Notebook](https://colab.research.google.com/drive/example-uc00-detection) - comparison of 3 detectors on 50 reference scenarios

**Thesis**: *Adaptive detection for low-cost IoT sensors*, PhD candidate to be specified (Inria, 2025-2028)

**References**: [Pang et al. (2021) - Deep Learning for Anomaly Detection](https://doi.org/10.1145/3439950) - ACM Computing Surveys

---

## Resources

## References

- [Temperature Sensor (datasheet AliExpress)](https://fr.aliexpress.com/item/1005004139995534.html?spm=a2g0o.order_list.order_list_main.4.531a1802AyNwZz&gatewayAdapt=glo2fra)
