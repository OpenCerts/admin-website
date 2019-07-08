/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import PropTypes from "prop-types";

const base = css`
  background-color: white;
  border-radius: 3px;
  border: none;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  display: block;
  max-width: 1080px;
  margin: 3rem auto;
  padding: 3rem;
`;

const Panel = ({ children, custom, ...rest }) => (
  <div css={css(base, custom)} {...rest}>
    {children}
  </div>
);

export default Panel;

Panel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  custom: PropTypes.object,
  rest: PropTypes.object
};
