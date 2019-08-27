import React, { Component } from "react";
/** @jsx jsx */
import { Global, css, jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { RedButton, GreyOutlineButton } from "../Button";
import Panel from "../Panel";
import { brandDarkOrange, lightGrey } from "../../../styles/variables";

const style = (
  <Global
    styles={css`
      .modal-wrapper {
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.5);
      }
      .close-button {
        float: right;
      }
      .modal {
        position: relative;
        min-width: 50vh;
        width: 600px;
      }
      .modal-content {
        padding: 0 16px;
        min-height: 80px;
        text-align: center;
        font-size: 18px;
      }
      .modal-header {
        display: inline-block;
        width: 100%;
        padding-bottom: 8px;
        word-wrap: break-word;
        border-bottom: 1px solid ${lightGrey};

        h3 {
          float: left;
          margin: 0;
        }
      }
      .modal-footer {
        width: 100%;
        text-align: center;
      }
      .closeButton {
        float: right;
        align-items: right;
        font-size: 20px;

        :hover {
          color: ${brandDarkOrange};
        }
      }
    `}
  />
);

class Modal extends Component {
  render() {
    const {
      triggerButton,
      buttonTextIcon,
      confirmText,
      titleText,
      confirmOnClick,
      children,
      isOpen,
      toggleModal
    } = this.props;

    return (
      <React.Fragment>
        {style}
        {triggerButton}
        {isOpen && (
          <div className="modal-wrapper">
            <Panel custom={{ padding: "1rem" }} className="modal">
              <div className="modal-header">
                <h3>{titleText}</h3>
                <a className="close-button" onClick={toggleModal}>
                  <i className="closeButton fa fa-times" aria-hidden="true" />
                </a>
              </div>
              <div className="modal-content">{children}</div>
              <div>
                {confirmText && (
                  <div className="modal-footer">
                    <GreyOutlineButton variant="pill" onClick={toggleModal}>
                      Close
                    </GreyOutlineButton>
                    <RedButton variant="pill" onClick={confirmOnClick}>
                      {buttonTextIcon && (
                        <i className={`fas ${buttonTextIcon}`} />
                      )}
                      {` ${confirmText}`}
                    </RedButton>
                  </div>
                )}
              </div>
            </Panel>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Modal;

Modal.propTypes = {
  triggerButton: PropTypes.object,
  buttonTextIcon: PropTypes.string,
  confirmOnClick: PropTypes.func,
  confirmText: PropTypes.string,
  titleText: PropTypes.string,
  toggleModal: PropTypes.func,
  isOpen: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
