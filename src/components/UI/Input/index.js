import React from "react";
import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { invalidColor, black } from "../../../styles/variables";

const base = css`
  padding: 0.5rem 1rem;
  border: solid 1px black;
  outline: none;
  width: 100%;
`;

const rounded = css`
  border-radius: 5px;
`;

const pill = css`
  border-radius: 50px;
`;

const Input = ({
  custom,
  variant,
  type,
  onChange,
  value,
  message,
  ...rest
}) => (
  <React.Fragment>
    <input
      css={css(
        base,
        custom,
        variant === "rounded" && rounded,
        variant === "pill" && pill
      )}
      variant={variant}
      type={type}
      style={{ borderColor: message ? invalidColor : black }}
      onChange={onChange}
      value={value}
      size={50}
      {...rest}
    />
    {message && <small style={{ color: invalidColor }}>{message}</small>}
  </React.Fragment>
);

export default Input;

Input.propTypes = {
  message: PropTypes.string,
  custom: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
  rest: PropTypes.object,
  onChange: PropTypes.func,
  value: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.string
};
