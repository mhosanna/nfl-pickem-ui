import styled from "styled-components";
import Icon from "../Icon";

const CheckboxContainer = styled.div`
  /* display: inline-block;
  vertical-align: middle; */
`;

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid var(--black);
  background: ${(props) => (props.checked ? `var(--black)` : "white")};
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px var(--backgroundHover);
  }
`;

const Checkbox = ({ checked, ...props }) => {
  return (
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} {...props} />
      <StyledCheckbox checked={checked}>
        <Icon
          name="Check"
          size={17}
          visibility={checked ? "visible" : "hidden"}
          color={"white"}
          style={{ display: "block", margin: "auto" }}
        />
        {/* <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon> */}
      </StyledCheckbox>
    </CheckboxContainer>
  );
};
export default Checkbox;
