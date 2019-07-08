import PropTypes from "prop-types";
import { isValidAddress } from "../utils";
import HashColor from "./HashColor";
import Input from "./Input";
import { black, invalidColor } from "../../styles/variables";

const VALIDATIONS = {
  address: { size: 42, maxLength: 50, validityFn: isValidAddress },
  hash: {
    size: 66,
    maxLength: 80,
    validityFn: address => /^(0x){1}[0-9a-fA-F]{64}$/i.test(address)
  },
  none: { size: 70, maxLength: 99999, validityFn: () => true }
};

const HashColorInput = ({
  variant,
  type,
  placeholder,
  onChange,
  value,
  message,
  className
}) => {
  const { size, maxLength, validityFn } = VALIDATIONS[type]; // eslint-disable-line
  const isValid = validityFn(value);

  return (
    <HashColor hashee={value} clickable={false} color={isValid}>
      <Input
        type="text"
        variant={variant}
        onChange={onChange}
        size={size}
        value={value}
        spellCheck="false"
        message={message}
        className={className}
        style={{
          color: "inherit",
          border: isValid ? `solid 1px ${black}` : `solid 1px ${invalidColor}`
        }}
        maxLength={maxLength}
        placeholder={placeholder}
      />
    </HashColor>
  );
};

export default HashColorInput;

HashColorInput.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string
};

HashColorInput.defaultProps = {
  type: "none"
};
