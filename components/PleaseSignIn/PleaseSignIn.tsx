import { usePlayer } from "../../lib/usePlayer";
import { SignIn } from "../SignIn";

export default function PleaseSignIn({ children }) {
  const me = usePlayer();
  if (!me) return <SignIn />;
  return children;
}
