import React from "react";
import { connect } from "react-redux";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import PropTypes from "prop-types";
import WalletProviderSelectorPage from "../src/components/WalletProviderSelectorPage";
import { getIsLoading } from "../src/reducers/application";
import PageLoader from "../src/components/UI/PageLoader";
import { brandOrange } from "../src/styles/variables";

const bannerStyle = css`
  position: absolute;
  top: 0;
  width: 100%;
  padding: 5px 0px;
  background: #ff9933;
  text-align: center;
  font-weight: bold;
`;

const DefaultPage = (props) => (
  <React.Fragment>
    {props.isLoading && <PageLoader loaderColor={brandOrange} />}
    <div className="min-vh-100 bg-light">
      <div css={css(bannerStyle)}>
        A newer version avaliable, Please go to{" "}
        <a href="http://new.admin.opencerts.io/">
          http://new.admin.opencerts.io/
        </a>
      </div>
      <div className="mw9 mw8-ns center pa4 ph5-ns br3 pv5">
        <WalletProviderSelectorPage />
      </div>
    </div>
  </React.Fragment>
);

const mapStateToProps = (store) => ({
  isLoading: getIsLoading(store),
});

const mapDispatchToProps = (dispatch) => ({
  getIsLoading: (payload) => dispatch(getIsLoading(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPage);

DefaultPage.propTypes = {
  isLoading: PropTypes.bool,
};
