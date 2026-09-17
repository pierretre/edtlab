---
title: "Location-aware digital twins for wireless communication networks" # Avoid accents in title
type: "PostDoc"  # Options (Limited): "PostDoc", "PhD", "Engineer", "Intern"
pc: PC4
location: "Lyon, France"
expectedStartDate: "Fall 2026"  # Expected start date - flexible format: "Spring 2025", "Q2 2025", "2025-06-01", etc.
publishedDate: 2026-09-17  # Date when job offer was published in YYYY-MM-DD format
filled: false  # Position availability status: true if position is filled, false if still available
description: "This post-doctoral contract develops location-aware digital twins of wireless communication networks, using self-supervised channel charting to derive location information directly from existing communication signals." # Brief summary of the position (2-3 sentences). The detailed description goes in the Body section below.
requirements: ["PhD in digital communications, machine learning or signal processing", "Familiarity with self-supervised machine learning", "Strong programming skills", "Experience with experimental wireless communications systems"] # Some requirements in a list
contacts: ["maxime.guillaud@inria.fr", "Matthieu.Crussiere@insa-rennes.fr", "Luc.Le-Magoarou@insa-rennes.fr"]  # Array of contact emails for this position
---

## Context

Digital twins are virtual representations of real-world products, systems, or processes, enabling simulation, integration, testing, monitoring, and maintenance. They play a pivotal role in optimizing complex systems across a wide range of domains, from industrial manufacturing and energy to environmental monitoring and healthcare.

The Engineering Digital Twin [EDT program](https://edtlab.fr/en/), funded by the France 2030 investment plan, is a national initiative aimed at advancing the foundations of digital twin engineering in France and Europe. By bringing together leading academic and industrial partners, EDT seeks to strengthen the bases for the design, use, and deployment of digital twins, addressing key open challenges in model hybridization, composability, development methodologies, digital coupling, and human–twin interaction. [Sub-project PC4](https://edtlab.fr/fr/projets-cibles/pc4) of the EDT program is concerned with the study of synchronization between digital representations and the physical reality.

The proposed post-doctoral contract focuses on building and synchronizing the digital twin of a wireless communication network (including terminals such as mobile devices, sensors, etc. and access points such as 5G/6G base stations or WiFi hotspots), with emphasis on location information. We plan to leverage Channel Charting [2], a self-supervised machine learning approach which allows deriving pseudo-location information by applying dimensionality reduction to the channel state information routinely measured in the process of establishing wireless communications. Recent results [3, 5, 6] have shown that channel charting can provide a surrogate for location information sufficient for many location-based tasks, purely based on existing communication signals, i.e. without requiring the exchange of dedicated location beacons, which are spectrally and energetically costly.

## Objectives of the Post-Doctoral Contract

This post-doctoral contract will focus on the development of location-aware digital twins of wireless communication networks. Key scientific objectives include:

- The adaptation of channel charting methods to various network architectures and air interface technologies (Cellular massive MIMO, distributed MIMO, cell-free, LoRa, mmWave, non-terrestrial, etc.);
- The development of communications-efficient protocols for distributed channel charting and manifold alignment [4];
- The study of the impact of non-stationary environments of different natures and time horizons (device mobility, evolutions in the electromagnetic scattering environment, blockage effects);
- (Optionally) an experimental validation of the proposed methods.

The results of this work will directly contribute to the Artemis platform, an open-source framework set to become a benchmark in the field.

## Work Environment

The position is hosted within the [MARACAS team](https://team.inria.fr/maracas/en/) at the CITI Laboratory, on the campus of [INSA Lyon](https://www.insa-lyon.fr/).

The postdoctoral researcher will be co-supervised by [Dr. Maxime Guillaud](https://maximeguillaud.github.io/), Inria / CITI Laboratory, Lyon, Profs. [Matthieu Crussière](https://scholar.google.com/citations?user=8w3lju8AAAAJ&hl=fr/) and [Luc Le Magoarou](https://luclemagoarou.netlify.app/), INSA Rennes / IETR. The candidate will benefit from a stimulating scientific and industrial environment of the highest level, with access to a national network of leading research institutions and industry partners, regular interactions with the broader EDT community through workshops, seminars, and joint demonstrators, and the opportunity to contribute to Artemis, the program's open software platform.

Note that this position is located in a restricted access zone ("ZRR"), as defined in Decree No. 2011-1425 concerning the protection of the nation's scientific and technical potential. Authorization to access such a zone is granted by the head of the institution, following a favorable ministerial opinion.

## What You Will Gain from This Post-Doc

This contract provides the opportunity to:

- Develop highly sought-after skills in machine learning, system modeling, real-time data processing, and collaborative innovation.
- Collaborate with leading partners (Inria, CEA, CNRS, etc.) and validate your research on real-world industrial use cases.
- Join a network of PhD candidates and postdoctoral researchers within the EDT program, fostering collaboration, peer support, and interdisciplinary exchanges.
- Contribute to an open-source platform (Artemis) and publish in international conferences and journals.
- Gain recognition in a rapidly growing field, with career prospects in academic research, industrial R&D, or entrepreneurship.

Upon completion, you will be positioned as a recognized expert in a key domain for industry and research, with diverse professional opportunities in France and internationally.

## References

[1] Benoît Combemale, Pascale Vicat-Blanc, Arnaud Blouin, Hind Bril El Haouzi, Jean-Michel Bruel, et al.. Engineering Digital Twins: A Research Roadmap. EDTconf 2025 - 2nd International Conference on Engineering Digital Twins, Oct 2025, Grand Rapids, Michigan, United States, https://inria.hal.science/hal-05223776v1.

[2] C. Studer, S. Medjkouh, E. Gonultaş, T. Goldstein and O. Tirkkonen, "Channel Charting: Locating Users Within the Radio Environment Using Channel State Information," in IEEE Access, vol. 6, pp. 47682-47698, 2018, https://ieeexplore.ieee.org/abstract/document/8444621.

[3] P. Ferrand, M. Guillaud, C. Studer and O. Tirkkonen, "Wireless Channel Charting: Theory, Practice, and Applications," in IEEE Communications Magazine, vol. 61, no. 6, pp. 124-130, June 2023, https://ieeexplore.ieee.org/abstract/document/10155724.

[4] Y. Vindas and M. Guillaud, "Multi-Site Wireless Channel Charting Through Latent Space Alignment," IEEE International Workshop on Signal Processing Advances in Wireless Communications (SPAWC), 2024, https://ieeexplore.ieee.org/document/10694402.

[5] B. Chatelier, V. Corlay, M. Crussière and L. Le Magoarou, "Model-Based Learning for Multi-Antenna Multi-Frequency Location-to-Channel Mapping," in IEEE Journal of Selected Topics in Signal Processing, vol. 19, no. 3, pp. 520-535, April 2025, https://ieeexplore.ieee.org/abstract/document/10924768

[6] T. Yassine, L. L. Magoarou, M. Crussière and S. Paquelet, "Optimizing Multicarrier Multiantenna Systems for LoS Channel Charting," in IEEE Transactions on Wireless Communications, vol. 23, no. 10, pp. 14702-14714, Oct. 2024, https://ieeexplore.ieee.org/abstract/document/10577595
