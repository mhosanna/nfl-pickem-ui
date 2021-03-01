import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

const Navigation = styled.nav`
  background-color: var(--blue);
  padding-top: 40px;
  .menu-links {
    display: grid;
    grid-template-rows: repeat(3, 7rem);
    a {
      padding-left: 25px;
      color: var(--offWhite);
      font-family: var(--heading-font);
      text-shadow: 0 2px 0 rgba(0, 0, 0, 0.07);
      font-size: 35px;
      font-weight: bold;
      :hover {
        border-left: 5px solid var(--red);
        padding-left: 20px;
        background-color: var(--lighterBlue);
        text-decoration: none;
      }
    }
  }
  .menu-list {
    display: none;
  }
  @media (max-width: 768px) {
    padding-top: 0px;
    .menu-links {
      grid-template-rows: min-content;
      max-height: 0;
      overflow: hidden;
      transition: all 0.7s;
    }
    .menu-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      align-items: end;
      padding: 15px;
      background-color: var(--blue);
      color: var(--offWhite);
      font-family: var(--heading-font);
      font-size: 35px;
      font-weight: bold;
      border: none;
    }
    .menu-list.expanded ~ .menu-links {
      display: grid;
      max-height: 500px;
    }

    .menu-list .close {
      display: none;
    }

    .menu-list.expanded .close {
      display: inline-block;
    }

    .menu-list.expanded .open {
      display: none;
    }
  }
`;

export default function Nav() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <Navigation>
      <button
        onClick={() => setOpenMobileMenu(!openMobileMenu)}
        className={`menu-list ${openMobileMenu ? "expanded" : ""}`}
      >
        <span className="open">☰</span>
        <span className="close">×</span>
        <span>Menu</span>
      </button>
      <div className="menu-links">
        <Link href="/">Leader Board</Link>
        <Link href="/picks">My Picks</Link>
        <Link href="/admin">Game Admin</Link>
      </div>
    </Navigation>
  );
}
