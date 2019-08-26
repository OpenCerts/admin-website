import React, { Component } from "react";
import { isEmpty } from "lodash";
import PropTypes from "prop-types";
import HashColor from "./UI/HashColor";
import Input from "./UI/Input";
import { OrangeButton } from "./UI/Button";

class StoreDeployBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issuerName: "",
      issuerNameIsValid: true
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.onDeployClick = this.onDeployClick.bind(this);
  }

  onNameChange(event) {
    this.setState({
      issuerName: event.target.value,
      issuerIsValid: isEmpty(event.target.value)
    });
  }

  onDeployClick() {
    const { handleStoreDeploy } = this.props;
    const { issuerName } = this.state;
    if (!isEmpty(issuerName)) {
      handleStoreDeploy({
        name: issuerName
      });
    } else {
      this.setState({
        issuerIsValid: isEmpty(issuerName)
      });
    }
  }

  render() {
    const { issuerIsValid, issuerName } = this.state;
    const { deploying, deployedTx, networkId, storeAddress } = this.props;

    const inputMessage = issuerIsValid ? "Issuer name cannot be empty." : "";

    return (
      <div className="w-100">
        <div className="mb4">
          <div>
            Issuer Name
            <br />
            <Input
              className="mt2"
              variant="pill"
              type="text"
              placeholder="Name of organization"
              onChange={this.onNameChange}
              value={issuerName}
              message={inputMessage}
              size={50}
              required
            />
          </div>
        </div>

        <OrangeButton
          variant="pill"
          onClick={this.onDeployClick}
          disabled={deploying}
        >
          {deploying ? "Deploying…" : "Deploy"}
        </OrangeButton>

        {deployedTx ? (
          <div className="mt5">
            <div>
              🎉 New store deployed at
              <HashColor hashee={storeAddress} type="address" />
            </div>
            <div className="mt2">
              Transaction ID
              <HashColor hashee={deployedTx} isTx networkId={networkId} />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default StoreDeployBlock;

StoreDeployBlock.propTypes = {
  storeAddress: PropTypes.string,
  deploying: PropTypes.bool,
  deployedTx: PropTypes.string,
  networkId: PropTypes.number,
  handleStoreDeploy: PropTypes.func
};
