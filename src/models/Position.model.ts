// Shape of an unresolved `reference()` field as it appears on raw frontmatter
// data (before `getEntry`/`getEntries` resolves it into a full CollectionEntry).
type Ref<C extends string> = { collection: C; id: string };

export type Lang = 'en' | 'fr';
export type PositionType = 'PostDoc' | 'PhD' | 'Engineer' | 'Intern' | 'Others';
export type Pc = 'PC1' | 'PC2' | 'PC3' | 'PC4' | 'PC5';
export type PositionFunding = 'EDT' | 'external';
export type ResearchStatus = 'planned' | 'ongoing' | 'completed' | 'paused' | 'withdrawn';

export interface Researcher {
    name: string;
    email?: string;
}

export interface Supervisor {
    name: string;
    org?: string;
    role?: string;
}

export interface PositionUseCase {
    title: string;
    ref?: Ref<"use-cases">;
    note?: string;
}

export interface Position {
    title: string;
    type: PositionType;
    location: string;
    description: string;
    filled: boolean;
    lang?: Lang;
    pc?: Pc;
    tags?: string[];
    references?: string[];

    // Open-position fields
    expectedStartDate?: string;
    publishedDate?: Date;
    requirements?: string[];
    contacts?: string[];
    partner?: string;
    externalUrl?: string;

    // Occupied / research-position fields
    researcher?: Researcher;
    supervisors?: Supervisor[];
    funding?: PositionFunding;
    host?: string;
    startDate?: Date;
    expectedEndDate?: Date;
    researchStatus?: ResearchStatus;
    useCases?: PositionUseCase[];
    publications?: Ref<"publications">[];
    lastUpdated?: Date;

    originalPosition?: Ref<"positions">;
}
