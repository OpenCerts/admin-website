import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./style.scss";

const Button = ({ children, onClick, className, ...rest }) => {
  const classes = classNames.bind(styles);
  const getClassName = () => (className ? className.split(" ") : "");
  const defaultClassName = classes("button", "pill", getClassName());
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
  rest: PropTypes.object
};
