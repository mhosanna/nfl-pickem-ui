import PageHeading from "../../../components/PageHeading";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ManageWeeks from "../../../components/ManageWeeks";
import Spacer from "../../../components/Spacer";

const SEASON = "2021";

export default function ManageGamesPage() {
  return (
    <>
      <PageHeading heading="Manage Games" season={SEASON} />
      <Breadcrumbs>
        <Breadcrumbs.Crumb href={`/manage-games/${SEASON}`}>
          {SEASON} Season
        </Breadcrumbs.Crumb>
      </Breadcrumbs>
      <Spacer size={14} />
      <ManageWeeks />
    </>
  );
}
