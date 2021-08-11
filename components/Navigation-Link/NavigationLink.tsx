import React from "react";
import { ReactElementLike } from "prop-types";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import Icon from "../Icon";
import { NavLinks as MobileNavLinks } from "../MobileMenu";

interface Props {
  href: string;
  children: ReactElementLike;
}

const StyledLink = styled.a`
  display: flex;
  gap: 1.8rem;
  align-items: center;
  flex-basis: 4rem;
  font-size: 1.8rem;
  text-decoration: none;
  color: var(--black);
  width: 200px;
  padding-left: ${(props) => (props.active ? "55px" : "59px")};
  background-color: ${(props) => (props.active ? "white" : "inherit")};
  border-left: ${(props) =>
    props.active ? "4px solid var(--primary)" : "inherit"};
  border-radius: 0px 15px 15px 0px;
  &:hover {
    background-color: white;
  }
  /* props cant be passed to composed components?
  Gotta do it through media query */
  @media ${(props) => props.theme.queries.phoneAndSmaller} {
    font-weight: ${(props) => (props.active ? "700" : "inherit")};
  }
  ${MobileNavLinks} & {
    padding-left: 0px;
    background-color: var(--background);
    border-left: none;
    font-size: 2rem;
    &:hover {
      background-color: var(--background);
    }
  }
`;

const ActiveLink: NextPage<Props> = ({ children, href }) => {
  const { asPath } = useRouter();
  const child = React.Children.only(children);

  return (
    <Link href={href} passHref>
      {React.cloneElement(child, {
        active: `/${asPath.split("/")[1]}` === `/${href.split("/")[1]}`,
      })}
    </Link>
  );
};

export default function NavLink({ linkName, href, icon, handleClick = null }) {
  return (
    <ActiveLink href={href}>
      <StyledLink onClick={handleClick}>
        <Icon name={icon} />
        {linkName}
      </StyledLink>
    </ActiveLink>
  );
}
