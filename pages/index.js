// polyfill is required to fix regeneratorRuntime issue for ledgerhq u2f
// see: https://github.com/LedgerHQ/ledgerjs/issues/218
import "@babel/polyfill";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Meta from "../components/Meta";
import NetworkSelectorPage from "../components/NetworkSelectorPage";
import { getIsLoading } from "../reducers/application";
import PageLoader from "../components/PageLoader";

const DefaultPage = props => (
  <div>
    {props.isLoading && <PageLoader loaderColor="#FF9933" />}
    <div className="min-vh-100 bg-light">
      <Meta />
      <div className="mw9 mw8-ns center pa4 ph5-ns br3 pv5">
        <NetworkSelectorPage />
      </div>
    </div>
  </div>
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
