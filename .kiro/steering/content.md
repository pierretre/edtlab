<!------------------------------------------------------------------------------------
   Add Rules to this file or a short description and have Kiro refine them for you:   
-------------------------------------------------------------------------------------> 

Here is some content you may find interesting to fill in the website, it is organized as in the proposal, it is up to you to reorganize this in a more web oriented structure :

## 1.4
### Vision
The engineering of digital twins is an important endeavors which requires a multi-disciplinary effort at the crossroad of software engineering, modeling and simulation, numerical analysis, artificial intelligence, computing systems (HPC, cloud/edge), distributed and embedded systems, HCI and data management just to name a few. EDT provides a unique opportunity to foster collaborations between these different scientific communities, mostly working in silos in other contexts like CNRS research groups and other national programs (e.g., PEPR). With a specific focus and objective to support the engineering of digital twins, EDT aims to create a multidisciplinary community with an international leadership (Goal 1).

EDT ambitions to develop the required foundations of the science and engineering of digital twins (Goal 2), in order to propose the principles, tools and methods to support digital twin development, validation and verification, deployment, maintenance and evolution. The research activities leverage on progresses in modern software technologies, particularly in terms of architecture and software modeling (simulation, model-based engineering), highperformance computing, operating systems, programmability (software-defined, language, compilation), agility and DevOps, reproducibility, reusability, verification (automated tests, proofs, formal calculation), and implementation (cloud, edge, software defined network). The research activities also leverage on the various existing tools and methods, as well as the various lessons learned to establish foundations, methodologies and software engineering tools and methods for the design, development, deployment and operation of digital twins.

In addition to the resulting scientific corpus, EDT will deliver Artemis, a collaborative and web-based software platform to engineer digital twins (Goal 3). Artemis will offer a high level of automation and support for the development, validation & verification, deployment, maintenance and evolution of digital twins and associated services. Artemis will also leverage existing tools and models by providing them in the forms of libraries. Specific measures have been identified within EDT to ensure the integration of the various technological outcomes and to develop an exploitation plan that will support the platform’s sustainability and continued advancement beyond the lifetime of EDT (cf. cross-cutting actions 3 and 7 in Section 5).

Moreover, EDT will leverage on additional instruments for maturing and industrializing Artemis, including resources from Inria (SED and Apollo project), CEA (internal PRISM project), CNES (internal Digital Twin Factory project, PhD/Postdoc grants, and industrialization project), and IGN (internal software engineers), but also on additional national and European collaborative projects with industrial partners.

One of the risks of a generic approach is to end up with tools disconnected from the needs of the field and real uses, endorsed by a community of business users. To avoid this, EDT identified a set of more than 40 use cases (see Section3, Table B), all will be carefully analyzed and detailed to be provided as inputs to the different focused projects. This will make it possible to remain close to real problems, while ensuring a certain level of generality of the solutions, and promoting the development of concrete prototypes and demonstrators.

From this catalog of use cases, EDT ’s Operating and Usage Committees will identify the set of the most representative and cross-cutting use cases, and end-to-end EDT Demonstrators (Goal 4) will be developed for each of them (see section 5.2 and Appendix C) in order to experiment and validate the Artemis platform. This will also contribute to strengthen and accelerate the development of these use cases.

EDT will ensure a close partnership with the other related French PEPR and projects by including representatives of them in the Usage and Scientific Committees. Additionally, the PEPR VDBI will propose a use case to EDT , a common use case is also considered with PEPR eNSEMBLE to leverage on the co-design approaches and collaborative features proposed by the PEPR. A collaboration with the PEPR ICCARE will provide the opportunity to leverage on the inputs from the social and human sciences. EDT will leverage on the PEPR Cloud and NumPex in terms of computing and storage resources management for DT deployment, on the PEPR 5G

-Réseaux du Futur for communication facilities. Reversely, the EDT will also nurture the "Digital Twin of an IT Infrastructure", use case of the PEPR Cloud and the "Network Digital Twin", use case of the PEPR Réseaux, in terms of foundational abstractions and model hybridization principles. EDT will also collaborate with the PEPR CyberSécurité for security concerns with respect to digital coupling and the engineering of a "secure by design" DT itself, bringing new embedded security and orchestration challenges on the table. Synergies with the PEPR Mobidec have been identified mainly on the Digital Coupling aspect as well as building blocks and data around mobility use cases.

EDT is also at the crossroad of the expertise developed in various CNRS research groups (GDR). While the main expertise is in the scope of the GDR GPL on software engineering, it also leverages on the expertise developed in the GDRs RSD (network and distributed systems), MACS (automatic) and IHM (HCI). EDT is also connected to the expertise coming from the GDR I-GAIA and IA (AI), IG-RV (virtual reality), EcoInfo (sustainable digitalization), MADICS (data management) and ROBOTIQUE (robotics). Finally, EDT is also related to the GDRs EXMODELI (modeling), SI (security), SOC2 (embedded systems), MAGIS (spacial information) and Calcul (HPC).

### 1.5
Scientific barriers 

While it is true that Digital twins contains many domain-specific aspects, they also enclose many generic aspects, independent of applications and domains. We list bellow the major challenges that EDT aims to tackle:
- (C1) : Methods, abstractions, interfaces and languages to combine physical models and data-based models are still lacking; model reduction and surrogate modeling have to be explored in the context of DT as well multi-fidelity and multi-scale dimensions; verification, validation and quantification of uncertainties are critical in the context of Digital Twins.
- (C2) : Composing different DT to reflect a system of Systems (SoS) is still challenging; Taking into account the DT evolution together with the evolution of the physical twin opens
a lot of questions; data interoperability, ontology’s alignment, uncertainties propagation are critical in the context of DT composition and interconnection.
- (C3) : Digital twin software foundation and architecture are needed to study how all the elements of the digital twin can be designed, structured and orchestrated to create a functional system throughout the life of the physical entity represented by the DT.
- (C4) : They are also still many challenges related to the bidirectional flows between the physical and digital twins: advance data assimilation, inverse problems, control and sensor
piloting methods; synchronisation between physical twin and the DT; advanced communication and sensing; non-functional properties: security, privacy, reliability; formal and temporal validation are required to make a digital twin trustworthy. Distributed data collection, storage and processing in the context of DT is also on the agenda.
- (C5) : On the human-computer interaction concern, they are may difficulties and scientific questions in terms of multimodal data fusion, interactivity and immersion, data visualisation, socio-technical challenges, integration of the human in the DT-PT loop.
- (C6) : As the technology may be adopted massively, it is very important to study the ethical and environmental responsibility questions as early as possible in order to recommend appropriate policies and regulations and practices.

## 2.1
General principles and organization

The main expected outcomes of EDT are: (1) A national (scientific, technological and user) community with an international leadership on Engineering Digital Twin ; (2) A methodological corpus for a Science of Engineering Digital Twin ; (3) An open-source platform for Engineering Digital Twins, together with generic open-source tools and libraries ; (4) Representative end-to-end demonstrators (open source software) of selected use cases.

To achieve these goals, which imply a lot of cross-functional activities, the program has been structured in 5 tightly connected focused projects (Projets Ciblés, PC) based on a collection of more than 40 shared use cases (UC), and 7 cross-cutting actions (Actions Transverses, AT). Figure 1 gives an overview of the EDT implementation plan.

#### 2.1.1
 Focused Projects
Focused Projects (PC) are in charge of producing the science and software basis of the program and are heavily rooted in use cases. Figure 2 gives a summary of the topics studied in each of the focused projects, and Section 4 gives the detail of each focused project. Projects are tightly interrelated. For example, the core software engineering projects (PC1 Model Hybridization, PC2 Architecture, Composition and Interoperability and PC3 Development Life Cycle share key aspects such as uncertainty modeling and propagation, model description and encapsulation, components definition and integration. PC4 which take care of the Digital Coupling share implementation considerations with PC3, while PC5, Human Interface, is tightly linked to data representation models and standards studied in PC2. Section 4 gives the details of the PCs
activity of EDT .

#### 2.1.2
 Use Cases
All the PCs will be based on the collection of Use cases (UC) provided by the community. These UCs are feeding them with Requirements, Input Data and Modules for validating concepts and solutions proposed via Proof-of-Concept (PoC) development and demonstrations. These UCs may be shared by different PCs, which will reinforce the coherence of the researches as well as tighten the interactions between the Program members. These UCs will be selected to crosscut as much as possible all PCs, but also with respect to their affinity to the PCs challenges and to be representative of the various kind of physical systems. Section 3 presents the initial use cases list that will be analysed and enriched during the fist year of the EDT program to serve for PCs research work. End-to-end Demonstrators will be build on the most representatives of this Use Cases list to serve as foundations for education and knowledge transfer. Section 3 gives the details of the UC activity of EDT and the Appendix C.

#### 2.1.3
 Cross-Cutting Actions
To ensure a smooth collaboration, the building of a vibrant community and a strong consistency in the R&D, Program governance and animation is structured via a set of 7 Cross-cutting actions (AT): 1) AT1: Animation, 2) AT2: Use cases and demonstrators, 3) AT3: Platform integration, 4) AT4: Standardization; 5) AT5: Education; 6) AT6: Ethics and Sustainability; 7) AT7: Dissemination and Exploitation . Section 5 gives the detail of each cross-cutting actions of EDT .

#### 2.3.1
 Principal Investigators
Pascale Vicat-Blanc (PVB) is Senior Research Scientist at Inria (DR1), where she is "Chargée de Mission pour l’Industrie du Futur" and associated member of the LIP Laboratory at Ecole Normale Supérieure de Lyon (UMR ENS Lyon, CNRS, Inria, University of Lyon). Her research interests cover Networks, Clouds and IoT (Network Digital Twin technology, Internet protocols, Network virtualization and programming (NFV, SDN), Internet of Things (IoT), Digital Infrastructure Observability). She has been supervising 15 PhD students, co-authoring 180+ international journals and conferences articles, 2 books and 12 granted FR and US patents. She has participated to the development of software (SaaS) products commercialized by the three startups she created and managed.

PVB has been Lecturer (McF) Ecole Centrale de Lyon, head of Inria RESO team (UMR LIP) and Inria’s leader of 6 international initiatives, in EU, Japan and the USA. She has been leading 3 national ANR initiatives. She has co-chaired an Inria-Bell Labs research team, and Industrial partnerships with SunMicrosystems, Myricom and Orange. Co-founder and CEO of three start-ups, PVB has also been Senior Director Product Development at F5 Networks (USA) where she was head of IoT & Network Analytics product innovation. PVB is member of the Scientific Council of the French Computer Society, of the Scientific Council of the IRT SystemX and at the board of the ENS Lyon. Pascale received the Innovation Prize - Academy of Sciences INRIA – Dassault System, and the Joliot-Curie Prize - Femme-Entreprise - Ministry of Research.

She is also Knight of the Legion of Honor.

PVB received a Habilitation à Diriger les Recherches (HDR) in Computer Science from ENS
Lyon, a PhD and Engineering degree in Computer Science from INSA Lyon.

Benoit Combemale is Full Professor of Software and Systems Engineering at the University of Rennes where he is co-leading the research team DiverSE joint to the IRISA and Inria labs.

He is also adjunct researcher in the SM@RT team of the CNRS IRIT labs in Toulouse, and Chief Science Advisor for TwiinIT, a startup specializing in Digital Twins. He is currently serving as Editor-in-Chief for the International Journal on Software and Systems Modeling (SoSyM), editorial board member for the journals SQJ and JOT, and steering committee member for the conferences MODELS, EDTConf, SLE and ICT4S. He is also a founding member of the international community about Engineering Digital Twins (edt.community), and the Eclipse research consortium GEMOC about the coordinated use of heterogeneous modeling languages.

Prof. Combemale specializes in software and systems engineering, including model driven engineering (MDE), software language engineering (SLE) and Validation & Verification (V&V), applied to scientific computing, cyber-physical systems and digital twins. He is the author of 3 books, and 170+ journal and conference publications in the fields of MDE, SLE and V&V. He also edited 2 books and various special issues in scientific journals.

Prof. Combemale has been a Full Professor at the University of Toulouse, and a Visiting Professor at Colorado State University and McGill University. He earned in 2015 an Habilitation in Computer Science from the University of Rennes, and in 2008 a PhD in Computer Science from the University of Toulouse, awarded by the prize Leopold Escande.

# 3
Use Cases

EDT is deeply rooted in use cases provided by the user community composed of public partners participating to EDT (e.g., CNES, IGN, IFPEN, INRAE, CIRAD, IRD, CEA, CNRS, IMT, INRIA and universities of FU, UDICE) and external partners such as technical centers (CETIM, etc.), technologicial research institutes (IRT SystemX, IRT Saint Exupery or IRT Jules Verne) or Industrials partners associated to EDT via the Usage Committee. These use cases supply real-world requirements, as well as specific models, data and tools to challenge the concepts, abstractions and solutions proposed by the focused projects. A set of more than 40 use cases have been gathered and will serve as the initial UCs repository. The current inventory of these use cases is proposed in Appendix B, Table B. The different types of physical systems considered for twining include natural systems, human-made systems and artificial systems (including cyberphysical systems, infrastructures and processes). These use cases are categorized according the physical twin types but also their characteristics and specific engineering challenges, and mapped to the focused projects (PC1 to PC5) according their affinity to the topics developed by these PCs. For example, PC1 (Model Hybridization and Management) requires UCs with a large diversity of models; PC2 (Architecture, Composability and Interoperability) requires UCs with a federation or composition of DTs as well as interoperability challenges; PC3 (Methodology, Development Life Cycle, and Languages) needs UCs with different maturity levels; PC4 (Digital Coupling and Gateway) UCs with diverse connectivity or temporal requirements as well as UCs with bidirectional links with the Physical Twin; PC5 (Human-Digital Twin Interactions) will leverage UCs where, according to the purpose of the DT (understanding, analysing, predicting or controling a physical system), the interactions with users can be very simple or very rich.

At the beginning of the first year of EDT , a UCs-PCs matching workshop will be organized to enable the PCs members and UCs providers to meet and detail the respective goals and needs of their use cases. The outcome of the workshop will be to finely link the UCs with the workpackages, with the goal of associating two UCs to each research topic and PhD subject.

Open software components and building blocks provided by these use cases would be considered for their integration in the Digital Toolbox of Artemis in AT3 as well as Educational Tools in AT5.

A second workshop will be organized to analyze in depth the most cross-cutting use cases, such as UC3, UC6, UC8, UC10, UC22 or UC26 or UC36. Five of them will be selected to serve as the basis for end-to-end demonstrators (see Appendix C). We will do our best to ensure that the five classes of Physical Twins identified in Appendix C.1 will be represented: 1) Natural systems; 2) Anthropized systems, and Engineered systems, incl. 3) Cyber-physical systems, 4) Infrastructures, and 5) Processes.

# 4

Focused Projects

EDT includes five focused projects. Figure 5 provides an overview of the PCs and associated partners. In the following, we gives the details of each focused project.

## 4.1

### PC1: Model Hybridization and Management

Project Overview

Context
The notion of model is at the heart of the Digital Twinning activity. A Digital Twin is an organized set of digital models representing an intended or actual real-world physical object or system throughout its lifecycle. It is updated using real-time data collected by sensors and employs various reasoning methods (e.g., simulation, machine learning) to assist in decisionmaking. DTs can be used to predict the behavior of the Physical Twin, such as forecasting failures or events, and to prescribe real-time actions, like adapting to environmental changes or updating requirements.

Many different activities are inherently involved in creating a DT, including architecture description, modeling and simulation, and data science. Each of these activities traditionally generates a range of intricate models, where a model can substitute for the asset it represents to answer specific questions. Since these questions vary greatly, so do the models. There are multiple, sometimes related, dimensions along which the models used in a DT can be classified.

A non-exhaustive list includes:
Inference method: This dimension refers to how conclusions are drawn from data or theory.

Inductive models are derived from patterns observed in data, while deductive models apply general principles to specific cases based on established theories.

Modeling approach: This dimension indicates the foundation upon which the model is built. Empirical models rely on observed data without necessarily explaining the underlying mechanisms, whereas mechanistic models are based on fundamental principles governing the system.

Concern: This refers to the specific aspect of the system that the model addresses. For example, models may focus on behavioral aspects (how the system behaves), safety (risk and failure prevention), structural aspects (the organization of the system), or extra-functional concerns (such as performance or usability).

Purpose: This describes the model’s intended goal. Descriptive models aim to represent how things are or have been, while prescriptive models focus on specifying actions or solutions to achieve specific objectives.

Fidelity: This refers to how closely the model mimics reality. Low-fidelity models are usually computationally efficient but only allow interpolation within known contexts, while high-fidelity models are computationally intensive and can extrapolate beyond known contexts.

Temporal aspect: This relates to whether the model incorporates time. Static models are used to compute information at a specific point in time, while dynamic models are used to compute the temporal evolution of certain properties.

There exist various ways to characterize the heterogeneous models used in a DT. All these different characteristics come with strength and drawbacks. However, they may apply either to the DT or to PT and, consequently, may represent the same property in both twins using different techniques. This presents an opportunity for these models to leverage each other’s strengths.

This is exemplified in the ad-hoc realization of Physically Informed Neural Networks [5] or the work described in [6], where both neural network models (trained on data observed from the real asset) and the simulation results of mechanistic models are fed with the same inputs and combined to achieve more accurate results. Another example of hybridization involves quantifying and integrating the uncertainties from both the PT and the DT to improve real system performance and characterize deviation detection [7]. These examples mark the beginning of model hybridization, highlighting the need and opportunity for a more systematic approach.

More investigation is required to enable this hybridization. First, a homogeneous and sound model interface must be established for querying and manipulating models. Queries should identify potential synergies, such as shared properties, complementary domains of validity, or suitable fidelity for intended uses. Model manipulation should allow for updating or modifying specific parts to incorporate new knowledge and manage simulations. With such an interface, appropriate operators, reifying hybridization patterns, can be applied between heterogeneous models, along with workflows specifying causal relationships in simulations. Careful attention must also be given to reliability and systematic uncertainty management.

Scientific topics include : 1. Interface for Hybridization(s), 2. Hybridization operators (both for workflow and hybridization), and 3. Interface and composition Analysis.

Main Objectives are : 1. Providing appropriate interface to manipulate (any) models and their usages; 2. Simplifying the hybridization of models through dedicated operators; 3. Ensuring the wise manipulation of models and hybridization.

Associated Use Cases In PC1, different use cases kinds are needed to maximize the variety of models in the Digital Twin and cover the various types of Physical entities with their respective specificity classes. In particular, use cases mixing data-based models with mechanistic models will provide the basis to prove the PC1’s concepts and tools.

Governance & Project Partners
- PC Principal Investigator: Julien Deantoni, Univ. Côte d’Azur (UniCA)
- PC Steering Body: UniCA, Inria, Telecom Paris, and UPPA
- PC Participating Partners: Inria (Hycomes, Diverse, Kairos, Parkas), CNRS (IRIT/ACADIE), UniCA, INRAE, UPPA, Telecom Paris (LabSoc, ACES), ENPC, Univ. de Bourgogne, CEA (LITEN), Univ. Toulouse 3 (Aniti), Univ. Toulouse Jean Jaures (IRIT/SM@RT).

CV of the PI Julien Deantoni is full professor at Université Côte d’Azur and head of the Kairos team. He applies rigorous modelings and abstractions for heterogeneous models since his PhD thesis in 2007. He published on the importance of handling the globalization of modeling languages more than 10 years ago [8]. Since then, he has published various papers and developed tools to facilitate this globalization [9]. He has also published papers highlighting the need to consider the semantics of the different models for more precise and efficient collaborative simulations [10]. More recently, he worked on the notion of multi-fidelity in Digital Twins and already hybridized DT’s models in order to mitigate uncertainty and consequently provide better control in the PT. Conjointly, he participated (sometimes as principal investigator) to numerous collaborative projects 15 .

Project Implementation

We propose to structure the project into three cohesive work packages. In addition, the concepts of multi-fidelity and uncertainty should be addressed across all work packages.

Workpackage 1: Interface for Hybridization(s) : Leader: UPPA, with Inria (DiverSE, Hycomes, Kairos, Parkas), UniCA, INRAE, Telecom Paris (ACES).

This workpackage aims to standardize the way to manipulate and characterize heterogeneous models, enabling an homogeneous and automatic reasoning across them. This should be done while ensuring that important and specific aspects of models are still available. It involves three tasks: creating structured metadata information for model management; providing functional and extra functional interface for model hybridization; and providing model mutation and adaptation capabilities.

Workpackage 2: Hybridization Operators : Leader: Kairos (Inria), with DiverSE (Inria), INRAE, IRIT/ACADIE (CNRS), Telecom Paris (LabSoc), Université de Bourgogne.

This workpackage focuses on identifying and formalizing the structural and behavioral patterns used in current and future model hybridization. It aims to systematize the hybridization process by applying specific operators instead of relying on common ad-hoc approaches. These operators will offer reusable, parameterized assets and methods for application to existing models. The package includes two cohesive tasks about elicitation and formalization of operators to specify: a simulation workflow and the hybridization of models.

Workpackage 3: Interface and Composition Analysis Leader: Telecom Paris (LabSoc) with Inria (DiverSE, Hycomes, Parkas), CNRS IRIT (ACADIE), ENPC, UPPA, CEA (LITEN), UniCA, Univ. Toulouse 3 (Aniti), Univ. Toulouse Jean Jaures (IRIT/SM@RT).

This workpackage aims to provide various analyses of models, their interfaces, and the operators used for hybridization, dividing into three tasks. The first task analyzes models to enrich their interfaces, the second task examines different interfaces to identify synergies and potential for hybridization, and the third task focuses on analyzing hybridization operators to enrich the interface resulting from model hybridization.

Critical capabilities and expertise already in place The different teams of the project cover the different expertise required to handle model hybridization: data-driven models, mechanistic and multi scale models, hybridization practitioners, model management, V&V(UQ) activities and, of course, software engineering.

Missing capabilities Although the core scientific leadership is already established, additional manpower is essential to thoroughly address the scientific challenges and develop prototypes.

Therefore, the project plans to recruit 11 PhD students (3 for WP1, 3 for WP2 and 5 for WP3), 2 years of postdoctoral researcher implied in the evaluation of propositions in the context of a DT for energy, and 1 engineer for a duration of 1 year, contributing to the integration of software-related deliverables. We will strive to have each PhD student co-supervised by at least two participating teams to enhance collaboration.

# 4.2
PC2: Architecture, Composability and Interoperability 

Project Overview
Context
Digital Twins (DTs) have emerged as a mean to interact with the physical world and explore what-if scenarios at different abstraction levels [11]. However most DTs are monolithic entities that have been crafted in an ad hoc fashion with respect to a given Physical Twin (PT).

To allow an industrial scaling of this technology, we must make it possible to build DTs from modular parts, in the same way that Gustave Eiffel changed civil engineering in the late 19th century with the modular construction of the Eiffel Tower [12].

The challenges are related to the open question of how DTs could be modularized to allow their composition either at design time or at deployment time [13], both at the syntactic level (concrete form of their provided and required interfaces [14]) and at the semantic level (ontology alignments [15, 16]). This modularisation also concerns the services provided by the DTs, including data processing and what-if exploration based on eg Machine Learning.

Having a DT modeling a PT at a 1–1 scale is both a nice marketing claim and a scientific oxymoron. Indeed a model is always "wrong" with respect to reality. Still some models can be helpful, provided you know about the distance they have with reality. This goes along three dimensions: scale, fidelity and uncertainty management [17]. Scale and Fidelity can be understood as the level of abstraction of the DT (the scale of the map), whereas uncertainty management is the confidence we have in the DT attributes values (eg the river’s width is 10m ± 2m). The challenge here is that once scale, fidelity and uncertainty are identified within a given DT, they can be propagated across DT boundaries at the level of a federation [18].

Scientific topics include 1. Modular architecture for DTs, 2. Composition of DTs, 3. Interoperability of DT services, and 4. Scale, fidelity and uncertainty management.

Main Objectives
1. Modularization of DTs to enable flexible composition and address challenges related to variability management, trustworthiness, economics, and ethics. Conversely build new DTs by federating existing ones.
2. Composition of DTs at the deployment level to allow orchestration
3. Interoperability of several DTs to form federations: Knowledge Graph, Ontology and Semantic Web technologies
4. Fidelity and uncertainty management: Handling the compounding uncertainty, fidelity, and assumptions that st# em from the individual DTs.
5. Composition of the services offered by DTS with respect to data and knowledge acquisition and aggregation (introspection), scalable machine learning (eg Neuromorphic networks with dynamic evolution) and dynamic adaption (intersession).

Associated Use Cases PC require Use Cases where interoperability is critical, others to demonstrate a modular approach for building DTS for a real PT or to organize a federation of DTs.

Governance & Project Partners
- PC Principal Investigator: Jean-Marc Jézéquel, U. Rennes/Inria
- PC Steering Body: Inria, IMT
- PC Participating Partners: DiverSE (Inria), Wimmics (Inria), Moex (Inria), P4S (IMT), List (CEA), CRAN (CNRS), DISP (Univ. Lumière Lyon 2), CIAD (Univ. de Bourgogne), IRIT/SM@RT (Univ. Toulouse Jean Jaures), UPPA.

CV of the PI Jean-Marc Jézéquel is a Professor of Software Engineering at the University of Rennes and a member of the DiverSE team at IRISA/Inria, as well as a fellow of the Institut Universitaire de France (IUF). Since 2024 he is President of Informatics Europe. From 2012 to 2020 he was Director of IRISA, one of the largest public research lab in Informatics in France.

In 2016 he received the Silver Medal from CNRS and in 2020 the IEEE/ACM MODELS career award. He was an invited professor at McGill University in 2022.

His interests include model driven software engineering for digital twins with quality of service constraints, including security, reliability, performance, timeliness etc. He is the PI of the FrenchGerman MBDO project to help build Digital Twins for Industry 5.0 in a DevOps way. He is the author of 4 books and of more than 300 publications in international journals and conferences.

He is currently Associate Editor in Chief of the Journal on Software and System Modeling, as well as member of the editorial boards of the Journal on Software and Systems, and the Journal of Object Technology. He received an engineering degree from Telecom Bretagne in 1986, and a Ph.D. degree in Computer Science from the University of Rennes, France, in 1989.

https://people.irisa.fr/Jean-Marc.Jezequel/
Project Implementation
Workpackages
WP2.1 DT Reference Architecture with management of Variability, Fidelity and Uncertainty within a unified meta-data theory. Lead: DiverSE (Inria), with P4S (IMT), List (CEA), CRAN (CNRS), DISP (Univ. Lumière Lyon 2), UPPA
WP2.2 DT Modularisation and Composability. Lead: P4S (IMT), with DiverSE (Inria), DISP (Univ. Lumière Lyon 2), CIAD (U. de Bourgogne). This WP will explore how to build DTs and their associated services from pre-existing parts or reversed engineering, both at design time (software components) and at deployment time (as in Systems of Systems) as well as deal with their evolution (neuromorphic systems).

WP2.3 DT Semantic Interoperability. Lead: Moex (Inria), with Wimmics (Inria), IRIT/SM@RT (Univ. Toulouse Jean Jaures), IGN. This WP will (1) explore the use of semantic web technologies to represent the alignments between ontologies of independently designed DTs, (2) help improve and validate DT’s Knowledge Graph Quality, as well as (3) keep semantic tracks of digital twin experiments.

Critical capabilities and expertise already in place The teams already have a long experience of successful research related to key components of modular digital twins: CBSE, Models@runtime, SEAMS, Ontologies, Knowledge Graph, Semantic Web, AI, machine learning, and domain knowledge formalization.

Missing capabilities While the main scientific leadership is already existing, a lot of manpower is missing for the concrete investigation of the scientific issues as well as for the implementation of prototypes. This is why this project needs 11 PhD students (4 for WP2.1 and WP2.2, 3 for WP2.3, contributing to deliverables D2.1, D2.2, D2.3, D2.4 and D2.5), and 1 engineer (for 3 years, contributing to all software deliverables as well as D2.7).

As far as possible, each PhD student will be co-supervised by at least two of the participating teams to ensure concrete collaboration among them.

# 4.3
PC3: Methodology, Development Life Cycle, and Languages

Project Overview

Context 

The current digital twins (DTs) utilize cutting-edge technologies such as IoT, 5G, Cloud, AI, and 3D modeling. The development of DTs entails high costs and lengthy implementation times, underscoring the need for a new specialized methodology. Engineering digital twin (EDT) involves multiple disciplines and relies on various technologies and research areas. Multidisciplinarity also necessitates the definition of domain-specific languages (DSL) and specific viewpoints to be integrated into a coherent global architecture framework as defined in ISO42010.

Any complex system development must begin with a good specification, and the development of a DT is no exception. The project will first investigate the specificities of DT development to support their formal specification (e.g., how do you specify the expected level of precision of a digital twin?).

Conformity assessment of digital twins according to existing standards and regulations is essential to build user confidence in real-world DT deployment. This project aims to explore the integration of AI and Model-Based Systems Engineering (MBSE) practices to automate conformity assessment activities. Currently, there is limited research on quality assurance and requirements for digital twins, making it difficult to determine when a digital twin no longer meets the necessary standards of fidelity.

DTs are definitively complex systems, and their engineering field requires new tools that support tightening collaborative engineering to reduce costs and delays and improve quality.

Concurrent and agile engineering and better knowledge sharing are necessary to achieve this. We will also conduct research to address these challenges and meet the requirements of collaborative and concurrent EDT. Moreover, we will also conduct research and make advances in integrating AI into engineering methodologies for DT and their Integrated Development Environment IDE (Augmented-IDE). In that context, one must investigate human-bot inclusion. As mentioned above, the Augmented IDE is an AI-based system that must adapt to all users, regardless of their cognitive, economic, social, or cultural levels.

Integrating analysis tools and techniques early in the design phase of digital twins, especially when using MBSE approaches, is crucial. This early analysis can improve decision-making, and "analysis-in-the-loop" can help assess the impacts of design choices on key performance indicators. Early design stages may involve qualitative considerations, affecting both functional and non-functional aspects.

The growing importance of AI models integrated into DT requires intensive testing procedures. As a result, testing machines using or even "embedding" DTs is a critical question that should be investigated in this project. New methods for verifying, validating, and qualifying uncertainties (VVUQ) will be proposed and integrated into a common methodology. Those methods will be integrated into the design process to support continuous integration and deployment process and tools.

The deployment dimension involves bringing DTs to life by hosting and connecting it. Design choices include deploying the digital twin locally, in the cloud, or somewhere in between, and selecting the appropriate means of connecting it to its counterparts. Research is needed to streamline this step in the global design process and make it more accessible.

The environmental impact of digital systems is a reality. DT design and opertaions need to be optimized to minimize their ecological footprint. This project aims to also: Develop a framework to evaluate the environmental footprint of digital twins based on ADEME’s PCR for digital services; Use the framework to guide eco-design decisions during the engineering phase, promoting reuse and sustainability while minimizing resources required for construction and operation.

Scientific topics
- Methodology and life cycle: model, view & viewpoint, architecture framework, reverse engineering, and domain-specific language;
- Continuous engineering, co-evolution, and quality: co-evolution, live-modeling and programming, continuous integration, requirement engineering, abstraction & confidence level, results accuracy, conformity assessment, methods for verifying, validating, and uncertainties qualifying;
- Collaborative engineering and augmented IDE: space and time collaborations, concurrent (agile) engineering, knowledge engineering, AI & GenAI, augmented-IDE, and human-bot inclusion), local-first methods;
- Deployment and sustainability: continuous deployment, edge- and/or cloud-based deployment, DT for sustainability, Analysis-in-loop, Method for assessing DT sustainability, SustainableDevOps, continuous deployment.

Main Objectives

Main objectives of the project are the following:
- Develop a domain-specific modeling language for engineering digital twins throughout their lifecycle and subsequently implement it, at least as an extension of SysML V2.
- Define all stakeholders, their concerns and the required viewpoints needed to account for all engineering concerns to cover the life cycle of a digital twin. The results are integrated into a formal architecture framework as defined by ISO42010.
- Specifiy and design a sustainable collaborative IDE required to implement and integrated all viewpoints defined previously and enable co-engineering of these viewpoints and their related models.

Associated Use cases The industry beeing a crucial domain for Digital Twin (DT) technology, it makes perfect sense for the project to apply our findings to this type of use cases and utilize it as the main beta tester for the various proposals.

Implementing and utilizing DTs which involve multiple stakeholders, and considering the coevolution of physical twins and digital twins is also critical, especially when safety is a concern.

Additionally, we aim to establish connections with use cases where sustainability is key.

Governance & Project Partners
- PC Principal Investigator: Sébastien Gérard, CEA.
- PC Steering Body: CEA, CNRS, Univ. Toulouse Jean Jaurès and Inria.
- PC Participating Partners: DISP (Univ. Lumière Lyon 2), Diverse (Inria), IRIT/SM@RT
(Univ. Toulouse Jean Jaurès), LaBRI (CNRS), LIST (CEA), P4S (IMT), Spirals (Inria), and TSCF (INRAE).

CV of the PI Sébastien Gérard is Senior Fellow at CEA where he leads the flagship program, Digital Collaborative and Cognified Engineering of the CEA LIST institute. His research interests include complex systems, model-based engineering, cognification, knowledge engineering and visual modeling, collaborative tools, digital transformation, and its impact on society. he has represented the CEA at the OMG for over 20 years, initiated and led for more than 15 years the open-source project Papyrus (www.eclipse.org/papyrus), and represents CEA List on the board of directors of the Eclipse foundation.

Project Implementation
Workpackages
- WP3.1 – Methodology and life cycle: Lead IRIT/SM@RT (Univ. Toulouse Jean Jaurès), with Diverse (Inria), and P4S (IMT).
- WP3.2 – Continuous engineering, co-evolution, and quality: Lead LaBRI (CNRS), with DISP (Univ Lumière Lyon 2), Diverse (Inria), IRIT/SM@RT (Univ. Toulouse Jean Jaurès), List (CEA), Spirals (Inria), IGN, and TSCF (INRAE).
- WP3.3 – Collaborative engineering and augmented development tools: Lead List (CEA), with Diverse (Inria), P4S (IMT).
- WP3.4 – Deployment and sustainability: Lead Diverse (Inria), with LaBRI (CNRS), List
(CEA), and Spirals (Inria).

Critical capabilities and expertise already in place The different teams gathered for the project cover the different expertises required to handle the list of scientific topics listed above for the project and meet its main objectives.

Missing capabilities While the main scientific leadership is already existing, a lot of manpower is missing for the concrete investigation of the scientific issues as well as for the implementation of its prototypes. For WP3.1, we will have one post-doc for 2 years in charge to federate and integrate all contributions cominf from each participants into a coherent methodology and its associated architecture framework (known as Artemis-AF). 3 PhDs will work on the research issue of WP3.2, 1 PhD students for WP3.3 and 2 PhD for WP3.4. Implementations to be done into WP3.2 and WP3.4 will benefit from 1 FTE for 2 years each. And WP3.4, 2 FTE for 4 years will take in charge the main implementation work of the project, the implementation of the Artemis-IDE. Each PhD student and post-doc will be co-supervised by at least two of the participating teams to foster collaboration. The engineers of the project will work as an integrated team and synchronize regularly in order to foster technical integration.

## 4.4
PC4: Digital Coupling and Gateway 

Project Overview 

Context 
Project 4 will address the process that supports bidirectional data flows between physical and digital twins, and examine the non-functional performance of DTs. The primary objective is to explore theories, methods, and technologies for the digital coupling process. While significant attention has been given to constructing models that accurately represent a system’s behavior, there is a need for studies focusing on the non-functional performance attributes of digital twins (DTs), such as reliability, maintainability, security, and connectivity.

Establishing a closed-loop process between a physical system and its digital twin generally assumes continuous observation or measurement of the system’s full state. However, this assumption becomes less reliable when communication networks or buses are involved, whether linking the sensors to the twin or the twin to the actuators. The main challenge is to define and verify the necessary conditions, such as data freshness, availability, reliability, and security, that ensure accurate execution of digital twin models and real-time synchronization with the physical world [19]. Efficient synchronization also brings to the forefront critical questions about emerging technologies like IoT, 6G networks, and the Cloud-Edge continuum—particularly how they can address constraints such as latency, precision, and efficiency (e.g., through data compression).

Designing a data collection strategy for digital twins (Smart data) presents a significant challenge and involves multiple dimensions: balancing data collection with twin requirements [20], determining the optimal sensor placement, minimizing energy consumption, and ensuring high-quality data collection [21, 22]. While data is important, maintaining the link between the data and its context is crucial. Identifying metadata models required by digital twins and how metadata can be produced and used to help managing models are open questions.

Maintaining synchronization between the digital twin and its physical counterpart, particularly in dynamic environments where conditions change frequently, requires either the consistent and accurate integration of real-world data into the digital model (data assimilation) [23] or the adjustment of the digital twin’s state at specific intervals by delaying, triggering, or rolling back the effects of events within the model (complex event processing) [24]. However, implementing this is highly challenging due to the complexity of nonlinear, multiscale, and multiphysics phenomena involved in complex systems, which are often tied to computationally intensive simulations. Achieving effective sequential data assimilation and control through artificial intelligence (AI) methods—such as deep learning—that combine both physical models and data-driven algorithms remains an open challenge.

Scientific topics
- Smart Data collection strategies: Data collection, storage, optimal sensor placement, data processing, data uncertainty management, metadata theory and models, sustainable collection process.
- Models and real-world data synchronization: identifying and verifying synchronization conditions, detection of deviations and security attacks, monitoring and runtime verification techniques, automatic proof of non-functional expected properties.
- Digital Twin adaptation and control based on Real-World Data: Data assimilation, model updating, AI-driven model enrichment, Dynamic data driven simulation, Complex Event Processing for adjusting model states.
- Network reconfiguration/optimization for digital coupling: co-optimization of digital twins and network systems, balancing DT quality and control constraints, digital twins for network reconfiguration, network scalability.

Main Objectives
- Developing a comprehensive framework for the efficient collection, processing, and smart utilization of data, with a focus on ensuring the reliability and accuracy of data that is often heterogeneous, noisy, or incomplete. To improve efficiency, the framework will also promote the selection of the most relevant data and the maximization of information extraction from minimal datasets (e.g., through active learning).
- Developing methods and models to guarantee real-time synchronization between digital models and their physical counterparts, focusing on key conditions such as observability, temporality, data freshness, and convergence hypothesis. Implement mechanisms for detecting deviations and security attacks, while ensuring automatic verification of nonfunctional properties.
- Developing methods and software for DT and and its network system co-optimisation, ensuring scalable Network Digital Twin generation, on the fly configuration of the network infrastructure.

Associated Use cases PC4 needs Use cases where the PT is a complex systems or operates
under fluctuating environmental and operational conditions, necessitating real-time monitoring and dynamic adjustments to maintain seamless operations. Secure and safe integration of a digital twin within a continuum computing to prove the existence of a sufficiently large time interval for collecting data representative for the security and safety validation is also a critical use case to validate PC4 outcomes.

Governance & Project Partners
- PC Principal Investigator: Hind Bril El Haouzi, University de Lorraine
- PC Steering Body: CNRS, INRIA
- PC Participating Partners: CNRS (Icube, LS2N, CRAN, LMPS),CEA (LIST), Inria (MARACAS, MEDISIM, Kopernick), UGA, Univ. Le Havre Normandie, IMT, Univ. Toulouse 3
(Aniti), Univ Lyon 2 (DISP).

CV of the PI Hind Bril El Haouzi is a full Professor at the Université de Lorraine where she teaches and conducts research in the fields of Computer Engineering and Production Management Control. Since 2018, she has been co-leading the Sustainable Industrial System Engineering Research group at the (CRAN,CNRS) Laboratory. She obtained her PhD in Computer Science, Automatic Control, and Production Engineering in 2008. She has a wealth of industrial experience, having worked for many years as a digitization project leader before joining Université de Lorraine. She currently coordinates several collaborative projects with the industrial sector that focus on the challenges of digital transformation and the societal transition of industry (ANR PRCE, ADEME, CPER,CIFRE...). Her research interests include modeling and control of cyber physical production systems, with a focus on digital simulation and distributed manufacturing control. She has published over 100 papers in international conferences and journals.

Project Implementation
Workpackages
- WP4.1 – Smart Data collection strategies: Lead (CRAN, CNRS) with (Maracas, Inria), IMT (P4S).
- WP4.2 – Models and real-world data synchronization; Synchronisation conditions (convergence, data freshness..), Temporal and spacial verification, Security and safety verification,Lead (Kopernic, INRIA), (Univ. Grenoble-Alpes), (GREAH, Univ. Le Havre Normandie), (CRAN, CNRS), DISP (Univ Lumière Lyon 2).
- WP4.3 – Digital Twin adaptation and control based on Real-World Data: Lead (LMPS, CNRS); with (MEDISIM, Inria), (LS2N, CNRS), Aniti (Univ. Toulouse 3), (CRAN, CNRS), (CEA).
- WP4.4 – Network reconfiguration/optimization for digital coupling: Lead (ICube, CNRS) with (CEA, LIST), (Maracas, INRIA).

Critical capabilities and expertise already in place The project’s participating teams have extensive experience in real-time simulation-based monitoring, data assimilation, DT synchronisation, formal methods for verification, network optimisation, proven through the coordination of numerous large-scale projects: national projects with ANR, European ERC projects, and collaborations with industry partners (EDF, Safran, CNES, Stellantis, Bouygues Construction, Orange).

Missing capabilities While the core scientific leadership is already in place, there is a significant need for additional manpower to thoroughly investigate the scientific challenges and implement prototypes. Therefore, this project requires the recruitment of 10 PhD students 3 for(WP4.2, WP4.3), 2 for (WP4.1, WP4.2) and 3 postdoctoral researchers. Whenever possible, each PhD student will be co-supervised by at least two of the participating teams to foster collaboration between them.

# 4.5
PC5: Human-Digital Twin Interactions

Project Overview

Context By its very nature, a digital twin strongly relies on data visualisation and user interactions. Indeed, a DT usually embeds interactive systems that enable users to visualize and Figure 10: PC1 focuses on the interactions between humans and the digital twin interact with both the physical and digital twins and their large amount of associated data [25].

Those interactive systems can take multiple forms, from fully digital VR immersive systems to hybrid AR systems [26], but also 2D graphical user interfaces, and systems that imply physical input devices. They often propose collaborative asymmetrical (AV/VR/2D) interactive situations, which can also be a challenge [27, 28].

Building such interactive systems from scratch or without automation is time-consuming and may prevent the generalisation of DT as industrial tools. First, novel approaches are required to build the visual representation of the DT, which can be 3D models (to build, for example, by combining CAD models, 3D scans, pictures, and other media sources) or 2D various kinds of information. Users can then interactively finalize some parts of the DT [29]. Additional visualization tools can also help reduce the bias of automatic reconstruction [30]. Then, DT come with usages that raise research questions regarding, from an HCI viewpoint, how to help users in visualizing data and interacting with it, especially when we use 3D [31]. The visualization concerns not only the "raw" model of the physical twin but also all the data that can be used to enrich the model (additional information about how to use it). It raises new challenges about how to display large datasets of information and how and when to interact with them [32]. Finally, all these points require validations, at different scales. To reduce the cost of developing the HCI facets of DT, the project must propose novel techniques that focus on their engineering.

Scientific topics include: 1. 3D reconstruction 2. Data visualization 3. Interaction engineering 4. HCI spatio-temporal navigation 5. DT Validation & Verification from the user point of view

Main Objectives are: 1. Semi-automatic techniques for (2D/3D) construction of the view of the DT 2. Visualization metaphors to augment the DT and better understand its content 3. Approaches to describe and generate user interactions with the DT 4. Spatio-temporal transitions into different views of DT 5. 

Usability assessment of the DT Associated Use Cases 
- At the territory scale: reconstructing the DT of a city or area and populating it with virtual humans to better understand the current limitations of the city/area and how the use of the DT can enhance it.
- At the building/factory scale: reconstructing the DT of a reconfigurable assembly line.
This would then permit providing AR augmentation for workers to better use the physical assembly line while enabling experts to monitor the global activity in a VR visualization of the DT. These experts would, finally, be able to help remotely by giving AR instructions to the workers on the physical assembly line.
- At the technical object scale: reconstructing the DT of a complex system (a car, a satellite) to train people to maintenance tasks using VR interactions with the DT, and then using AR augmentations when physically in front of the physical twin.

Governance & Project Partners
- PC Principal Investigator: Thierry Duval, IMT
- PC Steering Body: IMT, CEA, Univ. Bourgogne, Inria and Univ. Rennes
- PC Participating Partners: INUIT (IMT), DiverSE (Univ. Rennes), Hybrid (Inria), Aviz
(Inria), ILDA (Inria), VirtUs (Inria), Elipse (Univ. Toulouse 3), ICS (Univ. Toulouse Capitole), G-SCOP (UGA-INP), LIB (Univ. Bourgogne), LIST (CEA), CEA Tech Occitanie
(CEA), CRTD (CNAM), UMMISCO (IRD), LAMIH (UPHF), Sorbonne University CV of the PI Thierry Duval is a full Professor and the head of the Computer Science Departement at IMT Atlantique in Brest. Since 2021 he is also the head of the INUIT team at Lab-STICC. He received a PhD degree in Computer Science from Centrale Nantes and the University of Nantes in 1993, and an Habilitation degree from University of Rennes 1 in 2012. His research interests include Virtual, Augmented, eXtended and Mixed Reality, Immersive Analytics, Collaborative Virtual Environments, as well as Software Engeering for interactive systems.

He is currently involved in several collaborative projects (5G Metaverse, Reclassif, eNSEMBLE) where he conducts AR/VR/XR/MR/CVE research mainly applied to Industry of the Future where Digital Twins of factories are central elements of the projects. He has published over 100 communications in international conferences and journals.

Project Implementation
Workpackages
WP5.1 DT digital representation/reconstruction and design. Lead: Univ. Bourgogne, with LIST, ILDA, Aviz, INUIT. It will deal with 3D reconstruction, including AR viewpoint computation (LIST, LIB, ILDA, INUIT) and with 2D reconstruction, including multi-view visualization and fusion between multi-source data and error correction (Aviz). CNES will also contribute to reconstruction of the DT of the earth and to providong of additional visualizations and interactions to the earth DT.

WP5.2 DT visualization augmentations (2D and 3D, AR and VR) to enhance perception and understanding of the physical components. Lead: Aviz, with ILDA, Hybrid, INUIT, ELIPSE, G-SCOP, Sorbonne University. It will deal with enriched visualization of large datasets (Aviz, Elipse, G-SCOP) and collaboration enhancement (including avatars) (ILDA, Hybrid, INUIT) and of human body models in order to prepare or evaluate chirurgical interventions (Sorbonne University, INUIT). CNES will also contribute WP5.3 DT interaction design and engineering. Lead: ILDA, with ICS, ELIPSE, CRTD, UMMISCO, LAMIH. It will deal with interaction engineering (including tangible user interfaces) (ILDA, ICS, Elipse, UMMISCO), with co-engineering between multiple stakeholders
(CRTD, Elipse, INUIT), and with interaction narration and evolution (Hybrid, LAMIH).

WP5.4 DT transitions engineering. Lead: Univ. Rennes (IRISA/DiverSE), with INUIT, ILDA, Hybrid, ELIPSE, CEA Tech Occitanie, LIST. It will address solution space transitions (DiverSE, CEA Tech Occitanie), spatial (3D) transitions (INUIT, ELIPSE) and media (AR to VR to 2D) transitions (ILDA, Aviz, INUIT, LIST).

WP5.5 DT interactive Validation & Verification (Ergonomics, usability, VR front-end testing for a useful and usable DT) Lead: CEA, with VirtUs, Hybrid, UMMISCO. It will be studied at the scale of one user (LIST, INUIT) and at the scale of a group (VirtUs, Hybrid, UMMISCO).

Critical capabilities and expertise already in place The teams already have a long experience of successful research related to key components for interaction with digital twins:
Augmented Reality (AR), Virtual Reality (VR), eXtended Reality (XR), Mixed Reality (MR), Interactive Systems Engineering, Data Visualization, Immersive Analytics, Human-Computer Interaction (HCI), Ergonomics, Psychology, Virtual Humans, Collaborative Virtual Environments (CVE), Computer Graphics, 3D reconstruction, simulation, Virtual Training.

Missing capabilities In this PC where the topics have been consolidated by gathering scientific propositions coming from many partners, it is very important to initiate real collaboration between all these partners. To achieve this, we propose to fund mainly PhD theses. Each PhD thesis will be co-supervised by at least two (and not more than four) partners of this PC. 13 PhD will be funded, 1 in each identified task of all WPs, and 1 engineer (for 3 years) to support software development efforts.

## 5
Cross-Cutting Actions

The creation and animation of the national community and operational integration of all the outcomes of the projects and activities of EDT will be ensured by a set of seven cross-cutting actions that we present below.

### 5.1
AT1: Animation

The role of this action is to ensure the animation within the project, and to build the national EDT community with the project members and linked partners. To achieve these objectives different tasks will be performed all along EDT : website creation, web content edition and social networking, monthly webinars, annual program workshops, hackathon, annual summer schools, etc. These activities aim at creating a solid community and ensure tight interactions between the PCs and ATs. Continuous cross-projects monitoring and reflection will be ma### intained to share and publish regularly a cartography of international research activity, DT software platforms, DT building blocks, libraries related to EDT. Inria will coordinate this AT with the help of Projects and other AT leaders. Through AT1 and when necessary, EDT will also reach other relevant PEPR communities (see Section 1.4) as well as communities such as Modelica, Julia or System Modeling community (16 ).

### 5.2
AT2: Use Cases and End-to-end Demonstrators
This transverse actions aims at coordinating the creation and publication of the Use Cases catalog of the EDT community and ensure its exploitation by the focused projects. The various use cases, classified in different categories, phases and maturity level will provide requirements, models, data and software building blocks to the focused projects. AT2 will organise a UCs-PCs matching workshop during the first year of EDT to enable the PCs members and UCs providers to meet and exchange on their respective goals and needs. The five PCs working in close collaboration with UC providers, will realize a deep analysis of the UCs base depicted in Table B proposed by the community, leveraging the framework proposed by AIF [1] to build the EDT ’s Use Cases catalog.

The outcome of the workshop will be to link the UCs with the relevant PC’s work-packages and associated research topics, with the goal of associating two UCs to each PhD subject allocated.

This will enable them to gather a solid set of realistic requirements to initiate their research and development work. The selected UCs, potentially shared between several PCs, and the Use Cases catalog will the be exploited and enriched all along the Program.

From the selected UCs, a set of five end-to-end demonstrators will be developed to validate the integrated EDT platform. These end-to-end demonstrators will serve as an educational support for AT5, a starting point for studying the ethical and sustainable aspects of DT in AT6 and a basis for presenting the results of Artemis and EDT in AT7. The development of the end-to-end demonstrators will also start during the first year following an agile methodology and leveraging the most representative and cross-projects use cases (see Section 3). These end-to-end Demonstrators will be built upon existing data, models and software components provided by the UC provider, bringing a very useful basis for new scientific work in the field of EDT, and leveraging and validating the scientific and technological advances obtained in EDT Projects (with strong links with PC1-core foundations, PC2-core tools, and also with PC3-core methods & PC4-coupling, reliability & PC5-interactivity, immersive interface).

The Program Directors will initiate the AT2 activity. Then, an AT2 leader, who will be in charge of coordinating the AT activities, will be identified by EDT Operating Committee in consultation with the Usage Committee during the first year of the Program.

### 5.3
AT3: Integration

This transverse action is dedicated to the integration of the software outcomes of the different focused projects (PC1 to PC5), all consolidated into the platform Artemis resulting from PC3.

The platform includes both the digital twin development tools and methods, as well as the models and tools libraries (i.e. building blocks). To achieve this, the action will develop activities all along the program. Based on its software engineering expertise, Inria will contribute to the organization of this development and the hiring of a technical project manager. Moreover, the technical supervision of this action by Inria will also explore how the resulting infrastructure can be used as a basis for future, impact-full and more mature applications beyond the project (such as the design of new digital twins in support for public policies).

### 5.6
AT6: Ethics and Sustainability

The role of this action is to conduct cross cutting activities regarding ethical and sustainability concerns of Digital Twins. To achieve this, a dedicated committee will be in charge of addressing the ethical and sustainability questions and produce regular notes and recommendations to the PC, the EDT community at large, and the future users. The AT6 will maintain the liaison with the GDS Eco-info 25 et le PEPR numérique eco-responsable. An AT6 leader, who will be in charge of coordinating the AT activities will be identified by EDT Operating Committee during the first year of the Program.

### 5.7
AT7: Dissemination and Exploitation
The role of this action is to ensure the visibility and future exploitation of the EDT community, activities and outcomes of the program. To achieve this, AT7 will perform activities (i) at the national level in the public sphere (research, education and other public services); (ii) at the national level in the industrial community; and (iii) at the international level in the academic and industrial communities. The corresponding budget covers content production, travels, booth in various events, and public event organisation (announcements, demonstrators). The role of this action is also to ensure the future exploitation of the results of the program via industrial partnerships and technology transfer, as well as via National and European initiatives preparation. This activity will be performed in collaboration with AT3 about the integration within the platform Artemis and the end-to end demonstrators development and deployment. An AT7 leader, who will be in charge of coordinating the AT activities will be identified by EDT Operating Committee during the first year of the Program.



Some references :
16 https://modelica.org/association/; https://julialang.org/community/, https://www.omg.org/communities/systemsmodeling-community.html
17 https://www.omg.org/spec/SysML/2.0/Beta2/About-SysML
18 https://www.w3.org/WoT/
19 https://www.w3.org/2024/06/smart-cities/
20 https://www.etsi.org/deliver/etsi_tr/103800_103899/103827/01.01.01_60/tr_103827v010101p.pdf
21 https://www.digitaltwinconsortium.org/
22 https://industrialdigitaltwin.org/en/
23 https://ecoledesponts.fr/en/digital-twins-infrastructures-cities
24 https://artsetmetiers.fr/en/jenii-project
