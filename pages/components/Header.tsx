import Link from "next/link";

export default function Header() {
  return (
    <div>
      <div className="bar">
        <Link href="/">Home</Link>
      </div>
      <div className="sub-bar">
        <span>Hi!</span>
      </div>
    </div>
  );
}
