import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { lightGrey } from "../../../styles/variables";

const baseStyle = css`
  flex: 1;
  display: flex;
  flexdirection: row;
  margin: 16px 0;
`;

const textStyle = css`
  width: 20%;
  text-align: center;
  margin-top: -4px;
`;

const dividerStyle = css`
  display: block;
  height: 1px;
  border: 0;
  width: 40%;
  border-top: 1px solid ${lightGrey};
`;

const Divider = ({ text }) => (
  <div css={css(baseStyle)}>
    <hr css={css(dividerStyle)} />
    <div css={css(textStyle)}>{text}</div>
    <hr css={css(dividerStyle)} />
  </div>
);

export default Divider;

Divider.propTypes = {
  text: PropTypes.string,
  rest: PropTypes.object
};
