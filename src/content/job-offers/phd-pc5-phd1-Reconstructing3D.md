---
# Please respect these sections and template for good integration in the web site
title: "Automatic construction of a digital model from real-world scenes - EDT" # Avoid accents in title
type: "PhD"  # Options (Limited): "PostDoc", "PhD", "Engineer", "Intern"
location: "Dijon - Paris, France"
expectedStartDate: "Q4 2026"  # Expected start date - flexible format: "Spring 2025", "Q2 2025", "2025-06-01", etc.
publishedDate: 2026-04-01  # Date when job offer was published in YYYY-MM-DD format
filled: false  # Position availability status: true if position is filled, false if still available
description: "Extraction of the geometry, the kinematics, and the mechanical properties using machine learning of a single object from videos or photos." # Brief summary of the position (2-3 sentences) for list summury printing. The detailed description goes in the Body section below.
requirements: ["Master degree in relevant field", "Experience with digital twins", "Programming skills"] # Some requirements in a list
tags:
  - "PC5"  # Options (Feel free to add others): "PC1", "PC2", "PC3", "PC4", "PC5", "General", ... 
contacts: ["hiring.manager@edt-program.fr", "hr@institution.edu", "romain.raffin@ube.fr", "gilles.rougeron@cea.fr", "jeremie.le-garrec@cea.fr"]  # Array of contact emails for this position
---

## Context

Digital twins [[6](#timjlg-ref6)] are virtual representations of real-world products, systems, or processes, enabling simulation, integration, testing, monitoring, and maintenance. They play a pivotal role in optimizing complex systems across a wide range of domains, from industrial manufacturing and energy to environmental monitoring and healthcare.

The Engineering Digital Twin [EDT program](https://edtlab.fr/en/), funded by the France 2030 investment plan, is a national initiative aimed at advancing the scientific and technical foundations of digital twin engineering in France and Europe. By bringing together leading academic and industrial partners, EDT seeks to strengthen the bases for the design, use, and deployment of digital twins, addressing key open challenges in model hybridization, composability, development methodologies, digital coupling, and human–twin interaction.

The creation of digital 3D models of real objects is a major challenge in the digital transition. It enables, for example, the development of digital twins and the creation of datasets for learning methods. However, manual creation using computer graphics is time-consuming and costly. The use of automatic methods is therefore essential.

In recent years, acquisition and reconstruction methods have undergone significant developments. First, capture hardware has become accessible, lightweight, and inexpensive, and acquisition procedures have been simplified. In addition, reconstruction methods have made considerable progress. For instance, NeRFs (Neural Radiance Fields [1]), introduced in 2020, made it possible through an implicit representation of the scene using a Multi-Layer Perceptron neural network to generate images from novel viewpoints with unprecedented realism.

More recently, the 3D Gaussian Splatting method [2], introduced in 2023, has enabled through an explicit representation based on sets of Gaussians optimized from captured images the retention of most of the photorealistic qualities of NeRFs while allowing interactive visualization. Finally, starting from video data capturing multiple viewpoints of a dynamic scene, this method has been extended to 4D Gaussian Splatting (4DGS), enabling the generation of volumetric videos [3].

However, these methods represent complex scenes as a single entity without distinguishing, for example, an object from its environment or from the subparts of the object. Likewise, the captured geometry is intertwined with appearance, which itself results from the interaction between illumination and the local material at each point. These different aspects limit the possibilities for interacting with the captured scene.

## Thesis Objectives

This PhD project aims to generate as-built digital models of a single object from a series of photographs or videos. The object will therefore not only be reconstructed in 3D but also segmented into subparts. Its kinematics will be determined along with its physical characteristics. In this study, we will restrict ourselves to solid, multi-articulated, and non-deformable objects, described by coherent closed surfaces and volumes. BRep-type representations will be preferred for industrial objects. The robustness of the process should allow the model to be incrementally enhanced or adapted through additional captures over time. The study will also consider heritage objects in order to increase the variability of the learning methods. Key scientific challenges include:

- Obtaining the most descriptive possible image and video data for real-world cases.
- The necessary disentanglement of geometry and appearance in order to generate images of the object in motion with a consistent appearance.
- The difficulty for 3DGS or 4DGS techniques in representing reflective, transparent, or even refractive objects, potentially with curved surfaces. In such cases, the extracted geometry is often quite far from reality, and this discrepancy may be amplified by capture noise.
- The specific challenges associated with heritage objects. These manufactured objects, produced in small quantities, do not follow contemporary industrial construction rules; their appearance can be complex and also depends on their state of preservation.

The results of this thesis will directly contribute to the Artemis platform, an open-source framework set to become a benchmark in the field.

## Work Environment

The PhD candidate will be co-supervised by Romain Raffin, Universite de Bourgogne, [LIB](https://lib.ube.fr/equipes/modelisation-geometrique/) and Gilles Rougeron and Jeremie Le Garrec CEA LIST within [LSI](https://list.cea.fr/en/).

## What You Will Gain from This PhD

This PhD offers the opportunity to:

- Develop highly sought-after skills in system modeling, real-time data processing, and collaborative innovation.
- Collaborate with leading partners (Inria, CEA, CNRS, etc.) and validate your research on real-world industrial use cases.
- Join a network of PhD candidates within the EDT program, fostering collaboration, peer support, and interdisciplinary exchanges.
- Contribute to an open-source platform (Artemis) and publish in international conferences and journals.
- Gain recognition in a rapidly growing field, with career prospects in academic research, industrial R&D, or entrepreneurship.

Upon completion, you will be positioned as a recognized expert in a key domain for industry and research, with diverse professional opportunities in France and internationally.

## References

- Benoît Combemale, Pascale Vicat-Blanc, Arnaud Blouin, Hind Bril El Haouzi, Jean-Michel Bruel, et al.. Engineering Digital Twins: A Research Roadmap. EDTconf 2025 - 2nd International Conference on E>
- B. Mildenhall, P. P. Srinivasan, M. Tancik, J. T. Barron, R. Ramamoorthi, and R. Ng. Nerf: Representing scenes as neural radiance fields for view synthesis. In European Conference on Computer Vision (ECCV), 2020.
-	B. Kerbl, G. Kopanas, T. Leimkuhler, G. Drettakis (2023). 3d gaussian splatting for real- time radiance field rendering. ACM Transactions on Graphics (ToG), 42(4), 1-14.
-	Z. Yang, H. Yang, Z. Pan, X. Zhu, and L. Zhang. Real-time photorealistic dynamic scene representation and rendering with 4d gaussian splatting. arXiv preprint arXiv 2310.10642, 2023.
-	CL-Splats: Continual Learning of Gaussian Splatting with Local Optimization, Jan Ackermann1,2, Jonas Kulhanek1,3, Shengqu Cai2, Haofei Xu, Marc Pollefeys, Gordon Wetzstein, Leonidas Guibas. ICCV 2025. https://cl-splats.github.io/
- Guedon, A., & Lepetit, V. (2024). Sugar: Surface-aligned gaussian splatting for efficient 3d mesh reconstruction and high-quality mesh rendering. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (pp. 5354-5363).
-	Huang, B., Yu, Z., Chen, A., Geiger, A., & Gao, S. (2024, July). 2d gaussian splatting for geometrically accurate radiance fields. In ACM SIGGRAPH 2024 conference papers (pp. 1-11).
- MILo: Mesh-In-the-Loop Gaussian Splatting for Detailed and Efficient Surface Reconstruction, Antoine Guedon, Diego Gomez, Nissim Maruani, Bingchen Gong, George Drettakis, Maks Ovsjanikov, ACM Transactions on Graphics, 2025 ttps://inria.hal.science/hal-05327792v1
-	Chen, C., Wei, J., Chen, T., Zhang, C., Yang, X., Zhang, S., ... & Liu, F. (2025). Cadcrafter: Generating computer-aided design models from unconstrained images. In Proceedings of the Computer Vision and Pattern Recognition Conference (pp. 11073-11082).
-	Huang, Z., Sun, B., Delitzas, A., Chen, J., & Pollefeys, M. (2025). REACT3D: Recovering Articulations for Interactive Physical 3D Scenes. arXiv preprint arXiv:2510.11340.
-	PhysX-3D: Physical-Grounded 3D Asset Generation, Cao, Z., Chen, Z., Pan, L., & Liu, Z. (2025). arXiv preprint arXiv:2507.12465. https://physx-3d.github.io/

