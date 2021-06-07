import React from "react";
import { ReactElementLike } from "prop-types";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import Icon from "../Icon";

interface Props {
  href: string;
  children: ReactElementLike;
}

const StyledLink = styled.a<{ active?: boolean }>`
  display: flex;
  gap: 1.8rem;
  align-items: center;
  flex-basis: 4rem;
  font-size: 1.8rem;
  text-decoration: none;
  color: var(--black);
  width: 175px;
  padding-left: ${(props) => (props.active ? "55px" : "59px")};
  background-color: ${(props) => (props.active ? "white" : "inherit")};
  border-left: ${(props) =>
    props.active ? "4px solid var(--primary)" : "inherit"};
  border-radius: ${(props) => (props.active ? "0px 15px 15px 0px" : "inherit")};
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

export default function NavLink({ linkName, href, icon }) {
  return (
    <ActiveLink href={href}>
      <StyledLink>
        <Icon name={icon} />
        {linkName}
      </StyledLink>
    </ActiveLink>
  );
}
