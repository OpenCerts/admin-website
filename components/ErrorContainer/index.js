import PropTypes from "prop-types";
import images from "../Images";
import styles from "./style.scss";
import Button from "../Button";
import Panel from "../Panel";
import NetworkSelector from "../NetworkSelector";

const refreshPage = () => {
  window.location.reload();
};

const ErrorContainer = () => (
  <Panel style={{ textAlign: "center" }}>
    <div className={styles.walletError}>
      {images.wallet()}
      <h1>Admin wallet address not found.</h1>
      <p>
        Please click{" "}
        <a href="https://docs.opencerts.io/appendix_test_accounts.html">here</a>{" "}
        and follow the instructions to install a test wallet.
      </p>
      <Button onClick={refreshPage} danger>
        Continue
      </Button>
      <hr />
      <p>Select another wallet network.</p>
      <NetworkSelector />
    </div>
  </Panel>
);

export default ErrorContainer;

ErrorContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  rest: PropTypes.object
};
