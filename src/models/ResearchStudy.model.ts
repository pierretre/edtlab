import type { CollectionEntry } from "astro:content";

export type Lang = 'en' | 'fr';
export type ResearchStudyType = 'PhD' | 'PostDoc';
export type ResearchStudyStatus = 'planned' | 'ongoing' | 'completed' | 'paused' | 'withdrawn';
export type Pc = 'PC1' | 'PC2' | 'PC3' | 'PC4' | 'PC5';

export interface Supervisor {
    name: string;
    org?: string;
}

export interface Researcher {
    name: string;
    email?: string;
}

export interface ResearchStudyUseCase {
    title: string;
    ref?: CollectionEntry<"use-cases">;
    note?: string;
}

export interface ResearchStudy {
    title: string;
    lang?: Lang;
    type: ResearchStudyType;
    researcher: Researcher;
    pc: Pc;
    location: string;
    host?: string;
    supervisors: Supervisor[];
    startDate: Date;
    expectedEndDate?: Date;
    status: ResearchStudyStatus;
    description: string;
    useCases: ResearchStudyUseCase[];
    publications: CollectionEntry<"publications">[];
    tags: string[];
    lastUpdated?: Date;
    originalJobOffer?: CollectionEntry<"job-offers">;
}
