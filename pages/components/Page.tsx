import PropTypes from "prop-types";
import { BaseStyles, Box } from "@primer/components";
import Header from "./Header";

export default function Page({ children, cool }) {
  return (
    <BaseStyles>
      <Header />
      <Box m={4}>
        <div className="children">{children}</div>
      </Box>
    </BaseStyles>
  );
}

Page.propTypes = {
  cool: PropTypes.string,
  children: PropTypes.any,
};
