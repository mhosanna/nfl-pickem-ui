import Navigation from "../Navigation";

export default function PageShell({ children }) {
  return (
    <>
      <Navigation />
      <>{children}</>
    </>
  );
}
