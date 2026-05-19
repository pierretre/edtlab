---
title: "Interconnection of digital twin knowledge" 
type: "PhD" 
location: "Grenoble, France"
expectedStartDate: "Spring 2026"  
publishedDate: 2026-03-15  
filled: false 
description: "Digital twins will need to represent a variety of knowledge about territories and related data. It is therefore not possible to rely solely on a single unifying model, but must be able to interact with a variety of heterogeneous representations. This PhD project aims to manage the diversity of knowledge and viewpoints." 
requirements: ["Master degree in Software Engineering", "Experience with digital twins"] 
tags:
  - "PC2"  
contacts: ["jerome.david@inria.fr", "sophie.ebersold@irit.fr"]  
references:
  - "anna-2023-combining"
  - "edt-roadmap"
  - "pascal-2009-foundations"
  - "krzysztof-2020-neuralsymbolic"
  - "chloe-2025-graph"
  - "guilherme-2025-results"
  - "guilherme-2026-survey"
---

## Context

Digital twins are virtual representations of real-world products, systems, or processes, enabling simulation, integration, testing, monitoring, and maintenance.
They play a pivotal role in optimizing complex systems across a wide range of domains, from industrial manufacturing and energy to environmental monitoring and healthcare.

The Engineering Digital Twin [EDT program](https://edtlab.fr/en/), funded by the France 2030 investment plan, is a national initiative aimed at advancing the foundations of digital twin engineering in France and Europe \[2\]. By bringing together leading academic and industrial partners, EDT seeks to strengthen the bases for the design, use, and deployment of digital twins, addressing key open challenges in model hybridization, composability, development methodologies, digital coupling, and human–twin interaction.

A key promise of digital twins is to enable stakeholders to explore what-if scenarios: evaluating alternative configurations, behaviours, or interventions while the system is running, so as to improve performance, reliability, and adaptability. However, enabling such exploratory interactions remains challenging in practice. Digital twins leverage diverse and heterogeneous knowledge about territories and related data. It is therefore not possible to rely solely on a single unifying model, but rather it is necessary to manage the interactions between heterogeneous representations of knowledge and various viewpoints.

The semantic web provides a set of technologies for representing and reasoning about knowledge on a web scale \[3\]. These technologies include RDF for representing knowledge graphs and OWL for formalising ontologies. In order to manage the heterogeneity of knowledge, alignments between ontologies make it possible to express the relationships between concepts (classes and properties) from different ontologies. At the data level, linking keys define sufficient conditions for identifying resources from different knowledge graphs.

## Thesis Objectives

Digital twins rely on the integration of multiple heterogeneous models and data sources, such as sensor observations, simulation models, geographic information systems, and domain knowledge bases. Ontology alignment will therefore play a central role in reconciling these heterogeneous representations and enabling consistent interpretation and integration of the data they produce.

With rapid advances in neural AI, work in the semantic web, historically based on symbolic AI (knowledge representation and reasoning), is moving towards neuro-symbolic AI \[2,4\]. Neuro-symbolic AI aims to combine the strengths of machine learning (noise robustness, statistical generalisation) with those of symbolic AI (explainability and logical reasoning).

The objective of this thesis is to study the contribution of neuro-symbolic to ontology alignment \[5\] and data linking \[6\] in the context of France's digital twin. The expected work consists of two main parts:

* Improve methods for automatically aligning ontologies and linking data by leveraging the scalability, approximation, and multi-viewpoint capabilities of deep learning methods.
* Study how the semantics of ontology alignment and linking keys can contribute to the validation and explainability of methods based solely on machine learning.

The work developed in this thesis will enable the construction of a semantic bridge allowing interoperability between the different viewpoints of a digital twin.
The results of this thesis will directly contribute to the Artemis platform, an open-source framework designed to become a benchmark in the field.

## Work Environment

The PhD candidate will be co-supervised by Jérôme David (UGA,LIG,Inria), Cassia Trojahn (UGA,LIG,Inria) within [MOEX Team, INRIA/Grenoble](https://moex.inria.fr) and Sophie Ebersold (IRIT, Toulouse) . The candidate will benefit from a stimulating scientific and industrial environment of the highest level, with access to a national network of leading research institutions and industry partners, regular interactions with the broader EDT community through workshops, seminars, and joint demonstrators, and the opportunity to contribute to Artemis, the program's open software platform.

## What You Will Gain from This PhD

This PhD offers the opportunity to:

- Develop highly sought-after skills in knowledge engineering, semantics alignment, and collaborative innovation.
- Collaborate with leading partners (Inria, CEA, CNRS, etc.) and validate your research on real-world industrial use cases.
- Join a network of PhD candidates within the EDT program, fostering collaboration, peer support, and interdisciplinary exchanges.
- Contribute to an open-source platform (Artemis) and publish in international conferences and journals.
- Gain recognition in a rapidly growing field, with career prospects in academic research, industrial R&D, or entrepreneurship.

Upon completion, you will be positioned as a recognized expert in a key domain for industry and research, with diverse professional opportunities in France and internationally.

