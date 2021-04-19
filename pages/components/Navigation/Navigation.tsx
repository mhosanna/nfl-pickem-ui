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

const NavigationStyles = styled.nav``;

const NavLink = styled.a<{ active?: boolean }>``;

const ActiveLink: NextPage<Props> = ({ children, href }) => {
  const router = useRouter();
  const child = React.Children.only(children);

  return (
    <Link href={href} passHref>
      {React.cloneElement(child, { active: router.pathname === href })}
    </Link>
  );
};

export default function Navigation() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <NavigationStyles>
      <div className="menu-links">
        <ActiveLink href="/">
          <NavLink>Leaderboard</NavLink>
        </ActiveLink>
        <ActiveLink href="/picks">
          <NavLink>My Picks</NavLink>
        </ActiveLink>
        <ActiveLink href="/game-results">
          <NavLink>Game Results</NavLink>
        </ActiveLink>
        <ActiveLink href="/manage-games">
          <NavLink>Manage Games</NavLink>
        </ActiveLink>
        <ActiveLink href="/manage-league">
          <NavLink>Manage League</NavLink>
        </ActiveLink>
      </div>
    </NavigationStyles>
  );
}
