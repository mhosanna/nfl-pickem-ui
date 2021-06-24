import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
 @font-face {
    font-family: 'Lobster';
    src: url('/fonts/Lobster-Regular.ttf') format("truetype");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Manrope';
    src: url('/fonts/Manrope-Regular.ttf') format("truetype");
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Manrope';
    src: url('/fonts/Manrope-Medium.ttf') format("truetype");
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Manrope';
    src: url('/fonts/Manrope-Bold.ttf') format("truetype");
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'Manrope';
    src: url('/fonts/Manrope-ExtraBold.ttf') format("truetype");
    font-weight: 800;
    font-style: normal;
  }
  @font-face {
    font-family: 'Jost';
    src: url('/fonts/Jost-VariableFont_wght.ttf') format("truetype");
    font-weight: 400;
    font-style: normal;
  }
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
  font-size: 100%;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
/* Global Styles */


html, body {
  height: 100%;
}
html {
    --primary: #D91FBB;
    --secondary: rgba(112, 255, 223, 1);
    --background: hsla(204, 26%, 96%, 1);
    --backgroundHover: hsla(204, 26%, 89%, 1);
    --black: #202224;
    --offWhite: #ededed;
    --gray50: hsl(0deg 0% 95%);
    --gray300: hsl(0deg 0% 75%);
    --gray500: hsl(0deg 0% 50%);
    --gray700: hsl(0deg 0% 40%);
    --transparentGray15: hsl(0deg 0% 50% / 0.15);
    --transparentGray35: hsl(0deg 0% 50% / 0.35);
    --grey: #888888;
    --gray: #888888;
    --warning: hsla(0, 100%, 55%, 0.80);
    --bold: 800;
    --medium: 600;
    --normal: 500;
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
    --logo-font: 'Lobster', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    --header-font: 'Jost', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    --body-font: 'Manrope', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    box-sizing: border-box;
    font-family: var(--body-font);
    font-size: 10px;
    color: var(--black);
  }

  body {
    font-family: var(--body-font);
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height:2;
  }
`;

export default GlobalStyles;
