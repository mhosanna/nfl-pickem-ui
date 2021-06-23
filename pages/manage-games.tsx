import PageHeading from "../components/PageHeading";
import Breadcrumbs from "../components/Breadcrumbs";
import ManageWeeks from "../components/ManageWeeks";
import Spacer from "../components/Spacer";

export default function ManageGamesPage() {
  return (
    <>
      <PageHeading heading="Manage Games" season="2021" />
      <Breadcrumbs>
        <Breadcrumbs.Crumb href="/manage-games">2021 Season</Breadcrumbs.Crumb>
      </Breadcrumbs>
      <Spacer size={14} />
      <ManageWeeks />
    </>
  );
}
