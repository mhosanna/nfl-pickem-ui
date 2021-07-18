import LeaderBoard from "../components/LeaderBoard";
import PageHeading from "../components/PageHeading";
import { season } from "../config";

export default function HomePage() {
  return (
    <>
      <PageHeading heading="LeaderBoard" season={season} />
      <LeaderBoard season={season} />
    </>
  );
}
