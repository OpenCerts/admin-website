import { Component } from "react";
import PropTypes from "prop-types";
import { FadeLoader } from "react-spinners";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const logo = css`
  position: absolute;
  max-width: 350px;
  margin-top: -90px;
  margin-left: -140px;
  width: 300px;
  height: "auto";
  z-index: 1000;
`;

const Loader = css`
  position: absolute;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: visible;
  text-align: center;
  align-items: center;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  :before {
    content: "";
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 1);
  }

  /* :not(:required) hides these rules from IE9 and below */
  :not(:required) {
    /* hide "loading..." text */
    font: 0/0 a;
    color: transparent;
    text-shadow: none;
    background-color: transparent;
    border: 0;
  }

  :not(:required):after {
    content: "";
    display: block;
    font-size: 10px;
    width: 1em;
    height: 1em;
    margin-top: -0.5em;
  }
`;

class PageLoader extends Component {
  render() {
    const { loaderColor } = this.props;
    return (
      <div css={css(Loader)}>
        <img src={"../../static/images/logo.svg"} css={css(logo)} />
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
