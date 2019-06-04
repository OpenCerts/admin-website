import PropTypes from "prop-types";
import "../../../styles/variables";

export const defaultStyle = {
  cursor: "pointer",
  border: "none",
  padding: "1rem 2rem",
  userSelect: "none",
  textDecoration: "none",
  minWidth: "10rem",
  margin: "8px"
};

export const pill = {
  borderRadius: "50px"
};

export const rounded = {
  borderRadius: "5px"
};

const switchType = name => {
  switch (name) {
    case "pill":
      return pill;
    case "rounded":
      return rounded;
    default:
      return {};
  }
};

export const orange = {
  color: "#fff",
  backgroundColor: "#ff9933"
};

const switchColour = name => {
  switch (name) {
    case "orange":
      return orange;
    case "blue":
      return "blue";
    case "green":
      return "green";
    default:
      return {};
  }
};

const Button = ({ children, type, colour, onClick, ...rest }) => (
  <button
    style={{ ...defaultStyle, ...switchType(type), ...switchColour(colour) }}
    onClick={onClick}
    {...rest}
  >
    {children}
  </button>
);

export default Button;

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  type: PropTypes.string,
  colour: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  rest: PropTypes.object
};
