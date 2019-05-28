import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./style.scss";

const Input = ({ className, type, onChange, value, ...rest }) => {
  const classes = classNames.bind(styles);
  const getClassName = () => (className ? className.split(" ") : "");
  const defaultClassName = classes("input", "pill", getClassName());
  return (
    <input
      type={type}
      className={defaultClassName}
      onChange={onChange}
      value={value}
      size={50}
      {...rest}
    />
  );
};

export default Input;

Input.propTypes = {
  className: PropTypes.object,
  style: PropTypes.object,
  rest: PropTypes.object,
  onChange: PropTypes.func,
  value: PropTypes.string,
  type: PropTypes.string
};
