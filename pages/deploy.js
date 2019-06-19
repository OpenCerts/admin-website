// polyfill is required to fix regeneratorRuntime issue for ledgerhq u2f
// see: https://github.com/LedgerHQ/ledgerjs/issues/218
import "@babel/polyfill";

import { connect } from "react-redux";
import AdminContainer from "../src/components/AdminContainer";
import NetworkSelectorContainer from "../src/components/NetworkSelectorContainer";

const AdminPage = props => (
  <div className="min-vh-100 pv5">
    <div className="mw9 mw8-ns center bg-white pa4 ph5-ns br3 pv5">
      <NetworkSelectorContainer />
      <AdminContainer {...props} />
    </div>
  </div>
);

export default connect()(AdminPage);
