import React from "react";
import Link from "next/link";
import { WithRouterProps } from "next/dist/client/with-router";
import { useRouter } from "next/router";
import { ReactElementLike } from "prop-types";
import styled from "styled-components";
import { NextPage } from "next";

interface Props extends WithRouterProps {
  href: string;
  children: ReactElementLike;
  activeClassName: string;
}

const NavLink = styled.a<{ active: boolean }>`
  background-color: ${(props) =>
    props.active ? "var(--lighterBlue)" : "var(--blue)"};
  border-left: ${(props) => (props.active ? "5px solid var(--red)" : "")};
  padding-left: ${(props) => (props.active ? "20px" : "25px")};
`;

const ActiveLink: NextPage<Props> = ({ children, href }) => {
  const router = useRouter();

  return (
    <Link href={href} passHref>
      <NavLink active={router.pathname === href}>{children}</NavLink>
    </Link>
  );
};

export default ActiveLink;
