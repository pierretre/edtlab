---
title: Digital Twins for Wireless Networks
type: PhD
pc: PC4
location: Strasbourg, France
description: This PhD investigates the design of digital twins for wireless
  networks, aiming to develop frugal data collection and closed-loop control
  mechanisms that translate predictions into actionable adaptations within
  low-power wireless systems.
filled: true
expectedStartDate: September - December 2026
publishedDate: 2026-05-01
requirements:
  - Master degree in Computer Science (CS) or Electrical and Computer
    Engineering (ECE)
  - Excellent programming skills in C, and embedding programming
  - Knowledge of at least one scripting language, preferentially Python
  - Statistics and measurements
  - Wireless networks (protocols and radio propagation)
  - Knowlegde of Wi-Fi and LoRa would be an asset
  - Machine learning and deep learning algorithms (as a user)
  - Good verbal and written English skills. French is not a requirement
contacts:
  - net-phd-dt@icube.unistra.fr
researcher:
  name: "Feriel Meriem Aggoun "
---

## Context

Wireless networks have become a fundamental component of modern communication infrastructures, enabling seamless connectivity for a wide range of devices and services. Over the past decades, their usage has grown rapidly, driven by the proliferation of smartphones, the expansion of the Internet of Things, and the increasing demand for mobile and ubiquitous access to data. From personal communications to industrial automation and critical services, wireless technologies now support applications with diverse and stringent requirements in terms of throughput, latency, reliability, and energy efficiency. This growing reliance on wireless connectivity, combined with the inherent variability of the radio environment, raises significant challenges for the design, deployment, and management of wireless networks.

The recent rise of digital twins is opening new avenues for the design, analysis, and continuous optimization of wireless networks. By providing a synchronized virtual representation of a real system, they enable the exploration of complex scenarios without disrupting operational infrastructure. This capability is particularly appealing for wireless networks, where environmental dynamics, node mobility, and channel variability make direct observation difficult and costly.

The Engineering Digital Twin [(EDT)](https://edtlab.fr/en/) program, funded by the France 2030 investment plan, is a national initiative aimed at advancing the foundations of digital twin engineering in France and Europe, with one part specifically focusing on networking. By bringing together leading academic and industrial partners, EDT seeks to strengthen the bases for the design, use, and deployment of digital twins, addressing key open challenges in model hybridization, composability, development methodologies, digital coupling, and human–twin interaction.

## Thesis Objectives

Digital twins are a popular concept for Industry 4.0 [1]. They model real processes in manufacturing systems and are particularly useful for e.g., predictive maintenance and continuous optimization. More recently, they started to be used also in computer networks [2]. Indeed, modern network architectures exploit the Software Defined Networking (SDN) paradigm [3], where a collection of controllers orchestrate the network. A digital twin seems the right tool to make the network adaptive, to e.g., balance the load by selecting the best set of paths for different flows [4].

Historically, wireless network modeling has relied on mathematical abstractions or discrete-event simulations, approaches that often fail to capture the full complexity and variability of real-world conditions. The emergence of digital twins represents a shift in paradigm: virtual models can now be continuously fed with live network data, offering a more faithful, responsive, and predictive view of network behavior [5]. Wireless environments are known to be lossy, with time-variant characteristics, and many models exist for the link quality [6], radio propagation [7]. Measurements collected in real-time help to maintain a good representation of the physical world. Beyond observation, digital twins also create new opportunities for network reconfiguration. They allow operators and researchers to test novel resource allocation strategies, anticipate performance degradation, and balance network load under realistic conditions.

In this Ph.D. thesis, we will make research contributions by designing, instantiating and synchronizing a network digital twin, while addressing the following challenges:
1. Wireless networks are known to provide a lower bandwidth than wired networks. Thus, the amount of data used to synchronize the digital twin with the network should be constrained.
2. Lightweight models help maximize the return over benefit of the network digital twin. While Graph Neural Networks (GNNs) techniques have been used in networking to predict the performance in a different network topology [8], they are very computationally expensive.

During this Ph.D. thesis, the student is expected to make the following contributions:
1. Create a network digital twin of an existing wireless network.
2. Identify the metrics of interest for wireless networks, while maximizing passive measurements. The advisors already have strong skills in monitoring and measurements [9, 10].
3. Propose to adapt the network behavior based on the computations made on the digital twin, exploiting the so-called what-if scenarios.

## Work Environment

The PhD candidate will be co-supervised by:
- Fabrice Theoleyre, CNRS / University of Strasbourg 
- Oana Iova, INSA Lyon, Inria
- Fabrice Valois, INSA Lyon, Inria

within ICUBE laboratory, in Strasbourg, with visits to INSA Lyon / Inria AGORA. 


The candidate will benefit from a stimulating scientific and industrial environment of the highest level, with access to a national network of leading research institutions and industry partners, regular interactions with the broader EDT community through workshops, seminars, and joint demonstrators.


## What You Will Gain from This PhD

This PhD offers the opportunity to:
- Develop highly sought-after skills in system modeling, real-time data processing, and collaborative innovation.
- Collaborate with leading partners (Inria, CNRS, CEA, etc.) and validate your research on a wireless networking use case.
- Join a network of PhD candidates within the EDT program, fostering collaboration, peer support, and interdisciplinary exchanges.
- Contribute to opensource implementations in the wireless networking field, and possibly part of the SLICES-FR platform.
- Publish articles in high-reputation conferences and journals.

Upon completion, you will be positioned as a recognized expert in a key domain for industry and research, with diverse professional opportunities in France and internationally.

## References

[1] Jan-Frederik Uhlenkamp, Jannicke Baalsrud Hauge, Eike Broda, Michael Lütjen, Michael Freitag, and Klaus-Dieter Thoben. Digital twins: A maturity model for their classification and evaluation. IEEE Access, 10:69605–69635, 2022.

[2] Hamed Ahmadi, Avishek Nag, Zaheer Khar, Kamran Sayrafian, and Susanto Rahardja. Networked twins and twins of networks: An overview on the relationship between digital twins and 6g. IEEE Communications Standards Magazine, 5(4):154–160, 2021.

[3] Walter Cerroni, Alex Galis, Kohei Shiomoto, and Mohamed Faten Zhani. Telecom software, network virtualization, and software defined networks. IEEE Communications Magazine, 58(7):42–43, 2020.

[4] Erfan Mozaffari Ahrar, Mohammad Nassiri, and Fabrice Theoleyre. Multipath aware scheduling for high reliability and fault tolerance in low power industrial networks. Journal of Network and Computer Applications, 142:25–36, 2019.

[5] Linbo Hui, Mowei Wang, Liang Zhang, Lu Lu, and Yong Cui. Digital twin for networking: A data-driven performance modeling perspective. IEEE Network, 37(3):202–209, 2023.

[6] Gregor Cerar, Halil Yetgin, Mihael Mohorčič, and Carolina Fortuna. Machine learning for wireless link quality estimation: A survey. IEEE Communications Surveys & Tutorials, 23(2):696–728, 2021.

[7] Aristeidis Seretis and Costas D. Sarris. An overview of machine learning techniques for radiowave propagation modeling. IEEE Transactions on Antennas and Propagation, 70(6):3970–3985, 2022.

[8] Miquel Ferriol-Galmés, Jordi Paillisse, José Suárez-Varela, Krzysztof Rusek, Shihan Xiao, Xiang Shi, Xiangle Cheng, Pere Barlet-Ros, and Albert Cabellos-Aparicio. Routenet-fermi: Network modeling with graph neural networks. IEEE/ACM Transactions on Networking, 31(6):3080–3095, 2023.

[9] Farzad Veisi, Julien Montavont, and Fabrice Théoleyre. Enabling centralized scheduling using software defined networking in industrial wireless sensor networks. IEEE Internet of Things Journal, 10(23):20675–20685, 2023.

[10] Fabrice Theoleyre. Duocast for wireless industrial networks: an experimental study. In ACM Conference on Modeling, Analysis and Simulation of Wireless and Mobile Systems, MSWiM ’21, pages 99–107, New York, NY, USA, 2021. Association for Computing Machinery.
