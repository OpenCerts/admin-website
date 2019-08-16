import React from "react";
import { Global, css } from "@emotion/core";
import PropTypes from "prop-types";
import Link from "next/link";
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
import { OrangeOutlineButton } from "../../UI/Button";

const View = ({
  storeStatus,
  hashStatus,
  issuedStatus,
  issuerIdentityStatus,
  notRevokedStatus
}) => {
  /* Array of error messages with priority of error messages determined by a stack. 
  Error messages are first placed into the stack and the error message with the highest priority is popped off the stack
  and displayed.
  
  The priority of error messages are as follows:
  1. Invalid store
  2. Tampered
  3. Not issued
  4. Revoked */
  const errorMessages = [
    {
      title: "Certificate revoked",
      message:
        "This certificate has been revoked by your issuing institution. Please contact your issuing institution for more details.",
      error: !notRevokedStatus.verified
    },
    {
      title: "Certificate not issued",
      message:
        "This certificate cannot be found. Please contact your issuing institution for help or issue the certificate before trying again.",
      error: !issuedStatus.verified
    },
    {
      title: "Certificate has been tampered with",
      message:
        "The contents of this certificate are inaccurate and have been tampered with.",
      error: !hashStatus.verified
    },
    {
      title: "Certificate issuer identity invalid",
      message: "This certificate was issued by an invalid issuer.",
      error: !issuerIdentityStatus.verified
    },
    {
      title: "Certificate store address is invalid",
      message:
        "Please check that you have a valid smart contract with us and a correct certificate store address before proceeding.",
      error: !storeStatus.verified
    }
  ];

  const stack = errorMessages.filter(
    errorMessage => errorMessage.error === true
  );
  const error = stack.pop();

  const isWarning =
    hashStatus.verified &&
    issuedStatus.verified &&
    notRevokedStatus.verified &&
    issuerIdentityStatus.verified;
  return (
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

            img {
              margin-bottom: -15px;
              margin-right: 16px;
            }

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
        className={`viewer-container ${isWarning ? "warning" : "invalid"}`}
        style={{
          backgroundColor: isWarning ? "#fbf6e9" : "#fbeae9"
        }}
      >
        <span className="message-container">
          {isWarning ? (
            <img src="/static/images/dropzone/warning.svg" />
          ) : (
            <img src="/static/images/dropzone/invalid.svg" />
          )}
          <span
            className={`${isWarning ? "warning" : "invalid"} m-3`}
            style={{ fontSize: "1.5rem" }}
          >
            {isWarning
              ? "Certificate from unregistered institution"
              : "This certificate is not valid"}
          </span>
        </span>

        <div className="verifications">
          {error !== undefined ? (
            <div>
              <p className="messages">{error.title}</p>
              <p>{error.message}</p>
            </div>
          ) : null}
        </div>

        <div className="secondary-links">
          <span>
            <OrangeOutlineButton variant="pill">
              Try Another
            </OrangeOutlineButton>
          </span>
          {isWarning ? (
            <span
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
              }}
            >
              <Link href="/viewer">
                <a id="certificate-view-anyway" className="text-link">
                  View certificate anyway
                </a>
              </Link>
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

View.propTypes = {
  handleRenderOverwrite: PropTypes.func,
  document: PropTypes.object,

  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object,
  issuerIdentityStatus: PropTypes.object,
  storeStatus: PropTypes.object
};

export default View;
