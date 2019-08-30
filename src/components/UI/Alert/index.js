import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { invalidColor, invalidBackground } from "../../../styles/variables";

const base = css`
  width: 100%;
  border-radius: 5px;
  padding: 4px 16px;
`;

export const Alert = ({ children, custom, ...rest }) => (
  <div css={css(base, custom)} {...rest}>
    {children}
  </div>
);

export const RedAlert = ({ children }) => {
  const custom = css`
    color: ${invalidColor};
    background: ${invalidBackground};
  `;
  return <Alert custom={custom}>{children}</Alert>;
};

Alert.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  className: PropTypes.string,
  custom: PropTypes.object,
  style: PropTypes.object,
  rest: PropTypes.object
};

RedAlert.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  className: PropTypes.string
};
