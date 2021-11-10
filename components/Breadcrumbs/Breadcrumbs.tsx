import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Breadcrumbs = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

Breadcrumbs.Crumb = ({ href, children }) => {
  return (
    <CrumbWrapper>
      <Link href={href} passHref>
        <CrumbLink>{children}</CrumbLink>
      </Link>
    </CrumbWrapper>
  );
};

const CrumbWrapper = styled.div`
  display: inline;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 700px; // the actual width, you can make this bit responsive, increasing the width as your viewport increases. I suggest to utilize the native Bootstrap media-breakpoints (i.e. media-breakpoint-up(md)).
  &:not(:first-of-type) {
    margin-left: 8px;
    &::before {
      content: '/';
      margin-right: 8px;
      color: var(--black);
    }
  }
  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    max-width: 205px;
  }
  @media ${(props) => props.theme.queries.phoneAndSmaller} {
    max-width: 190px;
  }
`;

const CrumbLink = styled.a`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--black);
  text-decoration: none;
  &:hover {
    color: var(--black);
  }
`;

const Wrapper = styled.nav`
  display: flex;
  font-size: 2.4rem;
  font-weight: 500;
  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    font-size: 1.7rem;
  }
  @media ${(props) => props.theme.queries.phoneAndSmaller} {
    font-size: 1.6rem;
  }
`;

export default Breadcrumbs;
