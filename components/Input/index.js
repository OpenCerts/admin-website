import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./style.scss";

const Input = ({
  primary,
  danger,
  pill,
  rounded,
  buttonOutline,
  primaryOutline,
  dangerOutline,
  type,
  onChange,
  value,
  ...rest
}) => {
  const classes = classNames.bind(styles);
  const defaultClassName = classes(
    "input",
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
    <div>
      <input
        type={type}
        className={defaultClassName}
        onChange={onChange}
        value={value}
        size={50}
        {...rest}
      />
    </div>
  );
};

export default Input;

Input.propTypes = {
  className: PropTypes.object,
  style: PropTypes.object,
  rest: PropTypes.object,
  primary: PropTypes.bool,
  danger: PropTypes.bool,
  pill: PropTypes.bool,
  rounded: PropTypes.bool,
  buttonOutline: PropTypes.bool,
  primaryOutline: PropTypes.bool,
  dangerOutline: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
  type: PropTypes.string
};
