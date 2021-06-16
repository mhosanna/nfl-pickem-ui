import PageHeading from "./components/PageHeading";
import Picks from "./components/Picks";

export default function PicksPage() {
  return (
    <>
      <PageHeading heading="Make Your Picks" season="2021" />
      <Picks />
    </>
  );
}
