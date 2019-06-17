import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const base = css`
  padding: 0.5rem 1rem;
  border: solid 1px black;
  outline: none;
`;

const rounded = css`
  border-radius: 5px;
`;

const pill = css`
  border-radius: 50px;
`;

const Input = ({ custom, variant, type, onChange, value, ...rest }) => (
  <input
    css={css(
      base,
      custom,
      variant === "rounded" && rounded,
      variant === "pill" && pill
    )}
    variant={variant}
    type={type}
    onChange={onChange}
    value={value}
    size={50}
    {...rest}
  />
);

export default Input;

Input.propTypes = {
  custom: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
  rest: PropTypes.object,
  onChange: PropTypes.func,
  value: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.string
};
