---
title: Agents as Run-time Exploratory Programmers for Digital Twins
type: PhD
researcher:
  name: Pierre Treton
  email: pierre.treton@inria.fr
pc: PC3
location: Rennes, France
host: Inria, diverSE
supervisors:
  - name: Benoit Combemale
    org: Inria & University of Rennes
    role: director
  - name: Thomas Degueule
    org: CNRS, LaBRI
    role: co-supervisor
startDate: 2026-09-01
status: ongoing
description: This PhD investigates how LLM-enabled autonomous agents can act as
  run-time exploratory programmers for digital twins, enabling live what-if
  scenario exploration without manual implementation of complex language support
  or state migration, by directly interacting with executing systems through
  existing interfaces and continuous feedback.
useCases: []
tags:
  - llm
  - agents
  - live-modeling
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
- Leverage and continuously update a digital shadow to reason over real-time state and environment feedback.

## Research Challenges

*Each challenge is annotated with the research questions (RQ_X) of the [EDT roadmap](https://hal.science/hal-05559524v1) [Vicat-Blanc et al., 2026].*

### Feasibility and reliability

Assessing whether LLM-based agents can effectively reason over noisy, partially observable, and time-dependent run-time data, and safely intervene in a running system.

**Associated RQs:** `RQ_D2` (data uncertainty, partial observations), `RQ_I2` (substitution of inductive models — validity envelope of the LLM), `RQ_F4` (precision and fidelity)

### Learning from run-time feedback

Studying how agents can exploit debugging information (live variable values, stack traces, etc.), execution traces, and sensor streams, and whether fine-tuning or adaptation strategies improve their performance in this setting.

**Associated RQs:** `RQ_D3` (collection of heterogeneous, noisy, incomplete data), `RQ_I2` (FATES+ properties of inductive models), `RQ_F6` (continuous improvement of quality properties)

### Exploratory programming by delegation

Characterizing exploratory programming tasks in digital twins and determining how they can be delegated to autonomous agents to systematically explore alternatives and trade-offs in collaboration with the digital twin users.

**Associated RQs:** `RQ_U2` (perception of the original system), `RQ_U3` (programming interactions with the DT), `RQ_U6` (collaboration within a DT)
