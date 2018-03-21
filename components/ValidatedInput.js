import React, { Component } from "react";
import PropTypes from "prop-types";

class ValidatedInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };
  }

  render() {
    const { placeholder, validatorFn } = this.props;
    const correct = validatorFn(this.state.value);

    return (
      <input
        className="w-100 bn pointer"
        onChange={e => {
          this.setState({ value: e.target.value });
        }}
        placeholder={placeholder}
        style={{ color: correct ? "green" : "red" }}
      />
    );
  }
}

ValidatedInput.propTypes = {
  placeholder: PropTypes.string,
  validatorFn: PropTypes.func
};

export default ValidatedInput;
