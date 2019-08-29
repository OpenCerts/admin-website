// polyfill is required to fix regeneratorRuntime issue for ledgerhq u2f
// see: https://github.com/LedgerHQ/ledgerjs/issues/218
import React from "react";
import "@babel/polyfill";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getIsLoading } from "../src/reducers/application";
import AdminContainer from "../src/components/AdminContainer";
import PageLoader from "../src/components/UI/PageLoader";
import { brandOrange } from "../src/styles/variables";

const AdminPage = props => (
  <React.Fragment>
    {props.isLoading && <PageLoader loaderColor={brandOrange} />}
    <AdminContainer {...props} />
  </React.Fragment>
);

const mapStateToProps = store => ({
  isLoading: getIsLoading(store)
});

const mapDispatchToProps = dispatch => ({
  getIsLoading: payload => dispatch(getIsLoading(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage);

AdminPage.propTypes = {
  isLoading: PropTypes.bool
};
