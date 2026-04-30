import OutlinedCard from "./OutlinedCard.astro";
import OptimizedFigure from "./OptimizedFigure.astro";
import ContactForm from '@components/ContactForm.astro';
import PartnersGrid from '@components/PartnersGrid.astro';
import PrincipalInvestigator from '@components/PrincipalInvestigator.astro';
import PublicationList from '@components/PublicationList.astro';
import NewsList from '@components/NewsList.astro';
import JobOfferList from '@components/JobOfferList.astro';
import ProjectGrid from '@components/ProjectGrid.astro';
import PCLeadersList from '@components/PCLeadersList.astro';
import EventTimeline from '@components/EventTimeline.astro';
import UseCaseList from '@components/UseCaseList.astro';

const mdxComponents = {
    OutlinedCard,
    OptimizedFigure,
    ContactForm,
    PartnersGrid,
    PrincipalInvestigator,
    PublicationList,
    NewsList,
    JobOfferList,
    ProjectGrid,
    PCLeadersList,
    EventTimeline,
    UseCaseList
};

export default mdxComponents;
