import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import colors from "../../../styles/variables";

const StyledButton = styled.button`
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

  ${props =>
    props.type === "rounded" &&
    css`
      border-radius: 5px;
    `};

  ${props =>
    props.type === "pill" &&
    css`
      border-radius: 50px;
    `};

  ${props =>
    props.color === "orange" &&
    css`
      color: ${colors.white};
      background: ${colors.brandOrange};
      border: 1px solid ${colors.brandOrange};

      :hover {
        background-color: ${colors.brandDarkOrange};
      }
    `};

  ${props =>
    props.color === "orange" &&
    props.outline &&
    css`
      color: ${colors.brandOrange};
      background: transparent;
      border: 1px solid ${colors.brandOrange};

      :hover {
        color: ${colors.white}
        background-color: ${colors.brandDarkOrange};
      }
    `};

  ${props =>
    props.color === "blue" &&
    css`
      color: ${colors.white};
      background: ${colors.brandBlue};
      border: 1px solid ${colors.brandBlue};

      :hover {
        background-color: ${colors.brandDarkBlue};
      }
    `};

  ${props =>
    props.color === "blue" &&
    props.outline &&
    css`
        color: ${colors.brandBlue};
        background: transparent;
        border: 1px solid ${colors.brandBlue};
  
        :hover {
          color: ${colors.white}
          background-color: ${colors.brandDarkBlue};
        }
      `};
`;

const Button = ({ children, onClick, ...rest }) => (
  <StyledButton onClick={onClick} {...rest}>
    {children}
  </StyledButton>
);

export default Button;

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  type: PropTypes.string,
  color: PropTypes.string,
  outline: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  rest: PropTypes.object
};
