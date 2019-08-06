import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import {
  white,
  black,
  brandBlue,
  brandDarkBlue,
  brandOrange,
  brandDarkOrange
} from "../../../styles/variables";

const base = css`
  cursor: pointer;
  border: none;
  padding: 1rem 2rem;
  user-select: none;
  text-decoration: none;
  color: ${white};
  border: 1px solid ${black};
  background: ${black};
  min-width: 10rem;
  margin: 8px;

  :disabled,
  [disabled] {
    cursor: not-allowed;
    opacity: 0.5;
    filter: alpha(opacity=50);
  }
`;

const rounded = css`
  border-radius: 5px;
`;

const pill = css`
  border-radius: 50px;
`;

export const Button = ({ children, custom, variant, onClick, ...rest }) => (
  <button
    css={css(
      base,
      custom,
      variant === "rounded" && rounded,
      variant === "pill" && pill
    )}
    variant={variant}
    onClick={onClick}
    {...rest}
  >
    {children}
  </button>
);

export const OrangeButton = ({ children, variant, onClick, ...rest }) => {
  const custom = css`
    color: ${white};
    background: ${brandOrange};
    border: 1px solid ${brandOrange};

    :hover:enabled {
      background-color: ${brandDarkOrange};
    }
  `;
  return (
    <Button custom={custom} variant={variant} onClick={onClick} {...rest}>
      {children}
    </Button>
  );
};

export const OrangeOutlineButton = ({
  children,
  variant,
  onClick,
  ...rest
}) => {
  const custom = css`
    color: ${brandOrange};
    background: transparent;
    border: 1px solid ${brandOrange};

    :hover:enabled {
      color: ${white};
      background-color: ${brandDarkOrange};
    }
  `;
  return (
    <Button custom={custom} variant={variant} onClick={onClick} {...rest}>
      {children}
    </Button>
  );
};

export const BlueButton = ({ children, variant, onClick, ...rest }) => {
  const custom = css`
    color: ${white};
    background: ${brandBlue};
    border: 1px solid ${brandBlue};

    :hover:enabled {
      background-color: ${brandDarkBlue};
    }
  `;
  return (
    <Button custom={custom} variant={variant} onClick={onClick} {...rest}>
      {children}
    </Button>
  );
};

export const BlueOutlineButton = ({ children, variant, onClick, ...rest }) => {
  const custom = css`
    color: ${brandBlue};
    background: transparent;
    border: 1px solid ${brandBlue};

    :hover:enabled {
      color: ${white};
      background-color: ${brandDarkBlue};
    }
  `;
  return (
    <Button custom={custom} variant={variant} onClick={onClick} {...rest}>
      {children}
    </Button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  className: PropTypes.string,
  custom: PropTypes.object,
  variant: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  rest: PropTypes.object
};

OrangeButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  variant: PropTypes.string,
  onClick: PropTypes.func
};

OrangeOutlineButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  variant: PropTypes.string,
  onClick: PropTypes.func
};

BlueButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  variant: PropTypes.string,
  onClick: PropTypes.func
};

BlueOutlineButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  variant: PropTypes.string,
  onClick: PropTypes.func
};
