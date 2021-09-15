import { useRouter } from "next/dist/client/router";
import PicksByPlayer from "../PicksByPlayer";
import PicksByGame from "../PicksByGame";

export default function GameResults({ season }) {
  const {
    query: { by },
  } = useRouter();

  if (by === "player") return <PicksByPlayer season={season} />;
  if (by === "game") return <PicksByGame />;
  return <p>Oops! This page doesn't exist</p>;
}
