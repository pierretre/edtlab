---
title: Model Hybridization in Digital Twins for Mechanical Engineering
type: PhD
researcher:
  name: Mahussi Datongnon
  email: mahussi-jeff-fidele.datongnon@inria.fr
pc: PC1
funding: external
location: Sophia Antipolis, France
supervisors:
  - name: Benoit Combemale
    org: Inria — DiverSE team
  - name: Julien Deantoni
    org: Université Côte d'Azur — I3S / Inria Kairos team
  - name: Yoann JUS
    org: CETIM
  - name: Hubert LEJEUNE
    org: CETIM
startDate: 2025-10-01
status: ongoing
description: CETIM-funded PhD on hybrid modeling for digital twins of mechanical equipment, combining model simulation and data science to enable predictive maintenance, optimization and decision support on the CETIM JNEM thermal-hydraulic loop.
useCases:
  - title: UC05 — CETIM Fluid loop
    ref: uc05-fluidic-loop-cetim-r1-0-fr
tags:
  - hybrid-modeling
  - adaptive-modeling
  - mechanical-engineering
  - CETIM
---

## Context

Complex cyber-physical systems are evolving at an accelerating pace, operating in increasingly dynamic environments and contending with ever-increasing uncertainty. This requires a high level of adaptability, through a continuous engineering of complex cyber-physical, socio-technical, ecosystems. Digital twins are key enablers, and leverage on both model simulation and data science. Modeling & Simulation is a time-honored activity consisting in building complex analytical models to be simulated to evaluate natural or engineered phenomena. Conversely, data science relies on the availability of data to build complex predictive AI-based learning models. While both could be confused or even opposed, we argue they better complement each other to enhance the ability to best engineer complex systems continuously.

The sound hybridization of model simulation and data science enables a coordinated use of both techniques in complex scenarios (e.g., analytical models for explanation, and data model for recurrent pattern retrieval). Moreover, the hybridization also opens the door to adaptive modeling, where one model is inferred or refined by the others, and vice-versa (e.g., inferring or refining an analytical model from a learning model, and better tuning and explaining a learning model thanks to an analytical model).

Challenges are related to the identification of relevant patterns, and their proper implementations with well-defined interfaces for each model and the required protocols and operators to support the proposed scenarios. We aim to establish the first unifying theory for both model simulation and learning models, and demonstrate its applicability in practice within digital twins for mechanical engineering.

## Objectives
Unifying theory for inductive and deductive reasoning

### Hybrid modeling: coordinated use of heterogeneous predictive models.
This objective focuses on the definition of well-defined concepts to specify complex hybrid modeling scenarios through the coordinated use of different techniques involved in digital twins, e.g., Modeling & Simulation, Machine Learning, Data Mining, etc. These concepts will provide the semantic foundations to enact hybrid models in digital twin services such as recommenders, linters and decision-making tools.

### Adaptive modeling: model adaptation (inference/refinement/configuration).
This objective focuses on the definition of well-defined concepts to specify complex adaptive modeling scenarios through a retro-action in between the different models involved in the different techniques (e.g., Modeling & Simulation, Machine Learning, Data Mining, etc.) These concepts will provide the semantic foundations to enact adaptive modeling scenarios in digital twin services such as modeling environment, and decision-making tools.

### Model interfaces and protocols.
This objective aims at formalizing the required model interfaces and protocols to leverage on the two aforementioned objectives. The outcome is a unifying predictive platform, supporting both the orchestration of service requests on the different available predictive models, but also possibly the adaptation of them from others.

## Application domain
The application domain of this work involves Mechanical equipments or systems made of several mechanical equipments. Several potential industrial applications in the field of Process equipment (fluid systems, specific components as valves,…), Mobile (off-road) working machines (as forklift or parts of it) and Production machines (welding robot, machining,…) are targeted. Therefore the developped pattern should be generic enough to encompass the aforementioned applications. Nevertheless, the existing thermal-hydraulic loop (JNEM) available at the Cetim facility may be used as a support for the involved developpment.

The JNEM loop is representative of an industrial process loop. It’s a closed, instrumented hydraulic loop. It is equipped with a pump, a heat exchanger, a tank, a regulation valve and three piping sections. Its function is simply to provide the flow, pressure and/or temperature requested by the operator. Several control devices have been added to generate some defects artificially in the future.

This digital twin is designed to serve several purposes: predictive maintenance, optimization of process loop settings and decision support. 

The main objectives are to:
- Detect, localize, and estimate variations in process parameters (pipe clogging, heat exchanger performance degradation, valve dynamic behavior changes, etc.) through comparison with process parameters measurements (flow, pressure, temperature) at several locations of the physical system
- Optimization of the process loop settings (pump speed, valve opening) to reach target process parameters (flow, pressure, temperature) according to operator requirements (minimization of the time to reach the target, minimization of the energy consumption…) thanks to the simulation of different scenario using the digital twin. The “best” scenario is then automatically applied on the physical system through the driving of the involved actuators or through operator validation.
- Provide monitoring and prediction capabilities: use of virtual sensor to estimate and predict process parameters, such as flow rate (in the event of a flow meter failure), allowing for real-time monitoring and control of the physical system

## Environment
This PhD is funded by the CETIM (the French Technical Center for Mechanical Industries) in the context of a collaboration with Inria (the national center for research in computer science).

## Research Challenges

*Each challenge is annotated with the research questions (RQ_X) of the [EDT research roadmap](https://inria.hal.science/hal-05223776) [Combemale, Vicat-Blanc et al., EDTconf 2025].*

### Hybrid modeling: coordinated use of heterogeneous predictive models

Defining well-defined concepts to specify complex hybrid modeling scenarios through the coordinated use of different techniques (Modeling & Simulation, Machine Learning, Data Mining) in digital twin services such as recommenders, linters and decision-making tools.

**Associated RQs:** `RQ_I3` (hybridization patterns of deductive/inductive models), `RQ_I4` (composition operators for hybridization)

### Adaptive modeling: model adaptation (inference/refinement/configuration)

Specifying complex adaptive modeling scenarios through retro-action between the different models involved (Modeling & Simulation, Machine Learning, Data Mining), continuously evolving/training wrt. observations, and assessing the effect on validity.

**Associated RQs:** `RQ_D6` (continuous evolution of simulation models), `RQ_D8` (continuous training/tuning of AI models), `RQ_I5` (effect of hybridization on validity/FATES+)

### Model interfaces and protocols

Formalizing the required model manipulation interfaces and protocols to orchestrate service requests across heterogeneous predictive models and enable their adaptation from one another.

**Associated RQs:** `RQ_D7` (CRUD-like interface for simulation models), `RQ_D9` (CRUD-like interface for AI models)

### Application to predictive maintenance and virtual sensing

Detecting, localizing and estimating variations in process parameters on the CETIM JNEM loop, including estimating unmeasurable parameters (e.g., flow rate on flow meter failure) and quantifying the fidelity of hybrid model predictions.

**Associated RQs:** `RQ_D2` (unmeasurable / partially observable data), `RQ_T4` (quantification of accuracy and fidelity)

## Use cases
[UC05 — CETIM Fluid loop](/en/use-cases/uc05-boucle-fluidique-cetim-r0-1)

## References

- Eramo R., Bordeleau F., Combemale B., van den Brand M., Wimmer M., Wortmann A. Conceptualizing Digital Twins, *IEEE Software*, 39(2), 2022, pp. 39-46.
- Verdecchia R., Cruz L., Sallou J., Lin M., Wickenden J., Hotellier E. Data-Centric Green AI: An Exploratory Empirical Study, *ICT4S 2022* (Plovdiv, Bulgaria), pp. 35-45.
- Narciso D. A. C., Martins F. G. Application of machine learning tools for energy efficiency in industry: A review, *Energy Reports*, 6, 2020, pp. 1181-1199.
- Ahmad M. W., Mourshed M., Rezgui Y. Trees vs Neurons: Comparison between random forest and ANN for high-resolution prediction of building energy consumption, *Energy and Buildings*, 147, 2017, pp. 77-89.
- Zendehboudi S., Rezaei N., Lohi A. [Applications of hybrid models in chemical, petroleum, and energy systems: A systematic review](https://doi.org/10.1016/j.apenergy.2018.06.051), *Applied Energy*, 228, 2018, pp. 2539-2566.
- Slater L., Arnal L., Boucher M.-A., Chang A. Y.-Y., Moulds S., Murphy C. *et al.* Hybrid forecasting: using statistics and machine learning to integrate predictions from dynamical models, *Hydrology and Earth System Sciences Discussions*, 2022, pp. 1-35.
- Syauqi A., Pavian Eldi G., Andika R., Lim H. [Reducing data requirement for accurate photovoltaic power prediction using hybrid machine learning-physical model on diverse dataset](https://doi.org/10.1016/j.solener.2024.112814), *Solar Energy*, 279, 2024, art. 112814.
- Mayer M. J. [Benefits of physical and machine learning hybridization for photovoltaic power forecasting](https://doi.org/10.1016/j.rser.2022.112772), *Renewable and Sustainable Energy Reviews*, 168, 2022, art. 112772.
- Rudolph M., Kurz S., Rakitsch B. Hybrid modeling design patterns, *Journal of Mathematics in Industry*, 14(1), 2024, art. 3.
- von Rueden L., Mayer S., Sifa R., Bauckhage C., Garcke J. Combining machine learning and simulation to a hybrid modelling approach: Current and future directions, *Advances in Intelligent Data Analysis XVIII (IDA 2020)*, Springer, pp. 548-560.
- von Rueden L., Mayer S., Beckh K., Georgiev B., Giesselbach S., Heese R. *et al.* Informed machine learning: a taxonomy and survey of integrating prior knowledge into learning systems, *IEEE Transactions on Knowledge and Data Engineering*, 35(1), 2021, pp. 614-633.
- Thummerer T., Mikelsons L. [Learnable & Interpretable Model Combination in Dynamical Systems Modeling](https://arxiv.org/abs/2406.08093), *arXiv*, 2025.
- Hajirahimi Z., Khashei M. Hybridization of hybrid structures for time series forecasting: a review, *Artificial Intelligence Review*, 56(2), 2022, pp. 1201-1261.
- Schweidtmann A. M., Zhang D., von Stosch M. A review and perspective on hybrid modeling methodologies, *Digital Chemical Engineering*, 10, 2024, art. 100136.
- Yang S., Navarathna P., Ghosh S., Bequette B. W. Hybrid modeling in the era of smart manufacturing, *Computers & Chemical Engineering*, 140, 2020, art. 106874.
- Wang J., Li Y., Gao R. X., Zhang F. Hybrid physics-based and data-driven models for smart manufacturing: Modelling, simulation, and explainability, *Journal of Manufacturing Systems*, 63, 2022, pp. 381-391.