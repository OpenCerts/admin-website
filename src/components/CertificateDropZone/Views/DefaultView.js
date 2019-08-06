import React from "react";
import { Global, css } from "@emotion/core";
import PropTypes from "prop-types";
import Divider from "../../UI/Divider";
import { OrangeOutlineButton } from "../../UI/Button";
import {
  faintBlue,
  brandBlue,
  faintGreen,
  warningBackground,
  warningColor,
  white,
  invalidBackground,
  invalidColor,
  black
} from "../../../styles/variables";

const View = ({ hover, accept }) => (
  <React.Fragment>
    <Global
      styles={css`
        .viewer-container {
          text-align: center !important;
          padding: 1.5rem;
          height: 100%;
          justify-content: center !important;
          flex-direction: column !important;
          display: flex !important;
          border-radius: 10px;

          &.default {
            background-color: ${faintBlue};
            border: 2px dashed ${brandBlue};
            box-shadow: 0 0 0px 10px ${faintBlue};
          }

          &.accept {
            background-color: ${faintGreen};
            border: 2px dashed ${brandBlue};
            box-shadow: 0 0 0px 10px ${faintGreen};
          }

          &.warning {
            background-color: ${warningBackground};
            border: 2px dashed ${warningColor};
            box-shadow: 0 0 0px 10px ${warningBackground};
            color: ${warningColor};

            .unverified-btn {
              @include btn(
                ${warningColor},
                lighten(${warningColor}, 5%),
                ${white}
              );
            }
          }

          &.invalid {
            background-color: ${invalidBackground};
            border: 2px dashed ${invalidColor};
            box-shadow: 0 0 0px 10px ${invalidBackground};
            color: ${invalidColor};

            .unverified-btn {
              @include btn(
                ${invalidColor},
                lighten(${invalidColor}, 5%),
                ${white}
              );
            }
          }
        }

        .unverified-btn {
          margin: auto;
        }

        .image-container {
          margin-bottom: 1rem;
          img {
            height: 110px;
          }
        }

        .message-container {
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          color: ${black};

          span {
            vertical-align: middle;
          }
        }

        .verifications {
          margin-bottom: 2rem;

          .messages {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 0;
          }
        }

        .btn {
          @include btn(${brandBlue});
          background-color: ${white};
          margin: 0 auto;
        }

        .secondary-links {
          width: 50%;
          display: flex;
          margin: 1rem auto 0 auto;

          span {
            margin: auto;
            a {
              font-size: 14px;
            }
          }
        }

        .text-link {
          color: #787878 !important;
          text-decoration: underline !important;
          &:hover {
            color: #324353 !important;
          }
        }
      `}
    />
    <div
      className={`viewer-container ${
        // eslint-disable-next-line no-nested-ternary
        hover ? (accept ? "accept" : "invalid") : "default"
      }`}
    >
      <div className="image-container">
        <i>
          <img
            alt=".opencert Dropzone"
            src="/static/images/dropzone/dropzone_illustration.svg"
          />
        </i>
      </div>
      {accept ? null : (
        <div>
          File cannot be read. Please check that you have a valid .opencert file
        </div>
      )}
      <div
        className="text-brand-dark"
        style={{ fontSize: "1.375rem", fontWeight: 500 }}
      >
        Drag and drop your opencert file
      </div>
      <Divider text="or" />
      <div className="text-muted row">
        <div className="mx-auto">
          <OrangeOutlineButton variant="pill">Select File</OrangeOutlineButton>
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default View;

View.propTypes = {
  hover: PropTypes.bool,
  accept: PropTypes.bool
};
