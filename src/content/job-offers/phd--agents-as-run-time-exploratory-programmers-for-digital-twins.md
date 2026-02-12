---
title: Agents as Run-time Exploratory Programmers for Digital Twins
type: phd
location: Inria (Rennes) or CNRS/LABRI (Bordeaux)
expectedStartDate: Spring 2026
publishedDate: 2026-01-01T10:36:00.000+01:00
filled: true
description: blabla
tags:
  - PC3
---
## Context
A digital twin is a virtual representation of an intended or actual real-world product, system, or process that serves as a digital counterpart of it for purposes such as simulation, integration, testing, monitoring, and maintenance. A key promise of digital twins is to enable stakeholders to explore what-if scenarios: evaluating alternative configurations, behaviors, or interventions while the system is running, so as to improve performance, reliability, and adaptability. However, enabling such exploratory interactions remains challenging in practice.

Live programming and live modeling principles offer strong conceptual foundations for manipulating programs and models at run time, with immediate feedback on the effects of changes on the running system. While these techniques are well suited to the needs of digital twins, existing approaches often rely on advanced language support, intrusive instrumentation, and complex run-time state migration mechanisms that are difficult to engineer, maintain, and generalize across systems.

In parallel, recent advances in large language models (LLMs) have led to the emergence of agentic AI. Agents operate autonomously in complex environments through interactions with tools and continuous feedback. Coding agents, in particular, are on the rise and show strong performance in coding and software engineering tasks. Such agents act by writing code and patches, interact with the environment through command-line tools, and gather feedback through compilation, test execution, and execution logs. Yet, although these agents have demonstrated strong capabilities in offline software engineering tasks, their potential as run-time actors within executing systems remains largely unexplored.

## Research Objective
The main objective of this PhD project is to investigate whether and how LLM-enabled autonomous agents can act as run-time exploratory programmers for digital twins. The thesis explores the hypothesis that such agents can enable live what-if scenario exploration without requiring the manual implementation of specialized language support or complex state migration, by directly interacting with the running system through existing interfaces.

Specifically, the thesis aims to design and evaluate run-time agents that:

- Operate within or alongside a digital twin during execution;
- Explore execution alternatives by interacting with the run-time system through a REPL or equivalent run-time interface;
- Observe system behavior and evaluate desired properties to iteratively refine candidate solutions through debugging tools, execution traces, logs, and sensor data;
- Leverage and continously update a digital shadow to reason over real-time state and environment feedback.

## Research Challenges
This research addresses several open challenges:

- Feasibility and reliability: assessing whether LLM-based agents can effectively reason over noisy, partially observable, and time-dependent run-time data, and safely intervene in a running system.
- Learning from run-time feedback: studying how agents can exploit debugging information (live variable values, stack traces, etc.), execution traces, and sensor streams, and whether fine-tuning or adaptation strategies improve their performance in this setting.
- Exploratory programming by delegation and collaboration with the digital twin user: characterizing exploratory programming tasks in digital twins and determining how they can be delegated to autonomous agents to systematically explore alternatives and trade-offs in collaboration with the digital twin users.

## Environnement
The candidate will be co-supervised by both Prof. Benoit Combemale (Inria & University of Rennes, Rennes) and Dr. Thomas Degueule (CNRS, LABRI, Bordeaux).

## What You Will Gain from This PhD
This PhD offers the opportunity to:
* Develop highly sought-after skills in system modeling, real-time data processing, and collaborative innovation.
* Collaborate with leading partners (Inria, CEA, CNRS, etc.) and validate your research on real-world industrial use cases.
* Join a network of PhD candidates within the EDT program, fostering collaboration, peer support, and interdisciplinary exchanges.
* Contribute to an open-source platform (Artemis) and publish in international conferences and journals.
* Gain recognition in a rapidly growing field, with career prospects in academic research, industrial R&D, or entrepreneurship.

Upon completion, you will be positioned as a recognized expert in a key domain for industry and research, with diverse professional opportunities in France and internationally.

## References
[1] Benoît Combemale, Pascale Vicat-Blanc, Arnaud Blouin, Hind Bril El Haouzi, Jean-Michel Bruel, et al.. Engineering Digital Twins: A Research Roadmap. EDTconf 2025 - 2nd International Conference on Engineering Digital Twins, Oct 2025, Grand Rapids, Michigan, United States. pp.1-7. [⟨hal-05223776⟩](https://inria.hal.science/hal-05223776)
