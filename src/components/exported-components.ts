import Email from "./Email.astro";
import OutlinedCard from "./OutlinedCard.astro";
import OptimizedFigure from "./OptimizedFigure.astro";
import ContactForm from '@components/ContactForm.astro';
import PhdClubForm from '@components/PhdClubForm.astro';
import PartnersGrid from '@components/PartnersGrid.astro';
import PrincipalInvestigator from '@components/PrincipalInvestigator.astro';
import PublicationList from '@components/PublicationList.astro';
import NewsList from '@components/NewsList.astro';
import PositionList from '@components/PositionList.astro';
import ProjectGrid from '@components/ProjectGrid.astro';
import PCLeadersList from '@components/PCLeadersList.astro';
import EventTimeline from '@components/EventTimeline.astro';
import UseCaseList from '@components/UseCaseList.astro';

const mdxComponents = {
    Email,
    OutlinedCard,
    OptimizedFigure,
    ContactForm,
    PhdClubForm,
    PartnersGrid,
    PrincipalInvestigator,
    PublicationList,
    NewsList,
    PositionList,
    ProjectGrid,
    PCLeadersList,
    EventTimeline,
    UseCaseList
};

export default mdxComponents;
