import React from "react";
import Panel from "./Panel";
import NetworkSelector from "./NetworkSelector";

const NetworkSelectorPage = () => (
  <Panel id="network-selector" style={{ textAlign: "center" }}>
    <img src="/static/images/logo.svg" style={{ maxWidth: 300 }} />
    <h1>Welcome to OpenCerts Admin Portal</h1>
    <p>Please select a Wallet Network to begin.</p>
    <NetworkSelector />
  </Panel>
);

export default NetworkSelectorPage;
