import PropTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";
import Nav from "./Navigation";

const GlobalStyles = createGlobalStyle`
 @font-face {
    font-family: 'BebasNeue';
    src: url('/fonts/BebasNeue-Regular.ttf') format("truetype");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Montserrat';
    src: url('/fonts/Montserrat-Regular.ttf') format("truetype");
    font-weight: normal;
    font-style: normal;
  }
 html {
    --red: #D50A0A;
    --blue: #013369;
    --lighterBlue: #01458D;
    --black: #272727;
    --grey: #343436;
    --gray: var(--grey);
    --lightGrey: #e1e1e1;
    --lightGray: var(--lightGrey);
    --offWhite: #ededed;
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
    --heading-font: 'BebasNeue', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    --body-font: 'Montserrat', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    box-sizing: border-box;
    font-family: var(--body-font);
    font-size: 10px;
    color: var(--black);
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  body {
    min-height: calc(100vh - 100px);
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height:2;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 5px 0;
    font-family: var(--heading-font);
    text-shadow: 0 2px 0 rgba(0, 0, 0, 0.07);
  }
  a {
    text-decoration: none;
    color: var(--black);
  }
  a:hover {
    text-decoration: underline;
  }
  button {
    font-family: var(--body-font);
  }
`;

const LayoutStyles = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-columns: 30rem 1fr;
  margin: 0 auto;
  @media (max-width: 768px) {
    grid-template-columns: auto;
    grid-template-rows: min-content;
  }
`;

const PageStyles = styled.div`
  max-width: var(--maxWidth);
  padding: 2rem;
`;

export default function Page({ children }) {
  return (
    <LayoutStyles>
      <GlobalStyles />
      <Nav />
      <PageStyles>{children}</PageStyles>
    </LayoutStyles>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
