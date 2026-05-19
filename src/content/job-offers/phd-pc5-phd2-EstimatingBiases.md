---
# Please respect these sections and template for good integration in the web site
title: "Visualization of the Plausibility and Bias for Data Resources used in a Geographic Digital Twin" # Avoid accents in title
type: "PhD"  # Options (Limited): "PostDoc", "PhD", "Engineer", "Intern"
location: "Gif-sur-Yvette, France"
expectedStartDate: "Spring 2026"  # Expected start date - flexible format: "Spring 2025", "Q2 2025", "2025-06-01", etc.
publishedDate: 2026-04-01  # Date when job offer was published in YYYY-MM-DD format
filled: false  # Position availability status: true if position is filled, false if still available
description: "In this PhD research project we will investigate how to automatically classify the plausibility in datasets collected for a geographic or otherwise spatial data, and how to visualize it. We will rely on past results that detected data biases and data errors based on a manual analysis, and will investigate how to use machine learning models to automate this process. In addition, we will investigate how best to depict the different types and degrees of data bias, data imprecision, and data error." # Brief summary of the position (2-3 sentences) for list summury printing. The detailed description goes in the Body section below.
requirements: ["Master degree in computer science or related field", "Interest in interactive data visualization and analysis", "Excellent programming skills; in particular, with experiences in computer graphics, visualization (e.g., D3, Altair, Plotly, ...)", "Good written and spoken communication in English", "Past experience in data visualization", "Past publications preferred but not required"] # Some requirements in a list
tags:
  - "PC5"  # Options (Feel free to add others): "PC1", "PC2", "PC3", "PC4", "PC5", "General", ... 
contacts: ["tobias.isenberg@inria.fr", "maria-jesus.lobo-gunther@ign.fr"]  # Array of contact emails for this position
references:
  - "hullman-2019-pursuit"
  - "isenberg-2022-you"
  - "lin-2023-data"
  - "mc-2019-framework"
  - "pe-2025-advocating"
  - "edt-roadmap"
---

## Context

Digital twins [[6](#timjlg-ref6)] are virtual representations of real-world products, systems, or processes, enabling simulation, integration, testing, monitoring, and maintenance. They play a pivotal role in optimizing complex systems across a wide range of domains, from industrial manufacturing and energy to environmental monitoring and healthcare.

The Engineering Digital Twin [EDT program](https://edtlab.fr/en/), funded by the France 2030 investment plan, is a national initiative aimed at advancing the scientific and technical foundations of digital twin engineering in France and Europe. By bringing together leading academic and industrial partners, EDT seeks to strengthen the bases for the design, use, and deployment of digital twins, addressing key open challenges in model hybridization, composability, development methodologies, digital coupling, and human–twin interaction.

In the field of visualization, questions on the visualization of data uncertainty have been a core part of the research to date [e.g., [1](#timjlg-ref1)]. Yet past work largely often silently considered data uncertainty to arise (primarily) from measurement uncertainty or as connected to some statistical analysis of captured data values. Only relatively recently have questions of implicit notions of error [[4](#timjlg-ref4)] or data hunches [[3](#timjlg-ref3)] entered the discussions of this general problem—these cover aspects of data imprecision that can arise from various sources: e.g., different forms of measurement or data recording, biases in how people access data, and even intentionally introduced errors. For example, spatial geographic data may not only come from systematically controlled sources but also from, for instance, from multiple sets of data that come from different institutions with different data collection policies, from contributions from the general public, or even by sourcing data from social media. Naturally, this introduces a variety of different levels of data quality and plausibility for spatial data. Sometimes experts are aware of these data caveats (that exist even for professionally collected datasets) and we can try to visualize them [[3](#timjlg-ref3)–[5](#timjlg-ref5)], yet in other cases the data collection happens in a way that this knowledge is not available—e.g., when data is retro-actively collected from sources that were not (primarily) created for recording this data in the first place—and we have to find ways of recovering such information retroactively and without access to the ground truth [[2](#timjlg-ref2)]. For instance, image collection sites such as Flickr partially show geo-located images, from which locations of certain points of interest can be extracted. In this specific example we ourselves recovered species distribution data from images posted on photo sharing platforms, and found that such geographic data is subject to many biases and errors. Yet this data analysis so far [[2](#timjlg-ref2)] has been a manual process and also only recovers anecdotal information about the existence of data errors and biases. In this PhD research project we will investigate if those results generalize to other kinds of spatial data (e.g., automatically detected features in remote sensing imagery, other volunteered geographic information, other forms of 2D and 3D spatial data). Then we will investigate ways to automate the error and bias identification process as well as to quantify the existence of such biases and errors in some form of plausibility measure, to be visualized in the digital twin [[6](#timjlg-ref6)].

## Thesis Objectives

### Main Objective and Method

The main objective is to generalize the mentioned past approaches for the visualization of data errors and data bias for spatial data, and to find suitable general error/bias identification methods and visualization techniques. Based on this generic investigation we will focus on the EDT use case “PC10a—Geo Digital Twins Research Initiatives”. Specifically, for a future digital twin of France, we would like to develop one or more application cases that demonstrate the new techniques and explore how we can augment its data with data from social media and other less reliable sources. And as part of this work we also hope to establish the topic of data error and data bias visualization, similar to what exists for uncertainty visualization. A second use case that we would like to investigate is “UC14—Digital Twin Factory” where similar spatial data arises and, thus, questions of data plausibility and accuracy. 

The results of this thesis will directly contribute to the Artemis platform, an open-source framework set to become a benchmark in the field.

### Specific Approach and Research Questions
Based on the different visual and interactive identification strategies we had explored in the past [[2](#timjlg-ref2)], we plan to investigate how we can systematically identify various forms of data error or data bias on the one side or, from a different perspective, establish a form of data plausibility measure. We want to do this in a sustainable way, one that does not (only) rely on manual data classification. For this purpose we may investigate approaches from machine learning that can identify “red flags” for data plausibility automatically. As a starting point we will use the visual patterns we have previously identified that indicate, for instance, data manipulation. For instance, certain patterns we found in our Motion Plausibility Profile representation [[2](#timjlg-ref2)] indicate that geo-location data has been intentionally adjusted by the data authors (Fig. 1)—with the likely (understandable) goal to conceal specific locations of where pictures were taken.

This prior success in manual identification proves the viability of using trajectory-based features to detect anomalies. Following this approach, we expect to define other plausibility measures that reflect knowledge on data characteristics, data sources, and their creation processes. The logical next step is to automate and scale this data processing. To do so, we first need to determine how to translate the visual, pattern-based insights from a tool like the Motion Plausibility Profile into a quantitative, machine readable format. Furthermore, we need to determine which of the many known error types can be reliably detected by an automated system and which machine learning models are most effective for this specific task. Finally, understanding the limitations and prerequisites of such an approach—for instance, how much data is required for a model to be effective—is decisive in creating a robust and generalizable methodology. Once we have a good understanding of biases and errors, the next question is how to best represent them for the use in the digital twin application, in a way that can make use of the degree to which they can be useful.

We thus aim to address the following research questions in this project:
- Which types of data errors and biases for volunteered or even systematically collected geographic information can be reliably identified with the help of machine learning? Can we take advantage of different sources for the same data, such as volunteered data (e.g., by citizen scientists or by initiatives such as openstreetmap.org) and professionally curated data, and judge based on their differences to understand data errors and biases? Can we take advantage of knowledge about the way of data capture or collection (e.g., the characteristics of LIDAR HD data, and its different availability)?
- Can we, and if so how, make use of existing visual representations (e.g., Motion Plausibility Profiles, neighborhood analyses, etc. [[2](#timjlg-ref2)]) for the machine-learning-based analysis?
- Which machine learning approaches can effectively be used for the analysis of data biases and data errors?
- What are the dataset prerequisites (e.g., dataset size, quality of metadata, diversity of data contributors) for a successful analysis?
- How to best visualize the established data plausibility from different sources in a digital twin representation?
- How does the data plausibility change over time? What strategies can help us assess the temporal evolution of the data and how can we ensure accuracy over time?

### Expected Outcome and Impact
The primary outcome of this project will be a scientifically-grounded methodology for automatically quantifying the plausibility of geospatial data, irrespective of its original source. This moves beyond a simple software implementation to establish a new, scalable approach for data validation in this domain. The tangible result of this methodology will be a system capable of processing raw data and assigning each data point a quantitative anomaly score, which effectively flags suspicious data for review, based on the model’s reconstruction error. Finally, this work could lead to new techniques of the application of AI models to extract data for a digital twin from social media text and image data. The broader impact of this work lies in its generalizability. The results will:
- validate the effectiveness of translating patterns from a human-centric visual analysis tool into a successful machine learning pipeline,
- provide a clear understanding of which specific types of data errors and biases can be reliably identified using this automated approach, and
- offer a framework that could be adapted to other domains facing similar data quality challenges, providing insights into the necessary prerequisites for this kind of analysis.

## Work Environment

The PhD candidate will be co-supervised by [Tobias Isenberg](https://tobias.isenberg.cc/), [Inria](https://www.inria.fr/en), and [Maria Jesus Lobo-Gunther](https://www.umr-lastig.fr/maria-jesus-lobo/), [IGN](https://www.umr-lastig.fr/maria-jesus-lobo/www.ign.fr), and will work primarily within Inria's [AVIZ](https://www.aviz.fr/) team but will closely collaborate also with the [GeoVis](https://umrlastig.github.io/geovis/) team at IGN.

## What You Will Gain from This PhD

This PhD offers the opportunity to:

- Develop highly sought-after skills in system modeling, real-time data processing, and collaborative innovation.
- Collaborate with leading partners (Inria, CEA, CNRS, etc.) and validate your research on real-world industrial use cases.
- Join a network of PhD candidates within the EDT program, fostering collaboration, peer support, and interdisciplinary exchanges.
- Contribute to an open-source platform (Artemis) and publish in international conferences and journals.
- Gain recognition in a rapidly growing field, with career prospects in academic research, industrial R&D, or entrepreneurship.

Upon completion, you will be positioned as a recognized expert in a key domain for industry and research, with diverse professional opportunities in France and internationally.


