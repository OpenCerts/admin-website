import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import colors from "../../../styles/variables";

const base = css`
  font-weight: bold;
  cursor: pointer;
  border: none;
  padding: 1rem 2rem;
  user-select: none;
  text-decoration: none;
  color: ${colors.white};
  border: 1px solid ${colors.black};
  background: ${colors.black};
  min-width: 10rem;
  margin: 8px;
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
    color: ${colors.white};
    background: ${colors.brandOrange};
    border: 1px solid ${colors.brandOrange};

    :hover {
      background-color: ${colors.brandDarkOrange};
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
    color: ${colors.brandOrange};
    background: transparent;
    border: 1px solid ${colors.brandOrange};

    :hover {
      color: ${colors.white};
      background-color: ${colors.brandDarkOrange};
    },
  `;
  return (
    <Button custom={custom} variant={variant} onClick={onClick} {...rest}>
      {children}
    </Button>
  );
};

export const BlueButton = ({ children, variant, onClick, ...rest }) => {
  const custom = css`
    color: ${colors.white};
    background: ${colors.brandBlue};
    border: 1px solid ${colors.brandBlue};

    :hover {
      background-color: ${colors.brandDarkBlue};
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
    color: ${colors.brandBlue};
    background: transparent;
    border: 1px solid ${colors.brandBlue};

    :hover {
      color: ${colors.white};
      background-color: ${colors.brandDarkBlue};
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
