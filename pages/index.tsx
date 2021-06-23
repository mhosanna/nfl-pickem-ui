import LeaderBoard from "../components/LeaderBoard";
import PageHeading from "../components/PageHeading";

export default function HomePage() {
  return (
    <>
      <PageHeading heading="LeaderBoard" season="2021" />
      <LeaderBoard />
    </>
  );
}
