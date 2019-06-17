// polyfill is required to fix regeneratorRuntime issue for ledgerhq u2f
// see: https://github.com/LedgerHQ/ledgerjs/issues/218
import "@babel/polyfill";

import withRedux from "next-redux-wrapper";
import initStore from "../src/store";
import Meta from "../src/components/Meta";
import AdminContainer from "../src/components/AdminContainer";

const VerifierPage = props => (
  <div className="min-vh-100 bg-light">
    <Meta />
    <div className="mw9 mw8-ns center pa4 ph5-ns br3 pv5">
      <AdminContainer {...props} />
    </div>
  </div>
);

export default withRedux(initStore)(VerifierPage);
