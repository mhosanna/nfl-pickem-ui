import styled from "styled-components";
import Link from "next/link";

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
  &:not(:first-of-type) {
    margin-left: 8px;
    &::before {
      content: "/";
      margin-right: 8px;
      color: var(--black);
    }
  }
`;

const CrumbLink = styled.a`
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
`;

export default Breadcrumbs;
