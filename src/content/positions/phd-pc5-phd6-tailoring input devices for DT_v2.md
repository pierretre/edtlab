---
title: "PhD Position - Engineering Digital Twins Dedicated to 2D and 3D Input and Output Technologies of Interactive Systems: application to the digital twin of Luxembourg Electric Grid"
type: "PhD"
pc: PC5
location: "Toulouse, France"
expectedStartDate: "October 2026"
publishedDate: 2026-04-23
filled: false
description: "PhD position in Human-Computer Interaction focusing on engineering 2D and 3D input and output technologies for digital twin systems"
requirements: ["Master's degree in Computer Science, HCI, or related fields", "Strong programming skills e.g. Java", "Knowledge of 2D / 3D applications", "Fluency in English and French"]
contacts: ["camille.fayollas@irit.fr", "philippe.palanque@irit.fr", "romain.pinquie@grenoble-inp.fr"]
---

## Context

A digital twin is a virtual representation of a target entity with data connections that enable convergence between the physical and digital states at an appropriate rate of synchronisation, enabling simulation, integration, testing, monitoring, training and maintenance. A digital twin can provide an integrated view throughout the life cycle of the target entity. Digital Twins also play a pivotal role in optimising complex systems across a wide range of domains, from industrial manufacturing and energy to environmental monitoring and healthcare.

The Engineering Digital Twin [EDT program](https://edtlab.fr/en/), funded by the France 2030 investment plan, is a national initiative to advance the foundations of digital twin engineering in France and across Europe. By bringing together leading academic and industrial partners, EDT seeks to strengthen the bases for the design, use, and deployment of digital twins, addressing key open challenges in model hybridisation, composability, development methodologies, digital coupling, and human-twin interaction.

A digital twin fundamentally depends on data visualisation [1], allowing all stakeholders throughout its lifecycle to interact with it via their chosen input and output devices. Output devices can take multiple forms, from fully digital virtual reality immersive systems to hybrid augmented reality systems [2] or a mix of both in asymmetric scenarios, as well as classical 2D graphical user interfaces or interactive video wall systems. In practice, considering the diversity of users and the relatively long life cycle of systems accurately replicated by digital twins, it is highly probable that most of these devices will be used with digital twins. Input devices are also diverse, ranging from direct hand control (e.g., (multi-)touch interaction) to indirect hand control (e.g., mouse, keyboard), but also voice- or gaze-based input devices. There also exist specialised devices such as the cubic mouse [3] or the [sphere](https://www.youtube.com/watch?v=TFZkwRzobQQ) designed for 3D interactions.

Users interact with a digital twin to perform various tasks. Some tasks are generic to digital twins, such as sending (resp. receiving) commands to update the real (resp. virtual) system, or navigating across time and heterogeneous, multi-scale visual representations. Others are specific to a particular digital twin, such as sketching a Bezier curve with a HoloLens to capture the geometric modifications to a real system needed to update the virtual replica.

These considerations highlight the importance of ensuring that all users interacting with a digital twin throughout its life cycle can utilise input devices best suited to their needs, preferences, tasks, and output devices.

## Thesis Objectives

Instead of developing (self-)adaptive capabilities to ensure the virtual environment accommodates a range of input and output devices, this PhD focuses on developing new software engineering methods and tools that enable input devices to be reliably tailored to the task performed using the digital twin, the output device, and the type(s) of interactive visual representations that make up the digital twin, and that align with users’ preferences. The software engineering methods and tools proposed to support the tailoring of input devices will, in the short term, aim to facilitate the reconfiguration of existing input devices to adapt to a new task, output device, or user profile. However, we anticipate that this contribution will pave the way for developing new capabilities to predict performance for the a priori evaluation of input devices – either to reconfigure existing ones or to develop new ones. 

As a starting point, we will limit the work to configurations that involve the most common input and output devices, including: 1) a mouse and keyboard used with a PC; 2) multi-touch for an interactive video wall system; and 3) XR HMDs, if possible. Based on progress and case studies, we might modify the input and output devices considered. The choice of input and output devices, the tasks that require adapting input devices, and user profiles will primarily depend on the use cases used to validate the claimed contribution.

Several use cases from the EDT project are of interest and are under validation, but we will very likely work on the [KOPR digital twin](https://kopr-twin.com/) developed by the [datathings company](https://datathings.com/). Kopr is a DT designed for the supervision and operational analysis of electricity distribution networks. Kopr provides a map view for visualizing the state of the electrical grid, displaying all the physical elements of the high-, medium-, and low-voltage grid, are represented by dedicated icons and enabling simulation of changes such as installing new cables or connecting new consumers. [Kopr illustrative video](https://www.youtube.com/watch?v=h7-Is5RoDDw)
Using KOPR, various stakeholders interact with KOPR digital twin to perform various tasks, including:
- grid planners exploiting the map view with added visual information (a heatmap display) for identifying risk areas on low-voltage,
- maintenance managers relying on prioritized equipment faults to deploy corrective actions,
- long-term planners exploiting the clustered view of power consumption to anticipate future electricity demand
- …
- 
Close cooperation with the datathings company will be setup, which will share its access to the underlying system and its end-users. The PhD candidate will be able to investigate the generalisability of developed approaches and tools by applying them to other use cases from the EDT project

In this PhD, the digital twin is not just the artefact users interact with but also a tool to adapt the chosen input devices. Indeed, digital twins help simulate and manage input and output devices [4], making them suitable candidates for designing and developing usable and reliable input devices for interacting with digital twins.

Thus, the global approach relies on the digitalisation (through digital twins) of the user and the entire interactive system (hardware, interaction technique, and interactive application) to build and study interactions with the digital twin (system digital twin).

 
![](https://codimd.math.cnrs.fr/uploads/upload_dab0ec918db9a10abe28734462a92041.png)
***Figure 2. Overview of the proposed approach.***

The key challenges consist in:
1. **Identify the digital twins’ users, tasks, and goals.** Starting with a couple of use cases, analyse and produce precise descriptions of the digital twin users' work context and tasks using notations like HAMSTERS [5]. HAMSTERS|XL is a good candidate as the notation can be customised to fit specific work contexts, as demonstrated in [6] with dedicated extensions for aircraft pilots’ tasks. The outcomes of this preliminary task include not only a clearer understanding of who the users are, what they need to do with the digital twin, how they plan to interact with it, and under what conditions, but also an opportunity to identify interaction tasks that are common across various human-digital twin use cases.  
2.	**Define a generic modelling of an input device.** Defining a generic way to create a digital twin of an input device (and output device if necessary) and its interaction with the digital twin of the system of interest. As part of this task, the candidate will have to investigate:
- which dimensions (e.g., physical appearance, internal behaviour, material) of the input device need to be modelled and how to model them.
- the connection between the model of the input device and the model of corresponding transducers [7], which will process the events produced by the input device when manipulated by the user (and send events to the output device), and the interactive application. A path to investigate to model the transducer and interactive application behaviour, is the use of Petri nets-based notations, such as ICO [8] which has been used to address the complexity of multitouch interaction on a tactile screen.
- the two-way connection between the real and virtual input devices to enable usage data to more precisely adapt the physical device.
3.	**Support the efficiency assessment of usability of the input device.** Design a workbench to compute precise performance evaluation of the input and output chains (input and output devices digital twin, transducers and interaction technique). To model and simulate digital twin users’ behaviour, we envision using ACT-R [9], a framework to understand and simulate human cognition. This workbench will enable us to assess the compatibility of all the components of the input and output chains to be able to assess and demonstrate their usability and reliability when using them to interact with digital twins.

The results of this thesis will directly contribute to the [EDT research platform](https://edtlab.fr/en/platform), an open-source framework intended to become a benchmark in the field.

## Work Environment

The position is based at Université de Toulouse in Toulouse, within the ICS team at IRIT lab. 

The PhD candidate will be co-supervised by Camille Fayollas from Université Toulouse Capitole, Philippe Palanque from Université de Toulouse, and Romain Pinquié from G-SCOP (Grenoble INP-UGA).

The PhD candidate will benefit from a stimulating scientific and industrial environment of the highest level, with access to a national network of leading research institutions and industry partners, regular interactions with the broader EDT community through workshops, seminars, and joint demonstrators, and the opportunity to contribute to Artemis, the program's open software platform.


## What You Will Gain from This PhD

This PhD position offers the opportunity to:

- Develop highly sought-after skills in system modeling, human-computer interaction, and collaborative innovation.
- Collaborate with leading partners (Inria, IMT, CEA, CNRS, etc.) and validate your research on real-world industrial use cases.
- Join a network of PhD candidates within the EDT program, fostering collaboration, peer support, and interdisciplinary exchanges.
- Contribute to an open-source platform (Artemis) and publish in international conferences and journals.
- Gain recognition in a rapidly growing field, with career prospects in academic research, industrial R&D, or entrepreneurship.

Upon completion, you will be positioned as a recognized expert in a key domain for industry and research, with diverse professional opportunities in France and internationally.


## Qualifications

### Required
- Master degree in computer science with a focus on software engineering and/or human-computer interaction
- Proficiency in programming languages (e.g., Java)
- Excellent written and oral communication skills in English and French
- Strong analytical and problem-solving abilities
- Initiative, curiosity, inventiveness

### Preferred
- Knowledge of modelling, formal modelling (e.g., Simulink, Petri nets)
- Familiarity with real-time systems
- Previous research experience in HCI or 2D/3D applications or related fields

## Application Process

Please submit your application including:
1. **Cover Letter**: Explaining your motivation and research interests
2. **Curriculum Vitae**: Including academic background and relevant experience
3. **Academic Transcripts**: Master's degree and relevant coursework
4. **Research Statement**: Brief description of your research interests and goals (1-2 pages)
5. **References**: Contact information for two academic or professional references

## Application Deadline

**Jully 30th, 2026** (expected start date: mid-2026)

Early applications are encouraged as the position may be filled before the deadline.
It is also possible to start with an internship to finalize the master. 

## Contact Information

**Supervisor**: Philippe Palanque
**Email**: philippe.palanque@irit.fr
**Phone**: +33 5 61 55 69 55

**Co-supervisor**: Camille Fayollas
**Email**: camille.fayollas@irit.fr  
**Phone**: +33 5 61 63 36 57

**Co-supervisor**: Romain Pinquié
**Email**: romain.pinquie@grenoble-inp.fr

## About Université de Toulouse and IRIT

Université de Toulouse, formerly Université Toulouse III - Paul Sabatier, is one of France’s leading universities, with nearly 37,000 students. The diversity of its laboratories and the quality of its teaching in the fields of science, health, sport, technology, and engineering ensure its strong national and international scientific reputation. https://www.univ-tlse3.fr/

The ICS team of IRIT conducts research on notations, processes and tools for the design, implementation and evaluation of safety-critical interactive systems with a strong connection with software engineering. ICS team focusses on the integration of multiple and sometimes conflicting properties such as usability, user experience, dependability and safety. https://www.irit.fr/recherches/ICS/index.html

## About Grenoble INP-UGA and G-SCOP

As an academic division of UGA, a recognized research hub and a founding member of the Grenoble ecosystem, Grenoble INP Graduate schools of Engineering and Management, Université Grenoble Alpes plays a major role in the scientific and industrial community. https://www.grenoble-inp.fr/

G-SCOP synergizes multiple disciplines to address the scientific challenges posed by the transformations in the industrial world. The laboratory's scope range from product design to production systems management, leveraging strop optimization skills. https://g-scop.grenoble-inp.fr/


## References

[1] Semeraro, C., Lezoche, M., Panetto, H., and Dassisti, M. Digital twin paradigm: A systematic literature review. Computers in Industry, 130:103469, 2021. 28
[2] Willett, W., Jansen, Y., and Dragicevic, P.  Embedded data representations. IEEE Transactions on Visualization and Computer Graphics, 23(1):461–470, 2017. 28
[3] Frohlich, B. et al. 2000. Cubic-mouse-based interaction in virtual environments. IEEE computer graphics and applications, 20(4), 12-15.
[4] Tao F. et al. 2022. Digital twin modeling. Journal of Manufacturing Systems, 64, 372-389.
[5] Martinie, C., Palanque, P., Winckler, M. (2011). Structuring and Composition Mechanisms to Address Scalability Issues in Task Models. In: Campos, P., Graham, N., Jorge, J., Nunes, N., Palanque, P., Winckler, M. (eds) Human-Computer Interaction – INTERACT 2011. INTERACT 2011. Lecture Notes in Computer Science, vol 6948. Springer, Berlin, Heidelberg. https://doi.org/10.1007/978-3-642-23765-2_40
[6] Célia Martinie, Philippe Palanque, Elodie Bouzekri, Andy Cockburn, Alexandre Canny, and Eric Barboni. 2019. Analysing and Demonstrating Tool-Supported Customizable Task Notations. Proc. ACM Hum.-Comput. Interact. 3, EICS, Article 12 (June 2019), 26 pages. https://doi.org/10.1145/3331154
[7] Accot, J., Chatty, S., Palanque, P. (1996). A Formal Description of Low Level Interaction and its Application to Multimodal Interactive Systems. In: Design, Specification and Verification of Interactive Systems ’96. Eurographics. Springer, Vienna. https://doi.org/10.1007/978-3-7091-7491-3_5
[8] Arnaud Hamon, Philippe Palanque, José Luís Silva, Yannick Deleris, and Eric Barboni. 2013. Formal description of multi-touch interactions. In Proceedings of the 5th ACM SIGCHI symposium on Engineering interactive computing systems (EICS'13). Association for Computing Machinery, New York, NY, USA, 207–216. https://doi.org/10.1145/2494603.2480311
[9] Anderson, J. R., Bothell, D., Byrne, M. D., Douglass, S., Lebiere, C., & Qin, Y. (2004). An integrated theory of the mind. Psychological review, 111(4), 1036.