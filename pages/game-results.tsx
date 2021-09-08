import Link from "next/link";
import PageHeading from "../components/PageHeading";
import { season } from "../config";

export default function GameResultsPage() {
  return (
    <>
      <PageHeading heading="Game Results" season={season} />
      <div>Coming Soon!</div>
    </>
  );
}

function ResultsSubMenu() {
  return (
    <nav>
      <Link href="/">
        <a>Picks by Player</a>
      </Link>
      <Link href="/about">
        <a>Picks by Game</a>
      </Link>
    </nav>
  );
}

GameResultsPage.getLayout = function getLayout(page) {
  return (
    <>
      <ResultsSubMenu />
      {page}
    </>
  );
};
