import React from "react";
import "@babel/polyfill";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import WalletProviderSelectorPage from "../src/components/WalletProviderSelectorPage";
import { getIsLoading } from "../src/reducers/application";
import PageLoader from "../src/components/UI/PageLoader";
import { brandOrange } from "../src/styles/variables";

const DefaultPage = props => (
  <React.Fragment>
    {props.isLoading && <PageLoader loaderColor={brandOrange} />}
    <div className="min-vh-100 bg-light">
      <div className="mw9 mw8-ns center pa4 ph5-ns br3 pv5">
        <WalletProviderSelectorPage />
      </div>
    </div>
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
)(DefaultPage);

DefaultPage.propTypes = {
  isLoading: PropTypes.bool
};
