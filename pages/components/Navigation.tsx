import React from "react";
import { ReactElementLike } from "prop-types";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

interface Props {
  href: string;
  children: ReactElementLike;
}

const Navigation = styled.nav`
  background-color: var(--blue);
  padding-top: 40px;
  .menu-links {
    display: grid;
    grid-template-rows: repeat(auto, 7rem);
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
      max-height: 500px;
    }

    .menu-list .close {
      display: none;
    }
  }
`;

const NavLink = styled.a<{ active?: boolean }>`
  padding-left: ${(props) => (props.active ? `20px` : `25px`)};
  color: var(--offWhite);
  font-family: var(--heading-font);
  text-shadow: 0 2px 0 rgba(0, 0, 0, 0.07);
  font-size: 35px;
  font-weight: bold;
  background-color: ${(props) => (props.active ? `var(--lighterBlue)` : ``)};
  border-left: ${(props) => (props.active ? `5px solid var(--red)` : ``)};
  :hover {
    border-left: 5px solid var(--red);
    padding-left: 20px;
    background-color: var(--lighterBlue);
    text-decoration: none;
  }
  @media (max-width: 768px) {
    text-align: center;
    background-color: ${(props) => (props.active ? `var(--lighterBlue)` : ``)};
    border-left: none;
    padding: 0;
    :hover {
      border-left: none;
      padding: 0;
    }
  }
`;

const ActiveLink: NextPage<Props> = ({ children, href }) => {
  const router = useRouter();
  const child = React.Children.only(children);

  return (
    <Link href={href} passHref>
      {React.cloneElement(child, { active: router.pathname === href })}
    </Link>
  );
};

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
        <ActiveLink href="/">
          <NavLink>Leader Board</NavLink>
        </ActiveLink>
        <ActiveLink href="/picks">
          <NavLink> My Picks</NavLink>
        </ActiveLink>
        <ActiveLink href="/admin">
          <NavLink> Game Admin</NavLink>
        </ActiveLink>
      </div>
    </Navigation>
  );
}
