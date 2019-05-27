import React, { Component } from "react";
import PropTypes from "prop-types";
import { FadeLoader } from "react-spinners";

import styles from "./style.scss";

class PageLoader extends Component {
  render() {
    const { loaderColor } = this.props;
    return (
      <div className={styles.loading}>
        <img src={"../../static/images/logo.svg"} className={styles.logo} />
        <FadeLoader color={loaderColor} sizeUnit={"px"} size={30} />
      </div>
    );
  }
}

export default PageLoader;

PageLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  loaderColor: PropTypes.string,
  rest: PropTypes.object
};
