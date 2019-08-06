import React, { Component } from "react";
/** @jsx jsx */
import { Global, css, jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { OrangeButton, OrangeOutlineButton } from "../Button";
import Panel from "../Panel";
import { brandDarkOrange } from "../../../styles/variables";

const style = (
  <Global
    styles={css`
      .modal {
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);
      }
      .close-button {
        float: right;
      }
      .modal-content {
        position: relative;
        min-height: 50vh;
        min-width: 50vh;
        margin-top: 5vh;
      }
      .modal-header {
        display: inline-block;
        width: 100%;
        padding-bottom: 16px;
        word-wrap: break-word;

        h3 {
          float: left;
          margin: 0;
        }
      }
      .modal-footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        text-align: center;
      }
      .closeButton {
        float: right;
        align-items: right;
        font-size: 25px;

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
      buttonText,
      buttonTextIcon,
      confirmText,
      titleText,
      confirmOnClick,
      children,
      isOpen,
      toggleModal,
      isTriggerDisabled
    } = this.props;

    return (
      <React.Fragment>
        {style}
        <OrangeButton
          variant="pill"
          onClick={toggleModal}
          disabled={isTriggerDisabled}
        >
          {buttonText}
        </OrangeButton>
        {isOpen && (
          <div className="modal">
            <Panel className="modal-content">
              <div className="modal-header">
                <h3>{titleText}</h3>
                <a className="close-button" onClick={toggleModal}>
                  <i className="closeButton fas fa-times" />
                </a>
              </div>
              <div>{children}</div>
              <div>
                {confirmText && (
                  <div className="modal-footer">
                    <OrangeOutlineButton variant="pill" onClick={toggleModal}>
                      Close
                    </OrangeOutlineButton>
                    <OrangeButton variant="pill" onClick={confirmOnClick}>
                      {buttonTextIcon && (
                        <i className={`fas ${buttonTextIcon}`} />
                      )}
                      {` ${confirmText}`}
                    </OrangeButton>
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
  buttonText: PropTypes.string,
  buttonTextIcon: PropTypes.string,
  confirmOnClick: PropTypes.func,
  confirmText: PropTypes.string,
  titleText: PropTypes.string,
  toggleModal: PropTypes.func,
  isOpen: PropTypes.bool,
  isTriggerDisabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
