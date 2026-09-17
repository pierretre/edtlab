---
title: "Data Assimilation with Model Bias Correction for Digital Twin Monitoring of Complex Systems" # Avoid accents in title
type: "PhD"  # Options (Limited): "PostDoc", "PhD", "Engineer", "Intern"
pc: PC4
location: "Palaiseau, Toulouse, France"
publishedDate: 2026-06-30  # Date when job offer was published in YYYY-MM-DD format
filled: true  # Position availability status: true if position is filled, false if still available
description: "This PhD designs bias-aware data assimilation methods for digital twins of large, complex, high-dimensional systems, combining model reduction and AI to improve accuracy and robustness against model bias, validated on a Cetim pressure-vessel demonstrator." # Brief summary of the position (2-3 sentences). The detailed description goes in the Body section below.
requirements: ["Master degree in Applied Mathematics, Computational Mechanics, or Data Science", "Interest in numerical methods for data assimilation and uncertainty quantification", "Programming skills (Python and/or MATLAB)", "Good command of English"] # Some requirements in a list
contacts: ["ludovic.chamoin@ens-paris-saclay.fr", "serge.gratton@univ-toulouse.fr"]  # Array of contact emails for this position
---

## Context

Digital twins are virtual representations of real-world products, systems, or processes, enabling simulation, integration, testing, monitoring, and maintenance. They play a pivotal role in optimizing complex systems across a wide range of domains, from industrial manufacturing and energy to environmental monitoring and healthcare.

The PhD proposal is placed in the national collaborative research project [Engineering Digital Twins (EDT)](https://edtlab.fr/en/), conducted by Inria and started in 2026. More specifically, it is part of Work Package 4.3 of the project, which targets the smart and effective coupling between physical and digital assets in order to perform online monitoring of complex real-world systems, by means of adaptive digital twins and collected data. Topics of interest in the WP are optimal sensor placement (frugal data), reliability of digital twins, uncertainty-aware numerical methods for data assimilation and control, and model reduction techniques.

In the PhD work, we focus on data assimilation, which allows updating a model — for example, a digital twin — when new information arrives: new data, or deviations from expected relationships (such as the conservation of physical quantities). This central technique is proven in large-scale systems (like meteorology) but is very computationally expensive. It works well when the errors are known and even Gaussian in high dimensions. When considering complex (nonlinear, multiscale, multiphysics, …) high-dimensional problems with inherent large model bias (coming from the system dynamics itself or from fluctuating environmental and operational conditions), scientific challenges arise for effective data assimilation, both in terms of numerical performance (fast calculations) and robustness with respect to model bias, in order to ensure the reliability of the digital twin outputs.

## Thesis Objectives

To address the previously mentioned challenges, we wish to design bias-aware assimilation methods usable on large-scale systems for digital twins that typically have error signatures involving biases and structured errors, in addition to Gaussian errors from sensors. The goal is to build such methods, study them theoretically, and validate them on real application cases. This will involve a range of problem geometries, from simple problems to chaotic (unstable dynamics) ones that notably occur in mechanical systems, e.g., the Lorenz system as an archetype of a chaotic system.

We are interested in developing new algorithms that are (a) more accurate than data assimilation methods derived from the Kalman filter (such as variational and ensemble methods), and (b) less computationally expensive than those derived from the particle filter. We also aim to take into account the structure of the problem of interest (Lipschitz constant, conservation equations, and possibly an underlying Lie structure), to produce high-quality digital twins. Geometry will be key to handle situations where data are not numerous enough.

The PhD will thus include the following topics:

- **Surrogate models for data assimilation**, coming from classical model reduction techniques (ROM) as well as AI methods. ROM techniques are essential for making large-scale systems computationally feasible, using nonlinear transformations and multiscale approaches to reduce model complexity while maintaining important dynamic properties. AI can be used to learn a transformation (transport map) that performs the error density update for non-Gaussian and highly nonlinear systems; diffusion models and attention mechanisms may also be investigated to model the dynamics.
- **Adaptive hybrid twinning**, in which physics-based models and data-based enrichment/bias-correcting models are combined and dynamically adjusted to minimize discrepancy between the physical system and its digital replica. The general PBDW framework will be considered to build hybrid twins from reduced physics-based models and observation data, adapted to applications of interest and coupled with physics-augmented AI tools, leveraging physical properties such as the Hamiltonian structure of the dynamics to bring added precision, resilience to data overfitting, and interpretability.
- **Sequential data assimilation (filtering)**, inserting the previous techniques into filtering procedures to perform fast calculations as well as consistent quantification and propagation of uncertainty stemming from the various modeling error sources. This involves the definition and updating of a model bias structure inside the filtering, which may lead to coupling between sequential and variational approaches, or to a state vector extended with hyperparameters (such as those related to bias-corrective neural networks).

## Proof of Concept

Beyond academic numerical experiments, the proposed methodology will be illustrated and its performance quantified on a real-life application in collaboration with Cetim: a mechanical engineering structure, in the form of a pressure vessel (JUNAP equipment). The associated JUNAP demonstrator is representative of a real chemical reactor in operation, scaled down (downscaling factor of 1/3.6 applied to original reactor dimensions, loads and thicknesses, reducing the volume from 124 to 1.34 m³), while still accurately representing the real reactor in terms of critical zones and stress distribution. The digital twin of the demonstrator, envisioned by Cetim, will: (i) monitor the damage rate of the equipment under constant nominal loads as well as under random loads; (ii) analyze the impact of sudden pressure surges; (iii) monitor inaccessible critical areas on the pressure vessel, easing decisions about future inspections; (iv) enable simulation of planned solicitation scenarios (load spectra) before their implementation, to predict their effect on the equipment's life.

On this application, the PhD work aims to answer several scientific challenges in terms of adaptability of the digital twin (can it ensure the monitoring of the structure's integrity while adapting to multiple in-service scenarios?), numerical efficiency (going from a few minutes to a few seconds of computation), intelligent sensing (optimal number and position of sensors to ensure effective monitoring while minimizing costs), and alignment between the physical asset and the digital twin outputs. The research work will benefit from real data obtained from sensors equipping the demonstrator, and will generate building blocks to be integrated into the general numerical platform of the EDT project.

## Work Environment

The PhD will be collaboratively supervised by Ludovic CHAMOIN (ENS Paris-Saclay) and Serge GRATTON (ANITI Toulouse), who have complementary skills across the topics addressed in the research work (computational mechanics, applied mathematics, data science, etc.). The PhD candidate will have the opportunity to spend time in both institutions involved.

## What You Will Gain from This PhD

This PhD offers the opportunity to:

- Develop expertise in data assimilation, model reduction, uncertainty quantification, and digital twins for complex systems
- Collaborate with leading partners (ENS Paris-Saclay, ANITI, Cetim) and validate research on a real industrial use case (Cetim's JUNAP demonstrator)
- Join a network of PhD candidates within the EDT program
- Contribute building blocks to the EDT program's general numerical platform and publish in international conferences and journals
- Gain recognition in a rapidly growing field with diverse career prospects in academia, industry R&D, or entrepreneurship
