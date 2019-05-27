import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./style.scss";

const Button = ({
  children,
  primary,
  danger,
  pill,
  rounded,
  buttonOutline,
  primaryOutline,
  dangerOutline,
  onClick,
  ...rest
}) => {
  const classes = classNames.bind(styles);
  const defaultClassName = classes(
    "button",
    "pill",
    {
      primary,
      danger,
      buttonOutline,
      primaryOutline,
      dangerOutline
    },
    {
      pill,
      rounded
    }
  );
  return (
    <button className={defaultClassName} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  className: PropTypes.object,
  onClick: PropTypes.func,
  style: PropTypes.object,
  rest: PropTypes.object,
  primary: PropTypes.bool,
  danger: PropTypes.bool,
  pill: PropTypes.bool,
  rounded: PropTypes.bool,
  buttonOutline: PropTypes.bool,
  primaryOutline: PropTypes.bool,
  dangerOutline: PropTypes.bool
};
