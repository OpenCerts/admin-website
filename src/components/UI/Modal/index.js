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
      .modal-content {
        position: relative;
        min-height: 50vh;
        min-width: 50vh;
        margin-top: 5vh;
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
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen
    });
    console.log(this.state.isOpen);
  }

  render() {
    const {
      buttonText,
      confirmText,
      titleText,
      confirmOnClick,
      children
    } = this.props;
    const { isOpen } = this.state;
    return (
      <React.Fragment>
        {style}
        <OrangeButton variant="pill" onClick={this.toggleModal}>
          {buttonText}
        </OrangeButton>
        {isOpen && (
          <div className="modal">
            <Panel className="modal-content">
              <div>
                <a onClick={this.toggleModal}>
                  <i className="closeButton fas fa-times" />
                </a>
              </div>
              <div className="modal-content">
                <div>
                  <h3>{titleText}</h3>
                </div>
                {children}
                {confirmText && (
                  <div className="modal-footer">
                    <OrangeOutlineButton
                      variant="pill"
                      onClick={this.toggleModal}
                    >
                      Close
                    </OrangeOutlineButton>
                    <OrangeButton variant="pill" onClick={confirmOnClick}>
                      {confirmText}
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
  confirmText: PropTypes.string,
  titleText: PropTypes.string,
  confirmOnClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
