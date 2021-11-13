import PageHeading from '../../../components/PageHeading';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ManageWeeks from '../../../components/ManageWeeks';
import Spacer from '../../../components/Spacer';
import { season } from '../../../config';
import PleaseSignIn from '../../../components/PleaseSignIn';

export default function ManageWeeksPage() {
  return (
    <>
      <PageHeading heading="Manage Games" season={season} />
      <PleaseSignIn>
        <>
          <Breadcrumbs>
            <Breadcrumbs.Crumb href={`/manage-games/${season}`}>
              {season} Season
            </Breadcrumbs.Crumb>
          </Breadcrumbs>
          <Spacer size={14} />
          <ManageWeeks season={season} />
        </>
      </PleaseSignIn>
    </>
  );
}
