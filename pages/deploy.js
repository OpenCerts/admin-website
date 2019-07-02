// polyfill is required to fix regeneratorRuntime issue for ledgerhq u2f
// see: https://github.com/LedgerHQ/ledgerjs/issues/218
import "@babel/polyfill";

import { connect } from "react-redux";
import AdminContainer from "../src/components/AdminContainer";

const AdminPage = props => <AdminContainer {...props} />;

export default connect()(AdminPage);
