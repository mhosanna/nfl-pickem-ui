import PageHeading from "../components/PageHeading";
import Picks from "../components/Picks";
import { season } from "../config";

export default function PicksPage() {
  return (
    <>
      <PageHeading heading="Make Your Picks" season={season} />
      <Picks season={season} />
    </>
  );
}
